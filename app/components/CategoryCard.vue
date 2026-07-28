<script setup lang="ts">
import type { Category, SubCategory } from '~/types/checklist'

interface Props {
  category: Category
  subCategories?: SubCategory[]
}

const props = withDefaults(defineProps<Props>(), {
  subCategories: () => [],
})

const store = useChecklistStore()

// Self-contained fallback query: if props.subCategories is empty, fetch them by category slug
const { data: fetchedSubCats } = await useAsyncData(`subcats-card-${props.category.slug}`, () =>
  queryCollection('subcategories').where('parentSlug', '=', props.category.slug).order('stem', 'ASC').all(),
)

// Active list of subcategories to display
const activeSubCategories = computed<SubCategory[]>(() => {
  if (props.subCategories && props.subCategories.length > 0) {
    return props.subCategories
  }
  return (fetchedSubCats.value as unknown as SubCategory[]) ?? []
})

const totalItems = computed(() =>
  activeSubCategories.value.reduce((sum, sc) => sum + (sc.items?.length ?? 0), 0),
)

const completedItems = computed(() =>
  activeSubCategories.value.reduce((sum, sc) => sum + store.getCategoryCompleted(sc.id), 0),
)

const progress = computed(() =>
  totalItems.value > 0 ? Math.round((completedItems.value / totalItems.value) * 100) : 0,
)

function getSubCatProgress(sc: SubCategory) {
  return store.getCategoryProgress(sc.id, sc.items?.length ?? 0)
}

function getSubCatCompleted(sc: SubCategory) {
  return store.getCategoryCompleted(sc.id)
}
</script>

<template>
  <div
    class="category-card flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
  >
    <!-- Card Header -->
    <div class="flex items-center justify-between px-5 pt-5 pb-4">
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <AnimatedIcon :icon="category.icon" size="xl" />
        <UTooltip :text="category.name" :ui="{ content: 'font-normal', text: 'font-normal' }" class="min-w-0 font-normal">
          <h2 class="font-extrabold text-zinc-900 dark:text-zinc-100 text-base leading-snug truncate">
            {{ category.name }}
          </h2>
        </UTooltip>
      </div>
      <NuxtLink
        :to="`/categories/${category.slug}`"
        :id="`view-all-${category.id}`"
        class="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200 dark:border-zinc-700 transition-colors whitespace-nowrap"
        :aria-label="`Lihat semua sub-topik ${category.name}`"
      >
        Lihat →
      </NuxtLink>
    </div>

    <!-- Sub-category Chip Pills -->
    <div class="px-5 pb-5 flex-1">
      <div
        v-if="activeSubCategories.length > 0"
        class="grid grid-cols-2 gap-2"
      >
        <UTooltip
          v-for="sc in activeSubCategories"
          :key="sc.id"
          :text="sc.name"
          :ui="{ content: 'font-normal', text: 'font-normal' }"
          class="w-full min-w-0 font-normal"
        >
          <NuxtLink
            :to="`/categories/${category.slug}/${sc.slug}`"
            :id="`chip-${sc.id}`"
            class="group flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 w-full min-w-0"
            :class="getSubCatProgress(sc) === 100
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
              : getSubCatCompleted(sc) > 0
                ? 'bg-emerald-50/40 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-zinc-800 dark:text-zinc-200'
                : 'bg-zinc-50/80 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500'"
          >
            <AnimatedIcon :icon="sc.icon" size="sm" />
            <span class="truncate leading-tight flex-1 min-w-0">{{ sc.name }}</span>
            
            <span
              v-if="getSubCatProgress(sc) === 100"
              class="ml-auto shrink-0 text-emerald-600 dark:text-emerald-400 font-bold"
              aria-label="Selesai"
            >✓</span>
            <span
              v-else-if="getSubCatCompleted(sc) > 0"
              class="ml-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold"
            >{{ getSubCatCompleted(sc) }}/{{ sc.items?.length }}</span>
          </NuxtLink>
        </UTooltip>
      </div>

      <!-- Loading / Empty skeleton placeholder -->
      <div v-else class="grid grid-cols-2 gap-2">
        <div class="h-9 rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-pulse" />
        <div class="h-9 rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-pulse" />
      </div>
    </div>

    <!-- Progress bar footer -->
    <div class="px-5 pb-4 pt-3 border-t border-black/5 dark:border-white/5 mt-auto bg-black/2 dark:bg-white/2">
      <ProgressBar
        :value="progress"
        :total="totalItems"
        :completed="completedItems"
        size="sm"
        show-label
        show-count
      />
    </div>
  </div>
</template>
