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
          <UBadge color="neutral" variant="subtle" size="lg" class="tracking-normal">
            {{ t('guestCount', { count: props.guests.length }) }}
          </UBadge>
        </div>
      </div>
    </template>

    <UPageList divide class="rounded-lg border border-default bg-default px-4">
      <div
        v-for="guest in props.guests"
        :key="guest.name"
        class="relative flex min-h-16 items-center justify-between gap-4 py-3"
      >
        <div class="min-w-0">
          <p class="text-sm font-semibold text-highlighted">{{ guest.name }}</p>
          <p v-if="guest.note" class="text-xs text-primary">{{ guest.note }}</p>
        </div>
        <p class="shrink-0 text-xs text-muted">{{ t(guest.role) }}</p>
      </div>
    </UPageList>
  </UPageSection>
</template>
