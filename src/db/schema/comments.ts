import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

import { users } from "./user";
import { videos } from "./video";

// ----------------------------------------------------------------------

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  videoId: uuid("video_id")
    .references(() => videos.id, { onDelete: "cascade" })
    .notNull(),
  value: text("value").notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  video: one(videos, {
    fields: [comments.videoId],
    references: [videos.id],
  }),
}));

export const commentSelectSchema = createSelectSchema(comments);
export const commentInsertSchema = createInsertSchema(comments);
export const commentUpdateSchema = createUpdateSchema(comments);
