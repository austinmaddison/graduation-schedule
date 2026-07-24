# PRD — Graduation Invite Landing Page

**Status:** Approved for build (planning complete)
**Owner:** Austin
**Last updated:** 2026-07-25

---

## 1. Summary

Rebuild the graduation invite as a single, bilingual (EN/TH) landing page in the
Nuxt UI Pro portfolio design language. The real content already exists in the
**legacy prototype** (`pages/legacy.vue` + `assets/css/legacy.css`); this project
ports that content into the new template's components and design system, using
Nuxt UI components wherever possible, then deletes the legacy page.

## 2. Goal & non-goals

**Goal:** One polished, localized, mobile-friendly invite page that lets guests
(family and friends) understand the two possible graduation days, decide where to
stay, see nearby dinner options, view the guest list, and read FAQs.

**Non-goals:**
- No RSVP / reply flow (guest reply statuses were intentionally removed earlier).
- No booking or payment.
- No blog / testimonials / work-experience / about sections (template leftovers — removed).

## 3. Current state (two overlapping systems)

| System | Files | Drives | i18n | Notes |
|---|---|---|---|---|
| **New template** | `pages/index.vue`, `components/landing/*`, `content/index.yml` (collection `index`) | Current homepage | English only (Emma Thompson placeholder) | Design target. Has real grad title, placeholder About/Experience/Testimonials/Blog/FAQ. |
| **Legacy prototype** | `pages/legacy.vue`, `assets/css/legacy.css`, collections `schedule_en`/`schedule_th` (`content/en/index.yml`, `content/th/index.yml`) | `/legacy`, `/family`, `/friends` | Fully bilingual | Real content: plans (A/B), guests (family+friends), hotels, restaurants map. Custom CSS. |

Existing reusable pieces:
- `components/HotelMap.client.vue` — MapLibre map (keep).
- `components/RestaurantMap.client.vue` — MapLibre map, single campus pin (keep; currently renders no restaurant list).
- `components/UniversityLocationCard.client.vue` — campus location card (reusable in hero/plans).
- `components/PolaroidItem.vue`, `AppHeader.vue`, `AppFooter.vue`, `ColorModeButton.vue`.
- i18n: `i18n/locales/en.json`, `i18n/locales/th.json` — already contain plans/guest-role/hotel/restaurant UI strings, fully translated.

## 4. Approved decisions (from grill session)

1. **Content model:** One combined page doc **per locale**. Expand `content/en/index.yml`
   and `content/th/index.yml` into the single source of truth holding `hero`, `plans`,
   `hotels`, `restaurants`, `guests` (`family`/`friends`), and `faq`. Merge the old
   `index` collection schema + `scheduleSchema` into one localized page schema in
   `content.config.ts`. Retire the English-only `index` collection + `content/index.yml`.
2. **Hero:** Keep the current hero as-is (live "months to graduation" countdown badge +
   two-row shuffled photo marquee). Avatar currently uses the template placeholder;
   swapping it to Austin's photo is a **separate later polish, out of scope here**.
3. **Plans (A/B):** Side-by-side compare cards (`UPageCard`), stacking on mobile. Each card:
   letter badge, title, date, `UBadge` tone, pros/cons lists with check/minus `UIcon`,
   and a schedule timeline. Use `UTimeline` if present in the installed Nuxt UI v4;
   otherwise a styled ordered list matching legacy. Google Maps link on Mahidol locations.
4. **Hotels:** MapLibre `HotelMap` **+** a Nuxt UI card grid (`UPageCard`/`UPageGrid`) of
   the 10 hotels, each with name, image, and "Open in Google Maps" link.
5. **Restaurants:** Map + "dinner spot TBD, chosen closer to the date" note **+** a small
   Nuxt UI card grid of nearby suggestion spots (seed the 6 places already referenced by
   i18n keys), each linking to Google Maps. Marked as suggestions, not committed.
6. **Guests:** Family list on the main page. Playful notes ("Wine Aunt", "Mom 2",
   "Cool Uncle") stay **English-only in both locales** (roles still localize). Present as
   an avatar card grid.
7. **FAQ:** Seed common questions. Two are real (see §8); the rest are TBD placeholders.
8. **Header:** Sticky. Title/name + anchor nav (Plans, Hotels, Restaurants, Family, FAQ)
   that smooth-scrolls to sections + EN/TH toggle + light/dark button. Mobile collapses to a menu.
9. **Theme:** Keep `primary: blue`. Plan A keeps its `success` (green) tone accent.
10. **Routes:** `/friends` kept but **rebuilt in the new design**, reusing the same guest-list
    component as the family section. Delete `/legacy` route, `pages/legacy.vue`, and
    `assets/css/legacy.css` once nothing references them.

**Assumptions (low-risk defaults, adjust if wrong):**
- Footer replaces the Nuxt UI credits/social links with a minimal graduation footer
  (name · "Mahidol University · October 2026" · language toggle).
- Countdown anchor date stays `2026-10-01` (dates aren't final; kept as current hero).
- SEO/OG image updated to graduation context (currently points at a Nuxt template PNG).
- Guest presentation = `UUser` / avatar card grid; hotels/restaurants = `UPageCard` grid.

## 5. Page structure (final order)

```
Header (sticky: title · Plans Hotels Restaurants Family FAQ · EN/TH · light/dark)
Hero            (keep current: avatar, title, description, countdown, 2-row marquee)
Plans           (Plan A rehearsal | Plan B ceremony — side-by-side compare cards)
Hotels          (MapLibre map + card grid, 10 hotels)
Restaurants     (map + TBD note + suggestion card grid)
Family          (guest avatar card grid, 19 people, roles localized, EN notes)
FAQ             (UTabs/UAccordion — degree + dates real, rest TBD)
Footer          (minimal graduation footer)

/friends        (separate route, same guest-list component, friends data)
```

## 6. Data model

Single localized page doc per language. Sketch (`content/en/index.yml`, mirrored in `th`):

```yaml
title: ...
description: ...
seo: { title, description }
hero:
  # existing marquee photos are static in Hero.vue; keep or move here (optional)
plans:
  - id: rehearsal
    letter: A
    title: ...
    date: ...
    tone: success        # success | contrast
    badge: ...
    pros: [...]
    cons: [...]
    rows: [{ time, activity, location, notes }]
  - id: ceremony
    letter: B
    ...
hotels:
  - id, name, mapsUrl, coordinates: [lng, lat], image
restaurants:
  note: ...
  suggestions:
    - id, name, area, mapsUrl, coordinates, image?
guests:
  family:
    - name, role (i18n key), note?, image
  friends:
    - name, role, image?
faq:
  title, description
  categories:
    - title
      questions: [{ label, content }]
```

`content.config.ts`: replace `scheduleSchema` + `index` schema with one `pageSchema`
covering all sections; register as the per-locale collections (keep `schedule_en`/`th`
names or rename to `content_en`/`th` — implementer's choice, update queries to match).
Hotel/restaurant/guest names may stay identical across locales (proper nouns); only
role keys and section chrome localize.

## 7. i18n plan

- Reuse existing `en.json` / `th.json` UI strings (plans, pros/cons, guest roles, hotels,
  restaurants chrome) — already fully translated.
- Plans content already bilingual in `content/en|th/index.yml`.
- **New Thai needed:** the two real FAQ answers (drafts in §8), any new section chrome not
  already in the JSON, and hero/nav labels for the anchor menu.
- Guest notes: English in both locales (decided). Guest roles: localized via `guestRoles.*`.
- Keep `@nuxtjs/i18n` strategy `prefix_except_default` (en default, `/th` prefix).

## 8. FAQ content

**Real (approved wording, Thai drafts need Austin's sign-off):**

- **Q (EN):** What degree are you graduating from?
  **A (EN):** Computer Science.
  **Q (TH):** คุณจบปริญญาสาขาอะไร?
  **A (TH):** วิทยาการคอมพิวเตอร์ (Computer Science)

- **Q (EN):** Do you know the final dates yet?
  **A (EN):** Not yet. The final dates and times aren't out because the other university
  programs haven't closed registration for the graduation ceremony yet. Once Mahidol
  confirms, this page will be updated.
  **Q (TH):** ทราบวันและเวลาที่แน่นอนหรือยัง?
  **A (TH):** ยังไม่ทราบครับ วันและเวลาที่แน่นอนยังไม่ประกาศ เนื่องจากหลักสูตรอื่น ๆ
  ของมหาวิทยาลัยยังปิดรับลงทะเบียนเข้าร่วมพิธีไม่เสร็จ เมื่อมหาวิทยาลัยยืนยันแล้ว หน้านี้จะอัปเดต

**Seeded placeholders (TBD — Austin fills):** dress code, RSVP / who to tell, travel &
parking, gifts, bringing kids. Each gets an EN + TH placeholder answer marked "TBD".

## 9. Components

**Build (new, Nuxt UI-based):**
- `LandingPlans.vue` — side-by-side plan compare cards.
- `LandingHotels.vue` — `HotelMap` + hotel card grid.
- `LandingRestaurants.vue` — `RestaurantMap` + note + suggestion card grid.
- `LandingGuests.vue` — guest avatar card grid; prop `:guests`, reused by family section and `/friends`.
- `LandingFAQ.vue` — reuse/adapt existing `components/landing/FAQ.vue` (already `UTabs`+`UAccordion`).

**Reuse:** `Hero.vue` (as-is), `HotelMap.client.vue`, `RestaurantMap.client.vue`,
`UniversityLocationCard.client.vue`, `AppHeader.vue`, `AppFooter.vue`, `ColorModeButton.vue`.

**Delete (after port):** `pages/legacy.vue`, `assets/css/legacy.css`, old `index`
collection + `content/index.yml`, and the template-only `components/landing/About.vue`,
`WorkExperience.vue`, `Testimonials.vue`, `Blog.vue` (+ their content) if unused.

**Edit:** `pages/index.vue` (compose new sections, query per-locale collection),
`pages/family.vue` (use new guest component), `pages/friends.vue` (rebuild in new design),
`content.config.ts` (unified schema), `app.config.ts` (footer, keep blue).

## 10. Acceptance criteria

- [ ] Homepage renders sections in order: Hero → Plans → Hotels → Restaurants → Family → FAQ.
- [ ] Everything localized: `/` (EN) and `/th` (TH) both complete, no placeholder Emma text.
- [ ] Plans A & B show side by side (desktop), stacked (mobile), with pros/cons + timeline.
- [ ] Hotels: map + 10 hotel cards with working Google Maps links.
- [ ] Restaurants: map + TBD note + suggestion cards.
- [ ] Family: 19 guests, avatar grid, localized roles, English notes.
- [ ] FAQ: two real Q&As (both locales) + seeded TBD questions.
- [ ] Sticky header with working anchor nav + EN/TH toggle + light/dark.
- [ ] `/friends` works in the new design; `/legacy` + `legacy.css` deleted; no dead imports.
- [ ] Nuxt UI components used throughout; no leftover legacy CSS classes.
- [ ] `pnpm run build` (github-pages preset) succeeds; static generate works.

## 11. Open items

- Thai FAQ wording — needs Austin's approval.
- Real hero avatar photo (separate polish).
- Restaurant suggestion list — confirm the 6 seed spots are the intended ones.
- Whether to keep the marquee photos static in `Hero.vue` or move to content.
