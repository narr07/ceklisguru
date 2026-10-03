// Optimizes the source icons into the Nuxt Icon collection used as `ceklis:<name>`.
// Only icons used by content belong in app/assets/icons: on a static site the whole
// collection ships in the client bundle (limit 256 KB). Spares wait in icons-cadangan.
// Usage: bun scripts/optimasi-ikon.ts <source folder> (default: app/assets/icons)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { optimize } from 'svgo'

const source = process.argv[2] ?? 'app/assets/icons'
const target = 'app/assets/icons'

const base = { multipass: true, floatPrecision: 1 }
// convertPathData crashes on a few of these drawings, so those files skip it
const withoutPathData = {
  ...base,
  plugins: [{ name: 'preset-default' as const, params: { overrides: { convertPathData: false as const } } }],
}

let before = 0
let after = 0
const fallbacks: string[] = []

for (const file of readdirSync(source).filter(f => f.endsWith('.svg'))) {
  const svg = readFileSync(join(source, file), 'utf8')
  let data: string
  try {
    data = optimize(svg, base).data
  }
  catch {
    data = optimize(svg, withoutPathData).data
    fallbacks.push(file)
  }
  // Nuxt Icon only accepts lowercase names
  writeFileSync(join(target, file.toLowerCase()), data)
  before += svg.length
  after += data.length
}

console.log(`${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`)
if (fallbacks.length) console.log(`tanpa convertPathData: ${fallbacks.join(', ')}`)
