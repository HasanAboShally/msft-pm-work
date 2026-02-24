# =============================================================================
# Main Infrastructure — Workspaces & Lakehouses
# =============================================================================
#
# This module provisions three workspaces following a Dev/Test/Prod pattern:
#
#   - DEV workspace:  Full provisioning — lakehouses, items (via fabric-cli),
#                     workspace identity, and Git connection.
#   - TEST workspace: Empty shell — capacity assigned, SPN admin. CI/CD populates.
#   - PROD workspace: Empty shell — capacity assigned, SPN admin. CI/CD populates.
#
# Architecture:
#   Development Workspace ({workspace_prefix}-dev)
#   ├── Lakehouse_Bronze   (raw data, enable_schemas=true)
#   ├── Lakehouse_Silver   (curated data, enable_schemas=true)
#   └── [Items imported by fabric-cli: Notebooks, Copy Jobs, etc.]
#
#   Test Workspace ({workspace_prefix}-test)
#   └── (empty — populated by CI/CD deployment)
#
#   Production Workspace ({workspace_prefix}-prod)
#   └── (empty — populated by CI/CD deployment)
# =============================================================================

locals {
  workspace_name      = "${var.workspace_prefix}-dev"
  workspace_name_test = "${var.workspace_prefix}-test"
  workspace_name_prod = "${var.workspace_prefix}-prod"
}

# -----------------------------------------------------------------------------
# Capacity Provisioning (ARM — only when create_capacity = true)
# -----------------------------------------------------------------------------
# When running the pipeline with SPN auth, a new F-SKU capacity is created in
# the rg-cicd-fabconus26 resource group (SPN has Contributor rights there).
# ARM capacity names: 3-63 chars, lowercase letters/numbers only, start with letter.

resource "azurerm_fabric_capacity" "this" {
  count = var.create_capacity ? 1 : 0

  name                   = var.capacity_name
  resource_group_name    = var.capacity_resource_group
  location               = var.capacity_location
  administration_members = compact([var.spn_object_id, var.capacity_admin_upn])

  sku {
    name = var.capacity_sku
    tier = "Fabric"
  }
}

# -----------------------------------------------------------------------------
# Capacity Lookup
# -----------------------------------------------------------------------------

data "fabric_capacity" "this" {
  display_name = var.capacity_name

  # When create_capacity=true, wait for ARM to finish before looking up in Fabric
  depends_on = [azurerm_fabric_capacity.this]
}

# -----------------------------------------------------------------------------
# Development Workspace
# -----------------------------------------------------------------------------

resource "fabric_workspace" "dev" {
  display_name = local.workspace_name
  description  = var.workspace_description
  capacity_id  = data.fabric_capacity.this.id
}

# Grant SPN admin access (only if spn_object_id is provided AND skip_spn_role_assignment is false)
# When SPN creates the workspace, it's automatically admin — skip to avoid PrincipalAlreadyHasWorkspaceRolePermissions
resource "fabric_workspace_role_assignment" "spn_admin" {
  count = var.spn_object_id != null && var.skip_spn_role_assignment == false ? 1 : 0

  workspace_id = fabric_workspace.dev.id
  principal = {
    id   = var.spn_object_id
    type = "ServicePrincipal"
  }
  role = "Admin"
}

# Grant user admin access when using SPN auth (so user can manage the workspace)
resource "fabric_workspace_role_assignment" "user_admin" {
  count = var.upn_object_id != null ? 1 : 0

  workspace_id = fabric_workspace.dev.id
  principal = {
    id   = var.upn_object_id
    type = "User"
  }
  role = "Admin"
}

# -----------------------------------------------------------------------------
# Test Workspace (empty shell — CI/CD populates later)
# -----------------------------------------------------------------------------

resource "fabric_workspace" "test" {
  display_name = local.workspace_name_test
  description  = "Test environment — populated by CI/CD deployment pipeline"
  capacity_id  = data.fabric_capacity.this.id
}

resource "fabric_workspace_role_assignment" "spn_admin_test" {
  count = var.spn_object_id != null && var.skip_spn_role_assignment == false ? 1 : 0

  workspace_id = fabric_workspace.test.id
  principal = {
    id   = var.spn_object_id
    type = "ServicePrincipal"
  }
  role = "Admin"
}

resource "fabric_workspace_role_assignment" "user_admin_test" {
  count = var.upn_object_id != null ? 1 : 0

  workspace_id = fabric_workspace.test.id
  principal = {
    id   = var.upn_object_id
    type = "User"
  }
  role = "Admin"
}

# -----------------------------------------------------------------------------
# Production Workspace (empty shell — CI/CD populates later)
# -----------------------------------------------------------------------------

resource "fabric_workspace" "prod" {
  display_name = local.workspace_name_prod
  description  = "Production environment — populated by CI/CD deployment pipeline"
  capacity_id  = data.fabric_capacity.this.id
}

resource "fabric_workspace_role_assignment" "spn_admin_prod" {
  count = var.spn_object_id != null && var.skip_spn_role_assignment == false ? 1 : 0

  workspace_id = fabric_workspace.prod.id
  principal = {
    id   = var.spn_object_id
    type = "ServicePrincipal"
  }
  role = "Admin"
}

resource "fabric_workspace_role_assignment" "user_admin_prod" {
  count = var.upn_object_id != null ? 1 : 0

  workspace_id = fabric_workspace.prod.id
  principal = {
    id   = var.upn_object_id
    type = "User"
  }
  role = "Admin"
}

# -----------------------------------------------------------------------------
# Lakehouses (Medallion Architecture)
# -----------------------------------------------------------------------------

resource "fabric_lakehouse" "bronze" {
  display_name = var.bronze_lakehouse_name
  workspace_id = fabric_workspace.dev.id
  description  = "Bronze layer — raw ingested data (t2, t3_dev, t3_prod tables)"

  configuration = {
    enable_schemas = var.enable_lakehouse_schemas
  }
}

resource "fabric_lakehouse" "silver" {
  display_name = var.silver_lakehouse_name
  workspace_id = fabric_workspace.dev.id
  description  = "Silver layer — curated/transformed data (t1 table)"

  configuration = {
    enable_schemas = var.enable_lakehouse_schemas
  }

  # Create Silver after Bronze to avoid overwhelming the Fabric API rate limiter.
  # The Fabric provider uses long-running operation (LRO) polling, and concurrent
  # lakehouse creates can trigger HTTP 429 "RequestBlocked" responses.
  depends_on = [fabric_lakehouse.bronze]
}

# -----------------------------------------------------------------------------
# Post-Apply: Generate configuration for fabric-cli scripts
# -----------------------------------------------------------------------------

resource "local_file" "terraform_outputs" {
  filename = "${path.module}/../.terraform-outputs.env"
  content  = <<-EOT
# Auto-generated by Terraform — do not edit manually
# Source: terraform/main.tf
# Generated: ${timestamp()}
WORKSPACE_NAME="${local.workspace_name}"
WORKSPACE_ID="${fabric_workspace.dev.id}"
WORKSPACE_NAME_TEST="${local.workspace_name_test}"
WORKSPACE_ID_TEST="${fabric_workspace.test.id}"
WORKSPACE_NAME_PROD="${local.workspace_name_prod}"
WORKSPACE_ID_PROD="${fabric_workspace.prod.id}"
CAPACITY_ID="${data.fabric_capacity.this.id}"
CAPACITY_NAME="${var.capacity_name}"
BRONZE_LAKEHOUSE_ID="${fabric_lakehouse.bronze.id}"
SILVER_LAKEHOUSE_ID="${fabric_lakehouse.silver.id}"
BRONZE_LAKEHOUSE_NAME="${var.bronze_lakehouse_name}"
SILVER_LAKEHOUSE_NAME="${var.silver_lakehouse_name}"
USERNAME="${var.username}"
EOT

  file_permission = "0600"
}
