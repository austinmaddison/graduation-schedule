# DataGlass Marketing Canon — Verbatim EN/TH Reference

This file captures every English→Thai pair already established in the DataGlass marketing site (`dg-marketing/`). **These are canonical.** When translating any DataGlass marketing surface, prefer the pairings here over anything in `glossary.md` — they reflect the brand voice and the editorial choices the team has already shipped.

**Source files (live as of May 2026):**
- `dg-marketing/layers/product/app/data/marketing-home.ts` — landing + pricing + footer + FAQ copy
- `dg-marketing/layers/solutions/app/data/{solutions,pillars,foundations}.ts` — solutions content
- `dg-marketing/layers/integrations/app/data/integrations.ts` — Shopee/Lazada/TikTok Shop
- `dg-marketing/layers/resources/app/data/{how-it-works,glossary,research,blog}.ts`
- `dg-marketing/layers/company/app/data/{team,compare,legal-*}.ts`
- `dg-marketing/layers/base/app/components/AppHeader.vue` — live nav
- `dg-marketing/layers/base/app/components/marketing/MarketingFooter.vue`
- `dg-marketing/layers/pricing/app/pages/pricing.vue`
- `dg-marketing/layers/company/app/pages/company/index.vue`
- `dg-marketing/layers/solutions/app/pages/solutions/{increase-shopee-profit,increase-shopee-sales}.vue`

**Editorial conventions DataGlass uses:**
- Heavy code-switching: Thai sentence with embedded English nouns is the default register
- Brand-able English nouns stay English even in Thai copy: `ROAS`, `True ROAS`, `GMV`, `COGS`, `ACOS`, `SKU`, `Decision Engine`, `Mathematical Optimization`, `Operations Research`, `Robust Optimization`, `Bayesian inference`, `Causal inference`, `Actions`, `Bundle Deal`, `Boost`, `Auto-Boost`, `voucher`, `bid`, `campaign`, `margin`, `optimize`, `deploy`, `Marketplace`, `Shopee`, `Lazada`, `TikTok Shop`, `Pay Day`, `9.9`, `11.11`, `12.12`, `PromptPay`, `DEPA TH`, `PDPA`, `North Stars`, `workspace`, `backfill`, `diagnostics`, `Starter`, `Pro`, `Partner`
- Mixed British/American English spelling exists (`optimisation` in Pillars/Foundations, `optimization` in landing/pricing) — keep whichever the source uses
- Thai prefers natural-sounding sentence flow over literal translation. Brand voice = confident, direct, slightly playful in Thai; never academic or robotic.

> ⚠️ **2026-05 brand update — TWO rules supersede older canon entries below:**
>
> 1. **`การตัดสินใจ` is NOT the translation for "Actions"**. When EN says "decisions" but means the DataGlass queue / product object, TH must use `Actions` (English). Older canon entries pairing "decisions / Decisions" with `การตัดสินใจ` are stale — `Actions` is now used everywhere the product object is meant. `การตัดสินใจ` is reserved for abstract verb phrases (`ในการตัดสินใจว่า...`) and the canonical pillar name `การตัดสินใจอัตโนมัติ` (Pillar 2). Common updates: `คิวการตัดสินใจ` → `คิว Actions`, `การตัดสินใจรายวัน` → `Actions รายวัน`, `จัดอันดับการตัดสินใจ` → `จัดอันดับ Actions`, `ทุกการตัดสินใจ` (in product context) → `ทุก Action`.
>
> 2. **`ROAS ที่แท้จริง` is a wrong calque** — always use **`True ROAS`** (English; a defined brand metric with its own glossary page). ⚠️ This does **not** generalize into a `True ___` rule. `true profit` and `true margin` are ordinary descriptive phrases — translate them (`true profit` → `กำไรสุทธิ`, see §profit table; `true margin` → `margin หลังหักต้นทุน`), never calque as `กำไรที่แท้จริง` / `margin ที่แท้จริง`. Do not write `True Profit` / `True Margin` as English brand metrics — `True ROAS` is the only locked `True ___` term. (The pillar label `True Profit Optimization` is a separate proper-noun section name; its Thai is `เพิ่มกำไรและมาร์จิ้น`, not a calque.)
>
> 3. **`Bundle Deal`, `Boost`, `Auto-Boost` are English brand nouns** — never transliterate. Older canon entries below that pair them with `ดีลบันเดิล` / `บันเดิล` / `บูสต์` / `บูสต์สินค้า` / `บูสต์สินค้าอัตโนมัติ` are stale. Use: `Bundle Deal`, `Boost`, `Auto-Boost`; action forms `สร้าง Bundle Deal`, `Boost สินค้า`, `Auto-Boost สินค้า`.

---

## 1. Hero & top-of-page (landing)

| English | Thai |
|---|---|
| `NEW` (announcement chip) | `ใหม่` |
| Optimize your marketplace profit | เพิ่มกำไรบน Marketplace จากข้อมูล |
| Stop guessing. Start making profitable marketplace decisions. | หยุดเดา แล้วให้ DataGlass ช่วยลงมือ เพิ่มกำไรให้คุณ |
| DataGlass turns Shopee, Lazada, and TikTok Shop data into instantly deployable actions to optimize ads, pricing, promotions, and stock. | DataGlass เปลี่ยนข้อมูลร้านค้าออนไลน์ให้เป็น Actions ที่ช่วย optimize ร้าน Shopee Lazada และ TikTok ของคุณ เช่นปรับยิงโฆษณา ราคา โปรโมชัน เพื่อช่วยเพิ่มกำไร |
| Start free for one month | เริ่มใช้ฟรี 1 เดือน |
| See how it works | ดูวิธีทำงาน |
| No credit card required. First month free. | ไม่ต้องใส่บัตรเครดิต ทดลองใช้ฟรีเดือนแรก |

---

## 2. Site meta (titles, descriptions)

| English | Thai |
|---|---|
| DataGlass \| Profit Optimization for Shopee, Lazada & TikTok Shop | DataGlass \| เพิ่มกำไรบน Shopee, Lazada และ TikTok Shop |
| DataGlass Labs | ดาต้ากลาส (brand alternate) |

---

## 3. Trust bar / Social proof

| English | Thai |
|---|---|
| Trusted by early adopters | ได้รับความไว้วางใจและส่งเสริมจาก |
| Proudly funded by DEPA TH | ได้รับทุนสนับสนุนจาก DEPA TH |
| x10 — Less time spent on manual calculations | x10 — ลดเวลาคำนวณด้วยมือ |

---

## 4. Model Explainer

| English | Thai |
|---|---|
| Proprietary AI/ML models | โมเดล AI/ML ที่ถูกสร้างมาเพิ่มกำไรไม่ใช่ GMV |
| How DataGlass turns shop data into profit actions | DataGlass เปลี่ยนข้อมูลร้านเป็น Actions ที่ช่วยเพิ่มกำไรได้อย่างไร |
| Mathematical Model built specifically for your shop | Mathematical Model ที่ถูกสร้างจากข้อมูลของคุณโดยเฉพาะ |
| The right optimization formulation is the key | หัวใจสำคัญคือการตัดสินใจใช้เทคนิค optimization ที่ถูกต้อง |

---

## 5. Key Features

| English | Thai |
|---|---|
| Key features | Key Features *(kept English)* |
| Agent armed with tools that turn marketplace data into action | Agent และ Tools ที่ช่วยคุณดูแลร้านของคุณและตัดสินใจได้ดีขึ้น |
| Automatically manage deployed actions to increase ROAS, profits, and efficiency. | DataGlass จะแนะนำ Actions เพื่อเพิ่มประสิทธิภาพร้านค้าและนอกจากนั้นยังสามารถทำให้อัตโนมัติเพียงกดรอบเดียว สำหรับการเพิ่ม True ROAS กำไร และประสิทธิภาพการดำเนินงาน |
| Actions / Product / Ads (card groups) | Actions / Product / Ads *(kept English)* |

### Decisions card UI strings

| English | Thai |
|---|---|
| Decisions | การตัดสินใจ |
| Explore profit maximizing decisions | สำรวจการตัดสินใจที่เพิ่มกำไร |
| All Actions | การทำงานทั้งหมด |
| Search the table | ค้นหาในตาราง |
| All Types | ทุกประเภท |
| Recommendation | คำแนะนำ |
| Type | ประเภท |
| Ad Spend | งบโฆษณา |
| Low risk | ความเสี่ยงต่ำ |
| Campaign 109342 | แคมเปญ 109342 |
| Optimal spend: ฿4.8k/day | งบเหมาะสม: ฿4.8k/วัน |
| Spend range | ช่วงงบ |
| ROAS impact | ผลต่อ ROAS |
| Under spend | ต่ำไป |
| Optimal spend | เหมาะสม |
| Overspend | สูงไป |
| Apply spend | ใช้ค่างบนี้ |
| Adjust Ad Spend | ปรับงบโฆษณา |
| Create Bundle Deal | สร้าง Bundle Deal |
| Boost Products | Boost สินค้า |
| Ads (type) | โฆษณา |
| Bundle Deal (type) | Bundle Deal |
| Boost (type) | Boost |

---

## 6. Pillars (North Stars)

| English | Thai |
|---|---|
| Pillars | เสาหลัก |
| DataGlass's North Stars | DataGlass's North Stars *(kept English)* |
| Three promises we hold ourselves to — and the math that makes each one real. Profit-first optimization, decisions that ship in one click, and a risk gate on every action. | สามคำสัญญาที่เรายึดถือ — พร้อมคณิตศาสตร์ที่ทำให้มันเป็นจริง: การเพิ่มกำไรเป็นหลัก, การตัดสินใจที่ส่งขึ้นใช้งานในคลิกเดียว และการควบคุมความเสี่ยงในทุก action |
| See the blogs and research that prove each | ดูบล็อกและงานวิจัยที่พิสูจน์ทุกเสาหลัก |
| View | อ่านต่อ |
| **Pillar 1: True Profit Optimization** | **เพิ่มกำไรและมาร์จิ้น** |
| Margin is the goal, not GMV. | เป้าหมายคือกำไร ไม่ใช่ยอดขาย |
| **Pillar 2: Automated Decision Making** | **การตัดสินใจอัตโนมัติ** |
| From decisions to deployment, not dashboards. | จากการตัดสินใจสู่การลงมือทำ ไม่ใช่แค่แดชบอร์ด |
| **Pillar 3: Risk Management** | **การควบคุมความเสี่ยง** |
| Every action passes the safety bar before it ships. | ทุก action ต้องผ่านด่านความปลอดภัยก่อนปล่อยใช้งาน |

---

## 7. Foundations

| English | Thai |
|---|---|
| Operations research | Operations Research *(kept English)* |
| Risk-aware optimisation | Risk-aware Optimisation *(kept English)* |
| Without selling more or spending more, where does profit come from? | หากไม่เพิ่มยอดและไม่เพิ่มงบ กำไรเพิ่มขึ้นจากไหน? |
| The finance + uncertainty modelling that keeps the optimum honest. | การเงินและการสร้างโมเดลความไม่แน่นอนที่รักษาความซื่อสัตย์ของจุด optimum |

---

## 8. Solutions section (homepage strip)

| English | Thai |
|---|---|
| Solutions | โซลูชัน |
| Four decisions that move the bottom line. | สี่การตัดสินใจที่ขยับกำไรสุทธิ |
| Ad spend, margin, stock, and promotions are where Shopee sellers win or quietly lose. Lazada and TikTok Shop are coming soon. DataGlass turns each into a daily decision queue. | ค่าโฆษณา margin สต็อก และโปรโมชัน คือจุดที่ผู้ขาย Shopee ชนะหรือค่อย ๆ แพ้ ส่วน Lazada และ TikTok Shop กำลังจะตามมา DataGlass เปลี่ยนแต่ละจุดเป็นคิวการตัดสินใจรายวัน |
| See all solutions | ดูทั้งหมด |
| Ads optimization | ปรับโฆษณา |
| Profit margin | เพิ่มอัตรากำไร *(footer: เพิ่มอัตรากำไร / nav: กำไรและ margin)* |
| Inventory & stockout | สต็อกและของขาด *(footer: จัดการสต๊อก)* |
| Pricing & promotions | ราคาและโปรโมชัน *(footer: ราคา & โปรโมชัน)* |

---

## 9. Integrations strip

| English | Thai |
|---|---|
| Integration / Integrations | การเชื่อมต่อ |
| Thai e-commerce platforms | เชื่อมต่อ Shopee, Lazada และ TikTok Shop |
| Shopee is live today. Lazada and TikTok Shop are coming soon. | Shopee พร้อมใช้งานแล้ว ส่วน Lazada และ TikTok Shop กำลังจะตามมา เพื่อรวมข้อมูลร้านไว้ในโมเดลกำไรเดียวกัน |
| Live (status) | พร้อมใช้งาน *(also: ใช้งานได้แล้ว)* |
| Coming soon | เร็ว ๆ นี้ *(also: กำลังจะตามมา)* |

---

## 10. Final CTA

| English | Thai |
|---|---|
| Stop guessing. Start deploying. | หยุดเดา ให้ DataGlass ช่วยเพิ่มกำไร |
| Join the sellers using DataGlass to turn shop data into the next profit-maximizing action. | ใช้ DataGlass เปลี่ยนข้อมูลร้านค้าออนไลน์ให้เป็นคำแนะนำที่เพิ่มกำไรได้จริง สำหรับโฆษณา ราคา โปรโมชัน และสต๊อกสินค้า |
| Get started for free | เริ่มใช้ฟรี |

---

## 11. Header / Navigation

| English | Thai |
|---|---|
| **Product** | **ผลิตภัณฑ์** |
| How it works | วิธีการทำงาน |
| How DataGlass turns marketplace signals into the next move. | DataGlass เปลี่ยนสัญญาณจาก marketplace ให้เป็น next move ได้อย่างไร |
| Features | ฟีเจอร์ |
| Decisions, ads optimization, product calculator, and more. | การตัดสินใจ การปรับโฆษณา เครื่องคำนวณสินค้า และอีกมากมาย |
| Integrations | การเชื่อมต่อ |
| Connect Shopee in minutes. Lazada and TikTok Shop are coming soon. | เชื่อมต่อ Shopee ได้ในไม่กี่นาที ส่วน Lazada และ TikTok Shop กำลังจะตามมา |
| **Solutions** | **โซลูชั่น** |
| Ads optimization | ปรับโฆษณา |
| Profit margin | กำไรและ margin |
| Inventory & stockout | สต็อกและของขาด |
| Pricing & promotions | ราคาและโปรโมชัน |
| **Pricing** | **ราคา** |
| **Resources** | **แหล่งข้อมูล** |
| Research | งานวิจัย |
| Technical reports and market research for e-commerce operators. | รายงานเชิงเทคนิคและงานวิจัยตลาดสำหรับผู้ขายอีคอมเมิร์ซ |
| Blog | บล็อก |
| Notes from the team on Thai e-commerce and the product. | บทความจากทีมเกี่ยวกับอีคอมเมิร์ซไทยและผลิตภัณฑ์ |
| Glossary | อภิธานศัพท์ |
| Plain-English definitions for marketplace and profit terms. | คำอธิบายศัพท์ marketplace และกำไรแบบอ่านง่าย |
| **Company** | **บริษัท** |
| About | เกี่ยวกับเรา |
| Why DataGlass exists, and the principles behind it. | เหตุผลที่ DataGlass เกิดขึ้น และหลักคิดเบื้องหลังผลิตภัณฑ์ |
| Team | ทีม |
| The team building DataGlass, end-to-end. | ทีมที่สร้าง DataGlass ตั้งแต่ต้นจนจบ |
| Contact | ติดต่อ |
| Get in touch — partnerships, support, or to say hi. | คุยเรื่องพาร์ตเนอร์ ซัพพอร์ต หรือแค่ทักทายทีม |
| Sign in | เข้าสู่ระบบ |
| Get started for free | เริ่มใช้ฟรี |
| Open navigation | เปิดเมนูนำทาง |
| Close navigation | ปิดเมนูนำทาง |

---

## 12. Footer

| English | Thai |
|---|---|
| Redefining the paradigm with autonomous e-commerce. | เปลี่ยนข้อมูล Marketplace ให้เป็นการตัดสินใจเพิ่มกำไร |
| **Solutions** column | **โซลูชัน** |
| Ads optimization | ปรับโฆษณา |
| Profit margin | เพิ่มอัตรากำไร |
| Inventory & stockout | จัดการสต๊อก |
| Pricing & promotions | ราคา & โปรโมชัน |
| **Platforms** column | **แพลตฟอร์ม** |
| Shopee integration | Shopee |
| Lazada integration | Lazada |
| TikTok Shop integration | TikTok Shop |
| All integrations | การเชื่อมต่อทั้งหมด |
| **Resources** column | **แหล่งข้อมูล** |
| How it works | วิธีการทำงาน |
| Pricing | ราคา |
| Research | งานวิจัย |
| Blog | บล็อก |
| Glossary | อภิธานศัพท์ |
| Compare | เปรียบเทียบ |
| **Company** column | **บริษัท** |
| About | เกี่ยวกับเรา |
| Privacy | ความเป็นส่วนตัว |
| Terms | เงื่อนไขการใช้งาน |
| © {year} DataGlass. All rights reserved. | © {year} DataGlass สงวนลิขสิทธิ์ |

---

## 13. Pricing page

### Hero

| English | Thai |
|---|---|
| 00 / Pricing | 00 / ราคา |
| Honest pricing for marketplace operators. | ราคาที่ตรงไปตรงมาสำหรับร้านค้าตลาดออนไลน์ |
| Start DataGlass free for one month. Shopee is included today; Lazada and TikTok Shop are coming soon. | เริ่มใช้ DataGlass ได้ฟรี 1 เดือน ตอนนี้ Shopee พร้อมใช้งานแล้ว ส่วน Lazada และ TikTok Shop กำลังจะตามมา |
| Get started for free | เริ่มใช้งานฟรี |
| Compare plans | เปรียบเทียบแพลน |
| Plans · 03 | แพลน · 03 |
| Status · Beta | สถานะ · เบต้า |
| Free trial · 1 month | ทดลองใช้ฟรี · 1 เดือน |
| Lock-in · None | ผูกมัด · ไม่มี |
| Issue · 01 — Beta | รุ่น · 01 — เบต้า |

### Plans block

| English | Thai |
|---|---|
| Pricing | ราคา |
| Start free. Upgrade when orders grow. | ราคาเรียบง่ายสำหรับร้าน Marketplace |
| Start with one month free. Shopee is included today; Lazada and TikTok Shop are coming soon. | เริ่มใช้ฟรี 1 เดือน ตอนนี้รองรับ Shopee แล้ว ส่วน Lazada และ TikTok Shop กำลังจะตามมา |

### Free-tier callout

| English | Thai |
|---|---|
| Free for small shops | ฟรีสำหรับร้านเล็ก |
| Under 50 orders a month? Use everything for free. | เรามาโตไปด้วยกัน! ออเดอร์ต่อเดือนน้อยกว่า 50 ใช้ฟรีทั้งหมด |
| No tier to pick, no card to enter. We auto-detect eligibility from your shop data and let you know the moment it changes. | ไม่ต้องเลือกแพ็กเกจ ไม่ต้องผูกบัตร ระบบจะตรวจสอบสิทธิ์ให้อัตโนมัติจากข้อมูลร้าน และแจ้งเตือนทันทีเมื่อสถานะเปลี่ยน |
| completely free (highlighted span) | ฟรีทั้งหมด |
| Start free — no card needed | เริ่มใช้งานฟรี ไม่ต้องผูกบัตร |

### Plan tiers

#### Starter (฿699/month)

| English | Thai |
|---|---|
| Starter | Starter *(kept English)* |
| ฿699 per month | ฿699 ต่อเดือน |
| Financial breakdowns, ad analysis, and the full tools suite. | ดูโครงสร้างกำไรสินค้า วิเคราะห์ค่าแอด และใช้ชุดเครื่องมือสำหรับคำนวณกำไรสุทธิ |
| Product financial breakdown | วิเคราะห์กำไรสินค้า |
| Product financial simulator | จำลองกำไรสินค้า |
| Product pricing calculator | เครื่องคำนวณราคาขาย |
| Product auto-boost | Auto-Boost สินค้า |
| Ads ROAS breakdown | วิเคราะห์ ROAS โฆษณา |
| Ads true ROAS | True ROAS หลังหักต้นทุน |
| First month free. Cancel anytime. | ใช้ฟรีเดือนแรก ยกเลิกได้ทุกเมื่อ |
| Get started | เริ่มใช้งาน |

#### Pro (฿2,000/month)

| English | Thai |
|---|---|
| Pro | Pro *(kept English)* |
| ฿2,000 per month | ฿2,000 ต่อเดือน |
| Everything in Starter, plus the decision engine that tells you what to do next. | ทุกอย่างใน Starter พร้อมระบบช่วยตัดสินใจที่บอกว่าควรทำอะไรต่อเพื่อเพิ่มกำไร |
| Everything in Starter | ทุกอย่างใน Starter |
| Decision engine | ระบบช่วยตัดสินใจ |
| Product recommendations | คำแนะนำระดับสินค้า |
| Ads recommendations | คำแนะนำด้านโฆษณา |
| Early access to new features | เข้าถึงฟีเจอร์ใหม่ก่อนใคร |

#### Partner (by application)

| English | Thai |
|---|---|
| Partner | Partner *(kept English)* |
| By application | ติดต่อทีม |
| Help shape DataGlass. Get early access to new features and future rewards. | ร่วมออกแบบ DataGlass เข้าถึงฟีเจอร์ใหม่ก่อนใคร และช่วยกำหนด roadmap สำหรับร้าน Marketplace จริง |
| Direct line to the team | คุยกับทีมโดยตรง |
| Shape the product roadmap | ร่วมกำหนดแผนพัฒนาสินค้า |
| Future partner rewards | รางวัลพาร์ตเนอร์ในอนาคต |
| Priority onboarding support | ช่วยเริ่มใช้งานแบบเร่งด่วน |
| Limited seats. We review every application. | จำนวนจำกัด เราพิจารณาทุกใบสมัคร |
| Contact us | ติดต่อเรา |

### "Every plan ships with this" trust strip

| English | Thai |
|---|---|
| Every plan ships with this. | ทุกแพลนได้สิ่งเหล่านี้ |
| No core feature is paywalled. Higher tiers unlock the decision engine, not the basic connectivity. | ไม่มีฟีเจอร์ที่ซ่อนไว้หลังกำแพง แพลนระดับสูงเปิดระบบช่วยตัดสินใจ ไม่ใช่การเชื่อมต่อพื้นฐาน |
| Shopee included today | Shopee พร้อมใช้งาน |
| Multi-shop on every workspace | หลายร้านในบัญชีเดียว |
| Clear terms before billing | เงื่อนไขชัดเจนก่อนเริ่มจ่าย |
| Cancel anytime | ยกเลิกได้ทุกเมื่อ |
| Bilingual product | รองรับสองภาษา |
| Direct line to the team | สายตรงถึงทีม |

### Comparison table groups

| English | Thai |
|---|---|
| Profit & margin | กำไรและ margin |
| Ads | โฆษณา |
| Decision engine | ระบบช่วยตัดสินใจ |
| Operations | การดำเนินงาน |
| Partner | พาร์ทเนอร์ |
| Multi-shop support | รองรับหลายร้าน |

### Billing notes (3 cards)

| English | Thai |
|---|---|
| 01 First month free | 01 เดือนแรกฟรี |
| 02 Clear monthly plans | 02 ราคาต่อเดือนชัดเจน |
| 03 Plan changes follow the terms | 03 เปลี่ยนแพลนตามเงื่อนไข |

---

## 14. Solutions index

| English | Thai |
|---|---|
| Architecture | สถาปัตยกรรม |
| The three pillars you see, the three you don't. | สามแกนที่คุณเห็น สามแกนที่คุณไม่เห็น |
| Pillars | เสาหลักผลิตภัณฑ์ |
| Foundations | รากฐานทางวิทยาศาสตร์ |
| Cited in | อ้างอิงในบล็อก |
| Research | งานวิจัย |
| Deep dive | ลงรายละเอียดในโซลูชัน |
| Key terms | คำสำคัญ |
| Browse functional solutions | ดูโซลูชันเชิงปฏิบัติทั้งหมด |

### Per-solution slugs

| Slug | EN H1 | TH H1 |
|---|---|---|
| ads-optimization | Optimize ad spend on Shopee, Lazada, and TikTok Shop | ลดค่าโฆษณา Shopee และเพิ่ม ROAS จากกำไรสุทธิ |
| profit-margin | E-commerce profit calculator for Shopee sellers | คำนวณกำไรสุทธิ Shopee หลังหักค่าธรรมเนียม |
| inventory-stockout | Prevent stockouts and overstock across Shopee, Lazada, and TikTok Shop | (Thai card label kept as `Inventory & stockout`) |
| pricing-promotions | Price and promote without destroying margin | (TH name: ราคาและโปรโมชัน) |

---

## 15. Static solution pages

### increase-shopee-profit

| English | Thai |
|---|---|
| Increase Profit on Shopee Without Selling More \| DataGlass | เพิ่มกำไรบน Shopee โดยไม่ต้องเพิ่มยอดขาย \| DataGlass |
| Home / Solutions / Get started for free | หน้าแรก / โซลูชัน / เริ่มใช้งานฟรี |
| Read the long-form research | อ่านงานวิจัยฉบับเต็ม |
| A question sellers actually ask | คำถามที่ผู้ขายค้นหา |

### increase-shopee-sales

| English | Thai |
|---|---|
| Increase Sales on Shopee in 2026 \| DataGlass | เพิ่มยอดขายบน Shopee ในปี 2026 \| DataGlass |
| Read the landscape note | อ่านบันทึกภูมิทัศน์ |

---

## 16. Company page

| English | Thai |
|---|---|
| Company (badge) | บริษัท |
| A team of three | ทีมสามคน |
| building the seller's edge. | ที่สร้างความได้เปรียบให้ผู้ขาย |
| Mission | พันธกิจ |
| Why the product exists. | ทำไมผลิตภัณฑ์นี้ถึงมีอยู่ |
| the math that connects ads, pricing, and inventory to **profit** | ...คณิตศาสตร์ที่เชื่อมโฆษณา ราคา และสต็อกเข้ากับ **กำไร** |
| Principles | หลักการ |
| Three rules. Repeated daily. | สามกฎที่เราทวนทุกวัน |
| 01 Democratising data science. | ทำให้วิทยาศาสตร์ข้อมูลเป็นของผู้ขายทุกขนาด |
| 02 No black boxes. | ไม่มีกล่องดำ |
| 03 Make the data speak. | ทำให้ข้อมูลพูดเอง |
| Our team | ทีมของเรา |
| We are a team of three. | เราเป็นทีมสามคน |
| Read full profile | อ่านโปรไฟล์เต็ม |
| Origin | จุดเริ่มต้น |
| Built in Bangkok. | สร้างจากกรุงเทพฯ |
| TH · Bangkok HQ | สำนักงานใหญ่กรุงเทพฯ |
| SEA · First market | ตลาดแรก |
| 2025 · Founded | ก่อตั้ง |
| Contact | ติดต่อ |
| Get in touch. | คุยกับเรา |
| Partnerships, support, or just to say hi — we read every message. | เรื่องพาร์ตเนอร์ ซัพพอร์ต หรือแค่ทักทายทีม เราอ่านทุกข้อความ |

---

## 17. Compare pages

| English | Thai |
|---|---|
| Compare DataGlass vs Spreadsheets, ERP, Seller Center \| DataGlass | เปรียบเทียบ DataGlass กับสเปรดชีต, ERP, Seller Center และเอเจนซี่ \| DataGlass |
| When spreadsheets are enough | (TH inline paraphrase) |
| Where spreadsheets break / Where the ERP falls short | (kept EN structure) |
| Why it breaks at scale | (TH inline paraphrase) |
| How DataGlass differs | (TH inline paraphrase) |

---

## 18. Integrations pages

| English | Thai |
|---|---|
| Integrations | การเชื่อมต่อ |
| Plug DataGlass into the platforms your shop already runs on. | เชื่อม DataGlass เข้ากับ Shopee, Lazada และ TikTok Shop |
| One authorized connection per shop. DataGlass pulls orders, products, ads, vouchers, and stock — and turns them into the next profit-maximizing decision. | เชื่อมต่อหนึ่งครั้งต่อร้าน DataGlass ดึงคำสั่งซื้อ สินค้า โฆษณา voucher และสต็อก แล้วเปลี่ยนข้อมูล Marketplace ให้เป็นการตัดสินใจถัดไปที่ช่วยเพิ่มกำไร |
| See the {platform} integration | ดูการเชื่อมต่อ {platform} |
| Live | ใช้งานได้แล้ว |
| Coming soon | เร็ว ๆ นี้ |

### Use-case labels

| English | Thai |
|---|---|
| Detect wasted ad spend | ตรวจจับค่าโฆษณาที่เสียเปล่า |
| Compare platform ROAS with true ROAS | เปรียบเทียบ ROAS ของแพลตฟอร์มกับ True ROAS |
| Find low-margin SKUs | หาสินค้า margin ต่ำ *(alt: หา SKU ที่ขาดทุน)* |
| Identify stockout risk | ระบุความเสี่ยงสต็อกหมด |
| Evaluate discounts and bundle deals | ประเมินส่วนลดและ Bundle Deal |
| Prioritize actions before campaign days | จัดลำดับ Actions ก่อนวันแคมเปญ |

### Setup steps

| English | Thai |
|---|---|
| Connect your Shopee shop | เชื่อมต่อร้าน Shopee ของคุณ |
| DataGlass imports your marketplace data | DataGlass นำเข้าข้อมูลร้านของคุณ |
| The system runs diagnostics | ระบบรัน diagnostics |
| You receive daily recommended decisions | คุณได้รับการตัดสินใจรายวัน |

---

## 19. How it Works

| English | Thai |
|---|---|
| How DataGlass works — Optimize Shopee ads, pricing, and inventory | DataGlass ทำงานยังไง — เพิ่มประสิทธิภาพโฆษณา ราคา และสต็อก Shopee |
| How it works | วิธีการทำงาน |
| How DataGlass automatically optimizes your Shopee store. | DataGlass ปรับร้าน Shopee ของคุณอัตโนมัติได้อย่างไร |
| Connect once. Decide daily. Deploy in one click. | เชื่อมต่อครั้งเดียว ตัดสินใจรายวัน Deploy ในคลิกเดียว |
| 01 Sign up / 02 Connect your shop / 03 Start deploying | สมัครสมาชิก / เชื่อมต่อร้านของคุณ / เริ่ม deploy |
| A Shopee shop spending ฿10,000 a day on ads. | ร้าน Shopee ที่ใช้ค่าโฆษณา ฿10,000 ต่อวัน |
| ฿8,400 / month — Projected profit recovery, computed against the shop's real economics. | ฿8,400 / เดือน — กำไรที่คาดว่าจะได้คืน คำนวณจากเศรษฐศาสตร์จริงของร้าน |
| Without DataGlass | ไม่มี DataGlass |
| With DataGlass | มี DataGlass |
| Platform / Ingestion / Cleaning / Mathematical modeling / Recommendation / Platform | แพลตฟอร์ม / การ ingest / การทำความสะอาด / โมเดลทางคณิตศาสตร์ / คำแนะนำ / แพลตฟอร์ม |
| Go deeper / By problem / By platform / Read further | ดูต่อ / ตามปัญหา / ตามแพลตฟอร์ม / อ่านเพิ่มเติม |
| See how it works on your store. | ดูว่ามันทำงานยังไงบนร้านของคุณ |
| Connect your shop | เชื่อมต่อร้านของคุณ |

---

## 20. Resources (Glossary, Research, Blog)

### Glossary

| English | Thai |
|---|---|
| Glossary — Marketplace seller terms \| DataGlass | อภิธานศัพท์สำหรับผู้ขาย Marketplace \| DataGlass |
| The terms every marketplace seller eventually has to learn. | คำศัพท์ที่ผู้ขาย Marketplace ต้องรู้ในที่สุด |
| DataGlass Marketplace Glossary | อภิธานศัพท์ Marketplace จาก DataGlass |
| Read | อ่าน |
| True ROAS / ACOS / COGS / Contribution margin | (kept EN) |
| Marketplace fees | ค่าธรรมเนียมตลาด *(alt inline: ค่าธรรมเนียมแพลตฟอร์ม)* |
| Stockout | Stockout *(kept EN)* |
| Ad waste | ค่าโฆษณาเสียเปล่า |

### Research

| English | Thai |
|---|---|
| Research — DataGlass | งานวิจัย — DataGlass |
| DG · Research Lab | DG · ห้องวิจัย |
| Research for the seller floor. | งานวิจัยสำหรับผู้ขายของจริง |
| Lab · 2026 | ห้องวิจัย · 2026 |
| Reports | รายงาน |
| Latest | ล่าสุด |
| Cadence | จังหวะเผยแพร่ |
| On publish | เมื่อมีรายงานใหม่ |
| Editor | บรรณาธิการ |
| Available reports. | รายงานที่เผยแพร่แล้ว |
| Read the report | อ่านรายงาน |

---

## 21. Legal pages

| English | Thai |
|---|---|
| Privacy Policy | นโยบายความเป็นส่วนตัว *(footer link: ความเป็นส่วนตัว)* |
| Terms of Service | เงื่อนไขการใช้งาน |
| Home / Privacy Policy | หน้าแรก / นโยบายความเป็นส่วนตัว |
| Home / Terms of Service | หน้าแรก / เงื่อนไขการใช้งาน |

**Note:** Full legal text is English-only with a Thai-locale banner stating English controls per Terms §22.8.

---

## 22. CTAs across the site (canonical list)

| English | Thai |
|---|---|
| Start free for one month | เริ่มใช้ฟรี 1 เดือน |
| Get started for free | เริ่มใช้ฟรี *(also: เริ่มใช้งานฟรี)* |
| Get started | เริ่มใช้งาน |
| Start free — no card needed | เริ่มใช้งานฟรี ไม่ต้องผูกบัตร |
| See how it works | ดูวิธีทำงาน |
| Sign in | เข้าสู่ระบบ |
| Contact us | ติดต่อเรา |
| Compare plans | เปรียบเทียบแพลน |
| Read full profile | อ่านโปรไฟล์เต็ม |
| Read the long-form research | อ่านงานวิจัยฉบับเต็ม |
| Read the landscape note | อ่านบันทึกภูมิทัศน์ |
| Read the report | อ่านรายงาน |
| Read | อ่าน |
| View | อ่านต่อ |
| See all solutions | ดูทั้งหมด |
| Browse functional solutions | ดูโซลูชันเชิงปฏิบัติทั้งหมด |
| See the blogs and research that prove each | ดูบล็อกและงานวิจัยที่พิสูจน์ทุกเสาหลัก |
| See the steps | ดูขั้นตอน |
| Connect your shop | เชื่อมต่อร้านของคุณ |
| See pricing | ดูราคา |
| See the {platform} integration | ดูการเชื่อมต่อ {platform} |

---

## 23. Domain vocabulary kept English in Thai copy

These are technical and brand-loaded terms DataGlass deliberately keeps in English even in Thai surfaces. **Do not translate.**

**Financial / metrics:** ROAS, True ROAS, GMV, COGS, ACOS, SKU, margin, contribution margin, break-even ROAS, break-even ACOS, ad spend, attributed revenue, lift

**Optimization / methods:** Mathematical Optimization, Robust Optimization, Robust Optimisation, Operations Research, Bayesian inference, Causal inference, Price elasticity, latent factors, CVaR-95, deploy, diagnostics, backfill

**Product / commerce:** Marketplace, Bundle Deal, Boost, Auto-Boost, voucher, bid, campaign, event, live, keyword, Pay Day, 9.9, 11.11, 12.12, PromptPay, Actions, Decision Engine, North Stars, workspace, multi-shop, roadmap, pre-flight, audit log

**Brand names (always English):** Shopee, Lazada, TikTok Shop, LINE OA, LINE SHOPPING, Facebook, Instagram, WhatsApp, Stripe, depa, DEPA TH, DataGlass, DataGlass Labs

**Acronyms (always English):** SaaS, ERP, OMS, WMS, CRM, API, AI, ML, KPI, PDPA, B2B, B2C, MVP, NPS

**Plan names:** Starter, Pro, Partner

---

## 24. Domain vocabulary translated to Thai

These DataGlass *does* translate. Use the Thai form.

| English | Thai (DataGlass canonical) |
|---|---|
| profit | กำไร |
| true profit (formal / calculator) | กำไรสุทธิ |
| true profit (as proof, attach to verb) | เพิ่มกำไรได้จริง |
| net profit | กำไรสุทธิ |
| ⚠️ avoid as standalone noun: กำไรจริง | Awkward calque — use กำไรสุทธิ or rephrase to verb form (ได้จริง) |
| sales / revenue | ยอดขาย |
| stock / inventory | สต็อก *(also: สต๊อก)* |
| stockout (in copy) | สต็อกหมด / ของขาด / ความเสี่ยงสต็อกหมด |
| ad waste | ค่าโฆษณาเสียเปล่า |
| ad spend (general) | ค่าโฆษณา *(UI label "Ad Spend": งบโฆษณา)* |
| recommendation | คำแนะนำ |
| decision | การตัดสินใจ |
| optimize (verb in narrative) | ปรับ / เพิ่ม / optimize *(verb form often kept EN in mixed sentences)* |
| optimize ads | ปรับโฆษณา |
| decision making | การตัดสินใจ |
| risk management | การควบคุมความเสี่ยง |
| automate (action) | ทำให้อัตโนมัติ |
| safety / guardrail | ความปลอดภัย / ด่านความปลอดภัย |
| black box | กล่องดำ |
| connect / integration | เชื่อมต่อ / การเชื่อมต่อ |
| dashboard | แดชบอร์ด |
| customer | ลูกค้า |
| seller (general) | ผู้ขาย |
| marketplace seller | ผู้ขายตลาดออนไลน์ *(also: ผู้ขาย marketplace)* |
| platform | แพลตฟอร์ม |
| shop | ร้าน / ร้านค้า |

---

## 25. Conventions for new copy

When writing new DataGlass marketing copy in Thai:

1. **Default voice:** Confident, direct, slightly playful. Not academic. Not condescending. Not over-formal.
2. **Code-switching is correct.** A Thai sentence with embedded English technical terms (ROAS, margin, deploy, voucher, bid, campaign) reads as native and expert.
3. **Avoid pure-Thai overcorrection.** Don't translate technical terms that the team has chosen to keep in English. "Robust optimization" stays "Robust optimization" in Thai copy.
4. **Use ปรับ for "optimize"** in seller-facing copy (ปรับโฆษณา, ปรับราคา) — punchier than "เพิ่มประสิทธิภาพ" while still landing the same meaning.
5. **Use เพิ่มกำไร, ไม่ใช่ GMV** as a rhetorical move. This is a brand-positioning phrase that opposes the team's optimization target with the industry default.
6. **Keep brand names exactly as the team writes them.** `DataGlass` (not ดาต้ากลาส except in JSON-LD `alternateName`), `Shopee` (not ช้อปปี้), `Lazada`, `TikTok Shop`.
7. **Numbers, prices, dates use Arabic numerals.** `฿699 ต่อเดือน`, `1 เดือน`, `50 ออเดอร์`, `9.9`, `11.11`.
8. **`เร็ว ๆ นี้`** (note the space — Thai-canonical) for "coming soon."
9. **Don't translate URLs, slugs, or anchor IDs.** `/sign-up`, `#how` stay as-is.
10. **British/American spelling is inconsistent in source.** Don't normalize — preserve what each file uses.
