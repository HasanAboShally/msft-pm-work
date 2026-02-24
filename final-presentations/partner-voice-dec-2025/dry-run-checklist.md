# 🎬 Day-of Preparation Checklist & Dry-Run Guide

**Event:** Partner Voice Webcast - AI-Powered Automation in Fabric with MCP  
**Date:** December 2, 2025 | 6:00 PM Israel Time (8:00 AM PT)  
**Presenter:** Hasan Abo Shally  
**Duration:** 60 minutes  
**Platform:** Microsoft Teams

---

## Quick Reference

| Milestone | Time (Israel) | Time (PT) | What to Do |
|-----------|---------------|-----------|------------|
| T-60 min | 5:00 PM | 7:00 AM | Pre-flight technical setup |
| T-45 min | 5:15 PM | 7:15 AM | Demo environment verification |
| T-30 min | 5:30 PM | 7:30 AM | Dry run script practice |
| T-5 min | 5:55 PM | 7:55 AM | Go-live final checks |
| LIVE | 6:00 PM | 8:00 AM | Session starts |

---

# Part 1: Pre-Flight Checklist (T-60 minutes)

**Start Time:** 5:00 PM Israel Time

## 🖥️ Technical Setup Checklist

### Hardware
- [ ] Laptop plugged into power (DO NOT rely on battery)
- [ ] External monitor connected (if using)
- [ ] Webcam positioned at eye level
- [ ] Headset/microphone connected and tested
- [ ] Phone on silent and face-down
- [ ] Room door closed/locked

### Network Verification
```bash
# Test internet connectivity
ping -c 5 microsoft.com
# Expected: 5 packets transmitted, 5 received, 0% packet loss

# Check download speed (should be >25 Mbps)
curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -

# Alternative: Open browser to fast.com
```

**Expected Output:**
```
PING microsoft.com (20.112.250.133): 56 data bytes
64 bytes from 20.112.250.133: icmp_seq=0 ttl=111 time=45.2 ms
...
5 packets transmitted, 5 received, 0% packet loss
```

### Terminal Setup
```bash
# Set terminal font size (adjust in Terminal > Preferences > Profiles)
# Recommended: 16pt minimum, 18pt preferred

# Clear terminal history for clean demo
clear

# Set a clean prompt (optional)
export PS1="demo $ "
```

## 🔐 CLI Authentication Verification

```bash
# 1. Check current authentication status
fab auth status

# Expected output:
# ✓ Logged in as hasan@microsoft.com
# Token expires: 2025-12-02 18:30:00 UTC
# Tenant: Microsoft
```

**If NOT authenticated:**
```bash
# Authenticate now
fab auth login

# Follow browser prompt to sign in
# Return to terminal and verify:
fab auth status
```

**If token is expiring soon (< 2 hours):**
```bash
# Force re-authentication
fab auth logout
fab auth login
```

## 🌐 Browser Tabs to Have Open

Open these tabs in order (left to right):

| Tab # | URL | Purpose |
|-------|-----|---------|
| 1 | `https://app.fabric.microsoft.com` | Fabric Portal (logged in) |
| 2 | `https://github.com/data-goblin/fabric-cli-plugin` | Community plugin demo |
| 3 | Poll link #1 | Opening poll |
| 4 | Poll link #2 | Mid-session poll |
| 5 | Poll link #3 | Closing poll |
| 6 | This checklist | Reference during session |

**Fabric Portal Verification:**
1. Navigate to `app.fabric.microsoft.com`
2. Confirm you see "Demo-Partner-Voice" workspace
3. Click into it to verify access

## 🔕 Notification Settings

### macOS
```bash
# Enable Do Not Disturb via terminal
# Or manually: Control Center > Focus > Do Not Disturb ON
```

**Manual Steps:**
1. Click Control Center (top right menu bar)
2. Click "Focus"
3. Enable "Do Not Disturb"
4. Set duration: "Until this evening"

### Applications
- [ ] Slack: Set status to "In a meeting" + DND
- [ ] Teams: Set status to "Presenting"
- [ ] Outlook: Close desktop app
- [ ] Messages: Close app
- [ ] Any other chat apps: Close

### System
- [ ] Close all non-essential applications
- [ ] Quit Docker (if running - can cause CPU spikes)
- [ ] Close VS Code (if not needed for demo)
- [ ] Close Spotify/Music apps

---

# Part 2: Demo Environment Verification (T-45 minutes)

**Start Time:** 5:15 PM Israel Time

## 🧪 Test Each Demo Scenario

### Demo 1: CLI Basics

```bash
# Test 1: List all workspaces
fab ls

# Expected output:
# Demo-Development.Workspace
# Demo-Production.Workspace  
# Demo-Partner-Voice.Workspace
# [other workspaces...]
```

```bash
# Test 2: List workspace contents with details
fab ls "Demo-Partner-Voice.Workspace" -l

# Expected output:
# Name                Type        Modified
# ──────────────────────────────────────────
# SalesData          Lakehouse   2025-12-01
# ETL-Process        Notebook    2025-12-01
# [other items...]
```

```bash
# Test 3: Get item details
fab get "Demo-Partner-Voice.Workspace"

# Expected: JSON output with workspace details
```

### Demo 2: fabric-cli-plugin

**Browser Test:**
1. Navigate to `https://github.com/data-goblin/fabric-cli-plugin`
2. Verify README loads properly
3. Scroll to "Available Tools" section
4. ✅ Confirm you can see the 17 MCP tools listed

### Demo 3: AI + CLI Integration

```bash
# Test the rename command (DRY RUN - don't actually rename)
fab get "Demo-Development.Workspace"

# Expected: Workspace details showing displayName
```

### Demo 4: Security Officer Web App (if applicable)

```bash
# Verify you can access workspace permissions
fab get "Demo-Partner-Voice.Workspace" --include-permissions

# Or if using the app:
# Open http://localhost:3000 (or wherever app is running)
```

## 🚨 Authentication Failure Recovery

### If `fab auth status` shows "Not authenticated":

**Step 1: Try normal login**
```bash
fab auth login
```

**Step 2: If browser doesn't open, use device code flow**
```bash
fab auth login --use-device-code

# Follow instructions:
# 1. Go to https://microsoft.com/devicelogin
# 2. Enter the code shown
# 3. Sign in with your Microsoft account
```

**Step 3: If still failing, check network**
```bash
# Test connectivity to Azure AD
curl -I https://login.microsoftonline.com

# Expected: HTTP/2 200
```

**Step 4: If network is fine but auth fails, clear credentials**
```bash
# Clear cached credentials
fab auth logout
rm -rf ~/.fab/credentials  # Only if exists

# Try fresh login
fab auth login
```

### If token expires MID-DEMO:

**Quick Recovery Script:**
```bash
# In a NEW terminal tab (keep current one visible):
fab auth login

# Once authenticated, return to demo terminal
fab auth status

# Continue demo
```

**Talking Point:**
> "Authentication tokens do expire - this is actually a great security feature. Let me quickly re-authenticate... and we're back."

## 🆘 Backup Workspace Creation

If demo workspaces are missing or corrupted:

```bash
# Create emergency backup workspaces
fab mkdir "Demo-Backup-Development.Workspace"
fab mkdir "Demo-Backup-Production.Workspace"
fab mkdir "Demo-Backup-Partner-Voice.Workspace"

# Verify
fab ls "Demo-Backup-*.Workspace"
```

## 🌐 Network Connectivity Tests

```bash
# Test 1: Microsoft Fabric API
curl -s -o /dev/null -w "%{http_code}" https://api.fabric.microsoft.com/v1/
# Expected: 401 (unauthorized is fine - means API is reachable)

# Test 2: Azure AD
curl -s -o /dev/null -w "%{http_code}" https://login.microsoftonline.com/
# Expected: 200

# Test 3: GitHub (for fabric-cli-plugin demo)
curl -s -o /dev/null -w "%{http_code}" https://github.com
# Expected: 200
```

**If any test fails:**
1. Check VPN connection (try disconnecting/reconnecting)
2. Try different network (mobile hotspot as backup)
3. Notify coordinator of potential issues

---

# Part 3: Dry Run Script (T-30 minutes)

**Start Time:** 5:30 PM Israel Time

## ⏱️ Quick 10-Minute Run-Through Outline

**Objective:** Practice transitions and key commands without full content

### Segment 1: Opening (2 min)
- [ ] Introduce yourself: "I'm Hasan, Senior PM on Fabric platform"
- [ ] State the session goal: "Today we'll explore AI-powered automation"
- [ ] Preview the demos: "Four demos, from basics to advanced"

### Segment 2: Demo 1 Preview (2 min)
- [ ] Switch to terminal
- [ ] Run: `fab ls` (verify output)
- [ ] Run: `fab ls "Demo-Partner-Voice.Workspace" -l`
- [ ] Switch back to slides

### Segment 3: Demo 2 Preview (2 min)
- [ ] Switch to browser (GitHub tab)
- [ ] Scroll to show key features
- [ ] Practice your talking point: "Community-built, MIT licensed"

### Segment 4: Demo 3 Preview (2 min)
- [ ] Explain the scenario verbally
- [ ] Show the script generation concept
- [ ] Practice: "AI proposes, human approves"

### Segment 5: Roadmap & CTA (2 min)
- [ ] Show roadmap slide
- [ ] Practice: "January 2026 private preview"
- [ ] Practice: "Reach out to join"

## 🎤 Key Phrases to Practice

Say these out loud at least once:

### Opening
> "Welcome everyone. I'm Hasan Abo Shally, Senior Product Manager on the Fabric platform team. Today we're going to explore how AI is transforming the way we manage and automate Microsoft Fabric."

### Demo Transitions
> "Now let me switch to the terminal and show you this in action..."

> "Let's move from basic CLI to something more advanced - community innovation..."

> "This next demo shows the real power - AI plus precision..."

### Key Technical Explanations
> "The Model Context Protocol, or MCP, is an open standard that allows AI assistants to interact with external tools in a structured, secure way."

> "What makes Remote MCP different is that it runs in the cloud, handling authentication and governance for you."

### Call to Action
> "If you're interested in joining the private preview launching January 2026, please reach out to me directly or fill out the interest form we'll share."

### Handling Technical Issues
> "One moment, let me just refresh that connection..."

> "This is actually a great example of why we have backup options ready - let me show you the alternative approach..."

## ⏰ Timing Checkpoints

| Time into Session | You Should Be At | Action if Behind |
|-------------------|------------------|------------------|
| 5 min | Finished intro, starting Demo 1 | Skip 1 opening slide |
| 15 min | Finished Demo 1, in Demo 2 | Abbreviate Demo 2 |
| 25 min | Starting Demo 3 | This is critical demo - don't rush |
| 35 min | Demo 3 complete, in Demo 4 | Demo 4 can be shortened |
| 45 min | Starting Roadmap section | On track |
| 50 min | Q&A begins | Perfect timing |
| 60 min | Session ends | Wrap up, thank attendees |

**If you're 5+ minutes behind at 25 min mark:**
- Skip Demo 2 entirely (just show GitHub page briefly)
- Mention: "We have detailed resources on this plugin we'll share after"

---

# Part 4: Go-Live Checklist (T-5 minutes)

**Start Time:** 5:55 PM Israel Time

## ✅ Final Setup Steps

### Screen Arrangement
- [ ] Terminal: Left half of screen
- [ ] PowerPoint: Ready to present (not in presentation mode yet)
- [ ] Browser: Minimized but accessible
- [ ] Teams: Visible for join

### Terminal Final Prep
```bash
# Clear terminal for clean start
clear

# One final auth check
fab auth status

# Leave this output visible - shows you're ready
```

### PowerPoint Final Prep
1. Open presentation file
2. Go to Slide 1 (Title slide)
3. Click "Slide Show" > "From Beginning" (but don't start yet)
4. Have it ready to press when you begin sharing

## 🎥 Teams Meeting Join Procedure

### T-5 Minutes: Join the Meeting
1. Click the Teams meeting link from calendar
2. Select "Join now"
3. **Verify settings before joining:**
   - Camera: ON
   - Microphone: ON
   - Background: Blur or appropriate background

### T-3 Minutes: Connect with Coordinator
1. Look for Stephanie Chimeziri (moderator) in participants
2. Send chat message: "Ready to present when needed"
3. Wait for acknowledgment

### T-1 Minute: Final Readiness
1. Confirm you're NOT muted
2. Confirm you can see the chat
3. Take a deep breath
4. Smile - you've got this!

## 🖥️ Screen Sharing Verification

### Test Share (Do this when coordinator says ready)
1. Click "Share" in Teams toolbar
2. Select "Desktop" (recommended) or "Window"
3. If sharing window: Select PowerPoint first
4. Verify the red border appears around shared content
5. Ask coordinator: "Can you see my screen clearly?"

### Screen Share Settings
- [ ] System audio sharing: OFF (unless showing video)
- [ ] Include computer sound: OFF
- [ ] Optimize for video: OFF (keep bandwidth for smooth slides)

### Quick Tip: Dual Monitor Setup
If using two monitors:
- Monitor 1 (shared): Presentation + Terminal
- Monitor 2 (private): Teams participant view, this checklist, backup materials

---

# Part 5: Recovery Procedures

## 🔐 CLI Authentication Fails Mid-Demo

### Scenario: Token expires during demo

**Immediate Response (10 seconds):**
> "It looks like my authentication token has expired - this is actually a good demonstration of the security features. Let me quickly re-authenticate."

**Recovery Steps:**
```bash
# In the SAME terminal (keep it visible)
fab auth login

# If browser doesn't open, use device code:
fab auth login --use-device-code
```

**While authenticating, fill time:**
> "Authentication tokens typically last 1-2 hours, which is by design for security. In production scenarios, you'd use service principal authentication for automated tasks, which handles this seamlessly."

**If auth continues to fail (>30 seconds):**
> "Let me switch to our backup materials and show you what this would look like..."

Switch to backup screenshots (see: `backup-materials-guide.md`)

## 🌐 Network Drops

### Scenario: You get disconnected from Teams

**Immediate Actions (if you notice):**
1. Your video will freeze for attendees
2. Try to rejoin immediately using the same link
3. If rejoin works within 30 seconds, say: "Apologies for the brief interruption - network glitch. Let me pick up where we left off."

**If reconnection takes longer:**
1. The moderator (Stephanie) should take over
2. She can display a "Please wait" message
3. When you rejoin: "Thank you for your patience. Let's continue."

**If your network is unstable:**
```bash
# Quick network reset (macOS)
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Alternative: Switch to mobile hotspot
# Turn on Personal Hotspot on phone
# Connect Mac to phone hotspot
```

### Backup: Mobile Hotspot Ready
1. **Before the session:** Enable Personal Hotspot on your phone
2. Connect your laptop to verify it works
3. Disconnect (use primary network)
4. Keep phone ready to switch if primary fails

## ⏰ Running Over Time

### Scenario: At 45 minutes, you're only at Demo 3

**Decision Matrix:**

| Current Position | Action |
|------------------|--------|
| Finishing Demo 3 | Skip Demo 4, go straight to Roadmap |
| In middle of Demo 3 | Finish Demo 3, skip Demo 4, abbreviated Roadmap |
| Haven't started Demo 3 | Abbreviate Demo 3 to 3 min, skip Demo 4 |

**Transition Phrases:**
> "In the interest of time, let me skip ahead to the most important part - the roadmap and how you can get involved."

> "I want to make sure we have time for questions, so let me summarize the remaining demos..."

### Content Priority (What to Cut First)
1. **Cut first:** Demo 4 (Security Officer) - explain conceptually instead
2. **Cut second:** Demo 2 (fabric-cli-plugin) - just show GitHub page briefly
3. **Protect:** Demo 1 (CLI basics) and Demo 3 (AI integration) - core value
4. **Never cut:** Roadmap and Call to Action - main purpose of session

### Time Recovery Script
If you need to save 5 minutes at any point:

> "We have extensive documentation on [topic], so in the interest of time, let me show you where to find that and move to the next section..."

## 📞 Emergency Contact Info

| Contact | Role | How to Reach | When to Use |
|---------|------|--------------|-------------|
| Stephanie Chimeziri | Moderator | Teams chat in meeting | Any logistics issue |
| Alon Baram | Manager | Teams/Phone | Major escalation |
| Ted Pattison | Stakeholder | Teams | If you need to cancel |
| IT Support | Technical | Microsoft IT Helpdesk | Teams platform issues |

### Emergency Messages (Pre-typed, ready to paste)

**If you can't join:**
> "@Stephanie I'm having technical difficulties joining. Can you announce a 5-minute delay while I troubleshoot?"

**If you need to hand off:**
> "@Stephanie I need to step away momentarily. Can you cover with the Q&A or a brief pause?"

---

# Part 6: Post-Session Tasks

## Immediate Follow-ups (Within 30 minutes)

### Thank You Message
Post in Partner Voice Teams channel or send via email:

```
Subject: Thank You - AI-Powered Automation in Fabric with MCP

Thank you all for joining today's Partner Voice session on AI-Powered 
Automation in Fabric with MCP!

Key Resources:
- Fabric MCP Documentation: [link]
- fabric-cli-plugin: https://github.com/data-goblin/fabric-cli-plugin
- Remote MCP Private Preview Interest Form: [link]

Recording will be available in the Partner Voice portal within 48 hours.

Questions? Reach out to me directly: hasan@microsoft.com

Looking forward to your feedback!

Hasan Abo Shally
Senior Product Manager, Microsoft Fabric
```

### Quick Debrief (Self-Reflection)
Answer these questions while fresh:
- [ ] What went well?
- [ ] What could be improved?
- [ ] Any technical issues to document?
- [ ] What questions came up that I should follow up on?

### Log Attendee Questions
Create a document with:
1. All questions asked during Q&A
2. Questions in chat you didn't get to
3. Any feature requests or feedback

## Recording Upload & Processing

### Verify Recording
1. Check Teams meeting details for recording
2. Confirm recording captured properly
3. Note any sections that had issues

### Upload to Partner Voice Portal
1. Navigate to Partner Voice SharePoint
2. Go to "Webcast Recordings" folder
3. Upload recording with naming convention:
   ```
   2025-12-02_PartnerVoice_AI-Powered-Automation-Fabric-MCP.mp4
   ```
4. Add metadata:
   - Date: December 2, 2025
   - Presenter: Hasan Abo Shally
   - Topic: AI-Powered Automation in Fabric with MCP

### Create Summary Document
```markdown
# Partner Voice Webcast Summary
**Date:** December 2, 2025
**Topic:** AI-Powered Automation in Fabric with MCP
**Presenter:** Hasan Abo Shally
**Attendees:** [count]

## Key Topics Covered
- Fabric CLI basics and filesystem metaphor
- Community innovation: fabric-cli-plugin
- MCP (Model Context Protocol) overview
- AI agent + CLI integration
- Remote MCP roadmap (Private Preview Jan 2026)

## Questions & Answers
[List key Q&A]

## Follow-up Items
[List any action items]

## Partner Feedback
[Summary of poll results and feedback]
```

## Feedback Collection

### Poll Results Export
1. Go to Microsoft Forms / Mentimeter
2. Export results for each poll
3. Save to: `partner-voice-dec-2025/poll-results/`

### Feedback Survey
Send follow-up survey (if not automatic):

```
Subject: Your Feedback - Partner Voice: AI-Powered Automation

Thank you for attending! Your feedback helps us improve.

[Link to feedback survey]

Topics for feedback:
- Content relevance
- Demo effectiveness
- Information clarity
- Overall satisfaction

Survey takes ~2 minutes.
```

### Analyze and Report
Within 1 week:
1. Compile poll results
2. Summarize feedback survey
3. Identify top feature requests
4. Create internal summary for product team

---

# Quick Reference Cards

## 📋 Terminal Commands Cheat Sheet

```bash
# Authentication
fab auth login            # Login interactively
fab auth status           # Check auth status
fab auth logout           # Clear credentials

# Listing
fab ls                    # List workspaces
fab ls <workspace> -l     # List workspace contents (detailed)

# Details
fab get <path>            # Get item details

# Create
fab mkdir <workspace>     # Create workspace

# Copy
fab cp <source> <dest>    # Copy items

# Jobs
fab job run <path>        # Run a job
```

## 🎯 Time Targets

| Section | Ideal Duration | Hard Stop |
|---------|----------------|-----------|
| Intro | 3 min | 5 min |
| Demo 1 | 8 min | 10 min |
| Demo 2 | 7 min | 8 min |
| Demo 3 | 10 min | 12 min |
| Demo 4 | 8 min | 10 min |
| Roadmap | 5 min | 7 min |
| CTA | 3 min | 4 min |
| Q&A | 10 min | 15 min |
| **TOTAL** | **54 min** | **60 min** |

## 🆘 Quick Fixes

| Problem | Solution |
|---------|----------|
| Terminal text too small | `Cmd + +` to zoom |
| CLI not found | `pip install fabric-cli` |
| Auth failed | `fab auth logout && fab auth login` |
| Workspace not found | Check exact name with `fab ls` |
| Screen share not working | Stop share, click Share again |
| Audio feedback | Mute when not speaking |

---

*Document Created: December 1, 2025*  
*Last Updated: December 1, 2025*  
*For Session: December 2, 2025 at 6:00 PM IST*
