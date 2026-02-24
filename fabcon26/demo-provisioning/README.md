# Fabric E2E Demo — Provisioning Scripts

> **Terraform + fabric-cli** infrastructure-as-code for provisioning a complete Microsoft Fabric Data Engineering workspace.

Based on the [DaniBunny/Fabric-DE-CICD](https://github.com/DaniBunny/Fabric-DE-CICD) FabCon EU 2025 workshop, restructured as a Terraform + CLI project with full ADO pipeline integration.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Development Workspace                     │
│                  DEWorkshop_<username>                        │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │  Lakehouse   │    │  Lakehouse   │    │     MyEnv    │   │
│  │   Bronze     │───▶│   Silver     │    │  Environment │   │
│  │  (raw data)  │    │  (curated)   │    └──────────────┘   │
│  └──────┬───────┘    └──────┬───────┘                        │
│         │                   │                                │
│  ┌──────┴───────┐    ┌──────┴───────┐                        │
│  │ Copy Jobs    │    │  Shortcuts   │                        │
│  │  CJ1, CJ2   │    │  t2, t3      │                        │
│  └──────────────┘    └──────────────┘                        │
│                                                              │
│  ┌──────────────────────────────────────────────────┐        │
│  │              Notebooks                            │        │
│  │  Bronze_Data_Preparation → Transformations        │        │
│  │                           → Validations           │        │
│  └──────────────────────────────────────────────────┘        │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐                        │
│  │  Semantic    │───▶│   Report     │                        │
│  │   Model      │    │  MyReport    │                        │
│  └──────────────┘    └──────────────┘                        │
└──────────────────────────────────────────────────────────────┘
         │
         │  Git Sync (main branch)
         ▼
┌──────────────────┐     PR: main→test        ┌──────────────┐
│  Azure DevOps    │ ───────────────────────▶  │  Test WS     │
│  Repository      │ ───────────────────────▶  │  Prod WS     │
│  (DE_Workshop/)  │     PR: test→production   └──────────────┘
└──────────────────┘
```

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Terraform](https://developer.hashicorp.com/terraform/install) | >= 1.8.0 | Infrastructure provisioning |
| [fabric-cli](https://aka.ms/fabric-cli) (`fab`) | Latest | Fabric item management |
| [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) | >= 2.50 | Authentication |
| [jq](https://jqlang.github.io/jq/) | >= 1.6 | JSON manipulation |
| [Git](https://git-scm.com/) | >= 2.30 | Template extraction |
| [Python](https://python.org) | >= 3.12 | ADO deployment script |

## Quick Start

```bash
# 1. Clone & extract templates from the workshop repo
./scripts/setup.sh

# 2. Configure your variables
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
# Edit terraform.tfvars with your capacity name and username

# 3. Authenticate
az login
fab auth login

# 4. Create workspace + lakehouses with Terraform
cd terraform
terraform init
terraform plan
terraform apply
cd ..

# 5. Import all items and run data pipeline
./scripts/provision-items.sh

# 6. (Optional) Open in browser
fab open /DEWorkshop_yourusername
```

Or use the Makefile:

```bash
make setup      # Step 1
make infra      # Steps 3-4
make provision  # Step 5
make all        # Steps 1-5 in sequence
```

## Project Structure

```
fabric-e2e-demo/
├── README.md                            # This file
├── Makefile                             # Convenience targets
├── .gitignore                           # Ignore secrets, state, staging
│
├── terraform/                           # Infrastructure layer
│   ├── providers.tf                     # Fabric provider configuration
│   ├── variables.tf                     # Input variables (capacity, username)
│   ├── main.tf                          # Workspace + lakehouses + role assignments
│   ├── outputs.tf                       # Workspace/lakehouse IDs
│   └── terraform.tfvars.example         # Example variable values
│
├── scripts/                             # Item provisioning layer
│   ├── setup.sh                         # Clone repo & extract templates
│   ├── provision-items.sh               # Import items, set bindings, create shortcuts
│   ├── run-data-pipeline.sh             # Run copy jobs + notebooks
│   ├── create-variable-library.sh       # Create MyVarLib (optional, Module 5)
│   ├── teardown.sh                      # Destroy workspace + cleanup
│   └── lib/
│       ├── utils.sh                     # Shared: logging, errors, config loading
│       └── fab-helpers.sh               # fabric-cli wrapper functions
│
├── templates/                           # Item definitions (populated by setup.sh)
│   ├── Bronze_Data_Preparation.Notebook/
│   ├── Transformations.Notebook/
│   ├── Validations.Notebook/
│   ├── MyEnv.Environment/
│   ├── MyLHCopyJob.CopyJob/
│   ├── MyLHCopyJob2.CopyJob/
│   ├── MySemanticModel.SemanticModel/
│   └── MyReport.Report/
│
└── ado/                                 # Azure DevOps CI/CD
    ├── Deploy-To-Fabric.yml             # Pipeline definition
    ├── deploy-to-fabric.py              # fabric-cicd deployment script
    └── parameter.yml                    # Item remapping rules
```

## Two-Phase Provisioning

### Phase 1: Terraform (Infrastructure)

Terraform creates the foundation:
- **Workspace** with Fabric capacity assignment
- **2 Lakehouses** (Bronze + Silver) with schema support
- **Role assignments** (SPN admin, user admin — optional)

Resources managed declaratively — `terraform destroy` for clean teardown.

### Phase 2: fabric-cli (Items)

The CLI script handles everything Terraform can't (yet):
- Import 8 items from templates (with GUID replacement)
- Set notebook lakehouse bindings
- Create OneLake shortcuts
- Run Copy Jobs and Notebooks to populate data
- Import Semantic Model with SQL endpoint remapping
- Import Report pointing to Semantic Model

### Why Two Phases?

| Concern | Terraform | fabric-cli |
|---------|-----------|------------|
| Workspace lifecycle | ✅ Declarative, idempotent | ⚠️ Imperative |
| Lakehouse creation | ✅ Managed resource | ✅ Also possible |
| Item import with templates | ❌ Not supported | ✅ Full support |
| Notebook lakehouse bindings | ❌ Not supported | ✅ `fab set` |
| OneLake shortcuts | ❌ Not supported | ✅ `fab ln` |
| Job execution | ❌ Not infra concern | ✅ `fab job run` |
| State management | ✅ Terraform state | ❌ No state |

## Azure DevOps Pipeline

The `ado/` directory contains everything needed for CI/CD:

### Setup

1. Create an Azure DevOps project with a Git repository
2. Connect your Dev workspace to the `main` branch (Git folder: `/DE_Workshop`)
3. Create `test` and `production` branches
4. Create a Service Connection (`WorkshopConnection`) with SPN credentials
5. Import `ado/Deploy-To-Fabric.yml` as a pipeline
6. Copy `ado/deploy-to-fabric.py` and `ado/parameter.yml` to the repo root

### Flow

```
Dev workspace change
  → Commit to main
    → PR: main → test → Pipeline deploys to Test workspace
      → PR: test → production → Pipeline deploys to Prod workspace
```

### Post-Deployment (Manual)

After each CI/CD deployment:
1. Run Copy Jobs in the target workspace
2. Run `Bronze_Data_Preparation.Notebook`
3. Set Variable Library active value set
4. Update shortcuts in `Lakehouse_Silver`
5. Run `Transformations.Notebook` and `Validations.Notebook`
6. Refresh `MySemanticModel`

## Configuration Reference

### Terraform Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `capacity_name` | Yes | — | Fabric capacity display name |
| `username` | Yes | — | Username suffix for workspace |
| `workspace_prefix` | No | `DEWorkshop` | Workspace name prefix |
| `enable_lakehouse_schemas` | No | `true` | Enable dbo schema |
| `bronze_lakehouse_name` | No | `Lakehouse_Bronze` | Bronze LH name |
| `silver_lakehouse_name` | No | `Lakehouse_Silver` | Silver LH name |
| `spn_object_id` | No | `null` | SPN object ID for admin role |
| `upn_object_id` | No | `null` | User object ID for admin role |

### Environment Variables (SPN Auth)

```bash
export FAB_CLIENT_ID="<client-id>"
export FAB_CLIENT_SECRET="<client-secret>"
export FAB_TENANT_ID="<tenant-id>"
```

### fabric-cli Commands Used

| Command | Purpose |
|---------|---------|
| `fab auth login` | Authenticate (interactive or SPN) |
| `fab create` | Create workspace items |
| `fab import -f <dest> -i <src>` | Import item from template |
| `fab get <item> -q <property>` | Query item properties |
| `fab set -f <item> -q <prop> -i <json>` | Set item properties |
| `fab ln -f <shortcut> --type oneLake --target <source>` | Create shortcut |
| `fab job run <item>` | Execute a notebook |
| `fab api -X post <endpoint>` | Call Fabric REST API |
| `fab open <workspace>` | Open in browser |
| `fab rm -f <workspace>` | Delete workspace |

## Troubleshooting

### SQL Endpoint not ready

The Silver lakehouse's SQL endpoint is provisioned asynchronously. The script retries up to 12 times (60s total). If it still fails:

```bash
fab get /DEWorkshop_youruser/Lakehouse_Silver.Lakehouse -q properties.sqlEndpointProperties.id
```

### Copy Job fails

Copy Jobs require external data sources to be accessible. Verify:
```bash
fab get /DEWorkshop_youruser/MyLHCopyJob.CopyJob -q id
fab api -X get workspaces/<ws_id>/items/<copyjob_id>
```

### Templates missing

Run setup first: `./scripts/setup.sh`

---

## Credits

Based on the [Fabric-DE-CICD Workshop](https://github.com/DaniBunny/Fabric-DE-CICD) by DaniBunny (FabCon EU 2025).

Restructured as a Terraform + fabric-cli project for end-to-end Fabric Data Engineering provisioning.
