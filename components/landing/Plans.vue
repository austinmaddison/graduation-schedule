<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import type { Plan, PlanRow } from '~/utils/content'

const props = defineProps<{
  plans: Plan[]
}>()

const { t } = useI18n()

const iconFor = (activity: string) => {
  const a = activity.toLowerCase()
  if (a.includes('photo') || a.includes('ถ่ายรูป')) return 'i-material-symbols-photo-camera-rounded'
  if (a.includes('travel') || a.includes('เดินทาง')) return 'i-material-symbols-directions-car-rounded'
  if (a.includes('dinner') || a.includes('รับประทาน')) return 'i-material-symbols-restaurant-rounded'
  if (a.includes('ceremony') || a.includes('registration') || a.includes('พิธี') || a.includes('ลงทะเบียน')) return 'i-material-symbols-school-rounded'
  if (a.includes('rehearsal') || a.includes('ซ้อม')) return 'i-material-symbols-school-rounded'
  return 'i-material-symbols-schedule-rounded'
}

type PlanTimelineItem = TimelineItem & Pick<PlanRow, 'location' | 'notes'> & { mapsUrl?: string }

const timelineItems = (plan: Plan): PlanTimelineItem[] =>
  plan.rows.map((row, index) => ({
    value: index,
    date: row.time,
    title: row.activity,
    icon: iconFor(row.activity),
    location: row.location,
    notes: row.notes,
    mapsUrl: campusMapsUrl(row.location)
  }))
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 pt-0! gap-6'
    }"
  >
    <div class="space-y-6">
      <UPageCard
        v-for="plan in props.plans"
        :key="plan.id"
        variant="subtle"
        :ui="{ container: 'gap-4', body: 'flex flex-col gap-6' }"
      >
        <template #header>
          <div class="flex items-start gap-4">
            <div class="min-w-0">
              <h3 class="text-2xl font-bold text-highlighted sm:text-3xl">{{ plan.title }}</h3>
              <div class="mt-1.5 flex flex-wrap items-center gap-2 text-base text-muted sm:text-lg">
                <span class="inline-flex items-center gap-1.5">
                  <UIcon name="i-material-symbols-calendar-month-rounded" class="size-5" />
                  {{ plan.date }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <div>
          <h4 class="mb-4 text-base font-medium text-highlighted sm:text-lg">{{ t('timeline') }}</h4>
          <UTimeline
            :items="timelineItems(plan)"
            color="neutral"
            size="xl"
            :ui="{
              indicator: 'bg-inverted text-inverted',
              separator: 'bg-inverted',
              date: 'text-sm',
              title: 'text-base sm:text-lg',
              description: 'text-base'
            }"
          >
            <template #description="{ item }">
              <div class="space-y-1.5">
                <p class="text-muted">{{ (item as PlanTimelineItem).location }}</p>
                <a
                  v-if="(item as PlanTimelineItem).mapsUrl"
                  :href="(item as PlanTimelineItem).mapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <UIcon name="logos:google-maps" mode="svg" class="size-4" />
                  {{ t('openInGoogleMaps') }}
                </a>
                <p class="text-sm text-dimmed">{{ (item as PlanTimelineItem).notes }}</p>
              </div>
            </template>
          </UTimeline>
        </div>
      </UPageCard>
    </div>
  </UPageSection>
</template>
