<script setup lang="ts">
import type { Collections } from '@nuxt/content';

const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const assetUrl = (path: string) =>
  `${useRuntimeConfig().app.baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

const collection = computed(() => `schedule_${locale.value}` as keyof Collections);

const { data: schedule } = await useAsyncData(
  () => `schedule-${locale.value}`,
  () => queryCollection(collection.value).first(),
  { watch: [locale] },
);

const otherLocale = computed(() => (locale.value === 'en' ? 'th' : 'en'));
const alternatePath = computed(() => switchLocalePath(otherLocale.value));

const getLocationMapsUrl = (location: string) => {
  if (!location.includes('Mahidol') && !location.includes('มหิดล')) {
    return undefined;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

const hotels = [
  {
    id: 'salaya-one',
    name: 'Salaya One Hotel',
    mapsUrl: 'https://maps.app.goo.gl/9WK9s6KtiB13umtV9',
    coordinates: [100.3118697, 13.8012853],
    image: assetUrl('images/hotels/salaya-one.webp'),
  },
  {
    id: 'the-palm',
    name: 'The Palm Hotel',
    mapsUrl: 'https://maps.app.goo.gl/wdkhbZeXN4UheFuH7',
    coordinates: [100.328138, 13.8007086],
    image: assetUrl('images/hotels/the-palm.webp'),
  },
  {
    id: '24-poshtel',
    name: '24 Poshtel Salaya',
    mapsUrl: 'https://maps.app.goo.gl/QkJU8AhUZ1RdDMyZ9',
    coordinates: [100.31211, 13.8020133],
    image: assetUrl('images/hotels/24-poshtel.webp'),
  },
  {
    id: 'the-time-24',
    name: 'The Time 24 Hotel',
    mapsUrl: 'https://maps.app.goo.gl/VGLQuxdBL5NHs3Ej6',
    coordinates: [100.3275706, 13.8014471],
    image: assetUrl('images/hotels/the-time-24.jpg'),
  },
  {
    id: 'miracle-place',
    name: 'Miracle Place',
    mapsUrl: 'https://maps.app.goo.gl/ooymG5dfCfSnDCgu5',
    coordinates: [100.3117771, 13.8016046],
    image: assetUrl('images/hotels/miracle-place.jpg'),
  },
  {
    id: 'the-september',
    name: 'The September Salaya',
    mapsUrl: 'https://maps.app.goo.gl/tZ44yPp5PceM1vaW6',
    coordinates: [100.3115152, 13.8000272],
    image: assetUrl('images/hotels/the-september.jpg'),
  },
  {
    id: 'tap-salaya',
    name: 'TAP Salaya',
    mapsUrl: 'https://maps.app.goo.gl/esuxcZJzDpdf79os6',
    coordinates: [100.3124351, 13.7972855],
    image: assetUrl('images/hotels/tap-salaya.webp'),
  },
  {
    id: 'loft-salaya',
    name: 'LOFT Salaya',
    mapsUrl: 'https://maps.app.goo.gl/XUNVfRvjHCvfMohh7',
    coordinates: [100.3283366, 13.7982481],
    image: assetUrl('images/hotels/loft-salaya.jpg'),
  },
  {
    id: 'the-residenz-mb',
    name: 'The Residenz @ MB',
    mapsUrl: 'https://maps.app.goo.gl/NNLkBcWFFwMNL4KL6',
    coordinates: [100.3262992, 13.7971648],
    image: assetUrl('images/hotels/the-residenz-mb.jpg'),
  },
  {
    id: 'salaya-pavilion',
    name: 'Salaya Pavilion Hotel',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Salaya%20Pavilion%20Hotel%20Mahidol%20University',
    coordinates: [100.3262253, 13.7930217],
    image: assetUrl('images/hotels/salaya-pavilion.jpg'),
  },
] as const;

const guests = [
  {
    name: 'Aunt Eet',
    role: 'guestRoles.aunt',
    note: 'Mom 2',
    image: assetUrl('images/guests/aunt-eet.jpg'),
  },
  {
    name: 'Uncle Korn',
    role: 'guestRoles.uncle',
    note: 'Dad 2',
    image: assetUrl('images/guests/uncle-korn.jpg'),
  },
  {
    name: 'Aunt Toi',
    role: 'guestRoles.aunt',
    note: 'Mom 2',
    image: assetUrl('images/guests/aunt-toi.jpg'),
  },
  {
    name: 'Aunt Took',
    role: 'guestRoles.aunt',
    note: 'Wine Aunt',
    image: assetUrl('images/guests/aunt-took.jpg'),
  },
  {
    name: 'Aunt Tick',
    role: 'guestRoles.aunt',
    note: 'Cool Aunt',
    image: assetUrl('images/guests/aunt-tick.jpg'),
  },
  {
    name: 'Uncle Pedth',
    role: 'guestRoles.uncle',
    note: 'Cool Uncle',
    image: assetUrl('images/guests/uncle-pedth.jpg'),
  },
  {
    name: 'Aunt Oi',
    role: 'guestRoles.aunt',
    note: 'Mom 2',
    image: assetUrl('images/guests/aunt-oi.jpg'),
  },
  {
    name: 'Uncle Bui',
    role: 'guestRoles.uncle',
    note: 'Cool Uncle',
    image: assetUrl('images/guests/uncle-bui.jpg'),
  },
  {
    name: 'Khun Yaiy (Grandma)',
    role: 'guestRoles.grandma',
    image: assetUrl('images/guests/khun-yaiy.jpg'),
  },
  {
    name: "P'Nay",
    role: 'guestRoles.bigSister',
    image: assetUrl('images/guests/p-nay.jpg'),
  },
  {
    name: "P'Dar",
    role: 'guestRoles.mother',
    image: assetUrl('images/guests/p-dar.jpg'),
  },
  {
    name: "P'Poom",
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-poom.jpg'),
  },
  {
    name: "P'Fern",
    role: 'guestRoles.bigSister',
    image: assetUrl('images/guests/p-fern.jpg'),
  },
  {
    name: "P'Game",
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-game.jpg'),
  },
  {
    name: "P'Palm",
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-palm.jpg'),
  },
  {
    name: "P'Plai",
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-plai.jpg'),
  },
  {
    name: "P'Dream",
    role: 'guestRoles.bigSister',
    image: assetUrl('images/guests/p-dream.jpg'),
  },
  {
    name: "K'Wiparat (Mom)",
    role: 'guestRoles.mother',
    image: assetUrl('images/guests/k-wiparat.jpg'),
  },
  {
    name: "K'John (Dad)",
    role: 'guestRoles.father',
    image: assetUrl('images/guests/k-john.jpg'),
  },
] as const;

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
  title: schedule.value?.title || 'Graduation Schedule',
}));
</script>

<template>
  <div v-if="schedule" class="app-shell">
    <header class="site-header">
      <Menubar :model="[]" class="masthead">
        <template #start>
          <div class="event-mark" aria-label="Austin Jetrin Maddison">
            <span class="event-monogram">AJM</span>
            <span class="event-year">Graduation · 2026</span>
          </div>
        </template>

        <template #end>
          <NuxtLink
            :to="alternatePath || localePath('/')"
            class="language-link"
            :aria-label="t('switchLanguage')"
          >
            <Button text severity="secondary" size="small">
              <span class="pi pi-language" aria-hidden="true" />
              <span>{{ t('alternateLanguage') }}</span>
            </Button>
          </NuxtLink>
        </template>
      </Menubar>
    </header>

    <main class="page">
      <section class="hero" aria-labelledby="page-title">
        <h1 id="page-title" class="title">{{ schedule.title }}</h1>
        <UniversityLocationCard />
      </section>

      <section class="plans" :aria-label="t('plans')">
        <div class="option-grid">
          <Card
            v-for="option in schedule.options"
            :key="option.id"
            class="option-card"
          >
            <template #title>
              <div class="option-heading">
                <div>
                  <p class="option-kicker">
                    {{ t('optionLabel') }} {{ option.letter }}
                  </p>
                  <h2 class="option-title">{{ option.title }}</h2>
                </div>
              </div>
            </template>

            <template #subtitle>
              <div class="option-meta">
                <p class="option-date">
                  <span class="pi pi-calendar" aria-hidden="true" />
                  <span>{{ option.date }}</span>
                </p>
                <Tag :severity="option.tone">
                  {{ option.badge }}
                </Tag>
              </div>
            </template>

            <template #content>
              <div class="comparison">
                <section class="comparison-block">
                  <h3 class="comparison-heading">
                    <span class="pi pi-check" aria-hidden="true" />
                    <span>{{ t('pros') }}</span>
                  </h3>
                  <ul class="comparison-list">
                    <li v-for="item in option.pros" :key="item">{{ item }}</li>
                  </ul>
                </section>

                <section class="comparison-block">
                  <h3 class="comparison-heading">
                    <span class="pi pi-minus" aria-hidden="true" />
                    <span>{{ t('cons') }}</span>
                  </h3>
                  <ul class="comparison-list">
                    <li v-for="item in option.cons" :key="item">{{ item }}</li>
                  </ul>
                </section>
              </div>

              <section
                class="timeline-section"
                :aria-labelledby="`${option.id}-timeline`"
              >
                <h3 :id="`${option.id}-timeline`" class="timeline-heading">
                  {{ t('timeline') }}
                </h3>

                <Timeline :value="option.rows" class="schedule-timeline">
                  <template #opposite="{ item }">
                    <span class="event-time">{{ item.time }}</span>
                  </template>

                  <template #marker>
                    <span class="event-marker" />
                  </template>

                  <template #content="{ item }">
                    <article class="event-content">
                      <h4 class="event-activity">{{ item.activity }}</h4>
                      <p class="event-location">
                        <span>{{ item.location }}</span>
                      </p>
                      <a
                        v-if="getLocationMapsUrl(item.location)"
                        class="event-directions"
                        :href="getLocationMapsUrl(item.location)"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <UIcon
                          name="logos:google-maps"
                          mode="svg"
                          class="maps-logo"
                          aria-hidden="true"
                        />
                        {{ t('openInGoogleMaps') }}
                      </a>
                      <p class="event-notes">{{ item.notes }}</p>
                    </article>
                  </template>
                </Timeline>
              </section>
            </template>
          </Card>
        </div>
      </section>

      <section class="guest-section" aria-labelledby="guest-list-title">
        <div class="section-heading">
          <div>
            <p class="section-kicker">{{ t('guestKicker') }}</p>
            <h2 id="guest-list-title">{{ t('guestList') }}</h2>
          </div>
          <Tag severity="secondary">
            {{ t('guestCount', { count: guests.length }) }}
          </Tag>
        </div>

        <div class="guest-grid">
          <article v-for="guest in guests" :key="guest.name" class="guest">
            <Avatar
              :image="guest.image"
              :aria-label="guest.name"
              shape="circle"
              size="xlarge"
            />
            <div class="guest-copy">
              <h3>{{ guest.name }}</h3>
              <p>
                <span>{{ t(guest.role) }}</span>
                <span v-if="'note' in guest" class="guest-note">
                  {{ guest.note }}
                </span>
              </p>
            </div>
            <Tag severity="secondary" class="guest-status">
              {{ t('guestStatus.awaiting') }}
            </Tag>
          </article>
        </div>
      </section>

      <section class="stay-section" aria-labelledby="stay-title">
        <div class="section-heading">
          <div>
            <p class="section-kicker">{{ t('stays.kicker') }}</p>
            <h2 id="stay-title">{{ t('stays.title') }}</h2>
          </div>
        </div>

        <p class="section-description">{{ t('stays.flexibilityNote') }}</p>
        <HotelMap :hotels="hotels" />
      </section>

      <section class="restaurant-section" aria-labelledby="restaurant-title">
        <div class="section-heading">
          <div>
            <p class="section-kicker">{{ t('restaurants.kicker') }}</p>
            <h2 id="restaurant-title">{{ t('restaurants.title') }}</h2>
          </div>
          <Tag severity="secondary">{{ t('restaurants.selectedValue') }}</Tag>
        </div>

        <p class="section-description">{{ t('restaurants.description') }}</p>
        <RestaurantMap />
      </section>
    </main>
  </div>
</template>
