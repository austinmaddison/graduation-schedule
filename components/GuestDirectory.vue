<script setup lang="ts">
import type { Guest } from '~/utils/guests';

const props = defineProps<{
  guests: Guest[];
}>();

const { locale, t } = useI18n();
const assetUrl = (path: string) =>
  `${useRuntimeConfig().app.baseURL.replace(/\/$/, '')}/${path}`;
const displayName = (guest: Guest) => guest.name[locale.value as 'en' | 'th'];
</script>

<template>
  <div class="guest-grid">
    <article v-for="guest in props.guests" :key="guest.name.en" class="guest">
      <Avatar
        v-if="guest.image"
        :image="assetUrl(guest.image)"
        :aria-label="displayName(guest)"
        shape="circle"
        size="xlarge"
      />
      <Avatar
        v-else
        :label="displayName(guest).slice(0, 1)"
        :aria-label="displayName(guest)"
        shape="circle"
        size="xlarge"
      />
      <div class="guest-copy">
        <h3>{{ displayName(guest) }}</h3>
        <p>
          <span>{{ t(guest.role) }}</span>
          <span v-if="guest.note" class="guest-note">{{ guest.note }}</span>
        </p>
      </div>
    </article>
  </div>
</template>
