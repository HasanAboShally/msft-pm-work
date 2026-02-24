#!/usr/bin/env bash
# =============================================================================
# Provision Fabric Items — Complete Item Provisioning via fabric-cli
# =============================================================================
# This script provisions the DEV workspace with all Fabric items:
# Notebooks, Copy Jobs, Environment, Semantic Model, Report.
# It also provisions workspace identity, runs data pipelines, and
# connects the workspace to an Azure DevOps Git repository.
#
# PREREQUISITES:
#   1. Run ./scripts/setup.sh first (populates templates/)
#   2. Run terraform apply first (creates workspace + lakehouses)
#   3. fabric-cli (fab) installed and authenticated
#   4. jq installed (for JSON manipulation)
#   5. Azure CLI logged in (for REST API token acquisition)
#
# Usage:
#   ./scripts/provision-items.sh                      # Auto-reads Terraform outputs
#   ./scripts/provision-items.sh --skip-data           # Skip data pipeline execution
#   ./scripts/provision-items.sh --dry-run             # Show what would be done
#
# Environment variable overrides (bypass Terraform outputs):
#   WORKSPACE_NAME, WORKSPACE_ID, BRONZE_LAKEHOUSE_ID, SILVER_LAKEHOUSE_ID
#   ADO_ORGANIZATION, ADO_PROJECT_NAME  (for Git connection)
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
export PROJECT_ROOT
source "${SCRIPT_DIR}/lib/utils.sh"
source "${SCRIPT_DIR}/lib/fab-helpers.sh"

# -----------------------------------------------------------------------------
# Options
# -----------------------------------------------------------------------------

SKIP_DATA=false
DRY_RUN=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --skip-data)     SKIP_DATA=true ;;
    --dry-run)       DRY_RUN=true ;;
    --help|-h)
      echo "Usage: $0 [--skip-data] [--dry-run]"
      echo ""
      echo "Options:"
      echo "  --skip-data   Skip running Copy Jobs and Notebooks (import only)"
      echo "  --dry-run     Show what would be done without executing"
      echo "  --help, -h    Show this help message"
      exit 0
      ;;
    *) log_error "Unknown argument: $1"; exit 1 ;;
  esac
  shift
done

# -----------------------------------------------------------------------------
# Placeholder GUIDs (from the DaniBunny workshop template files)
# These are the placeholder values baked into the template files that need
# to be replaced with actual IDs at provisioning time.
# -----------------------------------------------------------------------------

# Copy Job template placeholders
readonly PH_COPYJOB_WORKSPACE_ID="8e0cc78d-1667-4e88-9523-a04c1d5dd187"
readonly PH_COPYJOB_LAKEHOUSE_ID="3ad63567-2849-4e5b-9cf2-eacd059e50a5"
readonly PH_COPYJOB_CONNECTION_ID="00000000-0000-0000-0000-000000000001"

# Notebook template placeholders (same workspace ID as copy jobs)
readonly PH_NB_WORKSPACE_ID="${PH_COPYJOB_WORKSPACE_ID}"
readonly PH_NB_BRONZE_LAKEHOUSE_ID="3ad63567-2849-4e5b-9cf2-eacd059e50a5"
readonly PH_NB_SILVER_LAKEHOUSE_ID="3e67377e-5962-433c-8c2f-d796a8687c2d"
readonly PH_NB_ENV_ID="99999999-9999-9999-9999-999999999999"

# Semantic Model template placeholders
readonly PH_SM_CONNECTION_STRING="X6EPS4XRQ2XUDENLFV6NAEO3I4-RXDQZDTHC2EE5FJDUBGB2XORQ4.msit-datawarehouse.fabric.microsoft.com"
readonly PH_SM_SQL_ENDPOINT_ID="48d64684-b584-4ef5-ad7b-a094b42f52f8"

# Report template placeholders
readonly PH_REPORT_SM_ID="e4e9593c-b1a9-428e-9581-64939a83c4d9"

# =============================================================================
# MAIN PROVISIONING FLOW
# =============================================================================

log_header "Fabric E2E Demo — Provision Fabric Items"

# ─── Step 0: Load configuration ──────────────────────────────────────────────

log_step 0 "Load configuration"
load_terraform_outputs
require_vars WORKSPACE_NAME WORKSPACE_ID BRONZE_LAKEHOUSE_ID SILVER_LAKEHOUSE_ID \
             BRONZE_LAKEHOUSE_NAME SILVER_LAKEHOUSE_NAME

WS_PATH="/${WORKSPACE_NAME}.Workspace"
BRONZE_PATH="${WS_PATH}/${BRONZE_LAKEHOUSE_NAME}.Lakehouse"
SILVER_PATH="${WS_PATH}/${SILVER_LAKEHOUSE_NAME}.Lakehouse"

log_success "Configuration loaded"
echo "  Workspace:  ${WORKSPACE_NAME} (${WORKSPACE_ID:0:8}...)"
echo "  Bronze LH:  ${BRONZE_LAKEHOUSE_NAME} (${BRONZE_LAKEHOUSE_ID:0:8}...)"
echo "  Silver LH:  ${SILVER_LAKEHOUSE_NAME} (${SILVER_LAKEHOUSE_ID:0:8}...)"

if [[ "${DRY_RUN}" == "true" ]]; then
  log_warn "DRY RUN — showing plan only, no changes will be made."
  echo ""
  echo "Would execute:"
  echo "  1. Check fabric-cli authentication"
  echo "  1b. Assign SPN as Admin on Test & Prod workspaces"
  echo "  2. Provision Workspace Identity (REST API)"
  echo "  3. Retrieve WS identity SPN + assign Storage Blob Data Reader on ADLS Gen2"
  echo "  4. Create ADLS Gen2 Fabric Connection (Workspace Identity auth)"
  echo "  5. Create staging from templates/"
  echo "  6. Import MyEnv.Environment"
  echo "  7. Retrieve lakehouse SQL endpoint properties"
  echo "  8. Import 3 Notebooks with lakehouse bindings"
  echo "  9. Replace Copy Job GUIDs + connection ID and import 2 Copy Jobs"
  echo " 10. Run Copy Jobs (unless --skip-data)"
  echo " 11. Run Bronze_Data_Preparation notebook (unless --skip-data)"
  echo " 12. Run Transformations notebook (unless --skip-data)"
  echo " 13. Replace Semantic Model metadata and import"
  echo " 14. Replace Report metadata and import"
  echo " 15. Connect Dev workspace to ADO Git /templates folder"
  echo " 16. Clean up staging"
  exit 0
fi

# ─── Step 1: Authenticate ────────────────────────────────────────────────────

log_step 1 "Check authentication and configure CLI"
fab_check_auth
fab_set_command_line_mode

# ─── Step 1b: Assign SPN as Admin on Test & Prod workspaces ──────────────────

SPN_OBJECT_ID="${SPN_OBJECT_ID:-}"
WORKSPACE_ID_TEST="${WORKSPACE_ID_TEST:-}"
WORKSPACE_ID_PROD="${WORKSPACE_ID_PROD:-}"

if [[ -n "${SPN_OBJECT_ID}" ]] && [[ -n "${WORKSPACE_ID_TEST}" ]] && [[ -n "${WORKSPACE_ID_PROD}" ]]; then
  log_step "1b" "Assign SPN as Admin on Test & Prod workspaces"
  fab_assign_workspace_role "${WORKSPACE_ID_TEST}" "${SPN_OBJECT_ID}" "ServicePrincipal" "Admin"
  fab_assign_workspace_role "${WORKSPACE_ID_PROD}" "${SPN_OBJECT_ID}" "ServicePrincipal" "Admin"
  log_success "SPN Admin role assigned on Test and Prod workspaces"
else
  log_info "Skipping SPN workspace role assignment (SPN_OBJECT_ID, WORKSPACE_ID_TEST, or WORKSPACE_ID_PROD not set)"
fi

# ─── Step 2: Provision Workspace Identity ─────────────────────────────────────

log_step 2 "Provision Workspace Identity"
fab_provision_workspace_identity "${WORKSPACE_ID}"

# ─── Step 3: Assign RBAC to Workspace Identity ───────────────────────────────

log_step 3 "Assign Storage Blob Data Reader to workspace identity"

# ADLS Gen2 storage account details
ADLS_STORAGE_ACCOUNT_NAME="${ADLS_STORAGE_ACCOUNT_NAME:-fabconus26data}"
ADLS_STORAGE_RESOURCE_GROUP="${ADLS_STORAGE_RESOURCE_GROUP:-rg-cicd-fabconus26}"
ADLS_SUBSCRIPTION_ID=$(az account show --query id -o tsv)
ADLS_STORAGE_SCOPE="/subscriptions/${ADLS_SUBSCRIPTION_ID}/resourceGroups/${ADLS_STORAGE_RESOURCE_GROUP}/providers/Microsoft.Storage/storageAccounts/${ADLS_STORAGE_ACCOUNT_NAME}"
ADLS_DFS_ENDPOINT="https://${ADLS_STORAGE_ACCOUNT_NAME}.dfs.core.windows.net"

# Retrieve workspace identity SPN object ID
WS_IDENTITY_SPN_ID=$(fab_get_workspace_identity_spn_id "${WORKSPACE_ID}")

# Assign Storage Blob Data Reader so the workspace identity can read from ADLS
fab_assign_storage_role "${WS_IDENTITY_SPN_ID}" "Storage Blob Data Reader" "${ADLS_STORAGE_SCOPE}"

# Allow a few seconds for RBAC propagation
log_info "Waiting 5s for RBAC propagation..."
sleep 5

# ─── Step 4: Create Fabric ADLS Gen2 Connection ──────────────────────────────

log_step 4 "Create ADLS Gen2 Fabric Connection (Workspace Identity auth)"

ADLS_CONNECTION_NAME="adls-${ADLS_STORAGE_ACCOUNT_NAME}"
ADLS_CONNECTION_ID=$(fab_create_adls_connection "${ADLS_CONNECTION_NAME}" "${ADLS_DFS_ENDPOINT}")

if [[ -z "${ADLS_CONNECTION_ID}" ]]; then
  log_error "Failed to create ADLS Gen2 connection — cannot proceed with copy jobs"
  exit 1
fi
log_success "ADLS Connection ID: ${ADLS_CONNECTION_ID}"

# ─── Step 5: Create staging directory ─────────────────────────────────────────

log_step 5 "Create staging directory from templates"
create_staging
log_success "Staging ready: ${STAGING_DIR}"

# ─── Step 6: Import & Publish Spark Environment ─────────────────────────────

log_step 6 "Import and publish Spark Environment"
fab_import_item "MyEnv.Environment" "Environment"
log_success "Environment imported"

# Retrieve environment item ID
ENV_ID=$(fab_get_item_id "MyEnv.Environment")
log_info "Environment item ID: ${ENV_ID:0:8}..."

# Publish the environment (required before notebooks can use it)
log_info "Publishing environment..."
fab api -X post "workspaces/${WORKSPACE_ID}/environments/${ENV_ID}/staging/publish" 2>&1 || true

# Wait for publish to complete (compute-only environment publishes quickly)
log_info "Waiting 10s for environment publish to settle..."
sleep 10

# Check publish status
log_info "Environment status after publish wait:"
fab api "workspaces/${WORKSPACE_ID}/environments/${ENV_ID}" 2>&1 | head -30 || true
log_success "Environment publish wait complete"

# ─── Step 7: Retrieve lakehouse properties ───────────────────────────────────

log_step 7 "Retrieve lakehouse properties (SQL endpoint may take a moment)"

# Bronze and Silver IDs are already known from Terraform.
# But we need the Silver SQL endpoint properties for the Semantic Model.
log_info "Retrieving Silver SQL Endpoint ID..."
SILVER_SQL_ENDPOINT_ID=$(fab_get_property "${SILVER_PATH}" "properties.sqlEndpointProperties.id")
log_success "Silver SQL Endpoint ID: ${SILVER_SQL_ENDPOINT_ID:0:8}..."

log_info "Retrieving Silver SQL Connection String..."
SILVER_SQL_CONN_STRING=$(fab_get_property "${SILVER_PATH}" "properties.sqlEndpointProperties.connectionString")
log_success "Silver SQL Connection String: ${SILVER_SQL_CONN_STRING:0:30}..."

# ─── Step 8: Import Notebooks ────────────────────────────────────────────────

log_step 8 "Replace Notebook template GUIDs and import"

# 8a: Replace stale lakehouse/workspace IDs in notebook templates BEFORE import.
# This is the same approach used for copy jobs — update the staging templates.
# All notebooks share the same old workspace ID and environment placeholder.
for notebook in "Bronze_Data_Preparation.Notebook" "Transformations.Notebook" "Validations.Notebook"; do
  fab_replace_in_template "${notebook}" "${PH_NB_WORKSPACE_ID}" "${WORKSPACE_ID}"
  fab_replace_in_template "${notebook}" "${PH_NB_ENV_ID}" "${ENV_ID}"
done
# Bronze notebook → Bronze lakehouse
fab_replace_in_template "Bronze_Data_Preparation.Notebook" "${PH_NB_BRONZE_LAKEHOUSE_ID}" "${BRONZE_LAKEHOUSE_ID}"
# Transformations & Validations → Silver lakehouse (default) + Bronze lakehouse (in known_lakehouses)
fab_replace_in_template "Transformations.Notebook" "${PH_NB_SILVER_LAKEHOUSE_ID}" "${SILVER_LAKEHOUSE_ID}"
fab_replace_in_template "Transformations.Notebook" "${PH_NB_BRONZE_LAKEHOUSE_ID}" "${BRONZE_LAKEHOUSE_ID}"
fab_replace_in_template "Validations.Notebook" "${PH_NB_SILVER_LAKEHOUSE_ID}" "${SILVER_LAKEHOUSE_ID}"
fab_replace_in_template "Validations.Notebook" "${PH_NB_BRONZE_LAKEHOUSE_ID}" "${BRONZE_LAKEHOUSE_ID}"
log_success "Notebook template IDs replaced (incl. environment reference)"

# 8b: Import all 3 notebooks (with correct lakehouse IDs already embedded)
for notebook in "Bronze_Data_Preparation.Notebook" "Transformations.Notebook" "Validations.Notebook"; do
  fab_import_item "${notebook}" "Notebook"
done
log_success "All 3 notebooks imported (lakehouse bindings embedded)"
log_success "All notebook lakehouse bindings set"

# ─── Step 9: Replace Copy Job GUIDs + Connection & Import ────────────────────

log_step 9 "Replace Copy Job template GUIDs + connection ID and import"

# Replace placeholder workspace ID, lakehouse ID, and connection ID in copy job templates
for copyjob in "MyLHCopyJob.CopyJob" "MyLHCopyJob2.CopyJob"; do
  fab_replace_in_template "${copyjob}" "${PH_COPYJOB_WORKSPACE_ID}" "${WORKSPACE_ID}"
  fab_replace_in_template "${copyjob}" "${PH_COPYJOB_LAKEHOUSE_ID}" "${BRONZE_LAKEHOUSE_ID}"
  fab_replace_in_template "${copyjob}" "${PH_COPYJOB_CONNECTION_ID}" "${ADLS_CONNECTION_ID}"
  fab_import_item "${copyjob}" "CopyJob"
done
log_success "Both Copy Jobs imported with correct IDs and connection"

# ─── Step 10: Run Copy Jobs ──────────────────────────────────────────────────

if [[ "${SKIP_DATA}" == "false" ]]; then
  log_step 10 "Run Copy Jobs to ingest data from ADLS Gen2"

  COPYJOB1_ID=$(fab_get_item_id "MyLHCopyJob.CopyJob")
  COPYJOB2_ID=$(fab_get_item_id "MyLHCopyJob2.CopyJob")

  # Fire copy jobs (async 202 response — files are small: 13KB + 330KB)
  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB1_ID}" "MyLHCopyJob"
  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB2_ID}" "MyLHCopyJob2"

  # Poll for copy job completion (max 300s each) instead of static sleep
  log_info "Polling copy jobs for completion..."
  CJ1_OK=0
  CJ2_OK=0
  fab_poll_copy_job "${WORKSPACE_ID}" "${COPYJOB1_ID}" "MyLHCopyJob" 300 && CJ1_OK=1
  fab_poll_copy_job "${WORKSPACE_ID}" "${COPYJOB2_ID}" "MyLHCopyJob2" 300 && CJ2_OK=1

  if [[ "${CJ1_OK}" -eq 1 ]] && [[ "${CJ2_OK}" -eq 1 ]]; then
    log_success "Both copy jobs completed successfully"
  else
    log_warn "Copy job status: MyLHCopyJob=${CJ1_OK} MyLHCopyJob2=${CJ2_OK} — proceeding anyway"
  fi

  # Extra buffer for lakehouse table metadata to propagate
  log_info "Waiting 10s for table metadata to propagate..."
  sleep 10
  log_success "Copy jobs done, tables should be ready"
else
  log_step 10 "Run Copy Jobs (SKIPPED — --skip-data)"
fi

# ─── Step 11: Run Bronze Data Preparation ─────────────────────────────────────

if [[ "${SKIP_DATA}" == "false" ]]; then
  log_step 11 "Run Bronze_Data_Preparation notebook"

  # 11a: Get notebook item ID (needed for REST API)
  nb_id=$(fab_get_item_id "Bronze_Data_Preparation.Notebook" 2>/dev/null || echo "unknown")
  log_info "Notebook item ID: ${nb_id}"

  # 11b: Export the imported notebook to verify its metadata
  NB_EXPORT_DIR="/tmp/nb-export-verify"
  rm -rf "${NB_EXPORT_DIR}"
  log_info "Exporting imported notebook to verify metadata..."
  fab export -f "/${WORKSPACE_NAME}.Workspace/Bronze_Data_Preparation.Notebook" -o "${NB_EXPORT_DIR}" 2>&1 || true
  if [[ -f "${NB_EXPORT_DIR}/Bronze_Data_Preparation.Notebook/notebook-content.ipynb" ]]; then
    log_info "Exported notebook metadata:"
    python3 -c "
import json
with open('${NB_EXPORT_DIR}/Bronze_Data_Preparation.Notebook/notebook-content.ipynb') as f:
    nb = json.load(f)
m = nb.get('metadata', {})
print('dependencies:', json.dumps(m.get('dependencies', {}), indent=2))
print('spark_compute:', json.dumps(m.get('spark_compute', {}), indent=2))
print('sessionKeepAliveTimeout:', m.get('sessionKeepAliveTimeout'))
print('cell_count:', len(nb.get('cells', [])))
if nb.get('cells'):
    print('first_cell_source:', nb['cells'][0].get('source', []))
" 2>&1 || log_warn "Could not parse exported notebook"
  else
    log_warn "Notebook export did not produce expected file"
    ls -la "${NB_EXPORT_DIR}/" 2>&1 || true
  fi

  # 11c: Show notebook item details
  log_info "Notebook item details:"
  fab api "workspaces/${WORKSPACE_ID}/items/${nb_id}" 2>&1 | head -20 || true

  # 11d: Check Spark applications BEFORE running (baseline)
  log_info "Spark applications BEFORE notebook run:"
  fab api "workspaces/${WORKSPACE_ID}/spark/applications" 2>&1 | head -30 || true

  # 11e: Run the notebook via REST API (better error visibility than fab job run)
  log_info "Attempt 1: Running notebook via REST API..."
  if fab_run_notebook_rest "${WORKSPACE_ID}" "${nb_id}" "Bronze_Data_Preparation" 300; then
    log_success "Bronze data preparation completed (attempt 1)"
  else
    log_warn "Notebook attempt 1 FAILED"

    # Spark diagnostics after failure
    log_info "Spark livy sessions (detailed failure info):"
    LIVY_OUTPUT=$(fab api "workspaces/${WORKSPACE_ID}/spark/livySessions" 2>&1)
    echo "${LIVY_OUTPUT}" | head -80
    
    # Extract Spark application ID from livy output for detailed query
    SPARK_APP_ID=$(echo "${LIVY_OUTPUT}" | python3 -c "
import sys, json
try:
    data = json.loads(sys.stdin.read())
    text = data.get('text', data)
    for s in text.get('value', []):
        aid = s.get('sparkApplicationId', '')
        if aid:
            print(aid)
            break
except:
    pass
" 2>/dev/null)
    
    if [[ -n "${SPARK_APP_ID}" ]]; then
      log_info "Spark application ID: ${SPARK_APP_ID}"
      log_info "Spark application detail:"
      fab api "workspaces/${WORKSPACE_ID}/spark/applications/${SPARK_APP_ID}" 2>&1 | head -50 || true
      log_info "Spark application attempts:"
      fab api "workspaces/${WORKSPACE_ID}/spark/applications/${SPARK_APP_ID}/attempts" 2>&1 | head -50 || true
    fi

    # Check environment status
    log_info "Environment item status:"
    ENV_ID_CHECK=$(fab_get_item_id "MyEnv.Environment" 2>/dev/null || echo "unknown")
    fab api "workspaces/${WORKSPACE_ID}/environments/${ENV_ID_CHECK}" 2>&1 | head -30 || true

    # Retry after wait
    log_info "Waiting 60s before retry..."
    sleep 60

    log_info "Attempt 2: Retrying notebook via REST API..."
    if fab_run_notebook_rest "${WORKSPACE_ID}" "${nb_id}" "Bronze_Data_Preparation" 300; then
      log_success "Bronze data preparation completed (attempt 2)"
    else
      log_error "Bronze notebook FAILED on both attempts"

      # Final diagnostics — get all livy sessions with full details
      log_info "All Spark livy sessions:"
      fab api "workspaces/${WORKSPACE_ID}/spark/livySessions" 2>&1 || true

      log_info "All job instances:"
      fab api "workspaces/${WORKSPACE_ID}/items/${nb_id}/jobs/instances?jobType=RunNotebook" 2>&1 || true

      log_info "Workspace items:"
      fab ls "/${WORKSPACE_NAME}.Workspace" 2>&1 || true
      exit 1
    fi
  fi
else
  log_step 11 "Run Bronze_Data_Preparation notebook (SKIPPED — --skip-data)"
fi

# ─── Step 12: Run Transformations ─────────────────────────────────────────────

if [[ "${SKIP_DATA}" == "false" ]]; then
  log_step 12 "Run Transformations notebook (Bronze → Silver)"
  fab_run_notebook "Transformations.Notebook"
  log_success "Transformations completed"
else
  log_step 12 "Run Transformations notebook (SKIPPED — --skip-data)"
fi

# ─── Step 13: Replace & Import Semantic Model ─────────────────────────────────

log_step 13 "Replace Semantic Model metadata and import"

fab_replace_in_template "MySemanticModel.SemanticModel" \
  "${PH_SM_CONNECTION_STRING}" "${SILVER_SQL_CONN_STRING}"
fab_replace_in_template "MySemanticModel.SemanticModel" \
  "${PH_SM_SQL_ENDPOINT_ID}" "${SILVER_SQL_ENDPOINT_ID}"
fab_import_item "MySemanticModel.SemanticModel" "SemanticModel"
log_success "Semantic Model imported with correct connection"

# ─── Step 14: Replace & Import Report ─────────────────────────────────────────

log_step 14 "Replace Report metadata and import"

SEMANTIC_MODEL_ID=$(fab_get_item_id "MySemanticModel.SemanticModel")
log_info "Semantic Model ID: ${SEMANTIC_MODEL_ID:0:8}..."

fab_replace_in_template "MyReport.Report" \
  "${PH_REPORT_SM_ID}" "${SEMANTIC_MODEL_ID}"
fab_import_item "MyReport.Report" "Report"
log_success "Report imported pointing to Semantic Model"

# ─── Step 15: Connect Dev Workspace to Git ────────────────────────────────────

if [[ -n "${ADO_ORGANIZATION:-}" ]] && [[ -n "${ADO_PROJECT_NAME:-}" ]] && [[ -n "${ADO_REPO_NAME:-}" ]]; then
  log_step 15 "Connect Dev workspace to ADO Git repo /templates"

  log_info "ADO Org: ${ADO_ORGANIZATION}, Project: ${ADO_PROJECT_NAME}, Repo: ${ADO_REPO_NAME}"

  # Connect dev workspace to the /templates folder in the main pipeline repo
  # NOTE: This may fail with SPN auth (PrincipalTypeNotSupported for ADO Automatic credentials).
  #       Made non-fatal so the rest of provisioning completes.
  if fab_connect_workspace_to_git "${WORKSPACE_ID}" "${ADO_ORGANIZATION}" "${ADO_PROJECT_NAME}" "${ADO_REPO_NAME}" "main" "/templates"; then
    log_success "Dev workspace connected to ADO Git: ${ADO_ORGANIZATION}/${ADO_PROJECT_NAME}/${ADO_REPO_NAME} (/templates)"
  else
    log_warn "Git connection failed (likely SPN limitation with ADO). Workspace items are still provisioned."
  fi
else
  log_step 15 "Connect Dev workspace to Git (SKIPPED — ADO_ORGANIZATION, ADO_PROJECT_NAME, or ADO_REPO_NAME not set)"
fi

# ─── Step 16: Cleanup ─────────────────────────────────────────────────────────

log_step 16 "Cleanup"
cleanup_staging

# =============================================================================
# SUMMARY
# =============================================================================

echo ""
log_header "Provisioning Complete!"
echo "  Workspace:       ${WORKSPACE_NAME}"
echo ""
echo "  Items provisioned:"
echo "    ├── Workspace Identity (managed)"
echo "    ├── ADLS Gen2 Connection (${ADLS_CONNECTION_NAME})"
echo "    ├── MyEnv.Environment"
echo "    ├── Bronze_Data_Preparation.Notebook  → ${BRONZE_LAKEHOUSE_NAME}"
echo "    ├── Transformations.Notebook          → ${SILVER_LAKEHOUSE_NAME}"
echo "    ├── Validations.Notebook              → ${SILVER_LAKEHOUSE_NAME}"
echo "    ├── MyLHCopyJob.CopyJob"
echo "    ├── MyLHCopyJob2.CopyJob"
echo "    ├── MySemanticModel.SemanticModel"
echo "    └── MyReport.Report"
echo ""
if [[ -n "${ADO_ORGANIZATION:-}" ]]; then
  echo "  Git:             ${ADO_ORGANIZATION}/${ADO_PROJECT_NAME}/${ADO_REPO_NAME:-self} (main:/templates)"
fi
if [[ "${SKIP_DATA}" == "true" ]]; then
  echo "  ⚠️  Data pipeline was SKIPPED. Run manually:"
  echo "      ./scripts/run-data-pipeline.sh"
else
  echo "  Data pipeline completed successfully."
fi
echo ""
echo "  To open the workspace in your browser:"
echo "    fab open /${WORKSPACE_NAME}.Workspace"
echo ""
