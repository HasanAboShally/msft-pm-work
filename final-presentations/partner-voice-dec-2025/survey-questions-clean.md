# Partner Voice Survey - Questions Only

**Form Title:** Partner Voice Feedback - AI Automation in Fabric with MCP

**Form Description:** Thank you for attending! 2 minutes to share feedback and optionally join our Remote MCP Private Preview.

---

## Q1: Session Value
**Type:** Rating (1-5 stars)  
**Required:** Yes

**Question:** How valuable was this session for your organization?

**Scale:**
- 1 star = Not valuable
- 2 stars = Slightly valuable
- 3 stars = Moderately valuable
- 4 stars = Very valuable
- 5 stars = Extremely valuable

---

## Q2: Top Automation Priority
**Type:** Single choice  
**Required:** Yes

**Question:** What would you MOST like to automate in Fabric?

**Options:**
1. Workspace management - Creating, configuring, organizing workspaces
2. Data pipeline operations - Building & scheduling data workflows
3. Lakehouse/warehouse setup - Provisioning storage artifacts
4. Security & permissions - Managing access, roles, governance
5. Deployment & promotion - Moving content across dev/test/prod
6. Report/model management - Automating BI artifact lifecycle
7. Monitoring & alerting - Tracking job health & performance

---

## Q3: AI Agent Adoption Intent
**Type:** Single choice  
**Required:** Yes

**Question:** How likely are you to use AI agents for Fabric automation in the next 12 months?

**Options:**
1. Definitely will adopt - Ready to implement now
2. Very likely - Planning to pilot within 6 months
3. Somewhat likely - Interested, need to evaluate
4. Unlikely for now - Current approach works
5. Not considering - Doesn't fit our strategy

---

## Q4: Remote MCP Private Preview Interest
**Type:** Single choice  
**Required:** Yes

**Question:** We're launching Remote MCP Private Preview in January 2026! Remote MCP lets AI agents work with Fabric without local setup—secure, enterprise-ready, hosted by Microsoft. Interested in joining?

**Options:**
1. Yes, sign me up! - I want early access
2. Interested, not now - Keep me informed for GA
3. Need more info - Have questions first
4. Not interested - Doesn't fit current needs

---

## Q5: Contact Information
**Type:** Text fields  
**Required:** Only if Q4 = "Yes, sign me up!" or "Need more info"  
**Branching:** Show this question only when Q4 answer is option 1 or 3

**Question:** Please provide your details for Private Preview follow-up:

**Fields:**
1. Full Name (Required)
2. Work Email (Required)
3. Organization (Required)
4. Job Title (Required)
5. Primary Use Case (Optional) - Placeholder: "What would you automate with Remote MCP?"

---

## Q6: Open Feedback
**Type:** Long text  
**Required:** No

**Question:** Any feedback, questions, or topics for future sessions?

**Placeholder:** What went well? What could improve? What should we cover next?

---

## Branching Logic Summary

- If Q4 = "Yes, sign me up!" → Show Q5, then Q6
- If Q4 = "Need more info" → Show Q5, then Q6
- If Q4 = "Interested, not now" → Skip Q5, go to Q6
- If Q4 = "Not interested" → Skip Q5, go to Q6
