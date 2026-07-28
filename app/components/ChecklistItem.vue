<script setup lang="ts">
import type { ChecklistItem } from '~/types/checklist'

interface Props {
  item: ChecklistItem
  categoryId: string
}

const props = defineProps<Props>()

const store = useChecklistStore()

const isChecked = computed(() =>
  store.getProgress(props.categoryId, props.item.id),
)

function toggle() {
  store.toggleItem(props.categoryId, props.item.id)
}
</script>

<template>
  <li
    class="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none"
    :class="isChecked
      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/80'
      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40'"
    :id="`checklist-item-${item.id}`"
    role="checkbox"
    :aria-checked="isChecked"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
  >
    <!-- Custom Checkbox -->
    <div class="flex-shrink-0 mt-0.5">
      <div
        class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200"
        :class="isChecked
          ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500 text-white'
          : 'border-zinc-300 dark:border-zinc-600 group-hover:border-emerald-500 dark:group-hover:border-emerald-400'"
      >
        <Transition
          enter-active-class="transition-all duration-150"
          enter-from-class="scale-0 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition-all duration-100"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-0 opacity-0"
        >
          <svg
            v-if="isChecked"
            class="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </Transition>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p
        class="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base leading-snug transition-all duration-200"
        :class="isChecked ? 'checklist-title-completed' : ''"
      >
        {{ item.title }}
      </p>
      <p
        class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
        :class="isChecked ? 'opacity-60' : ''"
      >
        {{ item.description }}
      </p>

      <!-- Optional Tip -->
      <div
        v-if="item.tip"
        class="mt-2.5 flex items-start gap-2.5 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 leading-relaxed transition-opacity"
        :class="isChecked ? 'opacity-60' : ''"
      >
        <AnimatedIcon icon="💡" size="sm" />
        <span>{{ item.tip }}</span>
      </div>
    </div>
  </li>
</template>
