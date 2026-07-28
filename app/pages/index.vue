<script setup lang="ts">
import type { Category, SubCategory } from '~/types/checklist'

useHead({
  title: 'CeklisGuru - Praktik Terbaik Pembelajaran untuk Guru Indonesia',
  meta: [
    { name: 'description', content: 'Platform checklist interaktif untuk guru Indonesia. 8 kategori dengan sub-topik terstruktur, progress tracking, dan penyimpanan otomatis.' },
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
  <div class="min-h-screen bg-white">
    <AppHeader />

    <UContainer class="py-8 sm:py-12">
      <!-- Hero Section -->
      <section class="text-center mb-10 sm:mb-14">
        <UBadge
          color="primary"
          variant="soft"
          size="md"
          class="mb-5 uppercase font-bold tracking-wide rounded-full px-4 py-1.5"
        >
          🇮🇩 Platform untuk Guru Indonesia
        </UBadge>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 mb-3 sm:mb-4 leading-tight">
          Checklist Praktik Terbaik<br class="hidden sm:block">
          <span class="text-yellow-600">Pembelajaran</span>
        </h1>
        <p class="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Pantau dan tingkatkan kualitas mengajar Anda dengan <strong class="text-zinc-900">praktik terbaik</strong> terstruktur dalam {{ categories?.length ?? 0 }} kategori pembelajaran.
        </p>
      </section>

      <!-- Category Grid -->
      <section aria-label="Daftar Kategori Pembelajaran">
        <h2 class="text-lg sm:text-xl font-bold text-zinc-800 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-5 bg-yellow-500 rounded-full inline-block" aria-hidden="true" />
          {{ categories?.length ?? 0 }} Kategori Pembelajaran
        </h2>

        <div
          v-if="categories?.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
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
          class="text-center py-16 text-zinc-400"
        >
          <AnimatedIcon icon="📭" size="xl" class="mx-auto mb-3" />
          <p class="font-medium">Kategori belum tersedia</p>
        </div>
      </section>
    </UContainer>

    <!-- Footer -->
    <footer class="mt-16 border-t border-zinc-200 py-8 text-center text-sm text-zinc-400">
      <p>CeklisGuru.id — Dibuat dengan ❤️ untuk Guru Indonesia</p>
    </footer>
  </div>
</template>
