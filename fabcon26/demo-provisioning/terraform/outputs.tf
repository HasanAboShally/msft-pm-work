# =============================================================================
# Terraform Outputs — Resource IDs & Properties
# =============================================================================

# -----------------------------------------------------------------------------
# Workspace
# -----------------------------------------------------------------------------

output "workspace_name" {
  description = "Full name of the development workspace."
  value       = fabric_workspace.dev.display_name
}

output "workspace_id" {
  description = "GUID of the development workspace."
  value       = fabric_workspace.dev.id
}

output "workspace_name_test" {
  description = "Full name of the test workspace."
  value       = fabric_workspace.test.display_name
}

output "workspace_id_test" {
  description = "GUID of the test workspace."
  value       = fabric_workspace.test.id
}

output "workspace_name_prod" {
  description = "Full name of the production workspace."
  value       = fabric_workspace.prod.display_name
}

output "workspace_id_prod" {
  description = "GUID of the production workspace."
  value       = fabric_workspace.prod.id
}

# -----------------------------------------------------------------------------
# Lakehouses
# -----------------------------------------------------------------------------

output "bronze_lakehouse_id" {
  description = "GUID of the Bronze lakehouse."
  value       = fabric_lakehouse.bronze.id
}

output "bronze_lakehouse_name" {
  description = "Display name of the Bronze lakehouse."
  value       = fabric_lakehouse.bronze.display_name
}

output "silver_lakehouse_id" {
  description = "GUID of the Silver lakehouse."
  value       = fabric_lakehouse.silver.id
}

output "silver_lakehouse_name" {
  description = "Display name of the Silver lakehouse."
  value       = fabric_lakehouse.silver.display_name
}

# Note: SQL endpoint properties are not available as Terraform outputs because
# they are provisioned asynchronously after lakehouse creation. The fabric-cli
# script retrieves them at runtime via:
#   fab get /<workspace>/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.id
#   fab get /<workspace>/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.connectionString

# -----------------------------------------------------------------------------
# Capacity
# -----------------------------------------------------------------------------

output "capacity_id" {
  description = "GUID of the assigned Fabric capacity."
  value       = data.fabric_capacity.this.id
}

# -----------------------------------------------------------------------------
# Convenience: Next Steps
# -----------------------------------------------------------------------------

output "next_steps" {
  description = "Instructions for completing provisioning after Terraform apply."
  value       = <<-EOT

    ✅ Terraform provisioning complete!

    Dev Workspace  : ${fabric_workspace.dev.display_name}
    Test Workspace : ${fabric_workspace.test.display_name}
    Prod Workspace : ${fabric_workspace.prod.display_name}
    Bronze LH      : ${fabric_lakehouse.bronze.id}
    Silver LH      : ${fabric_lakehouse.silver.id}

    Next: Run the fabric-cli provisioning script:

      cd ..
      ./scripts/provision-items.sh

    The script reads IDs from .terraform-outputs.env automatically.
    Test and Prod workspaces are empty shells — CI/CD populates them.

  EOT
}
