# =============================================================================
# Input Variables — Fabric Workspace Configuration
# =============================================================================

# -----------------------------------------------------------------------------
# Required Variables
# -----------------------------------------------------------------------------

variable "capacity_name" {
  description = "Display name of the Fabric capacity to assign to the workspace."
  type        = string

  validation {
    condition     = length(var.capacity_name) > 0
    error_message = "capacity_name must not be empty."
  }
}

variable "username" {
  description = "Username for tagging/auditing (no longer used in workspace naming)."
  type        = string
  default     = ""
}

# -----------------------------------------------------------------------------
# Optional Variables
# -----------------------------------------------------------------------------

variable "workspace_prefix" {
  description = "Prefix for workspace names. Names: <prefix>-dev, <prefix>-test, <prefix>-prod."
  type        = string
  default     = "cicd-fabcon-us26"
}

variable "workspace_description" {
  description = "Description for the development workspace."
  type        = string
  default     = "Fabric Data Engineering Workshop — provisioned by fabric-e2e-demo"
}

variable "enable_lakehouse_schemas" {
  description = "Enable schema support (dbo) for lakehouses. Required for the demo."
  type        = bool
  default     = true
}

variable "bronze_lakehouse_name" {
  description = "Display name for the Bronze (raw) lakehouse."
  type        = string
  default     = "Lakehouse_Bronze"
}

variable "silver_lakehouse_name" {
  description = "Display name for the Silver (curated) lakehouse."
  type        = string
  default     = "Lakehouse_Silver"
}

# -----------------------------------------------------------------------------
# SPN / Identity (Optional — only needed for SPN-based provisioning)
# -----------------------------------------------------------------------------

variable "spn_object_id" {
  description = "Object ID of the Service Principal. If set, the SPN is granted Admin on the workspace."
  type        = string
  default     = null
}

variable "upn_object_id" {
  description = "Object ID of the user (UPN). If set with SPN auth, grants user Admin on the workspace."
  type        = string
  default     = null
}

# -----------------------------------------------------------------------------
# Capacity Provisioning (ARM — optional)
# -----------------------------------------------------------------------------

variable "create_capacity" {
  description = "If true, provision a new Fabric capacity via ARM (azurerm provider) before creating workspaces."
  type        = bool
  default     = false
}

variable "capacity_resource_group" {
  description = "Resource group name where the new Fabric capacity will be created."
  type        = string
  default     = "rg-cicd-fabconus26"
}

variable "capacity_location" {
  description = "Azure region for the new Fabric capacity (e.g. 'East US')."
  type        = string
  default     = "Central US EUAP"
}

variable "capacity_sku" {
  description = "SKU tier for the new Fabric capacity (e.g. F2, F4, F8, F16, F32, F64)."
  type        = string
  default     = "F64"
}

variable "capacity_admin_upn" {
  description = "UPN/email of the Fabric capacity admin. Required when create_capacity = true."
  type        = string
  default     = null
}

variable "skip_spn_role_assignment" {
  description = "Skip SPN workspace role assignment (SPN is already admin as workspace creator)."
  type        = bool
  default     = true
}
