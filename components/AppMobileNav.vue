<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const otherLocale = computed(() => (locale.value === 'en' ? 'th' : 'en'))
const alternatePath = computed(() => switchLocalePath(otherLocale.value))

const sections = [
  { id: 'plans', label: 'nav.plans', icon: 'i-material-symbols-event-note-rounded' },
  { id: 'hotels', label: 'nav.hotels', icon: 'i-material-symbols-hotel-rounded' },
  { id: 'restaurants', label: 'nav.restaurants', icon: 'i-material-symbols-restaurant-rounded' },
  { id: 'family', label: 'nav.family', icon: 'i-material-symbols-diversity-3-rounded' }
]

const homePath = computed(() => localePath('/'))
const isHome = computed(() => route.path === homePath.value)

// Sections only exist on the landing page; elsewhere the links jump back home.
const activeId = ref<string>()

const updateActive = () => {
  if (!isHome.value) {
    activeId.value = undefined
    return
  }

  const threshold = window.innerHeight * 0.35
  let current: string | undefined

  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element && element.getBoundingClientRect().top <= threshold) current = section.id
  }

  activeId.value = current
}

onMounted(() => {
  updateActive()
  window.addEventListener('scroll', updateActive, { passive: true })
  window.addEventListener('resize', updateActive)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActive)
  window.removeEventListener('resize', updateActive)
})
</script>

<template>
  <nav
    :aria-label="t('menu')"
    class="fixed inset-x-0 bottom-0 z-50 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:hidden"
  >
    <div
      class="flex items-stretch gap-0.5 rounded-2xl border border-muted/50 bg-muted/80 p-1 shadow-lg shadow-neutral-950/10 backdrop-blur-md"
    >
      <NuxtLink
        v-for="section in sections"
        :key="section.id"
        :to="{ path: homePath, hash: `#${section.id}` }"
        class="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition-colors"
        :class="activeId === section.id ? 'bg-elevated text-primary' : 'text-muted hover:text-highlighted'"
        :aria-current="activeId === section.id ? 'true' : undefined"
      >
        <UIcon :name="section.icon" class="size-5 shrink-0" />
        <span class="w-full truncate text-center text-[10px] leading-tight">{{ t(section.label) }}</span>
      </NuxtLink>

      <UPopover
        :content="{ align: 'end', side: 'top', sideOffset: 8 }"
        :ui="{ content: 'w-auto p-1' }"
      >
        <button
          type="button"
          class="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-muted transition-colors hover:text-highlighted"
        >
          <UIcon name="i-material-symbols-more-horiz-rounded" class="size-5 shrink-0" />
          <span class="w-full truncate text-center text-[10px] leading-tight">{{ t('more') }}</span>
        </button>

        <template #content>
          <div class="flex items-center gap-1">
            <UButton
              :to="alternatePath || homePath"
              :locale="false"
              color="neutral"
              variant="ghost"
              size="sm"
              class="rounded-full"
              icon="i-material-symbols-translate-rounded"
              :label="t('alternateLanguage')"
            />
            <ColorModeButton />
          </div>
        </template>
      </UPopover>
    </div>
  </nav>
</template>
