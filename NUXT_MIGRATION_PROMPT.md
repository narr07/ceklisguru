# CeklisGuru.id dengan Nuxt 4 + Nuxt Content

## PROMPT UNTUK MEMBUAT APLIKASI DENGAN NUXT

---

## 📋 OVERVIEW PROYEK

Buatkan website **CeklisGuru.id** - Platform checklist pembelajaran interaktif untuk guru Indonesia menggunakan **Nuxt 4** dan **Nuxt Content**.

**Tujuan**: Membantu guru Indonesia meningkatkan kualitas pembelajaran melalui checklist praktik terbaik yang terstruktur, dengan progress tracking dan penyimpanan data.

---

## 🎯 REQUIREMENTS LENGKAP

### A. TECH STACK (MANDATORY)

- **Framework**: Nuxt 4 (latest)
- **Content Management**: Nuxt Content v3
- **Styling**: Tailwind CSS v4 + @nuxt/ui
- **Language**: TypeScript
- **State Management**: Pinia (untuk progress tracking)
- **Storage**: Browser localStorage + JSON files di Nuxt Content
- **Deployment**: Vercel atau Netlify

### B. STRUKTUR DATA

**7 Kategori Pembelajaran dengan 61 Total Items:**

1. **Perencanaan Pembelajaran** (8 items)
2. **Pelaksanaan Pembelajaran** (8 items)
3. **Penilaian & Evaluasi** (7 items)
4. **Manajemen Kelas** (7 items)
5. **Pengembangan Profesional** (7 items)
6. **Teknologi & Inovasi** (6 items)
7. **Implementasi Model Pembelajaran** (18 items)
   - Discovery Learning (3 items)
   - Problem-Based Learning (3 items)
   - Project-Based Learning (3 items)
   - Inquiry Learning (3 items)
   - Cooperative Learning (3 items)
   - Direct Instruction (3 items)

**Setiap item memiliki:**
- ID unik (format: `{category-prefix}{number}`)
- Title
- Description (dengan contoh konkrit)
- Category
- Slug untuk URL

### C. FITUR UTAMA

1. **Homepage dengan Grid Kategori**
   - Display semua 7 kategori dalam grid responsive
   - Setiap kategori card menampilkan:
     - Icon (emoji)
     - Name
     - Description singkat
     - Progress percentage
     - Total items
   - Click to navigate ke detail kategori

2. **Halaman Detail Kategori**
   - Header dengan category info & progress bar
   - List semua items dalam kategori
   - Setiap item bisa di-checkbox
   - Real-time progress calculation
   - Strikethrough pada completed items
   - Back button ke homepage

3. **Progress Tracking**
   - Per kategori: (completed items / total items) × 100%
   - Overall: (total completed / 61 items) × 100%
   - Display di category card & header
   - Animated progress bar dengan gradient
   - Real-time update tanpa page refresh

4. **Data Persistence**
   - Simpan progress ke localStorage
   - Key: `ceklisGuru_progress`
   - Format: JSON dengan struktur `{ categoryId: { itemId: boolean } }`
   - Auto-save on setiap checkbox change
   - Persist across browser sessions

5. **Responsive Design**
   - Mobile-first approach
   - Desktop, tablet, mobile optimized
   - Dark mode support
   - Accessible (WCAG 2.1 AA)

---

## 📂 STRUKTUR FILE YANG DIHARAPKAN

```
ceklisGuru-nuxt/
├── app.vue                          # Root component
├── app.config.ts                    # App configuration
├── nuxt.config.ts                   # Nuxt configuration
│
├── pages/
│   ├── index.vue                    # Homepage
│   ├── categories/
│   │   └── [slug].vue               # Category detail page
│   └── about.vue                    # About page (opsional)
│
├── components/
│   ├── CategoryCard.vue             # Kategori card component
│   ├── CategoryGrid.vue             # Grid layout untuk kategori
│   ├── ChecklistItem.vue            # Item checkbox component
│   ├── ProgressBar.vue              # Progress indicator
│   ├── CategoryHeader.vue           # Header kategori detail
│   └── AppHeader.vue                # Navigation header
│
├── layouts/
│   ├── default.vue                  # Default layout
│   └── category.vue                 # Layout kategori detail
│
├── composables/
│   ├── useChecklistStore.ts         # Pinia store untuk progress
│   └── useProgressCalculation.ts    # Logika perhitungan progress
│
├── content/
│   ├── categories/
│   │   ├── 1.planning.md            # Perencanaan Pembelajaran
│   │   ├── 2.implementation.md      # Pelaksanaan Pembelajaran
│   │   ├── 3.assessment.md          # Penilaian & Evaluasi
│   │   ├── 4.classroom.md           # Manajemen Kelas
│   │   ├── 5.professional.md        # Pengembangan Profesional
│   │   ├── 6.technology.md          # Teknologi & Inovasi
│   │   └── 7.models.md              # Implementasi Model Pembelajaran
│   └── index.md                     # Index content
│
├── stores/
│   └── checklist.ts                 # Pinia store
│
├── types/
│   └── checklist.ts                 # TypeScript types
│
├── assets/
│   └── css/
│       └── tailwind.css             # Tailwind configuration
│
├── public/
│   └── ... (images, icons)
│
├── app.config.ts                    # App-level config
├── tailwind.config.ts               # Tailwind config
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies
└── .env.example                     # Environment variables example
```

---

## 📝 FORMAT CONTENT (MARKDOWN)

### Contoh: `content/categories/1.planning.md`

```yaml
---
id: planning
slug: planning
name: Perencanaan Pembelajaran
icon: 📋
description: Strategi dan persiapan pembelajaran yang efektif
items:
  - id: p1
    title: Identifikasi tujuan pembelajaran yang spesifik dan terukur
    description: "Contoh: Siswa dapat mengidentifikasi minimal 5 jenis kalimat majemuk dengan benar"
  - id: p2
    title: Analisis karakteristik dan kebutuhan peserta didik
    description: "Contoh: Perhatikan gaya belajar, latar belakang, kecepatan pemahaman setiap siswa"
  - id: p3
    title: Pilih metode pembelajaran yang sesuai dengan tujuan
    description: "Contoh: Gunakan diskusi kelompok untuk tujuan kolaborasi, atau studi kasus untuk aplikasi praktis"
  - id: p4
    title: Rancang strategi diferensiasi untuk keberagaman siswa
    description: "Contoh: Berikan tugas yang berbeda sesuai level, atau pilihan cara belajar yang beragam"
  - id: p5
    title: Siapkan media dan sumber belajar berkualitas
    description: "Contoh: Video pembelajaran, infografis, artikel, atau simulasi interaktif yang relevan"
  - id: p6
    title: Buat rencana waktu yang realistis dan terstruktur
    description: "Contoh: Alokasikan 10 menit pembuka, 25 menit inti, 10 menit penutup dan evaluasi"
  - id: p7
    title: Susun instrumen penilaian sebelum pembelajaran dimulai
    description: "Contoh: Siapkan rubrik, soal kuis, atau rubrik project sebelum mengajar"
  - id: p8
    title: Identifikasi kesulitan potensial dan solusinya
    description: "Contoh: Jika siswa kesulitan konsep abstrak, siapkan analogi konkrit atau visual"
---

# Perencanaan Pembelajaran

Kategori ini membahas strategi dan persiapan pembelajaran yang efektif untuk mencapai hasil pembelajaran optimal.

## Tips Praktis

- Selalu mulai dengan tujuan pembelajaran yang jelas
- Pahami kebutuhan dan karakteristik siswa Anda
- Persiapkan resources secukupnya sebelum pembelajaran dimulai
```

---

## 🎨 DESIGN REQUIREMENTS

### Color Palette (5 colors)
- **Primary**: Teal (#0d9488) - Education, Trust
- **Success**: Emerald (#10b981) - Progress, Achievement  
- **Neutral**: Gray (#6b7280) - Text, Borders
- **Background**: Cream (#fef3f2) - Light, Approachable
- **Dark Background**: #1f2937 - Dark mode

### Typography
- **Font Family**: Geist Sans (Google Fonts)
- **Headings**: Bold (font-weight: 700)
- **Body**: Regular (font-weight: 400)
- **Line-height**: 1.5 (leading-relaxed)

### Components
- **Category Card**: 
  - Hover effect dengan shadow
  - Progress bar visual
  - Icon + name + description
  - Click area seluruh card

- **Checklist Item**:
  - Checkbox di sebelah kiri
  - Title dan description
  - Strikethrough pada completed
  - Smooth transition

- **Progress Bar**:
  - Animated gradient teal → emerald
  - Label percentage
  - Smooth animation (0.3s)

---

## 💻 IMPLEMENTASI DETAIL

### 1. Setup Nuxt Project

```bash
# Create project
npx nuxi@latest init ceklisGuru-nuxt

# Install dependencies
cd ceklisGuru-nuxt
npm install

# Install additional packages
npm install @nuxt/ui pinia nuxt-content
npm install -D tailwindcss postcss autoprefixer
```

### 2. Nuxt Configuration (nuxt.config.ts)

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/content',
  ],
  
  ui: {
    icons: ['heroicons'],
  },
  
  content: {
    documentDriven: false,
    sources: {
      content: {
        driver: 'fs',
        base: './content'
      }
    }
  },
  
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  
  app: {
    head: {
      title: 'CeklisGuru - Praktik Terbaik Pembelajaran untuk Guru Indonesia',
      meta: [
        { name: 'description', content: 'Platform checklist interaktif untuk guru Indonesia meningkatkan kualitas pembelajaran' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
```

### 3. Pinia Store (stores/checklist.ts)

```typescript
import { defineStore } from 'pinia'

interface Progress {
  [categoryId: string]: {
    [itemId: string]: boolean
  }
}

export const useChecklistStore = defineStore('checklist', {
  state: (): { progress: Progress } => ({
    progress: {}
  }),
  
  getters: {
    getProgress: (state) => (categoryId: string, itemId: string): boolean => {
      return state.progress[categoryId]?.[itemId] ?? false
    },
    
    getCategoryProgress: (state) => (categoryId: string, totalItems: number): number => {
      if (!state.progress[categoryId]) return 0
      const completed = Object.values(state.progress[categoryId]).filter(Boolean).length
      return Math.round((completed / totalItems) * 100)
    },
    
    getTotalProgress: (state) => (totalItems: number = 61): number => {
      let completed = 0
      Object.values(state.progress).forEach(category => {
        completed += Object.values(category).filter(Boolean).length
      })
      return Math.round((completed / totalItems) * 100)
    }
  },
  
  actions: {
    toggleItem(categoryId: string, itemId: string) {
      if (!this.progress[categoryId]) {
        this.progress[categoryId] = {}
      }
      this.progress[categoryId][itemId] = !this.progress[categoryId][itemId]
      this.saveToLocalStorage()
    },
    
    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('ceklisGuru_progress')
        if (saved) {
          this.progress = JSON.parse(saved)
        }
      }
    },
    
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('ceklisGuru_progress', JSON.stringify(this.progress))
      }
    }
  }
})
```

### 4. TypeScript Types (types/checklist.ts)

```typescript
export interface ChecklistItem {
  id: string
  title: string
  description: string
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  description: string
  items: ChecklistItem[]
}

export interface CategoryMeta {
  id: string
  slug: string
  name: string
  icon: string
  description: string
  items: ChecklistItem[]
}
```

### 5. Components

#### CategoryCard.vue
- Display category info (icon, name, progress)
- Link ke category detail page
- Hover effects
- Progress bar visual

#### ChecklistItem.vue
- Checkbox + title + description
- Toggle functionality dengan Pinia
- Strikethrough styling
- Responsive layout

#### ProgressBar.vue
- Animated progress display
- Percentage label
- Gradient color (teal → emerald)
- Responsive width

#### CategoryHeader.vue
- Category title & icon
- Total items & completed count
- Overall progress bar
- Back to home button

### 6. Pages

#### pages/index.vue (Homepage)
- Grid layout kategori
- CategoryGrid component
- Overall progress header
- Responsive (auto-fit grid)

#### pages/categories/[slug].vue (Detail Kategori)
- CategoryHeader component
- List ChecklistItem components
- useRoute() untuk dynamic slug
- useAsyncData untuk fetch content

---

## 🔧 FUNCTIONAL REQUIREMENTS

### Checklist Item Toggle
```
1. User click checkbox
2. Pinia store update state
3. LocalStorage auto-save
4. Component re-render with strikethrough
5. Parent component recalculate progress
6. Progress bar animate ke nilai baru
```

### Progress Calculation
```
Per Category: (completed items / total items) × 100%
Overall: (sum completed / 61) × 100%

Update: Real-time (computed properties)
Display: Category card + detail header
```

### Navigation
```
Homepage → Click category card → Detail page
Detail page → Click back → Homepage
URL format: /categories/[slug]
```

---

## 🌐 CONTENT MIGRATION

Content dari Next.js akan dimigrasikan ke Nuxt Content:

**From (Next.js):**
```typescript
export const categories = [{ id: "planning", items: [...] }]
```

**To (Nuxt Content Markdown):**
```yaml
---
id: planning
name: Perencanaan Pembelajaran
items:
  - id: p1
    title: "..."
    description: "..."
---
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile (< 640px):
- Single column layout
- Stack cards vertically
- Full-width inputs

Tablet (640px - 1024px):
- 2 column grid
- Larger cards
- Comfortable spacing

Desktop (> 1024px):
- 3-4 column grid
- Full layout optimization
- Maximum readability
```

---

## 🚀 DEVELOPMENT WORKFLOW

```bash
# 1. Setup
npm run dev

# 2. Develop
# Edit components, content, pages
# Browser auto-refresh

# 3. Test
# Test checkbox functionality
# Test progress tracking
# Test responsive layout
# Test localStorage persistence

# 4. Build
npm run build
npm run preview

# 5. Deploy
# Push ke GitHub
# Deploy ke Vercel/Netlify
```

---

## ✅ VALIDATION CHECKLIST

### Functionality
- [ ] Homepage displays 7 categories dengan progress
- [ ] Click category → navigate ke detail page
- [ ] Checkbox toggle works
- [ ] Progress bar updates real-time
- [ ] Data persists di localStorage
- [ ] Refresh page → progress tetap ada
- [ ] Back button works

### Design
- [ ] Responsive di mobile, tablet, desktop
- [ ] Dark mode looks good
- [ ] Colors konsisten per design spec
- [ ] Typography readable
- [ ] Icons display correctly

### Content
- [ ] Semua 61 items ada
- [ ] Descriptions dengan contoh konkrit
- [ ] No typos atau grammar errors
- [ ] Categories correct grouping

### Performance
- [ ] Fast initial load (< 2s)
- [ ] Smooth animations
- [ ] No console errors
- [ ] localStorage working

---

## 📦 DEPLOYMENT

### Vercel
```bash
# Connect GitHub repo
vercel link

# Deploy
vercel deploy

# Production
vercel --prod
```

### Netlify
```bash
# Connect GitHub repo via Netlify UI
# Auto-deploy on push
```

---

## 📚 RESOURCES

- Nuxt 4 Docs: https://nuxt.com
- Nuxt Content Docs: https://content.nuxt.com
- Pinia: https://pinia.vuejs.org
- Tailwind CSS: https://tailwindcss.com
- @nuxt/ui: https://ui.nuxt.com

---

## 🎯 SUCCESS CRITERIA

Proyek dianggap COMPLETE ketika:

1. ✅ Semua 7 kategori + 61 items terlihat & berfungsi
2. ✅ Checkbox toggle works & progress updates real-time
3. ✅ Data persist di localStorage (refresh page test)
4. ✅ Responsive design works di semua breakpoints
5. ✅ Dark mode fully supported
6. ✅ Responsive design berfungsi sempurna
7. ✅ No console errors atau warnings
8. ✅ Deployment successful di Vercel/Netlify
9. ✅ Performance memenuhi standar (LCP < 2.5s, CLS < 0.1)
10. ✅ Documentation lengkap untuk future maintenance

---

## CATATAN PENTING

1. **Nuxt Content vs TypeScript Array**: Gunakan Nuxt Content YAML frontmatter + markdown files, bukan TypeScript arrays. Ini memudahkan maintenance & editing content tanpa perlu recompile.

2. **Server-Side Rendering**: Nuxt default SSR = true. Pastikan localStorage calls di client-side only (gunakan `process.client` guard).

3. **Progress Persistence**: Kombinasi localStorage untuk user-specific data + Nuxt Content untuk master data (categories & items).

4. **Color Classes**: Gunakan Tailwind dengan format `bg-{color}-{shade}` misalnya `bg-blue-50`, `bg-emerald-600`, etc.

5. **TypeScript**: Strongly recommend gunakan TypeScript untuk type safety & better DX.

---

## ADDITIONAL FEATURES (OPSIONAL - PHASE 2)

- Export progress sebagai PDF/Excel
- Share progress with other teachers
- Comments/notes on items
- Search functionality
- Favorites/bookmarks
- Admin panel untuk manage content
- Multi-language support
- User authentication (optional)

---

END OF PROMPT
