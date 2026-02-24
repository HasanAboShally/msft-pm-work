import json, subprocess, os

token = subprocess.check_output([
    'az', 'account', 'get-access-token',
    '--resource', 'https://analysis.windows.net/powerbi/api',
    '--query', 'accessToken', '-o', 'tsv'
]).decode().strip()

config = {
    "mcpServers": {
        "fabricRefreshCard": {
            "command": "node",
            "args": [
                "/Users/hasan-msft/msft-dev/my-pm-work/sandbox/fabric-mcp-app/dist/main.js",
                "--stdio"
            ],
            "env": {
                "FABRIC_TOKEN": token
            }
        }
    }
}

path = os.path.expanduser("~/Library/Application Support/Claude/claude_desktop_config.json")
os.makedirs(os.path.dirname(path), exist_ok=True)
with open(path, "w") as f:
    json.dump(config, f, indent=2)

print(f"Done! Config written to: {path}")
print(f"Token length: {len(token)} chars")
