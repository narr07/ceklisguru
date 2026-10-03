import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

// `kunci` is what progress is saved under, so it must never change once published,
// even if the file is renamed or reordered (Nuxt Content's own id follows the file path)
const kunci = z.string().regex(/^[a-z0-9-]+$/, 'pakai huruf kecil, angka, dan tanda hubung')

const butir = z.object({
  kunci,
  judul: z.string(),
  penjelasan: z.string(),
  // Shown under the item, for wording taken almost directly from a source
  catatan: z.string().optional(),
  // Classroom example, opened on hover or tap
  contoh: z.string().optional(),
  // Internal: document and article each item rests on. Never rendered
  dasar: z.array(z.string()).min(1),
})

export default defineContentConfig({
  collections: {
    tahap: defineCollection({
      type: 'data',
      source: 'tahap/*.yml',
      schema: z.object({
        kunci,
        slug: z.string(),
        // `modul` sits outside the 1–6 learning path (KSP)
        jenis: z.enum(['tahap', 'modul']).default('tahap'),
        nama: z.string(),
        ringkasan: z.string(),
        ikon: z.string(),
        dasar: z.array(z.string()).min(1),
      }),
    }),
    topik: defineCollection({
      type: 'data',
      source: 'topik/**/*.yml',
      schema: z.object({
        kunci,
        slug: z.string(),
        tahap: z.string(),
        judul: z.string(),
        ringkasan: z.string(),
        ikon: z.string(),
        terkait: z.array(z.string()).default([]),
        butir: z.array(butir).min(1),
      }),
    }),
  },
})
