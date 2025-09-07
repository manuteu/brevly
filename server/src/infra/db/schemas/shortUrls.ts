import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  index,
  integer,
} from 'drizzle-orm/pg-core';

export const shortUrls = pgTable(
  'short_urls',
  {
    id: serial('id').primaryKey(),
    originalUrl: text('original_url').notNull(),
    shortCode: varchar('short_code', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    clicks: integer('clicks').default(0).notNull(),
  },
  (table) => [index('short_code_idx').on(table.shortCode)]
);
