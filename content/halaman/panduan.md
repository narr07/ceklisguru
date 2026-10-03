---
title: Panduan menambah butir
description: Cara mengusulkan butir, topik, atau perbaikan isi CeklisGuru, dengan syarat setiap isi berdasar dokumen resmi Kemendikdasmen.
---

CeklisGuru terbuka untuk usulan dari guru. Kalau kamu menemukan praktik yang belum ada di ceklis, ada butir yang kurang tepat, atau ada aturan baru yang belum masuk, kamu bisa mengusulkannya.

::callout{icon="i-lucide-badge-check" color="neutral"}
**Syarat utama: setiap butir harus berdasar dokumen resmi.** Sumbernya diambil dari halaman [Rujukan Kemendikdasmen](https://kurikulum.kemendikdasmen.go.id/rujukan){target="_blank"}, misalnya Standar Proses, Panduan Pembelajaran dan Asesmen, atau Capaian Pembelajaran. Sebutkan nama dokumen dan bagian atau pasalnya. Usulan tanpa sumber resmi belum bisa dimasukkan.
::

## Susunan isi ceklis

Isi ceklis disusun dalam tiga tingkat:

- **Tahap**: enam tahap kerja guru, dari memahami murid sampai berkolaborasi, ditambah modul KSP untuk tim sekolah.
- **Topik**: satu halaman ceklis di dalam tahap, misalnya "Tujuan pembelajaran" di tahap Merencanakan.
- **Butir**: satu hal yang bisa dicentang, lengkap dengan penjelasan, catatan, dan contoh kalau ada.

## Cara 1: kirim usulan tanpa coding

Cara ini cocok untuk semua guru. Kamu hanya perlu akun GitHub gratis.

::steps

### Buka halaman usulan

Buka [halaman Issues CeklisGuru](https://github.com/narr07/ceklisguru/issues/new){target="_blank"}, lalu masuk dengan akun GitHub-mu.

### Isi usulanmu

Salin templat di bawah ini ke kolom isian, lalu lengkapi.

```text [Templat usulan]
Jenis usulan: butir baru / perbaikan butir / topik baru
Tahap: (misalnya Merencanakan pembelajaran)
Topik: (misalnya Tujuan pembelajaran)

Judul butir: (kalimat perintah, misalnya "Rumuskan tujuan yang memuat kompetensi dan konten")
Penjelasan: (satu atau dua kalimat)
Contoh di kelas: (opsional, hanya kalau ada di dokumen sumber)

Dasar: (nama dokumen dan bagian atau pasalnya, misalnya "Permendikdasmen 1/2026 Pasal 6 ayat 1")
```

### Kirim

Beri judul singkat, misalnya "Usulan butir: kriteria ketercapaian di Tahap 4", lalu kirim. Usulanmu akan dicek terhadap dokumen sumbernya sebelum dimasukkan.

::

## Cara 2: ubah isi lewat pull request

Cara ini untuk yang sudah terbiasa dengan GitHub. Semua isi ceklis tersimpan sebagai file YAML di folder `content/`.

### Letak file

| Isi | Letak |
|---|---|
| Tahap dan modul | `content/tahap/<nomor>.<nama>.yml` |
| Topik dan butirnya | `content/topik/<tahap>/<nomor>.<nama>.yml` |

Nomor di depan nama file menentukan urutan tampilnya.

### Format butir

Tambahkan butir baru di bagian `butir` pada file topik yang sesuai:

```yaml [content/topik/merencanakan/2.tujuan-pembelajaran.yml]
butir:
  - kunci: kriteria-tujuan
    judul: Tulis tujuan yang bisa dicapai dalam waktu yang tersedia
    penjelasan: Satu atau dua kalimat yang menjelaskan butir ini.
    catatan: Opsional. Kutipan atau rincian dari dokumen sumber.
    contoh: Opsional. Contoh praktik di kelas, hanya kalau ada di dokumen sumber.
    dasar:
      - Panduan Pembelajaran dan Asesmen edisi revisi 2025, B.1 Merumuskan Tujuan Pembelajaran
```

::note
`dasar` tidak ditampilkan di situs, tapi wajib diisi. Bagian inilah yang memastikan setiap butir bisa ditelusuri ke sumber resminya.
::

### Aturan penting

- **Jangan mengubah `kunci` yang sudah ada.** Centang guru disimpan dengan kunci itu. Kalau kuncinya berubah, centang mereka hilang.
- **Kunci baru** ditulis dengan huruf kecil, angka, dan tanda hubung, dan tidak boleh sama dengan butir lain di topik yang sama.
- **Ikon topik** diambil dari koleksi `ceklis`, misalnya `ikon: ceklis:050-target`. File ikonnya ada di `app/assets/icons/`.
- **Topik baru** dibuat sebagai file baru dengan nomor urut berikutnya di folder tahapnya.

### Cek sebelum mengirim

Jalankan perintah ini dari folder proyek:

```bash [Terminal]
bun run cek:konten
```

Perintah ini gagal kalau ada butir tanpa `dasar`, kunci ganda, ikon yang tidak ada, atau topik terkait yang tidak ditemukan. Perbaiki sampai lolos, lalu kirim pull request ke [repositori CeklisGuru](https://github.com/narr07/ceklisguru){target="_blank"}.

## Menulis butir yang baik

::callout{icon="i-lucide-lightbulb" color="neutral"}
- **Judul** berupa kalimat perintah yang jelas, misalnya "Sampaikan kriteria ketercapaian kepada murid".
- **Penjelasan** cukup satu atau dua kalimat, memakai sapaan "kamu".
- **Contoh** hanya ditulis kalau memang ada di dokumen sumber. Jangan mengarang contoh.
- **Isi** mengikuti bunyi dokumen sumber. Kalau dokumen menyebut "dapat", jangan ditulis seolah-olah wajib.
::
