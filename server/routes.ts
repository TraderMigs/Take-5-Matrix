import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Anthropic from '@anthropic-ai/sdk';
import { setupGoogleAuth } from './google-auth';
import { generateVerificationToken, sendVerificationEmail, sendWelcomeEmail } from './email-service';
import bcrypt from 'bcryptjs';

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

// Fallback response system for testing without API key
function generateFallbackResponse(message: string, conversationHistory: any[] = []): any {
  const lowerMessage = message.toLowerCase();
  
  // Crisis/Emergency responses with caring tone and contact option
  if (detectCrisisKeywords(message)) {
    return {
      response: "I hear you, and I want you to know that no matter what, there's someone who loves you and is thinking about you right now. These feelings are incredibly difficult, but you don't have to face them alone. We can keep this conversation between you and me, but if you want someone warm and caring to talk to right now, would you like me to show you your trusted contacts so you can reach out to someone who cares about you?",
      showContacts: true,
      isCrisis: true
    };
  }
  
  // All other responses return string format for normal chat
  // Anxiety responses
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
    return { response: "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. You can also try the breathing exercise feature in this app. What's making you feel most anxious right now?" };
  }
  
  // Depression responses
  if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
    return { response: "I'm sorry you're feeling this way. Depression can make everything feel heavy and difficult. Remember that these feelings are temporary, even when they don't feel like it. Small steps matter - have you eaten or had water today? Sometimes basic self-care can help a little." };
  }
  
  // Overwhelmed responses
  if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much') || lowerMessage.includes('can\'t cope')) {
    return { response: "Feeling overwhelmed is a sign that you're dealing with a lot right now. Let's break things down into smaller pieces. Try focusing on just the next 5 minutes. What's one small thing you could do right now to take care of yourself?" };
  }
  
  // Loneliness responses
  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
    return { response: "Loneliness is one of the hardest feelings to bear. You're not alone in feeling this way - many people struggle with loneliness. You took a brave step by reaching out here. Consider connecting with trusted contacts in this app or joining a support group in your area." };
  }
  
  // Stress responses
  if (lowerMessage.includes('stress') || lowerMessage.includes('stressed')) {
    return { response: "Stress can really take a toll on both your mind and body. Try some grounding techniques - name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. The breathing exercises in this app can also help reduce stress." };
  }
  
  // Sleep issues
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
    return { response: "Sleep troubles can make everything harder to handle. Try creating a calming bedtime routine - avoid screens an hour before bed, try gentle breathing exercises, or listen to calming sounds. If sleep problems persist, consider talking to a healthcare provider." };
  }
  
  // Physical needs
  if (lowerMessage.includes('hungry') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return { response: "It sounds like you're feeling hungry. Taking care of your basic needs is really important, especially when you're going through a difficult time. If you can, try to have something nourishing to eat - even something small can help you feel more stable and grounded." };
  }
  
  // General support responses
  const supportResponses = [
    "Thank you for sharing that with me. It takes courage to open up about what you're going through. How are you feeling right now in this moment?",
    "I hear you, and what you're experiencing sounds really difficult. You're not alone in this. What's been the hardest part of your day?",
    "It sounds like you're going through a tough time. Your feelings are valid, and it's okay to not be okay sometimes. What would feel most helpful to you right now?",
    "I'm here to listen. Sometimes just talking about what's on your mind can help lighten the load a little. What's been weighing on you most?",
    "You've taken a positive step by reaching out. That shows strength, even if you don't feel strong right now. What kind of support would be most helpful?"
  ];
  
  // First conversation
  if (!conversationHistory || conversationHistory.length <= 1) {
    return { response: "I'm glad you decided to talk with me today. This is a safe space where you can share whatever is on your mind. What's been going on for you lately?" };
  }
  
  // Random supportive response
  return { response: supportResponses[Math.floor(Math.random() * supportResponses.length)] };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Google OAuth routes
  setupGoogleAuth(app);

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

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
      });

      // Generate verification token and send email
      const token = generateVerificationToken();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.setEmailVerificationToken(newUser.id, token, expires);
      
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const emailSent = await sendVerificationEmail(email, username, token, baseUrl);
      
      if (!emailSent) {
        console.error('Failed to send verification email');
      }

      res.json({ 
        message: 'Account created successfully. Please check your email to verify your account.',
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

  app.put('/api/auth/profile', async (req, res) => {
    try {
      const { displayName, bio, userId, profileImage } = req.body;
      
      if (!userId) {
        return res.status(400).send('User ID required');
      }

      const updateData: any = {};
      if (displayName !== undefined) updateData.displayName = displayName;
      if (bio !== undefined) updateData.bio = bio;
      if (profileImage !== undefined) updateData.profileImage = profileImage;

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
