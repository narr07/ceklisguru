import type { TahapCollectionItem, TopikCollectionItem } from '@nuxt/content'

export type Tahap = TahapCollectionItem
export type Topik = TopikCollectionItem

export function useSemuaTahap() {
  return useAsyncData('tahap', async () => (await queryCollection('tahap').all()).sort(byFileNumber))
}

export function useSemuaTopik() {
  return useAsyncData('topik', async () => (await queryCollection('topik').all()).sort(byFileNumber))
}

export function butirKeys(topik: Topik) {
  return topik.butir.map(b => b.kunci)
}

export function topikUrl(topik: Pick<Topik, 'tahap' | 'slug'>, tahapList: Tahap[]) {
  const tahap = tahapList.find(t => t.kunci === topik.tahap)
  return `/ceklis/${tahap?.slug ?? topik.tahap}/${topik.slug}`
}
