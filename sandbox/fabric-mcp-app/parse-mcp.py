import sys, json

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    r = json.loads(line)
    if "result" not in r:
        continue
    if r["id"] == 2:
        tools = r["result"]["tools"]
        print(f"TOOLS ({len(tools)}):")
        for t in tools:
            vis = t.get("_meta", {}).get("ui", {}).get("visibility", ["model"])
            print(f"  - {t['name']:30s}  vis={vis}")
    elif r["id"] == 3:
        res = r["result"]["resources"]
        print(f"\nRESOURCES ({len(res)}):")
        for re in res:
            print(f"  - {re['uri']}")
