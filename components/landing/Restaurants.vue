<script setup lang="ts">
const props = defineProps<{
  restaurants: { note: string }
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
      <div class="text-left mt-2">
        <span class="text-sm text-muted">{{ props.restaurants.note }}</span>
      </div>
    </template>

    <ClientOnly>
      <RestaurantMap />
      <template #fallback>
        <div class="h-80 rounded-lg bg-elevated/50" />
      </template>
    </ClientOnly>

    <UEmpty
      icon="i-material-symbols-restaurant-rounded"
      :title="t('restaurants.suggestionsEmpty')"
      variant="subtle"
    />
  </UPageSection>
</template>
