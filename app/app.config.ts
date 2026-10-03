export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'zinc',
    },
    button: {
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
    // The active crumb is text; primary colors like yellow fail AA on white
    breadcrumb: {
      defaultVariants: {
        color: 'neutral',
      },
    },
  },
})
