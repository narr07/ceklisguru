<script setup lang="ts">
import type { Category, SubCategory } from '~/types/checklist'

useHead({
  title: 'CeklisGuru - Praktik Terbaik Pembelajaran untuk Guru Indonesia',
  meta: [
    { name: 'description', content: 'Platform checklist interaktif untuk guru Indonesia. 7 kategori dengan sub-topik terstruktur, progress tracking, dan penyimpanan otomatis.' },
  ],
})

// Fetch categories and all subcategories separately
const { data: categories } = await useAsyncData('categories', () => 
  queryCollection('categories').order('stem', 'ASC').all()
)

const { data: subcategories } = await useAsyncData('subcategories-all', () => 
  queryCollection('subcategories').all()
)

// Group sub-categories by parentId
const subcategoriesByParent = computed(() => {
  const map: Record<string, SubCategory[]> = {}
  if (subcategories.value) {
    for (const sc of subcategories.value) {
      const parentId = (sc as any).parentId || (sc as any).parentSlug
      if (parentId) {
        if (!map[parentId]) map[parentId] = []
        map[parentId].push(sc as unknown as SubCategory)
      }
    }
  }
  return map
})
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
    <AppHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Hero Section -->
      <section class="text-center mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-5">
          <span>🇮🇩</span>
          <span>Platform untuk Guru Indonesia</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-100 mb-3 sm:mb-4 leading-tight">
          Checklist Praktik Terbaik<br class="hidden sm:block">
          <span class="text-amber-600 dark:text-amber-400">Pembelajaran</span>
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Pantau dan tingkatkan kualitas mengajar Anda dengan <strong class="text-zinc-900 dark:text-zinc-200">praktik terbaik</strong> terstruktur dalam {{ categories?.length ?? 0 }} kategori pembelajaran.
        </p>
      </section>

      <!-- Category Grid -->
      <section aria-label="Daftar Kategori Pembelajaran">
        <h2 class="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-5 bg-amber-500 rounded-full inline-block" aria-hidden="true" />
          {{ categories?.length ?? 0 }} Kategori Pembelajaran
        </h2>

        <div
          v-if="categories?.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-5"
        >
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category as unknown as Category"
            :sub-categories="subcategoriesByParent[category.id] ?? []"
          />
        </div>

        <div
          v-else
          class="text-center py-16 text-zinc-400 dark:text-zinc-600"
        >
          <AnimatedIcon icon="📭" size="xl" class="mx-auto mb-3" />
          <p class="font-medium">Kategori belum tersedia</p>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="mt-16 border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
      <p>CeklisGuru.id — Dibuat dengan ❤️ untuk Guru Indonesia</p>
    </footer>
  </div>
</template>
