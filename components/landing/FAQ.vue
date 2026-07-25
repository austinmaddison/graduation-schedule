<script setup lang="ts">
import type { PageDoc } from '~/utils/content'

const props = defineProps<{
  faq: PageDoc['faq']
}>()

const questions = computed(() => props.faq.categories.flatMap(category => category.questions))
</script>

<template>
  <UPageSection
    :title="faq.title"
    :description="faq.description"
    :ui="{
      container: 'px-0 pt-0! gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UAccordion
      trailing-icon="material-symbols:add-rounded"
      :items="questions"
      :unmount-on-hide="false"
      :ui="{
        item: 'border-none',
        trigger: 'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
        trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 text-base text-muted'
      }"
    >
      <template #body="{ item }">
        <MDC
          :value="item.content"
          unwrap="p"
          class="px-4"
        />
      </template>
    </UAccordion>
  </UPageSection>
</template>
