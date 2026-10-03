// Read from the media query directly, so it is right even before any class is set on <html>
export function motionAllowed() {
  return import.meta.client && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
