import { defineStore } from 'pinia'
import type { Progress } from '~/types/checklist'

const STORAGE_KEY = 'ceklisGuru_progress'

export const useChecklistStore = defineStore('checklist', () => {
  // State
  const progress = ref<Progress>({})

  // Getters
  const getProgress = computed(() => (categoryId: string, itemId: string): boolean => {
    return progress.value[categoryId]?.[itemId] ?? false
  })

  const getCategoryProgress = computed(() => (categoryId: string, totalItems: number): number => {
    if (!progress.value[categoryId]) return 0
    const completed = Object.values(progress.value[categoryId]).filter(Boolean).length
    return totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0
  })

  const getCategoryCompleted = computed(() => (categoryId: string): number => {
    if (!progress.value[categoryId]) return 0
    return Object.values(progress.value[categoryId]).filter(Boolean).length
  })

  // Actions
  function toggleItem(categoryId: string, itemId: string) {
    if (!progress.value[categoryId]) {
      progress.value[categoryId] = {}
    }
    progress.value[categoryId][itemId] = !progress.value[categoryId][itemId]
    saveToLocalStorage()
  }

  function loadFromLocalStorage() {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          progress.value = JSON.parse(saved)
        }
      }
      catch (e) {
        console.warn('Failed to load progress from localStorage', e)
      }
    }
  }

  function saveToLocalStorage() {
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
      }
      catch (e) {
        console.warn('Failed to save progress to localStorage', e)
      }
    }
  }

  function resetCategoryProgress(categoryId: string) {
    resetMultipleCategoriesProgress([categoryId])
  }

  function resetMultipleCategoriesProgress(categoryIds: string[]) {
    progress.value = Object.fromEntries(
      Object.entries(progress.value).filter(([id]) => !categoryIds.includes(id)),
    )
    saveToLocalStorage()
  }

  function resetProgress() {
    progress.value = {}
    saveToLocalStorage()
  }

  return {
    progress,
    getProgress,
    getCategoryProgress,
    getCategoryCompleted,
    toggleItem,
    loadFromLocalStorage,
    saveToLocalStorage,
    resetCategoryProgress,
    resetMultipleCategoriesProgress,
    resetProgress,
  }
})
