<script setup lang="ts">
import type { Category, SubCategory } from '~/types/checklist'

useHead({
  title: 'CeklisGuru - Praktik Terbaik Pembelajaran untuk Guru Indonesia',
  meta: [
    { name: 'description', content: 'Platform checklist interaktif untuk guru Indonesia. 8 kategori dengan sub-topik terstruktur, progress tracking, dan penyimpanan otomatis.' },
  ],
})

const { data: categories } = await useAsyncData('categories', async () =>
  (await queryCollection('categories').all()).sort(byFileNumber),
)

const { data: subcategories } = await useAsyncData('subcategories-all', async () =>
  (await queryCollection('subcategories').all()).sort(byFileNumber),
)

// Nuxt Content replaces the YAML `id` with its own file id, so group by slug instead
const subcategoriesByParent = computed(() => {
  const map: Record<string, SubCategory[]> = {}
  for (const sc of subcategories.value ?? []) {
    ;(map[sc.parentSlug] ??= []).push(sc as unknown as SubCategory)
  }
  return map
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <AppHeader />

    <UContainer class="py-8 sm:py-12">
      <section class="mb-10 text-center sm:mb-14">
        <h1 class="mb-3 text-3xl leading-tight font-black text-highlighted sm:mb-4 sm:text-4xl lg:text-5xl">
          Checklist Praktik Terbaik <br class="hidden sm:block">
          <span class="underline decoration-primary decoration-4 underline-offset-8">Pembelajaran</span>
        </h1>
        <p class="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Pantau dan tingkatkan kualitas mengajar Anda dengan <strong class="text-highlighted">praktik terbaik</strong> terstruktur dalam {{ categories?.length ?? 0 }} kategori pembelajaran.
        </p>
      </section>

      <section aria-label="Daftar Kategori Pembelajaran">
        <h2 class="mb-5 flex items-center gap-2 text-lg font-bold text-highlighted sm:text-xl">
          <span
            class="inline-block h-5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {{ categories?.length ?? 0 }} Kategori Pembelajaran
        </h2>

        <div
          v-if="categories?.length"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category as unknown as Category"
            :sub-categories="subcategoriesByParent[category.slug] ?? []"
          />
        </div>

        <UEmpty
          v-else
          icon="i-lucide-inbox"
          title="Kategori belum tersedia"
          description="Isi ceklis sedang disusun. Coba buka lagi nanti."
        />
      </section>
    </UContainer>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          CeklisGuru, ceklis mengajar untuk guru Indonesia
        </p>
      </template>
    </UFooter>
  </div>
</template>
