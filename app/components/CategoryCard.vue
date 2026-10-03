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

const totalItems = computed(() =>
  props.subCategories.reduce((sum, sc) => sum + (sc.items?.length ?? 0), 0),
)

const completedItems = computed(() =>
  props.subCategories.reduce((sum, sc) => sum + store.getCategoryCompleted(sc.id), 0),
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
    class="flex h-full flex-col overflow-hidden rounded-2xl shadow-xs transition-colors hover:ring-accented"
    :ui="{
      header: 'p-5 pb-4',
      body: 'px-5 py-2 flex-1',
      footer: 'px-5 py-3 bg-elevated/50 mt-auto',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <AnimatedIcon
            :icon="category.icon"
            size="xl"
          />
          <UTooltip
            :text="category.name"
            class="min-w-0"
          >
            <h2 class="truncate text-base leading-snug font-extrabold text-highlighted">
              {{ category.name }}
            </h2>
          </UTooltip>
        </div>
        <UButton
          :id="`view-all-${category.id}`"
          :to="`/kategori/${category.slug}`"
          color="neutral"
          variant="subtle"
          size="xs"
          label="Buka"
          trailing-icon="i-lucide-arrow-right"
          class="shrink-0 rounded-xl font-semibold"
          :aria-label="`Buka ${category.name}`"
        />
      </div>
    </template>

    <div
      v-if="subCategories.length > 0"
      class="my-1 grid grid-cols-2 gap-2"
    >
      <UTooltip
        v-for="sc in subCategories"
        :key="sc.id"
        :text="sc.name"
        class="w-full min-w-0"
      >
        <NuxtLink
          :id="`chip-${sc.id}`"
          :to="`/kategori/${category.slug}/${sc.slug}`"
          class="flex w-full min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold text-highlighted transition-colors"
          :class="getSubCatProgress(sc) === 100
            ? 'border-primary/50 bg-primary/10'
            : getSubCatCompleted(sc) > 0
              ? 'border-primary/30 bg-primary/5'
              : 'border-default bg-elevated/50 hover:border-accented'"
        >
          <AnimatedIcon
            :icon="sc.icon"
            size="sm"
          />
          <span class="min-w-0 flex-1 truncate leading-tight">{{ sc.name }}</span>

          <UIcon
            v-if="getSubCatProgress(sc) === 100"
            name="i-lucide-circle-check"
            class="ml-auto size-4 shrink-0 text-primary"
            aria-label="Selesai"
          />
          <UBadge
            v-else-if="getSubCatCompleted(sc) > 0"
            color="neutral"
            variant="subtle"
            size="sm"
            class="ml-auto shrink-0 font-bold"
          >
            {{ getSubCatCompleted(sc) }}/{{ sc.items?.length }}
          </UBadge>
        </NuxtLink>
      </UTooltip>
    </div>

    <p
      v-else
      class="my-1 text-sm text-muted"
    >
      Belum ada sub-topik.
    </p>

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
