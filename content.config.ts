import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const rowSchema = z.object({
  time: z.string(),
  activity: z.string(),
  location: z.string(),
  notes: z.string(),
});

const optionSchema = z.object({
  id: z.string(),
  letter: z.string(),
  title: z.string(),
  date: z.string(),
  tone: z.enum(['success', 'contrast']),
  badge: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  rows: z.array(rowSchema),
});

const scheduleSchema = z.object({
  title: z.string(),
  options: z.array(optionSchema),
});

export default defineContentConfig({
  collections: {
    schedule_en: defineCollection({
      type: 'data',
      source: 'en/index.yml',
      schema: scheduleSchema,
    }),
    schedule_th: defineCollection({
      type: 'data',
      source: 'th/index.yml',
      schema: scheduleSchema,
    }),
  },
});
