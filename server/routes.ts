import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Anthropic from '@anthropic-ai/sdk';
import { setupGoogleAuth } from './google-auth';
import { generateVerificationToken, sendVerificationEmail, sendWelcomeEmail } from './email-service';
import bcrypt from 'bcryptjs';

// Extend Express session with user data
declare module "express-session" {
  interface SessionData {
    userId?: number;
    userData?: any;
  }
}

// Crisis keyword detection
function detectCrisisKeywords(message: string): boolean {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
    'hurt myself', 'self harm', 'cut myself', 'harm myself',
    'kill', 'murder', 'death', 'die', 'dead', 'ending it all',
    'no point', 'give up', 'can\'t go on', 'worthless', 'burden'
  ];
  
  const lowerMessage = message.toLowerCase();
  return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Enhanced intelligent response system
function generateFallbackResponse(message: string, conversationHistory: any[] = []): any {
  const lowerMessage = message.toLowerCase();
  const messageLength = message.trim().length;
  
  // Crisis/Emergency responses with caring tone and contact option
  if (detectCrisisKeywords(message)) {
    return {
      response: "I hear you, and I want you to know that no matter what, there's someone who loves you and is thinking about you right now. These feelings are incredibly difficult, but you don't have to face them alone. We can keep this conversation between you and me, but if you want someone warm and caring to talk to right now, would you like me to show you your trusted contacts so you can reach out to someone who cares about you?",
      showContacts: true,
      isCrisis: true
    };
  }

  // Math/simple questions - practical responses
  if (lowerMessage.includes('2+2') || lowerMessage.includes('what\'s 2+2')) {
    return { response: "That's 4! I noticed you asked a simple question - sometimes when we're going through tough times, it helps to focus on concrete, manageable things. Is there something more personal you'd like to talk about, or would you prefer to keep things light for now?" };
  }

  // Greeting responses - more natural
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi' || lowerMessage.includes('hey')) {
    const greetings = [
      "Hi there. I'm here if you want to talk about anything that's on your mind.",
      "Hello. How are you doing today, really?",
      "Hey. What's going on with you right now?",
      "Hi. I'm glad you're here. What would you like to talk about?"
    ];
    return { response: greetings[Math.floor(Math.random() * greetings.length)] };
  }

  // Short responses - encourage more sharing
  if (messageLength < 10) {
    const encouragements = [
      "I can see you're reaching out, even with just a few words. Sometimes it's hard to know where to start. What's really on your mind?",
      "Thanks for sharing. Would you like to tell me more about what's going on?",
      "I hear you. Sometimes it helps to say more about what you're thinking or feeling.",
      "I'm listening. Feel free to share as much or as little as you're comfortable with."
    ];
    return { response: encouragements[Math.floor(Math.random() * encouragements.length)] };
  }

  // Anxiety responses - more personalized
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
    const anxietyResponses = [
      "Anxiety can feel like your mind is racing ahead to all the worst-case scenarios. Right now, in this moment, you're safe. Try the 4-7-8 breathing: breathe in for 4, hold for 7, exhale for 8. What's making you feel most anxious right now?",
      "I understand that anxious feeling - like your heart might be racing or your thoughts are spiraling. You can use the breathing exercise in this app, or try grounding yourself by naming 5 things you can see around you. What triggered this anxiety today?",
      "Anxiety is exhausting, isn't it? Your body is trying to protect you, but sometimes it goes into overdrive. Let's slow things down together. Can you tell me what specifically is worrying you most right now?"
    ];
    return { response: anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)] };
  }
  
  // Depression responses - more empathetic
  if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
    const depressionResponses = [
      "Depression can make everything feel like you're moving through thick fog - even simple things become incredibly hard. You showed real strength by reaching out today. Have you been able to take care of basic things like eating or sleeping?",
      "I'm sorry you're carrying this heavy feeling. Depression lies to us and tells us things won't get better, but that's not true. You matter, and these feelings, while real and valid, are temporary. What's been the hardest part of your day?",
      "That heavy, empty feeling is so difficult to bear. You're not broken, and you're not alone. Sometimes when depression hits, we forget to do basic self-care. When did you last eat something or go outside?"
    ];
    return { response: depressionResponses[Math.floor(Math.random() * depressionResponses.length)] };
  }
  
  // Overwhelmed responses
  if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much') || lowerMessage.includes('can\'t cope')) {
    const overwhelmedResponses = [
      "That feeling of everything crashing down at once is so intense. Let's pause and just focus on this conversation for a moment. You don't have to solve everything right now. What's the one thing weighing on you most heavily?",
      "When everything feels like too much, our brains can get stuck in panic mode. You're here, you're breathing, and that's enough for this moment. Can you tell me what pushed you over the edge today?",
      "Feeling overwhelmed often means you're dealing with more than anyone should have to handle alone. Let's break this down together. What's been piling up that's making you feel this way?"
    ];
    return { response: overwhelmedResponses[Math.floor(Math.random() * overwhelmedResponses.length)] };
  }
  
  // Loneliness responses
  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
    const lonelinessResponses = [
      "Loneliness can feel like you're invisible to the world, like no one really sees or understands you. But you reached out to me today, which tells me you haven't given up on connection. What's making you feel most alone right now?",
      "That ache of loneliness is one of the most painful feelings. You're brave for sharing this with me. Even though it might not feel like it, you're not truly alone - you're here talking with me right now. What kind of connection are you missing most?",
      "Being lonely doesn't always mean being physically alone - sometimes we can feel lonely even when surrounded by people. What you're feeling is real and it matters. Have you been able to connect with anyone lately, even briefly?"
    ];
    return { response: lonelinessResponses[Math.floor(Math.random() * lonelinessResponses.length)] };
  }
  
  // Contextual responses based on conversation history
  if (conversationHistory && conversationHistory.length > 3) {
    const continuationResponses = [
      "I've been listening to what you're sharing, and I can hear how much you're dealing with. How are you feeling as we've been talking?",
      "Thanks for continuing to open up with me. Sometimes it helps to talk through things step by step. What feels most important to focus on right now?",
      "I appreciate you trusting me with what's going on. You're doing something brave by not keeping everything bottled up inside. What would feel most helpful to you at this moment?"
    ];
    return { response: continuationResponses[Math.floor(Math.random() * continuationResponses.length)] };
  }
  
  // First conversation - warmer welcome
  if (!conversationHistory || conversationHistory.length <= 1) {
    return { response: "I'm really glad you decided to talk with me today. This is a safe space where you can share whatever is on your mind - no judgment, just someone who wants to listen. What's been going on for you lately?" };
  }
  
  // Default supportive responses - more varied and personal
  const supportResponses = [
    "I can hear that something is weighing on you. Sometimes just putting feelings into words can help us understand them better. What's really going on beneath the surface?",
    "Thank you for trusting me with what you're going through. Your feelings matter, and so do you. What's been the most challenging part of your recent days?",
    "It takes real courage to reach out when you're struggling. You're stronger than you might feel right now. What kind of support would help you most in this moment?",
    "I'm here to listen without judgment. Sometimes life throws more at us than we feel equipped to handle. What's been on your heart lately?",
    "You don't have to carry everything alone. I hear you, and what you're experiencing is valid. What would it feel like to talk about what's really bothering you?"
  ];
  
  return { response: supportResponses[Math.floor(Math.random() * supportResponses.length)] };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Google OAuth routes
  setupGoogleAuth(app);

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Session management for persistent login
  app.post("/api/auth/session", (req: any, res) => {
    const { userId, userData } = req.body;
    if (userId && userData) {
      req.session.userId = userId;
      req.session.userData = userData;
      res.json({ success: true, message: "Session saved" });
    } else {
      res.status(400).json({ error: "Missing user data" });
    }
  });

  app.get("/api/auth/session", (req: any, res) => {
    if (req.session.userId && req.session.userData) {
      res.json({ 
        authenticated: true, 
        userId: req.session.userId,
        userData: req.session.userData 
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  app.delete("/api/auth/session", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        res.status(500).json({ error: "Failed to destroy session" });
      } else {
        res.clearCookie('connect.sid');
        res.json({ success: true, message: "Session destroyed" });
      }
    });
  });

  // AI Chat endpoint
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!process.env.ANTHROPIC_API_KEY) {
        // Fallback system for testing without API key
        const response = generateFallbackResponse(message, conversationHistory);
        return res.json({ response });
      }

      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      // Build conversation context
      let conversationContext = "";
      if (conversationHistory && conversationHistory.length > 0) {
        conversationContext = conversationHistory
          .map((msg: any) => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
          .join('\n');
      }

      const systemPrompt = `You are a compassionate AI mental health support assistant for the "Take 5" crisis support app. 

CRITICAL: Always respond directly to the user's current message. Pay close attention to what they're actually saying right now, not just previous topics.

Your role:
1. Listen carefully to each specific concern or feeling they express
2. Acknowledge and validate their current situation or emotion
3. Provide relevant, practical support for what they're experiencing now
4. Maintain conversation flow while being responsive to topic changes
5. Offer appropriate coping strategies that match their current need
6. Keep responses warm, personal, and contextually relevant (2-4 sentences)

Context-Specific Guidelines:
- If they mention physical needs (hunger, tiredness), acknowledge this practically while offering gentle wellness support
- If they mention emotional needs (loneliness, anxiety), provide emotional validation and coping strategies
- If they change topics, acknowledge the shift and respond to the new concern
- Always relate your response to their specific words and situation
- Avoid generic responses that don't match what they just said

Previous conversation:
${conversationContext}

Now respond specifically to their latest message, acknowledging what they're actually experiencing right now.`;

      // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
      const response = await anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 300,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: message
          }
        ],
      });

      const aiResponse = response.content[0].type === 'text' ? response.content[0].text : "I'm here to listen. Can you tell me more about what's happening?";

      res.json({ response: aiResponse });
    } catch (error) {
      console.error("AI Chat error:", error);
      res.status(500).json({ 
        error: "I'm having trouble responding right now. Please try again, or reach out to one of the crisis resources available in the app." 
      });
    }
  });

  // Authentication routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email, username, password, dateOfBirth, displayName } = req.body;
      
      if (!email || !username || !password || !dateOfBirth) {
        return res.status(400).send('Email, username, password, and date of birth are required');
      }
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).send('Email already exists');
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await storage.createUser({
        email,
        username,
        password: hashedPassword,
        dateOfBirth,
        displayName: displayName || username,
        emailVerified: true, // Temporarily auto-verify for immediate access
      });

      // Try to send verification email but don't block account creation
      const token = generateVerificationToken();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.setEmailVerificationToken(newUser.id, token, expires);
      
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const emailSent = await sendVerificationEmail(email, username, token, baseUrl);
      
      if (!emailSent) {
        console.error('Failed to send verification email - email service needs configuration');
      }

      res.json({ 
        message: 'Account created successfully. You can now access all features.',
        userId: newUser.id,
        email: newUser.email
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).send('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send('Invalid credentials');
      }

      res.json(user);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });

  app.post('/api/auth/logout', async (req, res) => {
    res.json({ success: true });
  });

  // Email verification routes
  app.get('/verify-email', async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).send('Invalid verification token');
      }

      const user = await storage.verifyEmailWithToken(token);
      
      if (!user) {
        return res.status(400).send('Invalid or expired verification token');
      }

      // Send welcome email
      await sendWelcomeEmail(user.email, user.username);

      // Redirect to app with success message
      res.redirect('/?verified=true');
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).send('Email verification failed');
    }
  });

  app.post('/api/auth/resend-verification', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.emailVerified) {
        return res.status(400).json({ error: 'Email already verified' });
      }

      // Generate new verification token
      const token = generateVerificationToken();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.setEmailVerificationToken(user.id, token, expires);
      
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const emailSent = await sendVerificationEmail(user.email, user.username, token, baseUrl);
      
      if (!emailSent) {
        return res.status(500).json({ error: 'Failed to send verification email' });
      }

      res.json({ message: 'Verification email sent successfully' });
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({ error: 'Failed to resend verification email' });
    }
  });

  app.put('/api/auth/complete-profile', async (req, res) => {
    try {
      const { userId, fullName, displayName, dateOfBirth, profileQuote } = req.body;
      
      if (!userId) {
        return res.status(400).send('User ID required');
      }

      const updatedUser = await storage.updateUserProfile(userId, { 
        displayName, 
        dateOfBirth, 
        bio: profileQuote 
      });
      res.json(updatedUser);
    } catch (error) {
      console.error('Profile completion error:', error);
      res.status(500).json({ error: 'Failed to complete profile' });
    }
  });

  app.get('/api/auth/profile', async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  app.put('/api/auth/profile', async (req, res) => {
    try {
      const { displayName, bio, userId, profileImage, username } = req.body;
      
      if (!userId) {
        return res.status(400).send('User ID required');
      }

      const updateData: any = {};
      if (displayName !== undefined) updateData.displayName = displayName;
      if (bio !== undefined) updateData.bio = bio;
      if (profileImage !== undefined) updateData.profileImage = profileImage;
      if (username !== undefined) updateData.username = username;

      const updatedUser = await storage.updateUserProfile(userId, updateData);
      res.json(updatedUser);
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });

  // Diary routes
  app.get('/api/diary', async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }

      const entries = await storage.getDiaryEntries(userId);
      res.json(entries);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      res.status(500).json({ error: 'Failed to fetch diary entries' });
    }
  });

  app.post('/api/diary', async (req, res) => {
    try {
      const { userId, title, content, mood } = req.body;
      
      if (!userId || !content) {
        return res.status(400).json({ error: 'User ID and content required' });
      }

      const newEntry = await storage.createDiaryEntry({ title, content, mood }, userId);
      res.json(newEntry);
    } catch (error) {
      console.error('Error creating diary entry:', error);
      res.status(500).json({ error: 'Failed to create diary entry' });
    }
  });

  app.put('/api/diary/:id', async (req, res) => {
    try {
      const entryId = parseInt(req.params.id);
      const { title, content, mood } = req.body;

      const updatedEntry = await storage.updateDiaryEntry(entryId, { title, content, mood });
      res.json(updatedEntry);
    } catch (error) {
      console.error('Error updating diary entry:', error);
      res.status(500).json({ error: 'Failed to update diary entry' });
    }
  });

  app.delete('/api/diary/:id', async (req, res) => {
    try {
      const entryId = parseInt(req.params.id);
      await storage.deleteDiaryEntry(entryId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      res.status(500).json({ error: 'Failed to delete diary entry' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
