# Demo Research & Ideas Summary
**Event:** Partner Voice Webcast - AI-Powered Automation in Fabric with MCP  
**Date:** December 2, 2025  
**Research Completed:** December 1, 2025

---

## 🎯 Executive Summary

This document compiles research on compelling Fabric CLI + AI agent demo scenarios for the Partner Voice webcast. The research sources include:

- [Tabular Editor Blog: Agentic Orchestration of Fabric](https://tabulareditor.com/blog/agentic-orchestration-of-fabric-by-using-the-fabric-cli)
- [data-goblin/fabric-cli-plugin](https://github.com/data-goblin/fabric-cli-plugin)
- Microsoft Fabric CLI official documentation
- Power BI Modeling MCP Server

---

## 📚 Source 1: Tabular Editor - Agentic Orchestration

### Key Insights from Article

**Author:** Kurt Buhler, Head of Knowledge & Innovation at Tabular Editor

**Main Takeaways:**
1. Using AI agents with Fabric CLI is "surprisingly effective" for supervised tasks
2. Agents require context (documentation/instructions) since CLI isn't in LLM training data
3. Agents excel at exploration, bulk operations, and repetitive tasks
4. Multiple agents can work in parallel for dramatic productivity gains

### Demo Scenario 1: Fabric Trial Migration

**The Problem:**
> "SpaceParts tenant has many workspaces on Fabric Trial capacity. These trials are being extended regularly, but there's a governance risk if Microsoft stops renewing."

**What the Demo Shows:**
1. Agent surveys all workspaces to identify which are on Trial capacity
2. Agent catalogs each workspace: owner, contents, item counts
3. Agent generates a summary markdown document for review
4. Human decides: migrate to PPU, migrate to F2, or archive/delete

**Key Commands Used:**
```bash
fab ls                              # List all workspaces
fab get <workspace>                 # Get capacity info
fab ls <workspace> -l               # List workspace contents
fab acl ls <workspace>              # Get workspace permissions/owners
```

**Why It's Compelling for Partners:**
- Real governance scenario partners face regularly
- Shows AI handling tedious inventory work
- Human remains in control for decisions
- Scalable: works whether you have 10 or 1000 workspaces

**Estimated Demo Time:** 8-10 minutes

---

### Demo Scenario 2: Parallel Agent Workspace Migration

**The Problem:**
> "Need to migrate 35 workspaces from Trial. Doing it manually in the UI would be painful."

**What the Demo Shows:**
1. Divide workspaces into 4 lists
2. Spin up 4 Claude Code terminals simultaneously
3. Each agent works through its list, asking for migration decisions
4. User supervises all 4 agents, making decisions as prompted
5. Agents handle the actual migration commands

**Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Decision Maker)                    │
└────────────┬────────────┬────────────┬────────────┬────────┘
             │            │            │            │
             ▼            ▼            ▼            ▼
        ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
        │Agent 1 │   │Agent 2 │   │Agent 3 │   │Agent 4 │
        │List A  │   │List B  │   │List C  │   │List D  │
        └────┬───┘   └────┬───┘   └────┬───┘   └────┬───┘
             │            │            │            │
             └────────────┴────────────┴────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Fabric APIs   │
                    └─────────────────┘
```

**Why It's Compelling:**
- Shows parallelization = massive time savings
- 15-minute migration instead of hours
- Agents handle complexity, humans make decisions
- Works for any bulk operation

**Estimated Demo Time:** 5-7 minutes (explain concept + short demo)

---

### Key Lesson: Context is Critical

The article emphasizes that AI agents need curated context to use the Fabric CLI effectively:

**Good Context Includes:**
- Command syntax and flags
- File path conventions (`.Workspace`, `.Report`, etc.)
- Example commands for common scenarios
- Guardrails for destructive operations

**Example Context File Structure:**
```markdown
# Fabric CLI Context for AI Agents

## Command Patterns
- List workspaces: `fab ls`
- List items in workspace: `fab ls "WorkspaceName.Workspace" -l`
- Get item details: `fab get "Workspace/Item.Type"`

## Destructive Commands (ALWAYS ASK)
- `fab rm` - removes items
- `fab set` - modifies properties

## File Naming Convention
- Workspaces: `Name.Workspace`
- Reports: `Name.Report`
- Lakehouses: `Name.Lakehouse`
```

---

## 📚 Source 2: data-goblin/fabric-cli-plugin

### Overview

**Repository:** https://github.com/data-goblin/fabric-cli-plugin  
**Author:** Kurt Buhler (Data Goblin) / Tabular Editor  
**License:** MIT  
**Version:** 0.2.0

### What's Included

| Component | Description |
|-----------|-------------|
| **Claude Code Plugin** | Marketplace plugin for Claude Code |
| **Claude Desktop Skill** | Fabric CLI context and patterns |
| **MCP Servers** | 17 tools for Fabric operations |
| **Power BI Modeling MCP** | Semantic model operations (Windows) |
| **Documentation** | Commands, patterns, examples |

### MCP Server Tools (17 Total)

```
WORKSPACE OPERATIONS     ITEM OPERATIONS        JOB OPERATIONS
─────────────────────   ─────────────────────   ─────────────────
• list_workspaces       • list_items            • run_job
• create_workspace      • create_item           • get_job_status
• get_workspace         • get_item              • cancel_job
• update_workspace      • update_item           
• delete_workspace      • delete_item           

DATA OPERATIONS         SECURITY OPERATIONS    ONELAKE OPERATIONS
─────────────────────   ─────────────────────   ─────────────────
• run_sql_query         • list_permissions      • upload_file
• execute_notebook      • set_permissions       • download_file
                        • remove_permissions    • list_files
```

### Installation Methods

**Claude Code:**
```bash
/plugin marketplace add data-goblin/fabric-cli-plugin
/plugin install fabric-cli-plugin@data-goblin
```

**Claude Desktop:**
1. Download `.mcpb` file
2. Settings > Extensions > Drag and drop
3. Review and Install

### Demo Scenario 3: Natural Language Fabric Queries

**What to Show:**
```
User: "List all semantic models in my Sales workspace 
       and check their refresh status"

Claude: [Uses fabric-cli-plugin tools]
        - Calls list_items(workspace="Sales", type="SemanticModel")
        - Calls get_item for each model
        - Formats and summarizes results
```

**Why It's Compelling:**
- Zero CLI syntax knowledge required
- AI handles tool orchestration
- Natural conversation interface
- Extensible via MCP standard

---

## 📚 Source 3: Power BI Modeling MCP Server

### Overview

**Repository:** https://github.com/microsoft/powerbi-modeling-mcp  
**Source:** Microsoft Official  
**Status:** Windows only (currently)

### Available Operations

| Category | Tools |
|----------|-------|
| **Model Operations** | Get schema, metadata, properties |
| **Measure Operations** | Create, update, delete measures |
| **Table Operations** | Get columns, relationships |
| **DAX Execution** | Run queries, benchmarks |
| **Culture/Translation** | Multi-language support |
| **Calculation Groups** | Create and manage |
| **Security Roles** | RLS configuration |

### Demo Scenario 4: Bulk Measure Creation

**The Problem:**
> "Create YTD, MTD, and QTD variants for all revenue measures"

**What the Demo Shows:**
```
User: "Create YTD, MTD, and QTD variants for all 
       revenue measures in the Sales table"

AI Agent:
1. Uses model_operations to get Sales table measures
2. Identifies revenue measures (5 found)
3. Uses batch_measure_operations to create 15 new measures
4. Reports success
```

**Generated DAX (example):**
```dax
Revenue YTD := TOTALYTD([Revenue], 'Calendar'[Date])
Revenue MTD := TOTALMTD([Revenue], 'Calendar'[Date])
Revenue QTD := TOTALQTD([Revenue], 'Calendar'[Date])
```

**Why It's Compelling:**
- Turns hours of DAX authoring into seconds
- AI handles boilerplate, developer focuses on logic
- Perfect for model standardization

---

### Demo Scenario 5: Automated Model Documentation

**The Problem:**
> "Generate comprehensive documentation for a semantic model"

**What the Demo Shows:**
```
User: "Generate a complete documentation package for 
       the SalesModel including relationship diagrams,
       measure documentation, and data source info"
```

**AI Output:**
```markdown
# SalesModel Documentation
Generated: 2025-12-02

## Relationship Diagram
    ```mermaid
    graph LR
        Sales --> Product
        Sales --> Customer
        Sales --> Date
        Customer --> Geography
    ```

## Measures
### Revenue
- **DAX:** `SUM(Sales[Amount])`
- **Format:** Currency
- **Description:** Total sales revenue

### Profit Margin
- **DAX:** `DIVIDE([Profit], [Revenue])`
- **Format:** Percentage
- **Description:** Profit as percentage of revenue
```

**Why It's Compelling:**
- Documentation is a constant partner pain point
- Auto-generated = always up-to-date
- Meets governance requirements

---

### Demo Scenario 6: Model Translation for Global Deployments

**The Problem:**
> "Global enterprise needs Power BI models in 5 languages"

**What the Demo Shows:**
```
User: "Generate French, German, and Spanish translations 
       for all tables, columns, and measures in this model"
```

**AI Actions:**
1. Uses `culture_operations` to enumerate items
2. Uses `batch_object_translation_operations` 
3. Generates translations for each language
4. Reports completion

**Why It's Compelling:**
- Massive time savings for global deployments
- AI handles localization complexity
- Essential for multinational enterprises

---

## 📚 Additional Compelling Demo Ideas

### Demo Scenario 7: CI/CD Pipeline Integration

**Source:** Fabric CLI Documentation + fabric-cicd library

**What to Show:**
```yaml
# GitHub Actions workflow
name: Deploy Fabric Items
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Install Fabric CLI
        run: pip install fabric-cli
        
      - name: Authenticate
        run: fab auth login --service-principal
        
      - name: Deploy to Production
        run: |
          fab cp "Dev.Workspace/Report.Report" "Prod.Workspace" -f
          fab cp "Dev.Workspace/Pipeline.DataPipeline" "Prod.Workspace" -f
```

**Why It's Compelling:**
- Partners love GitOps
- Shows enterprise-grade deployment patterns
- Scriptable = auditable = compliant

---

### Demo Scenario 8: Lakehouse Table Optimization

**Source:** Fabric CLI job examples

**What to Show:**
```bash
# V-Order and Z-Order optimization + Vacuum
fab job run ws1.Workspace/lh1.Lakehouse \
  -i '{"tableName": "orders", 
       "optimizeSettings": {
         "vOrder": true, 
         "zOrderBy": ["account_id"]
       }, 
       "vacuumSettings": {
         "retentionPeriod": "7.01:00:00"
       }}'
```

**Why It's Compelling:**
- Performance is always a partner concern
- Automation = consistent optimization
- Shows Lakehouse management maturity

---

### Demo Scenario 9: Bulk ACL/Permission Management

**Source:** Fabric CLI acl examples

**What to Show:**
```bash
# Script to standardize workspace permissions
#!/bin/bash
WORKSPACES=$(fab ls | grep ".Workspace")

for ws in $WORKSPACES; do
  # Ensure admins group has Admin role
  fab acl set "$ws" data-admins@company.com --role Admin --principal-type Group
  
  # Add default read access for viewers
  fab acl set "$ws" data-viewers@company.com --role Viewer --principal-type Group
  
  # Audit current permissions
  fab acl ls "$ws" >> permissions-audit.log
done
```

**Why It's Compelling:**
- Security/governance is #1 partner concern
- Shows "governance as code" pattern
- Auditable and repeatable

---

## 🌟 Recommended Demo Combinations for Session

### Option A: "The Basics to Advanced Journey" (Current Plan)
✅ **Demo 1:** CLI Basics (8 min)  
✅ **Demo 2:** fabric-cli-plugin Community Innovation (7 min)  
✅ **Demo 3:** AI Agent + CLI Rename Scenario (10 min)  
✅ **Demo 4:** Security Officer Web App (8 min)

**Pros:** Covers full spectrum, good for mixed audience  
**Cons:** Less depth on any single topic

---

### Option B: "Enterprise Governance Focus"
**Demo 1:** CLI Basics (5 min)  
**Demo 2:** Bulk ACL Management (7 min)  
**Demo 3:** AI-Driven Workspace Audit (10 min)  
**Demo 4:** Security Officer Web App (8 min)  
**Demo 5:** Compliance Report Generation (5 min)

**Pros:** Strong governance narrative, resonates with security-conscious partners  
**Cons:** Narrower focus, may not appeal to all

---

### Option C: "Developer Productivity Focus"
**Demo 1:** CLI Basics (5 min)  
**Demo 2:** Bulk Measure Creation with AI (8 min)  
**Demo 3:** Model Documentation Generation (7 min)  
**Demo 4:** CI/CD Pipeline with CLI (10 min)

**Pros:** Very hands-on, developer-centric  
**Cons:** Less about governance, more technical

---

### Option D: "Parallel Agents Power" (Bold/Advanced)
**Demo 1:** CLI Basics (5 min)  
**Demo 2:** Single Agent Workspace Audit (8 min)  
**Demo 3:** Parallel 4-Agent Migration (10 min) ← Show splitting work across agents  
**Demo 4:** Generated Script Execution (7 min)

**Pros:** Shows unique AI capability (parallelization)  
**Cons:** Complex to set up live, needs careful preparation

---

## 💡 Key Messages Across All Demos

### Message 1: "CLI is the Foundation"
> "Every demo you saw today uses the Fabric CLI as its foundation. Learn CLI once, unlock endless automation possibilities."

### Message 2: "MCP is the Bridge"
> "Model Context Protocol connects AI to Fabric in a structured, secure way. It's an open standard, not a proprietary lock-in."

### Message 3: "Human-in-the-Loop"
> "AI proposes, human approves. These tools augment your work, they don't replace your judgment."

### Message 4: "Community Innovation"
> "The fabric-cli-plugin shows what happens when open source meets open standards. Partners like you can build the next innovation."

### Message 5: "Enterprise Ready"
> "Authentication, governance, audit logs - everything you need for production workloads is built in or coming."

---

## 📚 Additional Resources

| Resource | URL |
|----------|-----|
| Fabric CLI Documentation | https://microsoft.github.io/fabric-cli/ |
| fabric-cli-plugin | https://github.com/data-goblin/fabric-cli-plugin |
| Power BI Modeling MCP | https://github.com/microsoft/powerbi-modeling-mcp |
| Tabular Editor Blog | https://tabulareditor.com/blog/ |
| MCP Specification | https://modelcontextprotocol.io |
| fabric-cicd Library | https://github.com/microsoft/fabric-cicd |

---

*Document Created: December 1, 2025*
*For: Partner Voice Webcast Preparation*
