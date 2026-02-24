#!/usr/bin/env python3
"""Check ADO pipeline run timeline status."""
import subprocess, json, sys, os

run_id = sys.argv[1] if len(sys.argv) > 1 else "53"

def get_token():
    return subprocess.check_output(
        ["az", "account", "get-access-token", "--resource", "499b84ac-1321-427f-aa17-267ca6975798", "--query", "accessToken", "-o", "tsv"],
        stderr=subprocess.DEVNULL, timeout=30
    ).decode().strip()

def ado_get(path):
    """Call ADO REST API via curl."""
    token = get_token()
    url = f"https://dev.azure.com/ms-csu-il/Default/_apis/{path}"
    out = subprocess.check_output(["curl", "-s", "-H", f"Authorization: Bearer {token}", url], timeout=30)
    return json.loads(out)

# Get build status
build = ado_get(f"build/builds/{run_id}?api-version=7.1")
print(f"\nRun #{build['id']} | status={build['status']} | result={build.get('result','n/a')} | commit={build['sourceVersion'][:8]}")

# Get timeline
timeline = ado_get(f"build/builds/{run_id}/timeline?api-version=7.1")

for r in sorted(timeline['records'], key=lambda x: x.get('order', 0)):
    t = r.get('type', '')
    if t in ('Stage', 'Job', 'Task'):
        name = r.get('name', '')[:55]
        state = r.get('state', '')
        result = r.get('result', '')
        log_id = r.get('log', {}).get('id', '') if r.get('log') else ''
        issues = [i.get('message', '')[:80] for i in r.get('issues', [])]
        if result in ('succeeded', 'failed', 'skipped') or state != 'completed':
            sym = {'succeeded': 'OK', 'failed': 'FAIL', 'skipped': 'SKIP'}.get(result, '...')
            line = f"  {sym:4} {t:5} | {name:55} | log={log_id}"
            if issues:
                line += f" | {issues[0]}"
            print(line)

# If failed, get the failed task log
failed_logs = [r.get('log', {}).get('id') for r in timeline['records']
               if r.get('result') == 'failed' and r.get('type') == 'Task' and r.get('log')]
for log_id in failed_logs:
    print(f"\n--- Failed task log (logId={log_id}) last 40 lines ---")
    token = get_token()
    log_text = subprocess.check_output([
        "curl", "-s", "-H", f"Authorization: Bearer {token}",
        f"https://dev.azure.com/ms-csu-il/Default/_apis/build/builds/{run_id}/logs/{log_id}?api-version=7.1"
    ], timeout=30).decode()
    for line in log_text.strip().split('\n')[-40:]:
        print(line)
