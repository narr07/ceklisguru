// Nuxt UI only regenerates its color <style> when app config changes after mount,
// so the chosen palette is replayed in two steps:
// 1. a head script swaps in the last generated CSS before first paint (no yellow flash)
// 2. after mount, the saved names go back into app config so Nuxt UI owns the style again
export default defineNuxtPlugin({
  name: 'theme-colors',
  enforce: 'post',
  setup(nuxtApp) {
    if (import.meta.server) {
      useHead({
        script: [{
          key: 'theme-colors',
          innerHTML: `try{var c=localStorage.getItem('${THEME_STORAGE_KEYS.css}'),s=document.getElementById('nuxt-ui-colors');if(c&&s)s.textContent=c}catch(e){}`,
          tagPriority: -1,
        }],
      })
      return
    }

    const appConfig = useAppConfig()
    const defaults = { ...appConfig.ui.colors }

    nuxtApp.hook('app:mounted', () => {
      for (const kind of ['primary', 'neutral'] as const) {
        const saved = readStorage(THEME_STORAGE_KEYS[kind])
        if (saved && themeColorsOf(kind).some(c => c.name === saved)) {
          appConfig.ui.colors[kind] = saved
        }
      }
    })

    injectHead().hooks?.hook('dom:rendered', () => {
      const isDefault = appConfig.ui.colors.primary === defaults.primary
        && appConfig.ui.colors.neutral === defaults.neutral
      const css = document.getElementById('nuxt-ui-colors')?.textContent
      if (isDefault) removeStorage(THEME_STORAGE_KEYS.css)
      else if (css) writeStorage(THEME_STORAGE_KEYS.css, css)
    })
  },
})

// Storage can be blocked; the theme then falls back to the defaults
function readStorage(key: string) {
  try {
    return localStorage.getItem(key)
  }
  catch {
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  }
  catch {
    // Not saved; the next visit starts from the defaults
  }
}

function removeStorage(key: string) {
  try {
    localStorage.removeItem(key)
  }
  catch {
    // Nothing to clean up when storage is blocked
  }
}
