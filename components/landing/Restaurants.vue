<script setup lang="ts">
import type { Restaurant } from '~/utils/content'

const { restaurants } = defineProps<{
  restaurants: { note: string, selected: Restaurant }
}>()

const { t } = useI18n()

const mapRestaurant = computed(() => ({
  ...restaurants.selected,
  coordinates: [
    restaurants.selected.coordinates[0]!,
    restaurants.selected.coordinates[1]!
  ] as [number, number]
}))

const restaurantPhotos = computed(() =>
  restaurants.selected.photos.map(photo => ({
    ...photo,
    src: assetUrl(photo.src)!
  }))
)
</script>

<template>
  <UPageSection
    :title="t('restaurants.title')"
    :ui="{
      container: 'px-0 pt-0! gap-6',
      title: 'text-left text-xl sm:text-2xl font-medium'
    }"
  >
    <template #description>
      <div class="text-left mt-2">
        <span class="text-sm text-muted">{{ restaurants.note }}</span>
      </div>
    </template>

    <ClientOnly>
      <RestaurantMap :restaurant="mapRestaurant" />
      <template #fallback>
        <div class="h-80 rounded-lg bg-elevated/50" />
      </template>
    </ClientOnly>

    <div class="restaurant-gallery">
      <figure
        v-for="photo in restaurantPhotos"
        :key="photo.src"
        class="restaurant-gallery-item"
      >
        <NuxtImg
          :src="photo.src"
          :alt="photo.alt"
          width="800"
          sizes="sm:50vw lg:33vw"
          class="restaurant-gallery-image"
          loading="lazy"
        />
        <figcaption>{{ photo.caption }}</figcaption>
      </figure>
    </div>

    <a
      :href="restaurants.selected.photoCreditUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="restaurant-photo-credit"
    >
      {{ t('restaurants.photoCredit') }}
    </a>

    <UPageCard
      variant="subtle"
      icon="i-material-symbols-restaurant-rounded"
      :title="restaurants.selected.name"
      :description="restaurants.selected.address"
      :ui="{ leadingIcon: 'size-6', title: 'text-lg' }"
    >
      <template #footer>
        <UButton
          :to="restaurants.selected.mapsUrl"
          external
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="outline"
          icon="logos:google-maps"
          :label="t('openInGoogleMaps')"
        />
      </template>
    </UPageCard>
  </UPageSection>
</template>

<style scoped>
.restaurant-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.restaurant-gallery-item {
  min-width: 0;
  margin: 0;
}

.restaurant-gallery-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0.5rem;
  background: var(--ui-bg-elevated);
  object-fit: cover;
}

.restaurant-gallery-item figcaption {
  margin-top: 0.5rem;
  color: var(--ui-text-muted);
  font-size: 0.875rem;
}

.restaurant-photo-credit {
  justify-self: start;
  color: var(--ui-text-muted);
  font-size: 0.75rem;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (max-width: 640px) {
  .restaurant-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
