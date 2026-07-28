<script setup lang="ts">
import type { Category, SubCategory } from '~/types/checklist'

interface Props {
  // Accepts either a Category or SubCategory
  category: Category | SubCategory
  // For sub-category pages — parent info for breadcrumb
  parentName?: string
  parentSlug?: string
  // Progress for this page
  progress: number
  completed: number
  total: number
  // Sub-category IDs if this is a parent category
  subCategoryIds?: string[]
  // Show reset button flag (optional, default true)
  allowReset?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  allowReset: true,
  subCategoryIds: () => [],
})

const emit = defineEmits<{
  reset: []
}>()

const store = useChecklistStore()
const isSubCategory = computed(() => 'parentSlug' in props.category)

function handleReset() {
  if (props.subCategoryIds.length > 0) {
    store.resetMultipleCategoriesProgress(props.subCategoryIds)
  } else {
    store.resetCategoryProgress(props.category.id)
  }
  emit('reset')
}
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 mb-6 sm:mb-8">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none" aria-hidden="true">
      <AnimatedIcon :icon="category.icon" class="w-28 h-28 sm:w-36 sm:h-36" />
    </div>

    <!-- Breadcrumb navigation -->
    <nav class="flex items-center gap-1.5 text-xs font-medium mb-4 flex-wrap text-zinc-500 dark:text-zinc-400" aria-label="Breadcrumb">
      <NuxtLink
        to="/"
        class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        Beranda
      </NuxtLink>
      <span class="opacity-40">/</span>

      <!-- If sub-category: show parent link -->
      <template v-if="isSubCategory && parentSlug && parentName">
        <NuxtLink
          :to="`/categories/${parentSlug}`"
          class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          {{ parentName }}
        </NuxtLink>
        <span class="opacity-40">/</span>
        <span class="text-zinc-900 dark:text-zinc-100 font-semibold">{{ category.name }}</span>
      </template>

      <!-- If top-level category page -->
      <template v-else>
        <span class="text-zinc-900 dark:text-zinc-100 font-semibold">{{ category.name }}</span>
      </template>
    </nav>

    <!-- Back Button -->
    <NuxtLink
      :to="isSubCategory && parentSlug ? `/categories/${parentSlug}` : '/'"
      id="back-to-parent"
      class="inline-flex items-center gap-2 text-sm font-semibold mb-5 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {{ isSubCategory && parentName ? `Kembali ke ${parentName}` : 'Kembali ke Beranda' }}
    </NuxtLink>

    <!-- Title -->
    <div class="flex items-center gap-3 mb-2">
      <AnimatedIcon :icon="category.icon" size="xl" />
      <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
        {{ category.name }}
      </h1>
    </div>
    <p class="text-zinc-600 dark:text-zinc-400 mb-5 text-sm sm:text-base max-w-2xl">
      {{ category.description }}
    </p>

    <!-- Progress Summary & Reset Button -->
    <div class="flex items-center justify-between gap-4 mb-4 flex-wrap">
      <div class="flex items-center gap-3">
        <div class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <span class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ completed }}</span>
          <span class="text-zinc-400 dark:text-zinc-500">/{{ total }}</span>
          <span class="ml-1">selesai</span>
        </div>
        <div
          v-if="progress === 100"
          class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold"
        >
          <AnimatedIcon icon="🎉" size="xs" />
          <span>Selesai!</span>
        </div>
      </div>

      <!-- Reset button -->
      <button
        v-if="allowReset && completed > 0"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-all active:scale-95 cursor-pointer"
        title="Reset centang pada sub-topik ini"
        @click="handleReset"
      >
        <AnimatedIcon icon="🔄" size="xs" />
        <span>Reset Centang</span>
      </button>
    </div>

    <ProgressBar
      :value="progress"
      :total="total"
      :completed="completed"
      size="lg"
      show-label
      :show-count="false"
    />
  </div>
</template>
