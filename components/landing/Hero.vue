<script setup lang="ts">
import type { PageDoc } from '~/utils/content'

const { global } = useAppConfig()

const graduationDate = new Date('2026-10-01T00:00:00')
const graduationPhotos = Array.from(
  { length: 73 },
  (_, index) => `/hero/graduation/graduation-${String(index + 1).padStart(2, '0')}.webp`
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
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
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
        <UColorModeAvatar
          class="size-18 ring ring-default ring-offset-3 ring-offset-bg"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
        />
      </Motion>
    </template>

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
            :label="`${monthsUntilGraduation} ${monthsUntilGraduation === 1 ? 'month' : 'months'} left to graduation`"
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
            delay: index * 0.1
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
