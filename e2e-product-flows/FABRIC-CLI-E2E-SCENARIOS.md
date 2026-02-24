# Fabric CLI — E2E Scenarios

> **Product:** Fabric CLI (`fab`)  
> **PM:** Hasan  
> **Last Updated:** Jan 2026  
> **Docs:** [microsoft.github.io/fabric-cli](https://microsoft.github.io/fabric-cli/) · **Repo:** [github.com/microsoft/fabric-cli](https://github.com/microsoft/fabric-cli)

---

## Scenario 1: Using CLI Locally (Developer Workstation)

| | |
|---|---|
| **Persona** | **Ren** (Data Engineer) / **Jian** (Developer) |
| **JTBD** | *"Prepare for and deploy into production"* — Ren · *"Perform database operations"* — Jian |

### E2E Flow
1. Developer installs CLI: `pip install ms-fabric-cli`
2. Authenticates: `fab auth login` (interactive browser login)
3. Explores workspaces: `fab ls`, `fab cd "MyWorkspace.Workspace"`
4. Creates items: `fab mkdir MyNotebook.Notebook`, `fab mkdir MyLakehouse.Lakehouse`
5. Exports/imports item definitions: `fab export`, `fab import`
6. Uploads data to OneLake: `fab cp ./local.csv "LH.Lakehouse/Files/"`
7. Runs jobs: `fab job run "ETL.Notebook"`
8. Commits item definitions to source control (Git)

### Happy Path Outcome
✅ Local development with full Fabric control — create, explore, deploy, and sync to Git.

---

## Scenario 2: Using CLI from a CI/CD Pipeline

| | |
|---|---|
| **Persona** | **Ren** (Data Engineer) |
| **JTBD** | *"Prepare for and deploy into production"* · *"Validate and test data"* |

### E2E Flow
1. GitHub Action / Azure DevOps pipeline triggers on push/PR
2. Pipeline installs CLI: `pip install ms-fabric-cli`
3. Authenticates via Service Principal: `fab auth login -u <client_id> -p <client_secret> --tenant <tenant_id>`
4. Checks item existence: `fab exists "Prod.Workspace/Model.SemanticModel"`
5. Imports updated definitions: `fab import "Prod.Workspace/Report.Report" -i ./definitions/`
6. Runs jobs to validate: `fab job run "Validation.Notebook"`
7. Reports status via exit codes back to PR/pipeline

### Happy Path Outcome
✅ Fully automated CI/CD — Service Principal auth, no manual steps, reliable deployments.

---

## Scenario 3: Using CLI from a Fabric Notebook

| | |
|---|---|
| **Persona** | **Desi** (Data Scientist) |
| **JTBD** | *"Deploy and operationalize ML model"* · *"Setting up automation of time-consuming tasks around resource management"* |

### E2E Flow
1. User opens a Fabric Notebook
2. Installs CLI in notebook: `!pip install ms-fabric-cli`
3. Authenticates (using managed identity or token)
4. Creates resources inline: `!fab mkdir "NewLakehouse.Lakehouse"`
5. Uploads files: `!fab cp ./model.pkl "LH.Lakehouse/Files/models/"`
6. Triggers jobs: `!fab job run "TrainingPipeline.DataPipeline"`
7. Queries results: `!fab table schema "LH.Lakehouse/Tables/predictions"`

### Happy Path Outcome
✅ In-notebook automation — Data Scientists manage Fabric resources without leaving the notebook.

---

## Summary Table

| Scenario | Persona | Core JTBD |
|----------|---------|-----------|
| Local CLI | Ren, Jian | Deploy to production, Perform operations |
| CI/CD Pipeline | Ren | Validate, Deploy to production |
| Notebook | Desi | Operationalize ML, Automate tasks |

---

## Appendix

### A1. Authentication Options
| Method | Command | Best For |
|--------|---------|----------|
| **Interactive (browser)** | `fab auth login` | Local dev |
| **Service Principal (secret)** | `fab auth login -u <client_id> -p <secret> --tenant <tenant_id>` | CI/CD pipelines |
| **Service Principal (cert)** | `fab auth login -u <client_id> --certificate <path.pem> --tenant <tenant_id>` | Secure automation |
| **Managed Identity** | `fab auth login --identity` | Fabric Notebooks, Azure VMs |
| **Federated Token** | `fab auth login -u <client_id> --federated-token <token> --tenant <tenant_id>` | GitHub Actions OIDC |

### A2. Key CLI Commands (Actual)
```bash
# Authentication
fab auth login                 # Interactive login
fab auth status                # Check auth status

# Navigation & Exploration
fab ls                         # List workspaces
fab ls "Sales.Workspace"       # List items in workspace
fab ls -l                      # Long format with details
fab cd "Sales.Workspace"       # Navigate to workspace
fab pwd                        # Print current location
fab exists "ws.Workspace/nb.Notebook"  # Check if exists

# Item Management
fab mkdir "MyNotebook.Notebook"           # Create item
fab cp "nb.Notebook" "Target.Workspace/"  # Copy item
fab rm "OldReport.Report"                 # Delete item
fab export "Report.Report" -o ./backup/   # Export definition
fab import "Report.Report" -i ./backup/   # Import definition

# OneLake Files
fab cp ./local.csv "LH.Lakehouse/Files/"  # Upload file
fab cp "LH.Lakehouse/Files/data.csv" ./   # Download file
fab ls "LH.Lakehouse/Files"               # List files

# Jobs
fab job run "ETL.Notebook"                # Run synchronously
fab job start "ETL.Notebook"              # Run asynchronously
fab job run-status "ETL.Notebook" --id <job-id>  # Check status

# Tables
fab table schema "LH.Lakehouse/Tables/sales"  # View schema
fab table load "Tables/data" --file "Files/data.csv"  # Load data

# API Access
fab api workspaces                        # Call Fabric REST API
fab api -A powerbi "groups"               # Call Power BI API
```

### A3. Persona Pain Points Addressed
| Persona | Pain Point | How CLI Helps |
|---------|------------|---------------|
| Ren | *"Creating and testing pipelines when we make a change"* | CLI enables `export`/`import` + CI/CD automation |
| Desi | *"Delayed adoption of novel tools and IDEs"* | CLI works anywhere — terminal, notebook, pipeline |
| Jian | *"Wishes for seamless handoff between teams"* | CLI + Git = standardized deployment workflow |

### A4. Supported Item Types (35 total)
Notebooks, Semantic Models, Reports, Lakehouses, Warehouses, Data Pipelines, Spark Jobs, KQL Databases, Eventhouses, ML Models, Environments, and more. See `fab ls -l` for full list.
