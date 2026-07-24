---
name: jira-summarize
description: End-of-session bookkeeping — file the work we just shipped as a single Jira ticket in the DataGlass DG project, assign it to a named user, attach it to the active sprint, and transition to Done. Triggers include "summarize what we did as a jira ticket and assign to <name>", "create jira ticket for this work, mark done, put in current sprint", or "jira-summarize <name>".
---

# jira-summarize — file a Done ticket for the current session

End-of-session bookkeeping: take everything we just shipped, write it up as a
single Jira ticket, assign it to a named user, add it to the active sprint,
and transition it to Done.

Trigger phrases:
- "summarize what we did as a jira ticket and assign to <name>"
- "create jira ticket for this work, mark done, put in current sprint"
- "jira-summarize <name>"

## Inputs the operator gives you

- **Assignee name fragment** — first name, partial last name, or email handle.
  Pass to `lookupJiraAccountId`; do **not** look it up by full email (the
  Atlassian search rejects raw `@gmail.com` aliases — search "bhum" or
  "justin" instead of `bhum.soonjun@dataglasslabs.com`).
- **(Optional) ticket type** — defaults to `Task`. Use `Bug` for incident
  postmortems, `Story` for user-facing features.

## Cloud + project constants (DataGlass Atlassian)

```
cloudId    = 50c43565-f8c9-4c0f-a197-f8e09cbcca16
hostname   = dataglass.atlassian.net
projectKey = DG
boardId    = 1
sprintField = customfield_10020
```

Issue type IDs (in DG):
- Epic = `10001`
- Subtask = `10002`
- Task = `10003`
- Story = `10004`
- Bug = `10038`

Workflow transition IDs (use these with `transitionJiraIssue`):
- To Do = `11`
- In Progress = `21`
- In Review = `31`
- **Done = `41`**
- On Dev = `4`
- Blocked = `3`
- Abandon = `2`

## The procedure

Run these MCP tool calls in order. Most of them are read-once + use forever
within the same session.

### 1. Identify the active sprint

The sprint field is a custom-field array, not a queryable label, so query for
any DG issue currently in an open sprint and read its sprint:

```text
searchJiraIssuesUsingJql
  cloudId = <constant>
  jql     = "project = DG AND sprint in openSprints() ORDER BY updated DESC"
  fields  = ["customfield_10020"]
  maxResults = 1
```

Pluck `issues.nodes[0].fields.customfield_10020[0].id` — that's the sprint id
(integer, e.g. `201`). Stash it as `ACTIVE_SPRINT_ID`.

### 2. Resolve the assignee account id

```text
lookupJiraAccountId
  cloudId      = <constant>
  searchString = "<first name or partial>"
```

Read `data.users.users[0].accountId`. If the result has multiple matches,
pick the one whose `html` matches `@dataglasslabs.com` (skip personal Gmail
account aliases). Stash as `ASSIGNEE_ID`.

### 3. Compose the ticket body

Match the style of recent DG tickets: short `## Summary`, then sections for
*What landed* / *Tests* / *Prod state* / *Docs* / *Operational caveats* /
*Follow-ups*. Use code spans for file paths and identifiers. Pretty raw —
this isn't an exec summary, it's a future-you operating record.

Cap description at ~2-3K characters total. Don't dump the whole transcript;
extract the *what changed*, *why*, *how to operate*, *what's still pending*.

Keep `contentFormat: "markdown"` so the Jira editor renders headings/lists.

### 4. Create the ticket

```text
createJiraIssue
  cloudId             = <constant>
  projectKey          = "DG"
  issueTypeName       = "Task"          # or Bug / Story
  assignee_account_id = ASSIGNEE_ID
  summary             = "<one-line title, action-first>"
  contentFormat       = "markdown"
  description         = <the body from step 3>
```

Read back `key` (e.g. `DG-404`). Stash as `ISSUE_KEY`.

### 5. Add to the active sprint

```text
editJiraIssue
  cloudId      = <constant>
  issueIdOrKey = ISSUE_KEY
  fields       = { "customfield_10020": ACTIVE_SPRINT_ID }
```

Pass the sprint id as a **number**, not a string. The API accepts a single
integer (Jira coerces to single-element array internally) or an array of
integers.

### 6. Transition to Done

```text
transitionJiraIssue
  cloudId      = <constant>
  issueIdOrKey = ISSUE_KEY
  transition   = { "id": "41" }     # Done
```

If the project workflow changes, re-fetch IDs with
`getTransitionsForJiraIssue` — but Done is reliably `41` in DG today.

### 7. Verify + give the user the link

```text
getJiraIssue
  cloudId      = <constant>
  issueIdOrKey = ISSUE_KEY
  fields       = ["summary", "status", "assignee", "customfield_10020"]
```

Confirm `status.name == "Done"`, `assignee.displayName` matches, and
`customfield_10020[0].name` matches the active sprint name. Hand the user
`https://dataglass.atlassian.net/browse/<ISSUE_KEY>`.

## Common pitfalls

- **Don't search assignees by Gmail alias.** `lookupJiraAccountId` doesn't
  match `justin.madsoon@gmail.com` even though it's the operator's git
  identity. Their work email (`bhum.soonjun@dataglasslabs.com`) is the
  Jira-bound one. Search by first name + verify by displayName.
- **The sprint field is `customfield_10020`** on this tenant. Don't assume —
  if you see the API say "Sprint" doesn't exist as a field, the tenant has
  remapped it; re-fetch via `getJiraIssueTypeMetaWithFields(projectIdOrKey =
  "DG", issueTypeId = "10003")` and pull the field whose `schema.custom`
  contains `sprint`.
- **"Sprint in openSprints()"** can legitimately return zero rows during the
  brief window between sprint end and the next start — fall back to
  `closedSprints()` ordered by `endDate DESC` and warn the operator that
  there's no active sprint, then ask whether to file against the most-recent
  closed sprint or backlog.
- **Sprint dates lying about state.** Sprint 6 ended `2026-05-19` on the
  calendar but its `state` field still says `"active"` (no one closed it).
  Trust the `state` field, not the dates.
- **`createJiraIssue` returns just key + id, not the full issue.** Always
  call `getJiraIssue` after the chain to confirm the final state — the
  edit/transition calls don't echo the result.
- **Tickets created without a sprint don't show on boards.** That's the
  thing that makes operators say "I can't find the ticket". Always step 5.
- **Empty assignee silently works** (createJiraIssue accepts a missing
  assignee_account_id). If the operator gave you a name they expect to be
  the assignee, you must run lookup first; don't skip on a no-match.

## Surfacing not-yet-bookkept work

Operators often want to do this in bulk for tickets that exist but were
never sprint-assigned. The JQL:

```
project = DG AND sprint is EMPTY ORDER BY updated DESC
```

Result is `Map<assignee → ticket[]>` — group by assignee, ask the operator
which to file into the current sprint, then run step 5 in a loop.

## Related skills

- `.claude/skills/dgfe/SKILL.md` — DGFE monorepo architecture; describe the
  *result* of the ticket against the right layer (app/, dg-base, dg-auth,
  dg-marketing, dg-app/layers/*).
- `.claude/skills/dgbe-dev-token/SKILL.md` — when the ticket references a
  prod or dev backend call.
