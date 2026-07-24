<script setup lang="ts">
import { familyGuests } from '~/utils/guests';

const { t } = useI18n();
const localePath = useLocalePath();

useHead({ title: t('guestList') });
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <Menubar :model="[]" class="masthead">
        <template #start>
          <NuxtLink :to="localePath('/')" class="header-title">
            {{ t('backToSchedule') }}
          </NuxtLink>
        </template>
      </Menubar>
    </header>

    <main class="page directory-page">
      <section class="guest-section" aria-labelledby="family-list-title">
        <div class="section-heading">
          <div>
            <p class="section-kicker">{{ t('guestKicker') }}</p>
            <h1 id="family-list-title">{{ t('guestList') }}</h1>
          </div>
          <Tag severity="secondary">{{ t('guestCount', { count: familyGuests.length }) }}</Tag>
        </div>
        <GuestDirectory :guests="familyGuests" />
      </section>
    </main>
  </div>
</template>
