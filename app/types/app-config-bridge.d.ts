import type { AppConfigInput as SchemaAppConfigInput } from '@nuxt/schema'

// nanime extends AppConfigInput through 'nuxt/schema' while Nuxt UI uses '@nuxt/schema',
// so the optional input type of `ui` gets shadowed by the fully required runtime type. This restores it.
declare module 'nuxt/schema' {
  interface AppConfigInput {
    ui?: SchemaAppConfigInput['ui']
  }
}

export {}
