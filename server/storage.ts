import { users, contacts, breathingSessions, type User, type InsertUser, type Contact, type InsertContact, type BreathingSession, type InsertBreathingSession } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getContacts(userId: number): Promise<Contact[]>;
  createContact(userId: number, contact: InsertContact): Promise<Contact>;
  deleteContact(contactId: number): Promise<void>;
  createBreathingSession(userId: number, session: InsertBreathingSession): Promise<BreathingSession>;
  getBreathingSessions(userId: number): Promise<BreathingSession[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getContacts(userId: number): Promise<Contact[]> {
    return await db.select().from(contacts).where(eq(contacts.userId, userId));
  }

  async createContact(userId: number, contact: InsertContact): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values({ ...contact, userId })
      .returning();
    return newContact;
  }

  async deleteContact(contactId: number): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, contactId));
  }

  async createBreathingSession(userId: number, session: InsertBreathingSession): Promise<BreathingSession> {
    const [newSession] = await db
      .insert(breathingSessions)
      .values({ ...session, userId })
      .returning();
    return newSession;
  }

  async getBreathingSessions(userId: number): Promise<BreathingSession[]> {
    return await db.select().from(breathingSessions).where(eq(breathingSessions.userId, userId));
  }
}

export const storage = new DatabaseStorage();
