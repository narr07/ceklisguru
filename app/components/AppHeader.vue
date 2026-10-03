<template>
  <UHeader :toggle="false">
    <template #title>
      <span class="flex items-center gap-3">
        <span class="flex size-9 items-center justify-center rounded-xl border border-default bg-elevated">
          <img
            src="/apple-touch-icon.png"
            alt=""
            class="size-6 object-contain"
          >
        </span>
        <span class="text-lg font-black text-highlighted">CeklisGuru</span>
      </span>
    </template>

    <template #right>
      <SettingsMenu />
    </template>
  </UHeader>
</template>
