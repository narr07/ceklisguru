import { defineStore } from 'pinia'

// v1 keyed progress by Nuxt Content file paths, which break on any rename; v2 uses `kunci` from content
const STORAGE_KEY = 'ceklisGuru_progress_v2'
const LEGACY_KEY = 'ceklisGuru_progress'

type Progress = Record<string, Record<string, true>>

export const useChecklistStore = defineStore('checklist', () => {
  const progress = ref<Progress>({})
  const loaded = ref(false)

  function isChecked(topik: string, butir: string) {
    return progress.value[topik]?.[butir] === true
  }

  // Counts only items that still exist, so removed items never inflate progress
  function countDone(topik: string, butirKeys: string[]) {
    const done = progress.value[topik]
    return done ? butirKeys.filter(key => done[key]).length : 0
  }

  function setChecked(topik: string, butir: string, checked: boolean) {
    const others = Object.entries(progress.value[topik] ?? {}).filter(([key]) => key !== butir)
    const items: Record<string, true> = Object.fromEntries(checked ? [...others, [butir, true as const]] : others)
    progress.value = { ...progress.value, [topik]: items }
    save()
  }

  function reset(topikKeys: string[]) {
    progress.value = Object.fromEntries(
      Object.entries(progress.value).filter(([key]) => !topikKeys.includes(key)),
    )
    save()
  }

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) progress.value = JSON.parse(saved)
      // v1 ticks cannot map onto the rebuilt checklist, so they are dropped quietly
      localStorage.removeItem(LEGACY_KEY)
    }
    catch {
      // Unreadable storage means starting empty, which the page already shows
    }
    loaded.value = true
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
    }
    catch {
      // Storage full or blocked: the check stays for this visit only
    }
  }

  return {
    progress,
    loaded,
    isChecked,
    countDone,
    setChecked,
    reset,
    load,
  }
})
