I need you to investigate and fix why the real DaniBunny notebooks fail with "Job instance failed without detail error" in my Fabric E2E provisioning pipeline.

## Repo Location
/Users/hasan-msft/msft-dev/my-pm-work/fabcon26/demo-provisioning/

## Context — What Works vs What Doesn't
Build #49 (commit 8bd451a) achieved the first fully green pipeline, BUT only because:
1. Bronze_Data_Preparation.Notebook was simplified to just `print('Hello from Spark!')`
2. Transformations.Notebook was simplified to just `print('Hello from Spark - {nb_name}')`
3. Validations.Notebook was simplified and made non-fatal

The REAL notebooks (which I've now restored in the templates) do actual Spark SQL and data processing, and they fail with "Job instance failed without detail error" on the Fabric side.

## Pipeline Architecture (5 stages, all in ADO)
- Stage 1: Install tools (fab CLI, terraform, jq)
- Stage 2: Publish committed templates from templates/ folder
- Stage 3: Terraform creates workspace + 2 lakehouses (Bronze with enable_schemas=true, Silver with enable_schemas=true)
- Stage 4: provision-items.sh imports all Fabric items (env, notebooks, copy jobs, semantic model, report) and runs data pipeline
- Stage 5: run-data-pipeline.sh re-runs copy jobs then notebooks: Bronze → Transformations → Validations

## Data Flow
- Copy Job 1 (MyLHCopyJob): Public Azure blob (azureopendatastorage.blob.core.windows.net/mlsamples/diabetes/*.parquet) → Lakehouse_Bronze table `dbo.t2`
- Copy Job 2 (MyLHCopyJob2): Public Azure blob (azureopendatastorage.blob.core.windows.net/holidaydatacontainer/Processed/*.parquet) → Lakehouse_Bronze table `dbo.t3_prod`
- Bronze notebook: Reads `dbo.t3_prod`, creates `dbo.t3_dev` (1% sample), `dbo.t3_test` (10% sample), `dbo.t3` (copy of t3_dev). Attached to Lakehouse_Bronze.
- Transformations notebook: `%%sql` cells. Creates `dbo.t1` in Silver lakehouse via `FULL OUTER JOIN` of `dbo.t2` and `dbo.t3`. Then optimizes with VORDER. Attached to Lakehouse_Silver with Bronze as additional known lakehouse.
- Validations notebook: `%%sql` queries counting rows from `dbo.t3`, `dbo.t2`, `dbo.t1`. Attached to Lakehouse_Silver.

## Key Files to Read First
- templates/Bronze_Data_Preparation.Notebook/notebook-content.ipynb — real PySpark code
- templates/Transformations.Notebook/notebook-content.ipynb — real SQL (%%sql magic) 
- templates/Validations.Notebook/notebook-content.ipynb — currently still simplified, needs real code restored
- scripts/provision-items.sh — Step 8 replaces placeholder GUIDs in notebooks before import, Steps 10-12 run copy jobs + notebooks
- scripts/run-data-pipeline.sh — Stage 5 re-runs copy jobs + all 3 notebooks
- scripts/lib/fab-helpers.sh — fab_run_notebook(), fab_run_notebook_rest(), fab_import_item() functions
- templates/MyEnv.Environment/Setting/Sparkcompute.yml — Spark config (runtime 1.3, driver 4 cores/28g)
- pipelines/provision-workspace.yml — pipeline definition

## Known Observations from 49 builds of debugging
1. The Fabric Livy sessions show `cancellationReason: "System cancelled the Spark session due to statement execution failures"` when real notebooks fail.
2. The Spark Applications REST API (workspaces/{id}/spark/applications) returns 404, so we can't get detailed Spark logs via REST.
3. Minimal `print('Hello from Spark!')` notebooks WORK — confirms environment, Spark session creation, and notebook import are all fine.
4. The capacity is F8 (West US 2), state Active.
5. When notebooks were queried via REST API mid-build, they contained the FULL ORIGINAL DaniBunny code (complex Spark SQL), NOT our minimal print statements — this was before we discovered setup.sh was overwriting templates. That's now fixed.
6. enable_schemas=true on both lakehouses means ALL table references need `dbo.` prefix — this is already done in the current templates.
7. The Transformations notebook is attached to Silver lakehouse but references Bronze tables (dbo.t2, dbo.t3) — this cross-lakehouse access may not work unless Bronze is properly added as a known_lakehouse in the notebook metadata.

## What I Need You To Investigate and Fix
1. **Restore the Validations notebook** to its original DaniBunny SQL code (it currently has `print('Hello from Spark - {nb_name}')`). The original Validations had 4 SQL cells: `select count(*) from dbo.t3`, `select countryOrRegion, count(1) from dbo.t3 group by countryOrRegion`, `select count(*) from dbo.t2`, `select count(*) from dbo.t1`. Check git history at commit `e34155c~1` for the original.

2. **Investigate cross-lakehouse table access**: The Transformations and Validations notebooks are attached to Lakehouse_Silver but reference Bronze tables (`dbo.t2`, `dbo.t3`). Check if the notebook metadata properly includes Bronze as a `known_lakehouses` reference. The `FULL OUTER JOIN` between `dbo.t2` (Bronze) and `dbo.t3` (Bronze) to create `dbo.t1` (Silver) is cross-lakehouse — verify the notebook properly handles this.

3. **Check if `%%sql` magic in Python notebooks** works properly with Fabric — the Transformations notebook has `language="python"` cells with `%%sql` SQL content. Verify this is the correct format for fabric-cli import.

4. **Check table name consistency**: Copy jobs create `dbo.t2` and `dbo.t3_prod` in Bronze. Bronze notebook creates `dbo.t3_dev`, `dbo.t3_test`, and `dbo.t3`. Transformations does `FULL OUTER JOIN dbo.t2 and dbo.t3` — ensure `dbo.t3` actually exists after Bronze runs.

5. **Check if notebook metadata needs `spark_compute` section**: We removed `spark_compute` from all notebooks to fix import issues. Check if running real Spark SQL (not just print) requires it to be present. Look at the git history (commit `aedc399` removed it).

6. **Test a middle-ground approach**: If full restoration is complex, consider adding a single real Spark SQL cell (e.g., `spark.sql("SELECT 1")`) to test if actual Spark SQL execution works, before restoring full logic.

7. **Check Spark runtime compatibility**: The environment uses `runtime_version: 1.3`. Verify that `optimize ... vorder` syntax and `FULL OUTER JOIN` syntax work with Fabric Runtime 1.3.

## ADO Pipeline Info (for triggering test builds)
- Push to ADO: `TOK=$(az account get-access-token --resource 499b84ac-1321-427f-aa17-267ca6975798 -o tsv --query accessToken) && git -c http.extraHeader="Authorization: Bearer $TOK" push ado main`
- Trigger pipeline: `curl -s -H "Authorization: Bearer $TOK" -X POST "https://dev.azure.com/GitIntegrationAdminUser010448/fabric-e2e-demo-ado-project/_apis/pipelines/3/runs?api-version=7.1" -H "Content-Type: application/json" -d '{}'`
- Check build: `curl -s -H "Authorization: Bearer $TOK" "https://dev.azure.com/GitIntegrationAdminUser010448/fabric-e2e-demo-ado-project/_apis/build/builds/{buildNumber}?api-version=7.1"`
- Read log: `curl -s -H "Authorization: Bearer $TOK" "https://dev.azure.com/GitIntegrationAdminUser010448/fabric-e2e-demo-ado-project/_apis/build/builds/{buildNumber}/logs/{logId}?api-version=7.1"`

## What NOT To Do
- DO NOT simplify notebooks to `print()` statements — that defeats the purpose
- DO NOT make notebook steps non-fatal as a workaround — we need real data to flow
- DO NOT modify the pipeline structure — just fix the templates and notebook code
- Focus on making the ACTUAL data processing work end-to-end

## Success Criteria
A pipeline build where:
- Copy jobs run → data lands in Bronze (dbo.t2, dbo.t3_prod)
- Bronze notebook runs → creates dbo.t3_dev, dbo.t3_test, dbo.t3
- Transformations notebook runs → creates dbo.t1 in Silver (join of t2 and t3)
- Validations notebook runs → counts confirm data exists
- ALL stages pass with result=succeeded
