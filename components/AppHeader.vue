<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === 'en' ? 'th' : 'en'))
const alternatePath = computed(() => switchLocalePath(otherLocale.value))

const sections = ['plans', 'hotels', 'restaurants', 'family', 'faq'] as const
const links = computed<NavigationMenuItem[]>(() =>
  sections.map(id => ({
    label: t(`nav.${id}`),
    to: `${localePath('/')}#${id}`.replace('//', '/')
  }))
)
</script>

<template>
  <UHeader
    :ui="{ root: 'bg-default/75 backdrop-blur border-b border-default' }"
    :toggle="{ color: 'neutral', variant: 'ghost' }"
  >
    <template #title>
      <NuxtLink
        :to="localePath('/')"
        class="text-sm font-semibold text-highlighted"
      >
        {{ t('headerTitle') }}
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      :ui="{ linkLeadingIcon: 'hidden' }"
    />

    <template #right>
      <UButton
        :to="alternatePath || localePath('/')"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-languages"
        :label="t('alternateLanguage')"
        class="hidden sm:inline-flex"
      />
      <UButton
        :to="alternatePath || localePath('/')"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-languages"
        :aria-label="t('alternateLanguage')"
        class="sm:hidden"
      />
      <ColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        orientation="vertical"
        color="neutral"
        class="-mx-2.5"
        :ui="{ linkLeadingIcon: 'hidden' }"
      />
    </template>
  </UHeader>
</template>
