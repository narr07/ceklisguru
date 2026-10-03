import { spring } from '#nanime/easings'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'zinc',
    },
    button: {
      // Press feedback; motion-safe drops it for people who ask for reduced motion
      slots: {
        base: 'transition-[color,background-color,border-color,box-shadow,transform] duration-150 motion-safe:active:scale-[0.97]',
      },
      defaultVariants: {
        variant: 'solid',
      },
    },
    badge: {
      defaultVariants: {
        variant: 'solid',
      },
    },
    card: {
      defaultVariants: {
        variant: 'subtle',
      },
    },
    alert: {
      defaultVariants: {
        variant: 'subtle',
      },
    },
    empty: {
      defaultVariants: {
        variant: 'subtle',
      },
    },
    // Prose links: dark text with a primary underline, since yellow text is 1.92:1 on white
    prose: {
      a: {
        base: [
          'text-highlighted font-medium underline decoration-primary decoration-2 underline-offset-3 hover:decoration-highlighted rounded-xs outline-primary/25 focus-visible:outline-3',
          'transition-colors',
        ],
      },
    },
    // The active crumb is text; primary colors like yellow fail AA on white
    breadcrumb: {
      defaultVariants: {
        color: 'neutral',
      },
    },
  },
  // Shared nanime styles. With reduced motion, app.vue makes them instant
  nanime: {
    transitions: {
      // Numbers that change, like "3 dari 5"
      'mt-count': {
        enter: { opacity: [0, 1], scale: [0.6, 1], ease: spring({ bounce: 0.3, duration: 300 }) },
        leave: { opacity: 0, scale: 0.6, duration: 100 },
      },
      // Badges and icons that appear or swap, like "Topik selesai" or copy -> check
      'mt-pop': {
        enter: { opacity: [0, 1], scale: [0.8, 1], ease: spring({ bounce: 0.35, duration: 360 }) },
        leave: { opacity: 0, scale: 0.9, duration: 120, ease: 'out(2)' },
      },
    },
  },
})
