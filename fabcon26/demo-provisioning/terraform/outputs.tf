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

# -----------------------------------------------------------------------------
# Lakehouses
# -----------------------------------------------------------------------------

output "bronze_lakehouse_id" {
  description = "GUID of the Bronze lakehouse."
  value       = fabric_lakehouse.bronze.id
}

output "silver_lakehouse_id" {
  description = "GUID of the Silver lakehouse."
  value       = fabric_lakehouse.silver.id
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

    Workspace : ${fabric_workspace.dev.display_name}
    Bronze LH : ${fabric_lakehouse.bronze.id}
    Silver LH : ${fabric_lakehouse.silver.id}

    Next: Run the fabric-cli provisioning script:

      cd ..
      ./scripts/provision-items.sh

    The script reads IDs from .terraform-outputs.env automatically.

  EOT
}
