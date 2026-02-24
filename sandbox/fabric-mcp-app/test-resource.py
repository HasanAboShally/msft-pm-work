#!/usr/bin/env python3
"""Test that MCP resources are served correctly."""
import json, subprocess, os

init = json.dumps({"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}})
notif = json.dumps({"jsonrpc":"2.0","method":"notifications/initialized"})
read_prov = json.dumps({"jsonrpc":"2.0","id":4,"method":"resources/read","params":{"uri":"ui://workspace-provisioner/workspace-provisioner.html"}})
read_ref = json.dumps({"jsonrpc":"2.0","id":5,"method":"resources/read","params":{"uri":"ui://refresh-card/mcp-app.html"}})

inp = "\n".join([init, notif, read_prov, read_ref, ""])
env = {**os.environ, "FABRIC_TOKEN": "test"}
result = subprocess.run(["node", "dist/main.js", "--stdio"], input=inp, capture_output=True, text=True, env=env)

for line in result.stdout.strip().split("\n"):
    try:
        msg = json.loads(line)
        if msg.get("id") in (4, 5):
            contents = msg.get("result", {}).get("contents", [])
            for c in contents:
                txt = c.get("text", "")
                uri = c.get("uri", "?")
                mime = c.get("mimeType", "?")
                # Check for key HTML elements
                has_doctype = "<!DOCTYPE" in txt[:50]
                has_body = "<body" in txt
                has_script = "<script" in txt
                has_app_container = "app-container" in txt
                print(f"URI: {uri}")
                print(f"  mime: {mime}")
                print(f"  length: {len(txt)} chars")
                print(f"  has DOCTYPE: {has_doctype}")
                print(f"  has <body>: {has_body}")
                print(f"  has <script>: {has_script}")
                print(f"  has app-container: {has_app_container}")
                print(f"  first 200 chars: {txt[:200]}")
                print()
    except:
        pass
