<script setup lang="ts">
useSeoMeta({
  title: 'CeklisGuru · Ceklis mengajar dari dasar sampai lanjut',
  description: 'Enam tahap kerja guru, dari memahami murid sampai merefleksi cara mengajar. Disusun dari Standar Proses dan standar kompetensi guru terbaru.',
})

const { data: tahapList } = await useSemuaTahap()
const { data: topikList } = await useSemuaTopik()

const alur = computed(() => (tahapList.value ?? []).filter(t => t.jenis === 'tahap'))
const modul = computed(() => (tahapList.value ?? []).filter(t => t.jenis === 'modul'))

function topikOf(kunci: string) {
  return (topikList.value ?? []).filter(t => t.tahap === kunci)
}
</script>

<template>
  <UContainer class="py-8 sm:py-12">
    <section class="mb-10 max-w-3xl sm:mb-14">
      <h1 class="mb-4 text-3xl leading-tight font-black text-highlighted sm:text-4xl lg:text-5xl">
        Ceklis mengajar, dari dasar sampai
        <span class="underline decoration-primary decoration-4 underline-offset-8">lanjut</span>
      </h1>
      <p class="text-base leading-relaxed text-muted sm:text-lg">
        Enam tahap kerja guru, disusun dari Standar Proses dan standar kompetensi guru terbaru. Centang yang sudah kamu jalankan, lalu lanjut ke tahap berikutnya.
      </p>
    </section>

    <section aria-labelledby="judul-alur">
      <h2
        id="judul-alur"
        class="mb-5 text-lg font-bold text-highlighted sm:text-xl"
      >
        Alur tahap
      </h2>

      <ol
        v-if="alur.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        <li
          v-for="(tahap, i) in alur"
          :key="tahap.kunci"
        >
          <TahapCard
            :tahap="tahap"
            :nomor="i + 1"
            :topik="topikOf(tahap.kunci)"
            :tahap-list="tahapList ?? []"
          />
        </li>
      </ol>

      <UEmpty
        v-else
        icon="i-lucide-inbox"
        title="Tahap belum tersedia"
        description="Isi ceklis sedang disusun. Coba buka lagi nanti."
      />
    </section>

    <section
      v-if="modul.length"
      aria-labelledby="judul-modul"
      class="mt-12"
    >
      <h2
        id="judul-modul"
        class="mb-1 text-lg font-bold text-highlighted sm:text-xl"
      >
        Modul untuk tim sekolah
      </h2>
      <p class="mb-5 text-sm text-muted">
        Di luar alur tahap, karena dikerjakan bersama di tingkat sekolah.
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <TahapCard
          v-for="m in modul"
          :key="m.kunci"
          :tahap="m"
          :topik="topikOf(m.kunci)"
          :tahap-list="tahapList ?? []"
        />
      </div>
    </section>
  </UContainer>
</template>
