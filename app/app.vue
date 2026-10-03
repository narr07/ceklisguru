<script setup lang="ts">
import { id } from '@nuxt/ui/locale'

const store = useChecklistStore()

useFaviconFromTheme()

if (import.meta.client && !motionAllowed()) {
  // nanime ignores prefers-reduced-motion, so the shared styles become instant here.
  // Each keeps a 1 ms opacity tween: an animation with no properties completes synchronously,
  // and that breaks Vue's out-in transitions (the leaving node is gone before Vue inserts the new one)
  const instant = { enter: { opacity: [0, 1], duration: 1 }, leave: { opacity: 0, duration: 1 }, move: { duration: 1 } }
  const styles: Record<string, unknown> = useAppConfig().nanime?.transitions || {}
  for (const name of Object.keys(styles)) {
    styles[name] = instant
  }
}

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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
