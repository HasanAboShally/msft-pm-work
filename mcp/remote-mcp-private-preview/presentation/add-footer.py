import os
import re

slides = [
    ("slide01-title.html", "1"),
    ("slide03-tldr.html", "3"),
    ("slide04-what-is-mcp.html", "4"),
    ("slide06-fabric-mcp.html", "6"),
    ("slide07-prerequisites.html", "7"),
    ("slide09-quickstart-claude.html", "9"),
    ("slide10-graph-mcp.html", "10"),
    ("slide11-tools-workspaces.html", "11"),
    ("slide12-tools-items.html", "12"),
    ("slide13-workflows.html", "13"),
    ("slide14-troubleshooting.html", "14"),
    ("slide15-feedback.html", "15"),
    ("slide16-roadmap.html", "16"),
    ("slide17-quickref.html", "17"),
    ("slide18-thankyou.html", "18"),
]

footer_style = """.footer {
  display: flex;
  justify-content: space-between;
  padding: 8pt 50pt;
  background: #F5F5F5;
}
.footer p {
  color: #666666;
  font-size: 8pt;
  margin: 0;
}
"""

for filename, page in slides:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r') as f:
        content = f.read()
    
    # Add footer style if not present
    if '.footer {' not in content:
        content = content.replace('</style>', footer_style + '</style>')
    
    # Add footer div if not present
    if 'Microsoft Confidential' not in content:
        footer_div = f'<div class="footer">\n  <p>Microsoft Confidential</p>\n  <p>{page}</p>\n</div>\n'
        content = content.replace('</body>', footer_div + '</body>')
    
    with open(filename, 'w') as f:
        f.write(content)
    print(f"Updated {filename}")

print("Done!")
