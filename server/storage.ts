import { users, contacts, breathingSessions, sessions, type User, type InsertUser, type Contact, type InsertContact, type BreathingSession, type InsertBreathingSession, type Session } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: number, data: Partial<User>): Promise<User>;
  
  // Contact operations (support both logged in and anonymous users)
  getContacts(userId?: number): Promise<Contact[]>;
  createContact(contact: InsertContact, userId?: number): Promise<Contact>;
  deleteContact(contactId: number): Promise<void>;
  getEmergencyContacts(userId?: number): Promise<Contact[]>;
  
  // Session operations
  createSession(userId: number): Promise<Session>;
  getSession(sessionId: string): Promise<Session | undefined>;
  deleteSession(sessionId: string): Promise<void>;
  
  // Breathing sessions
  createBreathingSession(session: InsertBreathingSession, userId?: number): Promise<BreathingSession>;
  getBreathingSessions(userId?: number): Promise<BreathingSession[]>;
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

  async updateUserProfile(userId: number, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getContacts(userId?: number): Promise<Contact[]> {
    if (!userId) return []; // Anonymous users have no stored contacts
    return await db.select().from(contacts).where(eq(contacts.userId, userId));
  }

  async createContact(contact: InsertContact, userId?: number): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values({ ...contact, userId })
      .returning();
    return newContact;
  }

  async deleteContact(contactId: number): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, contactId));
  }

  async getEmergencyContacts(userId?: number): Promise<Contact[]> {
    if (!userId) return [];
    return await db.select().from(contacts)
      .where(eq(contacts.userId, userId))
      .where(eq(contacts.isEmergencyContact, true));
  }

  async createSession(userId: number): Promise<Session> {
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    const [session] = await db
      .insert(sessions)
      .values({ id: sessionId, userId, expiresAt })
      .returning();
    return session;
  }

  async getSession(sessionId: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions)
      .where(eq(sessions.id, sessionId));
    
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    
    // Clean up expired session
    if (session) {
      await this.deleteSession(sessionId);
    }
    
    return undefined;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }

  async createBreathingSession(session: InsertBreathingSession, userId?: number): Promise<BreathingSession> {
    const [newSession] = await db
      .insert(breathingSessions)
      .values({ ...session, userId })
      .returning();
    return newSession;
  }

  async getBreathingSessions(userId?: number): Promise<BreathingSession[]> {
    if (!userId) return [];
    return await db.select().from(breathingSessions).where(eq(breathingSessions.userId, userId));
  }
}

export const storage = new DatabaseStorage();
