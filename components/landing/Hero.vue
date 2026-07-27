<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import type { PageDoc } from '~/utils/content'

const { t } = useI18n()

const props = defineProps<{
  page: PageDoc
}>()

const primaryPlan = computed(() => props.page.plans[0])
const { daysRemaining } = useDaysUntil(() => primaryPlan.value?.startsAt)

// NumberFlow only animates on change, so render 0 first and hand it the real
// count once mounted.
const displayDays = ref(0)

watch(daysRemaining, (value) => {
  if (value !== undefined) displayDays.value = value
})

onMounted(() => {
  requestAnimationFrame(() => {
    if (daysRemaining.value !== undefined) displayDays.value = daysRemaining.value
  })
})

// All-day calendar entry on the plan date (Google Calendar end date is exclusive).
const dayStamp = (isoDate: string, addDays = 0) => {
  const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return undefined
  return new Date(Date.UTC(year, month - 1, day + addDays))
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')
}

const calendarUrl = computed(() => {
  const plan = primaryPlan.value
  if (!plan?.startsAt) return undefined

  const start = dayStamp(plan.startsAt)
  const end = dayStamp(plan.startsAt, 1)
  if (!start || !end) return undefined

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${props.page.title} — ${plan.title}`,
    dates: `${start}/${end}`,
    location: t('heroLocation'),
    details: props.page.description
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
})

const locationUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t('heroLocation'))}`
)

// Keep this list in sync with the public assets: several sequence numbers are intentionally absent.
const graduationPhotoNumbers = [
  ...Array.from({ length: 41 }, (_, index) => index + 1),
  ...Array.from({ length: 3 }, (_, index) => index + 43),
  ...Array.from({ length: 14 }, (_, index) => index + 47),
  ...Array.from({ length: 9 }, (_, index) => index + 62),
  73
]
const graduationPhotos = graduationPhotoNumbers.map(
  number => `/hero/graduation/graduation-${String(number).padStart(2, '0')}.webp`
)

const shuffle = (items: string[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Start deterministic so SSR/hydration match, then shuffle on the client only.
const rowOne = ref(graduationPhotos)
const rowTwo = ref(graduationPhotos)

onMounted(() => {
  rowOne.value = shuffle(graduationPhotos)
  rowTwo.value = shuffle(graduationPhotos)
})
</script>

<template>
  <UPageHero
      :ui="{
        headline: 'flex items-center justify-center',
        title: 'text-shadow-md mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl',
        links: 'mt-4 flex-col justify-center items-center'
      }"
    >
    <template #title>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <span class="flex flex-col items-center">
          <span class="text-6xl leading-[1.05] font-bold sm:text-7xl lg:text-8xl">
            <span v-if="t('heroCountdownPrefix')" class="me-2">{{ t('heroCountdownPrefix') }}</span>
            <NumberFlow
              :value="displayDays"
              :format="{ useGrouping: false }"
              will-change
              class="tabular-nums"
            />
            <span class="ms-2">{{ t('heroCountdownUnit') }}</span>
          </span>
          <span>{{ t('heroCountdownTail') }}</span>
        </span>
      </Motion>
    </template>

    <template #links>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div v-if="primaryPlan" class="flex flex-col items-center gap-6">
          <div class="flex flex-col items-center gap-1">
            <UButton
              :to="calendarUrl"
              target="_blank"
              rel="noopener noreferrer"
              color="neutral"
              variant="ghost"
              size="xl"
              class="rounded-full text-base sm:text-lg"
              icon="i-material-symbols-calendar-month-rounded"
              :ui="{ leadingIcon: 'size-5 sm:size-6' }"
              :label="primaryPlan.date"
              :aria-label="`${primaryPlan.date} — ${t('addToCalendar')}`"
            />
            <UButton
              :to="locationUrl"
              target="_blank"
              rel="noopener noreferrer"
              color="neutral"
              variant="ghost"
              size="xl"
              class="rounded-full text-base text-muted sm:text-lg"
              icon="i-material-symbols-location-on-rounded"
              :ui="{ leadingIcon: 'size-5 sm:size-6' }"
              :label="t('heroLocation')"
              :aria-label="`${t('heroLocation')} — ${t('openInGoogleMaps')}`"
            />
          </div>

          <UButton
            to="#plans"
            color="neutral"
            variant="solid"
            size="xl"
            class="rounded-full text-base sm:text-lg"
            trailing-icon="i-material-symbols-arrow-downward-rounded"
            :ui="{ trailingIcon: 'size-5 sm:size-6' }"
            :label="t('seeSchedule')"
          />
        </div>
      </Motion>
    </template>

    <UMarquee
      pause-on-hover
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:120s]"
      :ui="{ root: 'before:!w-1/5 after:!w-1/5 sm:before:!w-1/3 sm:after:!w-1/3' }"
    >
        <Motion
          v-for="(image, index) in rowOne"
          :key="`row-one-${index}`"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: index * 0.1
          }"
        >
          <NuxtImg
            width="234"
            height="234"
            class="rounded-lg aspect-square object-cover"
            :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
            :src="image"
            :alt="`Austin graduation photo ${index + 1}`"
          />
        </Motion>
    </UMarquee>

    <UMarquee
      reverse
      pause-on-hover
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:120s]"
      :ui="{ root: 'before:!w-1/5 after:!w-1/5 sm:before:!w-1/3 sm:after:!w-1/3' }"
    >
        <Motion
          v-for="(image, index) in rowTwo"
          :key="`row-two-${index}`"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: (rowTwo.length - index - 1) * 0.1
          }"
        >
          <NuxtImg
            width="234"
            height="234"
            class="rounded-lg aspect-square object-cover"
            :class="index % 2 === 0 ? 'rotate-2' : '-rotate-2'"
            :src="image"
            :alt="`Austin graduation photo ${index + 1}`"
          />
        </Motion>
    </UMarquee>
  </UPageHero>
</template>
