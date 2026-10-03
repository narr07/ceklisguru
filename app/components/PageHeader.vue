<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  title: string
  description: string
  icon: string
  breadcrumb: BreadcrumbItem[]
  // Small label above the title, e.g. "Tahap 2"
  eyebrow?: string
  done: number
  total: number
  // Topic keys whose progress the reset button clears
  resetKeys: string[]
}>()

const store = useChecklistStore()
const confirmOpen = ref(false)

const percent = computed(() => props.total > 0 ? Math.round((props.done / props.total) * 100) : 0)

function reset() {
  store.reset(props.resetKeys)
  confirmOpen.value = false
}
</script>

<template>
  <header class="mb-6 sm:mb-8">
    <UBreadcrumb
      :items="breadcrumb"
      class="mb-5"
    />

    <div class="flex items-start gap-4">
      <UIcon
        :name="icon"
        mode="svg"
        class="app-icon shrink-0 size-10 mt-1"
      />
      <div class="min-w-0">
        <p
          v-if="eyebrow"
          class="text-sm font-semibold text-muted"
        >
          {{ eyebrow }}
        </p>
        <h1 class="text-2xl leading-tight font-extrabold text-highlighted sm:text-3xl">
          {{ title }}
        </h1>
        <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          {{ description }}
        </p>
      </div>
    </div>

    <div
      v-if="total > 0"
      class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3"
    >
      <p class="text-sm text-muted">
        <span class="font-bold text-highlighted">{{ store.loaded ? done : '–' }}</span> dari {{ total }} butir selesai
      </p>
      <UProgress
        :model-value="store.loaded ? percent : null"
        class="min-w-32 flex-1"
        size="sm"
        :aria-label="`${percent}% selesai`"
      />

      <UModal
        v-if="done > 0"
        v-model:open="confirmOpen"
        title="Hapus semua centang di sini?"
        :description="`${done} centang di ${title} akan hilang dari perangkat ini dan tidak bisa dikembalikan.`"
      >
        <UButton
          color="neutral"
          variant="ghost"
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
              @click="reset"
            />
          </div>
        </template>
      </UModal>
    </div>
  </header>
</template>
