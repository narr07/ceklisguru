// Fails when content would break progress keys or lose its source trail.
// Nuxt Content checks field types; this checks what spans several files.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { parse } from 'yaml'

const root = join(import.meta.dir, '..', 'content')
const errors: string[] = []

function ymlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? ymlFiles(join(dir, entry.name)) : entry.name.endsWith('.yml') ? [join(dir, entry.name)] : [],
  )
}

function load(dir: string) {
  return ymlFiles(join(root, dir)).map(file => ({ file: relative(root, file), data: parse(readFileSync(file, 'utf8')) }))
}

function fileNumber(file: string) {
  return basename(file).match(/^(\d+)\./)?.[1]
}

function checkUnique(label: string, values: { file: string, value: string | undefined }[]) {
  const seen = new Map<string, string>()
  for (const { file, value } of values) {
    if (!value) {
      errors.push(`${file}: ${label} kosong`)
      continue
    }
    if (seen.has(value)) errors.push(`${file}: ${label} "${value}" sudah dipakai di ${seen.get(value)}`)
    else seen.set(value, file)
  }
}

const tahap = load('tahap')
const topik = load('topik')

checkUnique('kunci tahap', tahap.map(t => ({ file: t.file, value: t.data.kunci })))
checkUnique('nomor file tahap', tahap.map(t => ({ file: t.file, value: fileNumber(t.file) })))
checkUnique('kunci topik', topik.map(t => ({ file: t.file, value: t.data.kunci })))

const iconDir = join(import.meta.dir, '..', 'app', 'assets', 'icons')
for (const { file, data } of [...tahap, ...topik]) {
  const name = String(data.ikon ?? '')
  if (!name.startsWith('ceklis:')) errors.push(`${file}: ikon "${name}" harus berformat ceklis:<nama-file>`)
  else if (!existsSync(join(iconDir, `${name.slice('ceklis:'.length)}.svg`))) errors.push(`${file}: file ikon untuk "${name}" tidak ada di app/assets/icons`)
}

const tahapKeys = new Set(tahap.map(t => t.data.kunci))
const topikKeys = new Set(topik.map(t => t.data.kunci))

for (const t of tahap) {
  if (!t.data.dasar?.length) errors.push(`${t.file}: tahap tanpa dasar`)
}

const numbersPerTahap = new Map<string, { file: string, value: string | undefined }[]>()
for (const t of topik) {
  const { file, data } = t
  if (!tahapKeys.has(data.tahap)) errors.push(`${file}: tahap "${data.tahap}" tidak ada`)
  for (const ref of data.terkait ?? []) {
    if (!topikKeys.has(ref)) errors.push(`${file}: topik terkait "${ref}" tidak ada`)
  }
  const list = numbersPerTahap.get(data.tahap) ?? []
  list.push({ file, value: fileNumber(file) })
  numbersPerTahap.set(data.tahap, list)

  checkUnique(`kunci butir di ${data.kunci}`, (data.butir ?? []).map((b: { kunci?: string }) => ({ file, value: b.kunci })))
  for (const b of data.butir ?? []) {
    if (!b.dasar?.length) errors.push(`${file}: butir "${b.kunci}" tanpa dasar`)
  }
}
for (const [kunci, list] of numbersPerTahap) checkUnique(`nomor file topik di ${kunci}`, list)

if (errors.length) {
  console.error(`cek:konten gagal (${errors.length} masalah):\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
const butirCount = topik.reduce((n, t) => n + (t.data.butir?.length ?? 0), 0)
console.log(`cek:konten lolos: ${tahap.length} tahap, ${topik.length} topik, ${butirCount} butir`)
