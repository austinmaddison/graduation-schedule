---
name: dg-docs
description: Conventions for writing and maintaining the DataGlass docs site (dg-docs/ — Nuxt Content, English + Thai). Use when adding, editing, reviewing, or restructuring any page under dg-docs/content/, when a dg-app/layers feature changed and its docs need updating, or when working on platform chips, the supported-platforms matrix, coming-soon pages, doc images, or the Thai mirror. Enforces accuracy (verify features against dg-app/layers and ../dgbe before documenting), the concise how-to voice, the EN/Thai twin, and Gemini-based localization.
---

# dg-docs

Docs site in `dg-docs/` — standalone Nuxt Content, bilingual. Run: `pnpm dev:docs` (port 3001). Work lives on branch `feature/quick-docs`.

## Golden rule: never document what you haven't verified

Read the feature in `dg-app/layers/<area>/` (and `../dgbe` for backend) before writing. No invented capabilities. Real traps caught in review: matching is SKU + model SKU + name (not barcode); the calculator has no PDF export; inferred COGS is Shopee+Lazada only; diagnostics is Shopee-only (currently *coming soon*); Lazada has no Actions/Ads; action categories are Structure/Explore/Optimize; we don't track competitors. When unsure, grep — don't guess.

## Structure

- `content/docs/` = English, `content/docs-th/` = Thai. **Every EN page has a TH twin at the identical path.**
- Number prefixes (`1.`, `4.types/`) set sidebar order only — the **URL strips them**. Renumber freely; URLs don't change.
- A section folder with no `index.md` becomes a group header (links to its first child via `app.vue`).

## Frontmatter + voice

```yaml
---
title: Set margin
description: One sentence — what + why.
platforms: [shopee]        # OPTIONAL; omit on conceptual pages (see Chips)
navigation: { icon: i-lucide-percent }
---
```

Concise, how-to first (~90–180 words): **bold lead sentence** → `## How to use it` (numbered, ≤6 real steps) → optional `## Why this matters` (1–3 bullets) → at most one `::callout{icon="i-lucide-info"}`. No marketing fluff, no preachy "trust X over Y".

## Platform chips + matrix

`platforms: [shopee|lazada|tiktok]` auto-renders a brand-tinted chip row above the title. List **only what the feature truly supports** (verify). **Omit** on conceptual/reference/coming-soon pages. Keep `2.shops/1.supported-platforms.md` (the matrix) in sync with every page's `platforms` — update both.

## Coming-soon pages

`::callout{icon="i-lucide-construction"}\n**Coming soon.** …\n::` + a short "What it will show"; drop how-to steps and the `platforms` chip; mark the matrix row `Soon` / `เร็วๆ นี้`.

## Localization — use Gemini, don't hand-translate

Write the English page, then generate the `docs-th/` twin by running it through **Gemini** with the prompt in [`gemini-thai-prompt.md`](./gemini-thai-prompt.md) (paste the EN page; if revising, also paste the current TH). The prompt embeds the DataGlass Thai glossary + localization rules, so it keeps canonical terms English (`Actions`, `Deploy`, `workspace`, `True ROAS`, `COGS`, …) and uses the right renderings (Unified view = `ภาพรวมสินค้า`, etc.). Paste Gemini's output into the TH file. Thai internal links use the `/th` prefix. (For lookups/edge cases, [`dg-th-glossary`](../dg-th-glossary/SKILL.md) + [`dg-th-localization`](../dg-th-localization/SKILL.md).)

## Images

Placeholder only where a screenshot helps (dashboards, tables, charts): `![Alt describing the exact UI](/images/docs/<section>/<slug>.png)`; files go in `dg-docs/public/images/docs/<section>/`. Alt = the capture brief.

## Reminder hook

`.claude/hooks/dg-docs-reminder.sh` nudges you when `dg-app/layers/**/*.{vue,ts}` changes. On that nudge: if the change is user-facing, update the matching page **+ its TH twin**.

## Reference
Full inventory/TOC: `dg-docs/FEATURES.md`.
