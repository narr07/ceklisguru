<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const store = useChecklistStore()
const { data: tahapList } = await useSemuaTahap()
const { data: topikList } = await useSemuaTopik()

const tahap = computed(() => tahapList.value?.find(t => t.slug === route.params.tahap))
const topik = computed(() => topikList.value?.find(t => t.slug === route.params.topik && t.tahap === tahap.value?.kunci))
if (!tahap.value || !topik.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topik tidak ditemukan' })
}

const alur = computed(() => (tahapList.value ?? []).filter(t => t.jenis === 'tahap'))
const nomor = computed(() => alur.value.findIndex(t => t.kunci === tahap.value?.kunci) + 1)
const done = computed(() => topik.value ? store.countDone(topik.value.kunci, butirKeys(topik.value)) : 0)

const terkait = computed(() => (topik.value?.terkait ?? [])
  .map(kunci => topikList.value?.find(t => t.kunci === kunci))
  .filter(t => t !== undefined))

async function salinCeklis() {
  if (!topik.value) return
  const t = topik.value
  const lines = [
    t.judul,
    ...t.butir.map(b => `${store.isChecked(t.kunci, b.kunci) ? '✅' : '⬜'} ${b.judul}`),
    '',
    `Dari CeklisGuru: ${window.location.href}`,
  ]
  try {
    await navigator.clipboard.writeText(lines.join('\n'))
    toast.add({ title: 'Ceklis disalin', description: 'Tempel di WhatsApp, catatan, atau dokumen.', icon: 'i-lucide-clipboard-check' })
  }
  catch {
    toast.add({ title: 'Ceklis belum tersalin', description: 'Browser menolak akses papan klip. Coba lagi, atau pilih teksnya secara manual.', color: 'error', icon: 'i-lucide-clipboard-x' })
  }
}

useSeoMeta({
  title: () => `${topik.value?.judul} · ${tahap.value?.nama} · CeklisGuru`,
  description: () => topik.value?.ringkasan,
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <AppHeader />

    <UContainer
      v-if="tahap && topik"
      class="max-w-5xl py-8 sm:py-10"
    >
      <PageHeader
        :title="topik.judul"
        :description="topik.ringkasan"
        :icon="topik.ikon"
        :eyebrow="nomor > 0 ? `Tahap ${nomor}: ${tahap.nama}` : tahap.nama"
        :breadcrumb="[
          { label: 'Beranda', icon: 'i-lucide-house', to: '/' },
          { label: tahap.nama, to: `/ceklis/${tahap.slug}` },
          { label: topik.judul },
        ]"
        :done="done"
        :total="topik.butir.length"
        :reset-keys="[topik.kunci]"
      />

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section
          class="lg:col-span-2"
          :aria-label="`Ceklis ${topik.judul}`"
        >
          <ul class="space-y-3">
            <ChecklistItem
              v-for="b in topik.butir"
              :key="b.kunci"
              :topik="topik.kunci"
              :butir="b"
            />
          </ul>
        </section>

        <aside class="space-y-6">
          <UButton
            block
            color="neutral"
            icon="i-lucide-copy"
            label="Salin ceklis"
            @click="salinCeklis"
          />

          <div v-if="terkait.length">
            <h2 class="mb-2 text-sm font-semibold text-muted">
              Topik terkait
            </h2>
            <ul class="space-y-1">
              <li
                v-for="t in terkait"
                :key="t.kunci"
              >
                <ULink
                  :to="topikUrl(t, tahapList ?? [])"
                  class="flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-highlighted hover:bg-elevated"
                >
                  <UIcon
                    :name="t.ikon"
                    mode="svg"
                    class="app-icon shrink-0 size-5"
                  />
                  {{ t.judul }}
                </ULink>
              </li>
            </ul>
          </div>

          <UButton
            :to="`/ceklis/${tahap.slug}`"
            color="neutral"
            variant="ghost"
            icon="i-lucide-arrow-left"
            :label="`Semua topik di ${tahap.nama}`"
            class="whitespace-normal"
          />
        </aside>
      </div>
    </UContainer>
  </div>
</template>
