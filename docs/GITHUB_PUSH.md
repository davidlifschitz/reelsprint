# GitHub Push Instructions

ChatGPT authenticated as GitHub user `davidlifschitz`, but the available GitHub connector did not expose a create-repository action.

## Option A: GitHub CLI

```bash
cd reelsprint
git init
git add .
git commit -m "Initial ReelSprint MVP"
gh repo create davidlifschitz/reelsprint --public --source=. --remote=origin --push
```

## Option B: GitHub web UI

1. Create a new public repo named `reelsprint` under `davidlifschitz`.
2. Do not initialize with a README, because this project already has one.
3. Run:

```bash
cd reelsprint
git init
git add .
git commit -m "Initial ReelSprint MVP"
git branch -M main
git remote add origin git@github.com:davidlifschitz/reelsprint.git
git push -u origin main
```

## Option C: Empty repo first, then ask ChatGPT to push files

After the empty repo exists and the GitHub app has access to it, ask:

> Push the ReelSprint scaffold into `davidlifschitz/reelsprint`.
