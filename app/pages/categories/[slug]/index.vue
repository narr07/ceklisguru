<script setup lang="ts">
import type { Category, SubCategory } from '~/types/checklist'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: category, error } = await useAsyncData(`category-${slug.value}`, () =>
  queryCollection('categories').where('slug', '=', slug.value).first(),
)

const { data: subCategories } = await useAsyncData(`subcats-${slug.value}`, () =>
  queryCollection('subcategories').where('parentSlug', '=', slug.value).order('stem', 'ASC').all(),
)

if (!category.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Kategori tidak ditemukan' })
}

const store = useChecklistStore()

const totalItems = computed(() =>
  (subCategories.value ?? []).reduce((sum: number, sc: any) => sum + sc.items.length, 0),
)
const completedItems = computed(() =>
  (subCategories.value ?? []).reduce((sum: number, sc: any) => sum + store.getCategoryCompleted(sc.id), 0),
)
const progress = computed(() =>
  totalItems.value > 0 ? Math.round((completedItems.value / totalItems.value) * 100) : 0,
)

// SEO
useHead({
  title: computed(() => category.value
    ? `${category.value.name} — CeklisGuru`
    : 'Kategori — CeklisGuru',
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => category.value?.description ?? ''),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
    <AppHeader />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <!-- Error State -->
      <div v-if="error || !category" class="text-center py-20">
        <p class="text-5xl mb-4">😕</p>
        <h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
          Kategori tidak ditemukan
        </h1>
        <NuxtLink to="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors mt-4">
          ← Kembali ke Beranda
        </NuxtLink>
      </div>

      <template v-else>
        <!-- Header with breadcrumb -->
        <CategoryHeader
          :category="category as unknown as Category"
          :progress="progress"
          :completed="completedItems"
          :total="totalItems"
          :sub-category-ids="(subCategories ?? []).map(sc => sc.id)"
        />

        <!-- Sub-category grid -->
        <section :aria-label="`Sub-topik ${category.name}`">
          <h2 class="text-base font-bold text-zinc-700 dark:text-zinc-300 mb-4 flex items-center gap-2">
            <span class="w-1.5 h-5 bg-amber-500 rounded-full inline-block" aria-hidden="true" />
            {{ subCategories?.length ?? 0 }} Sub-topik
          </h2>

          <div
            v-if="subCategories?.length"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <NuxtLink
              v-for="sc in subCategories"
              :key="sc.id"
              :to="`/categories/${category.slug}/${sc.slug}`"
              :id="`subcat-card-${sc.id}`"
              class="group flex items-start gap-4 p-5 rounded-2xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer"
              :class="[
                store.getCategoryProgress(sc.id, sc.items.length) === 100
                  ? 'border-amber-400 dark:border-amber-600 bg-amber-50/30 dark:bg-amber-950/20'
                  : ''
              ]"
            >
              <AnimatedIcon :icon="sc.icon" size="lg" class="mt-0.5" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <h3 class="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {{ sc.name }}
                  </h3>
                  <span
                    v-if="store.getCategoryProgress(sc.id, sc.items.length) === 100"
                    class="shrink-0 text-xs font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full"
                  >✓ Selesai</span>
                  <span v-else class="shrink-0 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    {{ sc.items.length }} items
                  </span>
                </div>
                <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {{ sc.description }}
                </p>
                <div class="mt-3">
                  <ProgressBar
                    :value="store.getCategoryProgress(sc.id, sc.items.length)"
                    :total="sc.items.length"
                    :completed="store.getCategoryCompleted(sc.id)"
                    size="sm"
                    :show-label="false"
                    :show-count="false"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="text-center py-12 text-zinc-400 dark:text-zinc-600">
            <AnimatedIcon icon="📭" size="xl" class="mx-auto mb-2" />
            <p>Belum ada sub-topik</p>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>
