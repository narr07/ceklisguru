<script setup lang="ts">
interface Props {
  value?: number
  total?: number
  completed?: number
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
  showCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  total: 0,
  completed: 0,
  size: 'md',
  showLabel: true,
  showCount: false,
})

const progressValue = computed(() => {
  if (typeof props.value === 'number' && !isNaN(props.value)) {
    return Math.min(100, Math.max(0, props.value))
  }
  return 0
})

const labelSize = computed(() => ({
  '2xs': 'text-xs',
  'xs': 'text-xs',
  'sm': 'text-xs',
  'md': 'text-sm',
  'lg': 'text-base',
  'xl': 'text-lg',
}[props.size] || 'text-sm'))
</script>

<template>
  <div class="w-full">
    <div
      v-if="showLabel || showCount"
      class="flex items-center justify-between mb-1.5"
    >
      <span
        v-if="showCount && total > 0"
        :class="[labelSize, 'text-neutral-500 font-medium']"
      >
        {{ completed }}/{{ total }} selesai
      </span>
      <span
        v-if="showLabel"
        :class="[labelSize, 'font-bold text-primary-600 ml-auto']"
      >
        {{ progressValue }}%
      </span>
    </div>
    <UProgress
      :model-value="progressValue"
      :max="100"
      color="primary"
      :size="size"
      class="w-full"
    />
  </div>
</template>
