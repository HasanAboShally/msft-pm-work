#!/usr/bin/env python3
"""
Get a Fabric API access token — works for both auth methods:
  - SPN:  reads ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_TENANT_ID from env
  - CLI:  calls `az account get-access-token` (requires active az login)
Prints the token to stdout (used in shell scripts via command substitution).
"""
import os, sys, subprocess

CLIENT_ID = os.environ.get("ARM_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("ARM_CLIENT_SECRET", "")
TENANT_ID = os.environ.get("ARM_TENANT_ID", "")
FABRIC_SCOPE = "https://api.fabric.microsoft.com/.default"

if CLIENT_ID and CLIENT_SECRET and TENANT_ID:
    try:
        import msal
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "msal", "-q"],
                       check=True, capture_output=True)
        import msal

    app = msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=f"https://login.microsoftonline.com/{TENANT_ID}",
        client_credential=CLIENT_SECRET,
    )
    result = app.acquire_token_for_client(scopes=[FABRIC_SCOPE])
    if "access_token" in result:
        print(result["access_token"])
    else:
        print(f"ERROR: {result.get('error')} — {result.get('error_description', '')}", file=sys.stderr)
        sys.exit(1)
else:
    # Fall back to Azure CLI
    r = subprocess.run(
        ["az", "account", "get-access-token",
         "--resource", "https://api.fabric.microsoft.com",
         "--query", "accessToken", "-o", "tsv"],
        capture_output=True, text=True
    )
    if r.returncode == 0:
        print(r.stdout.strip())
    else:
        print(f"ERROR: {r.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
