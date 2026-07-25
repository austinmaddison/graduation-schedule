<script setup lang="ts">
import type { Hotel } from '~/utils/content'

const props = defineProps<{
  hotels: Hotel[]
}>()

const { t } = useI18n()

const topHotels = computed(() => props.hotels.slice(0, 3))

// HotelMap wants absolute image URLs (baseURL-prefixed) and tuple coordinates.
const mapHotels = computed(() =>
  topHotels.value.map(hotel => ({
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
      <HotelMap :hotels="mapHotels" class="-mt-10" />
      <template #fallback>
        <div class="h-80 rounded-lg bg-elevated/50" />
      </template>
    </ClientOnly>
  </UPageSection>
</template>
