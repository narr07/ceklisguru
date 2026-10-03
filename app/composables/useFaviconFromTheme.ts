// Same idea as the Nuxt UI docs: rebuild the SVG favicon whenever the primary color
// or the color mode changes. The PNG icons (apple-touch, Android) stay yellow.
import LogoSvg from '~/assets/icons/logo.svg?raw'

// The accent fill in logo.svg; the theme color replaces it
const ACCENT = /var\(--icon-accent,#[0-9a-f]+\)/gi
const LINK_ID = 'favicon-theme'

// The primary color is an oklch() value; a 1x1 canvas turns it into plain rgb that every favicon renderer accepts
function toRgb(color: string) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return '#ffcc04'
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `rgb(${r},${g},${b})`
}

export function useFaviconFromTheme() {
  const colorMode = useColorMode()

  function updateFavicon() {
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--ui-primary').trim()
    if (!primary) return
    const svg = LogoSvg.replace(ACCENT, toRgb(primary))

    let link = document.getElementById(LINK_ID) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = LINK_ID
      link.rel = 'icon'
      link.type = 'image/svg+xml'
      document.head.appendChild(link)
    }
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  onMounted(() => {
    watch(() => colorMode.value, updateFavicon, { immediate: true, flush: 'post' })

    // Nuxt UI rewrites this style tag when the primary color changes
    const style = document.getElementById('nuxt-ui-colors')
    if (style) {
      const observer = new MutationObserver(updateFavicon)
      observer.observe(style, { childList: true, characterData: true, subtree: true })
      onBeforeUnmount(() => observer.disconnect())
    }
  })
}
