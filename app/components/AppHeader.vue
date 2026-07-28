<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleDark() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Title -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 group"
        >
          <div class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center shadow-xs">
            <AnimatedIcon icon="✅" size="md" />
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">CeklisGuru</span>
            <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold leading-tight hidden sm:block">Platform Checklist Guru Indonesia</span>
          </div>
        </NuxtLink>

        <!-- Dark Mode Toggle -->
        <ClientOnly>
          <button
            id="dark-mode-toggle"
            class="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark"
          >
            <span class="text-lg">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
          <template #fallback>
            <div class="w-9 h-9 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
