# CeklisGuru 📋

**CeklisGuru** adalah platform *checklist* interaktif yang dirancang khusus untuk guru Indonesia guna memantau, mengevaluasi, dan meningkatkan kualitas pembelajaran melalui praktik-praktik terbaik (*best practices*) yang terstruktur.

---

## 🚀 Fitur Utama

- **7 Kategori Pembelajaran Utama**:
  1. 📋 **Perencanaan Pembelajaran** (Tujuan belajar, metode, sumber daya, persiapan)
  2. 🚀 **Pelaksanaan Pembelajaran** (Kegiatan pembuka, inti, penutup)
  3. 📊 **Asesmen & Evaluasi** (Formatif, umpan balik, analisis hasil)
  4. 🏫 **Pengelolaan Kelas** (Aturan, lingkungan, hubungan positif)
  5. 🎓 **Pengembangan Profesional** (Belajar mandiri, kolaborasi, dokumentasi)
  6. 💻 **Teknologi Pembelajaran** (Integrasi TIK, literasi digital, inovasi)
  7. 🧩 **Model & Metode Pembelajaran** (Discovery, PBL, PjBL, Inquiry, Kooperatif, Langsung)

- **Progress Tracking Otomatis**: Kemajuan centang (*checklist*) tersimpan secara otomatis di penyimpanan lokal browser (`localStorage`) melalui Pinia.
- **Tip & Insight Pembelajaran**: Dilengkapi dengan kiat-kiat praktis (seperti penerapan Taksonomi Bloom) pada setiap item checklist.
- **Fitur Reset Progress**: Memungkinkan guru untuk mereset centang per sub-topik maupun kategori.
- **Desain Modern & Responsive**: Menggunakan skema warna natural **Nuxt UI** dan sistem desain terstruktur dengan dukungan **Dark Mode** / **Light Mode**.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3 + TypeScript)
- **Content Management**: [@nuxt/content](https://content.nuxt.com/) (File-based Markdown content)
- **UI & Styling**: [@nuxt/ui](https://ui.nuxt.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Font**: Alan Sans (Google Fonts)
- **State Management**: [Pinia](https://pinia.vuejs.org/) (`@pinia/nuxt`)
- **Package Manager**: [Bun](https://bun.sh/) / `npm`

---

## 📁 Struktur Proyek

```text
ceklisguru/
├── app/
│   ├── assets/css/        # Stylings (main.css) & tema Alan Sans
│   ├── components/        # Komponen UI (CategoryCard, CategoryHeader, ChecklistItem, ProgressBar, AppHeader)
│   ├── pages/             # Routing halaman utama & kategori (`/categories/[slug]/[subslug]`)
│   ├── stores/            # Pinia store untuk state management progress
│   └── types/             # Definisi TypeScript interface
├── content/
│   ├── categories/        # Data Markdown kategori utama
│   └── subcategories/     # Data Markdown sub-topik & item-item checklist
├── content.config.ts      # Skema koleksi Nuxt Content
├── nuxt.config.ts         # Konfigurasi aplikasi Nuxt
└── package.json
```

---

## 💻 Cara Menjalankan Proyek

### 1. Instalasi Dependensi

Gunakan **Bun** (direkomendasikan) atau **npm**:

```bash
# Menggunakan Bun
bun install

# Menggunakan NPM
npm install
```

### 2. Jalankan Dev Server

Mulai server pengembang lokal di `http://localhost:3000`:

```bash
# Menggunakan Bun
bun run dev

# Menggunakan NPM
npm run dev
```

### 3. Build & Preview untuk Produksi

```bash
# Build aplikasi
bun run build

# Preview hasil build secara lokal
bun run preview
```

---

## 📝 Lisensi & Kontribusi

Dibuat dengan ❤️ untuk kemajuan pendidikan dan Guru Indonesia.
