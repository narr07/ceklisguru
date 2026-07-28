<script setup lang="ts">
interface Props {
  icon: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

// Mapping emoji & nama file ke SVG lokal yang ada di /public/icon/
const localEmojiMap: Record<string, string> = {
  // Category Icons
  '📋': '/icon/018-notes.svg',
  '🚀': '/icon/030-planet.svg',
  '📊': '/icon/032-rating.svg',
  '🏫': '/icon/040-school bag.svg',
  '🎓': '/icon/052-trophy.svg',
  '💻': '/icon/062-laptop.svg',
  '🧩': '/icon/025-palette.svg',

  // Sub-category & Item Icons
  '🎯': '/icon/050-target.svg',
  '📚': '/icon/046-stationery.svg',
  '🗂️': '/icon/014-download file.svg',
  '✅': '/icon/001-like.svg',
  '🔔': '/icon/033-reminder.svg',
  '💡': '/icon/049-table lamp.svg',
  '📝': '/icon/041-script.svg',
  '💬': '/icon/019-online chat.svg',
  '📈': '/icon/036-review.svg',
  '📌': '/icon/020-edit button.svg',
  '🌱': '/icon/012-mushroom.svg',
  '🤝': '/icon/006-contact us.svg',
  '📖': '/icon/029-phone book.svg',
  '👥': '/icon/043-share.svg',
  '📁': '/icon/047-sticky notes.svg',
  '🛠️': '/icon/016-edit tool.svg',
  '🌐': '/icon/048-globe.svg',
  '⚡': '/icon/037-robot.svg',
  '🔍': '/icon/003-magnifier.svg',
  '🤔': '/icon/017-No idea.svg',
  '🏗️': '/icon/024-canvas.svg',
  '❓': '/icon/061-error 404.svg',
  '🤲': '/icon/001-like.svg',
  '🗣️': '/icon/009-mike.svg',
  '🎉': '/icon/008-medal.svg',
  '🔄': '/icon/016-edit tool.svg',
  '📭': '/icon/061-error 404.svg',
}

const iconSrc = computed(() => {
  if (!props.icon) return '/icon/018-notes.svg'

  // Jika berupa path URL absolut / HTTP
  if (props.icon.startsWith('/') || props.icon.startsWith('http://') || props.icon.startsWith('https://')) {
    return props.icon
  }

  // Jika nama file SVG langsung (misal '050-target.svg')
  if (props.icon.endsWith('.svg')) {
    return `/icon/${props.icon}`
  }

  // Cek mapping emoji ke SVG lokal
  if (localEmojiMap[props.icon]) {
    return localEmojiMap[props.icon]
  }

  return `/icon/${props.icon}`
})

const sizeClass = computed(() => {
  if (props.size.includes('h-') || props.size.includes('w-')) {
    return props.size
  }
  return {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  }[props.size] || 'w-6 h-6'
})
</script>

<template>
  <img
    v-if="iconSrc"
    :src="iconSrc"
    :alt="icon"
    class="object-contain inline-block shrink-0 select-none"
    :class="sizeClass"
    loading="lazy"
  />
  <span v-else class="inline-block shrink-0" :class="sizeClass">
    {{ icon }}
  </span>
</template>
