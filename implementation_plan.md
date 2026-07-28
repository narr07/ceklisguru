# CeklisGuru.id — Implementasi Nuxt 4 + Nuxt Content

## Overview

Proyek Nuxt 4 sudah ada dengan struktur dasar. Perlu diimplementasikan sesuai spec dari `NUXT_MIGRATION_PROMPT.md`:
- 7 kategori pembelajaran dengan 61 checklist items
- Progress tracking via Pinia + localStorage
- UI premium dengan Tailwind CSS v4 + @nuxt/ui
- Nuxt Content v3 untuk data kategori
- Responsive, dark mode support

## Status Existing

| File | Status |
|------|--------|
| `nuxt.config.ts` | ⚠️ Perlu update (belum ada `@nuxt/ui`, `@pinia/nuxt`) |
| `content.config.ts` | ⚠️ Perlu update (schema categories) |
| `app/app.vue` | ⚠️ Perlu update (UApp wrapper) |
| `app/pages/` | ⚠️ Hanya ada `[...slug].vue` |
| `app/components/` | ⚠️ Hanya ada Alert.vue & Counter.vue |
| `content/` | ⚠️ Belum ada `categories/` folder |
| `app/stores/` | ❌ Belum ada |
| `app/types/` | ❌ Belum ada |
| `app/assets/css/` | ❌ Belum ada |

## Proposed Changes

---

### 1. Configuration

#### [MODIFY] nuxt.config.ts
- Tambah modules: `@nuxt/ui`, `@pinia/nuxt`
- Tambah CSS entry point
- Tambah app.head meta

#### [MODIFY] content.config.ts
- Tambah collection `categories` dengan schema lengkap (id, slug, name, icon, color, description, items)

---

### 2. TypeScript Types

#### [NEW] app/types/checklist.ts
- `ChecklistItem` interface
- `Category` interface

---

### 3. Pinia Store

#### [NEW] app/stores/checklist.ts
- Setup store (Composition API style)
- State: `progress` object
- Getters: `getProgress`, `getCategoryProgress`, `getTotalProgress`
- Actions: `toggleItem`, `loadFromLocalStorage`, `saveToLocalStorage`

---

### 4. CSS

#### [NEW] app/assets/css/main.css
- Import tailwindcss + @nuxt/ui
- Custom CSS variables (teal primary, emerald success)
- Dark mode styles

---

### 5. App Root

#### [MODIFY] app/app.vue
- Wrap dengan `UApp` (diperlukan untuk @nuxt/ui Toast/overlays)
- Add `NuxtRouteAnnouncer`
- Load localStorage di `onMounted`

---

### 6. Content Files

#### [NEW] content/categories/1.planning.md
- 8 items Perencanaan Pembelajaran

#### [NEW] content/categories/2.implementation.md
- 8 items Pelaksanaan Pembelajaran

#### [NEW] content/categories/3.assessment.md
- 7 items Penilaian & Evaluasi

#### [NEW] content/categories/4.classroom.md
- 7 items Manajemen Kelas

#### [NEW] content/categories/5.professional.md
- 7 items Pengembangan Profesional

#### [NEW] content/categories/6.technology.md
- 6 items Teknologi & Inovasi

#### [NEW] content/categories/7.models.md
- 18 items Implementasi Model Pembelajaran (6 sub-model × 3 items)

---

### 7. Components

#### [MODIFY] app/components/ (replace Alert.vue, Counter.vue with proper components)

#### [NEW] app/components/AppHeader.vue
- Navigation header
- Logo + judul
- Dark mode toggle

#### [NEW] app/components/ProgressBar.vue
- Animated progress bar
- Gradient teal → emerald
- Percentage label

#### [NEW] app/components/CategoryCard.vue
- Icon + name + description
- Progress bar per kategori
- Hover effect dengan shadow
- NuxtLink ke `/categories/[slug]`

#### [NEW] app/components/ChecklistItem.vue
- Checkbox + title + description
- Toggle via Pinia store
- Strikethrough styling
- Smooth transition

#### [NEW] app/components/CategoryHeader.vue
- Title & icon kategori
- Completed/total count
- Progress bar
- Back button

---

### 8. Pages

#### [MODIFY] app/pages/ (restructure)

#### [NEW] app/pages/index.vue
- Overall progress header
- Grid 7 kategori (CategoryCard)
- Responsive grid (1/2/3 col)

#### [NEW] app/pages/categories/[slug].vue
- Fetch kategori dari Nuxt Content
- CategoryHeader component
- List ChecklistItem components
- Dynamic route via `useRoute`

#### [DELETE] app/pages/[...slug].vue
- Diganti dengan halaman-halaman spesifik

---

## Verification Plan

### Manual Verification
1. Run `npm run dev` / `bun run dev`
2. Buka http://localhost:3000 — homepage tampil 7 kategori
3. Click kategori → navigasi ke detail page
4. Toggle checkbox → progress update real-time
5. Refresh halaman → progress tetap tersimpan (localStorage)
6. Test dark mode toggle
7. Test responsive (mobile, tablet, desktop)
