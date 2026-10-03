<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
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
const confirmOpen = ref(false)

const breadcrumb = computed<BreadcrumbItem[]>(() => [
  { label: 'Beranda', icon: 'i-lucide-house', to: '/' },
  ...(isSubCategory.value && props.parentSlug && props.parentName
    ? [{ label: props.parentName, to: `/kategori/${props.parentSlug}` }]
    : []),
  { label: props.category.name },
])

function handleReset() {
  if (props.subCategoryIds.length > 0) {
    store.resetMultipleCategoriesProgress(props.subCategoryIds)
  }
  else {
    store.resetCategoryProgress(props.category.id)
  }
  confirmOpen.value = false
  emit('reset')
}
</script>

<template>
  <div class="relative mb-6 overflow-hidden rounded-2xl border border-default bg-default p-6 shadow-xs sm:mb-8 sm:p-8">
    <div
      class="pointer-events-none absolute top-0 right-0 p-4 opacity-10 select-none"
      aria-hidden="true"
    >
      <AnimatedIcon
        :icon="category.icon"
        size="w-28 h-28 sm:w-36 sm:h-36"
      />
    </div>

    <UBreadcrumb
      :items="breadcrumb"
      class="mb-5"
    />

    <div class="mb-2 flex items-center gap-3">
      <AnimatedIcon
        :icon="category.icon"
        size="xl"
      />
      <h1 class="text-2xl leading-tight font-extrabold text-highlighted sm:text-3xl">
        {{ category.name }}
      </h1>
    </div>
    <p class="mb-5 max-w-2xl text-sm text-muted sm:text-base">
      {{ category.description }}
    </p>

    <div class="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <p class="text-sm font-medium text-muted">
          <span class="text-2xl font-extrabold text-highlighted">{{ completed }}</span>
          <span>/{{ total }} selesai</span>
        </p>
        <UBadge
          v-if="progress === 100"
          color="neutral"
          variant="subtle"
          icon="i-lucide-party-popper"
          label="Selesai"
        />
      </div>

      <UModal
        v-if="allowReset && completed > 0"
        v-model:open="confirmOpen"
        :title="`Hapus semua centang di ${category.name}?`"
        :description="`${completed} centang akan hilang dari perangkat ini dan tidak bisa dikembalikan.`"
      >
        <UButton
          color="error"
          variant="soft"
          size="xs"
          icon="i-lucide-rotate-ccw"
          label="Hapus centang"
        />

        <template #footer>
          <div class="flex w-full justify-end gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              label="Batal"
              @click="confirmOpen = false"
            />
            <UButton
              color="error"
              label="Hapus centang"
              @click="handleReset"
            />
          </div>
        </template>
      </UModal>
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
