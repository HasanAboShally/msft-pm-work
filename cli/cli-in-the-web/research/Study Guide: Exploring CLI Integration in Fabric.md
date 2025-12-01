
# Study Guide: Exploring CLI Integration in Fabric

**Contacts:**  
Product Team:  
- Avishag Spillinger <aspillinger@microsoft.com>  
- Hasan Abo Shally <habos@microsoft.com>  
- Rivka Moshe <rivkamoshe@microsoft.com>  
- Jeremy Hoover <jeremyhoover@microsoft.com>  

---

## Key Objectives

> 💬 **Comment by Jeremy Hoover (2025-11-25):**  
> rivkamoshe@microsoft.com aspillinger@microsoft.com habos@microsoft.com reworked the key objectives section to be more clear and straightforward.

This study aims to understand if users want the Fabric CLI and its capabilities to be accessible from within the Fabric UI, and to identify which workflows for pro and citizen developers would benefit from this integration. We will examine their mental models, the points where they switch between GUI and CLI, and the perceived value, risks, and expectations of introducing the CLI or CLI-driven features within the Fabric UI.

> 💬 **Comment by Avishag Spillinger (2025-11-25):**  
> jeremyhoover@microsoft.com what is the difference between the two? Isn’t it the same thing?  
> ↪️ **Reply by Jeremy Hoover (2025-11-25):**  
> aspillinger@microsoft.com we can present it as 1 concept for simplicity, but I think there are 2 distinct insights we can gain. They are related but not the same:  
> 1. CLI – literally is the interface. Should the interface be in the Fabric UI and what would that look/behave like? How does it integrate with panes, tabs, errors, etc.?  
> 2. Command-based capabilities – the same function of a CLI (doing things via commands) but not in a typical CLI view (e.g. auto-generate commands or show commands in the UI, allow users to trigger commands via Fabric Copilot).  
> Less about the UI and more about the command mental model and when they want to use commands and why.  
> ↪️ **Reply by Avishag Spillinger (2025-11-25):**  
> Ok, thank you for the explanation. Let's discuss in our meeting.

The goal is to determine the desirability, clarity, and UX fit of these capabilities, so we can define whether Fabric should invest in GUI-embedded command functionality and under what constraints (if any). Additionally, we’ll look at how Copilot and LLMs influence users' reliance on CLI and whether it changes their preferred way of completing tasks in Fabric.

---

## Scope

- **Participants:** 10 total participants  
  - `5 Pro-Developers who currently work with the local Fabric CLI`  
    > 💬 **Comment by Avishag Spillinger (2025-11-23):**  
    > Define what pro and citizen mean  
    ↪️ **Reply by Avishag Spillinger (2025-11-23):**  
    > **A Professional Developer on Fabric:**  
    > - Builds and operates production-grade, governed, and automated data solutions on Microsoft Fabric as a core part of their role.  
    > - Works across multiple workloads, including Data Engineering and/or Data Integration.  
    > - Applies software engineering rigor (Git, CI/CD, testing, governance, security)  
    > - Works on solutions for critical business processes that support downstream users.  
    > - Is beyond the 85th percentile in regular Fabric usage  
    ↪️ **Reply by Avishag Spillinger (2025-11-23):**  
    > Fabric Citizen developers are no-code or low-code practitioners who primarily use UI-based tools but are willing/curious/open to explore CLI for extended functionality, typically with some prior familiarity or experience with it.

  - `5 Citizen developers who are familiar with CLI`. They should have Fabric experience.  
    > 💬 **Comment by Jeremy Hoover (2025-11-25):**  
    > Need to mark if they should have experience with Fabric as well.

- **Session Length:** `45-60 minutes`  
- **Session Dates:** December `<Dates>`  
- **Location:** Remote via Teams  
- **Environments:** Exploratory – Live Build  

---

## Session Topics

### Introduction [2 min]

> _Text written like this serves the facilitator and should not be shared with the participant_  
> <Prior to beginning study>

**Introduction:** Hello <Participant Name>, thank you for taking the time to talk with us today. My name is <Facilitator Name> & <Role>.  
**Recording the session:** We will be recording the session...  
[Start Recording]

**Validation Question 1:** Can you confirm your name and job title for me?  
**Purpose of the test:** Today, we are going to be exploring a specific topic related to your work for the next 60 minutes or so.  
**Think aloud:** Please share your thoughts out loud throughout the session.  
**Feedback on the product:** Positive and negative feedback is welcomed...  
**Questions?**

---

### Real-World Context / Role [3 min, 5 min total]

- Please briefly describe what you do for work.  
- What is the main goal of your department/team?  
- What are your specific responsibilities?  
- Briefly as context, how do you work with Microsoft Fabric/Power BI?

---

### Phase 1 – CLI Exploration (30 mins, 35 mins total)

#### 1.1 Current Usage & Context (15 mins, 20 total)

> Goal: explore participant’s experience with CLIs – how do they feel about it?

**For Pro Developers:**

- Tell me about your experience with using CLIs as part of your work.  
- How familiar are you with the Fabric CLI, and how often do you use it in your current workflow?  
- What kinds of tasks do you typically perform using a CLI? (e.g. scripting deployments, automation)  
  > 💬 **Comment by Jeremy Hoover (2025-11-25):**  
  > Should probably ask about which **commands** they use / prefer / would need.

- What are common commands you use or look for?  
- Do you use any other tools alongside a CLI for these tasks (e.g. Copilot or automation scripts)?  
- Which tasks feel easier in a GUI compared to a CLI?  
  > 💬 **Comment by Avishag Spillinger (2025-11-25):**  
  > I think this question should be merged with the next one – which tasks they prefer doing with CLI and which with UI and why?  
  ↪️ **Reply by Jeremy Hoover (2025-11-25):**  
  > There are 2 reasons they go from CLI to UI:  
  > 1. Preference (possible in the CLI, but easier in the UI)  
  > 2. Forced (lacking something or not possible in CLI, required to go to the UI)

- Are there certain tasks you prefer not to do with a CLI? If so, which ones and why?  
  > 💬 **Comment by Jeremy Hoover (2025-11-25):**  
  > Should also understand what's forcing them to the Fabric UI from the CLI – what is missing from the CLI?

- Are there tasks that require you to go into the UI? If yes – what tasks and why can’t it be done in the CLI?  
- What causes friction or slows you down when working with a CLI?  
- Are there specific scenarios where you wish you had more visibility, control, or automation?

**For Citizen Developers:**

- How comfortable are you with CLIs and command-line tools? Have you used a CLI in your work?  
  > 💬 **Comment by Jeremy Hoover (2025-11-25):**  
  > Would avoid using "command-line" like this for citizen devs and stick to calling it "CLI."

- If yes: How often do you use CLIs, and for what kinds of tasks or scenarios?  
- If no or only a little: What has been your exposure to CLIs? If you’ve avoided it, what are the reasons – e.g., lack of need, too intimidating or hard to use?  
- What could help you feel more comfortable when using it?  
- What challenges have you faced when using CLI tools?  
- What parts of CLI seem most daunting or confusing?  
- When you need to accomplish tasks in Fabric or related tools, what do you usually use?  
- Can you think of tasks that you feel are better left outside of a CLI?  
- Why do you feel more comfortable doing those through the UI or another method?  
- How do you usually learn about new CLI commands or figure out how to do something with a CLI?  
  > 💬 **Comment by Jeremy Hoover (2025-11-25):**  
  > This seems relevant for Pro Developers as well  
  ↪️ **Reply by Avishag Spillinger (2025-11-25):**  
  > See my previous comment. And this is in general, not specifically about Fabric.  
  ↪️ **Reply by Jeremy Hoover (2025-11-25):**  
  > Removed the mention of Fabric above. The point is more that these questions are marked currently for Citizen Devs but would be relevant for Pros as well.

- Do you rely on documentation, online searches, Copilot suggestions, colleague help, or something else?  
- Can you share an example?  
- When you run into an issue or error in a CLI, how do you go about troubleshooting it?

`[BOTH]` Can you recall any frustrating experiences using a CLI?  
> 💬 **Comment by Jeremy Hoover (2025-11-25):**  
> Let's rework this so it is at least open ended and not yes/no.

...

(Continued in next message due to length)
Here’s the continuation of the full Markdown version of the file, including all comments and replies:

```markdown
#### 1.2 Perceptions & Value of CLI (15 mins, 35 total)

Now let’s discuss how you perceive the CLI itself, its benefits and drawbacks.

- What are your thoughts about using a CLI in general? Do you enjoy it, find it efficient, or is it a necessary evil for you?  
- What makes using the CLI safe vs risky? What information do you need to make this distinction?  
- Are there scenarios in your work where using the CLI feels essential – where no other tool or interface would do?  

**Probes:**  
- What makes the CLI indispensable in those scenarios? (e.g. automation at scale, speed, advanced control, scripting capabilities, etc.)  
- If you didn’t have a CLI available, what would you be unable to do or what would be much harder?  
- How do you see the CLI’s role alongside tools like AI assistants or Copilot?  
- Since tools like Copilot have become available, have you found yourself using the CLI more, less or about the same?  
- Are there tasks where Copilot has replaced the need for CLI scripting or automations? If so, which ones?  
- Are there situations where Copilot can perform the task but you still prefer to use CLI? If so, which ones?  
- Do you think Copilot impacts the need to learn commands and scripting or automation via CLI, or is it complementary?  
- How does the availability of Copilot – which uses natural language – affect how you think about using CLIs in the future?  

> 💬 **Comment by Jeremy Hoover (2025-11-25):**  
> I'd assume they are already using some sort of LLM/Copilot and it shouldn't be framed as a future thing.

- For example, if Copilot can help write code or run tasks, in what situations would you still turn to the CLI yourself?

#### 1.3 Fabric Integration & Expectations (15 mins, 50 total)

Let’s imagine how a CLI could be part of the Fabric experience itself.

_Open Fabric and share the screen with participant_

- What would you ideally want to be able to do with a CLI within Fabric’s interface?  
- Walk me through an expected process or scenario  
- How do you think about the relationship between what you do in the Fabric UI and the equivalent command or script?  
- If the UI could show you the equivalent command for an action, how useful would that be? Explain why.  
- If CLI was integrated into the Fabric platform (instead of just running in a separate terminal), how would you expect to interact with it?  
- Can you walk me through how you think it might look or work?  
- After they share their thoughts: Would you expect a built-in terminal window in the Fabric web UI, or something else?  
- What would make an integrated CLI feel natural to use within your workflow and add real value?

**Probes:**  
- Should the CLI remain a standalone tool that you run separately, or would you prefer it embedded in Fabric’s UI? Or a combination of both? Why?  
- How would you envision the CLI and Copilot working together if both are available? (e.g. using Copilot to generate CLI commands, or having CLI output feed into Copilot suggestions.)  
- What would help with switching between Fabric UI actions and commands? What can make that switch feel less awkward or disruptive?

> 💬 **Comment by Jeremy Hoover (2025-11-25):**  
> I think this is too direct/internal thinking, and participants won't really understand this question. Added a few others we can use instead to get to this point.

~~Can you recall a time when you switched between UI and a CLI tool? What made that experience smooth? What was frustrating or a blocker for you?~~  
~~What can make that switch feel less awkward or disruptive?~~

**[For pro developers]:**  
- If the Fabric UI offered a built-in CLI, how might that change the amount or type of work you choose to do directly in Fabric versus through your external scripting tools?

**[For citizen developers]:**  
- If the Fabric UI included an optional command box for running simple commands, how do you think you might use it (if at all)?  
- What would make a command box feel more approachable and safe for you to try out? (e.g. having ready-made command snippets, documentation at hand, etc.)  
- What would make writing or running simple commands feel easier or less intimidating?

**Probes:**  
- What kinds of guidance or support would help you learn how to use commands at your own pace (e.g. an in-app guide, auto-complete suggestions, better examples, or integration with Copilot)?  
- Would seeing examples or suggested commands help you get started? If yes – what would be most helpful?

**[BOTH]**  
- Are there any features or capabilities that if added to Fabric CLI, would meaningfully improve your Fabric workflow?

> 💬 **Comment by Jeremy Hoover (2025-11-25):**  
> I think these are very valuable questions but want to point out they are potentially outside the scope of this research, as they are focused on improvements to the CLI itself, rather than how it could/should be integrated into the UI.  
> ↪️ **Reply by Avishag Spillinger (2025-11-25):**  
> Let's discuss in our meeting

- What tasks feel harder than they should in the current CLI?  
- Which of your workflows would benefit from improved CLI support?  
- What would the Fabric CLI need to offer to become essential to your workflow over the next 12–18 months?  
- What would make you rely on it more than you do today?  
- Are there any specific, expanding responsibilities or scenarios that will make the CLI more critical than it is today?  
- If you could prioritize a few changes to the CLI, what would be at the top of your list and why?  
- Which of these would deliver the biggest impact in your day-to-day work?  
- Which of these would help you move faster or reduce friction?  
- Do you expect your reliance on the CLI to grow as Fabric evolves as a platform? If yes, what factors influence this?  
- Are there capabilities you expect to automate in the future?  
- If yes – is this growth driven primarily for scale, security, complexity or your role shifting?

---

## Wrap Up & Closing

- Before we finish, is there anything else you’d like to share about the CLI or its role in Microsoft Fabric that we haven’t covered?  
- Thank you for your time and feedback, please continue to share your thoughts with us.

> 💬 **Comment by Jeremy Hoover (2025-11-25):**  
> Should be clear – are these specific to Fabric CLI or CLI in general or both?  
> Mentioned: aspillinger@microsoft.com, rivkamoshe@microsoft.com, habos@microsoft.com
