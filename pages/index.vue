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

const graduationPhotos = [
  '/images/me/graduated/austin.png',
  '/images/me/graduated/image.png',
  '/images/me/graduated/image copy.png'
]

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
  <div v-if="doc">
    <LandingHero :page="doc" />

    <UPage>
      <UPageSection
        :title="$t('graduationDegree')"
        class="py-10 sm:py-14"
        :ui="{
          container: 'px-0 gap-6',
          title: 'text-left text-xl sm:text-2xl font-medium'
        }"
      >
        <UCarousel
          v-slot="{ item, index }"
          :items="graduationPhotos"
          class="mx-auto w-full max-w-4xl"
          :ui="{
            item: 'basis-1/3'
          }"
        >
          <img
            :src="item"
            :alt="`${$t('computerSciencePhotoAlt')} ${index + 1}`"
            width="500"
            height="500"
            class="aspect-square w-full rounded-lg object-cover"
            loading="lazy"
          >
        </UCarousel>
      </UPageSection>


      <section id="plans" class="scroll-mt-20">
        <LandingPlans :plans="doc.plans" />
      </section>


      <section id="hotels" class="scroll-mt-20">
        <LandingHotels :hotels="doc.hotels" />
      </section>

      <section id="restaurants" class="scroll-mt-20">
        <LandingRestaurants :restaurants="doc.restaurants" />
      </section>

      <section id="family" class="scroll-mt-20">
        <LandingGuests
          :guests="doc.guests.family"
          :title="$t('guestList')"
          :kicker="$t('guestKicker')"
        />
      </section>

      <section id="faq" class="scroll-mt-20">
        <LandingFAQ :faq="doc.faq" />
      </section>
    </UPage>
  </div>
</template>
