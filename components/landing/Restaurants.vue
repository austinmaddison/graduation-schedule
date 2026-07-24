<script setup lang="ts">
import type { RestaurantSuggestion } from '~/utils/content'

const props = defineProps<{
  restaurants: { note: string, suggestions: RestaurantSuggestion[] }
}>()

const { t } = useI18n()
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
      <div class="text-left mt-2 flex flex-wrap items-center gap-3">
        <span class="text-sm text-muted">{{ props.restaurants.note }}</span>
        <UBadge color="neutral" variant="subtle" size="sm">
          {{ t('restaurants.selectedLabel') }}: {{ t('restaurants.selectedValue') }}
        </UBadge>
      </div>
    </template>

    <ClientOnly>
      <RestaurantMap />
      <template #fallback>
        <div class="h-80 rounded-lg bg-elevated/50" />
      </template>
    </ClientOnly>

    <div class="flex items-center gap-2 mt-2">
      <UIcon name="i-lucide-utensils" class="size-4 text-muted" />
      <h3 class="text-sm font-medium text-highlighted">{{ t('restaurants.suggestionsLabel') }}</h3>
    </div>

    <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UPageCard
        v-for="spot in props.restaurants.suggestions"
        :key="spot.id"
        :to="spot.mapsUrl"
        target="_blank"
        variant="subtle"
        :title="spot.name"
        :description="spot.area"
        :ui="{
          title: 'text-sm font-semibold',
          description: 'text-xs text-muted',
          container: 'gap-1'
        }"
      >
        <template #footer>
          <span class="inline-flex items-center gap-1.5 text-xs text-primary">
            <UIcon name="logos:google-maps" mode="svg" class="size-3.5" />
            {{ t('openInGoogleMaps') }}
          </span>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
