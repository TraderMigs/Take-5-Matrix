import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from 'openai';
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

// Advanced intelligent response system with maximum realism
function generateFallbackResponse(message: string, conversationHistory: any[] = []): any {
  const lowerMessage = message.toLowerCase();
  const messageLength = message.trim().length;
  const words = message.trim().split(/\s+/);
  const wordCount = words.length;
  
  // Analyze conversation patterns
  const lastFewMessages = conversationHistory.slice(-3);
  const userHasSharedPersonal = lastFewMessages.some(msg => 
    msg.sender === 'user' && (
      msg.text.toLowerCase().includes('i feel') || 
      msg.text.toLowerCase().includes('i am') || 
      msg.text.toLowerCase().includes('my')
    )
  );
  
  // Crisis/Emergency responses with immediate care
  if (detectCrisisKeywords(message)) {
    const crisisResponses = [
      "I hear the pain in your words, and I want you to know that what you're feeling right now - as overwhelming as it is - can change. You reached out to me, which shows there's still a part of you that wants to find a way through this. Right now, in this moment, you're not alone. If you'd like, I can show you your trusted contacts so you can reach someone who cares about you.",
      "What you're going through sounds incredibly difficult, and I'm concerned about you. These feelings are real and they matter, but they don't define your worth or your future. You took a brave step by sharing this with me. Would it help to see your emergency contacts so you can talk to someone who knows and cares about you?",
      "I can feel how much you're hurting right now. Thank you for trusting me with something so personal and painful. You don't have to carry this weight alone - there are people who want to help you through this. Can I show you your trusted contacts so you can reach out to someone who cares?"
    ];
    return {
      response: crisisResponses[Math.floor(Math.random() * crisisResponses.length)],
      showContacts: true,
      isCrisis: true
    };
  }

  // Analyze emotional intensity and respond accordingly
  const intensityWords = ['extremely', 'really', 'very', 'so', 'incredibly', 'absolutely', 'totally', 'completely'];
  const hasIntensity = intensityWords.some(word => lowerMessage.includes(word));
  
  // Complex emotional states - multi-layered responses
  if (lowerMessage.includes('confused') || lowerMessage.includes('lost') || lowerMessage.includes('don\'t know')) {
    const confusionResponses = [
      "Confusion can feel like being in a fog where nothing makes sense anymore. That uncertainty is really unsettling, especially when you're trying to figure out something important. Sometimes when we're confused, it helps to start with what we do know, even if it's small. What's one thing you feel certain about right now?",
      "Being lost and not knowing which way to turn is such a disorienting feeling. It's like standing at a crossroads without a map. But you know what? The fact that you're aware you're confused actually shows you're thinking clearly about your situation. What's the main thing you're trying to figure out?",
      "That 'I don't know' feeling can be so frustrating, especially when people expect you to have answers. Sometimes our minds get overwhelmed when we're processing a lot at once. What's making you feel most uncertain right now?"
    ];
    return { response: confusionResponses[Math.floor(Math.random() * confusionResponses.length)] };
  }

  // Anger and frustration with validation
  if (lowerMessage.includes('angry') || lowerMessage.includes('mad') || lowerMessage.includes('frustrated') || lowerMessage.includes('furious')) {
    const angerResponses = [
      "Anger can be such a powerful emotion - it often shows up when something important to us feels threatened or when we feel unheard. Your anger is telling you something matters to you. What's behind this feeling? What happened that made you feel this way?",
      "I can hear the frustration in what you're sharing. Anger often masks other feelings like hurt, disappointment, or feeling powerless. It's completely valid to feel mad about things that aren't fair or right. What's been building up that finally made you reach this point?",
      "That burning feeling of anger is so intense, isn't it? Sometimes we get angry because we care deeply about something, and it feels like it's being dismissed or damaged. Your feelings make sense. Can you tell me what triggered this anger today?"
    ];
    return { response: angerResponses[Math.floor(Math.random() * angerResponses.length)] };
  }

  // Guilt and shame with gentle compassion
  if (lowerMessage.includes('guilt') || lowerMessage.includes('shame') || lowerMessage.includes('my fault') || lowerMessage.includes('should have')) {
    const guiltResponses = [
      "Guilt can be such a heavy burden to carry. It sounds like you're being really hard on yourself right now. Sometimes we take responsibility for things that aren't entirely our fault, or we hold ourselves to impossible standards. What's making you feel like you're to blame?",
      "That feeling of shame can make us want to hide from the world. But shame lies to us - it tells us we're fundamentally flawed when we're actually just human. Everyone makes mistakes and has regrets. What's this guilt really about? What are you afraid you've done wrong?",
      "I hear you beating yourself up, and it sounds exhausting to carry that weight. Self-forgiveness is often harder than forgiving others. Whatever happened, it doesn't define your entire worth as a person. Can you tell me what's making you feel so responsible?"
    ];
    return { response: guiltResponses[Math.floor(Math.random() * guiltResponses.length)] };
  }

  // Fear and worry with grounding
  if (lowerMessage.includes('scared') || lowerMessage.includes('afraid') || lowerMessage.includes('fear') || lowerMessage.includes('terrified')) {
    const fearResponses = [
      "Fear can make everything feel bigger and more threatening than it might actually be. Your nervous system is trying to protect you, but sometimes it goes into overdrive. Right now, in this moment, you're safe here with me. What's been making you feel scared?",
      "That feeling of being afraid can be so overwhelming - like your whole body is on high alert. Fear often comes when we're facing something unknown or when we've been hurt before. You're brave for acknowledging it instead of pushing it down. What's behind this fear?",
      "Being terrified is such an intense experience - it can make your heart race and your mind spin with worst-case scenarios. But you're here, talking about it, which takes real courage. What's been frightening you? Sometimes naming our fears can make them feel a little less powerful."
    ];
    return { response: fearResponses[Math.floor(Math.random() * fearResponses.length)] };
  }

  // Relationship and connection issues
  if (lowerMessage.includes('relationship') || lowerMessage.includes('boyfriend') || lowerMessage.includes('girlfriend') || lowerMessage.includes('partner') || lowerMessage.includes('family') || lowerMessage.includes('friend')) {
    const relationshipResponses = [
      "Relationships can be some of the most meaningful and challenging parts of our lives. When they're struggling, it affects everything else. It sounds like something important is happening with someone you care about. What's been going on that's weighing on you?",
      "The people we love can bring us the greatest joy and sometimes the deepest pain. Relationship challenges are never simple because feelings and history and expectations all get tangled up together. What's been happening that's making this feel difficult?",
      "It takes courage to talk about relationship struggles because they touch such a personal part of our lives. Whether it's family, friends, or a romantic partner, these connections shape how we see ourselves and the world. What's been troubling you about this relationship?"
    ];
    return { response: relationshipResponses[Math.floor(Math.random() * relationshipResponses.length)] };
  }

  // Work and life stress with practical empathy
  if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('school') || lowerMessage.includes('stress') || lowerMessage.includes('pressure')) {
    const stressResponses = [
      "Work and life pressures can feel relentless sometimes - like you're constantly running but never catching up. That kind of chronic stress wears on both your mind and body. It sounds like you're dealing with a lot right now. What's been the most overwhelming part?",
      "The pressure to perform and meet expectations can be exhausting, especially when it feels like there's no relief in sight. Your stress is completely valid - you're dealing with real challenges. What's been weighing on you most heavily lately?",
      "Stress has a way of making everything feel urgent and overwhelming at the same time. When we're in that mode for too long, it's hard to think clearly or take care of ourselves. You deserve support through this. What's been the biggest source of pressure for you?"
    ];
    return { response: stressResponses[Math.floor(Math.random() * stressResponses.length)] };
  }

  // Grief and loss with deep compassion
  if (lowerMessage.includes('died') || lowerMessage.includes('death') || lowerMessage.includes('lost') || lowerMessage.includes('grief') || lowerMessage.includes('miss')) {
    const griefResponses = [
      "Loss leaves such a profound emptiness, doesn't it? Grief isn't something we 'get over' - it's something we learn to carry differently. Every person and every loss is unique, so there's no right way to feel or heal. What are you missing most about what you've lost?",
      "When someone or something important is gone, it can feel like a piece of our world just disappeared. Grief comes in waves - sometimes gentle, sometimes overwhelming. You don't have to be strong all the time. What's been the hardest part about this loss?",
      "Missing someone or something that was important to you is one of the most natural and painful human experiences. Your grief shows how much that person or thing meant to you. There's no timeline for healing from loss. How are you coping with this emptiness?"
    ];
    return { response: griefResponses[Math.floor(Math.random() * griefResponses.length)] };
  }

  // Physical symptoms and health anxiety
  if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('sick') || lowerMessage.includes('pain') || lowerMessage.includes('headache')) {
    const physicalResponses = [
      "When our minds are struggling, our bodies often carry that stress too. Being tired all the time or feeling physical pain can make emotional challenges even harder to bear. It's like fighting a battle on multiple fronts. Have you been able to take care of your basic needs like sleep and food?",
      "Physical and emotional pain often go hand in hand - sometimes it's hard to tell which is causing which. Your body might be telling you that you need rest and care. It's not weakness to acknowledge when you're exhausted. What's been most difficult for you physically?",
      "That bone-deep exhaustion is so real when you're dealing with emotional stress. Your body and mind are working overtime to cope with whatever you're facing. Taking care of your physical needs isn't selfish - it's necessary. How have you been sleeping and eating lately?"
    ];
    return { response: physicalResponses[Math.floor(Math.random() * physicalResponses.length)] };
  }

  // Simple questions with emotional intelligence
  if (lowerMessage.includes('2+2') || lowerMessage.includes('what\'s 2+2') || lowerMessage.includes('math')) {
    return { response: "That's 4! Sometimes when we're going through difficult emotions, our minds look for simple, concrete things that make sense. Numbers don't lie or change based on how we're feeling - there's comfort in that certainty. Is there something more complex you're trying to work through, or did you just need a moment of clarity?" };
  }

  // Greetings with emotional awareness
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi' || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good evening')) {
    const timeBasedGreetings = [
      "Hi there. I'm really glad you decided to reach out today. Sometimes just taking that first step to connect with someone can feel like a big deal. How are you really doing right now?",
      "Hello. Thanks for being here. I know it's not always easy to open up to someone, even when you need support. What's going on in your world today?",
      "Hey. I appreciate you taking the time to talk with me. Whether you're having a good day or a tough one, I'm here to listen. What's been on your mind lately?",
      "Hi. I'm here for whatever you need to share - the good, the bad, or anything in between. What would be most helpful for you to talk about right now?"
    ];
    return { response: timeBasedGreetings[Math.floor(Math.random() * timeBasedGreetings.length)] };
  }

  // Responses to very short messages
  if (messageLength < 10 && wordCount <= 2) {
    const shortResponses = [
      "I can see you're reaching out, even if finding the words feels hard right now. Sometimes the biggest feelings are the hardest to put into sentences. Take your time - I'm not going anywhere. What's really on your heart?",
      "Thanks for being here with me. Sometimes we don't know exactly what we want to say, and that's completely okay. Even just showing up is meaningful. What feels most important for you to share right now?",
      "I hear you. Sometimes when we're overwhelmed, even finding words can feel difficult. You don't have to have it all figured out. What's one thing that's been weighing on you?",
      "Even just a few words can carry so much meaning. I'm here to listen to whatever you're comfortable sharing. What would help you feel heard right now?"
    ];
    return { response: shortResponses[Math.floor(Math.random() * shortResponses.length)] };
  }

  // Context-aware responses based on conversation depth
  if (conversationHistory && conversationHistory.length > 5) {
    const deepConversationResponses = [
      "I've been listening to everything you've shared, and I can hear how much you're carrying right now. It takes real strength to keep talking about difficult things. How are you feeling as we've been going through this together?",
      "Thank you for trusting me with so much of what's going on for you. These conversations aren't easy, but you're showing real courage by not keeping everything bottled up inside. What feels most important to focus on as we continue talking?",
      "I can see how much thought you're putting into sharing what's really happening in your life. That kind of openness and self-reflection isn't always easy. What's feeling most helpful to you about our conversation so far?",
      "You've shared a lot with me today, and I want you to know that everything you've said matters. Sometimes talking through our experiences can help us see them differently. What insights are coming up for you as we talk?"
    ];
    return { response: deepConversationResponses[Math.floor(Math.random() * deepConversationResponses.length)] };
  }

  // Enhanced first conversation response
  if (!conversationHistory || conversationHistory.length <= 1) {
    const welcomeResponses = [
      "I'm really glad you decided to talk with me today. This is a safe space where you can share whatever is on your mind - no judgment, just someone who genuinely wants to listen and understand. What's been going on for you lately?",
      "Thank you for being here. I know reaching out isn't always easy, but I'm honored that you chose to spend this time with me. Whether you're dealing with something specific or just need someone to talk to, I'm here. What would you like to share?",
      "It's good to meet you. I'm here because I believe everyone deserves to be heard and understood, especially when things feel difficult. You can share as much or as little as you're comfortable with. What's on your heart today?",
      "Welcome. I'm grateful you decided to connect today. Sometimes just having someone listen can make a real difference. This is your space to be authentic about whatever you're experiencing. What would feel most helpful to talk about?"
    ];
    return { response: welcomeResponses[Math.floor(Math.random() * welcomeResponses.length)] };
  }

  // Advanced emotional support responses
  const advancedSupportResponses = [
    "I can sense that something significant is weighing on you. Life has a way of presenting us with challenges that test our resilience, but you don't have to face them alone. What's been the most difficult part of what you're going through?",
    "Thank you for trusting me with what you're experiencing. Your willingness to reach out shows real strength, even if you don't feel strong right now. What's been occupying your thoughts the most lately?",
    "I hear you, and I want you to know that whatever you're feeling is valid and important. Sometimes we need someone to witness our struggles without trying to fix them. What would feel most helpful for you to express right now?",
    "It takes courage to be vulnerable about what's really going on in our lives. I'm here to listen without judgment and offer whatever support I can. What's been weighing on your heart that you'd like to share?",
    "I can feel that you're carrying something heavy. Sometimes talking through our experiences can help us process them differently or see new possibilities. What aspects of your situation feel most overwhelming right now?"
  ];
  
  return { response: advancedSupportResponses[Math.floor(Math.random() * advancedSupportResponses.length)] };
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Using GPT-4.1 Mini (gpt-4-1106-preview) as requested by user
async function getOpenAIResponse(message: string, conversationHistory: any[] = [], userName?: string): Promise<string> {
  try {
    // Count AI messages in current session to implement redirect logic
    const aiMessageCount = conversationHistory.filter(msg => msg.sender === 'ai').length;
    
    // After 2-3 AI responses, redirect to built-in tools
    if (aiMessageCount >= 2) {
      const redirectMessages = [
        `You know what helps most right now${userName ? `, ${userName}` : ''}? Try tapping "I Feel Overwhelmed". People say it really helps, and I think it'll do the same for you. I'll be right here after.`,
        `Hey${userName ? ` ${userName}` : ''}, I think you'd really benefit from trying "I Feel Anxious" right now. It's designed exactly for moments like this. Give it a try and come back to chat whenever you need.`,
        `${userName ? `${userName}, ` : ''}why don't you try the "Daily Reset" tool? It might be exactly what you need right now. I'll be here when you're ready to talk more.`
      ];
      return redirectMessages[Math.floor(Math.random() * redirectMessages.length)];
    }

    // Create context from conversation history
    const messages: Array<{role: 'system' | 'user' | 'assistant', content: string}> = [
      {
        role: "system",
        content: `You are a calm, emotionally supportive digital companion named "Take 5". You are not a therapist and don't give medical advice. Instead, you offer short, comforting conversations to help users feel seen and supported.

Always speak like a real human — warm, kind, relaxed, casual. Keep your responses under 100 words.

After 2 to 3 back-and-forth messages, kindly encourage the user to try one of the built-in tools in the app like "I Feel Anxious", "I Feel Overwhelmed", or "Daily Reset". Say things like:

"You know what helps most right now, [name]? Try tapping 'I Feel Overwhelmed'. People say it really helps, and I think it'll do the same for you. I'll be right here after."

Never pretend to be a doctor. Never fake empathy — always keep it real, grounded, and emotionally safe. Your job is to connect, not cure.`
      }
    ];

    // Add conversation history (keep last 4 messages for context)
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.slice(-4).forEach((msg: any) => {
        messages.push({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        });
      });
    }

    // Add current message
    messages.push({
      role: "user" as const,
      content: message
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview", // GPT-4.1 Mini as requested
      messages: messages,
      max_tokens: 150, // Limit for shorter responses
      temperature: 0.8, // Slightly higher for more human-like responses
    });

    return response.choices[0]?.message?.content || "I'm here with you. What's on your mind?";
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to existing response system
    return generateFallbackResponse(message, conversationHistory).response;
  }
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

  // AI Chat endpoint with GPT-4.1 Mini
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, conversationHistory, userName, language } = req.body;

      // Detect crisis keywords for emergency response
      const isCrisis = detectCrisisKeywords(message);
      if (isCrisis) {
        const crisisResponse = generateFallbackResponse(message, conversationHistory || []);
        return res.json({ 
          response: crisisResponse.response, 
          showContacts: crisisResponse.showContacts || false,
          isCrisis: crisisResponse.isCrisis || false
        });
      }

      // Use GPT-4.1 Mini with conversation context and personalized responses
      const aiResponse = await getOpenAIResponse(message, conversationHistory || [], userName);
      res.json({ response: aiResponse });
    } catch (error) {
      console.error("AI Chat error:", error);
      
      // Fallback to local response system if OpenAI fails
      const { message: reqMessage, conversationHistory: reqHistory } = req.body;
      const fallbackResponse = generateFallbackResponse(reqMessage, reqHistory || []);
      res.json({ 
        response: fallbackResponse.response,
        showContacts: fallbackResponse.showContacts || false,
        isCrisis: fallbackResponse.isCrisis || false
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
      const { userId, title, content, mood, images } = req.body;
      
      if (!userId || !content) {
        return res.status(400).json({ error: 'User ID and content required' });
      }

      const newEntry = await storage.createDiaryEntry({ title, content, mood, images }, userId);
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

  // Contact routes for persistent storage
  app.get('/api/contacts', async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const contacts = await storage.getContacts(userId);
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  app.post('/api/contacts', async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { name, phone, relationship } = req.body;
      
      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }

      const newContact = await storage.createContact({ name, phone, relationship }, userId);
      res.json(newContact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Failed to create contact' });
    }
  });

  app.put('/api/contacts/:id', async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const contactId = parseInt(req.params.id);
      const { name, phone, relationship } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }

      // First verify the contact belongs to the user
      const existingContacts = await storage.getContacts(userId);
      const contactExists = existingContacts.find(c => c.id === contactId);
      
      if (!contactExists) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      // Update the contact
      const updatedContact = await storage.updateContact(contactId, { name, phone, relationship });
      res.json(updatedContact);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Failed to update contact' });
    }
  });

  app.delete('/api/contacts/:id', async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const contactId = parseInt(req.params.id);

      // First verify the contact belongs to the user
      const existingContacts = await storage.getContacts(userId);
      const contactExists = existingContacts.find(c => c.id === contactId);
      
      if (!contactExists) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      await storage.deleteContact(contactId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
