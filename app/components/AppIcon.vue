<script setup lang="ts">
const props = withDefaults(defineProps<{
  // File name in public/icon, e.g. "018-notes.svg"
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  size: 'md',
})

const sizeClass = computed(() => ({
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-10',
}[props.size]))
</script>

<template>
  <!-- <use> keeps the file cached like <img>, but lets CSS variables reach the icon's colors -->
  <svg
    class="app-icon inline-block shrink-0 select-none"
    :class="sizeClass"
    aria-hidden="true"
    focusable="false"
  >
    <use
      :href="`/icon/${name}#icon`"
      width="100%"
      height="100%"
    />
  </svg>
</template>
