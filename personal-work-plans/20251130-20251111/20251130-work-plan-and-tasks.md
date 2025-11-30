# Hasan's Work Plan & Task Briefing Document
**Created:** November 30, 2025  
**Purpose:** This document enables any AI agent to quickly understand my current work context, priorities, and dive into specific tasks.

---

## 🎯 Quick Context: Who Am I?

**Name:** Hasan Abo Shally  
**Role:** Program Manager, Microsoft Fabric Platform Team (ILDC - Israel)  
**Manager:** Alon Baram (PM Manager) | **Skip-Level:** Aviv Ezrachi (Group PM Lead)  
**Key Responsibilities:**
- Fabric CLI (Command Line Interface) - GA since May 2025
- Model Context Protocol (MCP) Platform - Local & Remote variants
- AI-powered automation for Fabric
- Developer experience and tooling

---

## 📅 Critical Dates (Next 2 Weeks)

| Date | Event | Priority |
|------|-------|----------|
| **Dec 2, 2025** | Partner Voice Webcast (6 PM Israel / 8 AM PT) | 🔴 HIGH |
| **Dec 2, 2025** | Remote MCP Spec Review (2:05 PM) | 🔴 HIGH |
| **Dec 3, 2025** | Local MCP Spec Review (3:05 PM) | 🔴 HIGH |
| **Dec 10, 2025** | CVP Site Visit - Product Reviews (Haifa, on-site) | 🔴 HIGH |
| **Dec 11, 2025** | 1:1 with Kim Manis (CVP) - AI Automation Demo | 🔴 HIGH |
| Dec 16 & 18, 2025 | Partner Voice Roundtables (8 AM PT) | 🟡 MEDIUM |

---

## 📋 Master Task List

Below are all tasks I need to complete, organized by workstream. Each task has a unique ID for easy reference.

### Workstream A: Partner Voice Webcast (Dec 2)
> **Status:** ✅ Presentation outline COMPLETE | Demo prep in progress

| Task ID | Task | Status | Deliverable Location |
|---------|------|--------|---------------------|
| A1 | Create presentation outline with demos, polls, timing | ✅ DONE | `final-presentations/20251129-partner-voice-webcast-outline.md` |
| A2 | Finalize slide deck in PowerPoint | 🔄 IN PROGRESS | TBD (PowerPoint file) |
| A3 | Prepare demo environment (CLI authenticated, sample workspaces) | ⬜ TODO | N/A - environment setup |
| A4 | Dry run presentation (target: 45 min + 15 min Q&A) | ⬜ TODO | N/A - practice |
| A5 | Create backup screenshots/video in case live demo fails | ⬜ TODO | TBD |

### Workstream B: MCP Specifications
> **Status:** Specs at v6.0, ready for review

| Task ID | Task | Status | Deliverable Location |
|---------|------|--------|---------------------|
| B1 | Finalize Remote MCP Spec (v6.0) | ✅ DONE | `mcp/specs/remote-mcp/20251124-FABRIC-REMOTE-MCP-SPEC-V4.md` |
| B2 | Finalize Local MCP Spec | ✅ DONE | `mcp/specs/local-mcp/20251124-FABRIC-LOCAL-MCP-SPEC-V3.md` |
| B3 | Send specs to stakeholders before review | ⬜ TODO | Email to team |
| B4 | Conduct Remote MCP Spec Review (Dec 2) | ⬜ TODO | Meeting notes |
| B5 | Conduct Local MCP Spec Review (Dec 3) | ⬜ TODO | Meeting notes |
| B6 | Incorporate review feedback into specs | ⬜ TODO | Updated spec files |
| B7 | Integrate Unified Copilot requirements into MCP specs | ⬜ TODO | Updated spec files |

### Workstream C: CLI Research Study (CLI-in-Web Validation)
> **Status:** Study guide under review, sessions planned for early December

| Task ID | Task | Status | Deliverable Location |
|---------|------|--------|---------------------|
| C1 | Review CLI Study Guide & add PM feedback | 🔄 IN PROGRESS | Word doc (Avishag's SharePoint) |
| C2 | Finalize participant screener criteria | 🔄 IN PROGRESS | Same Word doc |
| C3 | Provide input on key hypotheses to validate | ⬜ TODO | Meeting notes |
| C4 | Attend research sessions (observe) | ⬜ TODO | N/A |
| C5 | Review research findings and incorporate into vision | ⬜ TODO | Vision doc |

### Workstream D: Internal Wiki for MCP Platform Onboarding
> **Status:** Not started - need to draft

| Task ID | Task | Status | Deliverable Location |
|---------|------|--------|---------------------|
| D1 | Draft internal wiki explaining MCP onboarding process | ⬜ TODO | TBD (SharePoint or internal wiki) |
| D2 | Include examples (Notebook MCP, RTI MCP) | ⬜ TODO | Same wiki |
| D3 | Get feedback from Alon, Aviv, Mahir | ⬜ TODO | N/A |
| D4 | Publish wiki for internal teams | ⬜ TODO | Internal wiki site |

### Workstream E: CLI-in-Web Vision Document
> **Status:** Conceptualized, awaiting research input

| Task ID | Task | Status | Deliverable Location |
|---------|------|--------|---------------------|
| E1 | Write vision doc: problem statement, personas, use cases | ⬜ TODO | TBD |
| E2 | Include Copilot + CLI integration concept | ⬜ TODO | Same doc |
| E3 | Incorporate customer research findings | ⬜ TODO | Same doc |
| E4 | Share with Aviv, Alon for feedback | ⬜ TODO | N/A |
| E5 | Present to leadership for H1 2026 planning | ⬜ TODO | N/A |

### Workstream F: CVP Visit Preparation (Kim Manis, Dec 10-11)
> **Status:** Planning in progress

| Task ID | Task | Status | Deliverable Location |
|---------|------|--------|---------------------|
| F1 | Prepare talking points for Automation & Embed Product Review | ⬜ TODO | TBD |
| F2 | Prepare demo for 1:1 with Kim (AI + MCP + CLI) | ⬜ TODO | Demo script |
| F3 | Create one-pager summary of MCP/CLI status and roadmap | ⬜ TODO | PDF or PPT |
| F4 | Anticipate Laurent's technical questions on MCP | ⬜ TODO | Notes |

---

## 🗂️ Key Files in This Workspace

```
/Users/hasan-msft/msft-dev/my-pm-work/
├── final-presentations/
│   └── 20251129-partner-voice-webcast-outline.md  ← Partner Voice presentation
├── mcp/
│   ├── specs/
│   │   ├── local-mcp/
│   │   │   └── 20251124-FABRIC-LOCAL-MCP-SPEC-V3.md
│   │   └── remote-mcp/
│   │       └── 20251124-FABRIC-REMOTE-MCP-SPEC-V4.md
│   ├── FABRIC-MCPS-PLATFORM-SPEC.md
│   ├── MCP-SERVER-ITEM-EXPLORATION.md
│   └── UNIFIED-FABRIC-MCP-VISION.md
├── cli/
│   ├── cli-v2.md
│   └── cli-in-the-web/
│       └── Screener - CLI study.md  ← Research screener
├── personal-work-plans/
│   └── 20251130-20251111/
│       ├── context-on-my-current-work.md  ← Full context document
│       └── 20251130-work-plan-and-tasks.md  ← THIS FILE
└── general-context-and-instructions/
    ├── FABRIC-FEATURE-SPEC-TEMPLATE-PROFESSIONAL.md
    ├── fabric-personas-nov2025.md
    └── spec-guidelines.md
```

---

## 🤖 How to Use This Document with an AI Agent

### To start a new conversation with an AI agent:

1. **Reference this file first:**
   ```
   "Read the file at /Users/hasan-msft/msft-dev/my-pm-work/personal-work-plans/20251130-20251111/20251130-work-plan-and-tasks.md to understand my work context."
   ```

2. **Then specify the task by ID:**
   ```
   "Help me with Task [ID] - [Task Name]"
   ```

### Example prompts:

- **"Help me with Task A2 - I need to create the PowerPoint slide deck for Partner Voice based on the outline in `final-presentations/20251129-partner-voice-webcast-outline.md`"**

- **"Help me with Task D1 - Draft the internal wiki for MCP platform onboarding. Reference the context about onboarding process from `personal-work-plans/20251130-20251111/context-on-my-current-work.md`"**

- **"Help me with Task B7 - I need to integrate the Unified Copilot requirements into my MCP specs. Review the current specs and suggest what to add."**

---

## 📚 Background Context (For Deep Dives)

For any task that requires more context, the AI agent should read:

| Context Needed | File to Read |
|----------------|--------------|
| Full meeting schedule, stakeholders, detailed background | `personal-work-plans/20251130-20251111/context-on-my-current-work.md` |
| Partner Voice presentation structure | `final-presentations/20251129-partner-voice-webcast-outline.md` |
| Remote MCP Spec details | `mcp/specs/remote-mcp/20251124-FABRIC-REMOTE-MCP-SPEC-V4.md` |
| Local MCP Spec details | `mcp/specs/local-mcp/20251124-FABRIC-LOCAL-MCP-SPEC-V3.md` |
| Unified MCP Vision | `mcp/UNIFIED-FABRIC-MCP-VISION.md` |
| Fabric personas for user research | `general-context-and-instructions/fabric-personas-nov2025.md` |

---

## 🎯 Immediate Priorities (Next 48 Hours)

### Sunday Nov 30 (Today)
1. ✅ Partner Voice outline - DONE
2. 🔄 Review CLI study guide (Task C1)
3. ⬜ Finalize MCP specs and send for review (Task B3)

### Monday Dec 1
1. ⬜ Final Partner Voice deck and dry run (Tasks A2, A4)
2. ⬜ Draft MCP onboarding wiki (Task D1)
3. ⬜ Attend CLI bi-weekly sync (inform on research)

### Tuesday Dec 2
1. 🎤 **Partner Voice Webcast at 6 PM** (Task A1-A5)
2. 📋 **Remote MCP Spec Review at 2:05 PM** (Task B4)

---

## 📝 Key Talking Points to Remember

### About Fabric CLI:
- GA since May 2025
- "Thousands of developers" have tried it
- Filesystem-like metaphor: `fab ls`, `fab cd`, `fab cp`
- Scriptable, CI/CD ready, works with any terminal

### About MCP (Model Context Protocol):
- **Local MCP:** Runs on user's machine/VS Code, enables AI agents to interact with Fabric APIs + local files
- **Remote MCP:** Cloud-hosted service (Private Preview Jan 2026, Public Preview March 2026 at FabCon Atlanta)
- MCP is an open standard that connects AI assistants to external tools
- Key value: AI agents can safely execute Fabric operations while respecting permissions

### About the Unified Copilot Vision:
- Single "Creator" Copilot agent across all Fabric workloads
- Uses MCP for basic cross-workload operations (CRUD)
- Workloads can opt-out or enhance specific capabilities
- Goal: Consistent experience, avoid siloed agents per product

---

## 📞 Key Contacts

| Person | Role | Relevance |
|--------|------|-----------|
| Alon Baram | PM Manager | Direct manager, spec approvals |
| Aviv Ezrachi | Group PM Lead | Strategic direction, vision approval |
| Mahir Diab | Engineering Lead | MCP technical implementation |
| Kim Manis | CVP of Product | Executive sponsor, Dec 11 meeting |
| Laurent Mollicone | CVP Azure Data | Technical questions on MCP |
| Avishag Spillinger | UX Researcher | CLI research study |
| Stephanie Chimeziri | Partner Voice PM | Webcast coordination |
| data-goblin | Community (GitHub) | fabric-cli-plugin creator |

---

## ✅ Definition of Done

### For Partner Voice (Dec 2):
- [ ] Slide deck finalized and uploaded
- [ ] Demo environment tested and working
- [ ] Backup materials ready (screenshots/video)
- [ ] Polls created in Mentimeter/Forms
- [ ] Joined presenter call 5 min early

### For MCP Spec Reviews (Dec 2-3):
- [ ] Specs sent to all stakeholders 24h before
- [ ] Key discussion points prepared
- [ ] Open questions listed for resolution
- [ ] Meeting notes documented after

### For Kim 1:1 (Dec 11):
- [ ] Demo prepared and tested
- [ ] One-pager with status/roadmap ready
- [ ] Prepared for Laurent's technical questions
- [ ] Clear ask/next steps to propose

---

*Last Updated: November 30, 2025*
