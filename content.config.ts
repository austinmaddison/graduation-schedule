import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

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
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        author: createAuthorSchema()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'blog.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    speaking: defineCollection({
      type: 'page',
      source: 'speaking.yml',
      schema: z.object({
        links: z.array(createButtonSchema()),
        events: z.array(z.object({
          category: z.enum(['Live talk', 'Podcast', 'Conference']),
          title: z.string(),
          date: z.date(),
          location: z.string(),
          url: z.string().optional()
        }))
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema())
      })
    }),
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
