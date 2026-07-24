---
name: thai-ecommerce-translation
description: Translate and localize DataGlass marketing copy and Thai e-commerce SaaS pages into Thai using DataGlass's actual brand canon plus the vocabulary that Thai e-commerce sellers recognize. Use when translating DataGlass landing/pricing/solutions/company/integrations/resources pages, when localizing marketing copy for Thai sellers, when adapting CTAs / feature lists / pricing pages / testimonials into Thai, or when choosing between competing Thai terms. Triggers include "translate to Thai", "localize for Thailand", "Thai version of this page", "DataGlass Thai", "Thai copywriting", "Thai SaaS translation".
---

# Thai E-commerce Translation Skill (DataGlass-primary)

You are translating for **DataGlass** (dataglasslabs.com) — a Thai e-commerce profit-optimization platform that helps sellers on Shopee, Lazada, and TikTok Shop. The marketing site is bilingual (EN/TH) and the team has already established a specific voice and vocabulary. Your job is to match that voice exactly when extending or modifying it, and to localize new pages into the same register.

This skill also encodes the broader Thai e-commerce SaaS dialect (Page365, Zort, Zaapi, etc.) for context — but **DataGlass conventions always win**.

## The cardinal rule

**DataGlass marketing copy code-switches.** Thai sentences contain English nouns. Brand-able terms stay English. Industry acronyms stay English. Pure-Thai overcorrection is the most common mistake — don't make it.

✅ Native (what DataGlass actually writes):
> "DataGlass เปลี่ยนข้อมูลร้านค้าออนไลน์ให้เป็น Actions ที่ช่วย optimize ร้าน Shopee Lazada และ TikTok ของคุณ"

❌ Over-translated (what bad MT outputs):
> "ดาต้ากลาสเปลี่ยนข้อมูลร้านค้าออนไลน์ของคุณให้กลายเป็นการดำเนินการที่จะปรับให้เหมาะสมที่สุดสำหรับร้านค้าช้อปปี้ ลาซาด้า และติ๊กต็อก"

## Order of operations (do this every time)

1. **Read `reference/dataglass-marketing-canon.md` first.** This is the source of truth for any DataGlass page. If the term you need is in there, use it verbatim.
2. **Identify the page type.** Landing / Pricing / Solutions / Company / Integrations / How-it-works / Research / Glossary / Legal. Each has its own conventions captured in the canon file.
3. **Read `reference/glossary.md`** for general Thai e-commerce terms not specific to DataGlass.
4. **Consult `reference/tone-guide.md`** when picking register for new copy.
5. **Consult `reference/examples.md`** for side-by-side good/bad/native examples.
6. **Cross-reference `reference/source-vocabulary.md`** for the wider Thai SaaS dialect (Page365, Zort, Zaapi style).
7. **Final pass:** verify against the canon — CTAs, headlines, nav labels, footer columns must match what's already on the site unless you're intentionally creating a new variant.

## What to keep in English (DataGlass convention)

The team deliberately keeps these in English in Thai copy. **Don't translate.**

**Brand names:** DataGlass, DataGlass Labs, Shopee, Lazada, TikTok Shop, LINE OA, LINE SHOPPING, Facebook, Instagram, WhatsApp, Stripe, depa, DEPA TH

**Plan names:** Starter, Pro, Partner

**Acronyms:** ROAS, True ROAS, GMV, COGS, ACOS, SKU, SaaS, ERP, OMS, WMS, CRM, API, AI, ML, KPI, PDPA, CVaR-95, B2B, B2C

**Brand-coined product terms:** North Stars, Decision Engine, Actions, Marketplace, Bundle Deal, Boost, Auto-Boost, voucher, bid, campaign, event, live, keyword, deploy, diagnostics, backfill, workspace, multi-shop, roadmap, pre-flight, audit log

> ⚠️ **`Bundle Deal`, `Boost`, and `Auto-Boost` are English brand nouns** — capitalized, never transliterated. Do **not** write `ดีลบันเดิล`, `บันเดิล`, `บูสต์`, `บูสต์สินค้า`, or `บูสต์สินค้าอัตโนมัติ`. The brand-verb pattern is Thai verb + English noun: `สร้าง Bundle Deal` (Create Bundle Deal), `Boost สินค้า` (Boost Products), `Auto-Boost สินค้า` (Product Auto-Boost).

**Methods/disciplines:** Mathematical Optimization, Robust Optimization, Robust Optimisation, Operations Research, Bayesian inference, Causal inference, Price elasticity, latent factors

**Financial:** margin, contribution margin, break-even ROAS, break-even ACOS, ad spend, attributed revenue, lift

**Calendar/payment:** Pay Day, 9.9, 11.11, 12.12, PromptPay

## What DataGlass *does* translate

Use the Thai forms below. These come straight from `dataglass-marketing-canon.md`.

| English | DataGlass Thai |
|---|---|
| profit | กำไร |
| true profit (formal / calculator) | กำไรสุทธิ |
| true profit (as proof, attach to verb) | เพิ่มกำไรได้จริง |
| sales / revenue | ยอดขาย |
| stock / inventory | สต็อก *(also accepted: สต๊อก)* |
| ad spend (UI: "Ad Spend") | งบโฆษณา *(narrative: ค่าโฆษณา)* |
| recommendation | คำแนะนำ |
| decision (abstract / verb phrase only) | การตัดสินใจ |
| decision making (process) | การตัดสินใจ |
| risk management | การควบคุมความเสี่ยง |

> ⚠️ **Do NOT use `การตัดสินใจ` to translate the product object "Actions"** — `Actions` (the queue/object) **stays English** in Thai prose. `การตัดสินใจ` is reserved for the abstract concept of decision-making (e.g., `ในการตัดสินใจว่า...` = "in deciding whether...") or the canonical pillar name `การตัดสินใจอัตโนมัติ` (Automated Decision Making). When the EN source says "decisions" but means the DataGlass queue, translate as `Actions` — not `การตัดสินใจ`. Same applies to `คิวการตัดสินใจ` → `คิว Actions`, `การตัดสินใจรายวัน` → `Actions รายวัน`.
| optimize ads (verb phrase) | ปรับโฆษณา |
| connect / integration | เชื่อมต่อ / การเชื่อมต่อ |
| dashboard | แดชบอร์ด |
| seller (general) | ผู้ขาย |
| marketplace seller | ผู้ขายตลาดออนไลน์ |
| shop | ร้าน / ร้านค้า |
| customer | ลูกค้า |
| black box | กล่องดำ |
| safety / guardrail | ความปลอดภัย / ด่านความปลอดภัย |
| coming soon | เร็ว ๆ นี้ |
| live (integration status) | ใช้งานได้แล้ว *(also: พร้อมใช้งาน)* |

## CTAs — use these exactly

DataGlass has a specific CTA vocabulary. **Don't invent variants.**

| English | Thai |
|---|---|
| Start free for one month | เริ่มใช้ฟรี 1 เดือน |
| Get started for free | เริ่มใช้ฟรี (also: เริ่มใช้งานฟรี) |
| Get started | เริ่มใช้งาน |
| Start free — no card needed | เริ่มใช้งานฟรี ไม่ต้องผูกบัตร |
| See how it works | ดูวิธีทำงาน |
| Sign in | เข้าสู่ระบบ |
| Contact us | ติดต่อเรา |
| Compare plans | เปรียบเทียบแพลน |
| Read | อ่าน |
| Read full profile | อ่านโปรไฟล์เต็ม |
| Read the report | อ่านรายงาน |
| Read the long-form research | อ่านงานวิจัยฉบับเต็ม |
| View | อ่านต่อ |
| See all solutions | ดูทั้งหมด |
| Browse functional solutions | ดูโซลูชันเชิงปฏิบัติทั้งหมด |
| Connect your shop | เชื่อมต่อร้านของคุณ |
| See pricing | ดูราคา |
| See the {platform} integration | ดูการเชื่อมต่อ {platform} |

## Brand voice rules

1. **Confident, direct, slightly playful.** Not academic. Not corporate.
2. **Lead with "เพิ่มกำไร" not "เพิ่มยอดขาย"** when talking about outcomes. DataGlass is profit-first; this is a brand-positioning move.
3. **Use ปรับ for "optimize"** in seller-facing copy: ปรับโฆษณา, ปรับราคา, ปรับสต็อก. Punchier than "เพิ่มประสิทธิภาพ".
4. **Use "เปลี่ยน…ให้เป็น…"** for transformation claims: "DataGlass เปลี่ยนข้อมูลร้าน...ให้เป็น Actions ที่..."
5. **Use "ทุก action ต้องผ่าน..."** patterns when discussing safety/risk.
6. **Use 3-beat rhythm** in headlines when it fits: "เชื่อมต่อครั้งเดียว ตัดสินใจรายวัน Deploy ในคลิกเดียว" (note: keeps Deploy in English).
7. **Numbers stay Arabic.** ฿699 ต่อเดือน. 50 ออเดอร์. 1 เดือน.
8. **Punctuation:** Use `· ` (middle dot) for stat-strip separators, `—` for em-dash, `เร็ว ๆ นี้` with space.

## Feature-label patterns (TH key-features lists, capability chips)

When labeling individual product capabilities in a list (e.g. the homepage Key Features chips, the integrations strip, solution moves), follow these patterns:

### 1. Active verb + concrete object — never bare nouns

A bare noun label reads like a glossary entry, not a capability. Add the active verb and name what the seller acts on.

| ❌ Bare / weird | ✅ Active + concrete |
|---|---|
| `จำลอง` (Simulate) | `จำลองกำไรก่อนเปลี่ยนแปลง` (Simulate profit before changes) |
| `ความยืดหยุ่นของราคา` (Price elasticity) | `วิเคราะห์ความยืดหยุ่นของราคา` (Analyze price elasticity) |
| `เป้าหมายกำไรและตัวปรับกำไร` (Target margin and margin optimizer — abstract) | `ปรับเปลี่ยนโครงสร้างกำไร` (Adjust profit structure — concrete action) |
| `มีระบบป้องกันและตระหนักถึงความเสี่ยง` (Free-form description of guardrails) | `Risk-Aware Optimization ในตัว` (use the canonical Tier-1 term directly) |

### 2. Cross-shop / multi-marketplace framing → `ช่องทาง` (channels) in Thai; `shops` in English

When the capability spans Shopee + Lazada + TikTok Shop, **EN and TH intentionally diverge**:

- **EN** keeps `shops` (literal mapping reads natural in English).
- **TH** prefers `หลายช่องทาง` (multi-channel) over `ข้าม shop` or `หลายร้าน`. `ช่องทาง` reads as "sales channels" in Thai seller dialect — broader and more on-brand than the literal English mapping.

| Concept | EN | TH |
|---|---|---|
| Sync stock cross-platform | `Sync stock across shops` | `Sync สต็อกหลายช่องทาง` |
| Multi-marketplace decisions | `multi-shop / multi-marketplace decisions` | `หลายช่องทาง` |

This is one of the few places EN↔TH asymmetry is intentional — don't try to force literal parity.

Exception: when the meaning is literally "multiple shops within one Shopee account" (multi-shop account), `หลายร้าน` is correct on the TH side — e.g. `จัดการหลายร้านในที่เดียว` (manage multiple shops in one place). EN equivalent: `Manage all shops in one place`.

### 3. Feature labels — Thai bridge over English when the Thai reads naturally

For capability labels (not category terms), prefer the natural Thai phrasing even when an English brand-whitelist term exists. This is a soft preference that overrides the "stays English" default for *labels in capability lists* — the goal is scannability for Thai sellers.

| Surface | Prefer | Why |
|---|---|---|
| Hero / category / proof line | English brand term (`Decision Engine`, `Mathematical Optimization`, `Actions`) | Authority register |
| Capability chip / feature label | Natural Thai action phrase (e.g. `จัดการหลายร้านในที่เดียว`) | Scannability |

Brand whitelist still applies to: `Actions`, `True ROAS`, `Bundle Deal`, `Boost`, `Auto-Boost`, `Deploy`, `workspace`, plan names, acronyms — those stay English everywhere.

### 4. Common spelling pitfalls in feature labels

| Wrong | Right |
|---|---|
| `ฟิเจอร์` / `ฟิเจอ` / `ฟีเจอ` / `ฟรีเจ้อ` / `ฟิวเจอร์` | `ฟีเจอร์` |
| `พ้อม` | `พร้อม` |
| `สต๊อค` / `สต้อก` | `สต็อก` *(also accepted: `สต๊อก`)* |
| `โฆษนา` | `โฆษณา` |
| `อัพเดต` | `อัปเดต` |
| `แพ็ค` | `แพ็ก` |

## When NOT to translate

- ❌ Don't translate "Marketplace" — keep as **Marketplace**.
- ❌ Don't translate `ROAS` or `True ROAS` — keep English. **`ROAS ที่แท้จริง` is a wrong calque** — always use **`True ROAS`** (a defined brand metric with its own glossary page). ⚠️ This does **not** generalize into a `True ___` rule: `true profit` and `true margin` are ordinary descriptive phrases, not locked brand metrics — translate them (`true profit` → `กำไรสุทธิ`, see table above; `true margin` → `margin หลังหักต้นทุน`). Never calque as `กำไรที่แท้จริง` / `margin ที่แท้จริง`, and don't invent `True Profit` / `True Margin` as English brand metrics — `True ROAS` is the only locked `True ___` term.
- ❌ Don't translate plan names (Starter / Pro / Partner).
- ❌ Don't translate "Decision engine" in comparison-table feature rows (use ระบบช่วยตัดสินใจ for plan-description prose, Decision engine for the row label).
- ❌ Don't translate "deploy", "diagnostics", "backfill", "workspace".
- ❌ Don't translate "Robust Optimization", "Operations Research", "Bayesian inference", "Causal inference".
- ❌ Don't translate company brand names (Page365, Zort, etc.) when referencing competitors.
- ❌ Don't capitalize Thai script (impossible) — but DO retain English ALL-CAPS where source uses them.
- ❌ Don't use Thai numerals.

## Broader Thai SaaS dialect (when DataGlass canon doesn't cover something)

When you need a Thai term DataGlass hasn't established, fall back to the wider Thai e-commerce SaaS dialect in `reference/glossary.md`. Key phrases that work everywhere:

- **ครบวงจร** — comprehensive / end-to-end
- **ครบจบในที่เดียว** — all-in-one in one place
- **ตอบโจทย์** — meets the need
- **หลังบ้าน** — back-office (universal)
- **เรียลไทม์** — real-time (transliterated, never ตามเวลาจริง)
- **ฟีเจอร์** — feature (never คุณสมบัติ in software context)
- **ไร้รอยต่อ** — seamless

But: **don't force these into DataGlass copy** if the team has chosen a different phrasing. If `dataglass-marketing-canon.md` says "ราคาที่ตรงไปตรงมา", don't substitute "ราคาครบวงจร."

## Audience register

DataGlass targets **professional marketplace sellers** — established Shopee/Lazada/TikTok Shop merchants who care about margin and operations. Use:

✅ **ผู้ขาย / ร้านค้า / ธุรกิจ** — professional register

❌ Avoid **แม่ค้าออนไลน์ / พ่อค้าแม่ค้า** — these signal casual market-vendor voice (Page365 / Buzzebees style), not DataGlass.

❌ Avoid **ผู้ประกอบการ** — too formal/accounting-register (PEAK style), not DataGlass.

The DataGlass voice sits between "neutral professional" and "confident operator." Think: a friend who runs a successful Shopee shop telling you how to run yours better.

## Spelling conventions DataGlass uses

| Term | DataGlass canonical | Variants in market |
|---|---|---|
| stock | สต็อก *(also: สต๊อก in some marketing-home strings)* | สต๊อค (Sellsuki) |
| pack | แพ็ก | แพ็ค (Akita / Packhai) |
| update | อัปเดต | อัพเดต |
| platform | แพลตฟอร์ม | แพลทฟอร์ม (LnwShop) |
| back-office | หลังบ้าน | หลังร้าน (Shipnity) |
| coming soon | เร็ว ๆ นี้ | กำลังจะตามมา *(DataGlass uses both)* |

When reading source Thai, accept all variants. When writing, default to column 1.

## Final-pass checklist

Before delivering, verify:

- [ ] Every brand-able English term from `dataglass-marketing-canon.md` is preserved as English
- [ ] CTAs match the canonical list exactly
- [ ] Brand names (Shopee, Lazada, TikTok Shop, DataGlass) are not translated
- [ ] Numbers use Arabic numerals
- [ ] No "ตามเวลาจริง" (use เรียลไทม์); no "คุณสมบัติ" for software features (use ฟีเจอร์)
- [ ] No literary Thai (อาทิเช่น, ประการ, ความเป็นเลิศ); use natural Thai
- [ ] Audience register is ผู้ขาย / ร้านค้า / ธุรกิจ — not แม่ค้า or ผู้ประกอบการ
- [ ] If extending an existing page, the new copy reads continuously with the existing surrounding copy

## Reference files (in priority order)

1. **`reference/dataglass-marketing-canon.md`** — verbatim EN/TH pairs from DataGlass marketing. **Always consult first.**
2. **`reference/glossary.md`** — 200+ general Thai e-commerce term mappings for cases the canon doesn't cover.
3. **`reference/tone-guide.md`** — voice & register guide with 4 register profiles.
4. **`reference/examples.md`** — side-by-side good/bad/native translation examples.
5. **`reference/source-vocabulary.md`** — verbatim vocabulary from 15 Thai e-commerce tools (Page365, Zort, Zaapi, Shipnity, etc.) — useful for cross-referencing how the Thai SaaS market talks.
