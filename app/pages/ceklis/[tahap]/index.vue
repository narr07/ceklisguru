<script setup lang="ts">
const route = useRoute()
const { data: tahapList } = await useSemuaTahap()
const { data: topikList } = await useSemuaTopik()

const tahap = computed(() => tahapList.value?.find(t => t.slug === route.params.tahap))
if (!tahap.value) {
  throw createError({ statusCode: 404, statusMessage: 'Tahap tidak ditemukan' })
}

const store = useChecklistStore()
const alur = computed(() => (tahapList.value ?? []).filter(t => t.jenis === 'tahap'))
const nomor = computed(() => alur.value.findIndex(t => t.kunci === tahap.value?.kunci) + 1)
const topik = computed(() => (topikList.value ?? []).filter(t => t.tahap === tahap.value?.kunci))

const total = computed(() => topik.value.reduce((n, t) => n + t.butir.length, 0))
const done = computed(() => topik.value.reduce((n, t) => n + store.countDone(t.kunci, butirKeys(t)), 0))

const sebelum = computed(() => nomor.value > 1 ? alur.value[nomor.value - 2] : undefined)
const sesudah = computed(() => nomor.value > 0 ? alur.value[nomor.value] : undefined)

useSeoMeta({
  title: () => `${tahap.value?.nama} · CeklisGuru`,
  description: () => tahap.value?.ringkasan,
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <AppHeader />

    <UContainer
      v-if="tahap"
      class="max-w-4xl py-8 sm:py-10"
    >
      <PageHeader
        :title="tahap.nama"
        :description="tahap.ringkasan"
        :icon="tahap.ikon"
        :eyebrow="nomor > 0 ? `Tahap ${nomor} dari ${alur.length}` : 'Modul untuk tim sekolah'"
        :breadcrumb="[{ label: 'Beranda', icon: 'i-lucide-house', to: '/' }, { label: tahap.nama }]"
        :done="done"
        :total="total"
        :reset-keys="topik.map(t => t.kunci)"
      />

      <section aria-label="Topik">
        <ul
          v-if="topik.length"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <li
            v-for="t in topik"
            :key="t.kunci"
          >
            <NuxtLink
              :to="topikUrl(t, tahapList ?? [])"
              class="group flex h-full items-start gap-4 rounded-2xl border border-default bg-default p-5 transition-colors hover:border-accented"
            >
              <UIcon
                :name="t.ikon"
                mode="svg"
                class="app-icon shrink-0 size-8"
              />
              <div class="min-w-0 flex-1">
                <h2 class="font-bold text-highlighted group-hover:underline">
                  {{ t.judul }}
                </h2>
                <p class="mt-1 text-sm leading-relaxed text-muted">
                  {{ t.ringkasan }}
                </p>
                <p class="mt-3 text-xs font-semibold text-muted tabular-nums">
                  {{ store.loaded ? store.countDone(t.kunci, butirKeys(t)) : '–' }} dari {{ t.butir.length }} butir
                </p>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <UEmpty
          v-else
          icon="i-lucide-pencil-line"
          title="Topik untuk tahap ini sedang disusun"
          description="Isinya sedang disusun dari dokumen resmi Kemendikdasmen. Sementara itu, kamu bisa mulai dari tahap lain."
          :actions="[{ label: 'Kembali ke Beranda', icon: 'i-lucide-arrow-left', to: '/', color: 'neutral', variant: 'subtle' }]"
        />
      </section>

      <nav
        v-if="sebelum || sesudah"
        aria-label="Tahap lain"
        class="mt-10 flex flex-wrap justify-between gap-3 border-t border-default pt-6"
      >
        <UButton
          v-if="sebelum"
          :to="`/ceklis/${sebelum.slug}`"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          :label="sebelum.nama"
        />
        <UButton
          v-if="sesudah"
          :to="`/ceklis/${sesudah.slug}`"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-arrow-right"
          :label="sesudah.nama"
          class="ms-auto"
        />
      </nav>
    </UContainer>
  </div>
</template>
