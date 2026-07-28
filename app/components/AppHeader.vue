<script setup lang="ts">
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Title -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 group"
        >
          <div class="w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center shadow-xs">
            <AnimatedIcon icon="✅" size="md" />
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-black text-zinc-900 leading-tight">CeklisGuru</span>
            <span class="text-xs text-yellow-600 font-semibold leading-tight hidden sm:block">Platform Checklist Guru Indonesia</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
