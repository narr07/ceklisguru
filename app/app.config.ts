export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'zinc',
    },
    // The active crumb is text; primary colors like yellow fail AA on white
    breadcrumb: {
      defaultVariants: {
        color: 'neutral',
      },
    },
  },
})
