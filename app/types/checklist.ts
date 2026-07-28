export interface ChecklistItem {
  id: string
  title: string
  description: string
  tip?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  color?: string
  colorBg?: string
  description: string
  isParent: boolean
  items: ChecklistItem[]
}

export interface SubCategory {
  id: string
  slug: string
  parentId: string
  parentSlug: string
  parentName: string
  name: string
  icon: string
  color?: string
  colorBg?: string
  description: string
  items: ChecklistItem[]
}

export interface Progress {
  [categoryId: string]: {
    [itemId: string]: boolean
  }
}
