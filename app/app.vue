<script setup lang="ts">
import { id } from '@nuxt/ui/locale'

const store = useChecklistStore()

useFaviconFromTheme()

onMounted(() => {
  store.load()
})

defineOgImage('BrutalistTakumi', {
  title: 'CeklisGuru',
  description: 'Ceklis mengajar dari dasar sampai lanjut, disusun dari Standar Proses dan standar kompetensi guru terbaru.',
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
