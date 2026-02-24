# Partner Voice Webcast - Preparation Plan
**Event:** AI-Powered Automation in Fabric with MCP  
**Date:** December 2, 2025 | 6:00 PM Israel (8:00 AM PT)  
**Presenter:** Hasan Abo Shally  
**Duration:** 60 minutes

---

## 📊 Preparation Status

| Task | Status | Est. Time | Priority |
|------|--------|-----------|----------|
| Presentation outline | ✅ DONE | - | - |
| Slide deck (PowerPoint) | 🔄 IN PROGRESS | 2 hours | 🔴 HIGH |
| Demo environment setup | 🔄 IN PROGRESS | 30 min | 🔴 HIGH |
| Demo scripts (exact commands) | ✅ DONE | - | - |
| Demo research & additional ideas | ✅ DONE | - | - |
| Speaker notes | ✅ DONE | - | - |
| Architecture diagrams | ✅ DONE | - | - |
| Dry run checklist | ✅ DONE | - | - |
| Backup materials guide | ✅ DONE | - | - |
| Poll questions | ✅ DONE | - | - |
| Backup folder structure | ✅ DONE | - | - |
| Demo 3 backup scripts | ✅ DONE | - | - |
| Setup automation script | ✅ DONE | - | - |
| Dry run practice | ⬜ TODO | 45 min | 🟡 MEDIUM |

**Total Remaining Prep Time:** ~2.5 hours

### 🔧 Demo Environment Status
- **Fabric CLI:** ✅ Installed (v1.2.0)
- **CLI Authentication:** ⚠️ Need to login (`fab auth login`)
- **Demo Workspaces:** ⬜ Need to verify/create
- **Setup Script:** ✅ Ready at `./setup-demo-env.sh`

---

## 🗓️ Preparation Timeline

### Phase 1: Content Creation (Morning - Dec 1)
**Target: 10:00 AM - 1:00 PM**

#### 1.1 Slide Deck Creation (2 hours)
Create PowerPoint based on the outline in `20251129-partner-voice-webcast-outline.md`

**Slide Structure:**
| # | Slide Title | Content | Time |
|---|-------------|---------|------|
| 1 | Title Slide | "AI-Powered Automation in Fabric with MCP" + Partner Voice branding | - |
| 2 | Agenda | 4 sections overview | 1 min |
| 3 | The Challenge | Manual Fabric management pain points | 2 min |
| 4 | The Solution Stack | CLI → MCP → AI Agents diagram | 2 min |
| 5 | Demo 1 Title | "Fabric CLI Basics" | - |
| 6 | CLI Commands Reference | Key commands cheat sheet (visual) | 1 min |
| 7 | Demo 2 Title | "Community Innovation: fabric-cli-plugin" | - |
| 8 | fabric-cli-plugin Overview | GitHub link, capabilities | 1 min |
| 9 | What is MCP? | Model Context Protocol explanation | 3 min |
| 10 | Local vs Remote MCP | Comparison table | 2 min |
| 11 | Demo 3 Title | "AI Agent + CLI Integration" | - |
| 12 | Demo 4 Title | "Security Officer Web App" | - |
| 13 | Architecture Diagram | Full stack: User → Copilot → MCP → Fabric | 2 min |
| 14 | Roadmap | Timeline: Jan 2026 Private Preview, Mar 2026 Public Preview | 3 min |
| 15 | Private Preview Invitation | Call to action + contact info | 2 min |
| 16 | Q&A | Questions slide | - |
| 17 | Resources | Links to CLI docs, MCP, fabric-cli-plugin | - |

**Visual Assets Needed:**
- [ ] Solution stack diagram (CLI → MCP → AI)
- [ ] Architecture diagram (User → Copilot → MCP → Fabric APIs)
- [ ] Roadmap timeline graphic
- [ ] Screenshot of fabric-cli-plugin GitHub page

#### 1.2 Create Demo Scripts (30 min)
Document exact commands for each demo scenario.

**File to create:** `demo-scripts.md`

---

### Phase 2: Demo Environment Setup (Afternoon - Dec 1)
**Target: 2:00 PM - 3:30 PM**

#### 2.1 CLI Environment Verification (30 min)

**Pre-flight Checklist:**
```bash
# 1. Verify CLI is installed and updated
fab --version

# 2. Check authentication status
fab auth status

# 3. If not authenticated, login
fab auth login

# 4. Verify you can list workspaces
fab ls

# 5. Check you have demo workspaces
fab ls "Demo-*"
```

#### 2.2 Create Demo Workspaces (30 min)

**Required Workspaces:**
| Workspace Name | Purpose | Items to Create |
|----------------|---------|-----------------|
| `Demo-Development` | Source workspace for migration demo | 3-5 sample reports |
| `Demo-Production` | Target workspace | Empty |
| `Demo-Partner-Voice` | Live demo workspace | 1 Lakehouse, 1 Notebook |

**Commands to Run:**
```bash
# Create demo workspaces
fab mkdir "Demo-Development.Workspace"
fab mkdir "Demo-Production.Workspace"
fab mkdir "Demo-Partner-Voice.Workspace"

# Verify creation
fab ls "Demo-*.Workspace"
```

#### 2.3 Test Each Demo Scenario (30 min)

Run through each demo command to ensure it works:

**Demo 1 - CLI Basics:**
```bash
fab ls
fab ls "Demo-Partner-Voice.Workspace" -l
fab get "Demo-Partner-Voice.Workspace"
```

**Demo 3 - Batch Rename Scenario:**
```bash
# Test listing items
fab ls "Demo-Development.Workspace" -l

# Test getting item details
fab get "Demo-Development.Workspace/SampleReport.Report"
```

---

### Phase 3: Backup & Polish (Late Afternoon - Dec 1)
**Target: 4:00 PM - 5:30 PM**

#### 3.1 Create Backup Materials (30 min)

**Screenshots to Capture:**
- [ ] Terminal showing `fab ls` output with workspaces
- [ ] Terminal showing `fab ls <workspace> -l` with items
- [ ] fabric-cli-plugin GitHub page
- [ ] Claude/Copilot generating CLI commands (if possible)
- [ ] Security Officer web app UI (if available)

**Backup Video (Optional):**
- Record a 3-minute video of Demo 1 (CLI basics) as fallback

#### 3.2 Create Polls in Microsoft Forms (15 min)

**Poll 1: Opening Icebreaker**
- Title: "How are you currently automating tasks in Fabric?"
- Options: Manual only, PowerShell/REST, Fabric CLI, AI assistants, CI/CD pipelines, Not automating

**Poll 2: Mid-Session**
- Title: "What would you most like to automate in Fabric?"
- Options: Workspace provisioning, Pipeline orchestration, Security checks, Deployments, Capacity management, Other

**Poll 3: Closing**
- Title: "How likely are you to use AI agents for Fabric automation?"
- Options: 1-5 scale

#### 3.3 Dry Run Practice (45 min)

**Practice Session Structure:**
1. **Solo run-through** (30 min)
   - Talk through slides out loud
   - Execute demo commands
   - Time yourself (target: 45 min content)

2. **Identify weak spots** (10 min)
   - Note any slides that feel rushed or unclear
   - Mark commands that might fail

3. **Final adjustments** (5 min)
   - Trim if over time
   - Add transitions if needed

---

### Phase 4: Day-of Preparation (Dec 2)
**Target: 5:00 PM - 5:55 PM (before 6 PM event)**

#### 4.1 Technical Setup (30 min before)

**Environment Check:**
- [ ] Stable internet connection verified
- [ ] Teams working (camera, mic)
- [ ] Terminal open with large, readable font (16pt+)
- [ ] Browser ready with:
  - [ ] Fabric Portal logged in
  - [ ] Poll links ready to share
  - [ ] fabric-cli-plugin GitHub page open
- [ ] PowerPoint in presentation mode tested
- [ ] Notifications disabled (Do Not Disturb ON)
- [ ] Backup slides/screenshots accessible

**CLI Re-verification:**
```bash
fab auth status  # Confirm still authenticated
fab ls           # Quick test
```

#### 4.2 Join Presenter Session (5 min before)

- Join the "Present to Partner Voice" meeting at 5:55 PM
- Confirm with Stephanie/coordinator you're ready
- Share screen, test audio

---

## 📁 Files to Create/Reference

| File | Location | Purpose |
|------|----------|---------|
| Presentation Outline | `final-presentations/20251129-partner-voice-webcast-outline.md` | ✅ Complete |
| Prep Plan | `prep-plan.md` | ✅ This file |
| Demo Scripts | `demo-scripts.md` | ✅ Complete |
| Demo Research | `demo-research-summary.md` | ✅ Complete |
| Poll Questions | `poll-questions.md` | ✅ Complete |
| Speaker Notes | `speaker-notes.md` | ✅ Complete |
| Architecture Diagrams | `architecture-diagrams.md` | ✅ Complete |
| Backup Materials Guide | `backup-materials-guide.md` | ✅ Complete |
| Dry Run Checklist | `dry-run-checklist.md` | ✅ Complete |
| Setup Script | `final-presentations/partner-voice-dec-2025/setup-demo-env.sh` | ✅ Complete |
| Backup Folder Structure | `final-presentations/partner-voice-dec-2025/backups/` | ✅ Complete |
| Demo 3 Backup Scripts | `final-presentations/partner-voice-dec-2025/backups/demo-3-ai-agent/scripts/` | ✅ Complete |
| Demo 3 Chat Transcript | `final-presentations/partner-voice-dec-2025/backups/demo-3-ai-agent/sample-chat-transcript.md` | ✅ Complete |
| Slide Deck | `[PowerPoint file]` | 🔄 In progress |
| Backup Screenshots | `final-presentations/partner-voice-dec-2025/backups/` | ⬜ To capture |

---

## 🎯 Key Success Criteria

Before going live, confirm:

- [ ] **Slides:** All 17 slides complete with visuals
- [ ] **Demos:** All 4 demos tested and working
- [ ] **Auth:** CLI authenticated and verified
- [ ] **Polls:** 3 polls created with shareable links
- [ ] **Backup:** Screenshots captured for each demo
- [ ] **Practice:** At least one full dry run completed
- [ ] **Tech:** Teams, terminal, browser all tested

---

## ⚠️ Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Live demo fails | Have screenshots ready, narrate what "would happen" |
| CLI auth expires | Re-authenticate 30 min before; have `fab auth login` ready |
| Internet issues | Backup slides with embedded screenshots |
| Over time | Know which sections to cut (Demo 2 is most cuttable) |
| Tough Q&A question | "Great question - let's take that to the roundtables on Dec 16/18" |

---

## 📞 Quick Contacts

| Who | Role | When to Contact |
|-----|------|-----------------|
| Stephanie Chimeziri | Partner Voice coordinator | Logistics issues |
| Ted Pattison | Stakeholder | If escalation needed |
| Alon Baram | Manager | If major issue arises |

---

## ✅ Final Checklist (Night Before)

- [ ] Laptop charged / plugged in
- [ ] Presentation saved locally AND in OneDrive
- [ ] Demo workspaces verified
- [ ] Poll links copied to notes
- [ ] Water bottle ready
- [ ] Alarm set for 4:30 PM Dec 2

---

*Last Updated: December 1, 2025*
