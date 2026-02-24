#!/usr/bin/env bash
# =============================================================================
# Teardown — Destroy the demo workspace and all contents
# =============================================================================
# Removes the development workspace and all items. Use this for cleanup
# after the demo or to start fresh.
#
# Usage:
#   ./scripts/teardown.sh                 # Interactive confirmation
#   ./scripts/teardown.sh --force         # Skip confirmation
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
export PROJECT_ROOT
source "${SCRIPT_DIR}/lib/utils.sh"
source "${SCRIPT_DIR}/lib/fab-helpers.sh"

# Options
FORCE=false
[[ "${1:-}" == "--force" ]] && FORCE=true

# Load configuration
load_terraform_outputs
require_vars WORKSPACE_NAME

log_header "Fabric E2E Demo — Teardown"
echo "  ⚠️  This will permanently delete:"
echo "      Workspace: ${WORKSPACE_NAME}"
echo "      And ALL items within it."
echo ""

if [[ "${FORCE}" != "true" ]]; then
  if ! confirm "Are you sure you want to proceed?"; then
    log_info "Teardown cancelled."
    exit 0
  fi
fi

fab_check_auth
fab_set_command_line_mode

log_info "Deleting workspace: ${WORKSPACE_NAME}..."
run_fab "Deleting workspace" rm -f "/${WORKSPACE_NAME}.Workspace"
log_success "Workspace deleted: ${WORKSPACE_NAME}"

# Also destroy Terraform state
if [[ -f "${PROJECT_ROOT}/terraform/terraform.tfstate" ]]; then
  log_info "Cleaning up Terraform state..."
  # Use ~/bin/terraform if available (>= 1.8), else fall back to PATH
  TERRAFORM_BIN=$([[ -x "${HOME}/bin/terraform" ]] && echo "${HOME}/bin/terraform" || echo "terraform")
  cd "${PROJECT_ROOT}/terraform"
  "${TERRAFORM_BIN}" destroy -auto-approve 2>/dev/null || true
  cd "${PROJECT_ROOT}"
fi

# Clean up generated files
rm -f "${PROJECT_ROOT}/.terraform-outputs.env"
log_success "Cleanup complete"

echo ""
log_info "To also clean up Test/Prod workspaces (if created by CI/CD), delete them manually:"
echo "    fab rm -f /${WORKSPACE_NAME}_Test.Workspace"
echo "    fab rm -f /${WORKSPACE_NAME}_Prod.Workspace"
echo ""
