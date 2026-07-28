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
  <UCard 
    class="flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs hover:border-yellow-300 hover:shadow-sm transition-all duration-200 h-full"
    :ui="{
      header: 'p-5 pb-4',
      body: 'px-5 py-2 flex-1',
      footer: 'px-5 py-3 border-t border-zinc-100 bg-zinc-50/50 mt-auto',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <AnimatedIcon :icon="category.icon" size="xl" />
          <UTooltip :text="category.name" class="min-w-0 font-normal">
            <h2 class="font-extrabold text-zinc-900 text-base leading-snug truncate">
              {{ category.name }}
            </h2>
          </UTooltip>
        </div>
        <UButton
          :to="`/categories/${category.slug}`"
          :id="`view-all-${category.id}`"
          color="neutral"
          variant="subtle"
          size="xs"
          class="rounded-xl font-semibold shrink-0 cursor-pointer"
          :aria-label="`Lihat semua sub-topik ${category.name}`"
        >
          Lihat →
        </UButton>
      </div>
    </template>

    <!-- Sub-category Chip Pills -->
    <div
      v-if="activeSubCategories.length > 0"
      class="grid grid-cols-2 gap-2 my-1"
    >
      <UTooltip
        v-for="sc in activeSubCategories"
        :key="sc.id"
        :text="sc.name"
        class="w-full min-w-0 font-normal"
      >
        <NuxtLink
          :to="`/categories/${category.slug}/${sc.slug}`"
          :id="`chip-${sc.id}`"
          class="group flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 w-full min-w-0"
          :class="getSubCatProgress(sc) === 100
            ? 'bg-yellow-50 border-yellow-300 text-yellow-900'
            : getSubCatCompleted(sc) > 0
              ? 'bg-yellow-50/40 border-yellow-200 text-zinc-800'
              : 'bg-zinc-50/80 border-zinc-200 text-zinc-800 hover:border-zinc-400'"
        >
          <AnimatedIcon :icon="sc.icon" size="sm" />
          <span class="truncate leading-tight flex-1 min-w-0">{{ sc.name }}</span>
          
          <UBadge
            v-if="getSubCatProgress(sc) === 100"
            color="primary"
            variant="soft"
            size="xs"
            class="ml-auto shrink-0 font-bold"
          >
            ✓
          </UBadge>
          <UBadge
            v-else-if="getSubCatCompleted(sc) > 0"
            color="primary"
            variant="subtle"
            size="xs"
            class="ml-auto shrink-0 text-[10px] font-bold"
          >
            {{ getSubCatCompleted(sc) }}/{{ sc.items?.length }}
          </UBadge>
        </NuxtLink>
      </UTooltip>
    </div>

    <!-- Loading / Empty skeleton placeholder -->
    <div v-else class="grid grid-cols-2 gap-2 my-1">
      <USkeleton class="h-9 rounded-xl" />
      <USkeleton class="h-9 rounded-xl" />
    </div>

    <!-- Progress bar footer -->
    <template #footer>
      <ProgressBar
        :value="progress"
        :total="totalItems"
        :completed="completedItems"
        size="sm"
        show-label
        show-count
      />
    </template>
  </UCard>
</template>
