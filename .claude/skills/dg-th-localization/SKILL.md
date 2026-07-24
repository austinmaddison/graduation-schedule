---
name: dg-th-localization
description: Principles for natural Thai localization in DGFE — how to write Thai strings that sound like a native Thai SaaS app instead of a direct translation. Use when editing `*/i18n/locales/th.json`, when adding Thai-facing copy to a `.vue` template, when auditing existing Thai strings for over-translation, or when the user mentions "localize", "translate to Thai", "thai copy", "i18n", or "th.json". Pair with `dg-th-glossary` for canonical term lookups.
---

# dg-th-localization

The DataGlass app currently has ~2,500 Thai strings, many of which are direct English-to-Thai translations rather than localizations. This skill is the judgment layer for **how to write natural Thai**: tone, structure, anti-patterns, register. For canonical translations of **DataGlass product terminology** (Decisions, Decision Cards, Unified view, Workspace, etc.), defer to [`dg-th-glossary`](../dg-th-glossary/SKILL.md) — that skill only covers our coined / product-specific terms, not generic SaaS vocabulary.

## When this skill applies

- Editing or adding strings in `dg-app/i18n/locales/th.json` (and any future `dg-marketing/`, `dg-auth/` locale files).
- Adding Thai copy directly in `.vue` templates (rare — should always go through i18n keys).
- Auditing existing translations for naturalness.

When the user asks for a Thai translation, **never** just translate word-for-word from English. Apply the principles below.

## The golden rule

**Localize, don't translate.** Read the English string, understand what it's trying to communicate to the user in that exact UI context (button? validation error? success toast? marketing headline?), then write the Thai a Thai PM would write from scratch for the same context. The English is a brief, not a source.

If the natural Thai phrasing is shorter, longer, or restructured — that's correct. If it omits a word that's in the English, that's correct. If it adds a classifier or a tone particle the English doesn't have, that's correct.

## Tone & register

DGFE is a **professional B2B SaaS for marketplace sellers**. Default to **formal-modern Thai** — what Shopee Seller Center, Lazada Seller Center, SCB Easy, and KBank Biz use. Not government-formal, not chat-app casual.

Concrete rules:

- **No ครับ / ค่ะ particles** on UI strings (buttons, labels, headers, validation errors). They make UI feel like a chatbot. Exception: a deliberately conversational empty-state line, in-app coach mark, or AI assistant message may use them — but only with the user's explicit intent.
- **Default to formal Thai for primary actions** when there's a real choice: `เข้าสู่ระบบ` over `ล็อกอิน`, `ออกจากระบบ` over `ล็อกเอาท์`, `บันทึก` over `เซฟ`.
- **But use loanwords where Thais actually use them.** `อีเมล`, `สต็อก`, `ลิงก์`, `แดชบอร์ด`, `ดาวน์โหลด`, `อัปโหลด`, `แคมเปญ`, `คลิก`, `ไฟล์`, `เซิร์ฟเวอร์`. Forcing a Thai equivalent (`สารบบ` for "directory", `แผงควบคุม` for "dashboard") sounds bureaucratic.
- **Drop pronouns by default.** English "your" rarely needs `ของคุณ`. "Your orders" is just `ออเดอร์` or `ออเดอร์ทั้งหมด` in context — `ออเดอร์ของคุณ` is translation residue.

If unsure of register on a specific term, check [`dg-th-glossary`](../dg-th-glossary/SKILL.md).

## The 6 anti-patterns

These are the recurring over-translations in `th.json` today. When auditing or writing new strings, scan for these.

### 1. Overused `กรุณา`

`กรุณา` means "please" but is heavier than English "please" — it's closer to "kindly". Thai apps reserve it for genuinely instructional/polite contexts. **Validation errors and system status messages do not take `กรุณา`.**

```
❌ "กรุณากรอกอีเมลให้ถูกต้อง"          (validation error, currently in th.json:61)
✅ "รูปแบบอีเมลไม่ถูกต้อง"
   or "อีเมลไม่ถูกต้อง"

❌ "ยังต้องลิงก์ Shopee Ads กรุณาลิงก์ข้อมูลโฆษณา..."   (alert/status, th.json:414)
✅ "ยังไม่ได้ลิงก์ Shopee Ads ลิงก์ข้อมูลโฆษณา..."
```

When `กรุณา` *is* appropriate: form-completion instructions in onboarding, customer-facing emails, paid-failure messages where you're asking the user to do a corrective action.

```
✅ "โปรดอัปเดตข้อมูลบัตรบน Stripe เพื่อให้การสมัครสมาชิกใช้งานได้ต่อ"   (payment failure, th.json:2301)
```

Prefer `โปรด` over `กรุณา` for formal-but-not-pleading politeness. Use neither when the message is purely informational.

### 2. Unnecessary `ของคุณ`

English forces "your" on possessables; Thai doesn't. Drop `ของคุณ` unless the possessor is ambiguous (e.g. distinguishing "your shop" vs "another seller's shop" in the same screen).

```
❌ "ตรวจสอบอีเมลของคุณ"             (th.json:77)
✅ "ตรวจสอบอีเมล"

❌ "กรอกอีเมลของคุณ"                 (placeholder, th.json:82)
✅ "อีเมล"                            (placeholders should be noun-only)

❌ "กรอกรหัสผ่านใหม่ของคุณด้านล่าง"   (th.json:89)
✅ "กรอกรหัสผ่านใหม่"                 (also drop ด้านล่าง — Thai UX doesn't direct the eye that way)
```

Keep `ของคุณ` when it's load-bearing — e.g. "Your role: Admin" (`สิทธิ์ของคุณ: ผู้ดูแล`) where dropping it would be confusing.

### 3. Literal `กรอก` / `ป้อน` in placeholders

English placeholders often use "Enter your X" or "Type X". Thai placeholders are almost always **just the noun** — that's the convention across Thai apps.

```
❌ "กรอกอีเมลของคุณ"            (placeholder)
✅ "อีเมล"

❌ "ป้อนรหัสผ่าน"               (placeholder)
✅ "รหัสผ่าน"

❌ "กรอกชื่อสินค้า"             (placeholder)
✅ "ชื่อสินค้า"
```

For **instructions** (above-the-field hint text, not the placeholder itself), `กรอก` is fine: `"กรอกอีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่าน"`.

### 4. English word order leaking through

Thai modifiers come **after** the noun, not before. Adjectives, possessives, relative clauses, and "new"/"active"/"pending" descriptors all attach behind.

```
❌ "ใหม่ออเดอร์"                 (literal "new order")
✅ "ออเดอร์ใหม่"

❌ "ทั้งหมดสินค้า"               (literal "all products")
✅ "สินค้าทั้งหมด"

❌ "กำลังดำเนินการออเดอร์"        (literal "active orders")
✅ "ออเดอร์ที่กำลังดำเนินการ"
```

Same with adverbial time phrases — they go **at the end**, not the front:

```
❌ "เมื่อ 5 นาทีที่แล้ว อัปเดต"
✅ "อัปเดตเมื่อ 5 นาทีที่แล้ว"
```

### 5. Over-formal nouns

Some Thai nouns sound bureaucratic in a SaaS context even when they're "correct" translations. Prefer the everyday register.

```
❌ ผลิตภัณฑ์ (when referring to a marketplace SKU)
✅ สินค้า

❌ การชำระเงิน (in body copy where เงิน, จ่ายเงิน, ชำระ work)
✅ context-dependent — use the verb form when describing an action

❌ ดำเนินการ (in casual contexts where ทำ works)
✅ context-dependent
```

**Exception**: when "product" refers to *DataGlass itself* as a software product (e.g. marketing copy: "shape our product roadmap"), `ผลิตภัณฑ์` is correct because that's the meaning. Context decides — `สินค้า` is for marketplace items, `ผลิตภัณฑ์` is for "the product we sell".

See [`dg-th-glossary`](../dg-th-glossary/SKILL.md) for the canonical decision on every recurring term.

### 6. Forced Thai for tech terms

Don't translate terms Thais themselves use in English. There's a list in [`dg-th-glossary`](../dg-th-glossary/SKILL.md#deliberate-loanwords) — when in doubt, check Shopee/Lazada Seller Center for the same UI element.

```
❌ "แผงควบคุม"                    (for "Dashboard")
✅ "แดชบอร์ด"  or just keep "Dashboard" in English in the UI

❌ "รหัสสินค้าคงคลังที่จัดเก็บ"      (for "SKU")
✅ "SKU"
```

## Sentence structure rules

Beyond the anti-patterns, three structural facts shape every translation:

1. **No plurals.** Thai doesn't pluralize nouns. "3 products" is `สินค้า 3 รายการ` (with a classifier), never `สินค้าทั้งหลาย 3 ตัว`. Don't try to convey plural through repetition or `ๆ` in UI strings.
2. **Classifiers are required for counts.** When showing "5 orders" or "12 shops", use the right classifier: `ออเดอร์ 5 รายการ`, `ร้าน 12 ร้าน` (or `12 ร้านค้า`). The glossary lists the classifier for each domain noun.
3. **No articles.** Drop "the" / "a" / "an" entirely. "The order has shipped" → `จัดส่งออเดอร์แล้ว` or `ออเดอร์ถูกจัดส่งแล้ว`.

## Length & UI

- **Buttons**: Thai is often *shorter* than English (`บันทึก` is 1 syllable vs "Save"). Watch for buttons that feel underweight visually — sometimes adding context (`บันทึกการเปลี่ยนแปลง` for "Save changes") helps balance.
- **Sentences / toasts / errors**: Thai often runs *longer* than English. If you write a Thai string for a fixed-width toast or table cell, eyeball the rendered length — characters are wider in Thai fonts and wrap differently.
- **No line breaks inside words.** Thai has no spaces between words. If a string is going into a cramped container, break it at phrase boundaries with explicit spaces only where Thai readers naturally pause.

## Never translate

- **Brand names**: Shopee, Lazada, TikTok Shop, Stripe, Google, DataGlass — always English.
- **DataGlass feature names**: defer to [`dg-th-glossary`](../dg-th-glossary/SKILL.md). Some get Thai treatment (Decisions → `แอกชั่น`), some stay English (DataGlass, the AI brand) — the glossary is the source of truth.
- **ID codes, SKUs, order numbers, currency codes** (USD, THB).
- **Calendar**: always Gregorian in UI. Buddhist calendar (B.E. years) only if explicitly requested for a Thai-government-facing export.
- **Currency formatting**: `฿1,234.56` (symbol before, comma thousand separator, period decimal). Don't write `1,234.56 บาท` unless the surrounding sentence is conversational.

## Audit recipe

To find suspicious strings in an existing locale file, grep for the telltale patterns:

```bash
# Over-translation tells
grep -n "กรุณา"        dg-app/i18n/locales/th.json    # often droppable
grep -n "ของคุณ"        dg-app/i18n/locales/th.json    # rarely needed
grep -n "ป้อน\|กรอก"    dg-app/i18n/locales/th.json    # check placeholders
grep -n "ผลิตภัณฑ์"     dg-app/i18n/locales/th.json    # often should be สินค้า
grep -n "ป๊อปอัพ\|ป๊อปอัป" dg-app/i18n/locales/th.json   # use "หน้าต่าง" or rephrase
grep -n "วาเรียนต์"     dg-app/i18n/locales/th.json    # use ตัวเลือกสินค้า

# Banned literal translations
grep -nE "(แผงควบคุม|รหัสสินค้าคงคลัง|ตัวประมวลผล)" dg-app/i18n/locales/th.json
```

Each hit is a candidate, not a guaranteed fix — review in context against this skill and the glossary.

## Workflow

1. **Locate the file**: today, only `dg-app/i18n/locales/th.json` exists. When `dg-marketing/` / `dg-auth/` add their own locale files, the same rules apply.
2. **Read the English first** (`en.json` parallel key). Understand the UI context — is this a button? A toast? A marketing headline? An empty state?
3. **Write the Thai from intent, not from words.** Refer to the glossary for any commerce/auth/billing/ads term that recurs.
4. **Cross-check with [`dg-th-glossary`](../dg-th-glossary/SKILL.md)** for any term that has a canonical entry.
5. **Don't introduce new DataGlass terminology** without locking it in [`dg-th-glossary`](../dg-th-glossary/SKILL.md) first. If you're shipping a new feature surface (a new sidebar item, a new coined noun like "Boost" or "Unified X"), propose the glossary entry alongside the PR. Generic Thai vocab doesn't need glossary entries — apply this skill's principles directly.

## Cross-references

- Canonical term table: [`dg-th-glossary`](../dg-th-glossary/SKILL.md)
- DGFE monorepo structure: [`dgfe`](../dgfe/SKILL.md)
- Marketing layer architecture: [`dgfe-marketing-layers`](../dgfe-marketing-layers/SKILL.md)
