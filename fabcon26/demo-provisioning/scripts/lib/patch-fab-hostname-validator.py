#!/usr/bin/env python3
"""
Patch ms-fabric-cli hostname validator to accept DXT (staging) multi-level
subdomains.

Background:
  ms-fabric-cli <= 1.4.0 uses a regex that only allows ONE subdomain prefix:
    api.fabric.microsoft.com       (valid)
    api.dxt.fabric.microsoft.com   (invalid - two-segment prefix api.dxt.)

  When FAB_API_ENDPOINT_FABRIC is set to a DXT hostname, validation fails and
  triggers a circular-import crash (fab_constant not yet fully initialized).

Fix:
  Widens the prefix group regex from r'[w-]+' to r'[w.-]+'
  so that api.dxt.fabric.microsoft.com is accepted.

Safe to run after every: pip install ms-fabric-cli
"""
import os
import sys
import site


def find_validator_file() -> str | None:
    search_dirs = []
    try:
        search_dirs.extend(site.getsitepackages())
    except AttributeError:
        pass
    try:
        search_dirs.append(site.getusersitepackages())
    except AttributeError:
        pass

    for d in search_dirs:
        candidate = os.path.join(d, "fabric_cli", "utils", "fab_hostname_validator.py")
        if os.path.exists(candidate):
            return candidate
    return None


def main():
    path = find_validator_file()
    if not path:
        print("WARNING: fab_hostname_validator.py not found — skipping patch")
        sys.exit(0)

    with open(path, "r") as f:
        content = f.read()

    OLD = r"([\w-]+\.)?"
    NEW = r"([\w.-]+\.)?"

    if NEW in content:
        print(f"Already patched (or newer version): {path}")
        sys.exit(0)

    if OLD not in content:
        print(f"WARNING: expected pattern not found — may be different version: {path}")
        sys.exit(0)

    patched = content.replace(OLD, NEW, 1)  # replace only the first occurrence (in VALID_HOSTNAME_REGEX)
    with open(path, "w") as f:
        f.write(patched)

    print(f"Patched hostname validator: {path}")
    print(f"  Changed: {OLD!r}  ->  {NEW!r}")
    print("  DXT endpoints (e.g. api.dxt.fabric.microsoft.com) are now valid.")


if __name__ == "__main__":
    main()
