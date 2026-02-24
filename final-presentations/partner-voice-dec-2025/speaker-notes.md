# Partner Voice Speaker Notes
## AI-Powered Automation in Fabric with MCP
**Date:** December 2, 2025 | 6:00 PM IST (8:00 AM PT)  
**Duration:** 60 minutes  
**Presenter:** Hasan Abo Shally

---

# 📋 Quick Reference

| Time | Section | Duration | Page |
|------|---------|----------|------|
| 0:00 | Welcome & Icebreaker Poll | 5 min | [Jump](#0-welcome--icebreaker-poll-0-min---5-min) |
| 0:05 | Introduction to Fabric Automation | 5 min | [Jump](#1-introduction-to-fabric-automation-5-min---10-min) |
| 0:10 | Demo 1: Fabric CLI Basics | 8 min | [Jump](#2-demo-1-fabric-cli-basics-10-min---18-min) |
| 0:18 | Demo 2: Community Plugin (data-goblin) | 7 min | [Jump](#3-demo-2-community-plugin-18-min---25-min) |
| 0:25 | Introduction to MCP | 5 min | [Jump](#4-introduction-to-mcp-25-min---30-min) |
| 0:30 | Demo 3: AI Agent + CLI Integration | 10 min | [Jump](#5-demo-3-ai-agent--cli-integration-30-min---40-min) |
| 0:40 | Demo 4: Security Officer Web App | 8 min | [Jump](#6-demo-4-security-officer-web-app-40-min---48-min) |
| 0:48 | Remote MCP Roadmap & Private Preview | 5 min | [Jump](#7-remote-mcp-roadmap--private-preview-48-min---53-min) |
| 0:53 | Interactive Discussion & Q&A | 7 min | [Jump](#8-interactive-discussion--qa-53-min---60-min) |

---

# 🎤 Opening Script (First 2 Minutes)

> **[Wait for Stephanie to hand off to you. Take a breath. Smile.]**

---

**SPEAK THIS (warm, conversational):**

"Thank you, Stephanie, and hello everyone! I'm really excited to be here with you today.

Before we dive in, I want to acknowledge something: I know it's either very early morning or late evening for many of you. So the fact that you're here, giving us an hour of your time to talk about automation in Fabric—that means a lot. Thank you.

I'm Hasan Abo Shally, Senior Product Manager on the Microsoft Fabric team, and I get to work on some of the most exciting capabilities we're building: the Fabric CLI, the Model Context Protocol integration, and what I like to call 'making Fabric work FOR you, not the other way around.'

Now, here's my promise to you for the next 60 minutes: this will NOT be a slide-heavy marketing session. We're going to spend most of our time in terminals, seeing real commands, real AI agents, and real automation. I want you to walk away today thinking, 'I can actually use this on Monday.'

But first—I'm curious about YOU. Let's start with a quick poll to see where everyone is on their automation journey..."

---

> **[Launch Poll 1 in Microsoft Forms/Mentimeter]**
> **[Share the poll link in chat]**

**Say while poll is open:**

"I'm putting the link in the chat now. Take 30 seconds to answer—we'll look at the results together. While you're doing that, I'll share that in conversations with partners over the past few months, I've heard everything from 'we're still doing everything by hand' to 'we've built entire frameworks.' I'm curious where this group lands."

> **[Wait 30-40 seconds. Check results.]**

**React to results (have a few reactions ready):**

- **If mostly "Manual":** "Okay, this is great context—we're going to show you some game-changers today."
- **If mixed:** "Interesting spread! We'll have something for everyone—from CLI basics to advanced AI integration."
- **If advanced:** "Wow, you're an advanced crowd! I'll make sure to get into some of the deeper technical details then."

---

# 0. Welcome & Icebreaker Poll (0 min - 5 min)

## Key Talking Points
- ✅ Acknowledge the time zone challenge warmly
- ✅ Set expectations: demo-heavy, practical focus
- ✅ Use the poll to gauge the room and tailor depth
- ✅ Promise actionable takeaways

## Audience Engagement Cues
- 🎯 **@ 0:30** - Launch poll, share link in chat
- 🎯 **@ 1:00** - Encourage responses: "About 15 more seconds..."
- 🎯 **@ 1:30** - Close poll, react to results
- 🎯 **@ 2:00** - Transition to agenda overview

## Time Management
- ⏱️ **On track:** Spend full 5 min if engagement is high
- ⏱️ **Running long:** Skip detailed poll analysis, just acknowledge results
- ⏱️ **Can cut:** The agenda slide can be summarized in 30 sec vs 1 min

---

# 1. Introduction to Fabric Automation (5 min - 10 min)

## Transition Phrase
> "Great, thanks for sharing that. Now let me set the stage for what we're going to explore today—and more importantly, WHY this matters."

---

## Key Talking Points

### 1. The Problem (1.5 min)
> "Let's be honest about the current state of Fabric management. Show of hands in chat—how many of you have spent hours clicking through the portal to set up workspaces for multiple customers? Or written the same PowerShell script with slight variations for different environments?"

**Key stat to mention:**
> "In our research, 62% of enterprise customers cite 'integration complexity' as their top barrier to adopting AI-powered automation. Not the AI itself—but wiring it all together."

### 2. The Solution Landscape (2 min)
> "We're building a three-layer stack for Fabric automation:
> 
> - **Layer 1: The Fabric CLI** — Your programmatic foundation. If you know `ls` and `cd`, you know the mental model.
> - **Layer 2: Model Context Protocol (MCP)** — The bridge that lets AI understand Fabric's schema and capabilities.
> - **Layer 3: AI Agents** — The intelligent orchestrators that can chain commands and make decisions.
> 
> Today we'll see all three in action."

### 3. Why This Matters for Partners (1.5 min)
> "For you as partners, this is about two things:
> 
> **First**, operational efficiency. What if workspace provisioning for a new customer engagement took 5 minutes instead of a day?
> 
> **Second**, new offerings. Imagine selling 'AI-powered Fabric governance' as a service to your customers. That's not a 2027 vision—it's buildable TODAY with what I'm about to show you."

---

## Audience Engagement Cues
- 🎯 **@ 6:00** - Ask the rhetorical "show of hands" question
- 🎯 **@ 8:00** - Pause briefly after mentioning the "new offerings" point—let it sink in
- 🎯 **@ 9:30** - Glance at chat for any early questions (acknowledge but save for Q&A)

## Time Management
- ⏱️ **On track:** All 5 min
- ⏱️ **Running long:** Skip the "Why Partners" section—weave it into demos instead
- ⏱️ **Can cut:** The 62% statistic (it's nice context but not essential)

---

# 2. Demo 1: Fabric CLI Basics (10 min - 18 min)

## Transition Phrase
> "Enough setup—let's see this in action. I'm going to switch to my terminal now."

> **[Switch to terminal. Make font size LARGE (16pt+). Dark background.]**

---

## Demo Narration Script

### Opening (30 sec)
> "The Fabric CLI treats your entire Fabric environment like a filesystem. If you've ever used `ls` to list files or `cd` to change directories, you already know the mental model. Let me show you."

---

### Command 1: Check Authentication
```bash
fab auth status
```

**Say WHILE typing/running:**
> "First, let's confirm we're connected. `fab auth status`—this shows me which account I'm using and confirms my session is valid."

**Say AFTER result:**
> "You can see I'm logged in as my Microsoft account. This uses the same OAuth flow you'd use for any Azure service."

---

### Command 2: List Workspaces
```bash
fab ls
```

**Say WHILE typing:**
> "Now, just like `ls` in a terminal, `fab ls` at the root level shows me all my workspaces."

**Say AFTER result:**
> "There are my workspaces. Notice the naming convention—they end with `.Workspace`. The CLI uses dot notation: name.type. It's intuitive once you get used to it."

---

### Command 3: List Workspace Contents with Details
```bash
fab ls "Demo-Partner-Voice.Workspace" -l
```

**Say WHILE typing:**
> "Let's drill into one workspace. The `-l` flag gives me the 'long' format with details—just like `ls -l` in Unix."

**Say AFTER result:**
> "Now I can see every item: Lakehouses, Notebooks, Reports. I get the type, the last modified date, the owner. This is the view that would take multiple clicks in the portal."

---

### Command 4: Get Item Details
```bash
fab get "Demo-Partner-Voice.Workspace/SalesData.Lakehouse"
```

**Say WHILE typing:**
> "`fab get` gives me the full detail on any single item. Path syntax is workspace slash item."

**Say AFTER result:**
> "I'm getting the full JSON definition—IDs, properties, everything. This is what you'd need if you're scripting deployments or doing infrastructure-as-code."

---

### Command 5: Create a Workspace
```bash
fab mkdir "Demo-New-Workspace.Workspace"
```

**Say WHILE typing:**
> "Creating a new workspace? Just like `mkdir`. Watch this."

**Say AFTER result:**
> "Done. That workspace now exists in my Fabric environment. Let's verify..."

---

### Command 6: Verify with Wildcard
```bash
fab ls "Demo-*.Workspace"
```

**Say WHILE typing:**
> "I can use wildcards to filter. Let me show all workspaces starting with 'Demo'."

**Say AFTER result:**
> "There it is—Demo-New-Workspace, right alongside the others. Create, list, verify—all in seconds."

---

### Command 7: Copy an Item (if time)
```bash
fab cp "Demo-Development.Workspace/SampleReport.Report" "Demo-Production.Workspace" -f
```

**Say WHILE typing:**
> "Here's one that's really powerful: copying items between workspaces. Think dev-to-prod promotions."

**Say AFTER result:**
> "The `-f` flag forces overwrite if it exists. This single command replaces what would be an export, download, upload, configure workflow in the portal."

---

### Wrap-up (30 sec)
> "Every command you just saw is scriptable. Put them in a bash script, a PowerShell script, a GitHub Action, an Azure Pipeline. The CLI is MIT-licensed, open source, and runs on Windows, Mac, and Linux."

---

## Key Messages to Emphasize
- ✅ Filesystem mental model = low learning curve
- ✅ Every command is scriptable for CI/CD
- ✅ Cross-platform: Windows, Mac, Linux
- ✅ Open source, MIT license—you can contribute

## Fallback If Demo Fails
> "Looks like we're having a connectivity hiccup. Let me show you what you would see..."
> **[Switch to backup screenshot slides]**

## Audience Engagement Cues
- 🎯 **@ 12:00** - Quick check: "Any questions so far in chat? I see them, we'll address in Q&A."
- 🎯 **@ 17:00** - Pause before transition: "Questions on CLI basics before we level up?"

## Time Management
- ⏱️ **On track:** All 8 min, include the copy command
- ⏱️ **Running long:** Skip Command 7 (copy), go straight to wrap-up
- ⏱️ **Can cut:** The wildcard demo (Command 6) is nice but not critical

---

# 3. Demo 2: Community Plugin (18 min - 25 min)

## Transition Phrase
> "Now here's where it gets really interesting. Everything I just showed you is Microsoft-built. But one of the things I love about open source is what the COMMUNITY creates on top of it."

---

## Demo Narration Script

### Opening (1 min)
> "I want to introduce you to something built by a community member who goes by 'Data Goblin.' He's built an incredible plugin called fabric-cli-plugin that extends our CLI with AI capabilities."

> **[Switch to browser, show GitHub page: https://github.com/data-goblin/fabric-cli-plugin]**

---

### Show the GitHub Repo (2 min)

**Say WHILE scrolling through README:**
> "Look at this. Seventeen MCP tools for Fabric operations. Claude Code skill integration. Comprehensive documentation. This is community innovation at its best."

**Highlight key points:**
> "What I love about this: it's MIT licensed, so you can use it, modify it, even build your own on top of it. And it shows what's possible when you combine CLI automation with AI context."

---

### Show Capabilities List

**Say WHILE pointing to tools list:**
> "Scroll down and you see the tools list: workspace operations, item management, job execution. The plugin exposes all of these as 'tools' that an AI agent can call. So instead of YOU remembering all the CLI syntax, the AI remembers it for you."

---

### Demonstrate AI Integration (3 min)

**Say before demo:**
> "Let me show you what this looks like in practice. I'm going to ask Claude—using this plugin—to do something that would normally require multiple steps."

> **[Switch to Claude Desktop or show screenshot]**

**Type this query:**
```
List all semantic models in my Sales workspace and check their refresh status
```

**Say WHILE AI is working:**
> "Watch what happens. Claude understands my natural language request. It knows that 'semantic model' maps to a specific Fabric item type. It's going to call the fabric-cli-plugin to execute the actual commands."

**Say AFTER result:**
> "Look at that. It listed the models, checked each one's status, and gave me a summary. I didn't have to remember any syntax. I just asked in plain English."

---

### Wrap-up (1 min)
> "Here's the meta-point: Data Goblin built this in weeks, not years. Because MCP is an open standard and our CLI is open source, the community can extend Fabric automation in ways we couldn't have anticipated. And that's exactly what we want."

**Mention installation:**
> "If you want to try this yourself, it's a single command install. I'll share the link in our follow-up resources."

---

## Key Messages to Emphasize
- ✅ Community innovation on top of Microsoft foundation
- ✅ MIT licensed, open source—no lock-in
- ✅ Shows the ecosystem potential of MCP
- ✅ "This is what YOU could build for your customers"

## Fallback If Claude Demo Fails
> "I want to show you what this looks like, but let me use a pre-recorded example..."
> **[Show screenshot of Claude output]**

## Audience Engagement Cues
- 🎯 **@ 20:00** - "I'm seeing some reactions in chat—yes, this is really a community contribution!"
- 🎯 **@ 24:00** - "Think about it: what plugin would YOU build? Keep that in mind for our discussion."

## Time Management
- ⏱️ **On track:** Full GitHub tour + live AI demo
- ⏱️ **Running long:** Show GitHub briefly, use screenshot for AI demo
- ⏱️ **Can cut:** This entire demo can be compressed to 4 min if needed—just show highlights

---

# 4. Introduction to MCP (25 min - 30 min)

## Transition Phrase
> "So you just saw the magic. But let me pull back the curtain and explain HOW that magic works. Let's talk about MCP—the Model Context Protocol."

---

## Key Talking Points

### 1. What is MCP? (2 min)
> "MCP stands for Model Context Protocol. It's an open standard—originally created by Anthropic, now adopted across the industry—that defines how AI agents connect to external systems.
> 
> Think of it this way: when you use ChatGPT or Copilot, the AI is incredibly smart, but it's isolated. It doesn't KNOW about your Fabric environment, your workspaces, your data. MCP is the bridge that gives AI context."

**Use analogy:**
> "It's like giving the AI a really detailed guidebook about Fabric—here are all the APIs, here are the item types, here are the operations you can perform. Now the AI can work WITH Fabric, not just talk ABOUT it."

---

### 2. Local vs. Remote MCP (2 min)

> "We currently have two flavors of MCP for Fabric:
> 
> **Local MCP** is what's in public preview today. It runs on your machine and is designed for development scenarios. It helps AI generate code, understand Fabric schemas, and create scripts. But it doesn't execute actions in your actual Fabric environment.
> 
> **Remote MCP** is what's coming next. This is a cloud-hosted service that CAN execute actions. When the AI says 'create a workspace,' a Remote MCP server actually creates that workspace in Fabric. This is the game-changer for production automation."

---

### 3. Why This Matters (1 min)

> "The reason we're investing in MCP—and not just exposing REST APIs—is standardization. MCP is becoming the lingua franca for AI-to-system integration. GitHub has an MCP. Azure has an MCP. Fabric has an MCP. An AI agent can potentially coordinate across ALL of these using the same protocol.
> 
> For you as partners, this means: learn MCP once, apply it everywhere."

---

## Audience Engagement Cues
- 🎯 **@ 27:00** - Pause: "Does this distinction between Local and Remote make sense? I see some nods..."
- 🎯 **@ 29:00** - Quick chat check before demo: "Any burning questions on the concept before we see Remote MCP in action?"

## Time Management
- ⏱️ **On track:** All 5 min
- ⏱️ **Running long:** Skip the "Why This Matters" section—it's valuable but cuttable
- ⏱️ **Can cut:** The "lingua franca" point is nice but not essential

---

# 5. Demo 3: AI Agent + CLI Integration (30 min - 40 min)

## Transition Phrase
> "Theory is great, but let's see what happens when we put all these pieces together. This is the demo I'm most excited about."

---

## Launch Mid-Session Poll

> "But first—quick poll. I want to know what YOU would most like to automate."

> **[Launch Poll 2 in chat]**

> "Take 20 seconds while I set up the demo. This helps us prioritize what we build next."

> **[Allow 20-30 seconds, then proceed]**

---

## Demo Narration Script

### Set Up the Scenario (1 min)

> "Here's a real scenario. Your company has decided that ALL workspaces must follow a naming convention: Environment-Domain-Project. For example: Prod-Sales-Dashboard.
> 
> You have 50 workspaces. Some follow the old convention. Some don't follow any convention. Doing this manually would take hours—and probably introduce errors.
> 
> Let's see how an AI agent handles this."

---

### Step 1: Natural Language Request (1 min)

**Say WHILE typing:**
> "I'm going to describe what I want in plain English. No code. No syntax."

**Type:**
```
I want all my workspaces to follow this naming pattern: 
[Environment]-[Domain]-[Project]
For example: Prod-Sales-Dashboard

Can you analyze my current workspaces and propose new names?
```

> "Watch what the AI does with this..."

---

### Step 2: AI Analyzes and Proposes (2 min)

**Say WHILE AI is processing:**
> "The AI is now using MCP to query my Fabric environment. It's calling the list workspaces command, getting the current names, and figuring out what the new names should be."

**Say AFTER AI responds with proposal:**
> "Look at this table. It analyzed my workspace names, identified the pattern components, and proposed standardized names. It even caught that 'Finance_Reports' has an underscore instead of a hyphen.
> 
> But here's the critical part: it's PROPOSING, not executing. I get to review before anything changes."

---

### Step 3: AI Generates CLI Script (2 min)

**Say:**
> "I tell the AI: 'Yes, generate a script to rename these.'"

**Say AFTER AI generates script:**
> "Look at this output. It's not running 50 separate AI calls—which would be slow and expensive. It generated a BASH script with CLI commands.
> 
> Each line is a single rename operation. I can see exactly what will happen. I can modify it if needed. I can save it to Git and version control my infrastructure changes."

**Highlight the script:**
```bash
#!/bin/bash
fab set "Sales-Prod.Workspace" -q displayName -i "Prod-Sales-Main"
fab set "Dev-Analytics.Workspace" -q displayName -i "Dev-Analytics-Main"  
fab set "Finance_Reports.Workspace" -q displayName -i "Prod-Finance-Reports"
echo "Rename complete!"
```

---

### Step 4: Execute (or show what happens) (2 min)

> "Now I can run this script. Let me execute one rename to show you it works."

```bash
fab set "Demo-Development.Workspace" -q displayName -i "Dev-Demo-Development"
```

**Say AFTER execution:**
> "Done. The workspace is renamed. Now imagine running this for 50 workspaces—the script takes seconds, and every change is logged."

---

### Wrap-up: The Key Insight (2 min)

> "Let me highlight what just happened here, because it's important:
> 
> **One:** I described my intent in natural language. No API documentation required.
> 
> **Two:** The AI proposed changes for human review. No blind execution.
> 
> **Three:** The output was a SCRIPT, not individual API calls. That's auditable, repeatable, version-controllable.
> 
> **Four:** One script replaces potentially hundreds of AI inference calls. That's cost-effective at scale.
> 
> This is the pattern: AI handles complexity, human retains control, output is durable."

---

## Key Messages to Emphasize
- ✅ Natural language intent → structured action
- ✅ Human-in-the-loop: propose before execute
- ✅ Output is scripts, not ephemeral—version control friendly
- ✅ Cost-effective: one script vs. many AI calls

## Fallback If Demo Fails
> "Let me walk you through what this would look like..."
> **[Show pre-prepared screenshots of each step]**

## Audience Engagement Cues
- 🎯 **@ 32:00** - "I'm pausing here—this proposal step is really important. This is where you catch errors."
- 🎯 **@ 36:00** - "I see some great questions in chat about versioning. Yes, you can absolutely commit these scripts to Git."
- 🎯 **@ 39:00** - "Before we move on—does this workflow make sense? Thumbs up in chat if yes."

## Time Management
- ⏱️ **On track:** Full 10 min demo with all steps
- ⏱️ **Running long:** Skip the live execution, just show the script generation
- ⏱️ **Can cut:** The "key insight" wrap-up can be shortened to 30 sec bullet points

---

# 6. Demo 4: Security Officer Web App (40 min - 48 min)

## Transition Phrase
> "Now I want to show you something that really brings this home for enterprise scenarios. This is a demo app our team built to show what's possible when you combine AI, MCP, and a purpose-built interface."

---

## Demo Narration Script

### Introduce the Scenario (1 min)

> "Imagine you're a security officer at a large organization. You're responsible for making sure your Fabric environment is compliant: no orphaned workspaces, no overly permissive access, no stale credentials.
> 
> Doing this manually? You'd have to click through every workspace, check every role assignment, review every connection. For a large environment, that's a full-time job.
> 
> We built a demo app that does this automatically using MCP."

---

### Show the Architecture (2 min)

> **[Show architecture diagram on slide or draw it]**

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

> "Here's what's happening:
> - The web app provides a user interface for security officers
> - Behind the scenes, an AI agent connects to Fabric via MCP
> - The AI agent knows HOW to check for security issues
> - It orchestrates multiple CLI commands to scan your environment
> - Results come back to the UI as an actionable report"

---

### Show the Security Scan (3 min)

> **[If app is running, demo live. If not, show screenshots.]**

> "Let me trigger a security scan. Watch the console—you'll see the agent working."

**Say WHILE scan runs:**
> "The agent is now:
> - Listing all workspaces
> - For each workspace, checking role assignments
> - Looking for workspaces without admins
> - Looking for items with external user access
> - Checking all connections for expired credentials"

**Say AFTER results appear:**
> "Here's the report. Three findings:
> 
> **Finding 1:** Two workspaces have no admin assigned—that's a governance risk.
> 
> **Finding 2:** One workspace has external users with contributor access—might be intentional, might not.
> 
> **Finding 3:** A data connection has credentials expiring in 3 days.
> 
> Each finding has a severity, an explanation, and a recommended action."

---

### Highlight the Partner Opportunity (2 min)

> "Now here's what I want you to think about as partners:
> 
> This demo app took our team about two weeks to build. Not months. WEEKS. Because MCP handles all the Fabric integration complexity.
> 
> What if you offered this as a service to your customers? 'AI-Powered Fabric Governance as a Service.' You could:
> - Run weekly automated scans
> - Generate compliance reports
> - Auto-remediate common issues (with approval workflows)
> - Customize checks for industry-specific regulations
> 
> This is a new service offering that didn't exist 6 months ago. And YOU can build it."

---

## Key Messages to Emphasize
- ✅ MCP enables purpose-built intelligent applications
- ✅ Security + AI + Automation = powerful combination
- ✅ Built in weeks, not months
- ✅ Partner opportunity: governance-as-a-service

## Fallback If App Not Available
> "I don't have the app running live, but let me walk you through the architecture and what it does..."
> **[Use screenshots and architecture diagram]**

## Audience Engagement Cues
- 🎯 **@ 43:00** - "I'm seeing reactions in chat—yes, this is real, and yes, you can build something like this."
- 🎯 **@ 46:00** - "Anyone in chat already doing governance work for customers? This could be your next evolution."

## Time Management
- ⏱️ **On track:** Full architecture + demo + partner opportunity framing
- ⏱️ **Running long:** Skip live demo, use architecture + screenshots only
- ⏱️ **Can cut:** The "partner opportunity" section can be a quick mention instead of 2 min

---

# 7. Remote MCP Roadmap & Private Preview (48 min - 53 min)

## Transition Phrase
> "Everything you've seen today uses our Local MCP, which is in public preview now. But I want to tell you what's coming next—and how you can be part of it."

---

## Key Talking Points

### 1. What is Remote MCP? (1.5 min)

> "Remote MCP is the next evolution. Instead of running on your local machine, it's a cloud-hosted service that can execute actions directly in Fabric.
> 
> Think about what this enables: an AI agent running in the cloud, on a schedule, performing governance checks without anyone logged in. Or an automated provisioning system that creates workspaces when a request is approved.
> 
> The key differentiators:
> - **Cloud-hosted:** No local installation required
> - **Service principal auth:** Runs without human login
> - **Full execution:** Not just generating code, but RUNNING actions
> - **Enterprise-grade:** Audit logs, RBAC enforcement, compliance"

---

### 2. The Roadmap (2 min)

> "Let me share where we're headed:
> 
> **January 2026: Private Preview** — What we're announcing today. A select group of partners and customers will get early access to Remote MCP. This is about validation and feedback.
> 
> **March 2026: Public Preview** — At FabCon Atlanta, we plan to announce broader availability. Anyone can try it.
> 
> **Mid-2026: General Availability** — Our target is GA by Microsoft Build in May. Production-ready, with full SLAs and enterprise support.
> 
> This is part of a bigger vision we call 'Fabric IQ'—making Fabric an intelligence platform, not just a data platform."

---

### 3. The Private Preview Invitation (1.5 min)

> "So here's my ask to you today:
> 
> If you're interested in being one of the first to test Remote MCP, I want to hear from you. We're looking for partners who:
> - Have real automation scenarios you're trying to solve
> - Can commit to providing feedback over a 2-3 month period
> - Are willing to push the limits and tell us what breaks
> 
> In return, you get:
> - Direct access to the engineering team
> - Your feedback directly shapes the product before public release
> - A head start on building solutions before your competitors
> 
> I'll share contact information at the end, and I'm happy to talk to any of you directly after this session."

---

## Audience Engagement Cues
- 🎯 **@ 50:00** - "I'm looking for a show of hands in chat: who's interested in the private preview?"
- 🎯 **@ 52:00** - "I see some hands. Great—we'll follow up after this session."

## Time Management
- ⏱️ **On track:** Full 5 min
- ⏱️ **Running long:** Shorten the roadmap to just "Jan preview, Spring public, mid-year GA"
- ⏱️ **Can cut:** The benefits list for private preview can be summarized as "early access and direct team access"

---

# 8. Interactive Discussion & Q&A (53 min - 60 min)

## Transition Phrase
> "Alright, we've covered a lot. CLI, MCP, AI agents, demos, roadmap. Now I want to hear from YOU."

---

## Launch Final Poll

> "Let's do one more quick poll—and then I'll open it up for questions."

> **[Launch Poll 3: AI agent adoption likelihood]**

> "This helps us understand where the community is. 15 seconds."

> **[React briefly to results]**

---

## Q&A Facilitation

**Say:**
> "I can see some questions in the chat. Let me address a few, and then we'll do open discussion."

### Common Questions & Prepared Answers

| Question | Answer |
|----------|--------|
| "When is Remote MCP available?" | "Private Preview January 2026. Public Preview March 2026 at FabCon Atlanta. GA target mid-2026." |
| "Is the CLI free?" | "Yes, completely. Open source under MIT license. No licensing costs." |
| "Can I use this with GitHub Actions/Azure DevOps?" | "Absolutely. The CLI is designed for CI/CD scenarios. You can call `fab` commands from any pipeline." |
| "Does MCP work with ChatGPT/Claude/other LLMs?" | "MCP is an open standard. Any MCP-compatible client can use it—GitHub Copilot, Claude, custom agents." |
| "How do I join the Private Preview?" | "Email me directly or fill out the interest form I'll share. We'll set up a call to discuss your scenarios." |
| "What about PowerShell?" | "CLI is Python-based, cross-platform. It works alongside PowerShell scripts—you can call `fab` from PS." |
| "Is there an API rate limit?" | "Same limits as Fabric REST APIs. MCP doesn't add overhead; it's a passthrough." |
| "What about security/permissions?" | "Remote MCP enforces your Fabric RBAC. The agent can only do what the authenticated identity is allowed to do." |

---

## Handling Tough Questions

**If asked something you don't know:**
> "Great question. I don't have the answer right now, but I'll find out and follow up with you directly. Can you drop your email in the chat?"

**If asked about unreleased features:**
> "I can't share specifics on that today, but I can tell you we're thinking about it. Would love to hear your use case—ping me after the session."

**If asked a very detailed technical question:**
> "That's a deep one. Let's take that offline so I can give you a proper answer. I don't want to guess live."

---

## Closing Script (Last 2 Minutes)

> "We're coming up on time, so let me close with three things:
> 
> **First, resources:** I'm putting links in the chat right now:
> - Fabric CLI documentation
> - fabric-cli-plugin GitHub repo
> - Fabric MCP overview blog post
> - Private Preview interest form
> 
> **Second, thank you:** Seriously. You gave us an hour of your evening—or morning, depending on where you are. Your engagement makes these sessions worthwhile, and your feedback genuinely shapes what we build.
> 
> **Third, the call to action:** Try the CLI this week. Install it, run a few commands. And if you're interested in Remote MCP, reach out to me directly. My email is habos@microsoft.com.
> 
> I'll stick around for a few minutes if anyone wants to chat. Otherwise—thank you again, and I'll see you at the next Partner Voice session!"

---

> **[Wait for Stephanie to close out the meeting]**
> **[Stay on camera for a few minutes for any lingering questions]**

---

## Audience Engagement Cues
- 🎯 **@ 54:00** - Launch final poll
- 🎯 **@ 55:00** - Start addressing chat questions
- 🎯 **@ 58:00** - Begin closing script
- 🎯 **@ 59:30** - Share links in chat

## Time Management
- ⏱️ **On track:** Full 7 min for Q&A
- ⏱️ **Running long:** Cut to 2-3 questions max, prioritize closing
- ⏱️ **If running short:** Ask for more questions, extend discussion

---

# 📚 Appendix: Quick Reference Materials

## Links to Share in Chat
```
🔗 Fabric CLI Documentation: https://docs.fabric.microsoft.com/cli
🔗 fabric-cli-plugin by Data Goblin: https://github.com/data-goblin/fabric-cli-plugin
🔗 Fabric MCP Blog Post: https://blog.fabric.microsoft.com/introducing-fabric-mcp-public-preview
🔗 Remote MCP Private Preview Interest: [Form link TBD]
📧 Contact: habos@microsoft.com
```

## Key Stats to Remember
- 62% of enterprises cite integration complexity as top AI adoption barrier
- 68% of organizations expect integrated AI agents by 2026
- 15,000+ MCP servers deployed globally
- Private Preview: January 2026
- Public Preview: March 2026 (FabCon Atlanta)
- GA Target: May 2026 (Microsoft Build)

## Backup Recovery Commands
```bash
# If CLI auth expires
fab auth login

# Quick test
fab ls

# Create demo workspace on the fly
fab mkdir "Demo-Backup.Workspace"
```

---

# ✅ Pre-Session Checklist

## 30 Minutes Before
- [ ] CLI authenticated: `fab auth status`
- [ ] Demo workspaces verified: `fab ls "Demo-*.Workspace"`
- [ ] Terminal font size increased (16pt+)
- [ ] Browser tabs open: Fabric Portal, GitHub repo, Poll links
- [ ] PowerPoint in presenter view
- [ ] Notifications disabled (Do Not Disturb)
- [ ] Water bottle ready

## 5 Minutes Before
- [ ] Join presenter room
- [ ] Confirm screen share works
- [ ] Audio/video test
- [ ] Backup slides accessible

---

*Speaker notes created: December 1, 2025*  
*For: Partner Voice Webcast - AI-Powered Automation in Fabric with MCP*
