# Panduan Menggunakan NUXT_MIGRATION_PROMPT.md

## 📌 UNTUK APA FILE INI?

File `NUXT_MIGRATION_PROMPT.md` adalah **prompt lengkap dan detail** untuk membuat ulang CeklisGuru.id menggunakan **Nuxt 4 + Nuxt Content** (bukan Next.js).

Gunakan prompt ini ketika:
- Ingin rebuild CeklisGuru dengan Nuxt
- Ingin share prompt ke developer lain untuk rebuild
- Ingin dokumentasi lengkap tech stack Nuxt
- Perlu referensi implementasi Nuxt Content

---

## 🎯 CARA MENGGUNAKAN PROMPT

### Opsi 1: Copy-Paste ke AI/Claude/ChatGPT

```
1. Buka file: NUXT_MIGRATION_PROMPT.md
2. Copy seluruh isi file
3. Paste ke AI Assistant (Claude, ChatGPT, Copilot, etc)
4. AI akan membuat proyek Nuxt sesuai spec
```

### Opsi 2: Reference untuk Developer

```
1. Share file ini ke developer Nuxt
2. Developer baca & pahami requirements
3. Developer implement sesuai specifications
4. Use sebagai checklist development
```

### Opsi 3: Setup Manual dari Scratch

```
1. Ikuti section "Setup Nuxt Project"
2. Setup Nuxt configuration sesuai spec
3. Buat file struktur sesuai "STRUKTUR FILE"
4. Implement components sesuai detail
5. Migrate content dari Next.js ke Markdown
6. Test menggunakan "VALIDATION CHECKLIST"
```

---

## 📋 STRUKTUR PROMPT

Prompt dibagi menjadi sections:

| Section | Konten | Gunanya |
|---------|--------|---------|
| Overview | Deskripsi proyek & tujuan | Pemahaman context |
| Requirements | Tech stack, data structure, features | Scope project |
| Struktur File | File organization | Setup project |
| Format Content | Contoh markdown files | Create content |
| Design Requirements | Colors, typography, components | UI implementation |
| Implementasi Detail | Code examples & configs | Development guide |
| Functional Requirements | Workflow features | Behavior specs |
| Content Migration | From Next.js to Nuxt Content | Data conversion |
| Development Workflow | Dev process | Getting started |
| Validation Checklist | Test criteria | QA testing |
| Deployment | Vercel/Netlify setup | Production |
| Success Criteria | Final acceptance | Project completion |

---

## 🚀 QUICK START (5 MENIT)

Jika ingin langsung copy-paste ke AI:

```
1. Open: NUXT_MIGRATION_PROMPT.md
2. Copy all content
3. Go to: https://claude.ai (atau ChatGPT/Copilot)
4. Paste ke chat
5. Add: "Please build this project step by step"
6. Wait for AI to generate project
```

---

## 💡 KUNCI BAGIAN-BAGIAN PENTING

### 1. Requirements Section
```
Menjelaskan:
- Tech stack (Nuxt 4, Nuxt Content, Tailwind, Pinia)
- Struktur data (7 kategori, 61 items)
- Fitur utama (checklist, progress tracking, persistence)
```

### 2. Struktur File Section
```
Menunjukkan:
- File organization untuk project Nuxt
- Content folder structure (Markdown files)
- Component breakdown
```

### 3. Format Content Section
```
Contoh:
- Bagaimana format markdown file di Nuxt Content
- YAML frontmatter structure
- Metadata untuk setiap category
```

### 4. Implementation Detail Section
```
Code:
- Nuxt config setup
- Pinia store implementation
- TypeScript types
- Component breakdown
```

---

## 🔄 PERBEDAAN NEXT.JS vs NUXT

| Aspek | Next.js (Current) | Nuxt 4 (Prompt) |
|-------|-------------------|-----------------|
| Data Source | TypeScript arrays | Nuxt Content markdown |
| State Management | Custom localStorage | Pinia store |
| Styling | Tailwind (existing) | Tailwind + @nuxt/ui |
| Routing | App router | File-based routing |
| Components | Custom components | @nuxt/ui components |
| Setup | Already done | Need to setup |

---

## 📝 CONTENT MIGRATION REFERENCE

### Dari lib/checklists-data.ts (Next.js):
```typescript
export const categories = [
  {
    id: "planning",
    name: "Perencanaan Pembelajaran",
    items: [
      { id: "p1", title: "...", description: "..." }
    ]
  }
]
```

### Ke content/categories/1.planning.md (Nuxt):
```yaml
---
id: planning
name: Perencanaan Pembelajaran
items:
  - id: p1
    title: "..."
    description: "..."
---
# Content here
```

---

## ✨ HIGHLIGHTS NUXT IMPLEMENTATION

1. **Nuxt Content**: Master data (categories & items) disimpan sebagai Markdown
2. **Pinia Store**: Progress tracking & state management
3. **Composables**: Reusable logic seperti progress calculation
4. **File-based Routing**: Automatic routing untuk categories
5. **TypeScript**: Full type safety

---

## 🎯 VALIDATION CHECKLIST DALAM PROMPT

Prompt include checklist untuk verify:
- Functionality (7 items test)
- Design (5 items test)
- Content (4 items test)
- Performance (4 items test)

---

## 📚 RESOURCES DALAM PROMPT

Prompt includes links ke:
- Nuxt 4 documentation
- Nuxt Content documentation
- Pinia documentation
- Tailwind CSS documentation
- @nuxt/ui documentation

---

## 🛠️ TIPS MENGGUNAKAN PROMPT

### Tips 1: Customization
Anda bisa customize prompt sebelum pakai:
- Ganti categories/items sesuai kebutuhan
- Modify tech stack jika perlu
- Add/remove features

### Tips 2: Phased Development
Implement dalam phases:
- Phase 1: Setup + Homepage + Categories
- Phase 2: Progress tracking + Storage
- Phase 3: Polish + Deploy

### Tips 3: Testing During Development
Use validation checklist sebagai guide:
- Test saat develop
- Jangan tunggu sampai akhir
- Quick iteration

---

## 🚀 NEXT STEPS

### Untuk Rebuild dengan Nuxt:

1. **Siapkan Environment**
   - Install Node.js 18+
   - Install package manager (npm/pnpm/yarn)

2. **Follow Prompt**
   - Copy NUXT_MIGRATION_PROMPT.md
   - Paste ke AI atau follow manual
   - Wait untuk project generated

3. **Setup Local**
   - Clone atau copy project
   - `npm install`
   - `npm run dev`
   - Buka http://localhost:3000

4. **Verify**
   - Test semua features
   - Check responsive design
   - Validate progress tracking
   - Ensure localStorage works

5. **Deploy**
   - Push ke GitHub
   - Connect ke Vercel/Netlify
   - Deploy production

---

## ❓ FAQ

**Q: Boleh saya customize prompt ini?**
A: Ya! Customize sesuai kebutuhan Anda. Prompt designed untuk flexible.

**Q: Bisakah saya pakai tech stack berbeda?**
A: Ya, tapi recommend follow tech stack di prompt untuk consistency.

**Q: Bagaimana kalau ada error saat implement?**
A: Check validation checklist di prompt. Atau debug menggunakan browser console.

**Q: Berapa lama untuk implement?**
A: ~4-6 jam untuk developer berpengalaman Nuxt. Lebih lama jika belajar Nuxt.

**Q: Boleh pakai untuk production?**
A: Yes! Prompt production-ready dengan best practices.

---

## 📞 SUPPORT

Jika ada pertanyaan:
1. Check NUXT_MIGRATION_PROMPT.md again
2. Read Nuxt docs (links included in prompt)
3. Ask AI for clarification
4. Check browser console untuk errors

---

## 📄 FILE RELATIONSHIPS

```
NUXT_MIGRATION_PROMPT.md
├─ Full detailed prompt untuk build Nuxt
├─ Gunakan untuk reference & development
│
NUXT_PROMPT_GUIDE.md (file ini)
├─ Guide cara pakai prompt
├─ Tips & best practices
└─ FAQ & support
```

---

**Selamat membuat CeklisGuru dengan Nuxt! 🎉**
