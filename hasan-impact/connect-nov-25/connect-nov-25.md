# Connect – November 2025

**Reflection Period:** May 8, 2025 – November 26, 2025  
**Name:** Hasan Abo Shally  
**Title:** Senior Product Manager  
**Manager:** Alon Baram

---

## 1. What results did you deliver, and how did you do it?

Over the past six months, I delivered outstanding results: open-sourced the Fabric CLI (190K+ downloads, 380% of goal), launched the Fabric MCP Public Preview (announced in the CTO's keynote, validated with 5 major enterprises), and enabled 5+ Fabric workload teams to build on our MCP platform. I also drove executive visibility—the CVP's MCP post became her most engaging ever (1,100+ likes). These achievements advanced our automation and AI strategy while upholding security and quality.

### Fabric CLI: Open-Source Launch & Community Growth

I led the open-sourcing of the Fabric CLI in September 2025—a milestone I had championed since joining the team.

**Key Results:**
- 190,000+ cumulative downloads (380% of my May goal)
- 79% workload coverage (27/34 Fabric items supported)
- Open-source traction: 52 GitHub stars, 23 forks, 47 PRs—including our first merged external PR
- 3 quality releases with zero critical regressions
- Key features: JSON output, folder support, autocomplete, GraphQL API, gateway/connection management

**How:** Drove the open-source effort end-to-end (compliance, repo setup, engineering coordination). Built strong relationships with top advocates (Kurt Buhler, Peer Grønnerup) who now actively contribute and evangelize. Co-authored the launch blog post driving thousands of views. Set up vulnerability triage for swift security response.

**Recognition:** Kurt Buhler shared publicly: *"I've been using the Fabric CLI a lot. This is the most impactful feature for me from Fabric OR Power BI in recent years."*

---

### Fabric MCP: Leading AI-Powered Automation

Mid-year, I took ownership of the Fabric MCP initiative—a strategic pivot towards AI-powered automation. I defined our strategy, structuring efforts into 5 clear buckets and creating clarity across the team.

**Key Results:**
- Launched Public Preview at FabCon Europe (September 2025)—announced in the CTO's keynote
- First Microsoft team to deliver an MCP server to the unified Microsoft MCP repository—praised by Azure MCP for our agility
- 5 customer validation sessions with major enterprises (KPMG, PwC, Avanade, Fellowmind, The Reporting Hub)
- 5 Fabric workload teams onboarding MCP tools (PowerBI, Data Agents, Notebook, OneLake, Ontology)
- Authored specs for Local MCP (live) and Remote MCP (targeting March 2026)

**How:** Rapidly ramped up on MCP, crafted a clear vision and roadmap presented across multiple forums. Integrated with the Microsoft MCP v-team mono-repo. Ran customer meetings and followed market trends. Coordinated with Copilot and platform teams on security from day one.

---

### High-Visibility Impact & Recognition

- **FabCon Europe Keynote:** Worked persistently with keynote coordination to feature CLI open-source and MCP in the CTO's keynote—provided narratives, visuals, and reached out directly to the CTO
- **Executive Amplification:** CVP Kim Manis shared my blog posts—the MCP post became her most engaging ever (1,100+ likes, 40+ comments, 120+ reposts)
- **CTO Recognition:** Direct appreciation from the Fabric CTO for leading CLI open-source and MCP demos
- **Microsoft Playground Tel Aviv:** Designed and built the "Fabric Quest Room"—an interactive escape-room experience showcasing CLI and ILDC innovation

---

### Cross-Team Collaboration & Platform Enablement

As a platform PM, enabling other Fabric teams is central to my role. This period I initiated:

- **Workload Teams (MCP):** Enabling 5+ teams to build MCP tools; running alignment sessions and finalizing onboarding guides
- **Notebook Team:** Partnership to enable CLI in notebooks—resolving pre-auth and UX patterns
- **Shell/UX Team:** Kicked off web-based CLI console discussions; clarified two distinct efforts (portal shell vs. remote scripting); working with UX research to validate
- **UX Research:** Initiated CLI UX studies for autocomplete, error messaging, and discoverability
- **Expert Roundtables:** Scheduled sessions with MVPs (including Ted Pattison) to gather feedback

This "start conversations early" approach ensures alignment, reduces surprises, and drives adoption by meeting users where they work.

---

### Security & Quality

- Ensured all CLI code met compliance before release; implemented open-source security best practices
- Proactively tracked MCP security concerns in community forums; incorporated security questions in customer interviews
- Zero critical security incidents across all releases
- Supported Power BI Embedded team on confidential report data export risks

---

### Microsoft Culture in Action

- **Customer Obsession:** Acted on user feedback; prioritized based on MVP and customer needs
- **One Microsoft:** CLI integrations with Notebook, Shell/UX, VS Code; MCP collaboration with Azure MCP v-team, Copilot team, and Copilot Studio (WIP); shared AI learnings with peers
- **Growth Mindset:** Embraced MCP pivot as learning opportunity; iterated CLI strategies based on data
- **Accountability:** Treated CLI/MCP success as personal responsibility; ran final quality checks before every launch
- **D&I:** Mentoring junior PM from India; Hasoub leadership; launched ArabAI Club

---

## 2. Reflect on recent setbacks – what did you learn and how did you grow?

### Setback 1: CLI Adoption Plateau

CLI MAU plateaued at ~1,500 despite 190K+ downloads. I treated this as a learning moment—launching open-source, pursuing integrations (VS Code, Notebooks), and mapping hero scenarios for Power BI users.

**Key insight:** Building a great tool isn't enough. Customers need motivation to switch workflows, clarity on which tool to use (CLI vs. SDK vs. API), and "show, not tell" success stories. I now think holistically about the adoption journey.

---

### Setback 2: Navigating Ownership Transition

I presented the AI strategy that defined MCP, expecting to lead it. My managers initially assigned it to a colleague, then later asked me to take over. Rather than create friction, I talked openly with her, navigated the transition together, and maintained our relationship.

**Key insight:** What matters most is how we handle change. By prioritizing people, I turned an awkward situation into a trust-building experience. We remain close colleagues with stronger mutual respect.

---

## 3. What are your goals for the upcoming period?

### Goal 1: Grow CLI Monthly Active Users to 5,000

**Description:** Increase CLI MAU from ~1,500 to **5,000 by end of FY26** (June 2026)—an ambitious target requiring ~20% month-over-month growth. I'll work to achieve this by shipping CLI V2 with AI-readiness features (`agents.md`, improved error messages), Power BI commands for high-value scenarios, and deeper integrations (Notebooks, VS Code extension). I'll also drive adoption through hero scenario documentation, sample scripts, community webinars, and continued engagement with MVPs and power users.

*Business Impact: Demonstrates that automation tools drive real, recurring usage—validating our investment and strengthening Fabric's developer platform story.*

---

### Goal 2: Fabric Local MCP – General Availability & Customer Advocacy

**Description:** Lead the Fabric Local MCP from Public Preview to **General Availability by FabCon Atlanta (March 2026)**. Ship new capabilities (e.g., CLI scripting tool, deployment planning) and onboard **MCP tools from Fabric workload teams** (e.g., OneLake file uploads to lakehouses). Ensure production-ready documentation and drive adoption through advocacy: deliver sessions with the ** Enterprise/Partner/MVP Voice programs**, engage with community experts, and publish a **blog or video featuring 1-2 customers** actively using the MCP. This lays the foundation for measurable usage as we establish telemetry.

*Business Impact: Strengthens Fabric's position as an AI-driven platform, expands MCP capabilities through workload partnerships, builds customer proof points, and creates momentum for broader adoption.*


---

### Goal 3: Fabric Remote MCP – Public Preview

**Description:** Deliver the **Fabric Remote MCP Public Preview by FabCon Atlanta (March 2026)**, enabling cloud-hosted agent execution for the Unified Copilot and pro-code automation in VS Code. I'll author the spec, coordinate with the Copilot and platform teams, and validate scenarios with enterprise customers.

*Business Impact: Enables seamless AI-powered automation for Fabric, supporting the Unified Copilot initiative and unlocking enterprise agent scenarios.*

---

### Goal 4: Validate CLI in the Web – Research & Design Milestone

**Description:** By **mid-period**, complete customer research and design validation for **CLI in the Fabric web portal**—a CTO-driven vision. I'll work with UX researchers and designers to validate the value proposition, clarify the two distinct efforts (portal shell UI vs. remote CLI scripting), and partner with teams like Notebook to enable execution. Deliverable: research findings and design direction ready for engineering investment decision.

*Business Impact: Unlocks powerful new scenarios—most notably enabling Fabric's Unified Copilot to execute CLI commands with transparency. Reduces friction for portal-first users.*

---

### Goal 5: Demonstrate Automation Platform Impact with Analytics Dashboard

**Description:** By **mid-period**, prototype a **Cascading Usage Analytics Dashboard** that tracks CLI, SDK, and API usage—both direct and indirect (via integrations). This will enable data-driven prioritization and clearer executive communication of our team's full impact.

*Business Impact: Reveals hidden value, informs investment decisions, and demonstrates our platform's true reach to leadership.*

---

### Goal 6: Maintain Zero High-Severity Security Incidents (Security Goal)

**Description:** Maintain **zero high-severity security incidents** in CLI and MCP throughout the period. I'll continue upholding security review gates, coordinate with engineering on threat modeling for MCP, and ensure quick response to any critical issues. I'll also keep security-sensitive work (like authentication) internal rather than community-driven.

*Business Impact: Ensures trust and compliance for enterprise customers and Microsoft.*

---

## 4. How will your actions and behaviors help you reach your goals?

- **Customer Obsession:** Stay attuned to users through community engagement and telemetry. Build MVP relationships.

- **Growth Mindset:** Remain flexible—adjust when priorities shift, as with the MCP pivot. Treat setbacks as learning opportunities.

- **One Microsoft:** Partner across teams (Copilot, UX, Notebook, OneLake). Ensure every team member feels included.

- **Bold Initiative & Accountability:** Take bold steps while holding myself to high standards. Challenge ideas respectfully, move fast—never cut corners.

- **D&I:** Mentor a junior PM from Microsoft India. Serve on Hasoub's board (an NGO I founded in 2013). Co-lead Arab AI Club: teaching AI in Arabic.

- **Continuous Learning:** Pioneer "semi-dev mode" PM work using VS Code, GitHub, and AI agents, sharing learning with peers.

---

*Proud of what I delivered, grateful for the growth, and excited about what's ahead—committed to bold goals while upholding Microsoft's culture and quality.*

