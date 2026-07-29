<script setup lang="ts">
const store = useChecklistStore()

onMounted(() => {
  store.loadFromLocalStorage()
})

defineOgImageComponent('Brutalist', {
  title: 'CeklisGuru - Platform Checklist Guru Indonesia',
  description: 'Platform checklist interaktif untuk guru Indonesia meningkatkan kualitas pembelajaran dengan praktik terbaik yang terstruktur.',
  subtitle: 'CeklisGuru',
  accent: '#facc15',
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>