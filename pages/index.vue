<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import type { PageDoc } from '~/utils/content'

const { locale } = useI18n()

const collection = computed(() => `content_${locale.value}` as keyof Collections)

const { data: page } = await useAsyncData(
  () => `content-${locale.value}`,
  () => queryCollection(collection.value).first(),
  { watch: [locale] }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const doc = computed(() => page.value as unknown as PageDoc)

useSeoMeta({
  title: () => doc.value.seo?.title || doc.value.title,
  ogTitle: () => doc.value.seo?.title || doc.value.title,
  description: () => doc.value.seo?.description || doc.value.description,
  ogDescription: () => doc.value.seo?.description || doc.value.description
})

useHead(() => ({
  htmlAttrs: { lang: locale.value }
}))
</script>

<template>
  <UPage v-if="doc">
    <LandingHero :page="doc" />

    <section id="plans" class="scroll-mt-24">
      <LandingPlans :plans="doc.plans" />
    </section>

    <section id="hotels" class="scroll-mt-24">
      <LandingHotels :hotels="doc.hotels" />
    </section>

    <section id="restaurants" class="scroll-mt-24">
      <LandingRestaurants :restaurants="doc.restaurants" />
    </section>

    <section id="family" class="scroll-mt-24">
      <LandingGuests
        :guests="doc.guests.family"
        :title="$t('guestList')"
        :kicker="$t('guestKicker')"
      />
    </section>

    <section id="faq" class="scroll-mt-24">
      <LandingFAQ :faq="doc.faq" />
    </section>
  </UPage>
</template>
