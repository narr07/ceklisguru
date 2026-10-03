<template>
  <UHeader :toggle="false">
    <template #title>
      <span class="flex items-center gap-3">
        <span class="flex size-9 items-center justify-center rounded-xl border border-default bg-elevated">
          <UIcon
            name="ceklis:logo"
            mode="svg"
            class="app-icon size-7"
          />
        </span>
        <span class="text-lg font-black text-highlighted">CeklisGuru</span>
      </span>
    </template>

    <template #right>
      <SettingsMenu />
    </template>
  </UHeader>
</template>
