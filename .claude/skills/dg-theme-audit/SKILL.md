---
name: dg-theme-audit
description: Audit pending git changes to enforce the new Nuxt UI v4 semantic tokens (`bg-default`, `text-muted`, `border-accented`, `text-primary`, etc.) and reject legacy shadcn-style aliases (`bg-card`, `text-foreground`, `border-border`, `bg-destructive`, `bg-popover`, `--dg-*`, `--general-*`, etc.) and raw Tailwind palette classes (`bg-zinc-500`, `text-gray-700`, `border-slate-200`, etc.) inside components. Use when the user asks to "audit theme tokens", "check for legacy aliases", "review styles before commit", or whenever new styles are being added to `dg-app/`, `dg-base/`, `dg-marketing/`, or `app/` and the user wants to enforce the new token system. Reference: `.claude/skills/nuxt-ui/references/theme/*`.
---

# dg theme audit

Audit pending git changes against the **new** Nuxt UI v4 semantic token system documented in [.claude/skills/nuxt-ui/references/theme/css-variables.md](../nuxt-ui/references/theme/css-variables.md) and [.claude/skills/nuxt-ui/references/theme/design-system.md](../nuxt-ui/references/theme/design-system.md). Reject any new code that uses **legacy shadcn-style aliases** or **raw Tailwind palette colors**.

## When to run

Run this audit:
- Before the user commits or stages style changes.
- When the user says "audit tokens", "check theme compliance", "any legacy aliases?", or similar.
- After implementing a new component, before reporting the task complete.

Do **not** flag changes inside the source-of-truth files where the legacy aliases and raw palettes are *defined* (see [Excluded files](#excluded-files)).

## What's allowed (the new system)

Authoritative reference: [.claude/skills/nuxt-ui/references/theme/css-variables.md](../nuxt-ui/references/theme/css-variables.md).

**Semantic color utilities** (driven by `--ui-{primary,secondary,success,info,warning,error}`):
- `text-primary`, `bg-primary`, `ring-primary`, `border-primary`
- `text-secondary`, `bg-secondary`, …
- `text-success`, `text-info`, `text-warning`, `text-error` (and `bg-*` / `border-*` / `ring-*` equivalents)

**Text utilities** (driven by `--ui-text*`):
- `text-dimmed`, `text-muted`, `text-toned`, `text-default`, `text-highlighted`, `text-inverted`

**Background utilities** (driven by `--ui-bg*`):
- `bg-default`, `bg-muted`, `bg-elevated`, `bg-accented`, `bg-inverted`

**Border utilities** (driven by `--ui-border*`):
- `border-default`, `border-muted`, `border-accented`, `border-inverted`

**Radius utilities** (driven by `--ui-radius`): plain Tailwind `rounded-{xs,sm,md,lg,xl,2xl,3xl}`.

**CSS vars** referenced directly are fine if they are `--ui-*` (e.g. `var(--ui-text-muted)`, `var(--ui-bg)`, `var(--ui-border)`).

## What's forbidden in component code

### A. Legacy shadcn-style CSS variables

Anything resolved from the `@theme inline` block in [dg-base/app/assets/css/main.css](../../../dg-base/app/assets/css/main.css). Forbid these tokens **referenced from component code** (`.vue`, `.tsx`, `.jsx`, `.ts`, `.js`, and any CSS file *other than* `main.css`):

| Pattern | Replacement |
|---|---|
| `--color-background` | `--ui-bg-muted` |
| `--color-foreground` | `--ui-text` |
| `--color-card` | `--ui-bg` |
| `--color-card-foreground` | `--ui-text-highlighted` |
| `--color-popover` | `--ui-bg-elevated` |
| `--color-popover-foreground` | `--ui-text` |
| `--color-primary` (in components) | `--ui-primary` |
| `--color-primary-foreground` | `--ui-color-primary-50` |
| `--color-primary-2` | `--ui-secondary` |
| `--color-primary-hover` | `--ui-color-primary-600` |
| `--color-secondary-foreground` | `--ui-color-primary-600` |
| `--color-muted` | `--ui-bg-elevated` |
| `--color-muted-foreground` | `--ui-text-muted` |
| `--color-accent` | `--ui-bg-accented` |
| `--color-accent-foreground` | `--ui-text-highlighted` |
| `--color-destructive` | `--ui-error` |
| `--color-destructive-foreground` | `white` |
| `--color-border` | `--ui-border` |
| `--color-input` | `--ui-bg` |
| `--color-ring` | `--ui-secondary` |
| `--color-success` (legacy alias) | `--ui-success` |
| `--color-currency-green` | `--ui-color-success-400` |
| `--color-currency-red` | `--color-rose-500` (raw — rethink if you need this) |
| `--color-price` | `--ui-color-primary-600` |
| `--color-chart-{1..5}` | direct `--ui-color-*-400` of the chart's intended hue |
| `--color-sidebar*` | corresponding `--ui-bg-elevated` / `--ui-text*` / `--ui-border*` |

Plus the dgfe-specific design-system aliases:

| Pattern | Replacement |
|---|---|
| `--general-foreground` | `--ui-text-highlighted` |
| `--general-muted-foreground` | `--ui-text-muted` |
| `--general-border` | `--ui-border` |
| `--general-accent` | `--ui-bg-accented` |
| `--dg-page` | `--ui-bg` |
| `--dg-page-muted` | `--ui-bg-muted` |
| `--dg-card` | `--ui-bg` |
| `--dg-border` | `--ui-border` |
| `--dg-border-strong` | `--ui-border-accented` |
| `--dg-fg`, `--dg-ink` | `--ui-text-highlighted` |
| `--dg-fg-muted`, `--dg-ink-muted` | `--ui-text-muted` |
| `--dg-fg-subtle`, `--dg-ink-subtle` | `--ui-text-dimmed` |
| `--dg-shadow-xs` | inline `0 1px 2px 0 rgba(0,0,0,.05)` or define in main.css |

### B. Legacy shadcn-style Tailwind utility classes

Tailwind classes generated from the legacy `@theme inline` aliases. These are unambiguously shadcn — flag them in component files.

| Forbidden class | Replacement |
|---|---|
| `bg-background` | `bg-muted` |
| `text-foreground`, `bg-foreground` | `text-default` / `bg-default` |
| `bg-card`, `text-card-foreground` | `bg-default` / `text-highlighted` |
| `bg-popover`, `text-popover-foreground` | `bg-elevated` / `text-default` |
| `bg-primary-foreground`, `text-primary-foreground` | use `text-inverted` on a `bg-primary` surface |
| `text-secondary-foreground`, `bg-secondary-foreground` | `text-primary` (semantic intent: emphasized link/CTA over `secondary` surface) |
| `text-muted-foreground` | `text-muted` |
| `bg-accent`, `text-accent-foreground` | `bg-accented` / `text-highlighted` |
| `bg-destructive`, `text-destructive`, `text-destructive-foreground` | `bg-error` / `text-error` / `text-inverted` |
| `border-border` | `border-default` (or just `border`) |
| `bg-input` | `bg-default` |
| `ring-ring` | `ring-secondary` (or `focus-visible:ring-secondary`) |
| `bg-sidebar`, `bg-sidebar-*`, `text-sidebar-*`, `border-sidebar-*`, `ring-sidebar-*` | corresponding `bg-elevated` / `text-default` / `border-default` |
| `bg-currency-green`, `text-currency-green`, `bg-currency-red`, `text-currency-red` | `text-success` / `text-error` |
| `text-price`, `bg-price` | `text-primary` (price emphasis) |
| `bg-chart-1`…`bg-chart-5`, `text-chart-*`, `border-chart-*` | drop the chart aliases; pick a real semantic intent or define a chart-specific token in `main.css` |

> **Ambiguity note:** `bg-muted` and `bg-secondary` exist in **both** systems but mean different things. The legacy `--color-muted` resolves to `--ui-bg-elevated`; the Nuxt UI `bg-muted` resolves to `--ui-bg-muted`. New code should use these classes with **Nuxt UI semantics** — the audit does not flag them, but flag any nearby legacy companions (`bg-card`, `text-muted-foreground`) that imply the legacy mental model.

### C. Raw Tailwind palette colors in components

Raw palette utilities like `bg-zinc-500`, `text-gray-700`, `border-slate-200`, `from-orange-300`, `ring-rose-400` should not appear in component code. They lock light/dark mode and bypass theming.

Forbidden palette names: `slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose`.

Forbidden utility prefixes: `bg-`, `text-`, `border-`, `ring-`, `from-`, `via-`, `to-`, `divide-`, `outline-`, `decoration-`, `placeholder-`, `accent-`, `caret-`, `shadow-`, `fill-`, `stroke-`.

**Replace with**: a semantic Nuxt UI token (`text-muted`, `bg-elevated`, …) or a CSS var on the dg palette (`var(--ui-color-primary-500)`, `var(--ui-color-success-400)`) when a tonal hue is genuinely needed.

### D. Raw `--color-{palette}-NNN` CSS variables in components

Same rule as (C): in `.vue`/`.ts`/`.tsx` and non-`main.css` CSS, prefer `--ui-*`. Flag direct references like `var(--color-zinc-500)`, `var(--color-rose-500)` in component code.

## Excluded files

Do **not** flag matches inside:
- `dg-base/app/assets/css/main.css` (legacy aliases are defined here intentionally; raw palette use is allowed when **defining** tokens).
- `dg-marketing/**/main.css` and any other `**/assets/css/main.css` that imports `@nuxt/ui`.
- `app.config.ts`, `nuxt.config.ts` (theme configuration).
- `**/*.figma.ts` (design-system mappings).

## How to run the audit

Follow these steps in order. Do **not** edit any code as part of this audit — only report. The user runs the migration themselves unless they explicitly ask you to apply fixes.

### 1. Determine scope

Ask the user (or pick a default) which slice of changes to audit:
- **Branch diff (default)**: `git diff --name-only main...HEAD` plus working-tree changes.
- **Working tree only**: `git diff --name-only HEAD`.
- **Staged only**: `git diff --name-only --cached`.

### 2. Get added/modified lines

For each candidate file, get the diff with line numbers and filter to additions:

```bash
# Branch diff with line numbers (preferred when available)
git diff -U0 main...HEAD -- '*.vue' '*.ts' '*.tsx' '*.js' '*.jsx' '*.css' \
  ':!**/main.css' ':!**/app.config.ts' ':!**/nuxt.config.ts' ':!**/*.figma.ts' \
  | awk '/^\+\+\+ /{f=substr($0,7)} /^@@/{split($3,a,",");ln=substr(a[1],2)+0;next} /^\+/&&!/^\+\+\+/{print f":"ln":"substr($0,2);ln++} /^[ -]/{ln++}'
```

This emits `path:line:content` for every **added** line, restricted to component-ish files and excluding the source-of-truth files.

### 3. Match forbidden patterns

Pipe step 2's output through `grep -E` for each category. Use these regexes (anchor to word boundaries to avoid false positives):

**A. Legacy shadcn CSS vars** (in component code):
```
--color-(background|foreground|card|card-foreground|popover|popover-foreground|primary-foreground|primary-2|primary-hover|secondary-foreground|muted-foreground|accent|accent-foreground|destructive|destructive-foreground|input|ring|currency-(green|red)|price|chart-[1-5]|sidebar(-[a-z-]+)?)\b
--color-(muted|border|secondary|success)\b   # only if file is NOT main.css
```

**B. Legacy `--general-*` and `--dg-*`**:
```
--(general|dg)-[a-z-]+\b
```

**C. Legacy shadcn Tailwind classes** (`(^|[\s"\'\`])` before, `($|[\s"\'\`])` after):
```
(bg|text|hover:bg|hover:text|focus:bg|focus:text|focus-visible:bg|focus-visible:text|dark:bg|dark:text|group-hover:bg|group-hover:text)-(background|foreground|card|card-foreground|popover|popover-foreground|primary-foreground|secondary-foreground|muted-foreground|accent|accent-foreground|destructive|destructive-foreground|input|currency-(green|red)|price|chart-[1-5]|sidebar(-[a-z-]+)?)\b
border-(border|sidebar(-[a-z-]+)?)\b
ring-(ring|sidebar(-[a-z-]+)?)\b
```

**D. Raw Tailwind palette classes**:
```
\b(bg|text|border|ring|from|via|to|divide|outline|decoration|placeholder|accent|caret|shadow|fill|stroke)(-(hover|focus|focus-visible|active|disabled|dark|group-hover))?-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)(/\d+)?\b
```

(Tailwind variants typically come *before* the prefix: `dark:bg-zinc-500`, `hover:text-rose-400`. Match those by scanning the whole token after `:` too.)

**E. Raw palette CSS vars in component code**:
```
var\(--color-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\)
```

If `ripgrep` is available, prefer it over awk+grep for line-numbered matches against the working tree:

```bash
rg -n --type-add 'styled:*.{vue,ts,tsx,js,jsx,css}' -t styled \
   -g '!**/main.css' -g '!**/app.config.ts' -g '!**/nuxt.config.ts' -g '!**/*.figma.ts' \
   -e '<regex from above>' \
   $(git diff --name-only main...HEAD HEAD)
```

### 4. Report

Produce a single grouped report:

```
## dg-theme-audit — N findings

### A. Legacy shadcn CSS vars (k)
- path/to/File.vue:42 — `--color-foreground` → `--ui-text`
- …

### B. Legacy --dg-* / --general-* (k)
- …

### C. Legacy shadcn Tailwind classes (k)
- path/to/File.vue:88 — `bg-card text-card-foreground` → `bg-default text-highlighted`
- …

### D. Raw palette utilities (k)
- path/to/File.vue:113 — `text-zinc-500` → `text-muted` (or `var(--ui-color-neutral-500)` if a specific tone is needed)

### E. Raw palette CSS vars (k)
- …

### Suggested next step
Apply replacements above, or run [skill: dg-theme-audit] again after committing for an incremental check.
```

Use markdown links for file references: `[File.vue:42](dg-app/.../File.vue#L42)`.

If there are no findings, report: `✅ dg-theme-audit — clean. No legacy aliases or raw palettes in the audited diff.`

### 5. Do NOT auto-fix

Never edit files as part of running the audit. The user explicitly asks for fixes in a follow-up turn. If they do, prefer a single `Edit` per file with `replace_all: true` for unambiguous one-to-one replacements; flag ambiguous cases (`bg-muted`, `bg-secondary`) for manual review.

## Why this matters

The legacy `@theme inline` block in [dg-base/app/assets/css/main.css](../../../dg-base/app/assets/css/main.css) is a **migration shim**, not an API. Every legacy alias passes through to a `--ui-*` token; using the `--ui-*` (or its Tailwind utility) directly:
- removes one indirection from theme tracing,
- guarantees the dark-mode flip works (Nuxt UI owns the `.dark` overrides),
- aligns with Nuxt UI v4's documented design system, so future component overrides via `app.config.ts` `ui.*` actually take effect,
- makes raw palettes a deliberate exception (define a token in `main.css`) rather than a default reach.

Raw `bg-zinc-500`-style classes break this because they hard-code a single tone with no dark-mode pair, defeating both the brand-tightened dark theme overrides and the Nuxt UI semantic system.
