# Next-session prompt — build the graduation landing page

Paste the block below into a fresh Claude Code session in this repo to implement the
plan. Full spec: `docs/PRD-graduation-landing.md`.

---

Implement the graduation invite landing page per `docs/PRD-graduation-landing.md`.
Read that PRD first — it has the approved decisions, data model, and acceptance criteria.
Also read `pages/legacy.vue`, `assets/css/legacy.css`, `content/en/index.yml`,
`content/th/index.yml`, `i18n/locales/en.json`, `i18n/locales/th.json`, and
`components/landing/*` before writing code, so you port real content instead of inventing it.

**Goal:** Port the legacy prototype's content into the Nuxt UI Pro template design language,
bilingual EN/TH, Nuxt UI components wherever possible. Then delete the legacy page.

**Homepage section order (after the existing hero):** Plans → Hotels → Restaurants →
Family → FAQ.

**Do NOT touch the hero** — `components/landing/Hero.vue` stays as-is (countdown + 2-row
marquee already set this session). Avatar swap is out of scope.

**Build order:**
1. **Content model.** Merge everything into one localized page doc per locale
   (`content/en/index.yml` + `content/th/index.yml`): `hero`, `plans`, `hotels`,
   `restaurants`, `guests.{family,friends}`, `faq`. Update `content.config.ts` to one
   unified `pageSchema` (merge the old `index` schema + `scheduleSchema`). Retire the
   English-only `index` collection and `content/index.yml`. Migrate the real hotel/guest
   arrays out of `pages/legacy.vue` into the content files.
2. **Sections (Nuxt UI first):**
   - `LandingPlans.vue` — Plan A / Plan B side-by-side `UPageCard` compare (stack on mobile):
     letter badge, title, date, `UBadge` tone, pros/cons with check/minus `UIcon`, schedule
     timeline (`UTimeline` if available in the installed Nuxt UI v4, else styled list),
     Google Maps link on Mahidol locations.
   - `LandingHotels.vue` — reuse `HotelMap.client.vue` + a `UPageCard` grid of the 10 hotels
     (name, image, Google Maps link).
   - `LandingRestaurants.vue` — reuse `RestaurantMap.client.vue` + "dinner TBD" note +
     suggestion card grid (seed the 6 spots referenced by `restaurants.locations.*` i18n keys).
   - `LandingGuests.vue` — avatar card grid, prop `:guests`; reused by the family section and `/friends`.
   - FAQ — adapt existing `components/landing/FAQ.vue` (`UTabs` + `UAccordion`).
3. **Compose `pages/index.vue`** — query the per-locale collection (like legacy does with
   `schedule_${locale}`), render the sections in order. Remove About/Experience/Testimonials/Blog.
4. **Header** (`AppHeader.vue`) — sticky: title + anchor nav (Plans/Hotels/Restaurants/Family/FAQ,
   smooth-scroll) + EN/TH toggle + light/dark. Mobile menu.
5. **Footer** (`AppFooter.vue` / `app.config.ts`) — minimal graduation footer
   (name · "Mahidol University · October 2026" · language). Drop Nuxt credits/socials.
6. **`/friends`** — rebuild `pages/friends.vue` in the new design using `LandingGuests.vue`.
   Update `pages/family.vue` similarly if it still wraps legacy.
7. **FAQ content** — use the two real Q&As from PRD §8 (degree = Computer Science; final dates
   not out — other programs haven't closed ceremony registration). Seed TBD placeholders:
   dress code, RSVP, travel/parking, gifts, kids (EN + TH, marked TBD).
8. **Delete** `pages/legacy.vue`, `assets/css/legacy.css`, and any now-unused template
   components/content. Check no dead imports remain (grep for `legacy`).

**Guardrails:**
- Keep `primary: blue`. Keep i18n strategy `prefix_except_default`.
- Guest notes stay English in both locales; roles localize via `guestRoles.*`.
- Reuse existing translated strings in `en.json`/`th.json`; only add new keys where missing.
- Thai FAQ wording in PRD §8 is a draft — flag it for Austin to approve, don't treat as final.
- Verify with `pnpm run build` (github-pages preset / static generate) before finishing.

**Acceptance:** match PRD §10 checklist. When done, list what still needs Austin's input
(Thai FAQ approval, real avatar photo, confirm the 6 restaurant seeds).
