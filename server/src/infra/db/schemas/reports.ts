import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  index,
} from 'drizzle-orm/pg-core';

export const reports = pgTable(
  'reports',
  {
    id: serial('id').primaryKey(),
    publicUrl: text('public_url').notNull(),
    objectKey: varchar('object_key', { length: 512 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('reports_object_key_idx').on(table.objectKey)]
); 