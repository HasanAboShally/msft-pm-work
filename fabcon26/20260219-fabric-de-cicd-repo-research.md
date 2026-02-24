# Fabric-DE-CICD Workshop — Complete Technical Research

> **Source**: [github.com/DaniBunny/Fabric-DE-CICD](https://github.com/DaniBunny/Fabric-DE-CICD)  
> **Researched**: 2026-02-19  
> **Purpose**: All details needed to recreate the demo environment via Terraform + CLI scripts

---

## Table of Contents

1. [Workshop Overview & Architecture](#1-workshop-overview--architecture)
2. [Fabric Items / Artifacts (Workshop Template)](#2-fabric-items--artifacts-workshop-template)
3. [Deployment Scripts (`deployment/scripts/`)](#3-deployment-scripts)
4. [Bootstrap Deployment Script (`first_deployment.sh`)](#4-bootstrap-deployment-script)
5. [Azure DevOps Pipeline YAML & Python (`AzDO/`)](#5-azure-devops-pipeline-yaml--python)
6. [Parameter.yml (fabric-cicd remapping)](#6-parameteryml-fabric-cicd-remapping)
7. [Module-by-Module: All fabric-cli Commands](#7-module-by-module-all-fabric-cli-commands)
8. [Git Integration Configuration](#8-git-integration-configuration)
9. [Deployment Pipeline Stages (Dev/Test/Prod)](#9-deployment-pipeline-stages-devtestprod)
10. [SPN / Identity Configuration](#10-spn--identity-configuration)
11. [Variable Libraries & Deployment Rules](#11-variable-libraries--deployment-rules)
12. [Schema Evolution (Module 8 Spark SQL DDL)](#12-schema-evolution-module-8-spark-sql-ddl)
13. [Terraform Mentions](#13-terraform-mentions)
14. [Environment Variables & Configuration Values](#14-environment-variables--configuration-values)

---

## 1. Workshop Overview & Architecture

**Workshop**: Data Engineering git/CI/CD with Microsoft Fabric  
**FabCon EU 2025** — Full-day workshop (9 AM – 5 PM), 8 modules

### Module Sequence

| # | Module | Duration | Location |
|---|--------|----------|----------|
| 1 | Environment Setup | 30 min | `configuration/start.md` |
| 2 | First Deployment (Bootstrap) | 30 min | `deployment/bootstrap.md` |
| 3 | Version Control Basics | 30 min | `versioning/start.md` |
| 4 | Branch Management | 60 min | `deployment/branch-out.md` |
| 5 | Deployment Pipelines | 60 min | `deployment/start.md` |
| 6 | End-to-End Pipeline (3-stage) | 45 min | `deployment/full-run.md` |
| 7 | Azure DevOps Pipelines | 30 min | `deployment/azuredevops.md` |
| 8 | Schema Evolution | 45 min | `versioning/data-artifact-changes.md` |

### Architecture

- **Medallion pattern**: Bronze → Silver (2 Lakehouses)
- **3 Spark Notebooks**: `Bronze_Data_Preparation`, `Transformations`, `Validations`
- **2 Copy Jobs**: `MyLHCopyJob`, `MyLHCopyJob2`
- **1 Semantic Model**: `MySemanticModel`
- **1 Power BI Report**: `MyReport`
- **1 Environment**: `MyEnv`
- **3 Workspaces**: Dev, Test, Prod
- **3 Git Branches**: `main`, `test`, `production`

### Key Tools

| Tool | Use |
|------|-----|
| `fabric-cli` (aka `fab`) | CLI for workspace management, item creation, deployment, import/export |
| `fabric-cicd` (Python) | Library for git-based CI/CD deployments via Azure DevOps |
| Azure DevOps | Git hosting, pipeline automation, PR workflows |

---

## 2. Fabric Items / Artifacts (Workshop Template)

**Location**: `deployment/workshop_template/`

All items in the template directory (these get copied to a staging dir, metadata-replaced, then imported):

| Item Name | Item Type | Purpose |
|-----------|-----------|---------|
| `Bronze_Data_Preparation.Notebook` | Notebook | Processes raw data in Bronze lakehouse, creates t3 tables |
| `Transformations.Notebook` | Notebook | Bronze → Silver transformations, creates t1 table |
| `Validations.Notebook` | Notebook | Data quality checks and validation queries |
| `MyEnv.Environment` | Environment | Spark environment configuration |
| `MyLHCopyJob.CopyJob` | Copy Job | Imports external data into Bronze lakehouse |
| `MyLHCopyJob2.CopyJob` | Copy Job | Second copy job for additional data import |
| `MySemanticModel.SemanticModel` | Semantic Model | Business logic layer on Silver lakehouse |
| `MyReport.Report` | Power BI Report | Visualization/analytics dashboard |

### Lakehouses (Created at Runtime, NOT in Template)

| Lakehouse | Layer | Schema | Tables |
|-----------|-------|--------|--------|
| `Lakehouse_Bronze` | Bronze (raw) | `enableschemas=true` | t2, t3_dev, t3_prod (created by notebooks/copy jobs) |
| `Lakehouse_Silver` | Silver (processed) | `enableschemas=true` | t1 (created by Transformations notebook), t2 (shortcut), t3 (shortcut) |

### Shortcuts

| Shortcut | Location | Target |
|----------|----------|--------|
| `t2.Shortcut` | `Lakehouse_Silver/Tables/dbo/t2` | `Lakehouse_Bronze/Tables/dbo/t2` (OneLake) |
| `t3.Shortcut` | `Lakehouse_Silver/Tables/dbo/t3` | `Lakehouse_Bronze/Tables/dbo/t3_dev` (OneLake) |

---

## 3. Deployment Scripts

### `deployment/scripts/` — 3 Files

#### 3.1 `utils.sh`

```bash
#!/bin/bash
EXIT_ON_ERROR=true
staging_dir="./tmp"

source ./scripts/fab_functions.sh
source ./scripts/replace_metadata.sh

# Parse command-line arguments
parse_args() {
    while [[ "$#" -gt 0 ]]; do
        case $1 in
            --capacity-name) capacity_name="$2"; shift ;;
            --spn-auth-enabled) spn_auth_enabled="$2"; shift ;;
            --upn-objectid) upn_objectid="$2"; shift ;;
            --username) username="$2"; shift ;;
            *) echo "Unknown parameter passed: $1"; exit 1 ;;
        esac
        shift
    done
}

# Create staging directory (copies workshop_template to ./tmp)
create_staging() {
    mkdir -p "$staging_dir"
    cp -r ./workshop_template/* "$staging_dir/"
}

# Clean up staging directory
clean_up_staging() {
    rm -r "$staging_dir"
}
```

**CLI Parameters**:
- `--capacity-name` — Fabric capacity name
- `--spn-auth-enabled` — `"true"` / `"false"` for SPN auth
- `--upn-objectid` — UPN object ID (for ACL assignment)
- `--username` — Workshop participant username

#### 3.2 `fab_functions.sh`

All fabric-cli wrapper functions:

```bash
#!/bin/bash
source ./scripts/replace_metadata.sh

# Execute any fab command with error handling
run_fab_command() {
    local command=$1
    if [ "$EXIT_ON_ERROR" = true ]; then set -e; else set +e; fi
    fab -c "${command}"
}

# SPN Authentication
check_spn_auth() {
    if [ "$spn_auth_enabled" == "true" ]; then
        export FAB_CLIENT_ID
        export FAB_CLIENT_SECRET
        export FAB_TENANT_ID
        run_fab_command "auth login -u $FAB_CLIENT_ID -p $FAB_CLIENT_SECRET --tenant $FAB_TENANT_ID"
    fi
}

# Create workspace + assign SPN permissions
create_workspace() {
    local suffix=$1
    run_fab_command "create /${_workspace_name} -P capacityName=${capacity_name}"
    if [ "$spn_auth_enabled" == "true" ]; then
        run_fab_command "acl set -f /${_workspace_name} -I $upn_objectid -R admin"
    fi
}

# Import functions (all follow same pattern)
import_eventhouse()       # fab import -f /workspace/item -i staging/item
import_kql_database()     # + replace_kql_database_parent_eventhouse
import_eventstream()      # + replace_eventstream_destination_kql_database
import_kql_dashboard()    # + replace_kql_dashboard_datasource
import_kql_queryset()     # + replace_kqlqueryset_connection
import_semantic_model()   # fab import -f /workspace/model -i staging/model
import_powerbi_report()   # fab import -f /workspace/report -i staging/report
import_pipeline()         # + replace_pipeline_metadata

# Open workspace in browser
open_workspace() {
    run_fab_command "open /${_workspace_name}"
}

# Get a property from a Fabric item (with retry)
get_fab_property() {
    local element_path=$1
    local property=$2
    local value=$(run_fab_command "get $element_path -q $property" | tr -d '\r')
    while [[ "$value" == "None" || -z "$value" ]]; do
        sleep 5
        value=$(run_fab_command "get $element_path -q $property" | tr -d '\r')
    done
    echo "$value"
}
```

#### 3.3 `replace_metadata.sh`

JSON/file metadata replacement functions using `jq` and `sed`:

```bash
#!/bin/bash
staging_dir="./tmp"

replace_json_value()                              # Generic jq replacement
replace_kql_database_parent_eventhouse()           # KQL DB → eventhouse ID
replace_eventstream_destination_kql_database()     # Eventstream → workspace_id + kql_db_id
replace_kql_dashboard_datasource()                 # Dashboard → workspace_id + kql_db_id + cluster_uri
replace_kqlqueryset_connection()                   # Queryset → kql_db_id + cluster_uri
replace_report_bypath_to_byconnection()            # Report definition.pbir → byConnection mode
replace_string_value()                             # sed-based string replacement in any file
replace_pipeline_metadata()                        # Pipeline → workspace_id + lakehouse_id + connection_id
replace_semanticmodel_metadata()                   # Semantic model expressions.tmdl → conn string + ID
replace_report_semantic_model()                    # Report definition.pbir → semantic_model_id
replace_string_value_json()                        # sed in staging JSON files
```

**Placeholder GUIDs replaced at deployment time**:
- Copy Job placeholders: `8e0cc78d-1667-4e88-9523-a04c1d5dd187` (workspace ID), `3ad63567-2849-4e5b-9cf2-eacd059e50a5` (lakehouse ID)
- Semantic Model placeholders: `X6EPS4XRQ2XUDENLFV6NAEO3I4-RXDQZDTHC2EE5FJDUBGB2XORQ4.msit-datawarehouse.fabric.microsoft.com` (conn string), `48d64684-b584-4ef5-ad7b-a094b42f52f8` (SQL endpoint ID)
- Report placeholder: `e4e9593c-b1a9-428e-9581-64939a83c4d9` (semantic model ID)

---

## 4. Bootstrap Deployment Script

**File**: `deployment/first_deployment.sh`

### Complete Deployment Flow (Exact Order)

```bash
#!/bin/bash
# Default parameters
capacity_name="none"
spn_auth_enabled="false"
upn_objectid=""
username="${USER}"
workspace_name="DEWorkshop"

source ./scripts/utils.sh
parse_args "$@"
```

**Usage**:
```bash
./first_deployment.sh \
    --username yourusername \
    --capacity-name "Your-Capacity-Name"
```

### Step-by-Step Operations

| Step | Operation | Exact fab Command |
|------|-----------|-------------------|
| 1 | Create staging dir | `cp -r ./workshop_template/* ./tmp/` |
| 2 | Create workspace | `fab create /DEWorkshop_<username>.Workspace -P capacityName=<capacity>` |
| 3 | Get workspace ID | `fab get /DEWorkshop_<username>.Workspace -q id` |
| 4 | Assign capacity | `fab assign -f .capacities/<capacity>.Capacity -W DEWorkshop_<username>.Workspace` |
| 5 | Create Bronze lakehouse | `fab create /DEWorkshop_<username>.Workspace/Lakehouse_Bronze.Lakehouse -P enableschemas=true` |
| 6 | Create Silver lakehouse | `fab create /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -P enableschemas=true` |
| 7 | Import Environment | `fab import -f /DEWorkshop_<username>.Workspace/MyEnv.Environment -i ./tmp/MyEnv.Environment` |
| 8 | Get Bronze lakehouse ID | `fab get /DEWorkshop_<username>.Workspace/Lakehouse_Bronze.Lakehouse -q id` |
| 9 | Get Silver lakehouse ID | `fab get /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -q id` |
| 10 | Get Silver SQL endpoint ID | `fab get /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.id` |
| 11 | Get Silver SQL conn string | `fab get /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.connectionString` |
| 12 | Import 3 notebooks | `fab import -f /.../Notebook -i ./tmp/Notebook` (for each) |
| 13 | Set notebook lakehouse binding | `fab set -f /.../Notebook -q lakehouse -i '{"known_lakehouses":[{"id":"<silver_id>"}],"default_lakehouse":"<silver_id>","default_lakehouse_name":"Lakehouse_Silver","default_lakehouse_workspace_id":"<ws_id>"}'` |
| 14 | Set Bronze notebook binding | Same pattern but with Bronze lakehouse ID for `Bronze_Data_Preparation.Notebook` |
| 15 | Replace Copy Job GUIDs | `sed` replacements in `copyjob-content.json` |
| 16 | Import 2 Copy Jobs | `fab import -f /.../CopyJob -i ./tmp/CopyJob` |
| 17 | Run Copy Jobs | `fab api -X post workspaces/<ws_id>/items/<copyjob_id>/jobs/instances?jobType=Execute` |
| 18 | Create t2 shortcut | `fab ln -f /.../Lakehouse_Silver.Lakehouse/Tables/dbo/t2.Shortcut --type oneLake --target /.../Lakehouse_Bronze.Lakehouse/Tables/dbo/t2` |
| 19 | Run Bronze notebook | `fab job run /.../Bronze_Data_Preparation.Notebook` |
| 20 | Create t3 shortcut | `fab ln -f /.../Lakehouse_Silver.Lakehouse/Tables/dbo/t3.Shortcut --type oneLake --target /.../Lakehouse_Bronze.Lakehouse/Tables/dbo/t3_dev` |
| 21 | Run Transformations notebook | `fab job run /.../Transformations.Notebook` |
| 22 | Replace Semantic Model metadata | `sed` replacements in `definition/expressions.tmdl` |
| 23 | Import Semantic Model | `fab import -f /.../MySemanticModel.SemanticModel -i ./tmp/MySemanticModel.SemanticModel` |
| 24 | Get Semantic Model ID | `fab get /.../MySemanticModel.SemanticModel -q id` |
| 25 | Replace Report metadata | `sed` replacement in `definition.pbir` |
| 26 | Import Report | `fab import -f /.../MyReport.Report -i ./tmp/MyReport.Report` |
| 27 | Open workspace | `fab open /DEWorkshop_<username>.Workspace` |
| 28 | Clean up | `rm -r ./tmp` |

### Naming Convention

- Workspace: `DEWorkshop_<username>` (dev), `DEWorkshop_<username>_Test`, `DEWorkshop_<username>_Prod`
- Git folder: `/DE_Workshop`

---

## 5. Azure DevOps Pipeline YAML & Python

### `AzDO/Deploy-To-Fabric.yml`

**Complete YAML**:

```yaml
trigger:
  branches:
    include:
      - test
      - production

stages:
  - stage: Build_Release
    jobs:
      - job: Build
        pool:
          vmImage: windows-latest
        steps:
          - checkout: self

          - task: UsePythonVersion@0
            inputs:
              versionSpec: "3.12"
              addToPath: true

          - script: |
              pip install fabric-cicd
            displayName: "Install fabric-cicd"

          - task: AzureCLI@2
            displayName: "Deploy Fabric Workspace"
            inputs:
              azureSubscription: "SPN00"            # ← MUST CHANGE to "WorkshopConnection"
              scriptType: "ps"
              scriptLocation: "inlineScript"
              inlineScript: |
                #### MODIFY VALUES HERE ####
                $dev_workspace_name = "DEWorkshop_User000"         # ← workspace name (dev)
                $test_workspace_name = "DEWorkshop_User000_Test"   # ← workspace name (test)
                $prod_workspace_name = "DEWorkshop_User000_Prod"   # ← workspace name (prod)

                #### DO NOT MODIFY BELOW THIS LINE ####
                $branch = "$(Build.SourceBranch)"
                Write-Host "Branch: $branch"

                if ($branch -eq "refs/heads/test") {
                    $workspace_name = $test_workspace_name
                    $environment = "test"
                } elseif ($branch -eq "refs/heads/production") {
                    $workspace_name = $prod_workspace_name
                    $environment = "prod"
                } else {
                    $workspace_name = $dev_workspace_name
                    $environment = "dev"
                }

                $repository_directory = "$(System.DefaultWorkingDirectory)/DE_Workshop"

                python -u $(System.DefaultWorkingDirectory)/deploy-to-fabric.py `
                    --workspace_name "$workspace_name" `
                    --repository_directory "$repository_directory" `
                    --environment "$environment"
```

**Key Configuration Points**:
- **Trigger**: Only `test` and `production` branches
- **Pool**: `windows-latest`
- **Python**: 3.12
- **Package**: `fabric-cicd` (pip install)
- **Auth**: Azure CLI credential via `AzureCLI@2` task
- **Azure Subscription**: Service connection name (e.g., `WorkshopConnection`)
- **Branch → Environment Mapping**:
  - `refs/heads/test` → `test` environment → Test workspace
  - `refs/heads/production` → `prod` environment → Prod workspace
  - Anything else → `dev` environment → Dev workspace
- **Repository directory**: `$(System.DefaultWorkingDirectory)/DE_Workshop`

### `AzDO/deploy-to-fabric.py`

**Complete Python Script**:

```python
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

"""Deploy workspace to Fabric"""

import argparse
import os
import sys

from azure.identity import AzureCliCredential
from fabric_cicd import FabricWorkspace, change_log_level, publish_all_items, unpublish_all_orphan_items

parser = argparse.ArgumentParser(description="Deploy Fabric Workspace Parameters")
parser.add_argument("--repository_directory", type=str, help="Directory of the workspace files")
parser.add_argument("--environment", type=str, help="Environment to use for parameter.yml")
parser.add_argument("--workspace_name", type=str, help="Name of the workspace to deploy")

args = parser.parse_args()

repository_directory = args.repository_directory
environment = args.environment
workspace_name = args.workspace_name

# Force unbuffered output
sys.stdout.reconfigure(line_buffering=True, write_through=True)
sys.stderr.reconfigure(line_buffering=True, write_through=True)

# Enable debugging if defined in Azure DevOps pipeline
if os.getenv("SYSTEM_DEBUG", "false").lower() == "true":
    change_log_level("DEBUG")

# Use Azure CLI credential to authenticate
token_credential = AzureCliCredential()

# Initialize the FabricWorkspace object
target_workspace = FabricWorkspace(
    workspace_name=workspace_name,
    environment=environment,
    repository_directory=repository_directory,
    token_credential=token_credential,
)

# Publish all items defined in item_type_in_scope
publish_all_items(target_workspace)

# Unpublish all items not found in repository
unpublish_all_orphan_items(target_workspace)
```

**Python Arguments**:
- `--repository_directory` — Path to workspace files (e.g., `./DE_Workshop`)
- `--environment` — `"dev"` / `"test"` / `"prod"` (used by parameter.yml remapping)
- `--workspace_name` — Target workspace name

**Dependencies**: `azure-identity`, `fabric-cicd`

---

## 6. Parameter.yml (fabric-cicd Remapping)

**File**: `AzDO/parameter.yml` (also uploaded to `DE_Workshop/parameter.yml` in the repo)

```yaml
find_replace:
    # Replace Bronze Lakehouse in Notebooks
    - find_value: ""           # Item Id of Lakehouse_Bronze in Dev workspace
      replace_value:
        _ALL_: "$items.Lakehouse.Lakehouse_Bronze.id"
      item_type: "Notebook"
    
    # Replace Silver Lakehouse in Notebooks
    - find_value: ""           # Item Id of Lakehouse_Silver in Dev workspace
      replace_value:
        _ALL_: "$items.Lakehouse.Lakehouse_Silver.id"
      item_type: "Notebook"

    # Replace Dev Workspace Id in Notebooks
    - find_value: ""           # Workspace Id of Dev Workspace
      replace_value:
        _ALL_: "$workspace.id"
      item_type: "Notebook"
      
    # Replace Connection String in Semantic Model
    - find_value: 'database\s*=\s*Sql\.Database\s*\(\s*"([^"]+)"'
      replace_value:
          _ALL_: "$items.Lakehouse.Lakehouse_Silver.sqlendpoint"
      is_regex: "true"
      item_type: "SemanticModel"
      
    # Replace Database ID in Semantic Model with Database Name
    - find_value: 'database\s*=\s*Sql\.Database\s*\(\s*"[^"]+"\s*,\s*"([^"]+)"'
      replace_value:
          _ALL_: "Lakehouse_Silver"
      is_regex: "true"
      item_type: "SemanticModel"
```

**Values to fill in** (per-user):
- Line 3: Dev `Lakehouse_Bronze` item ID
- Line 9: Dev `Lakehouse_Silver` item ID  
- Line 15: Dev Workspace ID

**How fabric-cicd uses `_ALL_`**:
- `$items.Lakehouse.Lakehouse_Bronze.id` → Resolved to target workspace's Bronze lakehouse ID
- `$items.Lakehouse.Lakehouse_Silver.id` → Resolved to target workspace's Silver lakehouse ID
- `$workspace.id` → Resolved to target workspace ID
- `$items.Lakehouse.Lakehouse_Silver.sqlendpoint` → Resolved to target Silver SQL endpoint

---

## 7. Module-by-Module: All fabric-cli Commands

### Module 2 (Bootstrap)

```bash
# Authenticate
fab auth login
fab auth status

# Create workspace
fab create /DEWorkshop_<username>.Workspace -P capacityName=<capacity>

# Assign capacity 
fab assign -f .capacities/<capacity>.Capacity -W DEWorkshop_<username>.Workspace

# Create lakehouses
fab create /DEWorkshop_<username>.Workspace/Lakehouse_Bronze.Lakehouse -P enableschemas=true
fab create /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -P enableschemas=true

# Import items
fab import -f /DEWorkshop_<username>.Workspace/MyEnv.Environment -i ./tmp/MyEnv.Environment
fab import -f /DEWorkshop_<username>.Workspace/<Notebook> -i ./tmp/<Notebook>
fab import -f /DEWorkshop_<username>.Workspace/<CopyJob> -i ./tmp/<CopyJob>
fab import -f /DEWorkshop_<username>.Workspace/MySemanticModel.SemanticModel -i ./tmp/MySemanticModel.SemanticModel
fab import -f /DEWorkshop_<username>.Workspace/MyReport.Report -i ./tmp/MyReport.Report

# Set notebook lakehouse binding
fab set -f /DEWorkshop_<username>.Workspace/<Notebook> -q lakehouse -i '<JSON>'

# Get item properties
fab get /DEWorkshop_<username>.Workspace/Lakehouse_Bronze.Lakehouse -q id
fab get /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -q id
fab get /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.id
fab get /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.connectionString

# Create shortcuts
fab ln -f /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse/Tables/dbo/t2.Shortcut \
    --type oneLake --target /DEWorkshop_<username>.Workspace/Lakehouse_Bronze.Lakehouse/Tables/dbo/t2

fab ln -f /DEWorkshop_<username>.Workspace/Lakehouse_Silver.Lakehouse/Tables/dbo/t3.Shortcut \
    --type oneLake --target /DEWorkshop_<username>.Workspace/Lakehouse_Bronze.Lakehouse/Tables/dbo/t3_dev

# Run notebooks
fab job run /DEWorkshop_<username>.Workspace/Bronze_Data_Preparation.Notebook
fab job run /DEWorkshop_<username>.Workspace/Transformations.Notebook

# Run copy jobs via API
fab api -X post workspaces/<ws_id>/items/<copyjob_id>/jobs/instances?jobType=Execute

# SPN auth (optional)
fab auth login -u $FAB_CLIENT_ID -p $FAB_CLIENT_SECRET --tenant $FAB_TENANT_ID

# ACL for SPN workspaces
fab acl set -f /DEWorkshop_<username>.Workspace -I $upn_objectid -R admin

# Open workspace in browser
fab open /DEWorkshop_<username>.Workspace

# Delete workspace
fab rm -f /DEWorkshop_<username>

# List capacities
fab ls .capacities

# List workspace contents
fab ls /DEWorkshop_<username>

# Get help
fab --help
fab create --help
```

### Module 3 (Version Control) — fabric-cli commands used

```bash
# No additional fab commands unique to Module 3; it's all Fabric UI + Azure DevOps UI
```

### Module 5 (Deployment Pipelines) — fabric-cli commands for getting IDs

```bash
# Set interactive mode
fab config set mode interactive

# Authenticate
fab auth login

# Get Development workspace details
fab:/$ cd /DEWorkshop_<username>.Workspace
fab:/DEWorkshop_<username>.Workspace$ get . -q id                          # Workspace ID
fab:/DEWorkshop_<username>.Workspace$ get Lakehouse_Bronze.Lakehouse -q id  # Bronze ID

# Go to root
fab:/DEWorkshop_<username>.Workspace$ cd ..

# Get Production workspace details
fab:/$ cd /DEWorkshop_<username>_Prod.Workspace
fab:/DEWorkshop_<username>_Prod.Workspace$ get . -q id                          # Workspace ID
fab:/DEWorkshop_<username>_Prod.Workspace$ get Lakehouse_Bronze.Lakehouse -q id  # Bronze ID

# Get Semantic Model deployment rule info
fab:/DEWorkshop_<username>_Prod.Workspace$ get Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.id
fab:/DEWorkshop_<username>_Prod.Workspace$ get Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.connectionString
```

### Module 7 (Azure DevOps) — fabric-cli commands for getting IDs

```bash
# Same interactive mode commands as Module 5 to retrieve:
# - Workspace ID
# - Lakehouse_Bronze ID
# - Lakehouse_Silver ID
# For populating parameter.yml
```

---

## 8. Git Integration Configuration

### Azure DevOps Project Settings

| Setting | Value |
|---------|-------|
| Git provider | Azure DevOps |
| Organization | `FabConEU` (workshop) / your org |
| Project | `FabConEU_DEWorkshop` (or `DEWorkshop-<username>`) |
| Repository | `User###` (forked per participant) |
| Branch (dev) | `main` |
| Branch (test) | `test` (created via branch-out) |
| Branch (prod) | `production` (created via branch-out) |
| Git folder | `/DE_Workshop` |

### Branch Structure

```
main          → DEWorkshop_<username>        (Development workspace)
test          → DEWorkshop_<username>_Test    (Test workspace)
production    → DEWorkshop_<username>_Prod    (Production workspace)
```

### Files in Azure DevOps Repo (After Sync)

```
/
├── DE_Workshop/
│   ├── Bronze_Data_Preparation.Notebook/
│   ├── Transformations.Notebook/
│   ├── Validations.Notebook/
│   ├── MyEnv.Environment/
│   ├── MyLHCopyJob.CopyJob/
│   ├── MyLHCopyJob2.CopyJob/
│   ├── MySemanticModel.SemanticModel/
│   ├── MyReport.Report/
│   ├── Lakehouse_Bronze.Lakehouse/
│   ├── Lakehouse_Silver.Lakehouse/
│   │   └── shortcuts.metadata.json    ← shortcut definitions
│   ├── MyVarLib.VariableLibrary/       ← added in Module 5
│   └── parameter.yml                   ← for fabric-cicd (Module 7)
├── deploy-to-fabric.py
├── deploy-to-fabric.yml (Deploy-To-Fabric.yml)
└── README.md
```

### What Gets Versioned vs Not

| Item Type | Versioned in Git | NOT Versioned |
|-----------|-----------------|---------------|
| Lakehouses | Structure, metadata, shortcut definitions, security roles | Actual data in tables, Files in OneLake |
| Notebooks | All code cells, markdown, cell metadata | Execution results, runtime state |
| Pipelines | Structure, activity definitions, parameters | Run history, cached results |
| Semantic Models | Table definitions, relationships, measures | Imported data, refresh history |
| Reports | Layout, visuals, DAX queries, bookmarks | Cached data, user personalizations |
| Connections | Connection metadata, endpoint URLs | Passwords, secrets, OAuth tokens |

---

## 9. Deployment Pipeline Stages (Dev/Test/Prod)

### Fabric Native Deployment Pipeline (Modules 5-6)

**Pipeline Name**: `DEWorkshop_<username>_Pipeline` (2-stage) → `DEWorkshop_<username>_Pipeline_3Stage` (3-stage)

| Stage | Workspace | Branch | Purpose |
|-------|-----------|--------|---------|
| Development | `DEWorkshop_<username>` | `main` | Active development |
| Test | `DEWorkshop_<username>_Test` | `test` | Integration testing |
| Production | `DEWorkshop_<username>_Prod` | `production` | Production environment |

### Azure DevOps Pipeline (Module 7)

**Flow**: PR merge triggers → `fabric-cicd` deploys to target workspace

```
Dev change in Fabric UI
    → Commit to main branch
        → PR: main → test branch → Auto-deploy to Test workspace
            → PR: test → production branch → Auto-deploy to Production workspace
```

### Post-Deployment Steps (Manual)

After each deployment:
1. Run Copy Jobs (`MyLHCopyJob`, `MyLHCopyJob2`) in target workspace
2. Run `Bronze_Data_Preparation.Notebook`
3. Set Variable Library active set (Production value set for Prod workspace)
4. Update all variables in `Lakehouse_Silver` (ribbon: "Update all variables")
5. Run `Transformations.Notebook`
6. Run `Validations.Notebook`
7. Refresh `MySemanticModel`
8. Verify `MyReport`

---

## 10. SPN / Identity Configuration

### Service Principal Setup (Module 7)

| Step | Detail |
|------|--------|
| Create SPN | Azure portal → App Registration → New |
| Generate secret | Under SPN → Certificates & Secrets → New client secret |
| Assign Azure role | Reader permission on Azure subscription |
| Create ADO service connection | Type: `Azure Resource Manager` |

### Azure DevOps Service Connection

| Setting | Value |
|---------|-------|
| Identity type | App Registration |
| Credential | Secret |
| Environment | Azure Cloud |
| Scope Level | Subscription |
| Subscription ID & Name | [Your subscription] |
| Application (client) ID | SPN Client ID |
| Directory (tenant) ID | Your tenant ID |
| Client secret | Generated SPN secret |
| Service connection name | `WorkshopConnection` |
| Grant permission to all pipelines | ✅ Yes |

### SPN Workspace Permissions

| Workspace | SPN Role |
|-----------|----------|
| `DEWorkshop_<username>` (Dev) | **Admin** |
| `DEWorkshop_<username>_Test` (Test) | **Admin** |
| `DEWorkshop_<username>_Prod` (Prod) | **Admin** |

### SPN Auth via fabric-cli

```bash
# Environment variables
export FAB_CLIENT_ID=<client-id>
export FAB_CLIENT_SECRET=<client-secret>
export FAB_TENANT_ID=<tenant-id>

# Login
fab auth login -u $FAB_CLIENT_ID -p $FAB_CLIENT_SECRET --tenant $FAB_TENANT_ID
```

---

## 11. Variable Libraries & Deployment Rules

### Variable Library: `MyVarLib`

Created in `DEWorkshop_<username>` workspace.

| Variable Name | Default (Dev) Value | Production Value Set |
|--------------|---------------------|----------------------|
| `workspace_id` | Dev workspace GUID | Prod workspace GUID |
| `lakehouse_bronze_id` | Dev Bronze lakehouse GUID | Prod Bronze lakehouse GUID |
| `lakehouse_bronze_table_name` | (table name for t3 shortcut) | (prod table name) |

### Shortcut Variable Binding

Shortcuts in `Lakehouse_Silver` updated to use variables:
- `t2` shortcut: Target workspace = `workspace_id` variable, Target item = `lakehouse_bronze_id` variable
- `t3` shortcut: Target workspace = `workspace_id`, Target item = `lakehouse_bronze_id`, Target table = `lakehouse_bronze_table_name`

### Deployment Rules (Semantic Model)

| Rule Type | Rule Detail |
|-----------|-------------|
| Data source | Server = `properties.sqlEndpointProperties.connectionString` from Prod Silver Lakehouse |
| Data source | Database = `properties.sqlEndpointProperties.id` from Prod Silver Lakehouse |

### Deployment Process

1. Deploy from Dev → Test/Prod
2. In target workspace: Set the correct Variable Library value set as "Active"
3. In target workspace: Open Lakehouse_Silver → "Update all variables"
4. This reconfigures shortcuts to point to correct environment resources

---

## 12. Schema Evolution (Module 8 Spark SQL DDL)

### Additive Change: Create Table t5

```sql
-- Part 2: Create new table t5 (Additive Schema Change)
CREATE OR REPLACE TABLE Lakehouse_Silver.dbo.t5 AS
SELECT 
    t1.AGE,
    t1.SEX,
    t1.BMI,
    t1.countryOrRegion,
    t3.holidayName,
    CURRENT_TIMESTAMP() as created_timestamp
FROM Lakehouse_Silver.dbo.t1 t1
INNER JOIN Lakehouse_Silver.dbo.t3 t3 ON t1.countryOrRegion = t3.countryOrRegion;

-- Validate
SELECT COUNT(*) as t5_record_count FROM Lakehouse_Silver.dbo.t5;
SELECT * FROM Lakehouse_Silver.dbo.t5 LIMIT 5;
```

### Destructive Change: Drop Column

```sql
-- Part 3: Remove column from table t5 (Destructive Schema Change)
ALTER TABLE Lakehouse_Silver.dbo.t5 
DROP COLUMN created_timestamp;

-- Validate
DESCRIBE Lakehouse_Silver.dbo.t5;
SELECT * FROM Lakehouse_Silver.dbo.t5 LIMIT 5;
```

### Optional: Auto-Execute Notebooks After Deployment

```python
# Add to deploy-to-fabric.py after publish_all_items()
if branch in ['test', 'production']:
    # Execute Transformations notebook after deployment
    workspace.run_notebook("Transformations.Notebook")
```

### Git Workflow for Schema Changes

1. Edit `Transformations.Notebook` in Dev workspace
2. Run notebook manually in Dev to test
3. Commit to `main` branch
4. PR: `main` → `test` → triggers pipeline → deploy to Test
5. Manually run notebook in Test (or auto-execute)
6. PR: `test` → `production` → triggers pipeline → deploy to Prod
7. Manually run notebook in Prod

---

## 13. Terraform Mentions

From the README's **Future Roadmap** section:

> We're expanding this workshop to cover:
> - GitHub Actions integration
> - **Terraform infrastructure as code**
> - Advanced view patterns in Git
> - Multi-tenant deployment strategies

**No Terraform code exists in the current repo.** Terraform is mentioned only as a future planned addition. The current infrastructure is entirely created via `fabric-cli` bash scripts and `fabric-cicd` Python library.

---

## 14. Environment Variables & Configuration Values

### Bootstrap Script Variables

| Variable | Source | Example |
|----------|--------|---------|
| `capacity_name` | CLI arg `--capacity-name` | `"MyFabricCapacity"` |
| `spn_auth_enabled` | CLI arg `--spn-auth-enabled` | `"true"` / `"false"` |
| `upn_objectid` | CLI arg `--upn-objectid` | UPN object ID GUID |
| `username` | CLI arg `--username` | `"user209"` |
| `workspace_name` | Hardcoded in script | `"DEWorkshop"` |
| `staging_dir` | Hardcoded in utils.sh | `"./tmp"` |
| `EXIT_ON_ERROR` | Hardcoded in utils.sh | `true` |

### SPN Environment Variables  

| Variable | Purpose |
|----------|---------|
| `FAB_CLIENT_ID` | Service Principal client/application ID |
| `FAB_CLIENT_SECRET` | Service Principal client secret |
| `FAB_TENANT_ID` | Azure AD tenant ID |

### Azure DevOps Pipeline Variables

| Variable | Source | Value |
|----------|--------|-------|
| `$(Build.SourceBranch)` | Built-in | `refs/heads/test` or `refs/heads/production` |
| `$(System.DefaultWorkingDirectory)` | Built-in | Checkout directory |
| `SYSTEM_DEBUG` | Pipeline variable | `"true"` enables debug logging |

### Runtime-Resolved IDs (Per Workspace)

| Property | fabric-cli Command |
|----------|-------------------|
| Workspace ID | `fab get /<workspace> -q id` |
| Lakehouse Bronze ID | `fab get /<workspace>/Lakehouse_Bronze.Lakehouse -q id` |
| Lakehouse Silver ID | `fab get /<workspace>/Lakehouse_Silver.Lakehouse -q id` |
| Silver SQL Endpoint ID | `fab get /<workspace>/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.id` |
| Silver SQL Endpoint Connection String | `fab get /<workspace>/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.connectionString` |
| Semantic Model ID | `fab get /<workspace>/MySemanticModel.SemanticModel -q id` |
| Copy Job ID | `fab get /<workspace>/MyLHCopyJob.CopyJob -q id` |

---

## Summary: What's Needed to Recreate as Terraform + CLI

### Resources to Provision

1. **3 Fabric Workspaces** with capacity assignment
2. **2 Lakehouses per workspace** (Bronze, Silver) with `enableschemas=true`
3. **1 Environment** (`MyEnv.Environment`) — imported from template
4. **3 Notebooks** — imported from template, lakehouse bindings set
5. **2 Copy Jobs** — imported from template, GUIDs replaced for target workspace
6. **1 Semantic Model** — imported from template, connection strings replaced
7. **1 Report** — imported from template, semantic model ID replaced
8. **2 Shortcuts** (t2, t3) in Silver lakehouse → Bronze lakehouse
9. **1 Variable Library** (`MyVarLib`) with per-stage value sets
10. **1 Deployment Pipeline** (3-stage, or replaced by Azure DevOps)
11. **Azure DevOps**: Project, repo, 3 branches, service connection, YAML pipeline
12. **SPN**: App registration, secret, Reader role, Admin in all 3 workspaces

### Key Files to Include in Terraform Module

| File | Purpose |
|------|---------|
| `workshop_template/*` | All item definitions (notebooks, copy jobs, models, reports) |
| `scripts/fab_functions.sh` | fabric-cli wrapper functions |
| `scripts/replace_metadata.sh` | Metadata replacement utilities |
| `scripts/utils.sh` | Args parsing, staging management |
| `first_deployment.sh` | Bootstrap orchestration |
| `AzDO/Deploy-To-Fabric.yml` | Azure DevOps pipeline definition |
| `AzDO/deploy-to-fabric.py` | fabric-cicd deployment script |
| `AzDO/parameter.yml` | fabric-cicd item remapping rules |
