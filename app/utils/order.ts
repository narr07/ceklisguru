// Content files are named "<n>.<slug>"; sort by n as a number so 10 comes after 2
export function byFileNumber<T extends { stem?: string }>(a: T, b: T) {
  return fileNumber(a.stem) - fileNumber(b.stem)
}

function fileNumber(stem = '') {
  const match = stem.split('/').pop()?.match(/^(\d+)\./)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}
