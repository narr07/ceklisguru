<script setup lang="ts">
import type { SubCategory } from '~/types/checklist'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const subslug = computed(() => route.params.subslug as string)

const { data: subcategory, error } = await useAsyncData(
  `subcat-${slug.value}-${subslug.value}`,
  () => queryCollection('subcategories')
    .where('slug', '=', subslug.value)
    .where('parentSlug', '=', slug.value)
    .first(),
)

if (!subcategory.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sub-topik tidak ditemukan' })
}

const store = useChecklistStore()

const progress = computed(() =>
  subcategory.value
    ? store.getCategoryProgress(subcategory.value.id, subcategory.value.items.length)
    : 0,
)
const completed = computed(() =>
  subcategory.value ? store.getCategoryCompleted(subcategory.value.id) : 0,
)
const total = computed(() => subcategory.value?.items.length ?? 0)

// SEO
useHead({
  title: computed(() => subcategory.value
    ? `${subcategory.value.name} — ${subcategory.value.parentName} — CeklisGuru`
    : 'Checklist — CeklisGuru',
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => subcategory.value
        ? `${subcategory.value.description} — ${subcategory.value.items.length} checklist praktik terbaik.`
        : '',
      ),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
    <AppHeader />

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <!-- Error State -->
      <div v-if="error || !subcategory" class="text-center py-20">
        <p class="text-5xl mb-4">😕</p>
        <h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
          Sub-topik tidak ditemukan
        </h1>
        <NuxtLink
          :to="`/categories/${slug}`"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors mt-4"
        >
          ← Kembali ke Kategori
        </NuxtLink>
      </div>

      <template v-else>
        <!-- Header with breadcrumb + back to parent -->
        <CategoryHeader
          :category="subcategory as unknown as SubCategory"
          :parent-name="subcategory.parentName"
          :parent-slug="subcategory.parentSlug"
          :progress="progress"
          :completed="completed"
          :total="total"
        />

        <!-- Checklist items -->
        <section :aria-label="`Checklist ${subcategory.name}`">
          <ul class="space-y-3" role="group">
            <ChecklistItem
              v-for="item in subcategory.items"
              :key="item.id"
              :item="item"
              :category-id="subcategory.id"
            />
          </ul>
        </section>

        <!-- Bottom nav -->
        <div class="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <NuxtLink
            :to="`/categories/${subcategory.parentSlug}`"
            class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            ← {{ subcategory.parentName }}
          </NuxtLink>
          <p class="text-sm font-medium text-zinc-400 dark:text-zinc-500">
            {{ total }} checklist
          </p>
        </div>
      </template>
    </main>
  </div>
</template>
