<script setup lang="ts">
const store = useChecklistStore()

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>