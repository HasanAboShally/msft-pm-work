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
  description = "Username suffix for workspace naming (e.g., 'hasan', 'user001')."
  type        = string

  validation {
    condition     = can(regex("^[a-zA-Z0-9_-]+$", var.username))
    error_message = "username must contain only alphanumeric characters, hyphens, or underscores."
  }
}

# -----------------------------------------------------------------------------
# Optional Variables
# -----------------------------------------------------------------------------

variable "workspace_prefix" {
  description = "Prefix for the workspace name. Full name = <prefix>_<username>."
  type        = string
  default     = "DEWorkshop"
}

variable "workspace_description" {
  description = "Description for the development workspace."
  type        = string
  default     = "FabCon 26 DevX Cornerstone Demo — Data Engineering CI/CD Workshop"
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
