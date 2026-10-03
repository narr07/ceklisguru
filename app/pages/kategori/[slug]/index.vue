<script setup lang="ts">
import type { Category } from '~/types/checklist'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: category, error } = await useAsyncData(`category-${slug.value}`, () =>
  queryCollection('categories').where('slug', '=', slug.value).first(),
)

const { data: subCategories } = await useAsyncData(`subcats-${slug.value}`, async () =>
  (await queryCollection('subcategories').where('parentSlug', '=', slug.value).all()).sort(byFileNumber),
)

if (!category.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Kategori tidak ditemukan' })
}

const store = useChecklistStore()

const totalItems = computed(() =>
  (subCategories.value ?? []).reduce((sum, sc) => sum + sc.items.length, 0),
)
const completedItems = computed(() =>
  (subCategories.value ?? []).reduce((sum, sc) => sum + store.getCategoryCompleted(sc.id), 0),
)
const progress = computed(() =>
  totalItems.value > 0 ? Math.round((completedItems.value / totalItems.value) * 100) : 0,
)

// SEO
useHead({
  title: computed(() => category.value
    ? `${category.value.name} · CeklisGuru`
    : 'Kategori · CeklisGuru',
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
  <div class="min-h-screen bg-default">
    <AppHeader />

    <UContainer class="max-w-4xl py-8 sm:py-10">
      <UEmpty
        v-if="error || !category"
        icon="i-lucide-search-x"
        title="Kategori tidak ditemukan"
        description="Alamatnya mungkin salah ketik, atau kategorinya sudah diganti."
        :actions="[{ label: 'Kembali ke Beranda', icon: 'i-lucide-arrow-left', to: '/' }]"
      />

      <template v-else>
        <CategoryHeader
          :category="category as unknown as Category"
          :progress="progress"
          :completed="completedItems"
          :total="totalItems"
          :sub-category-ids="(subCategories ?? []).map(sc => sc.id)"
        />

        <section :aria-label="`Sub-topik ${category.name}`">
          <h2 class="mb-4 flex items-center gap-2 text-base font-bold text-highlighted">
            <span
              class="inline-block h-5 w-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            {{ subCategories?.length ?? 0 }} Sub-topik
          </h2>

          <div
            v-if="subCategories?.length"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <NuxtLink
              v-for="sc in subCategories"
              :id="`subcat-card-${sc.id}`"
              :key="sc.id"
              :to="`/kategori/${category.slug}/${sc.slug}`"
              class="group flex items-start gap-4 rounded-2xl border bg-default p-5 shadow-xs transition-colors"
              :class="store.getCategoryProgress(sc.id, sc.items.length) === 100
                ? 'border-primary/50 bg-primary/5'
                : 'border-default hover:border-accented'"
            >
              <AnimatedIcon
                :icon="sc.icon"
                size="lg"
                class="mt-0.5 shrink-0"
              />
              <div class="min-w-0 flex-1">
                <div class="mb-1 flex items-center justify-between gap-2">
                  <h3 class="truncate text-sm font-bold text-highlighted group-hover:underline sm:text-base">
                    {{ sc.name }}
                  </h3>
                  <UBadge
                    v-if="store.getCategoryProgress(sc.id, sc.items.length) === 100"
                    color="neutral"
                    variant="subtle"
                    size="sm"
                    icon="i-lucide-circle-check"
                    label="Selesai"
                    class="shrink-0"
                  />
                  <span
                    v-else
                    class="shrink-0 text-xs font-medium text-muted"
                  >
                    {{ sc.items.length }} butir
                  </span>
                </div>
                <p class="line-clamp-2 text-xs leading-relaxed text-muted">
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

          <UEmpty
            v-else
            icon="i-lucide-inbox"
            title="Belum ada sub-topik"
            description="Sub-topik untuk kategori ini sedang disusun."
          />
        </section>
      </template>
    </UContainer>
  </div>
</template>
