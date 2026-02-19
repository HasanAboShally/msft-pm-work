#!/usr/bin/env bash
# =============================================================================
# Shared Utilities — Logging, Error Handling, Configuration
# =============================================================================
# Source this file in other scripts:
#   SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
#   source "${SCRIPT_DIR}/lib/utils.sh"
# =============================================================================

set -euo pipefail

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------

readonly COLOR_RED='\033[0;31m'
readonly COLOR_GREEN='\033[0;32m'
readonly COLOR_YELLOW='\033[0;33m'
readonly COLOR_BLUE='\033[0;34m'
readonly COLOR_CYAN='\033[0;36m'
readonly COLOR_RESET='\033[0m'

readonly ICON_CHECK="✅"
readonly ICON_CROSS="❌"
readonly ICON_ARROW="➜"
readonly ICON_WARN="⚠️"
readonly ICON_GEAR="⚙️"
readonly ICON_ROCKET="🚀"

# -----------------------------------------------------------------------------
# Logging
# -----------------------------------------------------------------------------

log_info()    { echo -e "${COLOR_BLUE}${ICON_ARROW}${COLOR_RESET} $*"; }
log_success() { echo -e "${COLOR_GREEN}${ICON_CHECK}${COLOR_RESET} $*"; }
log_warn()    { echo -e "${COLOR_YELLOW}${ICON_WARN}${COLOR_RESET} $*" >&2; }
log_error()   { echo -e "${COLOR_RED}${ICON_CROSS}${COLOR_RESET} $*" >&2; }
log_step()    { echo -e "\n${COLOR_CYAN}${ICON_GEAR} Step $1: $2${COLOR_RESET}"; }
log_header()  { echo -e "\n${COLOR_GREEN}════════════════════════════════════════${COLOR_RESET}"; \
                echo -e "${COLOR_GREEN}  ${ICON_ROCKET} $*${COLOR_RESET}"; \
                echo -e "${COLOR_GREEN}════════════════════════════════════════${COLOR_RESET}\n"; }

# -----------------------------------------------------------------------------
# Error Handling
# -----------------------------------------------------------------------------

on_error() {
  local exit_code=$?
  local line_no=$1
  log_error "Script failed at line ${line_no} with exit code ${exit_code}"
  cleanup_staging 2>/dev/null || true
  exit "${exit_code}"
}

trap 'on_error ${LINENO}' ERR

# -----------------------------------------------------------------------------
# Configuration Loading
# -----------------------------------------------------------------------------

# Load Terraform outputs from the auto-generated .env file
load_terraform_outputs() {
  local env_file="${PROJECT_ROOT}/.terraform-outputs.env"

  if [[ ! -f "${env_file}" ]]; then
    log_error "Terraform outputs not found: ${env_file}"
    log_error "Run 'terraform apply' first, or set environment variables manually."
    exit 1
  fi

  log_info "Loading Terraform outputs from ${env_file}"
  # shellcheck disable=SC1090
  # Use eval instead of source <(...) — process substitution with source
  # doesn't reliably set variables in all bash versions with set -u.
  eval "$(grep -v '^\s*#' "${env_file}" | sed 's/^\s*//')"
  log_success "Loaded: WORKSPACE_NAME=${WORKSPACE_NAME}, WORKSPACE_ID=${WORKSPACE_ID:0:8}..."
}

# Validate that all required variables are set
require_vars() {
  local missing=()
  for var_name in "$@"; do
    if [[ -z "${!var_name:-}" ]]; then
      missing+=("${var_name}")
    fi
  done
  if [[ ${#missing[@]} -gt 0 ]]; then
    log_error "Missing required variables: ${missing[*]}"
    log_error "Either run Terraform first or export them manually."
    exit 1
  fi
}

# -----------------------------------------------------------------------------
# Staging Directory Management
# -----------------------------------------------------------------------------

STAGING_DIR=""

create_staging() {
  local templates_dir="${PROJECT_ROOT}/templates"

  if [[ ! -d "${templates_dir}" ]] || [[ -z "$(ls -A "${templates_dir}" 2>/dev/null)" ]]; then
    log_error "Templates directory is empty: ${templates_dir}"
    log_error "Run './scripts/setup.sh' first to populate templates."
    exit 1
  fi

  STAGING_DIR=$(mktemp -d "${TMPDIR:-/tmp}/fabric-demo-XXXXXX")
  log_info "Creating staging directory: ${STAGING_DIR}"
  cp -r "${templates_dir}"/* "${STAGING_DIR}/"
  log_success "Copied templates to staging"
}

cleanup_staging() {
  if [[ -n "${STAGING_DIR}" ]] && [[ -d "${STAGING_DIR}" ]]; then
    rm -rf "${STAGING_DIR}"
    log_info "Cleaned up staging directory"
  fi
}

# -----------------------------------------------------------------------------
# Retry Helper
# -----------------------------------------------------------------------------

# Retry a command with exponential backoff
# Usage: retry 5 2 some_command arg1 arg2
retry() {
  local max_attempts=$1
  local delay=$2
  shift 2
  local attempt=1

  while [[ ${attempt} -le ${max_attempts} ]]; do
    if "$@"; then
      return 0
    fi
    if [[ ${attempt} -lt ${max_attempts} ]]; then
      log_warn "Attempt ${attempt}/${max_attempts} failed. Retrying in ${delay}s..."
      sleep "${delay}"
      delay=$((delay * 2))
    fi
    attempt=$((attempt + 1))
  done

  log_error "All ${max_attempts} attempts failed for: $*"
  return 1
}

# -----------------------------------------------------------------------------
# Confirmation Prompt
# -----------------------------------------------------------------------------

confirm() {
  local message="${1:-Continue?}"
  read -r -p "$(echo -e "${COLOR_YELLOW}${message} [y/N] ${COLOR_RESET}")" response
  [[ "${response}" =~ ^[Yy]$ ]]
}
