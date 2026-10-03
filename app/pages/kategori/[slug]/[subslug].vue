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
    ? `${subcategory.value.name} · ${subcategory.value.parentName} · CeklisGuru`
    : 'Ceklis · CeklisGuru',
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => subcategory.value
        ? `${subcategory.value.description} ${subcategory.value.items.length} butir ceklis.`
        : '',
      ),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <AppHeader />

    <UContainer class="max-w-3xl py-8 sm:py-10">
      <UEmpty
        v-if="error || !subcategory"
        icon="i-lucide-search-x"
        title="Sub-topik tidak ditemukan"
        description="Alamatnya mungkin salah ketik, atau sub-topiknya sudah diganti."
        :actions="[{ label: 'Kembali ke kategori', icon: 'i-lucide-arrow-left', to: `/kategori/${slug}` }]"
      />

      <template v-else>
        <CategoryHeader
          :category="subcategory as unknown as SubCategory"
          :parent-name="subcategory.parentName"
          :parent-slug="subcategory.parentSlug"
          :progress="progress"
          :completed="completed"
          :total="total"
        />

        <section :aria-label="`Ceklis ${subcategory.name}`">
          <ul class="space-y-3">
            <ChecklistItem
              v-for="item in subcategory.items"
              :key="item.id"
              :item="item"
              :category-id="subcategory.id"
            />
          </ul>
        </section>

        <div class="mt-10 flex items-center justify-between border-t border-default pt-6">
          <UButton
            :to="`/kategori/${subcategory.parentSlug}`"
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-arrow-left"
            :label="subcategory.parentName"
          />
          <p class="text-sm font-medium text-muted">
            {{ total }} butir
          </p>
        </div>
      </template>
    </UContainer>
  </div>
</template>
