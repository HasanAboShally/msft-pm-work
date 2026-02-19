# =============================================================================
# Terraform Providers — Fabric Infrastructure
# =============================================================================
#
# Manages Microsoft Fabric resources using the official Terraform provider.
# See: https://registry.terraform.io/providers/microsoft/fabric/latest
#
# Authentication (in order of precedence):
#   1. Azure CLI:  `az login` (default, recommended for development)
#   2. SPN:        Set ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID env vars
#   3. Managed ID: Set ARM_USE_MSI=true (for CI/CD runners)
#
# Usage:
#   terraform init
#   terraform plan -var-file="terraform.tfvars"
#   terraform apply -var-file="terraform.tfvars"
# =============================================================================

terraform {
  required_version = ">= 1.8, < 2.0"

  required_providers {
    fabric = {
      source  = "microsoft/fabric"
      version = "1.7.0"
    }
  }

  # Uncomment to use a remote backend (recommended for teams):
  # backend "azurerm" {
  #   resource_group_name  = "rg-terraform-state"
  #   storage_account_name = "stterraformstate"
  #   container_name       = "tfstate"
  #   key                  = "fabcon-demo.tfstate"
  # }
}

provider "fabric" {
  # Authentication: Azure CLI by default (use_cli = true).
  # For SPN authentication, export these environment variables:
  #
  #   export ARM_CLIENT_ID="<client-id>"
  #   export ARM_CLIENT_SECRET="<client-secret>"
  #   export ARM_TENANT_ID="<tenant-id>"
  #
  # No explicit configuration needed here — the provider reads
  # credentials from the environment automatically.
  use_cli = true
}
