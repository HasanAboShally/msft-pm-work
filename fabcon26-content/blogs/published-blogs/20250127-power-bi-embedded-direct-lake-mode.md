---
title: "Introducing Power BI Embedded with Direct Lake Mode"
author: "Hasan Abo Shally"
date: "2025-01-27"
url: "https://blog.fabric.microsoft.com/en-us/blog/introducing-power-bi-embedded-with-direct-lake-mode-preview"
views: 69968
platform: "Microsoft Fabric Updates Blog"
categories:
  - Data Lake
  - Fabric platform
  - Microsoft Fabric
  - Uncategorized
status: "Published"
note: "Updated March 2025 — Power BI Embedded with Direct Lake Mode is now GA."
---

# Introducing Power BI Embedded with Direct Lake Mode

> **Update (March 2025):** Power BI Embedded with Direct Lake Mode is now generally available — fully supported for production use, backed by Microsoft's SLA, and built to meet the security, compliance, and reliability standards our customers expect. We're committed to continually enriching this offering to support new scenarios and overcome existing limitations.

![Diagram of sample Power BI embedded with direct lake mode.](https://dataplatformblogwebfd-d3h9cbawf0h8ecgf.b01.azurefd.net/wp-content/uploads/2025/01/Screenshot-2025-01-13-at-14.47.15.png)

As we step into 2025, we're excited to announce the preview of Power BI Embedded with Direct Lake Mode, a new feature designed to enhance how developers and Independent Software Vendors (ISVs) provide embedded analytics in their applications. This capability, available in preview starting Q1 2025, leverages the power of Direct Lake Mode to allow an even enhanced performance and experience for embedded analytics.

## What Is Direct Lake Mode?

Direct Lake is a storage mode option for tables in a Power BI semantic model that eliminates the need for importing or duplicating data. Instead, it directly accesses Delta tables in OneLake, enabling real-time data updates and analysis.

This approach offers several key benefits:

- **Enhanced performance:** Directly loading parquet-formatted files into memory delivers the fastest query and reporting experience.
- **Real-Time insights:** Seamless updates as changes occur in the source, without requiring periodic data refreshes.
- **Optimized resource usage:** Avoids data duplication and reduces the need for import processes, streamlining operations.
- **Resiliency:** Automatically falls back to DirectQuery when SKU limits are exceeded or unsupported features are encountered, ensuring continuity.

For a more detailed overview of Direct Lake Mode, you can visit [Direct Lake Overview](https://learn.microsoft.com/fabric/get-started/direct-lake-overview).

## How Does This Benefit Embedded Analytics?

Direct Lake Mode in Power BI Embedded allows developers to create scalable, performant analytics solutions tailored to large and frequently updated datasets.

Key advantages:

- **Scalability:** Developers and ISVs can efficiently scale solutions across multiple customers using Fabric REST APIs for full automation.
- **Developer Efficiency:** Automate model deployment and management via REST APIs, reducing manual effort.
- **User Experience:** End users experience real-time, high-speed analytics seamlessly integrated within ISV applications.

## Next Steps

To get started with Power BI Embedded with Direct Lake Mode, follow these steps:

1. **Create a Direct Lake Enabled Semantic Model:** Learn how to create a Direct Lake enabled semantic model: [Direct Lake Overview](https://learn.microsoft.com/power-bi/enterprise/directlake-overview)
2. **Specify a Fixed Identity:** Understand how to specify a Fixed Identity for a Direct Lake semantic model: [Fixed Identity](https://learn.microsoft.com/power-bi/enterprise/directlake-fixed-identity)
3. **Embed Power BI Report:** Embed a Power BI report over a Direct Lake semantic model for your customers by following the instructions here: [Embed Customer App](https://learn.microsoft.com/power-bi/developer/embedded/embed-customer-app)

For additional resources and configuration steps, refer to the [Power BI Embedded Documentation](https://learn.microsoft.com/power-bi/developer/embedded/).

## Sample Automation Scenario Flow

To streamline the creation and deployment of analytics solutions, developers can leverage the following steps in an automation scenario:

1. Use the 'Create workspace' API to create a workspace and assign it to a Fabric capacity.
2. Use the 'Create Lakehouse' API to create a Lakehouse.
3. Use the 'Create shortcut' API to link the customer Lakehouse to a centralized Lakehouse.
4. Use the 'Create connection' API to establish a connection to a SQL Azure server.
5. Use the 'Create a Data Pipeline with definition' API to define and set up a data pipeline.
6. Execute the pipeline using the Run On Demand Job API of type 'Pipeline'.
7. Use the 'Create notebook' API to create a notebook.
8. Execute the notebook using the Run On Demand Job API of type 'RunNotebook'.
9. Use the 'Create semantic model' API to create a semantic model.
10. Retrieve the connection string between the semantic model and the Lakehouse.
11. Create a connection with Service Principal (SP) credentials (appID, app secret, tenant ID).
12. Bind the semantic model using the Power BI Bind API to the connection created.
13. Use the 'Create a Power BI report' API to create a Power BI report.
14. Generate an embed token for the report using the appropriate API.
15. Embed the report into your application for end-user access.

This workflow demonstrates how automation can enable seamless integration of data pipelines, semantic models, and embedded analytics into your applications, optimizing both developer efficiency and user experience.

## Known Gaps and Limitations

While Direct Lake Mode offers numerous benefits, there are some known gaps and limitations to be aware of:

1. This mode is supported only using embed token V2.
2. Service Principal only works with Fixed Identity connection (No-SSO).
3. Automation only support setting Service Principal as authentication method on the Fixed identity connection.

## Conclusion

Power BI Embedded with Direct Lake Mode is a transformative step forward in embedded analytics. By leveraging the power of Direct Lake Mode, developers and ISVs can deliver high-performance, scalable, and real-time analytics solutions that meet the demands of today's embedded applications. Whether you're building for large, complex datasets or optimizing analytics for frequent updates, this new capability empowers you to enhance user experiences and maximize the value of embedded insights. Start exploring Direct Lake Mode today to elevate your embedded analytics solutions to the next level.
