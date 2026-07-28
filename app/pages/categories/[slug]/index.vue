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
  <div class="min-h-screen bg-white">
    <AppHeader />

    <UContainer class="max-w-4xl py-8 sm:py-10">
      <!-- Error State -->
      <div v-if="error || !category" class="text-center py-20">
        <p class="text-5xl mb-4">😕</p>
        <h1 class="text-2xl font-bold text-zinc-800 mb-2">
          Kategori tidak ditemukan
        </h1>
        <UButton
          to="/"
          color="yellow"
          size="md"
          class="font-semibold rounded-xl mt-4"
        >
          ← Kembali ke Beranda
        </UButton>
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
          <h2 class="text-base font-bold text-zinc-700 mb-4 flex items-center gap-2">
            <span class="w-1.5 h-5 bg-yellow-500 rounded-full inline-block" aria-hidden="true" />
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
              class="group flex items-start gap-4 p-5 rounded-2xl border bg-white border-zinc-200 hover:border-zinc-300 transition-all duration-200 cursor-pointer shadow-xs"
              :class="[
                store.getCategoryProgress(sc.id, sc.items.length) === 100
                  ? 'border-yellow-400 bg-yellow-50/30'
                  : ''
              ]"
            >
              <AnimatedIcon :icon="sc.icon" size="lg" class="mt-0.5 shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <h3 class="font-bold text-zinc-900 text-sm sm:text-base group-hover:text-yellow-600 transition-colors truncate">
                    {{ sc.name }}
                  </h3>
                  <UBadge
                    v-if="store.getCategoryProgress(sc.id, sc.items.length) === 100"
                    color="yellow"
                    variant="soft"
                    size="xs"
                    class="shrink-0 font-bold"
                  >
                    ✓ Selesai
                  </UBadge>
                  <span v-else class="shrink-0 text-xs text-zinc-400 font-medium">
                    {{ sc.items.length }} items
                  </span>
                </div>
                <p class="text-xs text-zinc-600 leading-relaxed line-clamp-2">
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

          <div v-else class="text-center py-12 text-zinc-400">
            <AnimatedIcon icon="📭" size="xl" class="mx-auto mb-2" />
            <p>Belum ada sub-topik</p>
          </div>
        </section>
      </template>
    </UContainer>
  </div>
</template>
