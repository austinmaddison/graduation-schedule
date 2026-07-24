<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import type { PageDoc } from '~/utils/content'

const { locale, t } = useI18n()

const collection = computed(() => `content_${locale.value}` as keyof Collections)

const { data: page } = await useAsyncData(
  () => `content-${locale.value}`,
  () => queryCollection(collection.value).first(),
  { watch: [locale] }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const doc = computed(() => page.value as unknown as PageDoc)

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('guestList')
}))
</script>

<template>
  <UPage v-if="doc">
    <LandingGuests
      :guests="doc.guests.family"
      :title="t('guestList')"
      :kicker="t('guestKicker')"
    />
  </UPage>
</template>
