# DevX Coreote - demo script

## High-level view of the demos

|   | Demo | Persona | Core messaging | What will be included |
|---|------|---------|----------------|-----------------------|
| 1 | **Setting up the project** | Platform engineer | "Setup everything you need with IaC" | - Frame the project and its content<br>- TerraForm modules + tools to run it. |
| 2 | **Developer workflow** | Data engineering team | "Time-to-code" in Fabric just got much faster | - Single developer working on his task<br>- From branch out to merge back to Dev Workspace |
| 3 | **Deploying to Production** | DevOps engineer / data engineer on the team | "Fully automated CI/CD, no human required" | - Deploying to Test and Prod environments<br>- Everything fully automated with ADO, SPN and CLI/cicd lib |
| 4 | **Monitor production** | DevOps engineer / Team leader | Ensure Quality and stability of Production systems | ??? |

---

## Demo scripts

### Demo 1 - Setting up the Project

|   | Area | Script | What to explain | Open issues / AIs |
|---|------|--------|-----------------|-------------------|
| 1 |  | **Start state** - Show diagram laying out the whole project and the flow of work across the session. | Overview of the end-to-end story: Setup → Develop → Deploy → Monitor |  |
| 2 | Setting up the Project - @Alon Baram, @Evelina Alroy-Brin, @Hasan Abo Shally, @Yaron Pri Gal | 1. Platform engineer clicks **Run** on an Azure DevOps pipeline that provisions the project (TF: workspaces, items, capacities, permissions, connections, identities)<br>2. Show the **ADO pipeline log** — everything created automatically (Dev/Test/Prod WSs, Lakehouse, Notebooks, Pipeline, shortcuts, workspace identity) | - Everything is IaC — repeatable, auditable, version-controlled<br>- TF provisions: multi-WS project, capacities (Azure TF provider), WS permissions, connections + identities<br>- Workspace identity created & granted access to Azure Storage via TF<br>- Item identity set so items don't break when owner leaves org |  |
| 3 |  | **End state** - ADO pipeline completed. Dev/Test/Prod workspaces exist with all items, connections, and identities configured. |  |  |

#### Comments

**Alon Baram – 2026-02-10T10:09:42Z**

> @Nimrod Shalit I'm not sure IT admin/manager is the persona that operates Terraform for provisioning (nor it's the one that plans the provisioning with Terraform.  
> following Kim's question I've looked at our competitors' analysis as both Databricks and SF have an established TF provider for years now. Their analysis is per org size naturally. I've put the summary below the script table.  
> @Evelina Alroy-Brin, @Yaron Pri Gal and @Dariusz Porowski are invited for input as well, based on their experience with customers (various sizes) using Terraform

---

**Alon Baram – 2026-02-10T10:09:42Z**

- Need to decide what do we show here (medallion arch, 3 WSs?)
- Do we want to include CLI/MCP stuff in here?
- @Cillian Mitchell - how much should we go deep with code / technical implementation?
- @Cillian Mitchell - are demos expected to be recorded, or live on stage?
- @Meenal Srivastva / @Yulia Turchin to comment how does the identity / Connections / permissions fit in this step (Soft delete too?)
- Identity as auth method to get Data (owner: Yulia)
- create the workspace identity  
  [Workspaces - Provision Identity - REST API (Core)](https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/provision-identity?tabs=HTTP)
- grant the workspace identity with permissions to Azure storage through terraform  
  [azurerm_role_assignment – Terraform Registry](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/role_assignment)
- create lakehouse shortcut through APIs and use workspace identity as the authentication method to securely bring data in OneLake  
  [OneLake Shortcuts - Create Shortcut - REST API (Core)](https://learn.microsoft.com/en-us/rest/api/fabric/core/onelake-shortcuts/create-shortcut?tabs=HTTP#create-shortcut-adlsgen2-target-example)  
  [Connections - Create Connection - REST API (Core)](https://learn.microsoft.com/en-us/rest/api/fabric/core/connections/create-connection?tabs=HTTP)
- Item identity to ensure items don't fail when owner leaves the organization
- Set SPN or workspace identity as the items identity through APIs (coming in March and July)

---

**Alon Baram – 2026-02-10T10:09:42Z**

> **End state** -

---

### Demo 2 - Developer workflow

|   | Area | Script | What to explain | Open issues / AIs |
|---|------|--------|-----------------|-------------------|
| 1 |  | **Start state** - Developer opens the Fabric portal, lands on the Dev WS (connected to `main`). WS contains: Lakehouse, Silver-ingestion NB, Gold-aggregation NB, Data Pipeline (all from Demo 1). |  |  |
| 2 | Developer workflow - @Nimrod Shalit and @Yaron Pri Gal | 3. Go to the portal → open Dev WS<br>4. **Selective branch out** from Dev WS → name: `feature/silver-dq-check` → pick only Silver_Ingestion NB + Sales_Lakehouse<br>5. In the feature workspace — make a change (e.g. add a DQ cell, add a Connection Ref variable, show code-review capabilities like granular compare)<br>6. **Commit** to the feature branch<br>7. Go to **Azure DevOps** → create a **PR** → merge to `main`<br>8. Return to Dev WS → **review incoming changes** → **Update from Git** | - Selective branching: only branch the items you need → faster time-to-code _(NEW)_<br>- WS relations: breadcrumbs & fly-out show branch → parent link _(NEW)_<br>- Connection Ref variables: same NB resolves per env _(NEW)_<br>- Granular compare: cell-level diff before committing<br>- Update from Git: team lead reviews before accepting |  |
| 3 |  | **End state** - Dev WS is updated with the merged changes. Ready for deployment. |  |  |

---

### Demo 3 - Deploying to Production

|   | Area | Script | What to explain | Open issues / AIs |
|---|------|--------|-----------------|-------------------|
| 1 |  | **Start state** - Dev WS has the latest merged changes from Demo 2. Test and Prod WSs exist (from Demo 1) but don't have the new code yet. |  |  |
| 2 | Deploying to Production - @Nimrod Shalit, @Yaron Pri Gal, @Hasan Abo Shally, @Evelina Alroy-Brin | 9. Go to **Azure DevOps** → create a branch from `main` to `test_ws_1.0`<br>10. This triggers an **Azure Pipeline** that uses **fabric-cicd** (standalone or via CLI) to deploy first to **Test**, then to **Prod** — fully automated, no manual steps | - Entire deployment is SPN-driven — no human in the loop<br>- fabric-cicd lib / CLI handles item deployment across environments<br>- Connections & identities resolve per environment automatically<br>- Pipeline can be an existing one extended with the new ADO extension for the CLI | - @Meenal Srivastva / @Yulia Turchin to comment how identity / connections / permissions fit in this step<br>- Do we use an existing pipeline or start from scratch?<br>- Enforce everything uses a service principal |
| 3 |  | **End state** - Changes are live in Test and Prod. The full cycle from setup → develop → deploy is complete. |  |  |

---

### Demo 4 - Monitoring Production

|   | Area | Script | What to explain | Open issues / AIs |
|---|------|--------|-----------------|-------------------|
| 1 |  | **Start state** - |  |  |
| 2 | Monitoring Production WSs | Workspace monitoring:<br>- ItemJobEventsLog table. Use it to build customized dashboard and alert.<br>- Built-in real time dashboard |  | @LI LIU to help with this part |
| 3 |  | **End state** - |  |  |

---

## Personas operating Terraform for provisioning (by org size, mainly based on Databricks and SF knowledge)

|   | Organization Size | Primary Persona | Job Titles | Deployment Pattern | Team Structure |
|---|-------------------|-----------------|------------|--------------------|----------------|
| 1 | **Startup (<50)** | Generalist Engineer | DevOps Engineer, Full-Stack Engineer, Cloud Engineer | Monolithic (single workspace) | 1-2 people handling all infrastructure |
| 2 | **Mid-Size (50-500)** | Platform Engineer | Platform Engineer, Cloud Infrastructure Engineer, DataOps Engineer | Multiple workspaces, shared capacity | Dedicated platform team (2-5 people) + data teams |
| 3 | **Large Enterprise (500+)** | Specialized Platform Ops | Platform Operations Engineer, Data Platform Engineer, Cloud Solution Architect | Multiple workspaces, separate capacities or tenants | Platform Ops team (5-15 people), multiple data engineering teams |
| 4 | **Multinational (1000+)** | Regional Platform Teams | Senior Platform Engineer, Principal Cloud Architect, Infrastructure Platform Engineer | Multiple tenants, multi-region | Regional platform teams, centralized governance |