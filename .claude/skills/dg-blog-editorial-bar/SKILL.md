---
name: dg-blog-editorial-bar
description: The DataGlass blog editorial standard. Invoke when writing or rewriting any post under dg-marketing/layers/resources/app/data/blog.ts, or when adding posts to the planned /engineering or /research sections. Codifies the rules that separate genuine, citation-backed analysis from generic AI-style spam.
---

# DataGlass blog editorial bar

The DataGlass blog cluster (`dg-marketing/layers/resources/app/data/blog.ts`) and the planned `/engineering` and `/research` sections share one standard. Every post must clear this bar. If a draft cannot, do not ship it — fix it or kill it.

## The eight rules

### 1. Open with a specific, sourced number
Not a generic narrator. Not *"Most sellers want…"* or *"Commerce used to be simpler…"*. The opening sentence carries a verifiable figure with a citation, or a direct quote from a primary source, or a short anecdote with concrete numbers. The reader should know within ten seconds why this post is different from the next ten posts that share its keyword.

### 2. One thesis per post
State it explicitly within the first 200 words. Every paragraph after that serves the thesis. Cut paragraphs that just restate the dek or repeat earlier prose. If the post can be summarised as *"do these five things,"* the thesis is missing — find the underlying claim.

### 3. At least three cited sources, primary where possible
Citations belong in the `sources` array AND in the prose ("Reuters reported on 19 February 2026 that…"). Preferred sources, in order:

1. Platform documentation (Shopee Ads Help, Lazada Open Platform, TikTok Shop Seller Center API docs).
2. Sea Limited / Alibaba / ByteDance investor relations and SEC filings.
3. Authoritative industry research — Bain e-Conomy SEA, McKinsey, BCG, Forrester.
4. Major business press with named authors and dates — Reuters, Bloomberg, Financial Times.
5. Peer-reviewed papers (ScienceDirect, IEEE, ACM) for technical posts.
6. DataGlass internal data, when explicitly framed as *"in our data"* and not as a population claim.

Wikipedia, generic listicles, and unattributed press releases are not sources. If a number can't be sourced from this list, drop it.

### 4. One concrete worked example with units
Use the `formula` block kind. Real arithmetic — currency-denominated (THB or USD), with the math working through. *"A typical Shopee account scaling ad budget from THB 40,000 to 100,000…"* not *"imagine a seller."* The example must support the thesis, not decorate it.

### 5. A point of view
Each post should make a claim someone could reasonably disagree with — *"this commonly-given advice is wrong because X,"* *"the platform's recommended setting is mathematically biased toward overspend,"* *"the popular framework misses Y."* Generic *"5 ways to do X"* posts are the spam fingerprint. Take a position. Defend it.

### 6. Length matched to post type, not a fixed number
Three length tiers, matched to the kind of post being written. Pick the tier that fits the argument; do not pad to fill, do not truncate to under-deliver.

- **Manifesto / opinion / focused argument: 1000–1500 words.** Tight, punchy, position-taking. Examples: race-to-zero-margin, complexity-is-the-tax. One thesis, 3–4 h2 sections, one chart or table, one worked example, sourced opening. Short reads can absolutely be excellent — uniqueness of argument matters more than word count.
- **How-to / methodology / tactical: 1500–2500 words.** Practical posts that walk a procedure. Examples: how-to-reduce-shopee-ad-waste, how-to-calculate-lazada-seller-margin. Sourced opening, 5–7 h2 sections, ≥1 chart, ≥1 table or worked example, limitations + methodology where internal data is cited.
- **Landscape / research / deep-dive: 2500–4000 words.** The cluster anchors. Examples: sea-marketplace-2026, new-competitive-world, true-shopee-roas. Multiple worked examples, ≥2 tables, ≥1 chart, sensitivity analysis, full limitations + methodology, footnoted citations.

After rewriting, set `readMinutes` honestly — divide word count by 200.

Across every tier, a research-grade post must include the structural elements below — adjusted to scale. A 1200-word manifesto needs one chart, not three. A 3500-word landscape essay needs three. Match depth to ambition.

- **At least one worked example** — *real arithmetic with units, not "imagine a seller."* Multiple examples on landscape / methodology posts; one is enough on a manifesto.
- **Sensitivity analysis** — show how the result changes when one input moves. Required on methodology and landscape posts; optional on manifestos.
- **Charts and tables — earned, not required.** Add a `chart` or `table` block where it carries the argument better than prose: comparative grids, cost-stack decompositions, sensitivity matrices, trajectories that need a line chart. Skip them where the prose already does the work. A post with no chart can still hit the bar; a post with three charts that don't earn their place is worse than no chart at all. Rule of thumb: if you can describe the chart's argument in one sentence and the prose already says it, the chart is decoration. Cut it.
- **A "limitations" or "where this argument breaks" section** — explicit on methodology and landscape posts. Optional on short manifestos but encouraged.
- **A "methodology" section** when the post depends on internal data — *"In our data" claims must be backed by an explicit description of the data.* Required on every post that makes such a claim, regardless of length.
- **Footnoted-style inline citations** — every numerical claim links to the source in the prose itself, not only in the `sources` array.

### 7. No product pitch in the body
DataGlass appears at most once mid-article, in one paragraph, framed as *"how this looks operationally"* — not as marketing. The CTA block at the bottom does the selling. The body earns trust by being useful first.

### 8. Vary the opening device across the cluster
The cluster currently opens every post with a generic narrator. Across the next rewrites, distribute opening devices:

- **Number lede** — open with a sourced figure (cover story).
- **Quote lede** — open with a verbatim quote from a platform document, investor call, or analyst report.
- **Anecdote lede** — open with one specific operator's situation, anonymised but concrete.
- **Counter-claim lede** — open by stating a popular belief and naming why it's wrong.
- **Formula lede** — open with the math (technical posts only).

Aim for roughly even distribution. Two consecutive posts in the same cluster should not share an opening device.

## Required structural elements (scaled by tier)

Every post body must include, in this order, scaled to the length tier:

1. **Opening** (2–3 paragraphs on landscape/how-to, 1–2 on manifestos; opens with one of the devices above; first sentence carries a sourced number or verbatim quote).
2. **Thesis** (one explicit paragraph before any h2 — names the claim, names what would falsify it).
3. **h2 sections** — 3–4 on manifestos, 5–7 on how-to, 5–8 on landscape/research. Each h2 with h3 sub-sections only where the analysis benefits.
4. **Worked example(s)** in `formula` blocks — one on manifestos, 1–3 on how-to/landscape. Different scenarios where multiple are used, not the same example with tweaked numbers.
5. **`chart` or `table` block(s)** — earned by the content, not structurally required. Tables for comparative grids; charts for cost stacks, sensitivity matrices, trajectories. A post with no chart can still hit the bar if the prose carries the argument. A post with charts that don't earn their place is worse than a post with none. SEO note: charts and tables can help — they create scannable rich snippets and image-search visibility — but only if they actually communicate something the prose doesn't.
6. **`question` block** matching a real People-Also-Ask query — required on every post regardless of length, 4–7 sentence answer.
7. **"Limitations" / "Where this argument breaks" h2** — required on how-to/landscape, encouraged on manifestos.
8. **"Methodology" h2** — required when the post cites internal DataGlass data, regardless of length tier.
9. **1–2 pullquotes** on manifestos, 2–3 on longer pieces — placed at paragraph boundaries, never mid-thought.
10. Closing — `callout` ("the shift in one sentence") OR a final `pullquote`. Not both.

`tldr` field: **4–6 short bullets**. Manifestos can land at 4; how-to/landscape need 5–6. The first bullet is the thesis in one sentence; one bullet must name the limitation when the post has one.

`sources` field: at least **3 entries on manifestos, 5 on how-to/landscape**. Each carries `label`, `url`, and a `note` that tells the reader what specific claim in the post the source supports. Cited sources should appear in the prose itself with publication date or filing reference (*"Sea Limited's 4Q25 disclosure"*, *"Reuters, 19 February 2026"*) — not buried only in the bibliography.

## SEO requirements (every post, every tier)

Every post must clear the SEO bar regardless of length:

- **Primary keyword in `title`, `dek`, `metaTitle`, `metaDescription`, and at least one h2.** Use the exact phrase a real seller would type — *"reduce Shopee ad waste,"* *"calculate Lazada seller margin,"* *"low-margin SKUs on Shopee."* Avoid coy or clever titles that sacrifice search volume.
- **Semantic variations through the body.** If primary is *"low-margin SKU,"* secondary phrases include *"margin trap,"* *"Shopee bestseller,"* *"contribution margin per SKU."* Natural usage; no stuffing.
- **`metaTitle` ≤ 60 chars; `metaDescription` ≤ 160 chars.** Shorter is better — both get truncated in SERPs above those bounds.
- **Internal link graph fully populated.** Every post sets:
  - `glossaryLinks` — slugs that should auto-hyperlink in prose via `DgGlossaryProse`. Minimum 3 relevant terms; reference each at least once in the body so the auto-link surfaces.
  - `solutionLinks` — solution slugs the post topic naturally implicates. Minimum 1, prefer 2–3.
  - `related` — related blog posts, minimum 3, cluster-internal.
  - `integrationLinks` — platform integrations where the post is platform-specific.
- **Question block phrased as a real People-Also-Ask query.** Use Google's actual related-question format: *"How do I…"*, *"Why is…"*, *"What is…"*. The answer is the AI-citation surface and the SEO snippet candidate.
- **Article schema heritable from the data.** `metaTitle`, `metaDescription`, `category`, `date`, `author`, `readMinutes`, and `image` (via the layout default) all flow into the rendered Article JSON-LD; keep them clean.

## What to delete on every rewrite

These phrases are templated DataGlass voice. Strike them on sight:

- *"Most sellers want…"* — generic narrator, no agency.
- *"Commerce used to be simpler"* — manifesto cliché.
- *"That world is disappearing"* — same.
- *"The seller's problem is…"* — abstract, no concrete operator.
- *"Stop doing X blindly"* — empty admonition.
- *"At its core, the math is simple"* — patronising.
- Any sentence starting with *"In a world where…"*.
- Any closing that says *"the goal is not more reports, the goal is better decisions"* — overused; rotate.

## Three-section content architecture

The DataGlass content surface is three distinct sections, each with its own editorial register:

### `/blog` — Editorial / Field Notes
Existing surface. Audience: marketplace operators (sellers, growth teams). Register: practitioner-facing. Topics: profit, ads, pricing, inventory, landscape essays. The posts that already exist (the 19 in `blog.ts`) stay here, rewritten to this bar.

### `/engineering` — Technical Blog (NEW)
Audience: data engineers, ML engineers, technical co-founders, researchers evaluating DataGlass's modeling. Register: engineering-paper voice — concrete architecture, code-level detail, ablations, failure modes. Topics:

- Canonical product catalog: how cross-shop binding actually works (pg_trgm + scored heuristics, false-positive rate, manual override flow).
- Reconstructing contribution margin from order-line data: edge cases on Shopee's voucher splits and Lazada's program-funded discount mechanics.
- True-ROAS estimation under attribution-window mismatch.
- Demand forecasting in production: model selection, feature engineering, drift detection.
- Stockout policy under stochastic lead time and campaign-driven demand spikes.
- The recommendation engine: ranking deployable actions by projected profit lift, with audit trail.
- Build/runtime architecture: Nuxt 4 layered marketing site, Vercel SSR, multi-host routing.
- Data pipelines: ingestion from three platform APIs, dedup, normalisation, fee reconciliation.

### `/research` — Research Notes (NEW)
Audience: academics, applied-research peers, journalists. Register: paper-like; thesis, method, results, limitations. Tied to Bhum's Google Scholar profile. Topics:

- Original analysis on SEA marketplace economics — fee structures across Shopee/Lazada/TikTok, voucher mechanic taxonomy, cross-platform contribution-margin distribution.
- Methodology notes — how DataGlass defines and measures true ROAS, contribution margin, ad waste; reproducible from public docs.
- Replications and rebuttals of public claims (e.g. platform-published ROAS figures).
- Working-paper-style write-ups of internal modeling work, with explicit assumptions and limitations.

Each `/research` post should link to the corresponding Google Scholar publication (or "working paper" if unpublished) and cite at least five primary sources.

## Per-post planning template

When rewriting or writing a new post, fill this in BEFORE writing prose:

```
slug:
section:                 [/blog | /engineering | /research]
opening device:          [number | quote | anecdote | counter-claim | formula]
thesis (one sentence):
key sources (≥ 3):
worked example (units):
PoV / disagreement:
question block (real PAA query):
target word count:       (1000–1300 unless flagged)
```

Don't open the editor until every line is filled.

## Closing rule

If, while writing, the post starts to sound like every other "How to X on Shopee" article, stop. Close the file. Re-read the thesis. If you can't justify why this post needs to exist beyond the keyword, delete the draft and propose a different angle.
