import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tip: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    categories: defineCollection({
      type: 'data',
      source: 'categories/*.yml',
      schema: z.object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        icon: z.string(),
        description: z.string(),
        isParent: z.boolean().default(true),
        items: z.array(checklistItemSchema).default([]),
      }),
    }),
    subcategories: defineCollection({
      type: 'data',
      source: 'subcategories/**/*.yml',
      schema: z.object({
        id: z.string(),
        slug: z.string(),
        parentId: z.string(),
        parentSlug: z.string(),
        parentName: z.string(),
        name: z.string(),
        icon: z.string(),
        description: z.string(),
        items: z.array(checklistItemSchema),
      }),
    }),
  },
})
