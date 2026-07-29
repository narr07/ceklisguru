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
  <div class="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 mb-6 sm:mb-8 shadow-xs">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none" aria-hidden="true">
      <AnimatedIcon :icon="category.icon" class="w-28 h-28 sm:w-36 sm:h-36" />
    </div>

    <!-- Breadcrumb navigation -->
    <nav class="flex items-center gap-1.5 text-xs font-medium mb-4 flex-wrap text-zinc-500" aria-label="Breadcrumb">
      <NuxtLink
        to="/"
        class="hover:text-zinc-900 transition-colors"
      >
        Beranda
      </NuxtLink>
      <span class="opacity-40">/</span>

      <!-- If sub-category: show parent link -->
      <template v-if="isSubCategory && parentSlug && parentName">
        <NuxtLink
          :to="`/kategori/${parentSlug}`"
          class="hover:text-zinc-900 transition-colors"
        >
          {{ parentName }}
        </NuxtLink>
        <span class="opacity-40">/</span>
        <span class="text-zinc-900 font-semibold">{{ category.name }}</span>
      </template>

      <!-- If top-level category page -->
      <template v-else>
        <span class="text-zinc-900 font-semibold">{{ category.name }}</span>
      </template>
    </nav>

    <!-- Back Button -->
    <UButton
      :to="isSubCategory && parentSlug ? `/kategori/${parentSlug}` : '/'"
      id="back-to-parent"
      color="neutral"
      variant="ghost"
      size="sm"
      class="mb-5 font-semibold text-zinc-700 hover:text-yellow-600 p-0 hover:bg-transparent"
    >
      ← {{ isSubCategory && parentName ? `Kembali ke ${parentName}` : 'Kembali ke Beranda' }}
    </UButton>

    <!-- Title -->
    <div class="flex items-center gap-3 mb-2">
      <AnimatedIcon :icon="category.icon" size="xl" />
      <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight">
        {{ category.name }}
      </h1>
    </div>
    <p class="text-zinc-600 mb-5 text-sm sm:text-base max-w-2xl">
      {{ category.description }}
    </p>

    <!-- Progress Summary & Reset Button -->
    <div class="flex items-center justify-between gap-4 mb-4 flex-wrap">
      <div class="flex items-center gap-3">
        <div class="text-sm font-medium text-zinc-600">
          <span class="text-2xl font-extrabold text-yellow-600">{{ completed }}</span>
          <span class="text-zinc-400">/{{ total }}</span>
          <span class="ml-1">selesai</span>
        </div>
        <UBadge
          v-if="progress === 100"
          color="primary"
          variant="soft"
          size="md"
          class="font-bold flex items-center gap-1"
        >
          <AnimatedIcon icon="🎉" size="xs" />
          <span>Selesai!</span>
        </UBadge>
      </div>

      <!-- Reset button -->
      <UButton
        v-if="allowReset && completed > 0"
        color="error"
        variant="soft"
        size="xs"
        class="rounded-xl font-medium cursor-pointer"
        title="Reset centang pada sub-topik ini"
        @click="handleReset"
      >
        <AnimatedIcon icon="🔄" size="xs" />
        <span>Reset Centang</span>
      </UButton>
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
