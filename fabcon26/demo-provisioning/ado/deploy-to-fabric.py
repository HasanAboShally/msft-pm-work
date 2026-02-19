#!/usr/bin/env python3
"""Fabric CI/CD Deployment Script.

Deploys Fabric workspace items using the ``fabric-cicd`` library.
Called by the Azure DevOps pipeline (Deploy-To-Fabric.yml).

Workflow:
    1. Authenticate via Azure CLI credential (provided by AzureCLI@2 task)
    2. Initialize a FabricWorkspace object with environment-specific remapping
    3. Publish all items from the git repository to the target workspace
    4. Remove orphan items (items in workspace but not in git)

Usage::

    python deploy-to-fabric.py \\
        --workspace_name "DEWorkshop_user001_Test" \\
        --repository_directory "./DE_Workshop" \\
        --environment "test"

Dependencies::

    pip install -r requirements.txt
"""

import argparse
import logging
import os
import sys
import time

from azure.identity import AzureCliCredential
from fabric_cicd import (
    FabricWorkspace,
    change_log_level,
    publish_all_items,
    unpublish_all_orphan_items,
)


def parse_arguments() -> argparse.Namespace:
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(
        description="Deploy Fabric workspace items via fabric-cicd",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Deploy to Test workspace
  python deploy-to-fabric.py \\
    --workspace_name "DEWorkshop_user001_Test" \\
    --repository_directory "./DE_Workshop" \\
    --environment "test"

  # Deploy to Production workspace
  python deploy-to-fabric.py \\
    --workspace_name "DEWorkshop_user001_Prod" \\
    --repository_directory "./DE_Workshop" \\
    --environment "prod"
        """,
    )
    parser.add_argument(
        "--workspace_name",
        type=str,
        required=True,
        help="Name of the target Fabric workspace",
    )
    parser.add_argument(
        "--repository_directory",
        type=str,
        required=True,
        help="Path to the directory containing Fabric item definitions",
    )
    parser.add_argument(
        "--environment",
        type=str,
        required=True,
        choices=["dev", "test", "prod"],
        help="Target environment (drives parameter.yml remapping)",
    )

    return parser.parse_args()


def configure_logging() -> None:
    """Configure unbuffered output and debug logging if enabled."""
    # Force unbuffered output for real-time pipeline logs
    sys.stdout.reconfigure(line_buffering=True, write_through=True)
    sys.stderr.reconfigure(line_buffering=True, write_through=True)

    # Enable debug logging if Azure DevOps system debug is on
    if os.getenv("SYSTEM_DEBUG", "false").lower() == "true":
        change_log_level("DEBUG")
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.INFO)


def validate_directory(directory: str) -> None:
    """Validate that the repository directory exists and has content."""
    if not os.path.isdir(directory):
        print(f"❌ Repository directory does not exist: {directory}")
        sys.exit(1)

    items = [
        d
        for d in os.listdir(directory)
        if os.path.isdir(os.path.join(directory, d)) and not d.startswith(".")
    ]
    if not items:
        print(f"❌ No Fabric items found in: {directory}")
        sys.exit(1)

    print(f"📦 Found {len(items)} item(s) in repository:")
    for item in sorted(items):
        print(f"   • {item}")


def main() -> None:
    """Main deployment flow."""
    args = parse_arguments()
    configure_logging()

    print("=" * 60)
    print("  Fabric CI/CD Deployment")
    print("=" * 60)
    print(f"  Workspace:   {args.workspace_name}")
    print(f"  Environment: {args.environment}")
    print(f"  Repository:  {args.repository_directory}")
    print("=" * 60)

    # Validate repository directory
    validate_directory(args.repository_directory)

    # Authenticate via Azure CLI credential (injected by AzureCLI@2 task)
    print("\n🔐 Authenticating via Azure CLI credential...")
    token_credential = AzureCliCredential()

    # Initialize FabricWorkspace
    # The environment parameter drives parameter.yml value resolution:
    #   - "test" → _ALL_ or test-specific values
    #   - "prod" → _ALL_ or prod-specific values
    print(f"\n⚙️  Initializing FabricWorkspace: {args.workspace_name}")
    start_time = time.time()

    target_workspace = FabricWorkspace(
        workspace_name=args.workspace_name,
        environment=args.environment,
        repository_directory=args.repository_directory,
        token_credential=token_credential,
    )

    # Publish all items defined in the repository
    print("\n🚀 Publishing items to workspace...")
    publish_all_items(target_workspace)

    # Remove items that exist in workspace but not in the repository
    print("\n🧹 Removing orphan items...")
    unpublish_all_orphan_items(target_workspace)

    elapsed = time.time() - start_time
    print(f"\n✅ Deployment completed in {elapsed:.1f}s")
    print(f"   Workspace: {args.workspace_name}")
    print(f"   Environment: {args.environment}")


if __name__ == "__main__":
    main()
