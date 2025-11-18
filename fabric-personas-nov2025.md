# Azure Data Personas

**Benefits of Personas:** A wide range of users contribute to the end-to-end journey from data to insights and action. Understanding their roles, skills, tasks, and goals is key to making informed product and design decisions. **Personas as Archetypes:** Personas represent archetypes of user groups, providing a reference point. However, real users operate in complex, real-world contexts. Relying solely on personas can overlook these nuances, so they should be seen as flexible categories of JTBD (Jobs To Be Done), organized by their commonalities. These are simplified archetypes where we purposefully create differentiation to make it easy to articulate differences and understand how to think about user needs and structures. (The reality is far messier!) For more information on personas, you might reach out to workload researchers who have deep knowledge of personas related to their domain, or email **<fabricpersonas@microsoft.com>** for general assistance.

Below are the **Fabric (Azure Data)** personas, each with their profile details including role, quote, responsibilities (jobs), delighters, pain points, trends, and how they interact with others. All content is presented verbatim from the source for accuracy.

## Jian (Developer)

![Jian - Developer Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/3905217088-Jian.jpg)

**Role:** Developer (Application Developer)  
**Quote:** *“I build killer applications for end customers or great business tools.”*

**Overview:** Jian builds applications for end customers or business tools. Their goal is to create specialized applications that uniquely solve a consumer or business pain point. They are both a UI ninja and a back-end API connoisseur, so they can build apps pretty fast.

**Jobs:** (Key responsibilities)

*   Administer the database
*   Fix database problems
*   Generate database analytics, visualizations, and reports
*   Investigate problems with the database
*   Manage database security and access control
*   Migrate the database
*   Optimize database performance
*   Optimize database storage
*   Perform database operations
*   Research database records
*   Restore the database
*   Test the database

**Delighters:**

*   I can scale up or down as needed around the world with simple APIs.

**Pain Points:**

*   Transitioning from 3-tier architecture to lambda-architecture.
*   Data is coming from different stores.
*   Internet-scale challenges – bigger traffic spikes, larger data volumes, and multiple geographical locations.
*   Wishes for a more seamless handoff between the data science team and development of apps/solutions.

**Trends:**

*   Can’t afford the latency to transform the data on the app side, so have to pre-process it.
*   Translating data science output into developer-friendly languages.
*   Deploying models in different environments.
*   Wants an easier way to understand connections to models wherever they are deployed, so it’s easier to add smarts to solutions.
*   Understanding how a model works and choosing the best variables needs to be easier and more adaptive to changes in model traffic.

**Interacts with:** Data Scientist, Data Engineer (works closely with these roles to incorporate machine-learning outputs and ensure data pipelines meet app needs).

**Tools:** Eclipse, Visual Studio (VS), other IDEs; Swift/Android SDKs; Azure or AWS cloud platforms for app backend.  
**Coding:** C#, .NET, Java, JavaScript/HTML, medium SQL queries, APIs.  
**Data Types:** Key-value stores, relational tables (tuples).  
**Experience:** IDE development, command-line integration.  
**Processing:** Primarily interactive (millisecond-level) processing (apps often require real-time or on-demand interactions).

***

## Ren (Data Engineer)

![Ren - Data Engineer Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/965486843-Ren.jpg)

**Role:** Data Engineer  
**Quote:** *“The pipelines that I build are the foundation of our business intelligence.”*

**Overview:** Ren is the heart of the IT organization: they design and implement the infrastructure that powers many different applications and users. They operate and maintain the data stack, pull data from different sources, do data integration and prep, and set up data pipelines.

**Jobs:**

*   Gather requirements
*   Create implementation plan
*   Ingest data
*   Prepare (clean/transform) data
*   Validate and test data
*   Prepare for and deploy into production
*   Monitor and fix data pipeline issues
*   Create and publish BI models, datasets, or views
*   Build visualizations and publish BI reports
*   Create and maintain templates for data processing

**Delighters:**

*   Great support from cloud platform provider/implementer.
*   Clear documentation from the platform, with code comments giving context from authors.
*   Dedicated DevOps and QA teams to test for bugs and monitor systems.
*   Automation of testing new code that saves me time.
*   Tools that make it easy to optimize performance and cost for many of my customers.

**Pain Points:**

*   Ingesting increasingly large amounts of data is costly and challenging to scale efficiently.
*   Staying up to date with new technologies that may be more efficient or cost effective.
*   Converting unstructured data to structured data.
*   Working with data scientists who use different programming languages for analytics.
*   Creating and testing pipelines when we make a change to our architecture.
*   Dealing with clients changing their requirements mid-project.

**Trends:**

*   Increasing requirements for compliance with data privacy standards (e.g. GDPR).
*   Ongoing operation and maintenance of the system is increasingly handled by DevOps/QA.
*   “Big Data” and the role of “Data Engineer” are more clearly understood by the organization.
*   Less control over data and security due to migration to the cloud.
*   New technologies constantly becoming available makes it difficult to understand, develop, and maintain the environment.
*   Stream processing is desired but challenging to implement.

**Flavors:** (Variations among Data Engineers)

*   *By skillset:* Some data engineers are Spark/Python and SQL hybrids (know Spark/Python well and enough SQL for data engineering). Others might be strong in Spark/Python but not SQL, or vice-versa (database-focused who prefer SQL and stored procs).
*   *By seniority:* Senior Data Engineers tend to be more proficient in Spark and often have broader scope, tackling more complex tasks and creating templates for the team; junior Data Engineers focus on tactical implementation tasks.

**Documentation & Collaboration Practices:**

*   **Knowledge Transfer:** Data Engineers maintain a “coverage map” so peers can cover for each other. Every project is carefully documented (data flows, breakpoints, troubleshooting tips, scripts, templates) so any peer can pick up the work easily.
*   **Operational Fixes:** Fixing pipeline issues is core to the job (fixes might involve one’s own or others’ work). Knowledge sharing with peers is critical for effective troubleshooting.

**E2E User Journey:** *(Data Engineering end-to-end process is often illustrated in internal documentation with flow diagrams.)*

**Interacts with:** BI Engineer, Data Architect, Data Scientist, Developer (coordinates with upstream data producers and downstream consumers).

**Tools:** Eclipse, VS, SQL Management Studio, SSIS; Hive, Spark; PyCharm, IntelliJ (a mix of big data tools and standard IDEs for pipeline development).  
**Experience:** IDE development and command-line scripting for pipeline automation.  
**Coding:** Python, Java, Scala, SQL, .NET, R.  
**Processing:** Batch processing, streaming data processing.  
**Data Types:** Structured tables, unstructured data (files/streams).

***

## Desi (Data Scientist)

![Desi - Data Scientist Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/3598714764-Desi.jpg)

**Role:** Data Scientist  
**Quote:** *“I play a hybrid role of modeler, innovator, and programmer. I work with massive amounts of data to bring value by making business processes, products, and solutions smarter.”*

**Overview:** Desi plays a hybrid role of the modeler, innovator, and programmer. They work with massive amounts of data to bring value by building AI and ML models that make business processes, products, and solutions smarter. Desi is responsible for the design and planning phases of data science services, working closely with Data Engineers for data preparation. They then hand off to Analysts and Data Engineers to build out service features based on the models.

**Jobs:**

*   Understand business problem
*   Discover, explore, and understand data
*   Prepare data (for modeling)
*   Build ML model
*   Deploy and operationalize ML model
*   Analyze and present insights
*   Document project details

**Delighters:**

*   Reimagining a service model from the ground up.
*   Working hands-on with actual data to test my models.
*   Setting up automation of time-consuming tasks around resource management.
*   Clear channels of communication between teams and clients.
*   Researching and implementing better tools and IDEs.

**Pain Points:**

*   Locating data in a decentralized organization.
*   An overwhelming number of data quality checks.
*   Delayed adoption of novel tools and IDEs.
*   Integration of modern services with legacy systems.
*   Managing client’s evolving design requirements.
*   Architecting systems and models to maintain security of cloud data storage.

**Trends:**

*   Investment in machine learning systems is increasing.
*   Greater transparency of expectations for scope of service (what Data Science teams deliver).
*   Generating trust in data transformation and analysis (explainability, reliability).
*   Transition towards cloud storage solutions for data.
*   Always searching for better tools (rapid evolution in the DS toolkit).

**Flavors:** Some data scientists are **full-stack** (end-to-end) while others are more **specialized**. This often reflects the maturity of data science in the organization:

*   **Full-Stack Data Scientists:** Manage end-to-end workflows, including some ETL and deployment. Typically embedded in business units or on “Data Science & Analytics” teams in organizations without mature data science culture.
*   **Specialized Data Scientists:** Focus on developing algorithms and models, usually working with Data Engineers for ETL and ML Engineers for deployment. Common in organizations with mature data science practices.

In practice, Data Scientists can also play dual roles as analysts, especially when spread out in an org. Often they spend **20%** of their time on pure data science vs **80%** on analytics (ad-hoc analysis or full-blown BI reports) because business needs fast insights. A complex data science project might take 3-6 months, whereas simpler analytics deliverables can be 2 weeks to 2 months. (This imbalance can occur due to lower maturity or understanding of data science in the business units.)

**E2E Process & Collaboration:** For example, an end-to-end process might involve building an alternate forecasting model (e.g., at T-Mobile, \~3 months project) – while not mature, it shows real context of how Data Scientists collaborate within a business with hand-offs, iterations, etc.

**Interacts with:** Analyst (Ash), Data Architect (Ari), Data Engineer (Ren), Developer (Jian). Works with analysts to ensure results are actionable, with architects for infrastructure, with engineers for data pipelines, and with developers when integrating models into applications.

**Tools:** Jupyter notebooks, R Studio, PyCharm, IntelliJ; uses various open-source Python or R libraries. (Often leverages a mix of scientific computing environments and coding IDEs.)  
**Experience:** Software, data, and AI engineering workflows (comfortable moving between coding and statistics).  
**Coding:** Python, R, SQL.  
**Processing:** More batch than streaming (typically running experiments and batch training, less real-time).  
**Data Types:** CSV, JSON (structured files), plus unstructured and structured data from databases or data lakes.

***

## Ash (Analyst)

![Ash - Analyst Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/1057929426-ash.jpg)

**Role:** Analyst  
**Quote:** *“I spend way too much time formatting reports for my end users.”*

**Overview:** Ash is responsible for performing statistical data analysis and delivering insights about their domain to the business. They are often a Subject Matter Expert (SME) in their domain. Ash has learned to use Power BI as part of their business workflow.

**Jobs:**

*   Creating reports
*   Formatting visuals to exactly meet end user requirements
*   Preparing or transforming data in the query editor
*   Creating calculated measures
*   Publishing reports to the service
*   Creating workspaces
*   Managing access to workspaces and reports
*   Sharing reports
*   Creating and sharing dashboards

**At a Glance:**

*   Spends all their time creating **beautifully formatted reports**.
*   Ash wants to take their visualizations to the *next level*.
*   They train their stakeholders to use Power BI effectively.
*   They are also a Power BI admin, which is tedious for them.

**Goals:**

*   Produce accurate and meaningful insights from data.
*   Take visualizations to the next level (high impact visuals).
*   Find and synthesize the appropriate data for their domain.
*   Ensure the right people receive the right information at the right time.

**Pain Points:**

*   Formatting an entire report takes too much time, especially for branding and fine-tuned visual controls.
*   Theming in BI tools is too hard to use.
*   Custom visuals are unreliable and difficult to make.
*   Managing workspaces and access to reports is time-consuming.
*   Inability to copy/paste between Power BI reports means recreating the same visuals repeatedly.
*   Setting up data refresh on reports is cumbersome.
*   Too much time spent training end users on how to use reports effectively.

**Interacts with:** *(Instead of specific other personas, Ash faces challenges in their interaction with tools and stakeholders such as:* onboarding to Power BI, using axes and filters correctly, fixing data errors, formatting visuals and reports, preparing data for Power BI, collaborating in workspaces with others.) Ash often acts as the bridge between raw data and business consumers like Nat or Vic, translating technical output into business insights.

*(Ash’s persona includes narratives about their learning curve and power user challenges, omitted here for brevity. They encountered steep learning curves in Power BI, confusion about certain features, difficulty setting up sharing vs. apps, etc., and even after getting proficient, still struggle with labor-intensive formatting and training duties.)*

**Tools:** Power BI, Excel (the primary tools Ash uses to analyze data and present reports).

***

## Binh (BI Engineer)

![Binh - BI Engineer Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/4261158159-binh.jpg)

**Role:** BI Engineer (also referred to as BI Architect in some cases)  
**Quote:** *“I am jack of all trades, master of one (BI).”*

**Overview:** Binh is a versatile BI Engineer responsible for creating and maintaining data models that can be used to build useful reports to answer end user questions about the business. Binh spends most of their time bringing in, cleaning, and structuring data for their specific business area needs. They bridge the gap between business needs and data/IT requirements, often doing a bit of everything from data prep to report creation.

**End-User Interaction:** Binh interacts closely with end users—exploring data, creating reports, and sharing insights. While Binh does not manage core data infrastructure or set up hardcore ETL processes (those are Ren’s tasks), they play a critical role in *bridging business needs with data capabilities.*

*   **Communication with End Users:** Binh frequently engages in extended requirement-gathering sessions due to evolving or unclear end-user needs, and acts as a liaison between IT and business units. Often, Binh’s manager helps facilitate these conversations and provides direction.
*   **Data Preparation:** In addition to building reports, Binh is responsible for bringing in, cleaning, and structuring data to answer specific business questions—often uncovering additional insights beyond the original request. Binh sees it as part of their responsibility to help insight-seekers (like business stakeholders) understand the broader potential of data.
*   **Report Creation:** Binh creates reports that not only meet business needs but also demonstrate the value and capabilities of the data (sometimes going above and beyond the initial ask).
*   When Binh works solely in a BI Engineer capacity (as opposed to also doing analysis), collaboration with Analysts (Ash) increases, especially around prepping and integrating data for reports.

**Pain Points:**

*   “Binh faces challenges like maintaining source control, managing gateways, and addressing data quality issues, which can complicate their workflow.” In practice this means:
    *   Maintaining **source control** over BI assets (like ensuring versioning of datasets/reports) is difficult.
    *   Managing data gateways effectively when using the same data sources across multiple workspaces.
    *   Monitoring and solving performance issues at all levels of the stack (server hardware, configuration, partitioning, query tuning in the BI infrastructure).
    *   Identifying and correcting data errors and quality issues.
    *   Creating custom visuals (which might break or be hard to implement).
    *   End users often do not know exactly what they want from their data, leading to iterative report changes.
    *   Learning DAX and deciding between DAX vs M (Power Query) for measures can be challenging.

*(Additional context such as “adjacent persona tasks” and the evolving nature of the BI Engineer role with AI was in the source but is omitted for brevity.)*

**Interacts with:** Traditionally, there has been a hard line between the Analyst (Ash) and BI Engineer (Binh) roles, but in reality the roles overlap (“a square is a rectangle but a rectangle is not always a square: a Binh is an Ash, but an Ash is not always a Binh”). Binh often works hand-in-hand with Analysts. Binh may also collaborate with Data Engineers (Ren) when needing new data pipelines or with Data Architects (Ari) when scaling models to enterprise level.

**Tools:**

*   **Power BI** – used to create reports, custom visuals, and dashboards (supports DAX for measures).
*   **SQL (Fabric SQL Endpoint or Lakehouse)** – used to write queries, build data models, and perform some ETL/ELT for datasets.
*   **Data Warehouse / Lakehouse** – stores structured data models that Binh designs or utilizes as a foundation for reporting.
*   **Fabric Notebooks (potentially)** – may be used for deeper data exploration or collaboration with more technical personas (like Ash or Ren) for advanced data prep.
*   **Source Control (e.g., Git)** – used to store/manage report files and models, enabling versioning and team collaboration on BI artifacts.
*   **Office tools (PowerPoint, Excel)** – used to present reports and insights to stakeholders in a polished format, or to do quick ad-hoc analysis (Excel).

*(Binh’s persona source included more research references and notes on evolving role with AI integration, which we omit here.)*

***

## Nat (BI Consumer)

![Nat - BI Consumer Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/3924419065-Nat.jpg)

**Role:** BI Consumer (Business User)  
**Quote:** *“What is the difference between a report, dashboard, and app? Why should I care?”*

**Overview:** Nat is a non-technical business professional who uses data to make business decisions. They are not very tech-savvy and are not a heavy user of Power BI. Nat is an end user of BI reports created by analysts (Ash) or BI Engineers (Binh). They can be found in a wide range of business roles (manager of operations, sales, marketing, HR, finance, customer support, admin, supervisor, etc.). Nat is always short on time and wants to find what they need quickly. It’s important to note: Nat is very intelligent in their domain, but not tech savvy, and they don’t have time to learn complex BI tools. They log into the BI tool only a few times a week (or less), and often forget how to do things between sessions.

**Jobs / Activities:**

*   Viewing reports that others have shared with them.
*   Verifying if a report they’re looking at is accurate, recent, and relevant.
*   Analyzing the report to understand the data and insights for their area.
*   Taking screenshots of visuals to ask follow-up questions if something looks off.
*   Taking screenshots or exporting visuals to include in presentations or to print and share in meetings.
*   Occasionally sharing the data/insights with their own stakeholders (sometimes directly from Power BI service via a link or export).

**Goals:**

*   Have confidence that they understand the data and can effectively make decisions based on it.
*   Easily access and monitor the reports they care about to improve operations.
*   Improve business operations by leveraging data to identify inefficiencies.
*   Look across all business units (or relevant areas) to evaluate performance for quality improvements.
*   Drive effective conversations about the data to ensure successful decision-making and course-corrections for underperforming areas.

**Pain Points:**

*   *Finding what they need* using Power BI navigation – they don’t understand the difference between a **report, dashboard, and app** in Power BI, which causes confusion. (Everything is just “a report” to Nat.)
*   Confusion when the position of common actions differs between a dashboard vs. a report (the UI inconsistency is frustrating, since they consider all of it as just “a report”).
*   Finding the report they care about is hard – they mostly rely on old email links or browser bookmarks to find it. (Sometimes they even export and save a report locally as a workaround.)
*   When they do get to a report, being able to see the relevant view of data (via slicers/filters) is frustrating if they cannot save that view.
*   Not knowing what filters are applied – they often don’t notice or understand the filter pane on the right.
*   Refreshing a report to ensure it has the latest data – they’re not sure *how* to refresh, or if what they see is up-to-date. (They can’t tell if the data is current.)
*   Slow load times for reports with large data sets, which makes them think something’s wrong or makes them impatient.

**Interacts with:** Nat primarily interacts with the **BI outputs** rather than other personas. They might reach out to an analyst (Ash) or BI engineer (Binh) if something is confusing or appears wrong in a report. From Nat’s perspective: their interaction is with the *tool* (Power BI) and the *provider* of the report (often Ash). They may also interface with Vic (Insights Explorer) in that Vic could be Nat’s manager who is a more advanced consumer guiding them.

*(Nat’s persona is essentially the archetype of a busy manager/professional consuming BI. They rely on others to produce analytics, and their focus is on quick, reliable, easy-to-digest information.)*

**Tools:** Primarily Power BI Service (to view reports). Occasionally Excel (if they export data or receive spreadsheets) or PDF/printed reports. Nat does not do any development, so they stick to consuming in the simplest way possible.

***

## Ari (Data Architect)

![Ari - Data Architect Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/1034025337-Ari.jpg)

**Role:** Data Architect  
**Quote:** *“To design effective infrastructure, I need to be up-to-date on technology, and be an expert in the business.”*

**Overview:** *I plan and design the infrastructure and am responsible for intaking and storing the data that drives the company. I don't always write the code for the systems I architect, but I will create proof of concepts and work with vendors to find the best product to fit our needs and work closely with the engineers and write specs so they know exactly what to build.* (Ari’s overview from the source, partially in first person.)

In other words, Ari plans and designs data infrastructure. Ari might not implement everything personally (they might not write all production code), but will create POCs, evaluate and select tools or vendors, and produce detailed specifications for engineers like Ren to build. Ari sits at the intersection of understanding new technology and the business’s needs to ensure the data architecture meets current and future requirements.

**Jobs:**

*   Understand requirements (business and technical).
*   Design the proof of concept (POC) for a solution.
*   Design the end-to-end solution (architecture).
*   Share the vision of the solution and get buy-in from stakeholders.
*   Assemble the implementation team (the engineers, etc.).
*   Guide the building of the solution.
*   Manage implementation of the solution.
*   Identify and implement improvements in the solution over time.
*   Design the database schema and systems.
*   Share design specifications with stakeholders and engineers.
*   Guide implementation of the database.
*   Manage implementation of the database.
*   Identify improvements in the database.
*   Help develop processes and frameworks that other developers use to deliver solutions.
*   Train and educate clients (or internal teams) to use the solution.

**Delighters:**

*   The wide variety of services available on cloud platforms make it easy to set up and scale infrastructure and data pipelines.
*   Leveraging prebuilt tools from external sources (cloud providers, vendors) allows quick addressing of specific requirements.
*   Having the freedom to use whatever tools/services needed to best address our needs.

**Pain Points:**

*   Getting data from ingestion into the destination database is inefficient when integrating many disparate data sources (multiple sources make ingestion architecture complex).
*   Clients’ requirements for data collection shift frequently, causing extra re-work on ingestion and integration.
*   Constantly having to learn about and assess new tools and services that are released – it’s time-consuming and overwhelming to stay current.
*   Working with clients who are unsure about what they want or are nervous about cloud-based solutions/security (managing stakeholder expectations and concerns is challenging).
*   Planning infrastructure for clients who have difficult hardware/software constraints or legacy systems can be problematic.

**Trends:**

*   Less and less actual coding is required as part of a Data Architect’s day-to-day job (more configuration/integration of managed services).
*   Architects are sometimes responsible for working directly with clients to gather requirements, explain how the technical solution will solve their problems, and train engineers on the services deployed.
*   Hosting data services in the cloud has led to greater access to documentation and community solutions, providing more troubleshooting options and quicker ways to solve issues.

**Interacts with:**

*   **Developer (Jian):** Ari provides guidance or frameworks to application developers on how to use the data infrastructure.
*   Additionally, Ari interacts with **client teams** (or business units) – explaining what is possible and managing expectations (“communicating the technical knowledge of the solutions to client teams, so we can work with them to explain what is possible and what to expect”).
*   **Project Managers:** who gather requirements from business stakeholders – Ari takes those requirements and turns them into technical architecture and specifications. Ari works closely with project managers to ensure what’s being built aligns with business needs.

**Tools:**

*   Hadoop, Data Lake technologies
*   Data Warehouse platforms
*   Traditional Databases
*   ETL tools
*   Hive, Spark (EMR or similar big data processing frameworks)
*   Pentaho (and other data integration or modeling tools)

**Experience:**

*   IDEs and command line for scripting, plus BigQuery, Kafka, general cloud data storage services (Ari deals with a variety of data storage and messaging technologies).

**Coding:**

*   Java, Python, SQL, Scala (though Ari may code mainly for prototyping or scripting, they are proficient in multiple languages to understand how all pieces fit).

**Processing:**

*   Batch and Streaming – Ari designs for both transactional processing needs and batch ETL, and possibly streaming pipelines, focusing on scalability and reliability.

**Data Types:**

*   Mostly unstructured and structured data (Ari must account for all data formats in the architecture).

***

## Vic (Insights Explorer)

![Vic - Insights Explorer Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/588228260-Vic.jpg)

**Role:** Insights Explorer  
**Quote:** *“I want to easily tweak the report, changing the time frame or other attributes.”*

**Overview:** Vic is responsible for tracking the growth of the business and communicating upward (to executives). Vic is a BI report consumer who is more tech-savvy than Nat. They spend a lot of time working with Ash (the analyst) to design the right reports and ensure their needs are met. Vic is typically found in organizations of all sizes, often as a manager or team lead in a specific business function (Finance, Marketing, Operations, etc.). Vic often has a role in driving strategy and performance for the business. Vic’s role evolved from being just an end user (like Nat) to an “insights explorer” – they are motivated to ensure business performance is accurately communicated to C-level execs. They demand a lot from analysts like Ash in terms of report creation, and they take a hands-on role in how reports are designed. Vic also wants the ability to do some tweaks on their own to get the exact view of data they need.

**Key Actions & Behaviors:**

*   Reviewing reports in the BI service regularly to ensure accuracy, completeness, and consistency of metrics. (Vic might log in daily to check key dashboards.)
*   Conducting ad-hoc analysis to answer questions for themselves or stakeholders (e.g., exporting data to Excel or using filter capabilities to answer specific questions).
*   Exporting data to Excel from Power BI (since they like to pivot or examine details freely).
*   Filtering or creating slightly modified visuals of data when needed (e.g., changing the time frame, adding a category filter) – essentially performing light report editing or what-if analysis.
*   Sharing data with others – usually high-level execs or stakeholders. Vic often needs to package the insights (maybe in slides or via email) for executive consumption.

**Role Evolution:** Vic used to be just a consumer like Nat, but has become more of a power user of BI (hence “Insights Explorer”). Vic is motivated by ensuring that business performance is accurately reflected in reports that go to executives. Vic often pushes Ash to refine or redesign reports and might even get access to tweak things. Vic still has the same ease-of-use needs as Nat – they are not a developer – so if the BI tool is too hard, they resort to exporting to Excel for flexibility. They \*avoid using complex features like**Power BI filters** if those are confusing. They can’t easily tell what filters are applied in a shared report, which frustrates them. That’s why they export data to Excel to slice it there. Vic also wants easier ways to share reports – they might find subscriptions in Power BI annoying if they get too many separate emails for each page.

*(The source included a detailed table for Vic’s primary use cases, goals, frequency of use, etc., which is summarized here in prose.)*

*   **Primary use case:** Conveying reports to stakeholders (e.g., presenting to execs) and tweaking reports on their own to get the views they need.
*   **Primary goal:** Ensure the data is accurate and visuals are “just right” to reflect performance, so that leadership gets a clear picture.
*   **Frequency of use:** Power BI Desktop (authoring) – **Never** (Vic doesn’t create reports from scratch); Power BI Service – **Daily** (they check and interact with reports frequently).
*   **SAAS Behavior:** Vic creates dashboards or uses existing ones, manages access sometimes (if bridging to others), views reports others shared, may edit reports in the service if collaborating with an analyst, exports to Excel, and makes minor tweaks (like changing filters, time slices) to get different views. They often share these findings with others in the org.

**Pain Points (implied from behaviors):**

*   Vic can’t tell easily what filters are applied in a given report view, leading to confusion (“Why do these numbers look different? Oh, a filter was on.”). The filter pane UI is not intuitive enough for them, so they mostly ignore it – which can cause misinterpretation.
*   Vic gets frustrated with the time it takes to download data from Power BI to do further analysis. They often ask Ash why something isn’t easier in the tool (e.g., “why do I have to export to Excel to do X?”).
*   Vic wants easier sharing options – e.g., the subscription feature sends separate emails per report page which they find cumbersome, as they’d prefer a single summary or a more integrated way to share.

*(Additional interesting points in source):* Vic’s role changed after adopting Power BI. Initially, Vic had to learn how to use reports, but now Vic’s focus is on **communication of performance**. Vic has more reporting needs than before to meet the demands of execs. Vic learned a little bit about tweaking data because Ash can’t pre-build every view Vic might question. So Vic exports to Excel, filters data, creates pivot charts if needed to answer specific follow-up questions (essentially doing mini-analysis outside of Power BI). Vic will never build a report from scratch or use the full Desktop app (they tried training on it, but don’t have time or need to become a report author). Vic’s ideal is that the service would let them do everything they need easily.

**Interacts with:** Ash (Analyst) frequently – Vic works with Ash to design and refine reports. Vic also interacts with high-level executives (Vic prepares the output for them), acting as an intermediary between the data and the leadership. Vic might occasionally collaborate with Binh (BI Engineer) if data needs to be adjusted in the model for their reports.

**Tools:** Power BI (service, for consuming and slight editing), Excel (for ad-hoc exploration beyond what the service easily allows).

***

## Gael (DB Admin)

![Gael - DB Admin Persona](https://microsoft.sharepoint.com/teams/ResearchinDataCloudStudio/SiteAssets/SitePages/Personas\(1\)/3177819740-Gael.jpg)

**Role:** Database Administrator (DB Admin)  
**Quote:** *"I need to be as proactive as possible. Because I want to be the one telling them versus them telling me.”*

**Overview:** Gael performs database maintenance tasks such as backups, restores, upgrades, and storage and performance management. Gael also reviews change requests and monitors/troubleshoots performance issues on databases. In essence, Gael is the custodian of database health in the organization, aiming to find and fix issues before users notice them.

**Jobs:**

*   Manage data warehouse security (and database security)
*   Create standards and policies for database management
*   Coordinate data ingestion (decide what goes where, if a new schema or table is needed, etc.)
*   Optimize, troubleshoot, and resolve data warehouse performance issues
*   Automate the management of data warehouse workloads
*   Define alerts on potential performance or data integrity issues
*   Track growth of the data warehouse (capacity planning)
*   Manage backups, recovery procedures, clones, and data retention periods in the warehouse
*   Monitor data warehouse usage: access patterns, transaction volumes, response times, concurrency, etc.
*   Manage data warehouse costs
*   Manage data warehouse availability, upgrades, and maintenance schedules
*   Perform data warehouse audits (regular checks for compliance, etc.)
*   Train end-users (like developers or analysts) to use SQL more efficiently (to avoid poor queries)
*   Create documentation (for procedures, standards, known issues, etc.)

(*The source says “View jobs by task” indicating Gael might categorize tasks by type, but essentially the above is the scope.*)

**Delighters:**

*   Finding problems *before* the customer does. (Gael loves being proactive and catching issues preemptively.)
*   Avoiding escalation of high-profile customer issues to the EVP level (no surprises to leadership because Gael catches them early).
*   Quickly resolving customer performance issues when they arise.
*   Automation that allows scaling the management of critical workloads (anything that automates routine DB tasks is a delight).

**Pain Points:**

*   Unplanned weekend and on-call work (the nature of reactive DB admin – trying to minimize this).
*   Fixing problems caused by “self-appointed Dev DBAs” (developers making db changes or bad queries without DBA oversight, causing issues Gael must fix).
*   Managing **alerts** – currently Gael might receive 4,000 alerts a day via email (too noisy to handle).
*   Currently understaffed due to growth and turnover – so it’s hard to keep up with issues and to train new staff. Training and retaining staff so they understand, react to, and solve customer issues is an ongoing challenge.
*   Currently, access to customer databases and database servers is restricted to Bash/SSH and psql (no fancy GUI or full admin rights due to security) – this makes some tasks harder.
*   License cost (probably of database software or tools) is a concern – likely managing costs of DB systems.

**Trends:**

*   Monitoring SQL jobs in production and being responsible for load/hardware analysis mapping, fault tolerance, and security is more important than ever (the DBA’s role is very critical in uptime and analysis of workload).
*   Responsible for maintaining and testing HA/DR (High Availability/Disaster Recovery). This may include actually testing restores and failovers to meet SLAs for the business applications.
*   Involved in review of database applications and any data warehouse/data lake projects (the DBA is brought into project discussions to ensure new apps meet standards).  
    *(The source shows “Interacts with” Data Architect and mentions Sys Admins in context.)*

**Interacts with:**

*   **Data Architect (Ari):** Gael works with Ari to ensure the design is implementable and maintainable. For example, Ari might design a system and Gael will implement/manage it, or Gael provides feedback on designs from an operational standpoint.
*   **Systems Administrators:** The SysAdmins keep the servers and networks running. Gael works with SysAdmins to ensure database servers (whether on-prem or VM) have proper resources, patches, etc. SysAdmins manage hardware/OS, while Gael manages the database layer. They collaborate on performance and security (SysAdmin deals with OS/network security; DB Admin with data security, but they overlap in practice).

*(From source: SysAdmins “keep networks and systems running, manage server installs, monitor systems for security and performance.” Gael would coordinate with them especially on any infrastructure-related DB issues.)*

**Tools:**

*   SSMS (SQL Server Management Studio)
*   psql (PostgreSQL command-line)
*   pgAdmin (Postgres GUI)
*   Sublime Text (for scripting)
*   Native database commands (e.g., PostgreSQL commands like VACUUM)
*   SSIS (SQL Server Integration Services, for some maintenance or data movement tasks)

**Experience (Technologies):**  
Gael has experience with a range of database systems:

*   PostgreSQL
*   Oracle
*   Sybase
*   SQL Server
*   MySQL
*   MongoDB
*   Hadoop ecosystems
*   Cassandra, HBase
*   ElasticSearch, Solr (search/datastore technologies)

(This breadth shows Gael likely has to deal with multiple storage systems in the enterprise.)

**Coding:**

*   T-SQL (Transact-SQL for Microsoft SQL)
*   PL/pgSQL (Postgres SQL scripting)
*   Python (for scripting/automation)
*   Bash (shell scripting for automation)

**Processing:**

*   Transactional processing (OLTP)
*   Batch processing
*   Streaming data processing (Gael may oversee systems that do all types, ensuring reliability and performance in each category)

**Data Types:**

*   Structured data
*   Unstructured data (Gael handles both, from structured relational tables to unstructured files or NoSQL data)

***

## Persona Summary Table

| **Persona (Name)** | **Role**                    | **Primary Goals**                                                                                | **Primary Pain Points**                                                                                                                    | **Key Tools**                                                                                        |
| ------------------ | --------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Jian**           | Developer (App Dev)         | Build innovative applications quickly; delight end-users with specialized apps.                  | Data integration complexities; bridging app and data science outputs; scaling architecture for spikes.                                     | Visual Studio, Cloud SDKs (Azure/AWS), APIs, DB access tools.                                        |
| **Ren**            | Data Engineer               | Design and maintain data pipelines & infrastructure; deliver clean, prepared data for analytics. | Scaling data ingestion efficiently; dealing with ever-evolving tech and large data volumes; accommodating changing requirements.           | Spark, SQL, ETL tools, cloud data services (storage & compute).                                      |
| **Desi**           | Data Scientist              | Develop ML/AI models to provide business value; innovate with data insights.                     | Accessing and prepping data in siloed org; too many manual checks; integrating new tools with legacy; demonstrating model value quickly.   | Jupyter Notebooks, R/Python libs, ML frameworks, Power BI (for results).                             |
| **Ash**            | Analyst (BI Analyst)        | Produce accurate, insightful reports; create visually polished dashboards.                       | Time-intensive report formatting; tech limitations (theming, custom visuals); managing sharing and training users.                         | Power BI (Desktop & Service), Excel.                                                                 |
| **Binh**           | BI Engineer                 | Model and prepare data for BI; deliver self-service data for reporting; bridge business and IT.  | Source control & environment management; data quality issues; heavy workload of support; user data requests evolve frequently.             | Power BI, SQL databases, data modeling tools, version control (Git).                                 |
| **Nat**            | BI Consumer (Business User) | Make informed decisions using data; easily access relevant metrics.                              | Difficulty navigating BI tools; not knowing if data is up-to-date or filtered; limited time for learning tool nuances.                     | Power BI Service (viewing), Excel (for offline viewing).                                             |
| **Ari**            | Data Architect              | Design scalable, secure data architecture aligned with business needs; choose right tech stack.  | Constantly vetting new tech; frequent requirement changes; ensuring integration of many data sources; educating stakeholders on solutions. | Cloud data services (DWH, Lakes), Hadoop eco., architecture diagrams, POC tools.                     |
| **Vic**            | Insights Explorer           | Continuously monitor business metrics; customize and share insights with execs promptly.         | Limited ability to tweak reports in BI tool; unclear filter states; inconvenient sharing options requiring workarounds (Excel).            | Power BI Service (advanced use), Excel, PowerPoint.                                                  |
| **Gael**           | Database Administrator      | Ensure database reliability, performance, and security; preempt issues and maintain uptime.      | Overwhelming alert volume; after-hours emergencies; constraints on access/tools; understaffing for DB ops needs.                           | SQL management tools (SSMS), DB consoles (psql, pgAdmin), monitoring dashboards, automation scripts. |

## Persona Metadata (Tags for AI Classification)

*   **Jian (Developer)** – Tags: developer, application dev, full-stack, frontend/backend, coding-focused, API consumer.
*   **Ren (Data Engineer)** – Tags: data pipeline, ETL developer, big data, infrastructure, backend data processing, scalability.
*   **Desi (Data Scientist)** – Tags: machine learning, AI modeler, data analytics, statistical, programming+math, model deployment.
*   **Ash (Analyst)** – Tags: BI analyst, report creator, data visualization, domain expert, Power BI user, data storyteller.
*   **Binh (BI Engineer)** – Tags: BI developer, data modeler, report engineer, bridging IT and business, self-service BI, data prep.
*   **Nat (BI Consumer)** – Tags: business user, report consumer, non-technical, decision-maker, end-user, needs simplicity.
*   **Ari (Data Architect)** – Tags: architect, planner, infrastructure designer, technical strategist, data platform, big picture.
*   **Vic (Insights Explorer)** – Tags: power user, business analyst manager, metric tracking, report tweaker, advanced consumer, strategic analyst.
*   **Gael (DB Admin)** – Tags: DBA, operations, maintenance, database performance, security, reliability, proactive monitoring.

## Suggested Use Cases for Personas in Product Design

*   **Jian (Developer):** When designing SDKs or APIs for a platform, consider *Jian’s* needs – e.g., easy-to-use APIs, clear documentation, and integration samples. In Fabric’s context, ensure that developer-centric features (like embedding capabilities or custom applications on the data platform) are straightforward so Jian can quickly build applications on top of the platform.

*   **Ren (Data Engineer):** For data ingestion and transformation services (like Fabric Data Pipelines or Lakehouse), *Ren* should be top-of-mind. Provide scalable pipeline tools, automation and scheduling features, and robust monitoring – Ren wants to efficiently ingest and prep data. Product decisions around performance tuning options or pipeline templates directly benefit Ren.

*   **Desi (Data Scientist):** In designing the data science experience (Fabric’s notebooks, ML integrations, etc.), consider *Desi’s* workflow. Ensure seamless data access for model training (so Ren’s prepared data is easily accessible), integration of popular ML frameworks, and easy deployment of models. Features like integrated notebooks, AutoML, or the ability to use R/Python in Fabric speak to Desi’s needs.

*   **Ash (Analyst):** For the BI reporting interface (Power BI within Fabric), *Ash* is the archetype user. Improve formatting capabilities (themes, alignment guides), provide easy ways to reuse visuals and templates, and streamline sharing and workspace management. Any time we simplify a report-building step, we’re making Ash more productive. For example, a feature that auto-suggests visual formats could address Ash’s pain of spending too much time on polishing reports.

*   **Binh (BI Engineer):** Binh benefits from features that enable **data modeling and governance** in Fabric. We should provide a robust semantic model layer, version control integration for datasets/reports, and maybe a *difference viewer* for changes in reports. Binh is also a candidate for admin-oriented features in BI (like usage analytics, performance analyzer for reports) to help optimize and troubleshoot the BI ecosystem.

*   **Nat (BI Consumer):** When adjusting the user experience of the consumption layer (e.g., the Power BI app or Teams integration), *Nat’s* perspective ensures it remains simple. Features like bookmarks or natural language Q\&A in Power BI are built for Nat – they help a non-technical user get answers without deep know-how. Ensuring that the default view Nat sees is uncluttered and that important information (like last refresh time) is clearly visible will improve Nat’s confidence.

*   **Ari (Data Architect):** Platform-level decisions (like multi-cloud support, data integration options, security and compliance features) should involve *Ari’s* persona. Ari will push for things like enterprise security controls, the ability to plug in third-party tools, and documentation on architecture best practices. For instance, including a **Data lineage** feature or architecture diagrams in our docs helps Ari plan and trust the system.

*   **Vic (Insights Explorer):** Vic is a power user of the BI service – to serve Vic, we might develop features such as *personalized view persistence* (so Vic can save a tweaked version of a report for themselves), better filter visibility (so it's obvious what’s being filtered), and improved distribution (like storyboarding or report commentary for sharing up the chain). Vic’s feedback would emphasize flexibility and communication – e.g., a commentary feature on dashboards that Vic can use to annotate before sending to execs.

*   **Gael (DB Admin):** For backend administration features (Fabric’s admin portal, capacity settings, SQL endpoint management), *Gael* is crucial. We should include rich monitoring dashboards, customizable alerting (to reduce noise), and perhaps an assistant that recommends actions (like index improvements or scaling decisions) so Gael can be proactive. Also, features like automated backup/restore with easy drill-down logs directly empower Gael.

In summary, each persona can be used as a lens during product development:

*   If building or refining a **developer API**, ask: “Does this meet Jian’s expectations for quick, powerful integration?”
*   When adding a **data pipeline feature**, check: “Will Ren be able to use this to ingest or transform data more easily?”
*   If enhancing **machine learning capabilities**, confirm: “Does this provide value to Desi’s modeling workflow?”
*   For **report authoring UX**, consider: “Will Ash and Vic find this both powerful and easy? Are we balancing Ash’s need for control with Nat’s need for simplicity?”
*   For **admin and governance** updates, ensure: “Are we equipping Gael to manage the system without being overwhelmed? Is Ari able to align this with corporate standards?”

By mapping features to these personas’ needs, we ensure the Fabric platform addresses the end-to-end user journey from data ingestion to insight consumption effectively.

## Commentary: Using Personas to Guide Product Decisions in Data & Cloud

These personas collectively inform a holistic approach to designing a data platform like Microsoft Fabric:

*   **End-to-End Workflow Coverage:** They ensure that we cover every phase – from data acquisition (Ren) and storage (Gael) to analysis (Ash/Desi) and final usage (Nat/Vic/Jian). For example, understanding *Ren’s* and *Gael’s* needs led us to include robust pipeline monitoring and database admin tools in Fabric, while *Nat’s* and *Vic’s* feedback steers us to keep the Power BI interface intuitive.
*   **Balanced Development Priorities:** By empathizing with both technical personas (developers, data engineers, DBAs) and business personas (analysts, consumers, managers), we avoid building a solution that skews too much in one direction. In practice, this meant, for instance, investing in **self-service BI** features (for Ash and Vic) while simultaneously providing **pro-code extensibility** (for Jian and Desi).
*   **Design for Collaboration:** The interactions between personas highlight where hand-offs occur (e.g., Desi -> Ash, or Ren -> Ash/Vic, etc.). Recognizing these hand-offs influenced product features like integrated workspaces where data engineers and analysts collaborate, and the inclusion of comments or shared workbooks. We want to smooth the points where, say, *Desi* passes a model to *Ren* for deployment or *Ash* needs something from *Ren*’s data pipeline.
*   **Tailored Experiences:** Each persona’s frustration points guided micro-decisions in UX. For instance, *Nat’s* confusion with reports vs dashboards prompted clearer labeling and perhaps a simplified “Favorites” section in the navigation. *Vic’s* desire to tweak prompted us to allow personal bookmarks in reports. *Jian’s* requirement for speed and clarity led to providing code samples and SDKs in multiple languages.
*   **Future Planning:** Trends observed by personas helped anticipate future needs. *Ari’s* insistence on staying up-to-date encourages forward-compatible architecture – like making sure Fabric can integrate new data storage tech easily. *Desi’s* trend toward more data science means we ensure our platform’s ML capabilities are scalable (thinking ahead to larger models, GPU support, etc.). *Ren’s* note about Big Data and cloud migration being understood now means we continue to streamline and cost-optimize those experiences.
*   **Improve Adoption and Satisfaction:** Ultimately, designing with these personas in mind drives adoption. Each persona sees that the product was “made for them”: *Gael* finds the admin center addressing their headaches, *Ash* finds the reporting tool both powerful and user-friendly, *Desi* can do advanced analytics without jumping to another platform. This leads to a feeling of trust and satisfaction, which is crucial in enterprise product success.

In a **data and cloud environment**, using these personas as anchors ensures that Microsoft Fabric is not just a collection of features, but a cohesive product where:

*   **Developers** feel they can extend and embed easily (so Fabric becomes part of custom apps naturally).
*   **Data Engineers/Architects/DBAs** feel the platform is enterprise-grade (scalability, governance, observability are all first-class).
*   **Data Scientists** feel they have freedom and tools to innovate (no data silos blocking them, easy deploy of models).
*   **Analysts and BI Professionals** feel empowered and not frustrated (they can get answers and make beautiful reports without undue friction).
*   **Business Users** feel enabled rather than encumbered by the data platform (they get insights in minutes, not have to wait months or struggle with interfaces).

By continuously referring to these personas during design and development, we have a litmus test for decisions: if a new feature doesn’t clearly benefit one or more of these personas (or worse, confuses them), we revisit why we’re adding it. This user-centric approach has been key to shaping a product that is both powerful for IT and approachable for business — a balance that is hard to strike in data platforms.

In conclusion, the **Fabric personas** have provided a framework to capture the messy reality of real users in a simplified way. They ensure we never lose sight of the humans behind the data. This has driven the team to build a platform that truly caters to its diverse audience — from the engineer in the trenches to the executive in the boardroom. Each decision, feature, and even the documentation can be traced back to making life easier for someone like Jian, Ren, Desi, Ash, Binh, Nat, Ari, Vic, or Gael, which ultimately leads to a more successful and widely adopted product.
