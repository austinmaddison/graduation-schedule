<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === 'en' ? 'th' : 'en'))
const alternatePath = computed(() => switchLocalePath(otherLocale.value))
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs', right: 'text-xs' }"
  >
    <template #left>
      <span class="flex flex-wrap items-center gap-x-1.5">
        <span class="font-medium text-highlighted">Austin Jetrin Maddison</span>
        <span aria-hidden="true">·</span>
        <span>{{ t('footerTagline') }}</span>
      </span>
    </template>

    <template #right>
      <UButton
        :to="alternatePath || localePath('/')"
        :locale="false"
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-material-symbols-translate-rounded"
        :label="t('alternateLanguage')"
      />
    </template>
  </UFooter>
</template>
