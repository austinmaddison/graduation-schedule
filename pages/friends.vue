<script setup lang="ts">
import { friends } from '~/utils/guests';

const { t } = useI18n();
const localePath = useLocalePath();

useHead({ title: t('friendList') });
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
      <section class="guest-section" aria-labelledby="friends-list-title">
        <div class="section-heading">
          <div>
            <p class="section-kicker">{{ t('friendKicker') }}</p>
            <h1 id="friends-list-title">{{ t('friendList') }}</h1>
          </div>
          <Tag severity="secondary">{{ t('guestCount', { count: friends.length }) }}</Tag>
        </div>
        <GuestDirectory :guests="friends" />
      </section>
    </main>
  </div>
</template>
