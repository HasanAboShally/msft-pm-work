#!/usr/bin/env bash
# =============================================================================
# Fabric CLI Helper Functions
# =============================================================================
# Wrapper functions around `fab` (fabric-cli) commands with error handling,
# logging, and retry logic. Mirrors the patterns from the DaniBunny
# Fabric-DE-CICD workshop but restructured for clarity and robustness.
#
# Source this file after utils.sh:
#   source "${SCRIPT_DIR}/lib/utils.sh"
#   source "${SCRIPT_DIR}/lib/fab-helpers.sh"
# =============================================================================

# -----------------------------------------------------------------------------
# Core: Run a fabric-cli command
# -----------------------------------------------------------------------------

run_fab() {
  local description="$1"
  shift
  log_info "${description}"
  if ! fab "$@"; then
    log_error "fab command failed: fab $*"
    return 1
  fi
}

# Silent run — captures output without logging
run_fab_quiet() {
  fab "$@" 2>/dev/null | tr -d '\r'
}

# -----------------------------------------------------------------------------
# Authentication
# -----------------------------------------------------------------------------

fab_check_auth() {
  log_info "Checking fabric-cli authentication..."
  if fab auth status &>/dev/null; then
    log_success "Already authenticated"
  else
    log_warn "Not authenticated. Attempting login..."
    if [[ -n "${FAB_CLIENT_ID:-}" ]] && [[ -n "${FAB_CLIENT_SECRET:-}" ]] && [[ -n "${FAB_TENANT_ID:-}" ]]; then
      log_info "Using SPN authentication"
      fab auth login -u "${FAB_CLIENT_ID}" -p "${FAB_CLIENT_SECRET}" --tenant "${FAB_TENANT_ID}"
    else
      log_info "Using interactive (Azure CLI) authentication"
      fab auth login
    fi
    log_success "Authentication successful"
  fi
}

# -----------------------------------------------------------------------------
# Non-Interactive Mode
# -----------------------------------------------------------------------------

# Ensure fabric-cli runs in non-interactive (command_line) mode.
# This prevents prompts like "Are you sure?" from blocking scripts.
fab_set_command_line_mode() {
  log_info "Setting fabric-cli to command_line mode (non-interactive)..."
  fab config set mode command_line 2>/dev/null || true
  log_success "fabric-cli mode set to command_line"
}

# -----------------------------------------------------------------------------
# Property Retrieval (with retry for async provisioning)
# -----------------------------------------------------------------------------

# Get a property from a Fabric item, retrying until it's available.
# Some properties (like SQL endpoint) are provisioned asynchronously.
#
# Usage: result=$(fab_get_property "/workspace/item" "property.path")
fab_get_property() {
  local item_path="$1"
  local property="$2"
  local max_attempts="${3:-12}"   # Default: 12 attempts
  local delay="${4:-5}"           # Default: 5 seconds between attempts
  local attempt=1
  local value=""

  while [[ ${attempt} -le ${max_attempts} ]]; do
    value=$(run_fab_quiet get "${item_path}" -q "${property}" || echo "")
    # Trim whitespace
    value=$(echo "${value}" | xargs)

    if [[ -n "${value}" ]] && [[ "${value}" != "None" ]] && [[ "${value}" != "null" ]]; then
      echo "${value}"
      return 0
    fi

    if [[ ${attempt} -lt ${max_attempts} ]]; then
      log_warn "Property '${property}' not available yet (attempt ${attempt}/${max_attempts}). Waiting ${delay}s..."
      sleep "${delay}"
    fi
    attempt=$((attempt + 1))
  done

  log_error "Failed to retrieve property '${property}' from '${item_path}' after ${max_attempts} attempts"
  return 1
}

# -----------------------------------------------------------------------------
# Item Import
# -----------------------------------------------------------------------------

# Import a Fabric item from a staging directory.
# Usage: fab_import_item "MyEnv.Environment" "Environment"
fab_import_item() {
  local item_name="$1"
  local item_type="$2"
  local workspace_path="/${WORKSPACE_NAME}.Workspace"
  local staging_path="${STAGING_DIR}/${item_name}"

  if [[ ! -d "${staging_path}" ]]; then
    log_error "Template not found: ${staging_path}"
    return 1
  fi

  run_fab "Importing ${item_type}: ${item_name}" \
    import -f "${workspace_path}/${item_name}" -i "${staging_path}"
}

# -----------------------------------------------------------------------------
# Notebook Lakehouse Binding
# -----------------------------------------------------------------------------

# Set the default lakehouse for a notebook.
# Usage: fab_bind_notebook "Notebook.Notebook" "lakehouse_id" "Lakehouse_Name" "workspace_id"
fab_bind_notebook() {
  local notebook_name="$1"
  local lakehouse_id="$2"
  local lakehouse_name="$3"
  local workspace_id="$4"
  local workspace_path="/${WORKSPACE_NAME}.Workspace"

  local binding_json
  binding_json=$(cat <<-ENDJSON
{
  "known_lakehouses": [{"id": "${lakehouse_id}"}],
  "default_lakehouse": "${lakehouse_id}",
  "default_lakehouse_name": "${lakehouse_name}",
  "default_lakehouse_workspace_id": "${workspace_id}"
}
ENDJSON
  )

  run_fab "Setting lakehouse binding: ${notebook_name} → ${lakehouse_name}" \
    set -f "${workspace_path}/${notebook_name}" -q lakehouse -i "${binding_json}"
}

# -----------------------------------------------------------------------------
# Shortcut Creation
# -----------------------------------------------------------------------------

# Create an OneLake shortcut (table-to-table within the same workspace).
# Idempotent: skips creation if shortcut already exists.
# Usage: fab_create_shortcut "target_table" "source_table" "Silver LH path" "Bronze LH path"
fab_create_shortcut() {
  local shortcut_name="$1"
  local source_table="$2"
  local silver_lh_path="$3"
  local bronze_lh_path="$4"
  local shortcut_path="${silver_lh_path}/Tables/dbo/${shortcut_name}.Shortcut"

  # Check if shortcut already exists (idempotent)
  local exists_result
  exists_result=$(fab exists "${shortcut_path}" 2>/dev/null | tr -d '\r' | xargs || echo "false")
  if [[ "${exists_result}" == *"true"* ]]; then
    log_info "Shortcut ${shortcut_name} already exists — skipping"
    return 0
  fi

  run_fab "Creating shortcut: ${shortcut_name} → ${source_table}" \
    ln "${shortcut_path}" \
    --type oneLake \
    --target "${bronze_lh_path}/Tables/dbo/${source_table}"
}

# -----------------------------------------------------------------------------
# Job Execution
# -----------------------------------------------------------------------------

# Run a notebook and wait for completion.
# Usage: fab_run_notebook "Bronze_Data_Preparation.Notebook"
fab_run_notebook() {
  local notebook_name="$1"
  local workspace_path="/${WORKSPACE_NAME}.Workspace"

  run_fab "Running notebook: ${notebook_name}" \
    job run "${workspace_path}/${notebook_name}"
}

# Run a copy job via the Fabric REST API.
# Usage: fab_run_copy_job "workspace_id" "copyjob_id"
fab_run_copy_job() {
  local ws_id="$1"
  local copyjob_id="$2"
  local copyjob_name="${3:-CopyJob}"

  log_info "Running copy job: ${copyjob_name} (${copyjob_id:0:8}...)"
  fab api -X post "workspaces/${ws_id}/items/${copyjob_id}/jobs/instances?jobType=Execute"
}

# -----------------------------------------------------------------------------
# Metadata Replacement (in staging templates)
# -----------------------------------------------------------------------------

# Replace a string in all files within a staging item directory.
# Uses sed for cross-platform compatibility.
# Usage: fab_replace_in_template "MyLHCopyJob.CopyJob" "OLD_GUID" "NEW_GUID"
fab_replace_in_template() {
  local item_name="$1"
  local find_str="$2"
  local replace_str="$3"
  local target_dir="${STAGING_DIR}/${item_name}"

  if [[ ! -d "${target_dir}" ]]; then
    log_error "Template directory not found: ${target_dir}"
    return 1
  fi

  # macOS sed requires '' after -i, GNU sed doesn't
  if [[ "$(uname)" == "Darwin" ]]; then
    find "${target_dir}" -type f -exec sed -i '' "s|${find_str}|${replace_str}|g" {} +
  else
    find "${target_dir}" -type f -exec sed -i "s|${find_str}|${replace_str}|g" {} +
  fi
}

# Replace a JSON value using jq (for structured replacements).
# Usage: fab_replace_json_value "file.json" ".path.to.key" "new_value"
fab_replace_json_value() {
  local file_path="$1"
  local jq_path="$2"
  local new_value="$3"

  if [[ ! -f "${file_path}" ]]; then
    log_error "JSON file not found: ${file_path}"
    return 1
  fi

  local tmp_file
  tmp_file=$(mktemp)
  jq "${jq_path} = \"${new_value}\"" "${file_path}" > "${tmp_file}" && mv "${tmp_file}" "${file_path}"
}

# -----------------------------------------------------------------------------
# Workspace Management
# -----------------------------------------------------------------------------

# Open workspace in default browser.
fab_open_workspace() {
  run_fab "Opening workspace in browser" \
    open "/${WORKSPACE_NAME}.Workspace"
}

# List workspace contents.
fab_list_workspace() {
  log_info "Workspace contents: ${WORKSPACE_NAME}"
  fab ls "/${WORKSPACE_NAME}.Workspace"
}

# Get copy job ID by name.
# Usage: copyjob_id=$(fab_get_item_id "MyLHCopyJob.CopyJob")
fab_get_item_id() {
  local item_name="$1"
  fab_get_property "/${WORKSPACE_NAME}.Workspace/${item_name}" "id"
}
