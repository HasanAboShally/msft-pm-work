#!/usr/bin/env python3
"""
Inject Azure CLI credentials using a refresh token via MSAL library.

This script properly exchanges a refresh token for access tokens using the
MSAL Python library, and writes the resulting cache to ~/.azure/ so that
Azure CLI (and tools like Terraform) can use it.

Required environment variables:
    ARM_TENANT_ID           - Azure AD tenant ID
    ARM_SUBSCRIPTION_ID     - Azure subscription ID
    AZURE_REFRESH_TOKEN     - Refresh token from an az login session
    AZURE_USERNAME          - UPN (e.g., habos@microsoft.com)
"""
import json, msal, os, pathlib, sys

TENANT   = os.environ["ARM_TENANT_ID"]
RT       = os.environ["AZURE_REFRESH_TOKEN"]
SUB      = os.environ["ARM_SUBSCRIPTION_ID"]
USERNAME = os.environ.get("AZURE_USERNAME", "user@example.com")
CLI_ID   = "04b07795-8ddb-461a-bbee-02f9e1bf7b46"  # Azure CLI client ID (Microsoft corporate)

# --- Acquire tokens via MSAL ---
cache = msal.SerializableTokenCache()
app   = msal.PublicClientApplication(
    CLI_ID,
    authority=f"https://login.microsoftonline.com/{TENANT}",
    token_cache=cache,
)

# Exchange refresh token for access + id tokens (populates cache properly)
result = app.acquire_token_by_refresh_token(
    RT, scopes=["https://management.azure.com/.default"]
)

if "access_token" not in result:
    err  = result.get("error", "unknown")
    desc = result.get("error_description", "no description")
    print(f"ERROR acquiring token: {err} — {desc}", file=sys.stderr)
    sys.exit(1)

upn = result.get("id_token_claims", {}).get("preferred_username", USERNAME)
print(f"Token acquired for {upn} (tenant {TENANT})")

# --- Write MSAL cache to ~/.azure/ ---
az_dir = pathlib.Path.home() / ".azure"
az_dir.mkdir(exist_ok=True)

(az_dir / "msal_token_cache.json").write_text(cache.serialize())

# Azure CLI also expects azureProfile.json
profile = {
    "installationId": "ado-pipeline",
    "subscriptions": [{
        "id": SUB,
        "name": "Pipeline Subscription",
        "state": "Enabled",
        "tenantId": TENANT,
        "user": {"name": upn, "type": "user"},
        "isDefault": True,
        "environmentName": "AzureCloud",
        "homeTenantId": TENANT,
        "managedByTenants": [],
    }],
}
(az_dir / "azureProfile.json").write_text(json.dumps(profile, indent=2))
print("Azure CLI cache configured successfully")
