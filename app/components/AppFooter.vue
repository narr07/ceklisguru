<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        CeklisGuru, ceklis mengajar untuk guru Indonesia
      </p>
    </template>

    <template #right>
      <nav
        aria-label="Tautan footer"
        class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted"
      >
        <ULink
          to="/panduan"
          active-class="text-highlighted"
          inactive-class="text-muted hover:text-highlighted"
        >
          Panduan menambah butir
        </ULink>
        <span>
          Dibuat oleh
          <ULink
            to="https://permadi.dev"
            target="_blank"
            class="font-semibold text-highlighted underline decoration-primary underline-offset-2"
          >narr07</ULink>
        </span>
      </nav>
    </template>
  </UFooter>
</template>
