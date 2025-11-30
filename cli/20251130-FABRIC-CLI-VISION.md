# The Fabric CLI Vision: From Developer Tool to Platform Enabler

**Document Metadata:**

| Property | Value |
|----------|-------|
| **Version** | 1.0 |
| **Last Updated** | November 30, 2025 |
| **Document Type** | Vision & Strategy |
| **Document Owner** | Hasan Abo-Shally (Principal PM, Fabric Platform) |
| **Status** | Vision Phase - Validation Required |
| **Related Efforts** | Remote MCP, Unified Copilot, CLI User Research |

---

## Executive Summary

**The Core Thesis:** The Fabric CLI should evolve from a standalone developer tool into an **enabling component of the Fabric platform itself**—integrated into the portal, powering AI agents, and serving as infrastructure for automation.

**Why This Matters Now:** With the Unified Copilot coming to the Fabric Portal, the CLI's traditional role is at risk. Users will increasingly prefer natural language over memorizing commands. But rather than viewing this as a threat, we should see it as an opportunity: **CLI and Copilot are more powerful together than apart.**

**The Vision in One Sentence:** The CLI becomes the execution layer that AI agents generate code for, users interact with directly in the portal, and the platform leverages internally for automation and blueprints.

---

## Table of Contents

1. [The Challenge: CLI vs. Copilot](#1-the-challenge-cli-vs-copilot)
2. [The Vision: CLI as Platform Infrastructure](#2-the-vision-cli-as-platform-infrastructure)
3. [Key Components of the Vision](#3-key-components-of-the-vision)
4. [Why Code Execution > Direct Tool Calls](#4-why-code-execution--direct-tool-calls)
5. [Connecting the Efforts](#5-connecting-the-efforts)
6. [Hypotheses to Validate](#6-hypotheses-to-validate)
7. [Research Alignment](#7-research-alignment)
8. [Next Steps](#8-next-steps)

---

## 1. The Challenge: CLI vs. Copilot

### 1.1 The Existential Question

With the Unified Copilot coming to the Fabric Portal, a critical question emerges:

> **Why would users memorize CLI commands when they can write in plain English and have Copilot execute their intent?**

Copilot advantages:
- Natural language input (no syntax to remember)
- Tolerant to mistakes and typos
- Contextual understanding
- Lower learning curve

This seems to render the CLI obsolete for interactive use cases. But digging deeper reveals that CLI and Copilot serve fundamentally different needs.

### 1.2 Where CLI Still Wins

Despite Copilot's advantages, CLI maintains clear superiority in specific scenarios:

#### **Cost Efficiency**
- **Copilot:** Requires AI tokens/credits for every interaction
- **CLI:** Uses APIs directly—no AI costs
- **Example:** Running 1,000 workspace operations costs significant AI credits via Copilot, but nothing extra via CLI scripts

#### **Bulk Operations & Scale**
- **Copilot:** Better suited for single, contextual operations
- **CLI:** Excels at programmatic, repetitive tasks
- **Example:** "Rename 500 workspaces to follow a naming convention" is easier and more reliable via script

#### **Determinism & Predictability**
- **Copilot:** Non-deterministic (LLM responses vary)
- **CLI:** Deterministic (same command = same result)
- **Example:** CI/CD pipelines need reproducible commands, not AI-generated variations

#### **Auditability & Compliance**
- **CLI scripts:** Version-controlled, reviewable, auditable
- **Copilot interactions:** Ephemeral, harder to audit

### 1.3 The Key Insight: Programmatic vs. Agentic

| Dimension | Programmatic (CLI) | Agentic (Copilot) |
|-----------|-------------------|-------------------|
| **Cost** | Fixed (API calls only) | Variable (AI tokens) |
| **Determinism** | High | Low |
| **Scale** | Excellent | Limited |
| **Flexibility** | Requires planning | Adapts on-the-fly |
| **Learning Curve** | Higher initial | Lower |
| **Auditability** | Easy (scripts in source control) | Harder |

**The Synthesis:** Rather than choosing between them, we should **combine their strengths**: Copilot generates CLI scripts, CLI executes them.

---

## 2. The Vision: CLI as Platform Infrastructure

### 2.1 The Big Picture

The Fabric CLI should evolve to serve three interconnected roles:

```
┌─────────────────────────────────────────────────────────────────┐
│                    FABRIC CLI VISION                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐  │
│  │   Direct    │   │   Agent     │   │    Platform         │  │
│  │   User      │   │   Tool      │   │    Infrastructure   │  │
│  │   Interface │   │   (MCP)     │   │                     │  │
│  └──────┬──────┘   └──────┬──────┘   └──────────┬──────────┘  │
│         │                 │                      │              │
│         ▼                 ▼                      ▼              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    FABRIC CLI                             │  │
│  │  • API wrappers for all Fabric surfaces                   │  │
│  │  • OneLake, Power BI, ARM APIs unified                    │  │
│  │  • Community-enriched capabilities                        │  │
│  │  • Local runtime with file system access                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              REMOTE EXECUTION LAYER                       │  │
│  │  (Spark, Notebooks, CLI Script Item)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 The Three Roles Explained

#### **Role 1: Direct User Interface (CLI in the Web)**
Users can interact with CLI directly from the Fabric Portal:
- Bottom panel (like VS Code terminal)
- Pro developers feel at home
- Portal becomes an IDE-like experience

#### **Role 2: Agent Tool (MCP Integration)**
Copilot and AI agents generate and execute CLI scripts:
- CLI becomes a "tool" that agents invoke
- Human-readable output (compared to raw API calls)
- Reuses all CLI work instead of duplicating in MCP tools

#### **Role 3: Platform Infrastructure**
CLI powers internal Fabric capabilities:
- Blueprint execution (convert spec → CLI script → execute)
- Scheduled automation (CLI Script Item)
- Notebook integration (CLI in Spark images)

---

## 3. Key Components of the Vision

### 3.1 CLI in the Fabric Portal

**The Experience:**
```
┌─────────────────────────────────────────────────────────────┐
│  Fabric Portal                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────┐ ┌──────────────────┐  │
│  │                                 │ │   Fabric         │  │
│  │      Main Workspace             │ │   Copilot        │  │
│  │           Area                  │ │   (Right Pane)   │  │
│  │                                 │ │                  │  │
│  └─────────────────────────────────┘ └──────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  fabric> fab workspace list --top 10                 │  │
│  │  NAME             ID                    CAPACITY     │  │
│  │  Finance_Prod     abc123...            F8            │  │
│  │  Marketing        def456...            F4            │  │
│  │  ...                                                 │  │
│  │  fabric> _                           (Bottom Panel)  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why It Makes Sense:**
1. **Familiar to Pro Developers:** Portal becomes more like VS Code
2. **Synergy with Copilot:** Agent on right, terminal on bottom (just like VS Code + GitHub Copilot)
3. **Immediate Execution:** No need to switch contexts to a local terminal
4. **Contextual:** CLI can pick up context from the portal (current workspace, etc.)

**Use Cases:**
- Quick operations without leaving the portal
- Verifying Copilot-generated scripts before execution
- Power users who prefer CLI speed over clicking through UI

### 3.2 CLI as Agent Sandbox

**The Concept:** Instead of Remote MCP building 100+ individual API-wrapper tools, it exposes a single powerful tool: **"Generate and execute CLI code."**

**Why This Approach:**

| Aspect | Direct API Tools (Current) | CLI Code Execution (Vision) |
|--------|---------------------------|------------------------------|
| **Development Effort** | Build wrapper for each API | Reuse existing CLI work |
| **Capability Surface** | Limited to what we build | Full CLI capability (including community extensions) |
| **Readability** | Raw API payloads | Human-readable CLI commands |
| **Flexibility** | Fixed tool parameters | Full scripting (loops, conditions) |
| **User Education** | Users don't learn anything | Users learn CLI incrementally |

**How It Works:**
```
User → Copilot: "Rename all workspaces starting with 'Test_' to start with 'Dev_'"

Copilot → Generates CLI Script:
```bash
# Get all workspaces starting with Test_
workspaces=$(fab workspace list --query "[?starts_with(displayName, 'Test_')]" --output json)

# Loop through and rename each
for ws in $(echo $workspaces | jq -r '.[].id'); do
    old_name=$(fab workspace show --id $ws --query displayName -o tsv)
    new_name=${old_name/Test_/Dev_}
    fab workspace update --id $ws --display-name "$new_name"
done
```

Copilot → Shows script to user: "Here's the script I'll execute. Proceed?"
User → Confirms
Copilot → Executes via CLI sandbox
```

**Benefits:**
1. **Transparency:** User sees exactly what will happen
2. **Reusability:** User can save and reuse the script
3. **Learning:** User learns CLI syntax over time
4. **Control:** User can modify before execution
5. **Efficiency:** Avoids massive token consumption (see industry evidence below)

### 3.3 Remote CLI Execution

**The Challenge:** CLI currently requires a local machine to run. For platform-level integration, we need remote execution.

**Options Being Explored:**

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **Spark Integration** | Install CLI in Fabric Spark images | Notebooks can run CLI, leverages existing compute | Requires Spark compute resources |
| **CLI Script Item** | New Fabric item type for CLI scripts | First-class citizen, scheduler integration | New item type to build and maintain |
| **UDF Integration** | CLI as User Defined Functions | Lightweight, reusable | Different execution model |

**CLI Script Item Vision:**
```yaml
# Example CLI Script Item definition
name: workspace-compliance-check
version: "fab-cli@latest"
schedule: "0 0 * * *"  # Nightly
parameters:
  - name: tag_filter
    type: string
    default: "production"
script: |
  #!/bin/bash
  # Check all production workspaces for external admin access
  workspaces=$(fab workspace list --filter "tag eq '$TAG_FILTER'" -o json)
  for ws in $(echo $workspaces | jq -r '.[].id'); do
    admins=$(fab workspace role-assignment list --workspace-id $ws --role Admin -o json)
    # ... compliance logic
  done
```

**Integration Points:**
- Works with Fabric Scheduler
- Integrates with Jobs API
- Appears in pipeline definitions
- Community can share via GitHub/marketplace

### 3.4 Blueprint Execution via CLI

**Context:** The Blueprint item defines a "spec" of an environment. When executed, it needs to materialize that spec.

**Vision:** Blueprint execution converts the spec to CLI commands and runs them.

```
Blueprint Spec (YAML)           →    CLI Script (Generated)
─────────────────────                ─────────────────────
workspaces:                          fab workspace create \
  - name: "Finance_Prod"               --name "Finance_Prod" \
    capacity: F8                       --capacity F8
    items:
      - type: lakehouse               fab item create \
        name: "Sales_LH"                --workspace "Finance_Prod" \
                                        --type lakehouse \
                                        --name "Sales_LH"
```

**Why CLI for Blueprints:**
1. **Encapsulation:** CLI already handles API complexity
2. **Validation:** Can dry-run before execution
3. **Transparency:** Users see what will happen
4. **Extensibility:** New CLI capabilities automatically available to blueprints

### 3.5 Community & Marketplace

**Vision:** A community ecosystem for CLI scripts, similar to npm/pip packages.

**Components:**

1. **Open Source CLI Extensions**
   - Community contributes new commands
   - Extensions auto-available to Fabric agents

2. **Script Gallery**
   - Curated collection of useful scripts
   - "Start from template" in CLI Script Items
   - Categories: Governance, Migration, Compliance, etc.

3. **Future: Marketplace**
   - ISVs publish and potentially monetize scripts
   - Enterprise customers share internally

**Example Gallery Entry:**
```
────────────────────────────────────────────
📜 WORKSPACE NAMING COMPLIANCE
   by: FabricCommunity | ⭐ 4.8 | 📥 2.3k

   Ensures all workspaces follow your
   organization's naming conventions.
   
   Features:
   • Configurable naming patterns
   • Dry-run mode
   • Scheduled execution support
   
   [Use This Script] [View Source]
────────────────────────────────────────────
```

---

## 4. Why Code Execution > Direct Tool Calls

### 4.1 Industry Evidence

Two key articles support the "agents executing code" approach:

#### **Cloudflare: "Code Mode - The Better Way to Use MCP"**
> *"LLMs are better at writing code to call MCP than at calling MCP directly."*

Key insights:
- LLMs have seen millions of code examples in training
- LLMs have only seen contrived "tool call" examples
- Code provides loops, conditions, error handling naturally
- **Code execution in sandboxes** is the recommended pattern

#### **Anthropic: "Code Execution with MCP"**
> *"Direct tool calls consume context for each definition and result. Agents scale better by writing code to call tools instead."*

Key insights:
- **Token efficiency:** Code execution can reduce token usage by 98%+ in some scenarios
- **Progressive disclosure:** Load tool definitions on-demand vs. all upfront
- **Context efficiency:** Filter/transform results in code before returning to model
- **Privacy:** Data can flow without entering model context

### 4.2 Application to Fabric

**The Cloudflare/Anthropic Pattern Applied:**

| Their Recommendation | Our Implementation |
|---------------------|-------------------|
| "Agent writes code against API" | Agent writes CLI scripts |
| "Execute in sandbox" | CLI runs in isolated environment |
| "API becomes TypeScript definitions" | CLI commands become the API |
| "Results filtered in code" | CLI scripts process and filter |

**Fabric-Specific Benefits:**

1. **Reuse Investment:**
   - CLI already wraps OneLake APIs, Power BI APIs, ARM APIs
   - No need to duplicate this work in Remote MCP tools

2. **Richer Capabilities:**
   - CLI has file system access (definition files)
   - CLI has scripting capabilities (loops, conditions)
   - CLI has community extensions

3. **Human Readable:**
   - `fab workspace create --name "Finance"` vs. complex API payloads
   - Users can understand, learn, and modify

4. **Deterministic:**
   - Same script = same result
   - Suitable for CI/CD pipelines

---

## 5. Connecting the Efforts

### 5.1 Effort Map

This vision touches multiple ongoing workstreams:

```
┌─────────────────────────────────────────────────────────────────┐
│                       CLI VISION                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐        ┌──────────────────────────────┐  │
│  │ CLI in the Web   │───────▶│ User Research Study          │  │
│  │ (Portal Terminal)│        │ (Avishag, Rivka, Jeremy)     │  │
│  └──────────────────┘        │ • Validate portal integration │  │
│                              │ • Understand user mental model│  │
│                              └──────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐        ┌──────────────────────────────┐  │
│  │ CLI as MCP Tool  │───────▶│ Remote MCP Spec              │  │
│  │ (Agent Sandbox)  │        │ • Add "execute CLI" tool     │  │
│  └──────────────────┘        │ • Sandbox execution model    │  │
│                              └──────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐        ┌──────────────────────────────┐  │
│  │ Remote CLI Exec  │───────▶│ CLI Script Item Spec         │  │
│  │ (Platform Infra) │        │ • New item type definition   │  │
│  └──────────────────┘        │ • Scheduler integration      │  │
│                              └──────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐        ┌──────────────────────────────┐  │
│  │ CLI + Blueprints │───────▶│ Blueprint Spec               │  │
│  │ (Spec Execution) │        │ • CLI as execution engine    │  │
│  └──────────────────┘        └──────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐        ┌──────────────────────────────┐  │
│  │ Unified MCP      │───────▶│ Unified MCP Vision           │  │
│  │ (Tool Discovery) │        │ • CLI tools in catalog       │  │
│  └──────────────────┘        └──────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Impact on Remote MCP Spec

**Current Remote MCP Approach:**
- Build individual tools for each operation
- Each tool wraps a specific API endpoint
- Agent calls tools directly

**CLI-Enhanced Approach:**
- Add "CLI execution" tool to Remote MCP
- Tool accepts CLI script as input
- Executes in sandboxed environment
- Returns structured output

**Spec Addition (Proposed):**
```yaml
- name: execute_cli_script
  description: |
    Execute a Fabric CLI script in a secure sandbox.
    Use this for bulk operations, complex workflows,
    or when deterministic execution is required.
  parameters:
    script: string  # The CLI script to execute
    dry_run: boolean  # Validate without executing
    timeout: number  # Max execution time (seconds)
  returns:
    stdout: string
    stderr: string
    exit_code: number
```

### 5.3 Alignment with Kim Manis 1:1 (Dec 11)

**Key Messages for Kim:**

1. **CLI is not just a developer tool—it's platform infrastructure**
   - Powers agent execution (Remote MCP)
   - Powers Blueprint automation
   - Enables community innovation

2. **CLI + Copilot synergy (not competition)**
   - Copilot generates CLI scripts
   - CLI provides deterministic execution
   - Users learn CLI incrementally through Copilot

3. **Industry validation**
   - Cloudflare and Anthropic recommend code execution pattern
   - CLI is our "code" that agents can generate and execute

---

## 6. Hypotheses to Validate

### 6.1 User Experience Hypotheses

| ID | Hypothesis | Validation Method |
|----|------------|-------------------|
| H1 | Pro developers want CLI access directly in the Fabric Portal | User research study |
| H2 | Citizen developers will find CLI more approachable when Copilot helps generate commands | User research study |
| H3 | Users prefer seeing CLI scripts before Copilot executes (transparency) | User research study |
| H4 | Having CLI and Copilot side-by-side creates synergy (learn CLI through Copilot) | Prototype testing |

### 6.2 Technical Hypotheses

| ID | Hypothesis | Validation Method |
|----|------------|-------------------|
| T1 | CLI execution in Spark is performant enough for agent use cases | Prototype & benchmarks |
| T2 | CLI sandbox provides sufficient isolation for secure agent execution | Security review |
| T3 | CLI can be packaged in Spark default image without significant overhead | Engineering assessment |

### 6.3 Business Hypotheses

| ID | Hypothesis | Validation Method |
|----|------------|-------------------|
| B1 | CLI code execution reduces Remote MCP development effort by 50%+ | Engineering estimates |
| B2 | Community CLI extensions will grow agent capabilities without Microsoft investment | GitHub analytics |
| B3 | CLI Script Items will see adoption for scheduled governance tasks | Telemetry post-launch |

---

## 7. Research Alignment

### 7.1 Current Research Study

**Study:** "Exploring CLI Integration in Fabric"  
**Researchers:** Jeremy Hoover, Avishag Spillinger, Rivka Moshe  
**Participants:** 10 (5 Pro Developers, 5 Citizen Developers)  
**Timeline:** December 2025

### 7.2 Key Research Questions (Aligned to Vision)

| Vision Component | Research Questions to Answer |
|------------------|------------------------------|
| CLI in Portal | "Would you use a CLI directly in the Fabric UI? How would you expect it to look/behave?" |
| CLI + Copilot Synergy | "How do you see CLI's role alongside tools like Copilot? Would Copilot-generated CLI scripts be valuable?" |
| Mental Model | "When do you prefer CLI vs. UI? What makes CLI indispensable in certain scenarios?" |
| Learning | "How would seeing CLI commands help you learn? Would auto-generated commands be useful?" |

### 7.3 Research Insights to Look For

**For Pro Developers:**
- Validate desire for in-portal CLI
- Understand when they switch between UI and CLI
- Gauge interest in CLI + Copilot integration
- Identify missing CLI capabilities

**For Citizen Developers:**
- Understand CLI hesitancy/barriers
- Assess if Copilot-generated CLI is approachable
- Identify what would make CLI feel "safe"
- Gauge interest in "command visibility" (seeing what Copilot would execute)

### 7.4 Research Output Usage

Research findings will inform:

1. **Priority of CLI in Portal investment** (based on pro-dev demand)
2. **Copilot CLI generation UX** (based on transparency preferences)
3. **CLI learning features** (based on citizen dev feedback)
4. **CLI Script Item design** (based on scheduling/automation needs)

---

## 8. Next Steps

### 8.1 Immediate Actions (Next 2 Weeks)

| Action | Owner | Timeline |
|--------|-------|----------|
| Finalize this vision document | Hasan | Nov 30 |
| Share with Aviv Yahav for feedback | Hasan | Dec 2 |
| Align research study questions with vision hypotheses | Hasan + Jeremy | Dec 3 |
| Prepare Kim 1:1 presentation (Dec 11) | Hasan | Dec 9 |

### 8.2 Research Phase (December 2025)

| Action | Owner | Timeline |
|--------|-------|----------|
| Complete CLI user research (10 participants) | Jeremy, Avishag, Rivka | Dec 15 |
| Synthesize findings mapped to vision hypotheses | Research team | Dec 20 |
| Present findings to stakeholders | Hasan + Research | Dec 22 |

### 8.3 Spec Updates (January 2026)

| Action | Owner | Timeline |
|--------|-------|----------|
| Update Remote MCP spec with CLI execution tool | Hasan + Mahir | Jan 15 |
| Draft CLI Script Item spec | Hasan | Jan 20 |
| Propose Spark CLI integration approach | Hasan + Engineering | Jan 25 |

### 8.4 Prototype Phase (Q1 2026)

| Action | Owner | Timeline |
|--------|-------|----------|
| Build CLI in Portal prototype | TBD | Feb 2026 |
| Build CLI execution sandbox for agents | Engineering | Feb 2026 |
| Validate with design partners | Hasan | Mar 2026 |

---

## Appendix A: Industry References

### A.1 Cloudflare: "Code Mode" (September 2025)
**URL:** https://blog.cloudflare.com/code-mode/

**Key Quotes:**
> "LLMs are better at writing code to call MCP than at calling MCP directly."

> "Making an LLM perform tasks with tool calling is like putting Shakespeare through a month-long class in Mandarin and then asking him to write a play in it."

> "The CLI becomes kind of a sandbox that the agent could use to execute additional stuff."

**Relevance:** Validates our approach of having agents generate CLI code rather than calling tools directly.

### A.2 Anthropic: "Code Execution with MCP" (November 2025)
**URL:** https://www.anthropic.com/engineering/code-execution-with-mcp

**Key Quotes:**
> "Direct tool calls consume context for each definition and result. Agents scale better by writing code to call tools instead."

> "Code execution can reduce token usage by 98.7% in some scenarios."

> "Agents can filter and transform results in code before returning them."

**Relevance:** Quantifies the efficiency benefits and provides architectural patterns we can adopt.

---

## Appendix B: Persona Alignment

| Persona | CLI Vision Value |
|---------|------------------|
| **Ren (Data Engineer)** | Automates environment replication via CLI scripts; uses CLI in portal for quick operations |
| **Binh (BI Engineer)** | Uses CLI Script Items for client onboarding templates; leverages community scripts |
| **Ari (Data Architect)** | Schedules governance CLI scripts; relies on CLI determinism for compliance |
| **Ash (Analyst)** | Uses Copilot to generate CLI; learns CLI incrementally through Copilot suggestions |

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| **Fabric CLI** | Command-line interface for Microsoft Fabric operations |
| **Remote MCP** | Cloud-hosted MCP server enabling AI agent execution |
| **Local MCP** | Developer-side MCP server for local development workflows |
| **Unified Copilot** | Single AI assistant across all Fabric workloads |
| **CLI Script Item** | Proposed Fabric item type for storing and scheduling CLI scripts |
| **Blueprint** | Declarative specification of a Fabric environment |
| **Code Mode** | Pattern where agents write code to call tools (vs. direct tool calls) |

---

**Document End** | Version: 1.0 | Last Updated: November 30, 2025
