# Backup Materials & Screenshots Guide
## Partner Voice Webcast: AI-Powered Automation in Fabric with MCP

**Document Created:** December 1, 2025  
**Session Date:** December 2024  
**Presenter Preparation Checklist**

---

## 📁 File Organization

### Folder Structure

```
backup-materials/
├── demo-1-cli-basics/
│   ├── screenshots/
│   │   ├── 01-fabric-help.png
│   │   ├── 02-workspace-list.png
│   │   ├── 03-item-create.png
│   │   └── 04-pipeline-trigger.png
│   └── videos/
│       └── demo-1-full-recording.mp4
├── demo-2-data-goblin/
│   ├── screenshots/
│   │   ├── 01-github-readme.png
│   │   ├── 02-github-tools.png
│   │   ├── 03-claude-config.png
│   │   ├── 04-claude-conversation-1.png
│   │   ├── 05-claude-conversation-2.png
│   │   └── 06-fabric-result.png
│   └── videos/
│       └── demo-2-full-recording.mp4
├── demo-3-ai-agent/
│   ├── screenshots/
│   │   ├── 01-initial-prompt.png
│   │   ├── 02-ai-questions.png
│   │   ├── 03-generated-script.png
│   │   ├── 04-before-workspace.png
│   │   ├── 05-after-workspace.png
│   │   └── 06-execution-log.png
│   ├── scripts/
│   │   └── generated-automation-script.sh
│   └── videos/
│       └── demo-3-full-recording.mp4
├── demo-4-security-app/
│   ├── screenshots/
│   │   ├── 01-app-homepage.png
│   │   ├── 02-workspace-selector.png
│   │   ├── 03-scan-in-progress.png
│   │   ├── 04-security-report.png
│   │   ├── 05-detailed-findings.png
│   │   └── 06-export-report.png
│   ├── reports/
│   │   └── sample-security-report.pdf
│   └── videos/
│       └── demo-4-full-recording.mp4
├── diagrams/
│   ├── mcp-architecture.png
│   ├── fabric-cli-flow.png
│   └── security-app-architecture.png
└── fallback-slides/
    └── demo-backup-slides.pptx
```

---

## 📸 Demo 1: Fabric CLI Basics

### Screenshot Capture List

#### Screenshot 1-1: Fabric CLI Help Command
**Command to run:**
```bash
fabric --help
```

**Expected output to capture:**
```
Fabric CLI - Command-line interface for Microsoft Fabric

Usage: fabric [command] [options]

Commands:
  workspace    Manage Fabric workspaces
  item         Manage Fabric items (notebooks, pipelines, etc.)
  lakehouse    Manage Lakehouse operations
  pipeline     Manage and trigger data pipelines
  notebook     Manage and execute notebooks
  capacity     Manage Fabric capacities
  auth         Authentication commands

Options:
  --version    Show version number
  --help       Show help information
  --output     Output format (json, table, yaml)
```

**File name:** `demo-1-cli-basics/screenshots/01-fabric-help.png`

---

#### Screenshot 1-2: List Workspaces
**Command to run:**
```bash
fabric workspace list --output table
```

**Expected output to capture:**
```
┌──────────────────────────────────────┬─────────────────────────┬──────────┐
│ ID                                   │ Name                    │ Type     │
├──────────────────────────────────────┼─────────────────────────┼──────────┤
│ a1b2c3d4-e5f6-7890-abcd-ef1234567890 │ Sales Analytics         │ Workspace│
│ b2c3d4e5-f6a7-8901-bcde-f23456789012 │ Marketing Dashboard     │ Workspace│
│ c3d4e5f6-a7b8-9012-cdef-345678901234 │ Finance Reports         │ Workspace│
│ d4e5f6a7-b8c9-0123-def0-456789012345 │ Demo-Partner-Voice      │ Workspace│
└──────────────────────────────────────┴─────────────────────────┴──────────┘
```

**File name:** `demo-1-cli-basics/screenshots/02-workspace-list.png`

---

#### Screenshot 1-3: Create Item (Notebook)
**Command to run:**
```bash
fabric item create \
  --workspace "Demo-Partner-Voice" \
  --type notebook \
  --name "Partner-Demo-Notebook" \
  --description "Created via CLI for demo"
```

**Expected output to capture:**
```
✓ Creating notebook 'Partner-Demo-Notebook'...
✓ Notebook created successfully!

Item Details:
  ID:          e5f6a7b8-c9d0-1234-ef01-567890123456
  Name:        Partner-Demo-Notebook
  Type:        Notebook
  Workspace:   Demo-Partner-Voice
  Created:     2024-12-XX XX:XX:XX UTC
  Created By:  presenter@contoso.com
```

**File name:** `demo-1-cli-basics/screenshots/03-item-create.png`

---

#### Screenshot 1-4: Trigger Pipeline
**Command to run:**
```bash
fabric pipeline trigger \
  --workspace "Demo-Partner-Voice" \
  --name "Daily-Sales-Pipeline" \
  --wait
```

**Expected output to capture:**
```
✓ Triggering pipeline 'Daily-Sales-Pipeline'...
✓ Pipeline run started: run-id-abc123

Monitoring pipeline execution...
  [████████████████████] 100%

✓ Pipeline completed successfully!

Run Summary:
  Run ID:       run-id-abc123
  Status:       Succeeded
  Duration:     2m 34s
  Activities:   5/5 completed
```

**File name:** `demo-1-cli-basics/screenshots/04-pipeline-trigger.png`

---

### Demo 1 Video Recording Instructions

1. **Duration:** 2-3 minutes
2. **Resolution:** 1920x1080
3. **Steps to record:**
   - Open terminal with clean prompt
   - Show `fabric --help` 
   - Run `fabric workspace list`
   - Create a notebook item
   - Trigger a pipeline
   - Show success messages
4. **Narration:** Include voice-over explaining each step
5. **File name:** `demo-1-cli-basics/videos/demo-1-full-recording.mp4`

---

## 📸 Demo 2: fabric-cli-plugin (data-goblin)

### Screenshot Capture List

#### Screenshot 2-1: GitHub Repository README
**What to capture:**
- Navigate to: `https://github.com/data-goblin/fabric-cli-plugin`
- Capture the full README section showing:
  - Repository name and description
  - Installation instructions
  - Features list
  - "Works with Claude Desktop" badge

**File name:** `demo-2-data-goblin/screenshots/01-github-readme.png`

---

#### Screenshot 2-2: GitHub Tools/Commands Section
**What to capture:**
- Scroll to the tools/commands documentation
- Show the list of available MCP tools:
  ```
  Available Tools:
  - fabric_workspace_list
  - fabric_workspace_create
  - fabric_item_list
  - fabric_item_create
  - fabric_pipeline_trigger
  - fabric_notebook_execute
  - fabric_lakehouse_query
  ```

**File name:** `demo-2-data-goblin/screenshots/02-github-tools.png`

---

#### Screenshot 2-3: Claude Desktop Configuration
**What to capture:**
- Claude Desktop Settings → MCP Configuration
- Show the config file with fabric-cli-plugin entry:
  ```json
  {
    "mcpServers": {
      "fabric-cli": {
        "command": "npx",
        "args": ["-y", "@anthropic/fabric-cli-plugin"],
        "env": {
          "FABRIC_AUTH_METHOD": "azure-cli"
        }
      }
    }
  }
  ```
- Show green "Connected" status indicator

**File name:** `demo-2-data-goblin/screenshots/03-claude-config.png`

---

#### Screenshot 2-4: Claude Conversation - Initial Request
**What to capture:**
User prompt:
```
"List all my Fabric workspaces and tell me which one has the most items"
```

Claude's response showing:
- Tool call to `fabric_workspace_list`
- Processing indicator
- Initial results

**File name:** `demo-2-data-goblin/screenshots/04-claude-conversation-1.png`

---

#### Screenshot 2-5: Claude Conversation - Results & Analysis
**What to capture:**
Claude's full response:
```
I found 4 workspaces in your Fabric environment:

📊 Workspace Analysis:
┌─────────────────────┬────────────┬─────────────┐
│ Workspace           │ Items      │ Last Active │
├─────────────────────┼────────────┼─────────────┤
│ Sales Analytics     │ 23 items   │ Today       │
│ Marketing Dashboard │ 15 items   │ Yesterday   │
│ Finance Reports     │ 12 items   │ 3 days ago  │
│ Demo-Partner-Voice  │ 4 items    │ Just now    │
└─────────────────────┴────────────┴─────────────┘

The "Sales Analytics" workspace has the most items (23).
Would you like me to show you the details of any specific workspace?
```

**File name:** `demo-2-data-goblin/screenshots/05-claude-conversation-2.png`

---

#### Screenshot 2-6: Fabric Portal Verification
**What to capture:**
- Fabric portal showing the workspace that was queried
- Item count matching Claude's response
- Timestamp showing recent activity

**File name:** `demo-2-data-goblin/screenshots/06-fabric-result.png`

---

### Demo 2 Video Recording Instructions

1. **Duration:** 3-4 minutes
2. **Resolution:** 1920x1080
3. **Steps to record:**
   - Show GitHub repository briefly
   - Open Claude Desktop
   - Show MCP connection status
   - Type natural language request
   - Show Claude calling Fabric tools
   - Display results
   - Optionally verify in Fabric portal
4. **File name:** `demo-2-data-goblin/videos/demo-2-full-recording.mp4`

---

## 📸 Demo 3: AI Agent + CLI Integration

### Screenshot Capture List

#### Screenshot 3-1: Initial User Prompt
**What to capture:**
AI chat interface with prompt:
```
"I need to set up a new analytics project. Create a workspace 
called 'Q4-Sales-Analysis-2024' with a lakehouse for raw data, 
a notebook for transformation, and a pipeline that runs daily 
at 6 AM to refresh the data."
```

**File name:** `demo-3-ai-agent/screenshots/01-initial-prompt.png`

---

#### Screenshot 3-2: AI Clarifying Questions
**What to capture:**
AI response asking for clarification:
```
I'll help you set up this analytics project. A few questions 
to ensure I configure it correctly:

1. **Capacity**: Should I use your default capacity or a specific one?
2. **Lakehouse Schema**: Do you want me to create any initial 
   tables or folders in the lakehouse?
3. **Notification**: Should the pipeline send email notifications 
   on failure?
4. **Access**: Who else needs contributor access to this workspace?

Please provide these details, or I can proceed with defaults.
```

**File name:** `demo-3-ai-agent/screenshots/02-ai-questions.png`

---

#### Screenshot 3-3: Generated Automation Script
**What to capture:**
AI showing the generated script:
```bash
#!/bin/bash
# Generated by AI Agent - Q4 Sales Analysis Setup
# Created: 2024-12-XX

echo "🚀 Starting Q4 Sales Analysis workspace setup..."

# Step 1: Create Workspace
fabric workspace create \
  --name "Q4-Sales-Analysis-2024" \
  --capacity "default" \
  --description "Q4 2024 Sales Analysis Project"

# Step 2: Create Lakehouse
fabric lakehouse create \
  --workspace "Q4-Sales-Analysis-2024" \
  --name "RawDataLakehouse" \
  --description "Raw data ingestion layer"

# Step 3: Create Transformation Notebook  
fabric notebook create \
  --workspace "Q4-Sales-Analysis-2024" \
  --name "DataTransformation" \
  --description "ETL transformations" \
  --template "python-spark"

# Step 4: Create Daily Pipeline
fabric pipeline create \
  --workspace "Q4-Sales-Analysis-2024" \
  --name "Daily-Refresh-Pipeline" \
  --schedule "0 6 * * *" \
  --description "Daily data refresh at 6 AM"

# Step 5: Link Pipeline to Notebook
fabric pipeline add-activity \
  --workspace "Q4-Sales-Analysis-2024" \
  --pipeline "Daily-Refresh-Pipeline" \
  --type notebook \
  --notebook "DataTransformation"

echo "✅ Setup complete! Workspace ready at:"
echo "   https://app.fabric.microsoft.com/..."
```

**File name:** `demo-3-ai-agent/screenshots/03-generated-script.png`  
**Also save script:** `demo-3-ai-agent/scripts/generated-automation-script.sh`

---

#### Screenshot 3-4: Before State - Empty/Missing Workspace
**What to capture:**
- Fabric portal showing workspace list
- Highlight that "Q4-Sales-Analysis-2024" does NOT exist
- Show workspace count (e.g., "4 workspaces")

**File name:** `demo-3-ai-agent/screenshots/04-before-workspace.png`

---

#### Screenshot 3-5: After State - Workspace Created
**What to capture:**
- Fabric portal showing the NEW workspace "Q4-Sales-Analysis-2024"
- Show the items inside:
  - RawDataLakehouse
  - DataTransformation notebook
  - Daily-Refresh-Pipeline
- Show workspace count increased (e.g., "5 workspaces")

**File name:** `demo-3-ai-agent/screenshots/05-after-workspace.png`

---

#### Screenshot 3-6: Execution Log
**What to capture:**
Terminal/console showing execution output:
```
🚀 Starting Q4 Sales Analysis workspace setup...

[1/5] Creating workspace 'Q4-Sales-Analysis-2024'...
      ✓ Workspace created (ID: xxx-xxx-xxx)

[2/5] Creating lakehouse 'RawDataLakehouse'...
      ✓ Lakehouse created (ID: xxx-xxx-xxx)

[3/5] Creating notebook 'DataTransformation'...
      ✓ Notebook created (ID: xxx-xxx-xxx)

[4/5] Creating pipeline 'Daily-Refresh-Pipeline'...
      ✓ Pipeline created (ID: xxx-xxx-xxx)
      ✓ Schedule configured: Daily at 6:00 AM UTC

[5/5] Linking notebook to pipeline...
      ✓ Activity added successfully

✅ Setup complete! 
   Total time: 45 seconds
   Workspace URL: https://app.fabric.microsoft.com/groups/xxx
```

**File name:** `demo-3-ai-agent/screenshots/06-execution-log.png`

---

### Demo 3 Video Recording Instructions

1. **Duration:** 4-5 minutes
2. **Resolution:** 1920x1080
3. **Steps to record:**
   - Show Fabric portal (before state)
   - Switch to AI agent interface
   - Enter natural language request
   - Show AI's clarifying questions
   - Provide answers
   - Show generated script
   - Execute script (or show execution)
   - Return to Fabric portal
   - Navigate to new workspace
   - Show all created items
4. **File name:** `demo-3-ai-agent/videos/demo-3-full-recording.mp4`

---

## 📸 Demo 4: Security Officer Web App

### Screenshot Capture List

#### Screenshot 4-1: App Homepage
**What to capture:**
- Web app landing page
- App title: "Fabric Security Compliance Scanner"
- Login/authentication status
- Main navigation menu
- Quick stats dashboard (if visible)

**Key elements to highlight:**
- Professional UI design
- Security-focused branding
- Easy-to-use interface

**File name:** `demo-4-security-app/screenshots/01-app-homepage.png`

---

#### Screenshot 4-2: Workspace Selector
**What to capture:**
- Dropdown or list showing available workspaces
- Search/filter functionality
- Workspace details (name, item count, last scanned)
- "Scan Selected" button

**Example display:**
```
Select Workspaces to Scan:

☑️ Sales Analytics          (23 items, Last scan: 2 days ago)
☑️ Marketing Dashboard      (15 items, Never scanned)
☐ Finance Reports          (12 items, Last scan: 1 week ago)
☑️ Demo-Partner-Voice       (4 items, Never scanned)

[3 workspaces selected]

        [🔍 Start Security Scan]
```

**File name:** `demo-4-security-app/screenshots/02-workspace-selector.png`

---

#### Screenshot 4-3: Scan In Progress
**What to capture:**
- Progress indicator/loading animation
- Current workspace being scanned
- Real-time status updates
- Estimated time remaining

**Example display:**
```
🔍 Security Scan in Progress...

Scanning: Marketing Dashboard
Progress: ████████░░░░░░░░░░░░ 40%

Checks completed:
✓ Data sensitivity classification
✓ Access permissions audit
⏳ Sharing settings review
◯ External access check
◯ Compliance policy validation

Estimated time remaining: 45 seconds
```

**File name:** `demo-4-security-app/screenshots/03-scan-in-progress.png`

---

#### Screenshot 4-4: Security Report Summary
**What to capture:**
- Overall security score/grade
- Summary statistics
- Risk breakdown by category
- Visual charts/graphs

**Example display:**
```
📊 Security Scan Results

Overall Security Score: 78/100 (Good)

┌─────────────────────────────────────────────────────┐
│  Risk Summary                                        │
├──────────────────┬──────────────────────────────────┤
│ 🔴 Critical      │ 2 issues                         │
│ 🟠 High          │ 5 issues                         │
│ 🟡 Medium        │ 12 issues                        │
│ 🟢 Low           │ 8 issues                         │
│ ✅ Passed        │ 45 checks                        │
└──────────────────┴──────────────────────────────────┘

Top Concerns:
1. External sharing enabled on sensitive data (Critical)
2. Service principal with excessive permissions (Critical)
3. No row-level security on customer data (High)
```

**File name:** `demo-4-security-app/screenshots/04-security-report.png`

---

#### Screenshot 4-5: Detailed Findings
**What to capture:**
- Expanded view of a specific finding
- Remediation steps
- Affected items
- Policy reference

**Example display:**
```
🔴 CRITICAL FINDING

Issue: External Sharing Enabled on Sensitive Data
Workspace: Sales Analytics
Affected Items: CustomerData.lakehouse, SalesTransactions.dataset

Description:
The 'CustomerData' lakehouse contains PII (email, phone, address) 
and has external sharing enabled, potentially exposing customer 
information to unauthorized parties.

Remediation Steps:
1. Navigate to Workspace Settings → Sharing
2. Disable "Allow external sharing" for sensitive items
3. Review and revoke existing external shares
4. Enable sensitivity labels on PII columns

Policy Reference: GDPR Article 32, SOC 2 CC6.1

        [Mark as Reviewed]  [Create Ticket]  [Ignore Risk]
```

**File name:** `demo-4-security-app/screenshots/05-detailed-findings.png`

---

#### Screenshot 4-6: Export Report
**What to capture:**
- Export options dialog
- Format selection (PDF, Excel, JSON)
- Email/share options
- Download confirmation

**Example display:**
```
📥 Export Security Report

Report: Security Scan - December 2024
Workspaces: 3 scanned

Export Format:
● PDF Report (Executive Summary)
○ Excel Workbook (Detailed Data)
○ JSON (API Integration)

Include:
☑️ Executive Summary
☑️ Detailed Findings
☑️ Remediation Steps
☑️ Compliance Mapping
☐ Raw Scan Data

        [📧 Email Report]  [⬇️ Download]
```

**File name:** `demo-4-security-app/screenshots/06-export-report.png`  
**Also save:** `demo-4-security-app/reports/sample-security-report.pdf`

---

#### Screenshot 4-7: Architecture Diagram
**What to capture:**
- High-level architecture diagram showing:
  - Web App frontend
  - Backend API
  - MCP Server connection
  - Fabric CLI integration
  - Authentication flow

**File name:** `diagrams/security-app-architecture.png`

---

### Demo 4 Video Recording Instructions

1. **Duration:** 4-5 minutes
2. **Resolution:** 1920x1080
3. **Steps to record:**
   - Open web app in browser
   - Show login/authentication
   - Navigate to workspace selector
   - Select workspaces for scanning
   - Start scan and show progress
   - Display results and security score
   - Drill into a specific finding
   - Show remediation steps
   - Export report
4. **File name:** `demo-4-security-app/videos/demo-4-full-recording.mp4`

---

## ✅ Screenshot Capture Checklist

### Pre-Capture Preparation

- [ ] **Clean desktop** - Remove unnecessary icons and windows
- [ ] **Browser setup** - Clear history, use incognito if needed
- [ ] **Terminal setup** - Use clean prompt, appropriate font size (14-16pt)
- [ ] **Screen resolution** - Set to 1920x1080 for consistency
- [ ] **Zoom level** - Browser at 100%, terminal readable
- [ ] **Dark/Light mode** - Choose consistent theme for all screenshots
- [ ] **Notifications OFF** - Disable all system notifications
- [ ] **Personal info** - Hide/blur any sensitive email addresses or names
- [ ] **Time/date visible** - Ensure system clock shows (for authenticity)

### Capture Tools

**Recommended:**
- **macOS:** Built-in Screenshot (Cmd+Shift+4) or CleanShot X
- **Windows:** Snipping Tool or ShareX
- **Cross-platform:** Greenshot, Lightshot

**Settings:**
- Format: PNG (for quality)
- Include cursor: No (unless showing interaction)
- Include shadow: Optional (consistent choice)

---

### Demo 1 Capture Checklist

- [ ] Open terminal with clean session
- [ ] Run `fabric --help` → Capture output
- [ ] Run `fabric workspace list` → Capture table
- [ ] Run `fabric item create` → Capture success message
- [ ] Run `fabric pipeline trigger` → Capture execution
- [ ] Verify all 4 screenshots saved
- [ ] Record full video walkthrough

### Demo 2 Capture Checklist

- [ ] Open GitHub repository page
- [ ] Capture README section
- [ ] Capture Tools documentation section
- [ ] Open Claude Desktop
- [ ] Capture MCP configuration
- [ ] Start AI conversation
- [ ] Capture initial request
- [ ] Capture AI response with data
- [ ] Optionally capture Fabric verification
- [ ] Verify all 6 screenshots saved
- [ ] Record full video walkthrough

### Demo 3 Capture Checklist

- [ ] Open Fabric portal → Capture BEFORE state
- [ ] Open AI agent interface
- [ ] Enter multi-step request → Capture prompt
- [ ] Capture AI clarifying questions
- [ ] Capture generated script (and save .sh file)
- [ ] Execute script → Capture log output
- [ ] Return to Fabric → Capture AFTER state
- [ ] Verify all 6 screenshots saved
- [ ] Verify script saved
- [ ] Record full video walkthrough

### Demo 4 Capture Checklist

- [ ] Open Security web app
- [ ] Capture homepage
- [ ] Navigate to workspace selector → Capture
- [ ] Start scan → Capture progress
- [ ] Capture results summary
- [ ] Click into finding → Capture details
- [ ] Export report → Capture dialog and save PDF
- [ ] Capture architecture diagram
- [ ] Verify all 7 screenshots saved
- [ ] Verify PDF report saved
- [ ] Record full video walkthrough

---

## 🎥 Video Recording Instructions

### Equipment & Settings

**Software Options:**
- **macOS:** QuickTime Player, OBS Studio, ScreenFlow
- **Windows:** OBS Studio, Camtasia, Xbox Game Bar
- **Cross-platform:** Loom, OBS Studio

**Recording Settings:**
- Resolution: 1920x1080 (1080p)
- Frame Rate: 30 fps
- Format: MP4 (H.264 codec)
- Audio: Include system audio + microphone
- Bitrate: 8-12 Mbps for quality

### Recording Checklist (Per Demo)

1. **Pre-recording:**
   - [ ] Close unnecessary applications
   - [ ] Disable notifications
   - [ ] Test audio levels
   - [ ] Prepare all windows/tabs needed
   - [ ] Clear browser cache/history
   - [ ] Restart terminal for clean session

2. **During recording:**
   - [ ] Speak clearly and at moderate pace
   - [ ] Pause 2-3 seconds between major steps
   - [ ] Highlight mouse movements (use pointer highlight tool)
   - [ ] Narrate what you're doing
   - [ ] If error occurs, explain and continue

3. **Post-recording:**
   - [ ] Review recording for quality
   - [ ] Trim start/end as needed
   - [ ] Verify audio is clear
   - [ ] Compress if file too large
   - [ ] Save with proper naming convention

---

## 🔄 Fallback Presentation Flow

### When to Use Fallback

Use backup materials when:
- Network/internet issues prevent live demo
- Authentication problems occur
- Fabric service is unavailable
- Time constraints require faster pacing
- Live demo fails unexpectedly

### Fallback Script Templates

#### Demo 1 Fallback Script

> "Let me show you what the Fabric CLI looks like in action. Due to [network constraints/time], I'll walk through these captured screenshots.
>
> *[Show 01-fabric-help.png]*
> Here you can see the main Fabric CLI help output. Notice the intuitive command structure - workspace, item, pipeline, notebook - these map directly to Fabric concepts.
>
> *[Show 02-workspace-list.png]*
> Running 'fabric workspace list' gives us a clean table view of all workspaces. You can see the workspace IDs, names, and types.
>
> *[Show 03-item-create.png]*
> Creating items is straightforward - we specify the workspace, type, name, and description. The CLI confirms successful creation with the item details.
>
> *[Show 04-pipeline-trigger.png]*
> And here's pipeline execution - we trigger with one command and can optionally wait for completion with progress updates.
>
> These are the foundational commands that power all automation scenarios."

---

#### Demo 2 Fallback Script

> "Let me walk you through the data-goblin fabric-cli-plugin.
>
> *[Show 01-github-readme.png]*
> This is an open-source MCP server that brings Fabric capabilities to AI assistants. You can find it on GitHub.
>
> *[Show 03-claude-config.png]*
> Configuration is simple - just add this entry to your Claude Desktop config. The plugin uses your existing Azure CLI authentication.
>
> *[Show 04-claude-conversation-1.png]*
> Here's what happens when you ask Claude to work with Fabric. I asked it to list my workspaces and find the one with most items.
>
> *[Show 05-claude-conversation-2.png]*
> Claude uses the MCP tools to query Fabric and returns this formatted analysis. No scripting required - just natural conversation.
>
> This is the power of MCP - turning complex CLI operations into simple AI interactions."

---

#### Demo 3 Fallback Script

> "Now for our AI Agent integration demo.
>
> *[Show 04-before-workspace.png]*
> Here's our starting state - notice we don't have the Q4 Sales Analysis workspace yet.
>
> *[Show 01-initial-prompt.png]*
> I gave the AI agent this natural language request - create a workspace with lakehouse, notebook, and scheduled pipeline.
>
> *[Show 02-ai-questions.png]*
> The agent asked clarifying questions to ensure proper configuration - this shows intelligent interaction, not just blind execution.
>
> *[Show 03-generated-script.png]*
> Based on my answers, it generated this complete automation script. Each step is documented and uses the Fabric CLI.
>
> *[Show 06-execution-log.png]*
> Here's the execution output - all five steps completed successfully in under a minute.
>
> *[Show 05-after-workspace.png]*
> And the result - a fully configured workspace with all components, ready for the analytics team to use.
>
> What would have taken 15-20 minutes manually took under 60 seconds with AI + CLI."

---

#### Demo 4 Fallback Script

> "Finally, let's look at our Security Officer web application.
>
> *[Show 01-app-homepage.png]*
> This custom app was built for our security team. It provides a specialized interface for compliance scanning.
>
> *[Show 02-workspace-selector.png]*
> Security officers can select which workspaces to audit. They see item counts and last scan dates.
>
> *[Show 03-scan-in-progress.png]*
> During scanning, real-time progress shows which checks are running. Behind the scenes, this app uses MCP to query Fabric.
>
> *[Show 04-security-report.png]*
> Here's a sample security report - overall score of 78, with issues categorized by severity. Two critical issues need immediate attention.
>
> *[Show 05-detailed-findings.png]*
> Drilling into a finding shows full context - what the issue is, what it affects, and step-by-step remediation.
>
> *[Show 06-export-report.png]*
> Reports can be exported in multiple formats for compliance documentation.
>
> This demonstrates how MCP enables you to build domain-specific applications on top of Fabric."

---

## 📋 Quick Reference Card

### File Naming Convention

```
[demo-number]-[demo-name]/screenshots/[sequence]-[description].png
```

Examples:
- `demo-1-cli-basics/screenshots/01-fabric-help.png`
- `demo-2-data-goblin/screenshots/03-claude-config.png`
- `demo-3-ai-agent/scripts/generated-automation-script.sh`
- `demo-4-security-app/reports/sample-security-report.pdf`

### Screenshot Count Summary

| Demo | Screenshots | Videos | Other Files |
|------|-------------|--------|-------------|
| Demo 1 | 4 | 1 | - |
| Demo 2 | 6 | 1 | - |
| Demo 3 | 6 | 1 | 1 script |
| Demo 4 | 7 | 1 | 1 PDF |
| Diagrams | 3 | - | - |
| **Total** | **26** | **4** | **2** |

### Emergency Contacts

- **Fabric Support:** [internal support alias]
- **AV Support:** [webcast tech support]
- **Co-presenter:** [backup presenter contact]

---

## ✅ Final Pre-Session Checklist

**48 Hours Before:**
- [ ] All screenshots captured and reviewed
- [ ] All videos recorded and tested
- [ ] Backup materials uploaded to shared location
- [ ] Test fallback slides in presentation software
- [ ] Confirm all file naming is consistent

**Day Before:**
- [ ] Re-test live demo environments
- [ ] Verify Azure/Fabric authentication works
- [ ] Check network connectivity at presentation location
- [ ] Review fallback scripts
- [ ] Confirm backup materials accessible from presentation machine

**30 Minutes Before:**
- [ ] Open backup folder for quick access
- [ ] Pre-load fallback slides
- [ ] Test screen sharing
- [ ] Have fallback materials in secondary browser tabs
- [ ] Deep breath - you're prepared! 🎯

---

*Document Version: 1.0*  
*Last Updated: December 1, 2025*
