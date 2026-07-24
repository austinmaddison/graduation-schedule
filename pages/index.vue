<script setup lang="ts">
import type { Collections } from '@nuxt/content';

const props = withDefaults(
  defineProps<{
    guestList?: 'family' | 'friends';
  }>(),
  { guestList: 'family' },
);

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
const headline = ref<HTMLElement>();
const isHeadlineVisible = ref(true);
let headlineObserver: IntersectionObserver | undefined;

onMounted(() => {
  if (!headline.value) return;

  headlineObserver = new IntersectionObserver(
    ([entry]) => {
      isHeadlineVisible.value = entry.isIntersecting;
    },
    { rootMargin: '-76px 0px 0px', threshold: 0 },
  );
  headlineObserver.observe(headline.value);
});

onBeforeUnmount(() => headlineObserver?.disconnect());

const getLocationMapsUrl = (location: string) => {
  if (!location.includes('Mahidol') && !location.includes('มหิดล')) {
    return undefined;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

type Guest = {
  name: { en: string; th: string };
  role: string;
  note?: string;
  image?: string;
};

const displayGuestName = (guest: Guest) =>
  guest.name[locale.value as 'en' | 'th'];

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
];

const familyGuests: Guest[] = [
  {
    name: { en: 'Aunt Eet', th: 'ป้าอี๊ด' },
    role: 'guestRoles.aunt',
    note: 'Mom 2',
    image: assetUrl('images/guests/aunt-eet.jpg'),
  },
  {
    name: { en: 'Uncle Korn', th: 'ลุงกรณ์' },
    role: 'guestRoles.uncle',
    note: 'Dad 2',
    image: assetUrl('images/guests/uncle-korn.jpg'),
  },
  {
    name: { en: 'Aunt Toi', th: 'ป้าต้อย' },
    role: 'guestRoles.aunt',
    note: 'Mom 2',
    image: assetUrl('images/guests/aunt-toi.jpg'),
  },
  {
    name: { en: 'Aunt Took', th: 'ป้าตุ๊ก' },
    role: 'guestRoles.aunt',
    note: 'Wine Aunt',
    image: assetUrl('images/guests/aunt-took.jpg'),
  },
  {
    name: { en: 'Aunt Tick', th: 'ป้าติ๊ก' },
    role: 'guestRoles.aunt',
    note: 'Cool Aunt',
    image: assetUrl('images/guests/aunt-tick.jpg'),
  },
  {
    name: { en: 'Uncle Pedth', th: 'ลุงเพชร' },
    role: 'guestRoles.uncle',
    note: 'Cool Uncle',
    image: assetUrl('images/guests/uncle-pedth.jpg'),
  },
  {
    name: { en: 'Aunt Oi', th: 'ป้าอ้อย' },
    role: 'guestRoles.aunt',
    note: 'Mom 2',
    image: assetUrl('images/guests/aunt-oi.jpg'),
  },
  {
    name: { en: 'Uncle Bui', th: 'ลุงบุญ' },
    role: 'guestRoles.uncle',
    note: 'Cool Uncle',
    image: assetUrl('images/guests/uncle-bui.jpg'),
  },
  {
    name: { en: 'Khun Yaiy (Grandma)', th: 'คุณยาย' },
    role: 'guestRoles.grandma',
    image: assetUrl('images/guests/khun-yaiy.jpg'),
  },
  {
    name: { en: "P'Nay", th: 'พี่เน' },
    role: 'guestRoles.bigSister',
    image: assetUrl('images/guests/p-nay.jpg'),
  },
  {
    name: { en: "P'Dar", th: 'พี่ดาร์' },
    role: 'guestRoles.mother',
    image: assetUrl('images/guests/p-dar.jpg'),
  },
  {
    name: { en: "P'Poom", th: 'พี่ภูมิ' },
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-poom.jpg'),
  },
  {
    name: { en: "P'Fern", th: 'พี่เฟิร์น' },
    role: 'guestRoles.bigSister',
    image: assetUrl('images/guests/p-fern.jpg'),
  },
  {
    name: { en: "P'Game", th: 'พี่เกมส์' },
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-game.jpg'),
  },
  {
    name: { en: "P'Palm", th: 'พี่ปาล์ม' },
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-palm.jpg'),
  },
  {
    name: { en: "P'Plai", th: 'พี่ปลา' },
    role: 'guestRoles.bigBrother',
    image: assetUrl('images/guests/p-plai.jpg'),
  },
  {
    name: { en: "P'Dream", th: 'พี่ดรีม' },
    role: 'guestRoles.bigSister',
    image: assetUrl('images/guests/p-dream.jpg'),
  },
  {
    name: { en: "K'Wiparat (Mom)", th: 'คุณวิภารัตน์' },
    role: 'guestRoles.mother',
    image: assetUrl('images/guests/k-wiparat.jpg'),
  },
  {
    name: { en: "K'John (Dad)", th: 'คุณจอห์น' },
    role: 'guestRoles.father',
    image: assetUrl('images/guests/k-john.jpg'),
  },
] as const;

const friends: Guest[] = [
  { name: { en: 'Bhum', th: 'บูม' }, role: 'guestRoles.friend' },
  { name: { en: 'Justin', th: 'จัสติน' }, role: 'guestRoles.friend' },
  { name: { en: 'Gloria', th: 'กลอเรีย' }, role: 'guestRoles.friend' },
  { name: { en: 'Akari', th: 'อาการิ' }, role: 'guestRoles.friend' },
  { name: { en: 'Appy', th: 'แอปปี้' }, role: 'guestRoles.friend' },
  { name: { en: 'Alex', th: 'อเล็กซ์' }, role: 'guestRoles.friend' },
  { name: { en: 'Anish', th: 'อนิช' }, role: 'guestRoles.friend' },
  { name: { en: 'Karan', th: 'คารัน' }, role: 'guestRoles.friend' },
  { name: { en: 'Lana', th: 'ลาน่า' }, role: 'guestRoles.friend' },
];

const displayedGuests = computed(() =>
  props.guestList === 'friends' ? friends : familyGuests,
);
const displayedGuestKicker = computed(() =>
  props.guestList === 'friends' ? 'friendKicker' : 'guestKicker',
);
const displayedGuestList = computed(() =>
  props.guestList === 'friends' ? 'friendList' : 'guestList',
);

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
          <span v-if="!isHeadlineVisible" class="header-title">
            {{ schedule.title }}
          </span>
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
        <h1 ref="headline" id="page-title" class="title">{{ schedule.title }}</h1>
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
            <p class="section-kicker">{{ t(displayedGuestKicker) }}</p>
            <h2 id="guest-list-title">{{ t(displayedGuestList) }}</h2>
          </div>
          <Tag severity="secondary">
            {{ t('guestCount', { count: displayedGuests.length }) }}
          </Tag>
        </div>

        <div class="guest-grid">
          <article v-for="guest in displayedGuests" :key="guest.name.en" class="guest">
            <Avatar
              v-if="guest.image"
              :image="guest.image"
              :aria-label="displayGuestName(guest)"
              shape="circle"
              size="xlarge"
            />
            <Avatar
              v-else
              :label="displayGuestName(guest).slice(0, 1)"
              :aria-label="displayGuestName(guest)"
              shape="circle"
              size="xlarge"
            />
            <div class="guest-copy">
              <h3>{{ displayGuestName(guest) }}</h3>
              <p>
                <span>{{ t(guest.role) }}</span>
                <span v-if="guest.note" class="guest-note">{{ guest.note }}</span>
              </p>
            </div>
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
