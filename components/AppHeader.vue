<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === 'en' ? 'th' : 'en'))
const alternatePath = computed(() => switchLocalePath(otherLocale.value))
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-50 hidden sm:block">
    <div class="flex min-h-12 items-center gap-1 bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5">
      <UButton
        :to="alternatePath || localePath('/')"
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
  </div>
</template>
