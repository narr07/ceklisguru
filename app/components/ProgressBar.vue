<script setup lang="ts">
interface Props {
  value: number
  total?: number
  completed?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  completed: 0,
  size: 'md',
  showLabel: true,
  showCount: false,
})

const heightClass = computed(() => ({
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}[props.size]))

const labelSize = computed(() => ({
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}[props.size]))
</script>

<template>
  <div class="w-full">
    <div
      v-if="showLabel || showCount"
      class="flex items-center justify-between mb-1.5"
    >
      <span
        v-if="showCount && total > 0"
        :class="[labelSize, 'text-gray-500 dark:text-gray-400 font-medium']"
      >
        {{ completed }}/{{ total }} selesai
      </span>
      <span
        v-if="showLabel"
        :class="[labelSize, 'font-bold text-amber-600 dark:text-amber-400 ml-auto']"
      >
        {{ value }}%
      </span>
    </div>
    <div
      class="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden"
      :class="heightClass"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="value > 0 ? 'progress-bar-fill' : 'bg-zinc-200 dark:bg-zinc-700'"
        :style="{ width: `${Math.max(value, value > 0 ? 3 : 0)}%` }"
      />
    </div>
  </div>
</template>
