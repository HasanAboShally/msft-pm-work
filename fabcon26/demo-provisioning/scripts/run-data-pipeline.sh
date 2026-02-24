#!/usr/bin/env bash
# =============================================================================
# Run Data Pipeline — Execute Copy Jobs & Notebooks
# =============================================================================
# Standalone script to run the data pipeline (independent of provisioning).
# Use this after provisioning with --skip-data, or to re-run the pipeline
# at any time.
#
# Pipeline Flow:
#   Copy Jobs → [Bronze_Data_Preparation ‖ Transformations] → Validations
#   (Bronze & Transformations run in parallel to save ~3 min Spark cold start)
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

log_header "Fabric E2E Demo — Run Data Pipeline"

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

  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB1_ID}" "MyLHCopyJob" || log_warn "Failed to start MyLHCopyJob"
  fab_run_copy_job "${WORKSPACE_ID}" "${COPYJOB2_ID}" "MyLHCopyJob2" || log_warn "Failed to start MyLHCopyJob2"

  # Poll copy jobs for completion (max 300s each) instead of blind sleep
  log_info "Polling copy jobs for completion (max 300s each)..."
  fab_poll_copy_job "${WORKSPACE_ID}" "${COPYJOB1_ID}" "MyLHCopyJob" 300 || log_warn "MyLHCopyJob polling ended (may have failed — Bronze notebook will self-heal)"
  fab_poll_copy_job "${WORKSPACE_ID}" "${COPYJOB2_ID}" "MyLHCopyJob2" 300 || log_warn "MyLHCopyJob2 polling ended (may have failed — Bronze notebook will self-heal)"
  log_success "Copy jobs step completed"
else
  log_step 1 "Copy Jobs (SKIPPED — --skip-copy)"
fi

# Step 2: Run Bronze & Transformations in PARALLEL (they are independent)
log_step 2 "Run Bronze_Data_Preparation + Transformations notebooks in parallel"

BRONZE_OK=0
TRANSFORM_OK=0

# Run Bronze in background
(
  fab_run_notebook "Bronze_Data_Preparation.Notebook" && \
    log_success "Bronze_Data_Preparation completed"
) &
BRONZE_PID=$!

# Run Transformations in background
(
  fab_run_notebook "Transformations.Notebook" && \
    log_success "Transformations completed"
) &
TRANSFORM_PID=$!

log_info "Waiting for parallel notebooks: Bronze(PID=$BRONZE_PID) Transformations(PID=$TRANSFORM_PID)"

# Wait for both — capture exit codes
wait $BRONZE_PID && BRONZE_OK=1 || log_warn "Bronze_Data_Preparation notebook failed (exit=$?)"
wait $TRANSFORM_PID && TRANSFORM_OK=1 || log_warn "Transformations notebook failed (exit=$?)"

if [[ "$BRONZE_OK" -eq 0 ]] && [[ "$TRANSFORM_OK" -eq 0 ]]; then
  log_error "Both notebooks failed — cannot proceed with Validations"
  exit 1
fi
if [[ "$BRONZE_OK" -eq 0 ]] || [[ "$TRANSFORM_OK" -eq 0 ]]; then
  log_warn "One notebook failed — attempting Validations anyway"
fi
log_success "Parallel notebook step completed (Bronze=$BRONZE_OK, Transformations=$TRANSFORM_OK)"

# Step 3: Run Validations (depends on both Bronze and Transformations)
log_step 3 "Run Validations notebook"
fab_run_notebook "Validations.Notebook"
log_success "Validations completed"

echo ""
log_header "Data Pipeline Complete"
echo "  All notebooks executed successfully."
echo ""
echo "  To open the workspace:"
echo "    fab open /${WORKSPACE_NAME}.Workspace"
echo ""
