#!/usr/bin/env bash
# =============================================================================
# Run Data Pipeline — Execute Copy Jobs & Notebooks
# =============================================================================
# Standalone script to run the data pipeline (independent of provisioning).
# Use this after provisioning with --skip-data, or to re-run the pipeline
# at any time.
#
# Pipeline Flow:
#   Copy Jobs → Bronze_Data_Preparation → Shortcuts → Transformations → Validations
#
# Usage:
#   ./scripts/run-data-pipeline.sh                # Full pipeline
#   ./scripts/run-data-pipeline.sh --skip-copy    # Skip copy jobs (data exists)
#   ./scripts/run-data-pipeline.sh --validate     # Run Validations only
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

SKIP_COPY=false
VALIDATE_ONLY=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --skip-copy)      SKIP_COPY=true ;;
    --validate)       VALIDATE_ONLY=true ;;
    --help|-h)
      echo "Usage: $0 [--skip-copy] [--validate]"
      echo ""
      echo "Options:"
      echo "  --skip-copy    Skip running Copy Jobs (assume data exists)"
      echo "  --validate     Run only the Validations notebook"
      echo "  --help, -h     Show this help message"
      exit 0
      ;;
    *) log_error "Unknown argument: $1"; exit 1 ;;
  esac
  shift
done

# =============================================================================
# MAIN
# =============================================================================

log_header "FabCon 26 Demo — Run Data Pipeline"

# Load configuration
load_terraform_outputs
require_vars WORKSPACE_NAME WORKSPACE_ID

fab_check_auth
fab_set_command_line_mode

if [[ "${VALIDATE_ONLY}" == "true" ]]; then
  log_step 1 "Running Validations notebook"
  fab_run_notebook "Validations.Notebook"
  log_success "Validations completed"
  exit 0
fi

# Step 1: Run Copy Jobs
if [[ "${SKIP_COPY}" == "false" ]]; then
  log_step 1 "Run Copy Jobs to ingest external data"

  COPYJOB1_ID=$(fab_get_item_id "MyLHCopyJob.CopyJob")
  COPYJOB2_ID=$(fab_get_item_id "MyLHCopyJob2.CopyJob")

  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB1_ID}" "MyLHCopyJob"
  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB2_ID}" "MyLHCopyJob2"

  log_info "Waiting 30s for copy jobs to complete..."
  sleep 30
  log_success "Copy jobs completed"
else
  log_step 1 "Copy Jobs (SKIPPED — --skip-copy)"
fi

# Step 2: Run Bronze_Data_Preparation
log_step 2 "Run Bronze_Data_Preparation notebook"
fab_run_notebook "Bronze_Data_Preparation.Notebook"
log_success "Bronze data preparation completed"

# Step 3: Run Transformations (Bronze → Silver)
log_step 3 "Run Transformations notebook (Bronze → Silver)"
fab_run_notebook "Transformations.Notebook"
log_success "Transformations completed"

# Step 4: Run Validations
log_step 4 "Run Validations notebook"
fab_run_notebook "Validations.Notebook"
log_success "Validations completed"

echo ""
log_header "Data Pipeline Complete"
echo "  All notebooks executed successfully."
echo ""
echo "  To open the workspace:"
echo "    fab open /${WORKSPACE_NAME}.Workspace"
echo ""
