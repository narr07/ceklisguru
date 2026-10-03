import type { RouterConfig } from 'nuxt/schema'

function hashTop(selector: string) {
  try {
    const element = document.querySelector(selector)
    if (element) return Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0
  }
  catch {
    // An invalid selector in the hash is simply ignored
  }
  return 0
}

// Nuxt scrolls only after the enter transition ends, so the new page flashes at the old scroll position and jumps.
// Here the scroll happens as soon as the new page is mounted, while its enter transition starts.
export default {
  scrollBehavior(to, from, savedPosition) {
    if (to.path.replace(/\/$/, '') === from.path.replace(/\/$/, '')) {
      if (to.hash) return { el: to.hash, top: hashTop(to.hash), behavior: 'smooth' }
      // Query-only changes keep the scroll position
      return false
    }

    const nuxtApp = useNuxtApp()
    return new Promise((resolve) => {
      // 'instant' overrides the CSS smooth scroll, which would otherwise glide the new page up from the old position
      const done = () => resolve({ ...(savedPosition || (to.hash ? { el: to.hash, top: hashTop(to.hash) } : { left: 0, top: 0 })), behavior: 'instant' })
      // Fallback when the hook never fires (an error page, for example)
      const fallback = setTimeout(done, 700)
      nuxtApp.hooks.hookOnce('page:finish', () => {
        clearTimeout(fallback)
        requestAnimationFrame(done)
      })
    })
  },
} satisfies RouterConfig
