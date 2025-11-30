# Questions for Hasan - Connect Nov 2025

To help me write the best Connect for you, I need to clarify a few things. I've organized these by section. Quick answers are fine! 🚀

---

## Section 1: Results & Achievements (Quick Facts)

### CLI Metrics
1. **190K+ downloads** - Is this cumulative since launch or just May-Nov 2025? [cumulative since launch]
2. **Monthly Active Users (MAU)** - You mentioned ~1,500. Do you have an exact number or trend (was it lower before, did it grow)? [it's grwoing slowly.. but the more worrying thing is that in absolute terms, this is a relatevily low number]
3. **Releases** - How many releases did you ship May-Sep? (I see 3 in the release notes: July, Sept, Oct - were there more?) [3 releases from July, we're about to release a new one now.. ]


### MCP Achievements
4. **Customer validation** - How many customers did you meet with for MCP feedback? Any notable names you can mention? [met with 5 customers for indepth conversations: KPMG, PwC, Avanade, Fellowmind,  The Reporting Hub. I've also had several other calls with community members and experts like Kurt Buhler and Yasar Kocyigit and others.. in addition I follow-up with market trends to see what others are building and how, as this is still a new field and best practices are being defined and challegned all the time]
5. **Microsoft/Azure MCP team collaboration** - Any specific wins or recognition from that team? (e.g., "first team to deliver", any quotes from them?) [the folks of the mircosoft MCP team praised our agility and congrats the launch and feedback we provided.. as we also tried to provide meaingiful feedback to make it easier for the following team to join their infra]
6. **Fabric workload teams** - How many teams are you working with to onboard their MCP tools? Can you name 2-3? [teams include: PowerBI, DataAgents, Notebook, OneLake, Ontology]

### Open Source
7. **External contributions** - Did you get any community PRs merged? If so, how many?
8. **GitHub stars or community metrics** - Any notable numbers?
 [I think we should mention the open source metrics: 52 stars, 23 forks, 26 issues, 47 pull requests (including several external ones) - we had the first PR-merge of a PR by external contributor!]

---

## Section 2: Setbacks (Clarifications)

9. **CLI MAU plateau** - When did you notice this? What specific actions did you take that worked? [we noticed it right after the GA.. we're trying multiple things to increase usage, including: Open source: managing contributions, engaging the community​ ; Integrations: VSCode extension, ADO, Notebooks, UDFs​ ; Scripts library: sample scripts for common use-cases (open-sourced repo)​ ; UX research on additional personas beyond ProDev and DevOps (e.g., admins, data scientists)​ ; Publicity: keep pushing blogs, meetings with customer voice etc… ​]
10. **The Pro Developer persona gap** - You mentioned this is being defined now. Did you help define it? What's the status? [it's still nto very clear.. I asked what's our role and was told that the research team leads this and define then I can provide feedback. ]

---

## Section 3: Goals (Future Period)

11. **CLI V2** - The file is empty. What are the key things you envision for CLI V2? (AI-ready features, PBI capabilities, etc.) [oh! sorry, please recheck the file again now: /cli/cli-v2.md]
12. **CLI in the Web** - What's the current status? Is this your proposal or something leadership has asked for? [it's mainly a vision driven by our Fabric CTO. I helped make clarity that this is actually two seperate efforts: Fabric CLI shell/ui in the web portla + ability to run remote CLI scripts. Current status is that we're plnanning the customer resarch on the first effort, so I'm working with the UX reseachers, design team and content team. And I'm also working with other teams (like notebook) on making the second effort happen]
13. **Automation Analytics Dashboard** - What's the vision here? What will it measure? [I added more context about it in this file: 20251126-cascading-analytics-proposal.md ]
14. **Fabric Local MCP GA timeline** - The spec says "March 2026". Is this still accurate? [yes. many of my goals now I want to target them towards FabCon Atlanta in mid march. And then talk about them in my next connect in ~May 2026]
15. **Security goal** - What specific security-related work are you planning? (SPN auth, threat modeling, etc.) [there are many secuitry reviews we're working with in the MCP front specifically. Also, for the CLI we have new auth scenarios (like supporting azure cli auth) that we want to work with, but for example, as a team we decided that for such areas we want to keep the work internal and do it our selves properly and not rely on commnunity contribtuons.. this showcases our awareness and prioritization of secruity first. Also, in the PowerBI Embedded front, I've helped an internal team working to mitigate risks around exporting data from confiditional reports. ]

---

## Section 4: Behaviors & Growth

16. **Mentoring** - You mentioned coaching a new PM. Any specific examples of how you helped them? [yes, she's a junior PM from India, and I'm trying to help her plan her career forward, she asked if we can have monthly meetings.. and i'm trying to be there for her. this is important for me and resonates deeply with my work to help minorities in tech. Also, I wan to mention here my continued work and efforts as the founder of Hasoub (a grassroots NGO I founded in 2013 to help foster tech enterpernship as econimic level for the Arab community in Israel.. i'm on the board now and I help mainly in defining our strategy for the gorwth phase.. we've raised over $10M in total, built an innovation center in my village, and continue to empower and inspire arab technologists, high-tech students, and tech-entrepreurns). Additionally, a few months ago, together with a friend we launched a new initiative called ArabAIClub - where we focus on helping the general arabic speaking crowd (particularily non-technichal professionls) we help them learn and apply AI in their professional and personal lives, in Arabic. This is cruisial for inclusion and for making sure our people don't miss the opportuniy and stay relevant for the economy! what I'm also doing, is that occasioanlly in our weekly product managers team meeting I share some lessons or insights from the things I learn while preparing the teaching materials and content at the club.. this is a good way for me to also learn my self and also share the knoweldge with my peers at Microsoft. One more cirtical way (and important goal i want to take for the coming period) is that i switched to work in semi-dev mode for all my product work.. and i'm currently building my work system around vs-code and github.. aiming to share with other PMs once more strucutred. for more context on this, I've recently shared the following post in linkedin: If you're a PM and you're not spending most of your focus time inside an IDE, you should probably pause and rethink how you're working. Use an IDE not just to build or code, but to think with AI, draft specs with agents, and use GitHub as your second brain, with versioned decisions, living documents, and structured knowledge. PowerPoint, Notion, and static docs are fine. But they don’t think with you. They don’t remember for you. AI + IDE + Git does. ]
17. **Cross-team influence** - Any specific wins from working with the Copilot team, Fabric Shell/UX team, or others? [we're creating clarity on dependicies and what's needed to enable the main scenarios.. it's a work in progress but I believe we're establishing good basis and able to communicate effectively.]

---

## Bonus Context

18. **Hand-over of Power BI Embedded** - How did this go? Any lessons or positive outcomes? [So what happened here is that, as you can see in my last connect, I was kind of putting together the AI strategy for our team and defining efforts, et cetera. And when I presented that it, Got, you know, very well accepted and that was, you know, good outcome of it, et cetera. And I was expecting to get the mandate to lead those efforts like that, particularly the MCP efforts within our team. But what happened is that, uh, my managers decided to give this to my colleague. Uh, she's, she was leading lot of work on the, on the APIs and they said, okay, like she would lead the organ MCP as well. For me, this was kind of a setback as well. Because, you know, I was kind of expecting to get that, but I decided to, you know, instead of fighting with her, over who takes the ownership or responsibility, I decided to, um, support her and be supportive and offer my support whatever needed. But what happened after a few weeks is that the managers changed their mind and I was asked to take over this effort. So it, it was a bit, um, You know, sensitive to navigate because she wanted to read it as well. And for me, the main thing here was to lead the sensitivity around working with her. She's a colleague that I much respect and much appreciate on the personal level and on the professional level and it was very important for me. to keep this relationship. So I spent hours kind of, you know, talking with her about it and navigating this together and, you know, not taking things personally, et cetera. So it wasn't very important for me, the personal level, and the work environment level, and my work ethics, and, you know, the Microsoft values to kind of, you know, navigate this intentionally and sensitively, and in the best way possible. And then, you know, as a continuity of this handover, part of my, you know, my work on that part, I embedded and the fabric embedded, was transitioned to him. So that's another transition, um, where I think it's, you know, it's still evolving. I don't work now on embedded or I don't, you know, join the meetings there, et cetera. Um, I'm not sure, like, if we did a proper handover, where, you know, kind of handed everything and status and everything, but I think, uh, we tried to manage it through the gradual, uh, integration of hair into those efforts and working with the engineers that are leaving these efforts, et cetera. But I'm always there to help and to provide what's needed. So I think we can maybe mention this as another setback, also in the setback section. And think, you know, I think I acted in a good way and I think the outcome has changed. You know, today we're still very trusted. I think this, like, frankly, this experience kind of process a bit closer to each other and increase the trust, and I think that's a good outcome. And, you know, sometimes it is what it is in tech and, you know, things shift and things move, and we, but we, you know, what doesn't move is the people and that we're still one team and we continue to work together.]
19. **Microsoft Playground event in Tel-Aviv** - What was your role? What impact did it have? [At the Microsoft Playground event in Tel Aviv, I took the initiative to represent Fabric by designing and building the “Fabric Quest Room”—an interactive, escape-room-style experience that showcased the Fabric CLI and ILDC innovation. I led the concept, content, and execution, collaborating with engineering and design to create a hands-on, gamified demo that engaged dozens of employees and leaders. This activation significantly increased internal visibility for Fabric, sparked excitement around our developer tooling, and positioned our team as a hub of innovation within the broader Microsoft ecosystem.]
20. **Recognition** - Any shoutouts, awards, or positive feedback from leadership, customers, or MVPs you want to highlight? [I’ve received meaningful recognition from both internal leadership and the broader community this period. Kim Manis, CVP of Product for Microsoft Fabric, shared my blog posts on the Fabric MCP and CLI on LinkedIn. The MCP post became her most engaging post to date, with over 1,100 likes, 40+ comments, and 120+ reposts — a strong signal of interest and validation from the community. The CLI post also performed well, with 500+ likes and 50+ shares. From the community, MVPs and power users have publicly praised the CLI. One user wrote: > “Fabric CLI is amazing. Lifesaver for automating everything E2E for a large team of engineers with personal Fabric workspaces.” Another, Kurt Buhler, shared: > “I’ve been using the Fabric CLI a lot. Reflecting on it, I honestly think this is the most impactful feature for me from Fabric OR Power BI in recent years.” I’ve been actively engaging with Kurt, who has since offered to contribute to the CLI — a major boost for our open-source momentum and community trust. Internally, I’ve received direct appreciation from the Fabric CTO for leading the CLI open-source strategy and for my continued engagement on roadmap discussions, and also on my demos for the CLI and MCP efforts. My manager also highlighted my ability to collaborate effectively with strong engineering partners and navigate complex cross-team dynamics. These recognitions reflect the growing visibility and impact of my work across Microsoft and the broader ecosystem. Also: I proactively drove the inclusion of our team’s key initiatives — the Fabric CLI open-source launch and the Local MCP preview — in the CTO’s keynote at FabCon Vienna. This visibility didn’t happen by chance. I worked closely (and persistently) with the team coordinating keynote content, provided crisp narratives and visuals, and even reached out directly to the CTO’s  to ensure our work was represented. In parallel, I created high-impact demos that were showcased by our GPM during their breakout session at the conference. These demos helped land our story around automation and AI, and positioned our team’s work as a core part of Fabric’s innovation narrative. This effort significantly elevated the visibility of our work across Microsoft and with external stakeholders.
]



---

## 📝 Follow-up Questions (After Reviewing Your Answers)

Your answers are excellent! Just a few quick clarifications:

### Critical for Numbers/Impact

21. **CLI workload coverage** - In May 2025, your goal was 80%+ coverage. Where are you now approximately? (70%? 85%?) [The CLI supports 79% (27/34) of the Fabric items supported by the API. The missing items are mostly in preview.]

22. **May 2025 Goals Scorecard** - Looking at your May goals, let me confirm:
   - 5 monthly releases (May-Sep): You shipped 3 (July, Sept, Oct). Was this due to a change in cadence or scope? [we rearranged based on engineers priorities and timelines and preffered sometimes to wait for some work to be finished so the version we release has more content]
   - 50K cumulative installs by Sep 30: You hit 190K+ — that's 380% of target! 🎉
   - AI Strategy deck endorsed by Jun 30: Was this done? [yes.. it's mostly the AI work i'm leading now on the MCP servers and agentic efforts]
   - Private preview live by Aug 31: Did you hit this for MCP? [we launched a public preview of the local MCP — announced at FabCon Europe in september]

23. **FabCon Vienna date** - When was this? (Just need the month for the narrative) [September 15 to 18, 2025]

### For the Story

24. **Eva/colleague transition** - You mentioned navigating the MCP ownership transition with a colleague. Can I refer to her by first name (Eva) or should I keep it anonymous ("a colleague")? [please keep anonymous to respect her privacy if someone else reads the connect ]

25. **ArabAI Club launch date** - When did you launch this? (Just need "a few months ago" or specific month) [in June]

26. **Your "PM in IDE" working style** - This is a great differentiator! Should I include this as part of your growth/behaviors, or is it too early to highlight? [incldue it there as a work in progress and hint that I'm developing and sculpturing this into my new way of work and intend to continue learning and share insights with others ]

### Quick Confirmations

27. **Remote MCP timeline** - Your spec says Private Preview Jan 2026, Public Preview Mar 2026. Is this what you want as your goal for the next period? [ in the goal, focus on the public preview I think]

28. **Hasoub $10M** - Is this the total raised over 12 years, or recent fundraising? [over the years]

---

💡 **Tip:** For each question, a 1-2 sentence answer is enough. For metrics, approximate numbers are fine!
