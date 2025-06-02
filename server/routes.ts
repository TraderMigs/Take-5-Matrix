import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Anthropic from '@anthropic-ai/sdk';

// Fallback response system for testing without API key
function generateFallbackResponse(message: string, conversationHistory: any[] = []): string {
  const lowerMessage = message.toLowerCase();
  
  // Crisis/Emergency responses
  if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('end my life')) {
    return "I'm really concerned about you right now. Your life has value and you deserve support. Please reach out to a crisis helpline immediately - you can find emergency numbers at the top of this app, or call 988 (Suicide & Crisis Lifeline) if you're in the US. You don't have to face this alone.";
  }
  
  if (lowerMessage.includes('hurt myself') || lowerMessage.includes('self harm')) {
    return "I hear that you're in pain right now. Those feelings are valid, but there are safer ways to cope. Try the breathing exercise in this app, or reach out to a trusted person. If you're in immediate danger, please contact a crisis hotline or emergency services.";
  }
  
  // Anxiety responses
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
    return "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. You can also try the breathing exercise feature in this app. What's making you feel most anxious right now?";
  }
  
  // Depression responses
  if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
    return "I'm sorry you're feeling this way. Depression can make everything feel heavy and difficult. Remember that these feelings are temporary, even when they don't feel like it. Small steps matter - have you eaten or had water today? Sometimes basic self-care can help a little.";
  }
  
  // Overwhelmed responses
  if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much') || lowerMessage.includes('can\'t cope')) {
    return "Feeling overwhelmed is a sign that you're dealing with a lot right now. Let's break things down into smaller pieces. Try focusing on just the next 5 minutes. What's one small thing you could do right now to take care of yourself?";
  }
  
  // Loneliness responses
  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
    return "Loneliness is one of the hardest feelings to bear. You're not alone in feeling this way - many people struggle with loneliness. You took a brave step by reaching out here. Consider connecting with trusted contacts in this app or joining a support group in your area.";
  }
  
  // Stress responses
  if (lowerMessage.includes('stress') || lowerMessage.includes('stressed')) {
    return "Stress can really take a toll on both your mind and body. Try some grounding techniques - name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. The breathing exercises in this app can also help reduce stress.";
  }
  
  // Sleep issues
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
    return "Sleep troubles can make everything harder to handle. Try creating a calming bedtime routine - avoid screens an hour before bed, try gentle breathing exercises, or listen to calming sounds. If sleep problems persist, consider talking to a healthcare provider.";
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
    return "I'm glad you decided to talk with me today. This is a safe space where you can share whatever is on your mind. What's been going on for you lately?";
  }
  
  // Random supportive response
  return supportResponses[Math.floor(Math.random() * supportResponses.length)];
}

export async function registerRoutes(app: Express): Promise<Server> {
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

      const systemPrompt = `You are a compassionate AI mental health support assistant for the "Take 5" crisis support app. Your role is to:

1. Provide immediate emotional support and validation
2. Help users feel heard and understood
3. Offer practical coping strategies and breathing techniques
4. Suggest appropriate resources when needed
5. Maintain a warm, empathetic, and non-judgmental tone
6. Never provide medical diagnosis or replace professional help
7. Always encourage professional help for serious situations

Guidelines:
- Keep responses concise but caring (2-4 sentences typically)
- Use calming, supportive language
- Validate emotions and experiences
- Offer practical immediate coping strategies
- Suggest breathing exercises, grounding techniques, or mindfulness
- If someone mentions self-harm or suicide, gently encourage professional help
- Remember this is a crisis support context - prioritize safety and immediate help

Current conversation context:
${conversationContext}

Respond to the user's message with empathy and practical support.`;

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

  const httpServer = createServer(app);

  return httpServer;
}
