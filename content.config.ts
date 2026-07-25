import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const rowSchema = z.object({
  time: z.string(),
  activity: z.string(),
  location: z.string(),
  notes: z.string()
})

// One localized page doc per locale (content/en/index.yml, content/th/index.yml):
// hero title/description + plans, hotels, restaurants, guests, faq.
const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string()
  }).optional(),
  plans: z.array(z.object({
    id: z.string(),
    letter: z.string(),
    title: z.string(),
    date: z.string(),
    tone: z.enum(['success', 'contrast']),
    badge: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    rows: z.array(rowSchema)
  })),
  hotels: z.array(z.object({
    id: z.string(),
    name: z.string(),
    mapsUrl: z.string(),
    coordinates: z.array(z.number()),
    image: z.string()
  })),
  restaurants: z.object({
    note: z.string(),
    suggestions: z.array(z.object({
      id: z.string(),
      name: z.string(),
      area: z.string(),
      mapsUrl: z.string(),
      image: z.string().optional()
    }))
  }),
  guests: z.object({
    family: z.array(z.object({
      name: z.string(),
      role: z.string(),
      note: z.string().optional()
    })),
    friends: z.array(z.object({
      name: z.string(),
      role: z.string(),
      note: z.string().optional()
    }))
  }),
  faq: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.array(z.object({
      title: z.string().nonempty(),
      questions: z.array(z.object({
        label: z.string().nonempty(),
        content: z.string().nonempty()
      }))
    }))
  })
})

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'data',
      source: 'en/index.yml',
      schema: pageSchema
    }),
    content_th: defineCollection({
      type: 'data',
      source: 'th/index.yml',
      schema: pageSchema
    })
  }
})
