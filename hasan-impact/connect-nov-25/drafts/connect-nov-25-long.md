# Connect – November 2025

**Reflection Period:** May 8, 2025 – November 26, 2025  
**Name:** Hasan Abo Shally  
**Title:** Senior Product Manager  
**Manager:** Alon Baram

---

## 1. What results did you deliver, and how did you do it?

Over the past six months, I delivered **outstanding results**: **open-sourced the Fabric CLI** (190K+ downloads, 380% of goal), **launched the Fabric MCP Public Preview** (announced in the CTO's keynote, validated with 5 major enterprises), and **enabling 5+ Fabric workload teams** (and growing) to build on our MCP platform. I also drove executive visibility—the CVP's MCP post became her most engaging ever (1,100+ likes). These achievements advanced our automation and AI strategy while upholding security, quality, and demonstrating Microsoft's culture in action.

### Fabric CLI: Open-Source Launch & Community Growth

I led the **open-sourcing of the Fabric CLI** in September 2025, transforming it into a community-driven project. This was a major milestone I had been championing since joining the team.

**Key Results:**
- **190,000+ cumulative downloads** (380% of my May goal of 50K)
- **79% workload coverage** (27/34 Fabric items supported)
- **Open-source community traction:** 52 GitHub stars, 23 forks, 26 issues, 47 pull requests—including our **first merged external PR**
- **3 quality releases** (July, September, October) with zero critical regressions
- Key features shipped: JSON output format, folder support, autocomplete in command-line mode, GraphQL API support, and gateway/connection management

**How I did it:**
- Drove the open-source effort end-to-end—securing compliance approvals, preparing the public repo, and coordinating the code migration with engineering
- Established strong relationships with top CLI users and advocates (e.g., Kurt Buhler, Peer Grønnerup) who now actively contribute and evangelize the tool
- Co-authored the official launch blog post following our FabCon Europe announcement, driving thousands of views and immediate community engagement
- Set up a vulnerability triage process for the public repo to handle security issues swiftly

**Recognition:** Kurt Buhler, a prominent community member, shared publicly: *"I've been using the Fabric CLI a lot. Reflecting on it, I honestly think this is the most impactful feature for me from Fabric OR Power BI in recent years."*

---

### Fabric MCP: Leading AI-Powered Automation

Mid-year, I took ownership of the **Fabric Model Context Protocol (MCP)** initiative—a strategic pivot towards AI-powered automation. I helped define our Fabric MCP strategy and direction, structuring our efforts into 5 clear buckets and creating clarity and excitement across the team.

**Key Results:**
- **Launched Public Preview** of the Fabric Local MCP at FabCon Europe (September 2025)—announced in the CTO's keynote
- **First Microsoft team** to deliver an MCP server to the unified Microsoft MCP open-source repository—praised by the Azure MCP team for our agility and the feedback we provided to help subsequent teams
- **5 in-depth customer validation sessions** with major enterprises (KPMG, PwC, Avanade, Fellowmind, The Reporting Hub)
- **5 Fabric workload teams** now working to onboard their MCP tools (PowerBI, Data Agents, Notebook, OneLake, Ontology)
- Authored well-designed specs for Local MCP (now live) and Remote MCP (targeting Public Preview in March 2026)

**How I did it:**
- Rapidly ramped up on MCP, crafting a clear vision and roadmap that I presented in multiple forums to rally the team and partners
- Worked closely with the Microsoft MCP v-team to integrate our server into their mono-repo, aligning with broader company AI strategy
- Ran customer meetings, collected feedback, and followed market trends to ensure our approach reflected real-world needs and emerging best practices
- Coordinated with the Copilot team on requirements, and with the Fabric platform team on security and compliance from day one

---

### High-Visibility Impact & Recognition

I proactively drove visibility for our team's work at the highest levels:

- **FabCon Europe Keynote:** I worked closely (and persistently) with the keynote coordination team to ensure the CLI open-source launch and Local MCP preview were featured in the Fabric CTO's keynote. I provided crisp narratives, visuals, and reached out directly to the CTO to ensure our work was represented.
- **Executive Amplification:** Kim Manis (CVP of Product for Microsoft Fabric) shared my blog posts on LinkedIn. The MCP post became her **most engaging post to date** (1,100+ likes, 40+ comments, 120+ reposts). The CLI post achieved 500+ likes and 50+ shares.
- **CTO Recognition:** Received direct appreciation from the Fabric CTO for leading the CLI open-source strategy and for my demos of CLI and MCP efforts.
- **Microsoft Playground Tel Aviv:** Took the initiative to represent Fabric by designing and building the "Fabric Quest Room"—an interactive, escape-room-style experience showcasing the CLI and ILDC innovation. This engaged dozens of employees and leaders, increasing visibility for Fabric and positioning our team as a hub of innovation.

---

### Cross-Team Collaboration: How I Work

A core part of my approach is **proactively building bridges** across teams to create clarity, align on dependencies, and lay the groundwork for shared success. As a platform PM, a key part of my role is **enabling other Fabric teams** to unlock their scenarios and deliver more customer value. This period, I initiated and am actively driving several cross-team efforts:

- **Fabric Workload Teams (MCP):** Enabling 5+ workload teams (Power BI, Data Agents, Notebook, OneLake, Ontology—with more joining) to build on our MCP platform. I run alignment sessions, help them define their MCP tools, and am finalizing an official onboarding guide based on lessons learned from early adopters. This work unlocks AI-powered scenarios across Fabric that drive direct customer value.
- **Notebook Team:** Initiated partnership to enable CLI usage within notebooks. We're actively working to resolve pre-authentication and optimize UX and integration patterns—this collaboration is ongoing and will mature in the coming months.
- **Fabric Shell/UX Team:** Kicked off discussions on a web-based CLI console for the Fabric portal. I helped clarify that this is actually two distinct efforts (portal shell UI + remote CLI scripting) and am now working with UX researchers and designers to validate the vision through customer research.
- **UX Research & Design:** Initiated CLI UX research efforts—working with the research and design teams to define user studies and telemetry analysis for features like autocomplete, error messaging, and command discoverability. This work is in progress, it will shape upcoming CLI improvements, and also help our CLI be more user-friendly and more agent-friendly.
- **Expert Roundtables & Webinars:** Scheduled upcoming sessions with industry experts and MVPs (including Ted Pattison) to gather feedback on our automation vision and strengthen community relationships. These forums will help validate our direction and deepen engagement with key influencers.

This **collaborative, "start the conversation early" approach** ensures we're aligned with partners before we build, reduces surprises, and positions our tools for broader adoption. Ultimately, I do this to **deliver customer value and drive business metrics**—by meeting users where they already work (notebooks, portal, VS Code), we increase adoption, usage, and satisfaction. It reflects my belief that great PM work is as much about influence and alignment as it is about shipping features.

---

### Security & Quality

I maintained a **security-first mindset** throughout:

- **CLI Open-Source Security:** Ensured all code met compliance standards before release, implemented Microsoft's open-source security best practices (including `SECURITY.md` for responsible vulnerability reporting), and kept security-sensitive authentication work internal rather than relying on community contributions
- **MCP Security Awareness:** Since MCP is an evolving field, I proactively track community concerns (Reddit, LinkedIn) and incorporated security-focused questions into our customer interviews to surface and address concerns early
- **Zero Incidents:** Every release passed security review gates with zero critical security incidents
- Supported an internal team mitigating risks around exporting data from confidential reports (Power BI Embedded)

---

### How I Demonstrated Microsoft Culture

- **Customer Obsession:** Relentlessly gathered and acted on user feedback; prioritized features based on MVP and customer needs; engaged directly with community advocates
- **One Microsoft:** **CLI:** Drove integrations with Notebook, Shell/UX, and VS Code teams to embed the CLI where developers already work. **MCP:** Collaborated with the Azure MCP v-team, Fabric Copilot team, and initiated work to make Fabric MCP available in Microsoft Copilot Studio—unlocking Fabric automation scenarios for low-code builders (WIP). Actively shared my AI learnings with peers; advocated to bring an "AI for Product Managers" session to the Haifa office (originally held only in Herzliya)
- **Growth Mindset:** Embraced the MCP pivot as a learning opportunity; used data and feedback to iterate on CLI adoption strategies
- **Accountability:** Treated CLI and MCP success as my personal responsibility; ran final quality checks before every launch
- **Diversity & Inclusion:** Mentoring a junior PM from Microsoft India; continued leadership at Hasoub; launched ArabAI Club (see D&I section)

---

## 2. Reflect on recent setbacks – what did you learn and how did you grow?

### Setback 1: CLI Adoption Plateau

After the CLI's GA launch, I noticed that **Monthly Active Users (MAU) plateaued at ~1,500**—a relatively low number given our download figures. Rather than being discouraged, I treated this as a **learning moment**.

**What I did:**
- Launched open-source to drive community engagement and contributions
- Pursued integrations (VS Code extension, ADO, Notebooks, UDFs) so users encounter the CLI naturally in their workflows
- Started mapping critical hero scenarios to identify where the CLI can bring additional value—one promising area is Power BI users and their custom automation needs (WIP)
- Kept pushing awareness: blogs, customer voice meetings, internal demos and interact more deeply with leading community members

**What I learned:**
Building a great tool isn't enough—you need to drive awareness, ease of use, and meet users where they are. Specifically:

- **Adoption requires motivation:** Customers have invested in existing workflows. Migrating isn't trivial, and they want to see success stories before switching. We need to "show, not tell."
- **Tooling abundance can overwhelm:** Fabric offers many automation paths (CLI, SDK, APIs, Terraform), which is great for diversity—but users struggle to know which tool to use when.
- **We must create clarity:** Better docs, sample code, webinars, and guidance. I'm even exploring an AI agent that recommends the right tools based on a user's scenario.

I now think holistically about the adoption journey—not just shipping features, but helping users navigate and succeed.

---

### Setback 2: Navigating Ownership Transition with a Colleague

When I presented my AI strategy for the team (which defined the MCP efforts), I expected to lead those efforts. Instead, my managers initially assigned ownership to a colleague. A few weeks later, they reassessed and asked me to take over.

**What I did:**
This was sensitive to navigate—my colleague also wanted to lead the effort, and I deeply respect her personally and professionally. Rather than compete or create friction, I:
- Spent time talking with her about the transition, ensuring we navigated it together and didn't take things personally
- Focused on supporting her and maintaining our relationship
- Managed the reciprocal handover of Power BI Embedded responsibilities with openness and gradual integration

**What I learned:**
Sometimes priorities shift in tech, and what matters most is how we handle change. By prioritizing people and relationships, I turned a potentially awkward situation into a trust-building experience. Today, we remain close colleagues with even stronger mutual respect. The experience reinforced my commitment to Microsoft's values of collaboration, empathy, and integrity.

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

### Customer Obsession & Curiosity
I'll stay closely attuned to users—regularly engaging with our community, analyzing telemetry, and seeking feedback at every stage. My curiosity will push me to explore new ideas (novel AI uses, integration opportunities) that keep us innovating. I'll continue building relationships with MVPs and power users who champion our work.

### Adaptability & Growth Mindset
I'll remain flexible and resilient. If priorities shift or we encounter obstacles, I'll quickly adjust plans and find a way forward—as I demonstrated with the MCP pivot. I'll treat setbacks as learning opportunities, applying lessons to improve our approach. This mindset is essential for the ambitious AI and integration work ahead.

### One Microsoft Collaboration
Achieving these goals requires partnership across many teams (Copilot, Fabric UX, Azure Identity, Notebook, OneLake, and more). I'll build strong connections, coordinate efforts, and harness the full breadth of Microsoft's talent and technology. I'll also foster collaboration within our team, ensuring every member feels included and heard.

### Bold Initiative, Proactivity & Accountability
I'll take bold steps—proposing creative features, driving visibility at exec level, championing new efforts—while holding myself accountable to high standards. I'll stay proactive: starting conversations early, anticipating blockers, and building alignment before it's urgent. I'll also have the courage to respectfully challenge ideas or assumptions when I believe there's a better path—whether in spec reviews, planning discussions, or cross-team forums. I'll move fast **with purpose**, rigorously testing releases, double-checking compliance, and never cutting corners that could compromise trust.

### Diversity, Inclusion & Mentorship
I'll continue mentoring junior PMs and contributing to D&I efforts:
- **Hasoub:** I founded Hasoub in 2013 to empower technologists and entrepreneurs from the Arab minority in Israel and help drive economic prosperity in the community I belong to. Over the years we've raised $10M+, built an innovation center in my village, and helped countless members of the community better realize their potential. I serve on the board of Hasoub today, focusing on shaping its growth strategy and amplifying its impact.
- **Arab AI Club:** Launched a few months ago with a friend, we teach AI in Arabic and help people from our community learn and apply AI—crucial for inclusion and economic relevance. I regularly share insights from this work with my Microsoft PM peers and colleagues.
- **Mentoring:** Monthly meetings with a junior PM from India to support her career growth.

### Continuous Learning & Innovation
I'm pioneering a new way of working as a PM—operating in "semi-dev mode" with VS Code and GitHub as my primary tools. I use AI agents to draft specs, think through problems, and maintain versioned, living documents. I recently shared this approach on LinkedIn and intend to continue developing it and sharing insights with other PMs at Microsoft. This is a work in progress, but it's already making me faster, more structured, and more aligned with how modern product development works.

---

*I'm proud of what I delivered this period and excited about what's ahead. I'm committed to achieving bold goals while upholding the culture, security, and quality standards that define Microsoft—and I'm super excited to continue scaling our impact and shaping the future of pro-dev experiences, Fabric AI-powered automation and beyond!*
