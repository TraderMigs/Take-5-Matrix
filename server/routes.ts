import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Anthropic from '@anthropic-ai/sdk';

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
        return res.status(500).json({ 
          error: "AI service is not configured. Please contact support." 
        });
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
