<script setup lang="ts">
import type { Tahap, Topik } from '~/composables/useCeklis'

const props = defineProps<{
  tahap: Tahap
  // Shown as "Tahap n"; modules outside the path pass nothing
  nomor?: number
  topik: Topik[]
  tahapList: Tahap[]
}>()

const store = useChecklistStore()

const total = computed(() => props.topik.reduce((n, t) => n + t.butir.length, 0))
const done = computed(() => props.topik.reduce((n, t) => n + store.countDone(t.kunci, butirKeys(t)), 0))
const percent = computed(() => total.value > 0 ? Math.round((done.value / total.value) * 100) : 0)

// First unchecked item, so the card says where to continue
const next = computed(() => {
  for (const t of props.topik) {
    const b = t.butir.find(b => !store.isChecked(t.kunci, b.kunci))
    if (b) return { url: topikUrl(t, props.tahapList), judul: b.judul }
  }
  return null
})
</script>

<template>
  <UCard
    class="relative flex h-full flex-col rounded-2xl transition-colors hover:ring-accented"
    :ui="{ body: 'flex flex-1 flex-col gap-4 p-5 sm:p-5' }"
  >
    <div class="flex items-start gap-3">
      <AppIcon
        :name="tahap.ikon"
        size="xl"
      />
      <div class="min-w-0">
        <p
          v-if="nomor"
          class="text-xs font-semibold text-muted"
        >
          Tahap {{ nomor }}
        </p>
        <h3 class="text-base leading-snug font-extrabold text-highlighted">
          <NuxtLink
            :to="`/ceklis/${tahap.slug}`"
            class="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {{ tahap.nama }}
          </NuxtLink>
        </h3>
      </div>
    </div>

    <p class="text-sm leading-relaxed text-muted">
      {{ tahap.ringkasan }}
    </p>

    <div class="mt-auto space-y-3">
      <template v-if="total > 0">
        <div class="flex items-center gap-3">
          <UProgress
            :model-value="store.loaded ? percent : null"
            size="sm"
            class="flex-1"
            :aria-label="`${tahap.nama}: ${percent}% selesai`"
          />
          <span class="text-xs font-semibold text-muted tabular-nums">
            {{ store.loaded ? done : '–' }}/{{ total }}
          </span>
        </div>
        <p
          v-if="store.loaded && next && done > 0"
          class="relative z-10 text-xs text-muted"
        >
          Lanjut:
          <NuxtLink
            :to="next.url"
            class="font-semibold text-highlighted underline decoration-primary underline-offset-2"
          >
            {{ next.judul }}
          </NuxtLink>
        </p>
        <p
          v-else-if="store.loaded && total > 0 && !next"
          class="text-xs font-semibold text-highlighted"
        >
          Semua butir di tahap ini sudah kamu centang.
        </p>
      </template>
      <UBadge
        v-else
        color="neutral"
        variant="subtle"
        icon="i-lucide-pencil-line"
        label="Sedang disusun"
      />
    </div>
  </UCard>
</template>
