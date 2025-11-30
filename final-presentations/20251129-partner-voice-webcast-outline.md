# Partner Voice Webcast: AI-Powered Automation in Fabric with MCP
**Date:** December 2, 2025 | 6:00 PM Israel Time (8:00 AM PT)  
**Duration:** 60 minutes  
**Presenter:** Hasan Abo Shally  
**Audience:** Microsoft Fabric Partners, ISVs, MVPs

---

## 🎯 Session Objectives

1. **Educate** partners on Fabric CLI and MCP capabilities
2. **Demonstrate** real-world AI-powered automation scenarios
3. **Collect feedback** on automation challenges partners face
4. **Recruit** interested partners for Remote MCP Private Preview (Jan 2026)

---

## 📋 Agenda & Timing

| Time | Section | Duration |
|------|---------|----------|
| 0:00 | Welcome & Icebreaker Poll | 5 min |
| 0:05 | Introduction to Fabric Automation | 5 min |
| 0:10 | **Demo 1:** Fabric CLI Basics | 8 min |
| 0:18 | **Demo 2:** Community Plugin (data-goblin) | 7 min |
| 0:25 | Introduction to MCP (Model Context Protocol) | 5 min |
| 0:30 | **Demo 3:** AI Agent + CLI Integration | 10 min |
| 0:40 | **Demo 4:** Security Officer Web App (Local MCP) | 8 min |
| 0:48 | Remote MCP Roadmap & Private Preview | 5 min |
| 0:53 | Interactive Discussion & Q&A | 7 min |

---

## 🗳️ Interactive Polls (Use Microsoft Forms or Mentimeter)

### Poll 1: Opening Icebreaker (0:00)
**"How are you currently automating tasks in Fabric?"**
- [ ] Manual / UI only
- [ ] PowerShell / REST APIs
- [ ] Fabric CLI
- [ ] AI assistants (Copilot, ChatGPT, Claude)
- [ ] Custom scripts / CI-CD pipelines
- [ ] Not automating yet

### Poll 2: After CLI Demo (0:18)
**"What would you most like to automate in Fabric?"**
- [ ] Workspace provisioning & management
- [ ] Data pipeline orchestration
- [ ] Security & governance checks
- [ ] Report/Dataset deployments
- [ ] Capacity management
- [ ] Other (share in chat)

### Poll 3: After MCP Demos (0:48)
**"How likely are you to use AI agents for Fabric automation?"**
- [ ] 5 - Very likely, excited to try
- [ ] 4 - Interested, need to learn more
- [ ] 3 - Neutral, depends on use case
- [ ] 2 - Skeptical, prefer manual control
- [ ] 1 - Not interested

---

## 📊 Detailed Content Outline

### 1. Welcome & Icebreaker (5 min)

**Opening:**
> "Welcome everyone! Today we're going to explore how AI and automation are transforming the way we manage Microsoft Fabric. This is a conversation—we want to hear from you as much as we share with you."

**Run Poll 1** - Show live results, comment on what you see

**Set Expectations:**
- This is interactive—use chat, raise hands
- We'll show real demos, not slides
- Your feedback shapes our roadmap

---

### 2. Introduction to Fabric Automation (5 min)

**The Challenge:**
- Managing Fabric at scale is complex
- Repetitive tasks: workspace setup, permissions, deployments
- Need for consistency, auditability, speed

**The Solution Stack:**
```
┌─────────────────────────────────────┐
│     AI Agents (Copilot, Claude)     │  ← Natural Language
├─────────────────────────────────────┤
│    Model Context Protocol (MCP)     │  ← AI-to-Tool Bridge
├─────────────────────────────────────┤
│         Fabric CLI (fab)            │  ← Command Line
├─────────────────────────────────────┤
│        Fabric REST APIs             │  ← Foundation
└─────────────────────────────────────┘
```

**Key Message:** Each layer builds on the previous, giving you flexibility from manual scripting to fully autonomous AI agents.

---

### 3. Demo 1: Fabric CLI Basics (8 min)

**Scenario:** "Treat Fabric like a filesystem"

**Commands to Show:**
```bash
# Authentication check
fab auth status

# List workspaces
fab ls

# Navigate into a workspace
fab ls "Production.Workspace" -l

# Get item details
fab get "Production.Workspace/SalesModel.SemanticModel"

# Create a new workspace
fab mkdir "Demo-Partner-Voice.Workspace"

# Copy an item between workspaces
fab cp "Dev.Workspace/Report.Report" "Production.Workspace" -f

# Run a notebook
fab job run "Production.Workspace/ETL.Notebook"
```

**Talking Points:**
- Familiar filesystem metaphor (ls, cd, cp, mv, rm)
- Everything is scriptable → CI/CD ready
- Works with any terminal, any automation tool
- "Thousands of developers have adopted Fabric CLI since GA in May 2025"

---

### 4. Demo 2: Community Plugin - fabric-cli-plugin (7 min)

**Introduce:** [github.com/data-goblin/fabric-cli-plugin](https://github.com/data-goblin/fabric-cli-plugin)

> "One of our amazing community members, the 'Data Goblin,' has built an incredible plugin that extends the CLI with AI capabilities."

**What It Provides:**
- 🧠 **Skill for Claude Desktop** - AI understands Fabric CLI commands
- 🔧 **17 MCP tools** - Direct Fabric operations
- 📚 **Rich documentation** - Patterns, workflows, best practices
- 🔍 **Cross-workspace search** - Find items across your tenant

**Demo Scenario:** Show how Claude with the plugin can:
```
User: "List all semantic models in my Sales workspace and check their refresh status"

Claude: [Uses fab ls, fab get, fab api to query and summarize]
```

**Key Message:** 
> "This is the power of community + open standards. Partners like you can build on top of our platform."

---

### 5. Introduction to MCP - Model Context Protocol (5 min)

**What is MCP?**
> "MCP is an open standard that connects AI assistants to external tools and data. Think of it as a USB port for AI—plug in any capability."

**Two Flavors of Fabric MCP:**

| | Local MCP | Remote MCP (Coming) |
|---|-----------|---------------------|
| **Runs on** | Your machine (VS Code, CLI) | Fabric cloud service |
| **Best for** | Dev scenarios, local files | Production automation |
| **Auth** | Your credentials | Managed identity, delegated |
| **Available** | Now (Private Preview) | Jan 2026 (Private Preview) |

**Why MCP Matters:**
- AI agents can safely execute Fabric operations
- Respects permissions and governance
- Auditable, controllable, enterprise-ready

---

### 6. Demo 3: AI Agent + CLI Integration (10 min)

**Scenario:** "Rename all workspaces to match naming convention"

**The Problem:**
> "Imagine you have 50 workspaces with inconsistent names. Doing this manually would take hours."

**The Solution - AI + CLI:**
```
User: "I want all my workspaces to follow this pattern: 
       [Environment]-[Domain]-[Project]
       For example: Prod-Sales-Dashboard"

AI Agent: 
1. Lists all workspaces via CLI
2. Analyzes current names
3. Proposes new names (shows table)
4. Generates CLI script to rename
5. Asks for confirmation
6. Executes the script
```

**Show the Interaction:**
- AI generates: `fab set "OldName.Workspace" -q displayName -i "Prod-Sales-Dashboard"`
- User reviews the script
- Execute with `-f` flag for batch operation

**Key Messages:**
- AI handles complexity, human retains control
- Script is reusable and auditable
- Cost-effective: one script vs. many AI calls

---

### 7. Demo 4: Security Officer Web App with Local MCP (8 min)

**Scenario:** Building a security monitoring solution for Fabric

> "This is a real demo our team built. Imagine you're a security officer who needs to continuously monitor your Fabric environment for vulnerabilities."

**What the App Does:**
1. Connects to Fabric via Local MCP
2. Queries all workspaces and items
3. Checks security conditions:
   - Workspaces without admins
   - Items with overly permissive access
   - Orphaned connections
   - Stale resources
4. Generates a security report

**Architecture:**
```
┌──────────────────┐     ┌─────────────┐     ┌─────────────┐
│  Web App (React) │ ←→  │ AI Agent    │ ←→  │ Fabric MCP  │
│  Security UI     │     │ (Copilot)   │     │ (Local)     │
└──────────────────┘     └─────────────┘     └─────────────┘
                                                    ↓
                                             ┌─────────────┐
                                             │ Fabric APIs │
                                             └─────────────┘
```

**Show:**
- The web interface
- AI agent generating queries
- Real-time security findings

**Key Message for Partners:**
> "This is exactly the kind of solution YOU can build for your customers. MCP enables you to create intelligent applications on top of Fabric."

---

### 8. Remote MCP Roadmap & Private Preview (5 min)

**What's Coming:**

| Milestone | Timeline | Capabilities |
|-----------|----------|--------------|
| Private Preview | January 2026 | Core workspace & item operations |
| Public Preview | March 2026 (FabCon Atlanta) | Expanded API coverage, enterprise features |
| GA | H2 2026 | Full production readiness |

**Remote MCP Benefits:**
- ☁️ Runs in Fabric cloud - no local setup
- 🔐 Enterprise authentication - AAD, managed identity
- 📊 Full audit logging
- 🚀 Scalable for production workloads

**Private Preview Invitation:**
> "We're looking for partners who want to shape this capability. If you're interested in joining the Private Preview starting January, please reach out after this session or fill out our interest form."

**Show:** Link to interest form / contact information

---

### 9. Interactive Discussion & Q&A (7 min)

**Run Poll 3** - Show results

**Discussion Prompts:**
1. "What automation challenges are you facing that we didn't cover today?"
2. "Which demo scenario resonated most with your customers' needs?"
3. "What would make you confident to deploy MCP-based solutions?"

**Capture Feedback:**
- Note specific partner use cases
- Identify potential private preview candidates
- Document feature requests

**Closing:**
> "Thank you for joining us today. Your feedback is invaluable—it directly shapes what we build. We have two roundtable sessions on December 16 and 18 for deeper discussions. If you're interested, please sign up."

---

## 📎 Resources to Share

### Links for Partners:
- Fabric CLI Documentation: [learn.microsoft.com/fabric-cli](https://learn.microsoft.com/en-us/rest/api/fabric/articles/fabric-command-line-interface)
- fabric-cli-plugin (Community): [github.com/data-goblin/fabric-cli-plugin](https://github.com/data-goblin/fabric-cli-plugin)
- MCP Open Standard: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- Private Preview Interest Form: [TBD - Create before session]

### Follow-up Sessions:
- **Roundtable 1:** December 16, 2025 (8-9 AM PT)
- **Roundtable 2:** December 18, 2025 (8-9 AM PT)

---

## 🎬 Demo Preparation Checklist

### Environment Setup:
- [ ] Fabric CLI installed and authenticated (`fab auth status`)
- [ ] Demo workspaces created with sample items
- [ ] fabric-cli-plugin configured in Claude Desktop
- [ ] Security Officer web app running locally
- [ ] Screen sharing tested on Teams Live Event

### Backup Plans:
- [ ] Screenshots/video recordings of each demo
- [ ] Pre-recorded demo videos as fallback
- [ ] Slide-based walkthrough if live demo fails

### Technical Needs:
- [ ] Terminal with large, readable font
- [ ] Split screen: terminal + browser/app
- [ ] Disable notifications during session

---

## 📝 Post-Session Actions

1. Send thank-you email with resources and recording link
2. Share poll results summary with the team
3. Follow up with interested Private Preview candidates
4. Document feedback for product planning
5. Prepare roundtable discussion questions based on feedback

---

## 💡 Key Messages Summary

1. **Fabric CLI** makes Fabric scriptable and automatable
2. **MCP** bridges AI agents to Fabric safely and securely
3. **Local MCP** is available now for development scenarios
4. **Remote MCP** coming Jan 2026 for production workloads
5. **Community innovation** (like fabric-cli-plugin) shows the ecosystem potential
6. **Partner opportunity** to build intelligent solutions on Fabric

---

*Last Updated: November 29, 2025*
