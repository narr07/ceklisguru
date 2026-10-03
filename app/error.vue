<script setup lang="ts">
import type { NuxtError } from '#app'
import { id } from '@nuxt/ui/locale'

const props = defineProps<{ error: NuxtError }>()

useFaviconFromTheme()

const isNotFound = computed(() => props.error.statusCode === 404)

const shown = computed(() => ({
  statusCode: props.error.statusCode,
  statusMessage: isNotFound.value ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan',
  message: isNotFound.value
    ? 'Alamatnya mungkin salah ketik, atau halamannya sudah dipindah.'
    : 'Muat ulang halaman ini. Kalau masih gagal, coba lagi beberapa saat lagi.',
}))

useHead({ title: computed(() => `${shown.value.statusMessage} · CeklisGuru`) })
</script>

<template>
  <UApp :locale="id">
    <div class="flex min-h-screen flex-col bg-default">
      <AppHeader />
      <UError
        :error="shown"
        :clear="{ label: 'Kembali ke Beranda', icon: 'i-lucide-arrow-left' }"
        class="flex-1"
      />
      <AppFooter />
    </div>
  </UApp>
</template>
