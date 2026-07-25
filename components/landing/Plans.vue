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
    :title="t('plans')"
    :description="t('planPreferencePrompt')"
    :ui="{
      container: 'px-0 pt-0! gap-6',
      title: 'text-left text-xl sm:text-2xl font-medium',
      description: 'text-left mt-2 text-sm text-muted'
    }"
  >
    <div class="grid gap-6 lg:grid-cols-2 items-start">
      <UPageCard
        v-for="plan in props.plans"
        :key="plan.id"
        variant="subtle"
        :highlight="plan.tone === 'success'"
        :highlight-color="plan.tone === 'success' ? 'success' : 'primary'"
        :ui="{ container: 'gap-4', body: 'flex flex-col gap-6' }"
      >
        <template #header>
          <div class="flex items-start gap-4">
            <div class="min-w-0">
              <UBadge
                :color="plan.tone === 'success' ? 'success' : 'primary'"
                variant="solid"
                size="lg"
                class="mb-2 uppercase tracking-wide"
              >
                {{ t('optionLabel') }} {{ plan.letter }}
              </UBadge>
              <h3 class="text-xl font-bold text-highlighted sm:text-2xl">{{ plan.title }}</h3>
              <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span class="inline-flex items-center gap-1">
                  <UIcon name="i-material-symbols-calendar-month-rounded" class="size-4" />
                  {{ plan.date }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <div class="grid gap-4 border-y border-default py-4 sm:grid-cols-2">
          <div>
            <h4 class="mb-2 flex items-center gap-1.5 text-sm font-medium text-highlighted">
              <UIcon name="i-material-symbols-check-circle-rounded" class="size-4 text-success" />
              {{ t('pros') }}
            </h4>
            <ul class="space-y-1.5">
              <li
                v-for="item in plan.pros"
                :key="item"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <UIcon name="i-material-symbols-check-rounded" class="mt-0.5 size-4 shrink-0 text-success" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="mb-2 flex items-center gap-1.5 text-sm font-medium text-highlighted">
              <UIcon name="i-material-symbols-do-not-disturb-on-rounded" class="size-4 text-muted" />
              {{ t('cons') }}
            </h4>
            <ul class="space-y-1.5">
              <li
                v-for="item in plan.cons"
                :key="item"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <UIcon name="i-material-symbols-remove-rounded" class="mt-0.5 size-4 shrink-0 text-dimmed" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-highlighted">{{ t('timeline') }}</h4>
          <UTimeline
            :items="timelineItems(plan)"
            :color="plan.tone === 'success' ? 'success' : 'primary'"
            size="lg"
            :ui="{ date: 'text-xs', title: 'text-sm', description: 'text-sm' }"
          >
            <template #description="{ item }">
              <div class="space-y-1">
                <p class="text-muted">{{ (item as PlanTimelineItem).location }}</p>
                <a
                  v-if="(item as PlanTimelineItem).mapsUrl"
                  :href="(item as PlanTimelineItem).mapsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <UIcon name="logos:google-maps" mode="svg" class="size-3.5" />
                  {{ t('openInGoogleMaps') }}
                </a>
                <p class="text-xs text-dimmed">{{ (item as PlanTimelineItem).notes }}</p>
              </div>
            </template>
          </UTimeline>
        </div>
      </UPageCard>
    </div>

    <UniversityLocationCard />

  </UPageSection>
</template>
