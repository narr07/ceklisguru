<script setup lang="ts">
const { data: page } = await useAsyncData('halaman-panduan', () =>
  queryCollection('halaman').path('/panduan').first(),
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Panduan tidak ditemukan' })
}

useSeoMeta({
  title: () => `${page.value?.title} · CeklisGuru`,
  description: () => page.value?.description,
})
</script>

<template>
  <UContainer
    v-if="page"
    class="max-w-3xl py-8 sm:py-10"
  >
    <UBreadcrumb
      :items="[{ label: 'Beranda', icon: 'i-lucide-house', to: '/' }, { label: page.title }]"
      class="mb-5"
    />
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :ui="{ root: 'border-none pt-0 pb-6' }"
    />
    <ContentRenderer :value="page" />
  </UContainer>
</template>
