#!/usr/bin/env bash
set -euo pipefail

REPO="davidlifschitz/reelsprint"

git init
git add .
git commit -m "Initial ReelSprint MVP"
gh repo create "$REPO" --public --source=. --remote=origin --push
