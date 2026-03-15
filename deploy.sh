#!/bin/bash
# Quick deploy dashboard to GitHub Pages
cd /home/shinyyume/.openclaw/workspace/yume-dashboard
git add -A
git commit -m "Update dashboard $(date '+%Y-%m-%d %H:%M')" --allow-empty
git push origin main
