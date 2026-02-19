#!/usr/bin/env bash
# =============================================================================
# Create Variable Library — MyVarLib with per-environment value sets
# =============================================================================
# Creates a Variable Library in the workspace for cross-environment
# shortcut reconfiguration. The Variable Library stores workspace and
# lakehouse IDs that shortcuts reference, enabling deployment across
# Dev/Test/Prod without hardcoding IDs.
#
# This is an optional step performed in Module 5 of the workshop.
#
# Usage:
#   ./scripts/create-variable-library.sh
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
export PROJECT_ROOT
source "${SCRIPT_DIR}/lib/utils.sh"
source "${SCRIPT_DIR}/lib/fab-helpers.sh"

# =============================================================================
# MAIN
# =============================================================================

log_header "FabCon 26 Demo — Create Variable Library"

# Load configuration
load_terraform_outputs
require_vars WORKSPACE_NAME WORKSPACE_ID BRONZE_LAKEHOUSE_ID BRONZE_LAKEHOUSE_NAME

fab_check_auth
fab_set_command_line_mode

# Step 1: Create the Variable Library item
log_step 1 "Create Variable Library: MyVarLib"

# Note: Variable Library creation may require the Fabric UI or specific API
# calls. The fabric-cli `create` command for Variable Libraries uses:
log_info "Creating MyVarLib.VariableLibrary..."
run_fab "Creating Variable Library" \
  create "/${WORKSPACE_NAME}.Workspace/MyVarLib.VariableLibrary"

log_success "Variable Library created"

# Step 2: Document the variables to configure
echo ""
log_info "Variable Library 'MyVarLib' created."
echo ""
echo "  Configure the following variables in the Fabric UI:"
echo ""
echo "  ┌─────────────────────────────┬──────────────────────────────────────┐"
echo "  │ Variable Name               │ Default (Dev) Value                  │"
echo "  ├─────────────────────────────┼──────────────────────────────────────┤"
echo "  │ workspace_id                │ ${WORKSPACE_ID}                      │"
echo "  │ lakehouse_bronze_id         │ ${BRONZE_LAKEHOUSE_ID}               │"
echo "  │ lakehouse_bronze_table_name │ t3_dev                               │"
echo "  └─────────────────────────────┴──────────────────────────────────────┘"
echo ""
echo "  For Production, create a value set 'Production' with:"
echo "    - workspace_id              → Prod workspace GUID"
echo "    - lakehouse_bronze_id       → Prod Bronze lakehouse GUID"
echo "    - lakehouse_bronze_table_name → t3_prod"
echo ""
echo "  Then update shortcuts in Lakehouse_Silver to use these variables."
echo ""
