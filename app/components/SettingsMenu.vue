<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const COLOR_LABELS: Record<string, string> = {
  red: 'Merah',
  orange: 'Oranye',
  amber: 'Ambar',
  yellow: 'Kuning',
  lime: 'Hijau limau',
  green: 'Hijau',
  emerald: 'Zamrud',
  teal: 'Hijau toska',
  cyan: 'Sian',
  sky: 'Biru langit',
  blue: 'Biru',
  indigo: 'Nila',
  violet: 'Violet',
  purple: 'Ungu',
  fuchsia: 'Fuksia',
  pink: 'Merah muda',
  rose: 'Mawar',
  slate: 'Batu tulis',
  gray: 'Abu-abu',
  zinc: 'Seng',
  neutral: 'Netral',
  stone: 'Batu',
  taupe: 'Taupe',
  mauve: 'Mauve',
  mist: 'Kabut',
  olive: 'Zaitun',
}

const appConfig = useAppConfig()
const colorMode = useColorMode()

function setColor(kind: ThemeColorKind, name: string) {
  appConfig.ui.colors[kind] = name
  try {
    localStorage.setItem(THEME_STORAGE_KEYS[kind], name)
  }
  catch {
    // Storage can be blocked; the choice then lasts only for this visit
  }
}

function hexOf(kind: ThemeColorKind, name: string) {
  return themeColorsOf(kind).find(c => c.name === name)?.hex ?? '#737373'
}

function colorMenu(kind: ThemeColorKind, label: string): DropdownMenuItem {
  const active = appConfig.ui.colors[kind]
  return {
    label,
    slot: 'chip',
    hex: hexOf(kind, active),
    content: { align: 'center', collisionPadding: 16 },
    children: themeColorsOf(kind).map(color => ({
      label: COLOR_LABELS[color.name] ?? color.name,
      hex: color.hex,
      slot: 'chip',
      type: 'checkbox',
      checked: active === color.name,
      onSelect: (e: Event) => {
        e.preventDefault()
        setColor(kind, color.name)
      },
    })),
  }
}

const MODES = [
  { value: 'light', label: 'Terang', icon: 'i-lucide-sun' },
  { value: 'dark', label: 'Gelap', icon: 'i-lucide-moon' },
  { value: 'system', label: 'Ikuti perangkat', icon: 'i-lucide-monitor' },
] as const

const items = computed<DropdownMenuItem[][]>(() => [
  [colorMenu('primary', 'Warna utama'), colorMenu('neutral', 'Warna netral')],
  MODES.map(mode => ({
    label: mode.label,
    icon: mode.icon,
    type: 'checkbox',
    checked: colorMode.preference === mode.value,
    onSelect: (e: Event) => {
      e.preventDefault()
      colorMode.preference = mode.value
    },
  })),
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end', collisionPadding: 12 }"
    :ui="{ content: 'w-52' }"
  >
    <UButton
      icon="i-lucide-palette"
      color="neutral"
      variant="ghost"
      aria-label="Atur warna dan tampilan"
      class="data-[state=open]:bg-elevated"
    />

    <template #chip-leading="{ item }">
      <span class="inline-flex size-5 shrink-0 items-center justify-center">
        <span
          class="size-2 rounded-full ring ring-bg"
          :style="{ backgroundColor: (item as DropdownMenuItem & { hex?: string }).hex }"
        />
      </span>
    </template>
  </UDropdownMenu>
</template>
