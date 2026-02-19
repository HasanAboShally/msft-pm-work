#!/usr/bin/env bash
# =============================================================================
# Provision Fabric Items — Complete Item Provisioning via fabric-cli
# =============================================================================
# This script imports all Fabric items (Notebooks, Copy Jobs, Environment,
# Semantic Model, Report), sets lakehouse bindings, creates shortcuts, and
# optionally populates data by running Copy Jobs and Notebooks.
#
# PREREQUISITES:
#   1. Run ./scripts/setup.sh first (populates templates/)
#   2. Run terraform apply first (creates workspace + lakehouses)
#   3. fabric-cli (fab) installed and authenticated
#   4. jq installed (for JSON manipulation)
#
# Usage:
#   ./scripts/provision-items.sh                      # Auto-reads Terraform outputs
#   ./scripts/provision-items.sh --skip-data           # Skip data pipeline execution
#   ./scripts/provision-items.sh --dry-run             # Show what would be done
#
# Environment variable overrides (bypass Terraform outputs):
#   WORKSPACE_NAME, WORKSPACE_ID, BRONZE_LAKEHOUSE_ID, SILVER_LAKEHOUSE_ID
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

# Semantic Model template placeholders
readonly PH_SM_CONNECTION_STRING="X6EPS4XRQ2XUDENLFV6NAEO3I4-RXDQZDTHC2EE5FJDUBGB2XORQ4.msit-datawarehouse.fabric.microsoft.com"
readonly PH_SM_SQL_ENDPOINT_ID="48d64684-b584-4ef5-ad7b-a094b42f52f8"

# Report template placeholders
readonly PH_REPORT_SM_ID="e4e9593c-b1a9-428e-9581-64939a83c4d9"

# =============================================================================
# MAIN PROVISIONING FLOW
# =============================================================================

log_header "FabCon 26 Demo — Provision Fabric Items"

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
  echo "  2. Create staging from templates/"
  echo "  3. Import MyEnv.Environment"
  echo "  4. Import 3 Notebooks with lakehouse bindings"
  echo "  5. Replace Copy Job GUIDs and import 2 Copy Jobs"
  echo "  6. Run Copy Jobs (unless --skip-data)"
  echo "  7. Create 2 OneLake shortcuts (Silver → Bronze)"
  echo "  8. Run data pipeline notebooks (unless --skip-data)"
  echo "  9. Replace Semantic Model metadata and import"
  echo " 10. Replace Report metadata and import"
  echo " 11. Clean up staging"
  exit 0
fi

# ─── Step 1: Authenticate ────────────────────────────────────────────────────

log_step 1 "Check authentication and configure CLI"
fab_check_auth
fab_set_command_line_mode

# ─── Step 2: Create staging directory ─────────────────────────────────────────

log_step 2 "Create staging directory from templates"
create_staging
log_success "Staging ready: ${STAGING_DIR}"

# ─── Step 3: Import Environment ──────────────────────────────────────────────

log_step 3 "Import Spark Environment"
fab_import_item "MyEnv.Environment" "Environment"
log_success "Environment imported"

# ─── Step 4: Retrieve lakehouse properties ───────────────────────────────────

log_step 4 "Retrieve lakehouse properties (SQL endpoint may take a moment)"

# Bronze and Silver IDs are already known from Terraform.
# But we need the Silver SQL endpoint properties for the Semantic Model.
log_info "Retrieving Silver SQL Endpoint ID..."
SILVER_SQL_ENDPOINT_ID=$(fab_get_property "${SILVER_PATH}" "properties.sqlEndpointProperties.id")
log_success "Silver SQL Endpoint ID: ${SILVER_SQL_ENDPOINT_ID:0:8}..."

log_info "Retrieving Silver SQL Connection String..."
SILVER_SQL_CONN_STRING=$(fab_get_property "${SILVER_PATH}" "properties.sqlEndpointProperties.connectionString")
log_success "Silver SQL Connection String: ${SILVER_SQL_CONN_STRING:0:30}..."

# ─── Step 5: Import Notebooks ────────────────────────────────────────────────

log_step 5 "Import Notebooks and set lakehouse bindings"

# 5a: Import all 3 notebooks
for notebook in "Bronze_Data_Preparation.Notebook" "Transformations.Notebook" "Validations.Notebook"; do
  fab_import_item "${notebook}" "Notebook"
done
log_success "All 3 notebooks imported"

# 5b: Set lakehouse bindings
# - Transformations & Validations → Silver lakehouse
# - Bronze_Data_Preparation → Bronze lakehouse
fab_bind_notebook "Transformations.Notebook"         "${SILVER_LAKEHOUSE_ID}" "${SILVER_LAKEHOUSE_NAME}" "${WORKSPACE_ID}"
fab_bind_notebook "Validations.Notebook"             "${SILVER_LAKEHOUSE_ID}" "${SILVER_LAKEHOUSE_NAME}" "${WORKSPACE_ID}"
fab_bind_notebook "Bronze_Data_Preparation.Notebook" "${BRONZE_LAKEHOUSE_ID}" "${BRONZE_LAKEHOUSE_NAME}" "${WORKSPACE_ID}"
log_success "All notebook lakehouse bindings set"

# ─── Step 6: Replace Copy Job GUIDs & Import ─────────────────────────────────

log_step 6 "Replace Copy Job template GUIDs and import"

# Replace placeholder workspace ID and lakehouse ID in copy job templates
for copyjob in "MyLHCopyJob.CopyJob" "MyLHCopyJob2.CopyJob"; do
  fab_replace_in_template "${copyjob}" "${PH_COPYJOB_WORKSPACE_ID}" "${WORKSPACE_ID}"
  fab_replace_in_template "${copyjob}" "${PH_COPYJOB_LAKEHOUSE_ID}" "${BRONZE_LAKEHOUSE_ID}"
  fab_import_item "${copyjob}" "CopyJob"
done
log_success "Both Copy Jobs imported with correct IDs"

# ─── Step 7: Run Copy Jobs ───────────────────────────────────────────────────

if [[ "${SKIP_DATA}" == "false" ]]; then
  log_step 7 "Run Copy Jobs to ingest external data"

  COPYJOB1_ID=$(fab_get_item_id "MyLHCopyJob.CopyJob")
  COPYJOB2_ID=$(fab_get_item_id "MyLHCopyJob2.CopyJob")

  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB1_ID}" "MyLHCopyJob"
  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB2_ID}" "MyLHCopyJob2"

  # Wait for copy jobs to complete (they run asynchronously)
  log_info "Waiting 30s for copy jobs to complete..."
  sleep 30
  log_success "Copy jobs executed"
else
  log_step 7 "Run Copy Jobs (SKIPPED — --skip-data)"
fi

# ─── Step 8: Create Shortcuts ────────────────────────────────────────────────

log_step 8 "Create OneLake shortcuts (Silver → Bronze)"

# t2: Silver/Tables/dbo/t2 → Bronze/Tables/dbo/t2
fab_create_shortcut "t2" "t2" "${SILVER_PATH}" "${BRONZE_PATH}"

# Wait for t3_dev to be available if we ran the copy jobs
if [[ "${SKIP_DATA}" == "false" ]]; then
  log_info "Running Bronze_Data_Preparation notebook to create t3 tables..."
  fab_run_notebook "Bronze_Data_Preparation.Notebook"
  log_success "Bronze_Data_Preparation completed"
fi

# t3: Silver/Tables/dbo/t3 → Bronze/Tables/dbo/t3_dev
fab_create_shortcut "t3" "t3_dev" "${SILVER_PATH}" "${BRONZE_PATH}"

log_success "Shortcuts created"

# ─── Step 9: Run Data Pipeline ───────────────────────────────────────────────

if [[ "${SKIP_DATA}" == "false" ]]; then
  log_step 9 "Run Transformations notebook (Bronze → Silver)"
  fab_run_notebook "Transformations.Notebook"
  log_success "Transformations completed"
else
  log_step 9 "Run Transformations notebook (SKIPPED — --skip-data)"
fi

# ─── Step 10: Replace & Import Semantic Model ─────────────────────────────────

log_step 10 "Replace Semantic Model metadata and import"

fab_replace_in_template "MySemanticModel.SemanticModel" \
  "${PH_SM_CONNECTION_STRING}" "${SILVER_SQL_CONN_STRING}"
fab_replace_in_template "MySemanticModel.SemanticModel" \
  "${PH_SM_SQL_ENDPOINT_ID}" "${SILVER_SQL_ENDPOINT_ID}"
fab_import_item "MySemanticModel.SemanticModel" "SemanticModel"
log_success "Semantic Model imported with correct connection"

# ─── Step 11: Replace & Import Report ─────────────────────────────────────────

log_step 11 "Replace Report metadata and import"

SEMANTIC_MODEL_ID=$(fab_get_item_id "MySemanticModel.SemanticModel")
log_info "Semantic Model ID: ${SEMANTIC_MODEL_ID:0:8}..."

fab_replace_in_template "MyReport.Report" \
  "${PH_REPORT_SM_ID}" "${SEMANTIC_MODEL_ID}"
fab_import_item "MyReport.Report" "Report"
log_success "Report imported pointing to Semantic Model"

# ─── Step 12: Cleanup ─────────────────────────────────────────────────────────

log_step 12 "Cleanup"
cleanup_staging

# =============================================================================
# SUMMARY
# =============================================================================

echo ""
log_header "Provisioning Complete!"
echo "  Workspace:       ${WORKSPACE_NAME}"
echo ""
echo "  Items provisioned:"
echo "    ├── MyEnv.Environment"
echo "    ├── Bronze_Data_Preparation.Notebook  → ${BRONZE_LAKEHOUSE_NAME}"
echo "    ├── Transformations.Notebook          → ${SILVER_LAKEHOUSE_NAME}"
echo "    ├── Validations.Notebook              → ${SILVER_LAKEHOUSE_NAME}"
echo "    ├── MyLHCopyJob.CopyJob"
echo "    ├── MyLHCopyJob2.CopyJob"
echo "    ├── Lakehouse_Silver/t2.Shortcut      → Bronze/t2"
echo "    ├── Lakehouse_Silver/t3.Shortcut      → Bronze/t3_dev"
echo "    ├── MySemanticModel.SemanticModel"
echo "    └── MyReport.Report"
echo ""
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
