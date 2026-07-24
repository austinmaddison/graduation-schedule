<script setup lang="ts">
import type { Guest } from '~/utils/content'

const props = defineProps<{
  guests: Guest[]
  title: string
  kicker?: string
}>()

const { t } = useI18n()
</script>

<template>
  <UPageSection
    :ui="{ container: 'px-0 pt-0! gap-6' }"
  >
    <template #title>
      <div class="text-left">
        <p v-if="props.kicker" class="text-xs uppercase tracking-wide text-muted">{{ props.kicker }}</p>
        <div class="flex items-center gap-3">
          <h2 class="text-xl sm:text-2xl font-medium text-highlighted">{{ props.title }}</h2>
          <UBadge color="neutral" variant="subtle" size="sm">
            {{ t('guestCount', { count: props.guests.length }) }}
          </UBadge>
        </div>
      </div>
    </template>

    <UPageGrid class="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <UPageCard
        v-for="guest in props.guests"
        :key="guest.name"
        variant="subtle"
        :ui="{ body: 'flex items-center gap-3 p-3 sm:p-3' }"
      >
        <UAvatar
          :src="assetUrl(guest.image)"
          :alt="guest.name"
          :text="guest.name.slice(0, 1)"
          size="lg"
        />
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-highlighted">{{ guest.name }}</p>
          <p class="truncate text-xs text-muted">{{ t(guest.role) }}</p>
          <p v-if="guest.note" class="truncate text-xs text-primary">{{ guest.note }}</p>
        </div>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
