# AI-Powered Automation in Fabric with MCP
## Architecture Diagrams & Visual Elements

**Partner Voice Webcast - December 2025**

---

## 1. The Solution Stack

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ╔═══════════════════════════════════════════════════════════════╗    │
│   ║              🤖  AI AGENTS (Copilot, Claude)                  ║    │
│   ║                   "Natural Language Interface"                ║    │
│   ╚═══════════════════════════════════════════════════════════════╝    │
│                              ▼                                          │
│   ╔═══════════════════════════════════════════════════════════════╗    │
│   ║            🔗  MODEL CONTEXT PROTOCOL (MCP)                   ║    │
│   ║                    "AI-to-Tool Bridge"                        ║    │
│   ╚═══════════════════════════════════════════════════════════════╝    │
│                              ▼                                          │
│   ╔═══════════════════════════════════════════════════════════════╗    │
│   ║                  ⌨️  FABRIC CLI (fab)                         ║    │
│   ║                    "Command Line Power"                       ║    │
│   ╚═══════════════════════════════════════════════════════════════╝    │
│                              ▼                                          │
│   ╔═══════════════════════════════════════════════════════════════╗    │
│   ║                 🌐  FABRIC REST APIs                          ║    │
│   ║                      "Foundation"                             ║    │
│   ╚═══════════════════════════════════════════════════════════════╝    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Legend:
  ═══  Layer boundary
  ▼    Data/Control flow direction
```

### Simplified Version (for slides)

```
    ┌───────────────────────────────────────┐
    │     AI Agents (Copilot, Claude)       │  ← Natural Language
    ├───────────────────────────────────────┤
    │    Model Context Protocol (MCP)       │  ← AI-to-Tool Bridge
    ├───────────────────────────────────────┤
    │         Fabric CLI (fab)              │  ← Command Line
    ├───────────────────────────────────────┤
    │        Fabric REST APIs               │  ← Foundation
    └───────────────────────────────────────┘
```

---

## 2. Local vs Remote MCP Architecture

### Local MCP Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        LOCAL MCP DEPLOYMENT                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │    User     │    │  VS Code /  │    │  Local MCP  │              │
│  │   Machine   │───▶│    CLI      │───▶│   Server    │              │
│  └─────────────┘    └─────────────┘    └──────┬──────┘              │
│                                               │                      │
│                                               ▼                      │
│                                        ┌─────────────┐              │
│                                        │ Fabric APIs │              │
│                                        │   (Cloud)   │              │
│                                        └─────────────┘              │
│                                                                      │
│  [User's Environment]                          [Microsoft Fabric]   │
└──────────────────────────────────────────────────────────────────────┘

Key: ───▶ Request flow
     User credentials used for authentication
```

### Remote MCP Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                       REMOTE MCP DEPLOYMENT                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐         ┌─────────────────────────────────────┐    │
│  │    User     │         │         Microsoft Cloud             │    │
│  │  (Browser)  │────────▶│  ┌──────────────┐  ┌─────────────┐ │    │
│  └─────────────┘         │  │  Copilot in  │  │ Remote MCP  │ │    │
│                          │  │   Fabric     │─▶│   Server    │ │    │
│                          │  └──────────────┘  └──────┬──────┘ │    │
│                          │                           │        │    │
│                          │                           ▼        │    │
│                          │                    ┌─────────────┐ │    │
│                          │                    │ Fabric APIs │ │    │
│                          │                    └─────────────┘ │    │
│                          └─────────────────────────────────────┘    │
│                                                                      │
│  [Any Device]                               [Fully Managed Service] │
└──────────────────────────────────────────────────────────────────────┘

Key: ────▶ Request flow (encrypted)
     Delegated authentication via Entra ID
```

### Side-by-Side Comparison

```
        LOCAL MCP                              REMOTE MCP
    ═══════════════                        ═══════════════

    ┌───────────┐                          ┌───────────┐
    │   User    │                          │   User    │
    │ Machine   │                          │ (Browser) │
    └─────┬─────┘                          └─────┬─────┘
          │                                      │
          ▼                                      ▼
    ┌───────────┐                     ┌──────────────────┐
    │  VS Code  │                     │ Copilot in Fabric│
    │   + CLI   │                     │    (Web UI)      │
    └─────┬─────┘                     └────────┬─────────┘
          │                                    │
          ▼                                    ▼
    ┌───────────┐                     ┌──────────────────┐
    │ Local MCP │                     │   Remote MCP     │
    │  Server   │                     │    (Cloud)       │
    └─────┬─────┘                     └────────┬─────────┘
          │                                    │
          └──────────────┬─────────────────────┘
                         ▼
                  ┌─────────────┐
                  │ Fabric APIs │
                  └─────────────┘
```

---

## 3. Security Officer Web App Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│               SECURITY OFFICER WEB APPLICATION                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                        ┌─────────────────┐                          │
│                        │   Security      │                          │
│                        │   Officer       │                          │
│                        │   (User)        │                          │
│                        └────────┬────────┘                          │
│                                 │                                    │
│                                 ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    WEB APP (React)                          │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │    │
│  │  │ Dashboard   │  │  Natural    │  │  Audit Trail &      │ │    │
│  │  │  & Alerts   │  │  Language   │  │  Reporting          │ │    │
│  │  │             │  │  Query Box  │  │                     │ │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │    │
│  └────────────────────────────┬────────────────────────────────┘    │
│                               │                                      │
│                               ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                 AI AGENT (Copilot SDK)                      │    │
│  │  • Understands security intent                              │    │
│  │  • Generates safe operations                                │    │
│  │  • Enforces policy compliance                               │    │
│  └────────────────────────────┬────────────────────────────────┘    │
│                               │                                      │
│                               ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                 FABRIC MCP (Local)                          │    │
│  │  • Workspace operations                                     │    │
│  │  • Permission auditing                                      │    │
│  │  • Sensitivity label management                             │    │
│  └────────────────────────────┬────────────────────────────────┘    │
│                               │                                      │
│                               ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    FABRIC REST APIs                         │    │
│  │  • Admin APIs        • Security APIs    • Governance APIs   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

Data Flow:
  User Query ──▶ Web App ──▶ AI Agent ──▶ MCP ──▶ Fabric APIs
                                │
                                ▼
                    Response with explanation
```

### Component Detail View

```
┌────────────────────────────────────────────────────────────────────┐
│                     COMPONENT INTERACTIONS                          │
└────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │   React UI   │◀───────▶│  AI Agent    │◀───────▶│  Fabric MCP  │
  │              │  JSON   │  (Copilot)   │  Tools  │   Server     │
  └──────────────┘         └──────────────┘         └──────────────┘
        │                        │                        │
        │ State                  │ Context                │ Commands
        ▼                        ▼                        ▼
  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │  Dashboard   │         │   Prompt     │         │  Fabric API  │
  │  Components  │         │   + Memory   │         │   Calls      │
  └──────────────┘         └──────────────┘         └──────────────┘

Legend:
  ◀──────▶  Bidirectional communication
  ──────▶   Data flow direction
```

---

## 4. AI Agent Workflow (Rename Scenario)

```
┌──────────────────────────────────────────────────────────────────────┐
│            AI AGENT WORKFLOW: BULK RENAME SCENARIO                   │
└──────────────────────────────────────────────────────────────────────┘

Step 1: USER REQUEST
═══════════════════
┌──────────────────────────────────────────────────────────────────────┐
│  "Rename all reports starting with 'Test_' to 'Prod_' in the        │
│   Development workspace"                                             │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Step 2: AI ANALYSIS
═══════════════════
┌──────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ AI Agent Processing:                                           │ │
│  │ • Parse intent: bulk rename operation                          │ │
│  │ • Identify scope: "Development" workspace                      │ │
│  │ • Define filter: items starting with "Test_"                   │ │
│  │ • Define transform: replace "Test_" → "Prod_"                  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  MCP Tool Calls:                                                     │
│  ┌────────────────────┐  ┌────────────────────┐                     │
│  │ list_workspaces    │  │ list_items         │                     │
│  │ (find workspace)   │  │ (get all reports)  │                     │
│  └────────────────────┘  └────────────────────┘                     │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Step 3: SCRIPT GENERATION
═════════════════════════
┌──────────────────────────────────────────────────────────────────────┐
│  Generated Script:                                                   │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  # Rename reports in Development workspace                     │ │
│  │  $workspace = "Development"                                    │ │
│  │                                                                │ │
│  │  # Get matching reports                                        │ │
│  │  $reports = fab item list -w $workspace --type Report |        │ │
│  │             Where-Object { $_.name -like "Test_*" }            │ │
│  │                                                                │ │
│  │  # Rename each report                                          │ │
│  │  foreach ($report in $reports) {                               │ │
│  │      $newName = $report.name -replace "^Test_", "Prod_"        │ │
│  │      fab item update -w $workspace -i $report.id -n $newName   │ │
│  │  }                                                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Step 4: USER REVIEW
═══════════════════
┌──────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ PREVIEW: This script will rename 7 reports:                    │ │
│  │                                                                │ │
│  │   Test_Sales_Q1      →  Prod_Sales_Q1                         │ │
│  │   Test_Sales_Q2      →  Prod_Sales_Q2                         │ │
│  │   Test_Inventory     →  Prod_Inventory                        │ │
│  │   Test_HR_Dashboard  →  Prod_HR_Dashboard                     │ │
│  │   ...                                                          │ │
│  │                                                                │ │
│  │   [✓ Execute]  [✏ Modify]  [✗ Cancel]                         │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                             User approves
                                    │
                                    ▼
Step 5: EXECUTION
═════════════════
┌──────────────────────────────────────────────────────────────────────┐
│  Execution Progress:                                                 │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  [████████████████████████░░░░░░]  5/7 items renamed           │ │
│  │                                                                │ │
│  │  ✓ Test_Sales_Q1      → Prod_Sales_Q1                         │ │
│  │  ✓ Test_Sales_Q2      → Prod_Sales_Q2                         │ │
│  │  ✓ Test_Inventory     → Prod_Inventory                        │ │
│  │  ✓ Test_HR_Dashboard  → Prod_HR_Dashboard                     │ │
│  │  ✓ Test_Finance       → Prod_Finance                          │ │
│  │  ◐ Test_Marketing     → (in progress...)                      │ │
│  │  ○ Test_Operations    → (pending)                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
Step 6: CONFIRMATION
════════════════════
┌──────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ ✅ COMPLETED SUCCESSFULLY                                      │ │
│  │                                                                │ │
│  │ Summary:                                                       │ │
│  │ • 7 reports renamed                                           │ │
│  │ • 0 errors                                                     │ │
│  │ • Execution time: 12.3 seconds                                │ │
│  │                                                                │ │
│  │ Audit log entry created: #2024-12-01-001                      │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Workflow Summary (Compact)

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   USER      │   │     AI      │   │   SCRIPT    │   │    USER     │
│  REQUEST    │──▶│  ANALYSIS   │──▶│ GENERATION  │──▶│   REVIEW    │
│             │   │             │   │             │   │             │
│ Natural     │   │ Parse       │   │ Create      │   │ Preview     │
│ Language    │   │ Intent      │   │ Safe Code   │   │ & Approve   │
└─────────────┘   └─────────────┘   └─────────────┘   └──────┬──────┘
                                                             │
                                                             ▼
                  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
                  │ CONFIRMATION│◀──│  EXECUTION  │◀──│   EXECUTE   │
                  │             │   │             │   │             │
                  │ Summary &   │   │ Run with    │   │ User        │
                  │ Audit Log   │   │ Progress    │   │ Approved    │
                  └─────────────┘   └─────────────┘   └─────────────┘

Human remains in the loop at every critical decision point ☑️
```

---

## 5. Roadmap Timeline

```
┌──────────────────────────────────────────────────────────────────────┐
│                    FABRIC MCP ROADMAP 2025-2026                      │
└──────────────────────────────────────────────────────────────────────┘

   NOW              JAN 2026          MAR 2026           H2 2026
    │                  │                 │                  │
    ▼                  ▼                 ▼                  ▼
────●──────────────────●─────────────────●──────────────────●──────▶
    │                  │                 │                  │
    │                  │                 │                  │
┌───┴───┐         ┌────┴────┐       ┌────┴────┐        ┌────┴────┐
│ LOCAL │         │ REMOTE  │       │ PUBLIC  │        │   GA    │
│  MCP  │         │   MCP   │       │ PREVIEW │        │         │
│PREVIEW│         │ PRIVATE │       │         │        │         │
│       │         │ PREVIEW │       │ FabCon  │        │ Full    │
│       │         │         │       │ Atlanta │        │ Release │
└───────┘         └─────────┘       └─────────┘        └─────────┘

    ▲                  ▲                 ▲                  ▲
    │                  │                 │                  │
 ┌──┴────────────┐  ┌──┴────────────┐ ┌──┴────────────┐ ┌──┴────────────┐
 │ • VS Code     │  │ • Cloud-      │ │ • All users   │ │ • Production  │
 │   Extension   │  │   hosted MCP  │ │   can try     │ │   workloads   │
 │ • CLI + MCP   │  │ • Copilot in  │ │ • Full        │ │ • Enterprise  │
 │ • Partner     │  │   Fabric      │ │   feature set │ │   support     │
 │   testing     │  │ • Select      │ │ • Community   │ │ • SLA         │
 │               │  │   partners    │ │   feedback    │ │               │
 └───────────────┘  └───────────────┘ └───────────────┘ └───────────────┘
```

### Compact Timeline (for slides)

```
         2025                           2026
    ════════════          ════════════════════════════════════════

    Dec                   Jan        Mar              H2
     │                     │          │                │
     ●─────────────────────●──────────●────────────────●─────────▶
     │                     │          │                │
   LOCAL               REMOTE      PUBLIC             GA
    MCP                  MCP       PREVIEW
  PREVIEW              PRIVATE    (FabCon)
                       PREVIEW

    ┌─┐                 ┌─┐         ┌─┐              ┌─┐
    │█│ Available Now   │░│ Coming  │░│ Coming      │░│ Target
    └─┘                 └─┘ Soon    └─┘ Q1          └─┘ H2
```

### Milestone Cards

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   ████ NOW      │  │   ░░░░ JAN '26  │  │   ░░░░ MAR '26  │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│  LOCAL MCP      │  │  REMOTE MCP     │  │  PUBLIC         │
│  PREVIEW        │  │  PRIVATE PREV   │  │  PREVIEW        │
│                 │  │                 │  │                 │
│  • VS Code Ext  │  │  • Cloud MCP    │  │  • All users    │
│  • fab CLI      │  │  • Copilot      │  │  • FabCon       │
│  • 30+ tools    │  │  • Select ISVs  │  │  • Full docs    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                             │
                             ▼
                  ┌─────────────────┐
                  │   ░░░░ H2 '26   │
                  ├─────────────────┤
                  │  GENERAL        │
                  │  AVAILABILITY   │
                  │                 │
                  │  • Production   │
                  │  • Enterprise   │
                  │  • Full SLA     │
                  └─────────────────┘
```

---

## 6. Comparison Table: Local vs Remote MCP

```
┌──────────────────────────────────────────────────────────────────────┐
│                    LOCAL MCP vs REMOTE MCP                           │
├────────────────────────┬───────────────────┬─────────────────────────┤
│       FEATURE          │    LOCAL MCP      │      REMOTE MCP         │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Deployment             │ User's machine    │ Microsoft Cloud         │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Authentication         │ User credentials  │ Delegated (Entra ID)    │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Client Support         │ VS Code, CLI,     │ Copilot in Fabric,      │
│                        │ Claude Desktop    │ Any MCP client          │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Setup Required         │ Install extension │ None (built-in)         │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Offline Capable        │ No (needs API)    │ No                      │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Best For               │ Developers,       │ Business users,         │
│                        │ Automation        │ Analysts, Everyone      │
├────────────────────────┼───────────────────┼─────────────────────────┤
│ Availability           │ Preview (NOW)     │ Private Preview         │
│                        │                   │ (Jan 2026)              │
└────────────────────────┴───────────────────┴─────────────────────────┘
```

### Detailed Comparison Matrix

```
                              LOCAL MCP              REMOTE MCP
                          ═══════════════        ═══════════════

DEPLOYMENT
├── Location              │ User machine         │ Azure Cloud
├── Management            │ Self-managed         │ Microsoft-managed
└── Updates               │ Manual/Auto          │ Automatic

SECURITY
├── Auth Method           │ Local credentials    │ Entra ID (SSO)
├── Token Handling        │ Local storage        │ Cloud-managed
└── Audit Logging         │ Local logs           │ Azure Monitor

CLIENT SUPPORT
├── VS Code               │     ✓                │     ✓
├── Claude Desktop        │     ✓                │     ✗
├── CLI Integration       │     ✓                │     ✓
├── Copilot in Fabric     │     ✗                │     ✓
└── Custom Apps           │     ✓                │     ✓

CAPABILITIES
├── All 30+ MCP Tools     │     ✓                │     ✓
├── Batch Operations      │     ✓                │     ✓
├── Real-time Sync        │     ✓                │     ✓
└── Cross-workspace       │     ✓                │     ✓

IDEAL USE CASES
├── Developer workflows   │     ★★★              │     ★★☆
├── CI/CD pipelines       │     ★★★              │     ★★☆
├── Business user access  │     ★☆☆              │     ★★★
├── No-install needed     │     ☆☆☆              │     ★★★
└── Enterprise rollout    │     ★☆☆              │     ★★★

Legend: ✓ = Supported  ✗ = Not Supported
        ★★★ = Excellent  ★★☆ = Good  ★☆☆ = Limited  ☆☆☆ = N/A
```

### Quick Reference Card

```
┌──────────────────────────────────────────────────────────────────┐
│                     WHICH MCP IS RIGHT FOR YOU?                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   CHOOSE LOCAL MCP IF:              CHOOSE REMOTE MCP IF:        │
│   ═══════════════════               ═════════════════════        │
│                                                                  │
│   ✓ You're a developer             ✓ You're a business user     │
│   ✓ You use VS Code daily          ✓ You prefer web-based tools │
│   ✓ You need CLI automation        ✓ You want zero setup        │
│   ✓ You use Claude Desktop         ✓ You use Copilot in Fabric  │
│   ✓ You build custom apps          ✓ You need enterprise SSO    │
│                                                                  │
│   Available: NOW (Preview)         Available: JAN 2026           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Appendix: Additional Visual Elements

### A. MCP Tool Categories

```
┌──────────────────────────────────────────────────────────────────────┐
│                      FABRIC MCP TOOL CATEGORIES                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│   │ WORKSPACE   │   │    ITEM     │   │  SECURITY   │               │
│   │ MANAGEMENT  │   │ MANAGEMENT  │   │ & GOVERNANCE│               │
│   ├─────────────┤   ├─────────────┤   ├─────────────┤               │
│   │ • list      │   │ • list      │   │ • get roles │               │
│   │ • create    │   │ • create    │   │ • assign    │               │
│   │ • update    │   │ • update    │   │ • remove    │               │
│   │ • delete    │   │ • delete    │   │ • audit     │               │
│   │ • get       │   │ • get       │   │ • labels    │               │
│   └─────────────┘   └─────────────┘   └─────────────┘               │
│                                                                      │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│   │   LAKEHOUSE │   │  NOTEBOOK   │   │  DATA       │               │
│   │  OPERATIONS │   │  EXECUTION  │   │  PIPELINE   │               │
│   ├─────────────┤   ├─────────────┤   ├─────────────┤               │
│   │ • tables    │   │ • run       │   │ • trigger   │               │
│   │ • load      │   │ • get cells │   │ • status    │               │
│   │ • query     │   │ • get output│   │ • history   │               │
│   │ • schema    │   │ • schedule  │   │ • cancel    │               │
│   └─────────────┘   └─────────────┘   └─────────────┘               │
│                                                                      │
│                        Total: 30+ Tools                              │
└──────────────────────────────────────────────────────────────────────┘
```

### B. Authentication Flow

```
                    AUTHENTICATION FLOW
    ════════════════════════════════════════════════

    LOCAL MCP                        REMOTE MCP
    ─────────                        ──────────

    ┌─────────┐                      ┌─────────┐
    │  User   │                      │  User   │
    └────┬────┘                      └────┬────┘
         │ 1. fab login                   │ 1. Open Fabric Portal
         ▼                                ▼
    ┌─────────┐                      ┌─────────┐
    │ Entra   │                      │ Entra   │
    │  ID     │◀─────────────────────│  ID     │
    └────┬────┘                      └────┬────┘
         │ 2. Access Token                │ 2. SSO Token
         ▼                                ▼
    ┌─────────┐                      ┌─────────┐
    │  Local  │                      │ Remote  │
    │   MCP   │                      │   MCP   │
    └────┬────┘                      └────┬────┘
         │ 3. API Calls                   │ 3. API Calls
         ▼                                ▼
    ┌───────────────────────────────────────────┐
    │              FABRIC REST APIs             │
    └───────────────────────────────────────────┘
```

### C. Success Metrics Visual

```
┌──────────────────────────────────────────────────────────────────────┐
│                    EXPECTED IMPACT METRICS                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   TIME SAVINGS                                                       │
│   ████████████████████████████░░░░░░░░░░  75% faster                │
│   Manual: ████████████████████████████████████████  (4 hours)       │
│   AI+MCP: ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (1 hour)        │
│                                                                      │
│   ERROR REDUCTION                                                    │
│   ████████████████████████████████████░░░░  90% fewer errors        │
│   Manual: ████████████████████████████░░░░░░░░░░░░  (15 errors)     │
│   AI+MCP: ███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (1-2 errors)    │
│                                                                      │
│   PRODUCTIVITY                                                       │
│   ████████████████████████████████████████  3x more work done       │
│   Without: ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░  (10 tasks/day)  │
│   With:    ████████████████████████████████████░░░  (30 tasks/day)  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Usage Notes

1. **Terminal Display**: These diagrams are designed for monospace fonts. Best viewed in:
   - VS Code integrated terminal
   - macOS Terminal
   - Windows Terminal
   - PowerShell

2. **Copy/Paste**: All diagrams can be directly copied into:
   - Markdown documents
   - Slack messages
   - GitHub issues/PRs
   - Email (use monospace font)

3. **Slide Conversion**: For PowerPoint/Keynote:
   - Use a monospace font (Consolas, Menlo, Courier New)
   - Font size: 12-14pt for readability
   - Dark background with light text recommended

4. **Character Width**: All diagrams fit within 76 characters (safe for 80-char terminals)

---

*Generated for Partner Voice Webcast - December 2025*
*AI-Powered Automation in Fabric with MCP*
