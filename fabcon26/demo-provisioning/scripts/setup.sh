#!/usr/bin/env bash
# =============================================================================
# Setup Script — Clone Demo Repo & Extract Templates
# =============================================================================
# Populates the templates/ directory with item definitions from the
# DaniBunny/Fabric-DE-CICD workshop repository.
#
# Usage:
#   ./scripts/setup.sh                    # Clone from GitHub (default)
#   ./scripts/setup.sh --local /path/to   # Copy from a local checkout
#
# This script is idempotent — it will overwrite existing templates.
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
export PROJECT_ROOT
source "${SCRIPT_DIR}/lib/utils.sh"

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

readonly REPO_URL="https://github.com/DaniBunny/Fabric-DE-CICD.git"
readonly TEMPLATE_SOURCE="deployment/workshop_template"
readonly TEMPLATES_DIR="${PROJECT_ROOT}/templates"
CLONE_DIR=$(mktemp -d "${TMPDIR:-/tmp}/fabric-demo-clone-XXXXXX")
readonly CLONE_DIR

# Template items expected to be present after setup
readonly EXPECTED_ITEMS=(
  "Bronze_Data_Preparation.Notebook"
  "Transformations.Notebook"
  "Validations.Notebook"
  "MyEnv.Environment"
  "MyLHCopyJob.CopyJob"
  "MyLHCopyJob2.CopyJob"
  "MySemanticModel.SemanticModel"
  "MyReport.Report"
)

# -----------------------------------------------------------------------------
# Parse Arguments
# -----------------------------------------------------------------------------

LOCAL_PATH=""

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --local)
      LOCAL_PATH="$2"
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [--local /path/to/Fabric-DE-CICD]"
      echo ""
      echo "Options:"
      echo "  --local PATH   Use a local checkout instead of cloning from GitHub"
      echo "  --help, -h     Show this help message"
      exit 0
      ;;
    *)
      log_error "Unknown argument: $1"
      exit 1
      ;;
  esac
  shift
done

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------

log_header "FabCon 26 Demo — Template Setup"

# Step 1: Get the source templates
if [[ -n "${LOCAL_PATH}" ]]; then
  # Use local checkout
  if [[ ! -d "${LOCAL_PATH}/${TEMPLATE_SOURCE}" ]]; then
    log_error "Template directory not found: ${LOCAL_PATH}/${TEMPLATE_SOURCE}"
    log_error "Make sure the path points to the root of the Fabric-DE-CICD repository."
    exit 1
  fi
  log_info "Using local checkout: ${LOCAL_PATH}"
  SOURCE_DIR="${LOCAL_PATH}/${TEMPLATE_SOURCE}"
else
  # Clone from GitHub (shallow clone for speed)
  log_info "Cloning ${REPO_URL} (shallow)..."
  git clone --depth 1 --single-branch "${REPO_URL}" "${CLONE_DIR}"
  SOURCE_DIR="${CLONE_DIR}/${TEMPLATE_SOURCE}"
fi

# Step 2: Validate source
if [[ ! -d "${SOURCE_DIR}" ]]; then
  log_error "Template source directory not found: ${SOURCE_DIR}"
  exit 1
fi

# Step 3: Copy templates
log_info "Copying templates to ${TEMPLATES_DIR}/"

# Clear existing templates (but keep .gitkeep)
find "${TEMPLATES_DIR}" -mindepth 1 -not -name '.gitkeep' -exec rm -rf {} + 2>/dev/null || true

# Copy all item directories
cp -r "${SOURCE_DIR}"/* "${TEMPLATES_DIR}/"
log_success "Templates copied successfully"

# Step 4: Validate all expected items are present
log_info "Validating template completeness..."
missing=()
for item in "${EXPECTED_ITEMS[@]}"; do
  if [[ -d "${TEMPLATES_DIR}/${item}" ]]; then
    log_success "  Found: ${item}"
  else
    log_error "  Missing: ${item}"
    missing+=("${item}")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  log_error "Missing ${#missing[@]} template(s). The demo may not work correctly."
  exit 1
fi

# Step 5: Cleanup clone directory
if [[ -d "${CLONE_DIR}" ]]; then
  rm -rf "${CLONE_DIR}"
  log_info "Cleaned up clone directory"
fi

# Step 6: Copy ADO support files from local checkout (if available)
if [[ -n "${LOCAL_PATH}" ]] && [[ -d "${LOCAL_PATH}/AzDO" ]]; then
  log_info "Found AzDO directory in local checkout — copying reference files..."
  cp -r "${LOCAL_PATH}/AzDO"/* "${PROJECT_ROOT}/ado/" 2>/dev/null || true
  log_success "ADO reference files copied"
fi

# Summary
echo ""
log_header "Setup Complete"
echo "Templates directory: ${TEMPLATES_DIR}/"
echo ""
echo "Items ready for provisioning:"
for item in "${EXPECTED_ITEMS[@]}"; do
  echo "  📦 ${item}"
done
echo ""
echo "Next steps:"
echo "  1. cd terraform && terraform init && terraform apply"
echo "  2. cd .. && ./scripts/provision-items.sh"
echo ""
