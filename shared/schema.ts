import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  displayName: text("display_name"),
  profileImage: text("profile_image"),
  bio: text("bio"),
  emergencyContactId: integer("emergency_contact_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  relationship: text("relationship").notNull(),
  isEmergencyContact: boolean("is_emergency_contact").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("user_sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const breathingSessions = pgTable("breathing_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  duration: integer("duration").notNull(), // in seconds
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const diaryEntries = pgTable("diary_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title"),
  content: text("content").notNull(),
  mood: text("mood"), // optional mood tracking
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  contacts: many(contacts),
  breathingSessions: many(breathingSessions),
  sessions: many(sessions),
  diaryEntries: many(diaryEntries),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const breathingSessionsRelations = relations(breathingSessions, ({ one }) => ({
  user: one(users, {
    fields: [breathingSessions.userId],
    references: [users.id],
  }),
}));

export const diaryEntriesRelations = relations(diaryEntries, ({ one }) => ({
  user: one(users, {
    fields: [diaryEntries.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  password: true,
  dateOfBirth: true,
  displayName: true,
  profileImage: true,
  bio: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  phone: true,
  relationship: true,
  isEmergencyContact: true,
});

export const insertBreathingSessionSchema = createInsertSchema(breathingSessions).pick({
  duration: true,
  completed: true,
});

export const insertDiaryEntrySchema = createInsertSchema(diaryEntries).pick({
  title: true,
  content: true,
  mood: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type BreathingSession = typeof breathingSessions.$inferSelect;
export type InsertBreathingSession = z.infer<typeof insertBreathingSessionSchema>;
export type DiaryEntry = typeof diaryEntries.$inferSelect;
export type InsertDiaryEntry = z.infer<typeof insertDiaryEntrySchema>;
export type Session = typeof sessions.$inferSelect;
