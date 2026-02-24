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
      log_warn "Property '${property}' not available yet (attempt ${attempt}/${max_attempts}). Waiting ${delay}s..." >&2
      sleep "${delay}"
    fi
    attempt=$((attempt + 1))
  done

  log_error "Failed to retrieve property '${property}' from '${item_path}' after ${max_attempts} attempts" >&2
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
# Token Helpers (for REST API calls)
# -----------------------------------------------------------------------------

# Get a Fabric API access token via Azure CLI.
# More reliable than `fab auth get-access-token` in CI environments.
fab_get_fabric_token() {
  local token
  token=$(az account get-access-token --resource https://api.fabric.microsoft.com --query accessToken -o tsv 2>/dev/null | tr -d '\r')
  if [[ -z "${token}" ]]; then
    log_error "Could not get Fabric token from Azure CLI" >&2
    return 1
  fi
  echo "${token}"
}

# Get an Azure DevOps access token via Azure CLI.
fab_get_ado_token() {
  local token
  token=$(az account get-access-token --resource 499b84ac-1321-427f-aa17-267ca6975798 --query accessToken -o tsv 2>/dev/null | tr -d '\r')
  if [[ -z "${token}" ]]; then
    log_error "Could not get ADO token from Azure CLI" >&2
    return 1
  fi
  echo "${token}"
}

# Get the Fabric API base URL (supports DXT override).
fab_get_api_base_url() {
  local fabric_endpoint="${FAB_API_ENDPOINT_FABRIC:-api.fabric.microsoft.com}"
  echo "https://${fabric_endpoint}/v1"
}

# -----------------------------------------------------------------------------
# Workspace Identity
# -----------------------------------------------------------------------------

# Provision a managed identity for the workspace.
# This enables credential-free data access (e.g., for Copy Jobs).
# Usage: fab_provision_workspace_identity "workspace_id"
fab_provision_workspace_identity() {
  local ws_id="$1"
  local base_url
  base_url=$(fab_get_api_base_url)

  log_info "Provisioning workspace identity for ${ws_id:0:8}..."

  local token
  token=$(fab_get_fabric_token) || return 1

  # Use -D to capture response headers (needed for 202 LRO)
  local header_file
  header_file=$(mktemp)

  local response http_code
  response=$(curl -s -w "\n%{http_code}" -D "${header_file}" \
    -X POST "${base_url}/workspaces/${ws_id}/provisionIdentity" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d '')

  http_code=$(echo "${response}" | tail -1)
  local body
  body=$(echo "${response}" | sed '$d')

  if [[ "${http_code}" == "200" ]] || [[ "${http_code}" == "201" ]]; then
    log_success "Workspace identity provisioned"
    local identity_id
    identity_id=$(echo "${body}" | jq -r '.applicationId // empty' 2>/dev/null || echo "")
    if [[ -n "${identity_id}" ]]; then
      log_info "Identity Application ID: ${identity_id}"
    fi
    rm -f "${header_file}"
    return 0
  elif [[ "${http_code}" == "202" ]]; then
    # Long-running operation — poll until complete
    log_info "Workspace identity provisioning is async (202). Polling..."

    # Extract operation ID from x-ms-operation-id header.
    # Use ^x-ms-operation-id to avoid matching Access-Control-Expose-Headers
    # which also contains "x-ms-operation-id" as a listed header name.
    local operation_id
    operation_id=$(grep -i '^x-ms-operation-id' "${header_file}" | head -1 | sed 's/.*: *//;s/\r//' || echo "")
    if [[ -z "${operation_id}" ]]; then
      # Try Location header as fallback
      local location_url
      location_url=$(grep -i '^Location' "${header_file}" | head -1 | sed 's/.*: *//;s/\r//')
      operation_id=$(echo "${location_url}" | grep -oE '[0-9a-f-]{36}' | tail -1 || echo "")
    fi
    rm -f "${header_file}"

    if [[ -z "${operation_id}" ]]; then
      # No operation ID — just wait and hope
      log_warn "No operation ID found in 202 response. Waiting 30s..."
      sleep 30
      log_success "Workspace identity provisioning submitted (assumed complete)"
      return 0
    fi

    log_info "Operation ID: ${operation_id}"

    # Poll the operation status
    local max_polls=20
    local poll_interval=10
    for ((i=1; i<=max_polls; i++)); do
      sleep "${poll_interval}"
      local op_response
      op_response=$(curl -s \
        "${base_url}/operations/${operation_id}" \
        -H "Authorization: Bearer ${token}" || echo '{"status":"CurlError"}')

      local op_status
      op_status=$(echo "${op_response}" | jq -r '.status // "Unknown"' 2>/dev/null || echo "Unknown")
      log_info "  Poll ${i}/${max_polls}: status=${op_status}"

      case "${op_status}" in
        Succeeded|succeeded)
          log_success "Workspace identity provisioned (async)"
          return 0
          ;;
        Failed|failed)
          local op_error
          op_error=$(echo "${op_response}" | jq -r '.error // empty' 2>/dev/null)
          log_error "Workspace identity provisioning failed: ${op_error}"
          return 1
          ;;
        Running|running|NotStarted|notStarted)
          continue
          ;;
        *)
          log_info "  Unknown status: ${op_status} — continuing to poll"
          continue
          ;;
      esac
    done

    log_warn "Operation still in progress after $((max_polls * poll_interval))s — proceeding anyway"
    return 0
  elif [[ "${http_code}" == "409" ]]; then
    log_info "Workspace identity already exists (409) — continuing"
    rm -f "${header_file}"
    return 0
  else
    log_error "Failed to provision workspace identity (HTTP ${http_code}): ${body}"
    rm -f "${header_file}"
    return 1
  fi
}

# -----------------------------------------------------------------------------
# Workspace Role Assignment (Fabric REST API)
# -----------------------------------------------------------------------------

# Assign a workspace role to a principal (SPN, User, Group).
# Handles 409 (already has role) gracefully.
# Usage: fab_assign_workspace_role "workspace_id" "principal_id" "principal_type" "role"
#   principal_type: ServicePrincipal | User | Group
#   role: Admin | Member | Contributor | Viewer
fab_assign_workspace_role() {
  local ws_id="$1"
  local principal_id="$2"
  local principal_type="${3:-ServicePrincipal}"
  local role="${4:-Admin}"
  local base_url
  base_url=$(fab_get_api_base_url)

  log_info "Assigning ${role} role to ${principal_type} ${principal_id:0:8}... on workspace ${ws_id:0:8}..."

  local token
  token=$(fab_get_fabric_token) || return 1

  local payload
  payload=$(cat <<ROLEEOF
{
  "principal": {
    "id": "${principal_id}",
    "type": "${principal_type}"
  },
  "role": "${role}"
}
ROLEEOF
)

  local response http_code
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "${base_url}/workspaces/${ws_id}/roleAssignments" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d "${payload}")

  http_code=$(echo "${response}" | tail -1)
  local body
  body=$(echo "${response}" | sed '$d')

  if [[ "${http_code}" == "200" ]] || [[ "${http_code}" == "201" ]]; then
    log_success "${principal_type} assigned ${role} on workspace"
    return 0
  elif [[ "${http_code}" == "409" ]]; then
    log_info "Principal already has role on workspace (409) — skipping"
    return 0
  else
    log_warn "Workspace role assignment returned HTTP ${http_code}: ${body}"
    log_info "Continuing — SPN may already be admin as workspace creator"
    return 0
  fi
}

# -----------------------------------------------------------------------------
# Git Integration (Azure DevOps)
# -----------------------------------------------------------------------------

# Create a new Git repository in an Azure DevOps project.
# If the repo already exists, returns its ID.
# Usage: repo_id=$(fab_create_ado_git_repo "org_name" "project_name" "repo_name")
fab_create_ado_git_repo() {
  local org_name="$1"
  local project_name="$2"
  local repo_name="$3"
  local ado_base="https://dev.azure.com/${org_name}/${project_name}"

  log_info "Creating ADO Git repo: ${repo_name} in ${org_name}/${project_name}..." >&2

  local token
  token=$(fab_get_ado_token) || return 1

  # Check if repo already exists
  local existing
  existing=$(curl -s \
    -H "Authorization: Bearer ${token}" \
    "${ado_base}/_apis/git/repositories?api-version=7.1" 2>/dev/null)

  local existing_id
  existing_id=$(echo "${existing}" | jq -r ".value[] | select(.name == \"${repo_name}\") | .id" 2>/dev/null || echo "")

  if [[ -n "${existing_id}" ]]; then
    log_info "Repo '${repo_name}' already exists (${existing_id:0:8}...)" >&2
    echo "${existing_id}"
    return 0
  fi

  # Create the repo
  local response http_code
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "${ado_base}/_apis/git/repositories?api-version=7.1" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"${repo_name}\"}")

  http_code=$(echo "${response}" | tail -1)
  local body
  body=$(echo "${response}" | sed '$d')

  if [[ "${http_code}" == "201" ]] || [[ "${http_code}" == "200" ]]; then
    local repo_id
    repo_id=$(echo "${body}" | jq -r '.id')
    log_success "Repo created: ${repo_name} (${repo_id:0:8}...)" >&2

    # Initialize with an empty commit (required for Fabric git connect)
    log_info "Initializing repo with initial commit..." >&2
    local init_payload
    init_payload=$(cat <<INITEOF
{
  "refUpdates": [{"name": "refs/heads/main", "oldObjectId": "0000000000000000000000000000000000000000"}],
  "commits": [{
    "comment": "Initial commit — managed by fabric-e2e-demo pipeline",
    "changes": [{
      "changeType": "add",
      "item": {"path": "/README.md"},
      "newContent": {
        "content": "# ${repo_name}\\nFabric workspace managed by CI/CD pipeline.\\nDo not edit manually.",
        "contentType": "rawtext"
      }
    }]
  }]
}
INITEOF
)

    local init_response init_code
    init_response=$(curl -s -w "\n%{http_code}" \
      -X POST "${ado_base}/_apis/git/repositories/${repo_id}/pushes?api-version=7.1" \
      -H "Authorization: Bearer ${token}" \
      -H "Content-Type: application/json" \
      -d "${init_payload}")

    init_code=$(echo "${init_response}" | tail -1)
    if [[ "${init_code}" == "201" ]] || [[ "${init_code}" == "200" ]]; then
      log_success "Repo initialized with main branch" >&2
    else
      local init_body
      init_body=$(echo "${init_response}" | sed '$d')
      log_warn "Repo init push returned HTTP ${init_code}: ${init_body}" >&2
      log_info "Repo may already have commits — continuing" >&2
    fi

    echo "${repo_id}"
    return 0
  else
    log_error "Failed to create repo (HTTP ${http_code}): ${body}" >&2
    return 1
  fi
}

# Connect a Fabric workspace to an Azure DevOps Git repository.
# Usage: fab_connect_workspace_to_git "workspace_id" "org_name" "project_name" "repo_name" ["branch"] ["directory"]
fab_connect_workspace_to_git() {
  local ws_id="$1"
  local org_name="$2"
  local project_name="$3"
  local repo_name="$4"
  local branch_name="${5:-main}"
  local directory="${6:-/}"
  local base_url
  base_url=$(fab_get_api_base_url)

  log_info "Connecting workspace to Git: ${org_name}/${project_name}/${repo_name} (branch: ${branch_name})..."

  local token
  token=$(fab_get_fabric_token) || return 1

  # Step 1: Connect workspace to git
  local connect_payload
  connect_payload=$(cat <<CONNEOF
{
  "gitProviderDetails": {
    "organizationName": "${org_name}",
    "projectName": "${project_name}",
    "gitProviderType": "AzureDevOps",
    "repositoryName": "${repo_name}",
    "branchName": "${branch_name}",
    "directoryName": "${directory}"
  }
}
CONNEOF
)

  local response http_code
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "${base_url}/workspaces/${ws_id}/git/connect" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d "${connect_payload}")

  http_code=$(echo "${response}" | tail -1)
  local body
  body=$(echo "${response}" | sed '$d')

  if [[ "${http_code}" == "200" ]] || [[ "${http_code}" == "204" ]]; then
    log_success "Workspace connected to Git repo"
  elif [[ "${http_code}" == "409" ]]; then
    log_info "Workspace already connected to Git (409) — skipping connect"
  else
    log_error "Failed to connect workspace to Git (HTTP ${http_code}): ${body}"
    return 1
  fi

  # Step 2: Initialize the connection (commits workspace items to git)
  log_info "Initializing Git connection (committing workspace items to repo)..."

  local init_response init_code
  init_response=$(curl -s -w "\n%{http_code}" \
    -X POST "${base_url}/workspaces/${ws_id}/git/initializeConnection" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d '{"initializationStrategy": "PreferWorkspace"}')

  init_code=$(echo "${init_response}" | tail -1)
  local init_body
  init_body=$(echo "${init_response}" | sed '$d')

  if [[ "${init_code}" == "200" ]] || [[ "${init_code}" == "204" ]]; then
    log_success "Git connection initialized — workspace items committed to repo"
    return 0
  elif [[ "${init_code}" == "202" ]]; then
    # Long-running operation — wait for it
    log_info "Git initialization is a long-running operation. Waiting..."
    local operation_url
    operation_url=$(echo "${init_body}" | jq -r '.url // empty' 2>/dev/null || echo "")
    # Give it some time to complete
    sleep 15
    log_success "Git connection initialization submitted (may still be processing)"
    return 0
  else
    log_warn "Git initialization returned HTTP ${init_code}: ${init_body}"
    log_info "Workspace is connected to Git. Items may need manual sync."
    return 0
  fi
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

# Run a notebook via REST API and poll for completion.
# This bypasses 'fab job run' to get better error details.
# Usage: fab_run_notebook_rest "workspace_id" "notebook_id" "notebook_name" [max_wait_secs]
fab_run_notebook_rest() {
  local ws_id="$1"
  local nb_id="$2"
  local nb_name="${3:-Notebook}"
  local max_wait="${4:-300}"

  log_info "Running notebook via REST: ${nb_name} (${nb_id:0:8}...)"

  # Trigger the notebook job
  local trigger_output
  trigger_output=$(fab api -X post "workspaces/${ws_id}/items/${nb_id}/jobs/instances?jobType=RunNotebook" 2>&1)
  local trigger_rc=$?
  log_info "Trigger response (rc=${trigger_rc}): ${trigger_output}"

  # Wait and poll for job completion
  local interval=15
  local elapsed=0
  while (( elapsed < max_wait )); do
    sleep "${interval}"
    elapsed=$((elapsed + interval))

    # Get latest job instance
    local instances_output
    instances_output=$(fab api "workspaces/${ws_id}/items/${nb_id}/jobs/instances?jobType=RunNotebook" 2>&1)
    log_info "Job instances (${elapsed}s): ${instances_output}"

    # Check if any instance completed or failed
    local status
    status=$(echo "${instances_output}" | python3 -c "
import sys, json
try:
    data = json.loads(sys.stdin.read())
    # fab api wraps response: {status_code: N, text: {value: [...]}}
    text = data.get('text', data)
    instances = text.get('value', [])
    if instances:
        latest = instances[0]
        s = latest.get('status', 'Unknown')
        print(s)
    else:
        print('NoInstances')
except:
    print('ParseError')
" 2>/dev/null)

    if [[ "${status}" == "Completed" ]]; then
      log_success "Notebook ${nb_name} completed via REST (${elapsed}s)"
      return 0
    elif [[ "${status}" == "Failed" ]] || [[ "${status}" == "Cancelled" ]]; then
      log_error "Notebook ${nb_name} ${status} via REST (${elapsed}s)"
      # Print full instance details for debugging
      echo "${instances_output}" | python3 -c "
import sys, json
try:
    data = json.loads(sys.stdin.read())
    text = data.get('text', data)
    for inst in text.get('value', []):
        print(json.dumps(inst, indent=2))
except:
    pass
" 2>/dev/null || true
      return 1
    fi
    # Still running or no instances yet — keep waiting
    log_info "  Status: ${status} — waiting..."
  done

  log_error "Notebook ${nb_name} timed out after ${max_wait}s"
  return 1
}

# Run a copy job via the Fabric REST API (fire-and-forget).
# The caller is responsible for waiting for completion.
# Usage: fab_run_copy_job "workspace_id" "copyjob_id" "copyjob_name"
fab_run_copy_job() {
  local ws_id="$1"
  local copyjob_id="$2"
  local copyjob_name="${3:-CopyJob}"

  log_info "Running copy job: ${copyjob_name} (${copyjob_id:0:8}...)"
  fab api -X post "workspaces/${ws_id}/items/${copyjob_id}/jobs/instances?jobType=Execute"
}

# Poll copy job status until completion using fab api (same auth as copy job trigger).
# Usage: fab_poll_copy_job "workspace_id" "copyjob_id" "copyjob_name" [max_wait_secs]
fab_poll_copy_job() {
  local ws_id="$1"
  local copyjob_id="$2"
  local copyjob_name="${3:-CopyJob}"
  local max_wait="${4:-300}"
  local interval=15
  local elapsed=0

  while (( elapsed < max_wait )); do
    sleep "${interval}"
    elapsed=$((elapsed + interval))

    local response
    response=$(fab api "workspaces/${ws_id}/items/${copyjob_id}/jobs/instances?jobType=Execute" 2>/dev/null || echo "API_ERROR")

    # Parse the status from fab api output
    local status
    status=$(echo "${response}" | python3 -c "
import sys, json
raw = sys.stdin.read().strip()
if 'API_ERROR' in raw:
    print('ApiError|{}')
    sys.exit(0)
try:
    d = json.loads(raw)
    # fab api wraps response: {\"status_code\": 200, \"text\": {\"value\": [...]}}
    # Unwrap if needed
    if 'text' in d and isinstance(d['text'], dict):
        d = d['text']
    elif 'text' in d and isinstance(d['text'], str):
        d = json.loads(d['text'])
    instances = d.get('value', [])
    if not instances and isinstance(d, dict) and 'status' in d:
        # Single instance response
        s = d.get('status', 'Unknown')
        fr = d.get('failureReason', {})
        print(f'{s}|{json.dumps(fr)}')
    elif instances:
        latest = instances[0]
        s = latest.get('status', 'Unknown')
        fr = latest.get('failureReason', {})
        print(f'{s}|{json.dumps(fr)}')
    else:
        print('NoInstances|{}')
except:
    # fab api might return table-formatted output — check for status keywords
    if 'Completed' in raw:
        print('Completed|{}')
    elif 'Failed' in raw:
        print('Failed|{}')
    elif 'InProgress' in raw or 'Running' in raw:
        print('InProgress|{}')
    else:
        print(f'ParseError|{{}}')
" 2>/dev/null)

    local job_status="${status%%|*}"
    local failure_reason="${status#*|}"

    case "${job_status}" in
      Completed)
        log_success "Copy job '${copyjob_name}' completed (${elapsed}s)"
        return 0
        ;;
      Failed)
        log_error "Copy job '${copyjob_name}' FAILED after ${elapsed}s: ${failure_reason}"
        return 1
        ;;
      Cancelled)
        log_error "Copy job '${copyjob_name}' was cancelled after ${elapsed}s"
        return 1
        ;;
      InProgress|NotStarted|Running)
        log_info "Copy job '${copyjob_name}': ${job_status} (${elapsed}s elapsed)"
        ;;
      ApiError)
        log_warn "Copy job '${copyjob_name}': API call failed (${elapsed}s elapsed)"
        ;;
      *)
        log_warn "Copy job '${copyjob_name}': status='${job_status}' (${elapsed}s elapsed) — raw: ${response:0:200}"
        ;;
    esac
  done

  log_warn "Copy job '${copyjob_name}' polling timed out after ${max_wait}s (may still be running)"
  return 0  # Don't fail — the job might still complete
}

# Verify that expected tables exist in a lakehouse using fab api.
# Polls with retries.
# Usage: fab_verify_lakehouse_tables "workspace_id" "lakehouse_id" "table1,table2"
fab_verify_lakehouse_tables() {
  local ws_id="$1"
  local lh_id="$2"
  local expected_tables="$3"
  local max_attempts="${4:-12}"  # 12 attempts × 15s = 3 minutes
  local interval=15

  local attempt=0
  local body=""
  while (( attempt < max_attempts )); do
    attempt=$((attempt + 1))

    body=$(fab api "workspaces/${ws_id}/lakehouses/${lh_id}/tables" 2>&1 || echo "FAB_API_ERROR")

    if echo "${body}" | grep -qi "error\|not found\|FAB_API_ERROR"; then
      log_warn "Tables API returned error (attempt ${attempt}/${max_attempts}): ${body:0:200}"
      sleep "${interval}"
      continue
    fi

    # Check if all expected tables are present
    local all_found=true
    IFS=',' read -ra TABLES <<< "${expected_tables}"
    for tbl in "${TABLES[@]}"; do
      if ! echo "${body}" | grep -q "${tbl}"; then
        log_warn "Table '${tbl}' not yet found (attempt ${attempt}/${max_attempts})"
        all_found=false
        break
      fi
    done

    if [[ "${all_found}" == "true" ]]; then
      log_success "All expected tables found: ${expected_tables}"
      log_info "Tables response: ${body:0:500}"
      return 0
    fi

    sleep "${interval}"
  done

  log_error "Timed out waiting for tables: ${expected_tables}"
  log_warn "Last tables response: ${body:0:500}"
  return 1
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
# Workspace Identity — Retrieve + RBAC
# -----------------------------------------------------------------------------

# Get workspace identity service principal ID.
# Usage: sp_id=$(fab_get_workspace_identity_spn_id "workspace-guid")
fab_get_workspace_identity_spn_id() {
  local ws_id="$1"
  local token base_url

  token=$(fab_get_fabric_token)
  base_url=$(fab_get_api_base_url)

  local response
  response=$(curl -s \
    "${base_url}/workspaces/${ws_id}" \
    -H "Authorization: Bearer ${token}")

  local sp_id
  sp_id=$(echo "${response}" | jq -r '.workspaceIdentity.servicePrincipalId // empty' 2>/dev/null || echo "")

  if [[ -z "${sp_id}" ]]; then
    log_error "Could not retrieve workspace identity service principal ID"
    log_error "Response: ${response}"
    return 1
  fi

  # Use stderr for log output so it doesn't get captured by $(...)
  log_info "Workspace identity SPN Object ID: ${sp_id}" >&2
  echo "${sp_id}"
}

# Assign Azure RBAC role to workspace identity on a storage account.
# Usage: fab_assign_storage_role "spn-object-id" "Storage Blob Data Reader" "/subscriptions/.../storageAccounts/name"
fab_assign_storage_role() {
  local principal_id="$1"
  local role_name="$2"
  local scope="$3"

  log_info "Assigning role '${role_name}' to principal ${principal_id:0:8}... on ${scope##*/}"

  # Check if role already assigned
  local existing
  existing=$(az role assignment list \
    --assignee "${principal_id}" \
    --role "${role_name}" \
    --scope "${scope}" \
    --query "[].id" -o tsv 2>/dev/null || echo "")

  if [[ -n "${existing}" ]]; then
    log_info "Role '${role_name}' already assigned — skipping"
    return 0
  fi

  az role assignment create \
    --assignee-object-id "${principal_id}" \
    --assignee-principal-type ServicePrincipal \
    --role "${role_name}" \
    --scope "${scope}" \
    --output none

  if [[ $? -eq 0 ]]; then
    log_success "Role '${role_name}' assigned successfully"
  else
    log_error "Failed to assign role '${role_name}'"
    return 1
  fi
}

# -----------------------------------------------------------------------------
# Fabric Connections
# -----------------------------------------------------------------------------

# Create an ADLS Gen2 connection using Workspace Identity authentication.
# Usage: conn_id=$(fab_create_adls_connection "display-name" "https://account.dfs.core.windows.net")
fab_create_adls_connection() {
  local display_name="$1"
  local storage_url="$2"
  local token base_url

  token=$(fab_get_fabric_token)
  base_url=$(fab_get_api_base_url)

  # Extract server hostname from URL (e.g. https://account.dfs.core.windows.net -> account.dfs.core.windows.net)
  local server
  server=$(echo "${storage_url}" | sed 's|^https\?://||;s|/.*||')

  log_info "Creating ADLS Gen2 connection: ${display_name} → ${server}" >&2

  local body
  body=$(cat <<EOF
{
  "connectivityType": "ShareableCloud",
  "displayName": "${display_name}",
  "connectionDetails": {
    "type": "AzureDataLakeStorage",
    "creationMethod": "AzureDataLakeStorage",
    "parameters": [
      {
        "dataType": "Text",
        "name": "server",
        "value": "${server}"
      },
      {
        "dataType": "Text",
        "name": "path",
        "value": "/"
      }
    ]
  },
  "privacyLevel": "Organizational",
  "credentialDetails": {
    "singleSignOnType": "None",
    "connectionEncryption": "NotEncrypted",
    "skipTestConnection": false,
    "credentials": {
      "credentialType": "WorkspaceIdentity"
    }
  }
}
EOF
  )

  local response http_code
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "${base_url}/connections" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d "${body}")

  http_code=$(echo "${response}" | tail -1)
  local resp_body
  resp_body=$(echo "${response}" | sed '$d')

  if [[ "${http_code}" == "201" ]] || [[ "${http_code}" == "200" ]]; then
    local conn_id
    conn_id=$(echo "${resp_body}" | jq -r '.id')
    log_success "Connection created: ${conn_id}" >&2
    echo "${conn_id}"
    return 0
  elif [[ "${http_code}" == "409" ]]; then
    # Connection already exists — try to find it by listing
    log_info "Connection may already exist (409). Searching by name..." >&2
    local list_response
    list_response=$(curl -s \
      "${base_url}/connections" \
      -H "Authorization: Bearer ${token}")
    local existing_id
    existing_id=$(echo "${list_response}" | jq -r ".value[] | select(.displayName==\"${display_name}\") | .id" 2>/dev/null || echo "")
    if [[ -n "${existing_id}" ]]; then
      log_info "Found existing connection: ${existing_id}" >&2
      echo "${existing_id}"
      return 0
    fi
    log_error "Connection conflict but could not find existing. Response: ${resp_body}" >&2
    return 1
  else
    log_error "Failed to create connection (HTTP ${http_code}): ${resp_body}" >&2
    return 1
  fi
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
