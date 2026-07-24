<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import type { Plan, PlanRow } from '~/utils/content'

const props = defineProps<{
  plans: Plan[]
}>()

const { t } = useI18n()

const iconFor = (activity: string) => {
  const a = activity.toLowerCase()
  if (a.includes('photo') || a.includes('ถ่ายรูป')) return 'i-lucide-camera'
  if (a.includes('travel') || a.includes('เดินทาง')) return 'i-lucide-car'
  if (a.includes('dinner') || a.includes('รับประทาน')) return 'i-lucide-utensils'
  if (a.includes('ceremony') || a.includes('registration') || a.includes('พิธี') || a.includes('ลงทะเบียน')) return 'i-lucide-graduation-cap'
  if (a.includes('rehearsal') || a.includes('ซ้อม')) return 'i-lucide-graduation-cap'
  return 'i-lucide-clock'
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
    :description="t('venue')"
    :ui="{
      container: 'px-0 pt-0! gap-8',
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
            <span
              class="flex size-11 shrink-0 items-center justify-center rounded-full text-lg font-semibold ring-1"
              :class="plan.tone === 'success'
                ? 'bg-success/10 text-success ring-success/30'
                : 'bg-primary/10 text-primary ring-primary/30'"
            >
              {{ plan.letter }}
            </span>
            <div class="min-w-0">
              <p class="text-xs uppercase tracking-wide text-muted">{{ t('optionLabel') }} {{ plan.letter }}</p>
              <h3 class="text-lg font-semibold text-highlighted">{{ plan.title }}</h3>
              <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span class="inline-flex items-center gap-1">
                  <UIcon name="i-lucide-calendar" class="size-4" />
                  {{ plan.date }}
                </span>
                <UBadge
                  :color="plan.tone === 'success' ? 'success' : 'neutral'"
                  variant="subtle"
                  size="sm"
                >
                  {{ plan.badge }}
                </UBadge>
              </div>
            </div>
          </div>
        </template>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 class="mb-2 flex items-center gap-1.5 text-sm font-medium text-highlighted">
              <UIcon name="i-lucide-circle-check" class="size-4 text-success" />
              {{ t('pros') }}
            </h4>
            <ul class="space-y-1.5">
              <li
                v-for="item in plan.pros"
                :key="item"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-success" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="mb-2 flex items-center gap-1.5 text-sm font-medium text-highlighted">
              <UIcon name="i-lucide-circle-minus" class="size-4 text-muted" />
              {{ t('cons') }}
            </h4>
            <ul class="space-y-1.5">
              <li
                v-for="item in plan.cons"
                :key="item"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <UIcon name="i-lucide-minus" class="mt-0.5 size-4 shrink-0 text-dimmed" />
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
            size="xs"
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
  </UPageSection>
</template>
