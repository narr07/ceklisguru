<script setup lang="ts">
import { id } from '@nuxt/ui/locale'

const store = useChecklistStore()

onMounted(() => {
  store.loadFromLocalStorage()
})

defineOgImage('BrutalistTakumi', {
  title: 'CeklisGuru - Platform Checklist Guru Indonesia',
  description: 'Platform checklist interaktif untuk guru Indonesia meningkatkan kualitas pembelajaran dengan praktik terbaik yang terstruktur.',
  subtitle: 'CeklisGuru',
  accent: '#facc15',
})
</script>

<template>
  <UApp :locale="id">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>
