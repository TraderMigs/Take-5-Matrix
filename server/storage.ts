import { users, contacts, breathingSessions, sessions, diaryEntries, aiTokenUsage, type User, type InsertUser, type Contact, type InsertContact, type BreathingSession, type InsertBreathingSession, type Session, type DiaryEntry, type InsertDiaryEntry, type AiTokenUsage, type InsertAiTokenUsage } from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: number, data: Partial<User>): Promise<User>;
  setEmailVerificationToken(userId: number, token: string, expires: Date): Promise<void>;
  verifyEmailWithToken(token: string): Promise<User | null>;
  
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
  
  // Diary operations
  createDiaryEntry(entry: InsertDiaryEntry, userId: number): Promise<DiaryEntry>;
  getDiaryEntries(userId: number): Promise<DiaryEntry[]>;
  updateDiaryEntry(entryId: number, updates: Partial<InsertDiaryEntry>): Promise<DiaryEntry>;
  deleteDiaryEntry(entryId: number): Promise<void>;

  // AI Token Usage operations
  logTokenUsage(usage: InsertAiTokenUsage): Promise<AiTokenUsage>;
  getDailyTokenUsage(date: Date): Promise<Array<AiTokenUsage & { user: User }>>;
  getTotalTokensForPeriod(startDate: Date, endDate: Date): Promise<number>;
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

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async setEmailVerificationToken(userId: number, token: string, expires: Date): Promise<void> {
    await db
      .update(users)
      .set({
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      })
      .where(eq(users.id, userId));
  }

  async verifyEmailWithToken(token: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.emailVerificationToken, token),
          eq(users.emailVerified, false)
        )
      );

    if (!user || !user.emailVerificationExpires) {
      return null;
    }

    // Check if token is expired
    if (new Date() > user.emailVerificationExpires) {
      return null;
    }

    // Mark email as verified and clear token
    const [verifiedUser] = await db
      .update(users)
      .set({
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      })
      .where(eq(users.id, user.id))
      .returning();

    return verifiedUser;
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

  async createDiaryEntry(entry: InsertDiaryEntry, userId: number): Promise<DiaryEntry> {
    const [newEntry] = await db
      .insert(diaryEntries)
      .values({ ...entry, userId })
      .returning();
    return newEntry;
  }

  async getDiaryEntries(userId: number): Promise<DiaryEntry[]> {
    return await db.select().from(diaryEntries)
      .where(eq(diaryEntries.userId, userId))
      .orderBy(diaryEntries.createdAt);
  }

  async updateDiaryEntry(entryId: number, updates: Partial<InsertDiaryEntry>): Promise<DiaryEntry> {
    const [updatedEntry] = await db
      .update(diaryEntries)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(diaryEntries.id, entryId))
      .returning();
    return updatedEntry;
  }

  async deleteDiaryEntry(entryId: number): Promise<void> {
    await db.delete(diaryEntries).where(eq(diaryEntries.id, entryId));
  }

  async logTokenUsage(usage: InsertAiTokenUsage): Promise<AiTokenUsage> {
    const [newUsage] = await db
      .insert(aiTokenUsage)
      .values(usage)
      .returning();
    return newUsage;
  }

  async getDailyTokenUsage(date: Date): Promise<Array<AiTokenUsage & { user: User }>> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const results = await db.select({
      id: aiTokenUsage.id,
      userId: aiTokenUsage.userId,
      sessionId: aiTokenUsage.sessionId,
      tokensUsed: aiTokenUsage.tokensUsed,
      messageCount: aiTokenUsage.messageCount,
      model: aiTokenUsage.model,
      createdAt: aiTokenUsage.createdAt,
      user: {
        id: users.id,
        email: users.email,
        username: users.username,
        displayName: users.displayName,
      }
    })
    .from(aiTokenUsage)
    .leftJoin(users, eq(aiTokenUsage.userId, users.id))
    .where(and(
      gte(aiTokenUsage.createdAt, startOfDay),
      lte(aiTokenUsage.createdAt, endOfDay)
    ));

    return results.map(result => ({
      ...result,
      user: result.user || { id: 0, email: 'anonymous', username: 'anonymous', displayName: 'Anonymous User' }
    })) as Array<AiTokenUsage & { user: User }>;
  }

  async getTotalTokensForPeriod(startDate: Date, endDate: Date): Promise<number> {
    const result = await db.select({
      total: aiTokenUsage.tokensUsed
    })
    .from(aiTokenUsage)
    .where(and(
      gte(aiTokenUsage.createdAt, startDate),
      lte(aiTokenUsage.createdAt, endDate)
    ));

    return result.reduce((sum, row) => sum + (row.total || 0), 0);
  }
}

export const storage = new DatabaseStorage();
