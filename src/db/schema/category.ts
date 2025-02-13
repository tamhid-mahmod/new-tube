import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { videos } from "./video";

// ----------------------------------------------------------------------

export const categories = pgTable(
  "caregories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("name_idx").on(t.name)]
);

export const categoryRelations = relations(categories, ({ many }) => ({
  videos: many(videos),
}));
