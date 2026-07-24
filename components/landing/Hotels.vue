<script setup lang="ts">
import type { Hotel } from '~/utils/content'

const props = defineProps<{
  hotels: Hotel[]
}>()

const { t } = useI18n()

// HotelMap wants absolute image URLs (baseURL-prefixed) and tuple coordinates.
const mapHotels = computed(() =>
  props.hotels.map(hotel => ({
    ...hotel,
    image: assetUrl(hotel.image)!,
    coordinates: [hotel.coordinates[0]!, hotel.coordinates[1]!] as [number, number]
  }))
)
</script>

<template>
  <UPageSection
    :title="t('stays.title')"
    :description="t('stays.flexibilityNote')"
    :ui="{
      container: 'px-0 pt-0! gap-6',
      title: 'text-left text-xl sm:text-2xl font-medium',
      description: 'text-left mt-2 text-sm text-muted'
    }"
  >
    <ClientOnly>
      <HotelMap :hotels="mapHotels" />
      <template #fallback>
        <div class="h-80 rounded-lg bg-elevated/50" />
      </template>
    </ClientOnly>

    <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      <UPageCard
        v-for="hotel in props.hotels"
        :key="hotel.id"
        variant="subtle"
        :ui="{ container: 'p-0 sm:p-0', body: 'p-4', wrapper: 'gap-2' }"
      >
        <template #header>
          <div class="aspect-video overflow-hidden rounded-t-lg bg-elevated">
            <img
              :src="assetUrl(hotel.image)"
              :alt="hotel.name"
              class="size-full object-cover"
              loading="lazy"
              width="480"
              height="270"
            >
          </div>
        </template>

        <h3 class="text-sm font-semibold text-highlighted">{{ hotel.name }}</h3>
        <p class="text-xs text-muted">{{ t('stays.nearCampus') }}</p>

        <template #footer>
          <UButton
            :to="hotel.mapsUrl"
            target="_blank"
            color="neutral"
            variant="subtle"
            size="xs"
            block
            :label="t('openInGoogleMaps')"
          >
            <template #leading>
              <UIcon name="logos:google-maps" mode="svg" class="size-3.5" />
            </template>
          </UButton>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
