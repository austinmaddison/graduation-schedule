<script setup lang="ts">
</script>

<template>
  <div>
    <AppHeader />
    <UContainer class="sm:border-x border-default pt-6">
      <slot />
    </UContainer>
    <AppFooter />
  </div>
</template>
