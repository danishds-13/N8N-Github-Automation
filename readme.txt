🤖 AI-Powered GitHub Pull Request Automation with n8n

This project demonstrates how to build an AI-driven Pull Request reviewer and auto-merger using n8n, GitHub, and OpenAI.

The workflow automatically reviews every new Pull Request, analyzes the code changes, and decides whether it is safe to merge — without human intervention.
------------------------------------------------------------------------------------------------------------------------------------------------------------

✨ What This Automation Does

->Whenever a Pull Request is opened:

->GitHub triggers the workflow

->All file changes (diffs) are collected

->An AI agent reviews the changes

--------------------------------------------------------------------------------------------------------------------------------------------------------------

Based on the analysis:

✅ Safe changes → PR is automatically merged

❌ Risky changes → PR is rejected and a comment is posted

This creates a fast, consistent, and scalable PR review process.

🧠 AI Decision Logic

The AI agent checks for:

->Security risks

->Suspicious code (eval, exec, shell commands, etc.)

->Deletion of critical logic

->Large unexplained refactors

->Dependency version jumps

->Broken or incomplete documentation

AI Output (Strict)

The AI returns only one word:

APPROVE

REJECT

This ensures predictable automation and avoids ambiguous results.

--------------------------------------------------------------------------------------------------------------------------------------------------------

🔄 Workflow Overview
GitHub Pull Request Trigger
        ↓
Collect PR File Changes (Diffs)
        ↓
AI Agent (OpenAI)
        ↓
IF Node
   ├── APPROVE → Auto-merge PR
   └── REJECT  → Post PR comment


--------------------------------------------------------------------------------------------------------------------------------------------------------

🛠 Tech Stack

n8n – Workflow automation

GitHub Webhooks & API – PR events and actions

OpenAI (gpt-4.1-mini) – AI code review

HTTP Request Node – GitHub PR merge (API-based)

----------------------------------------------------------------------------------------------------------------------------------------------------------

🖼 Architecture Diagram

![AI PR Automation Workflow](assets/n8n-github-ai-pr.png)


(Add a screenshot of your n8n workflow canvas here)

-----------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Why This Is Useful

->Eliminates manual PR reviews for low-risk changes

->Enforces consistent review rules

->Speeds up development cycles

->Reduces reviewer fatigue

->Works across any GitHub repository

->Fully customizable and self-hostable

-------------------------------------------------------------------------------------------------------------------------------------------------------------

🔐 Safety Notes

->The AI only auto-merges clearly safe changes

->Risky or unclear changes always require human review

->GitHub permissions are limited to repository scope

->All decisions are logged via PR comments


---------------------------------------------------------------------------------------------------------------------------------------------------------------

📌 Customization Ideas

Add Slack/Discord notifications

Label PRs automatically (auto-approved, needs-review)

Run CI tests before merge

Generate detailed AI review comments

Auto-assign reviewers on rejection

------------------------------------------------------------------------------------------------------------------------------------------------------------

🙌 Credits

Built using n8n and OpenAI, designed to showcase real-world AI automation for developer workflows.