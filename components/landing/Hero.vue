<script setup lang="ts">
import type { PageDoc } from '~/utils/content'

const { t } = useI18n()

const graduationDate = new Date('2026-10-01T00:00:00')
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

const monthsUntilGraduation = computed(() => {
  const today = new Date()
  return Math.max(
    0,
    (graduationDate.getFullYear() - today.getFullYear()) * 12
      + graduationDate.getMonth()
      - today.getMonth()
  )
})

defineProps<{
  page: PageDoc
}>()
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
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
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
          delay: 0.3
        }"
      >
        {{ page.description }}
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
        <div class="flex items-center gap-2">
          <UButton
            color="success"
            variant="ghost"
            class="gap-2"
            :label="t('graduationCountdown', { count: monthsUntilGraduation }, monthsUntilGraduation)"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full bg-success opacity-75 animate-ping"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full bg-success"
                />
              </span>
            </template>
          </UButton>
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
