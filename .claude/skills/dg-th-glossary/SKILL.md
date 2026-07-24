---
name: dg-th-glossary
description: Canonical Thai treatment for DataGlass-specific product terminology — feature names, coined concepts, navigation items, and metrics that must stay consistent across the app. Use when translating a DG product term (Decisions, Action Cards, Unified view, Workspace, Boost, etc.) or when reviewing Thai strings for cross-feature inconsistency. Auto-triggers on edits to `*/i18n/locales/th.json` alongside `dg-th-localization`. For generic Thai SaaS vocabulary (Save, Cancel, Email, etc.), follow the principles in `dg-th-localization` — that's not what this glossary is for.
---

# dg-th-glossary

This glossary locks the Thai treatment of **DataGlass-specific terminology** — the words that name our features, coined concepts, and surfaces. Standard SaaS vocabulary (Save, Cancel, Email, Password) is not here; trust the principles in [`dg-th-localization`](../dg-th-localization/SKILL.md) for those.

**Authority**: This glossary follows the **marketing brand canon** at [`.claude/skills/thai-ecommerce-translation/`](../thai-ecommerce-translation/SKILL.md). When in doubt, marketing canon wins — the app aligns to marketing, not the other way around. (Direction set 2026-05-22 after the app was reverted from a stricter transliteration regime.)

**Why it exists**: `th.json` historically drifted — five different Thai renderings of "Decisions" (`แอกชั่นการ์ด`, `แอกชั่น`, `อื่นๆ`, `การดำเนินการ`, blank), inconsistent verb forms, mixed transliterations. Lock the names here, reference here, never reinvent.

## Master rule: brand-coined product nouns stay English

The marketing canon treats these as English-only proper nouns, even when embedded in Thai prose:

`Actions`, `Action Cards`, `Deploy`, `Deployed Actions`, `workspace`, `diagnostics`, `Bundle Deal`, `Boost`, `Auto-Boost`, `voucher`, `bid`, `campaign`, `margin`, `optimize`, `Marketplace`, `Decision Engine`, `North Stars`, `Mathematical Optimization`, `Operations Research`, `Robust Optimization`, `Bayesian inference`, `Causal inference`, `True ROAS`, `ROAS`, `GMV`, `COGS`, `ACOS`, `SKU`, `backfill`, `multi-shop`, `pre-flight`, `audit log`, plan names (`Starter`, `Pro`, `Partner`).

**Spacing**: When an English word appears inside a Thai sentence, put a space before AND after. Example: `ยังไม่มี Actions ใหม่`, not `ยังไม่มีActionsใหม่`.

**Casing**: `Actions`, `Deployed Actions`, `Action Cards`, `Deploy`, `Deployed`, `Bundle Deal`, `Boost`, `Auto-Boost` — title case (brand nouns). `workspace`, `diagnostics`, `voucher`, `bid`, `campaign`, `margin`, `optimize`, `deploy` (verb form in marketing taglines) — lowercase per marketing canon.

## How to read each row

- **English** — the term as it appears in `en.json` / the codebase.
- **Primary** — the canonical treatment in Thai prose. English words shown verbatim are meant to stay English with spaces.
- **Alternate** — context where a variant is acceptable.
- **Never use** — translations seen in the codebase that should be removed on sight.

## Core product concept: Decisions / Actions

This is the central UX noun in DataGlass. The product object stays **English: `Actions`** (plural by default). `การตัดสินใจ` is reserved for the abstract verb phrase and for the Pillar 2 name; never use it for the product object.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Decisions (product object / feature name) | `Actions` | — | `แอกชั่น` (old transliteration, reversed), `การตัดสินใจ` (abstract), `การดำเนินการ` (vague), `อื่นๆ` |
| Decision (singular reference, "this decision") | `Action` | — | `แอกชั่น`, `การตัดสินใจ` |
| Decision Card | `Action Cards` | — | `แอกชั่นการ์ด`, `การ์ดแอกชั่น` |
| Decision Cards (page/section) | `Action Cards` | — | — |
| Ad Decisions | `Ad Actions` | — | `แอกชั่นโฆษณา` |
| Product Decisions | `Product Actions` | — | `แอกชั่นสินค้า` |
| All Decisions | `All Actions` | — | `แอกชั่นทั้งหมด` |
| Decisions overview | `ภาพรวม Actions` | — | `แอกชั่นทั้งหมด` (means "all"), `ภาพรวมแอกชั่น` |
| Decision-making (abstract verb in body copy) | `การตัดสินใจ` | — | `Actions` (only the product object stays English) |
| Pillar 2: Automated Decision Making | `การตัดสินใจอัตโนมัติ` | — | (this is the canonical pillar name in marketing canon) |
| Ads Adjustment (a specific Decision type) | `การปรับโฆษณา` | — | `แอดส์แอดจัสต์เมนต์` |

## Deploy family

The deploy verb and the deployed state both stay English. The Pillar/concept name in marketing is `จากการตัดสินใจสู่การลงมือทำ ไม่ใช่แค่แดชบอร์ด` ("from decisions to deployment, not dashboards") — there the action is in Thai for the brand voice; everywhere else use `Deploy`.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Deploy (verb / button / toast) | `Deploy` | — | `รัน` (old translation, reversed), `นำไปใช้`, `ดีพลอย`, `ปฏิบัติจริง` |
| Deployed (state label) | `Deployed` | — | `รันแล้ว`, `รันอยู่` (in product-object contexts) |
| Deployed Decisions | `Deployed Actions` | — | `แอกชั่นรันอยู่`, `แอกชั่นกำลังรัน`, `การตัดสินใจที่ใช้งานแล้ว` |
| Deployed Ad Decisions | `Deployed Ad Actions` | — | — |
| Deployment (noun, "deployment mode") | `การ Deploy` | — | `การรัน` (in product-object contexts) |
| Ads deployment mode | `โหมดการ Deploy โฆษณา` | — | `โหมดการรันโฆษณา` |
| "Deployed for X" / "Running for X" (time label) | `รันมาแล้ว X` / `Running for X` | — | (this stays Thai — describes Action lifecycle, not the deploy verb itself) |
| Runtime (section heading) | `เวลาการรัน` | — | (also fine to leave Thai — natural language, not the deploy verb) |
| Run a campaign (generic verb, not deploy) | `รัน` | — | (`รัน` is fine for generic "operate / run" — it's only banned as the *deploy* verb) |

## Workspace & navigation

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Workspace (the authenticated product surface) | `workspace` | — | `แอป` (old translation, reversed; still correct when source says "the app"), `เวิร์กสเปซ`, `พื้นที่ทำงาน` |
| the app (generic reference to the product) | `แอป` | — | (don't change `แอป` → `workspace` unless the source explicitly says "workspace") |
| My Shop | `ร้านค้าของฉัน` | — | `ช็อปของฉัน` |
| My Shops | `ร้านค้าของฉัน` | (Thai doesn't pluralize) | `ร้านค้าทั้งหลายของฉัน` |
| Home | `หน้าหลัก` | — | `โฮม`, `บ้าน` |
| Optimization (sidebar section) | `การเพิ่มประสิทธิภาพ` | `ปรับปรุงประสิทธิภาพ` (verb form, body copy) | `ออปติไมเซชัน` |
| Report (sidebar section) | `รายงาน` | — | `รีพอร์ต` |
| Getting Started | `เริ่มต้นใช้งาน` | — | `เก็ตติ้งสตาร์ตเตด` |

## Connect / Integration

**Stays Thai** (marketing canon explicitly: "เชื่อมต่อ / การเชื่อมต่อ"). The brand tagline is "เชื่อมต่อครั้งเดียว ตัดสินใจรายวัน Deploy ในคลิกเดียว" — Connect in Thai, Deploy in English.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Connect (verb, "connect a shop") | `เชื่อมต่อ` | — | `ลิงก์` (old translation, reversed; still correct as URL/route-link noun) |
| Connected (state) | `เชื่อมต่อแล้ว` | — | `ลิงก์แล้ว` |
| Connection / Integration (noun) | `การเชื่อมต่อ` | — | `การลิงก์` |
| Connect Shopee / Lazada / TikTok | `เชื่อมต่อ Shopee` etc. | — | `ลิงก์ Shopee` |
| Link (URL / hyperlink / route — NOT Connect) | `ลิงก์` | — | (keep `ลิงก์` for reset-password URLs, verify-email URLs, invalid product/ad route errors, "shop URL" label, quick-links sidebar) |

The line between "Connect" and "Link (URL)": if it's about establishing an auth/data relationship with a marketplace, it's Connect = `เชื่อมต่อ`. If it's about a literal URL/route that the user clicks or that's invalid, it's Link = `ลิงก์`.

## Diagnostics

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Diagnostic / Diagnostics (DG feature) | `diagnostics` | — | `การตรวจสุขภาพร้าน` (old translation, reversed), `การวิเคราะห์` (reads as all-platform analytics) |
| Diagnostics for {platform} | `diagnostics สำหรับ {platform}` | — | — |
| Analysis (generic, not the DG feature) | `การวิเคราะห์` | — | — |

## Feature areas

These map roughly to the layer directories in `dg-app/layers/*`. Lock the surface name even if subsection labels vary.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Products (feature area) | `สินค้า` | — | `ผลิตภัณฑ์` (over-formal for marketplace SKUs) |
| Orders (feature area) | `ออเดอร์` | `คำสั่งซื้อ` (formal contexts: invoices, legal copy, customer emails) | `ออร์เดอร์` |
| Ads (feature area) | `โฆษณา` | — | `แอด`, `แอดส์` |
| All Ads | `โฆษณาทั้งหมด` | — | — |
| Advertising | `การโฆษณา` | `โฆษณา` (when context is clear) | `แอดเวอร์ไทซิ่ง` |
| Stock (feature area) | `สต็อก` | — | `สินค้าคงคลัง` (over-formal for in-app UI; OK in formal reports only) |
| Metrics | `ตัวชี้วัด` | `เมตริก` (technical/data contexts) | `เมตริค` |
| Alerts | `การแจ้งเตือน` | — | `อะเลิร์ต` |
| Billing | `การเรียกเก็บเงิน` | `บิลลิ่ง` (very rare, technical) | `บิลลิง` |
| Settings | `ตั้งค่า` | — | `การตั้งค่า` (over-formal as a nav label — fine in body) |
| Experiments | `การทดลอง` | — | `เอ็กซ์เพอริเมนต์` |
| Price Elasticity (product-detail tool) | `ความยืดหยุ่นของราคา` (marketing canon: `วิเคราะห์ความยืดหยุ่นของราคา` in product key features) | lowercase `price-elasticity` when naming the Vilya model in body copy, e.g. `โมเดล price-elasticity ของ Vilya` | `ความไวต่อราคา` (rejected 2026-06-05), `ไพรซ์อีลาสติซิตี้` |
| Onboarding | `การเริ่มต้นใช้งาน` | `เริ่มต้นใช้งาน` (button/CTA form) | `ออนบอร์ดดิ้ง` |
| AI | `AI` | — | `ปัญญาประดิษฐ์` (over-formal), `เอไอ` |

## "Unified view" family

DataGlass has a coined "Unified" concept — products from multiple platforms rolled up into a single view. The Thai describes what the user actually sees: an overview of products consolidated across platforms. Marketing has no specific rule here; this app convention stands.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Unified view | `ภาพรวมสินค้า` | — | `มุมมองรวม` (too abstract) |
| Unified (cross-shop mode tab, e.g. products overview "This shop / Unified") | `รวมทุกร้าน` | — | `ภาพรวมสินค้า` (both tabs show product overviews — ambiguous here), `ยูนิฟายด์` |
| Unified inventory / Unified stock | `สต็อกรวม` | — | `สต็อกครบ` |
| Unified product | `สินค้ารวม` | `สินค้าแบบรวม` (when modifier-clarity needed) | — |

**Why `ภาพรวมสินค้า` over `มุมมองรวม`**: the literal translation reads abstract; `ภาพรวมสินค้า` names the thing they're looking at — products from all platforms in one place.

**Why `รวมทุกร้าน` for the mode tab** (added 2026-06-06): on the product overview dashboard the tab pair contrasts one shop vs all connected shops — `รวมทุกร้าน` says exactly that; `ภาพรวมสินค้า` would describe both tabs equally and lose the contrast.

## Product overview dashboard (added 2026-06-06)

The profit-flow Sankey and its surrounding cards. Money-metric names follow brand canon (English: COGS, GMV, VAT, Margin, voucher); Thai describes flows and fees the way Shopee/Lazada Seller Center do.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Profit flow (Sankey card) | `เส้นทางกำไร` | — | `การไหลของกำไร` (literal), `โปรฟิตโฟลว์` |
| Platform Fees | `ค่าธรรมเนียมแพลตฟอร์ม` | — | `ค่าแพลตฟอร์ม` |
| Discounts & Vouchers | `ส่วนลดและ Voucher` | — | `ส่วนลดและบัตรกำนัล` |
| Commission Fee | `ค่าคอมมิชชั่น` | — | `ค่านายหน้า` |
| Channels: Organic / Ads / Affiliate | `ออร์แกนิก` / `โฆษณา` / `Affiliate` | — | `ธรรมชาติ`, `แอดส์`, `พันธมิตร` |
| Per channel / Merged (fee-detail toggle) | `แยกตามช่องทาง` / `รวม` | — | — |

## Metrics

Consistency matters — these appear on charts and tables across the app. Brand-canon metric names (`ROAS`, `True ROAS`, `GMV`, `COGS`, `ACOS`, `SKU`) stay English.

| English | Primary | Alternate | Never use |
|---|---|---|---|
| GMV | `GMV` | — | `ยอดขายรวม` (in tooltip/explainer only, never as the label) |
| Orders (metric) | `คำสั่งซื้อ` | — | (use `ออเดอร์` when not a formal metric label) |
| Margin | `margin` (English per brand canon) | `อัตรากำไร` / `กำไรขั้นต้น` (when specifically gross margin, body copy only) | `มาร์จิ้น` |
| Top SKUs | `SKU ขายดี` | — | `SKU อันดับต้น` (awkward), `สินค้าขายดี` (drops "SKU" specificity) |
| Traffic | `ทราฟฟิก` | `จำนวนผู้เข้าชม` (in tooltip/explainer) | `การจราจร` (means road traffic) |
| Conversion | `อัตราการแปลง` | `คอนเวอร์ชัน` (data-jargon contexts) | `การคอนเวิร์ต` |

## Alerts

| English | Primary | Alternate | Never use |
|---|---|---|---|
| Anomalies | `ความผิดปกติ` | — | `อโนมาลี` |
| Stockouts | `สินค้าหมด` | `สต็อกหมด` | `สต็อกเอาท์` |
| Data Freshness | `ความสดใหม่ของข้อมูล` | — | `เดต้าเฟรชเนส` |

## Platforms

Always English. These are brand names.

`Shopee`, `Lazada`, `TikTok Shop`, `Stripe`, `Google`, `Facebook`, `Line`.

Compounds: "Shopee Ads", "Shopee Seller Center", "Lazada Sponsored Solutions" — keep entire phrase in English.

## DataGlass-internal names

| English | Treatment |
|---|---|
| DataGlass | Always English. Never transliterate to `ดาต้ากลาส`. |
| dgfe / dgbe | Never user-facing. If they appear, escape to engineering channels. |

## Banned in DG-Thai

Replace on sight. The "use instead" column reflects the post-2026-05-22 marketing-aligned canon.

| Banned | Why | Use instead |
|---|---|---|
| `แอกชั่น` (for product noun "Decisions") | Old transliteration; reversed in favor of brand-canon English | `Actions` |
| `แอกชั่นการ์ด`, `การ์ดแอกชั่น` (for Decision Cards) | Same as above | `Action Cards` |
| `แอกชั่นโฆษณา` / `แอกชั่นสินค้า` / `แอกชั่นทั้งหมด` | Same as above | `Ad Actions` / `Product Actions` / `All Actions` |
| `แอกชั่นรันอยู่`, `แอกชั่นกำลังรัน`, `แอกชั่นที่ใช้งานอยู่` | Same as above | `Deployed Actions` |
| `การตัดสินใจ` (for product "Decisions") | Too abstract; reserved for verb phrases & Pillar 2 name | `Actions` |
| `รัน` (as Deploy verb / button) | Old translation; reversed | `Deploy` |
| `รันแล้ว` / `รันอยู่` (in product-object context) | Same as above | `Deployed` |
| `ดีพลอย`, `ดีพลอยเมนต์` | Pure transliteration | `Deploy` / `Deployed Actions` |
| `นำไปใช้` (for Deploy verb) | Too flat for action CTA | `Deploy` |
| `เวิร์กสเปซ` | Transliteration | `workspace` |
| `แอป` (when source means "workspace") | Was a localization fix; reversed for brand alignment | `workspace` |
| `การตรวจสุขภาพร้าน` (for DG Diagnostic feature) | Was a localization fix; reversed | `diagnostics` |
| `มุมมองรวม` (for Unified view) | Too abstract; doesn't describe what the user sees | `ภาพรวมสินค้า` |
| `อื่นๆ` (for "Decisions" / "Actions") | Means "other / etc." — meaningless as a feature label | `Actions` |
| `ลิงก์` (when source means Connect) | Was a localization fix; reversed | `เชื่อมต่อ` |

`ลิงก์` (URL/hyperlink sense) is still correct — only the Connect-verb sense was banned.

## Spacing rule (universal)

Any time an English word is embedded in a Thai sentence, put a space before AND after it. Examples:

✅ `ยังไม่มี Actions`
✅ `ตรวจหา Actions ใหม่`
✅ `เลือก Deploy`
✅ `โหมดการ Deploy โฆษณา`
✅ `diagnostics สำหรับ {platform}`
✅ `เข้าสู่ workspace`

❌ `ยังไม่มีActions`
❌ `Actionsใหม่`
❌ `โหมดการDeployโฆษณา`

The `{platform}` / `{shopName}` / `{count}` ICU placeholders count as English for spacing purposes — they need spaces around them in Thai too (which they usually already get from sentence structure).

## Adding new terms

When a new feature ships, add its Thai treatment here **before** the first PR that adds it to `th.json`. The reviewer should reject the PR if the term isn't in this glossary.

Rows to include for a new term:
1. The English term as it appears in `en.json`.
2. The Primary treatment (with reasoning if non-obvious — especially if it diverges from the master "brand-coined nouns stay English" rule).
3. Any alternates with usage context.
4. A "Never use" list if there are candidate translations that would be wrong.
5. If introducing a new English-in-Thai noun, verify it's listed in the marketing canon's always-English vocabulary first.

## Cross-references

- Marketing brand canon (authority for English-vs-Thai treatment of brand nouns): [`thai-ecommerce-translation`](../thai-ecommerce-translation/SKILL.md)
- Tone, structure, anti-patterns, audit recipe: [`dg-th-localization`](../dg-th-localization/SKILL.md)
- DGFE repo structure: [`dgfe`](../dgfe/SKILL.md)
