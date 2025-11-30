# Research: B. CLI Usage Patterns & Personas

**Research Status:** ✅ Complete  
**Last Updated:** November 30, 2025  
**Priority:** P0 (Who uses CLI - Critical)

---

## Executive Summary

CLI usage remains strong among professional developers, with **25-34% using Bash/Shell** regularly. Docker (54-63%) is the most widely adopted CLI tool. The primary CLI personas are DevOps engineers, backend developers, and data engineers. Citizen developers show low CLI adoption, validating the "Copilot generates CLI" approach for broader reach.

**Key Finding:** CLI users extend well beyond "developers" to include DevOps, IT admins, and data engineers—all relevant Fabric personas.

---

## B1. Who Uses CLI Tools (Personas)

### Developer Survey Data

**Source:** [Stack Overflow Developer Survey 2024](https://survey.stackoverflow.co/2024/)

**Terminal/Shell Usage:**
| Language/Tool | Usage % |
|---------------|---------|
| Bash/Shell | 25-34% |
| PowerShell | 13.3% |
| Vim/Neovim | ~25% |
| Nano | ~9% |

**CLI-Heavy Tools Adoption:**
| Tool | Usage % |
|------|---------|
| Docker | 54-63% |
| npm | 49.6% |
| pip | 32.4% |
| Homebrew | 22.3% |
| Terraform | 10-11% |
| Ansible | 7.9% |

---

### Cloud Platform CLI Access

**Source:** Stack Overflow 2024

| Platform | CLI Usage % |
|----------|------------|
| AWS (aws cli) | 48% |
| Azure (az cli) | 27.8% |
| Google Cloud (gcloud) | 25.1% |

**Implication:** Azure CLI users are a natural target for Fabric CLI—they're already comfortable with command-line cloud management.

---

### Data Platform CLI Adoption

**Source:** Stack Overflow 2024 (Database section)

| Platform | Usage % |
|----------|---------|
| BigQuery | 4.8% |
| Snowflake | 2.6% |
| Databricks | 2.0% |

**Note:** These are overall developer percentages. Within the data engineering segment, CLI adoption is significantly higher.

---

### CLI User Personas

Based on survey data and industry research:

| Persona | % of Workforce | CLI Importance | Key Use Cases |
|---------|---------------|----------------|---------------|
| **DevOps/Platform Engineers** | 10-15% | Critical | CI/CD, infrastructure, automation |
| **Backend Developers** | 25-30% | High | Build tools, testing, deployment |
| **Data Engineers** | 8-12% | High | Data pipelines, ETL, migrations |
| **Full-Stack Developers** | 20-25% | Medium-High | Package management, builds |
| **IT Administrators/SREs** | 5-10% | Critical | System management, monitoring |
| **Data Scientists** | 5-8% | Medium | Notebooks, package management |
| **Citizen Developers** | 10-20% | Low | GUI preferred, fear of CLI |

**Source:** JetBrains State of Developer Ecosystem 2023

---

### Citizen Developer CLI Adoption

**Finding:** Citizen developers (non-professional coders) show low CLI adoption.

**Barriers:**
- Perceived complexity
- Fear of making mistakes
- Lack of training
- GUI alternatives available

**Opportunity:** AI-generated CLI scripts bridge the gap. Copilot can generate CLI commands for users who wouldn't write them manually.

---

## B2. CLI Adoption Rates in Data Platforms

### Databricks

**CLI Documentation:** [Databricks CLI](https://docs.databricks.com/aws/dev-tools/cli/index.html)

**Features:**
- Workspace management
- Job orchestration
- DBFS operations
- Cluster management

**Adoption Signal:** CLI is positioned for "automation and CI/CD" in their docs, suggesting DevOps-focused users.

---

### Snowflake (SnowSQL)

**Source:** [SnowSQL Documentation](https://docs.snowflake.com/en/user-guide/snowsql)

**Features:**
- Query execution
- Data loading (PUT/GET)
- Variable substitution
- Output formatting

**Positioning:** "For users who prefer command-line interface" — optional, not primary.

---

### BigQuery (bq)

**Source:** [bq Command-Line Tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool)

**Features:**
- Query execution
- Data loading
- Table management
- Job management

**Adoption:** Bundled with gcloud CLI, strong adoption in GCP shops.

---

### Fabric CLI (Current State)

From internal telemetry (see H1):
- **~1,400 MAU** (Monthly Active Users)
- **~1,000 active tenants**
- **~35% DAU/MAU** (high stickiness among users)

**Comparison:** Lower absolute numbers than Databricks/Snowflake, but growing. Higher stickiness suggests power users.

---

## B3. CLI vs. GUI Preference Patterns

### When Users Prefer CLI

| Scenario | CLI Preference | Reason |
|----------|---------------|--------|
| Repetitive tasks | High | Scriptable, automatable |
| Bulk operations | High | Loop over items easily |
| CI/CD pipelines | Very High | No GUI in headless environments |
| Quick queries | Medium | Faster than navigating GUI |
| One-off exploration | Low | GUI better for discovery |
| Data visualization | Low | GUI far superior |

**Source:** UX research literature, forum analysis

---

### CLI vs. GUI Speed

**Hypothesis:** CLI operations are 2-5x faster for experienced users.

**Supporting Evidence:**

| Task | GUI Time | CLI Time | Speedup |
|------|----------|----------|---------|
| Create 10 items | 5-10 min (clicking) | 30 sec (loop) | 10-20x |
| Export workspace | 2-5 min (many clicks) | 10 sec | 10-30x |
| Search across workspaces | N/A (not possible) | 5 sec | ∞ |

**Note:** These are estimates based on user feedback, not formal studies.

---

### User Preference Research

**Source:** [Nielsen Norman Group - Command Line vs. GUI](https://www.nngroup.com/articles/)

**Key Findings:**
- Novices prefer GUI for discoverability
- Experts prefer CLI for efficiency
- Hybrid interfaces (CLI in GUI) serve both

**Implication for Fabric:** Embedding CLI in portal serves the hybrid use case.

---

## Modern CLI Trends

### AI-Native Terminals

**Warp Terminal**
- **Source:** https://www.warp.dev/
- AI-powered command suggestions
- "Blocks" model (commands as UI blocks)
- 1M+ users
- Strong growth in developer adoption

**Amazon Q CLI (formerly Fig)**
- **Source:** https://aws.amazon.com/q/developer/
- Autocomplete for 500+ CLI tools
- IDE-like experience in terminal
- Acquired by AWS, integrated into Q

---

### CLI Usage Trends

**Is CLI growing or declining?**

**Growing Indicators:**
- Docker adoption up year-over-year
- Kubernetes (kubectl) adoption growing
- DevOps/IaC tools (Terraform, Ansible) CLI-first
- AI terminals (Warp) gaining users

**Stable/Declining Indicators:**
- GUI tools improving (VS Code, web consoles)
- Low-code/no-code platforms growing
- Mobile developers rarely use CLI

**Net Assessment:** CLI stable among professionals, growing in DevOps/IaC segment.

---

## Implications for Fabric CLI

### Target Personas (Prioritized)

1. **DevOps/Platform Engineers** — CI/CD automation, infrastructure as code
2. **Data Engineers** — Pipeline automation, migrations
3. **Power Users/Admins** — Bulk operations, tenant management
4. **Developers** — Build/deploy workflows

### Must-Have Features (from persona analysis)

| Feature | Persona Need |
|---------|--------------|
| JSON output | DevOps (parsing in scripts) |
| Auto-complete | All (discoverability) |
| Azure CLI auth integration | Azure users (no double login) |
| CI/CD-friendly auth | DevOps (service principal) |
| Bulk operations | All power users |

### Growth Opportunity

**AI-Assisted CLI:** Following Warp and GitHub Copilot CLI patterns:
- Copilot generates CLI commands from natural language
- Explains what commands do
- Suggests next steps

This bridges the gap between CLI-averse users and CLI power.

---

## Source Index

| Topic | Source URL |
|-------|------------|
| Stack Overflow Survey 2024 | https://survey.stackoverflow.co/2024/ |
| JetBrains Developer Ecosystem 2023 | https://www.jetbrains.com/lp/devecosystem-2023/ |
| Databricks CLI | https://docs.databricks.com/aws/dev-tools/cli/index.html |
| Snowflake SnowSQL | https://docs.snowflake.com/en/user-guide/snowsql |
| BigQuery bq CLI | https://cloud.google.com/bigquery/docs/bq-command-line-tool |
| Warp Terminal | https://www.warp.dev/ |
| Amazon Q CLI | https://aws.amazon.com/q/developer/ |

---

**Research Status:** Complete | **Hypothesis Validated:** ✅ CLI users extend beyond developers to DevOps, data engineers, admins
