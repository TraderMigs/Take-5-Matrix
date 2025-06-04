import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mental health and emotional support keywords for GPT-3.5 routing
const EMOTIONAL_KEYWORDS = [
  // Suicide/Self-harm related
  'suicidal', 'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
  'hurt myself', 'self harm', 'cut myself', 'harm myself', 'ending it all',
  
  // Depression/Mood related
  'depressed', 'depression', 'hopeless', 'worthless', 'empty', 'numb',
  'can\'t go on', 'give up', 'no point', 'hate myself', 'hate my life',
  
  // Anxiety/Panic related
  'anxiety', 'anxious', 'panic', 'panic attack', 'can\'t breathe', 'overwhelming',
  'scared', 'terrified', 'fear', 'worry', 'stressed out',
  
  // Social/Relationship issues
  'lonely', 'alone', 'isolated', 'bullied', 'bullying', 'rejected', 'abandoned',
  'nobody cares', 'no friends', 'unloved', 'misunderstood',
  
  // Trauma/Crisis related
  'trauma', 'abuse', 'abused', 'violated', 'assault', 'attacked',
  'flashback', 'nightmare', 'triggered', 'ptsd',
  
  // General distress
  'crying', 'sobbing', 'breakdown', 'falling apart', 'can\'t cope',
  'overwhelmed', 'exhausted', 'tired of living', 'what\'s the point'
];

// Function to detect if message contains emotional/mental health keywords
export function detectEmotionalContent(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return EMOTIONAL_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

// Enhanced AI response with model routing
export async function getAIResponse(
  message: string, 
  conversationHistory: any[] = [], 
  userName?: string
): Promise<{ response: string; model: string; audioUrl?: string }> {
  
  const isEmotionalContent = detectEmotionalContent(message);
  const selectedModel = isEmotionalContent ? 'gpt-3.5-turbo' : 'gpt-4-1106-preview';
  
  console.log(`Message analysis: Emotional content detected: ${isEmotionalContent}`);
  console.log(`Selected model: ${selectedModel}`);
  
  const maxRetries = 3;
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const messages: any[] = [
        {
          role: "system" as const,
          content: isEmotionalContent ? 
            // Enhanced emotional support system prompt for GPT-3.5
            `You are a compassionate mental health support companion for the Take 5 app. You're speaking with ${userName || 'someone'} who may be experiencing emotional distress.

CORE APPROACH:
- Be warm, empathetic, and genuinely caring
- Listen actively and validate their feelings
- Use supportive, non-judgmental language
- Ask gentle follow-up questions to understand better
- Provide hope and remind them they're not alone

EMOTIONAL SUPPORT GUIDELINES:
- Acknowledge their pain: "That sounds really difficult" or "I can hear how much you're hurting"
- Normalize their feelings: "It's completely understandable to feel this way"
- Offer gentle perspective without minimizing their experience
- Suggest grounding techniques or coping strategies when appropriate
- Remind them of their strength and resilience

SAFETY PRIORITIES:
- If they mention self-harm or suicide, encourage professional help
- Suggest calling crisis hotlines for immediate support
- Remind them that feelings are temporary and can change
- Never provide medical advice or diagnose

Keep responses conversational, supportive, and under 150 words. Focus on emotional connection and validation first.`
            :
            // General wellness system prompt for GPT-4
            `You are a friendly wellness companion for the Take 5 app, chatting with ${userName || 'someone'}. 

You provide support for:
- General wellness conversations
- Journaling guidance and reflection
- Breathing exercise tips
- Light mood check-ins
- Positive lifestyle suggestions
- Mindfulness and self-care ideas

TONE: Friendly, encouraging, and supportive but not overly clinical
STYLE: Conversational and relatable
LENGTH: Keep responses under 150 words

Help them explore their thoughts, celebrate small wins, and maintain positive mental wellness habits. Ask engaging questions to keep the conversation flowing naturally.`
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

      console.log(`AI API attempt ${attempt}/${maxRetries} using ${selectedModel}`);

      const response = await openai.chat.completions.create({
        model: selectedModel,
        messages: messages,
        max_tokens: 150,
        temperature: isEmotionalContent ? 0.7 : 0.8, // More stable for emotional content
      });

      const content = response.choices[0]?.message?.content;
      if (content && content.trim()) {
        console.log(`AI API success on attempt ${attempt} with ${selectedModel}`);
        
        // Generate audio for the response
        const audioUrl = await generateTextToSpeech(content.trim());
        
        return {
          response: content.trim(),
          model: selectedModel,
          audioUrl: audioUrl || undefined
        };
      }

      throw new Error("Empty response from AI API");

    } catch (error: any) {
      lastError = error;
      console.error(`AI API attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt < maxRetries) {
        const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  console.error('All AI API attempts failed');
  throw new Error(`AI service unavailable: ${lastError?.message || 'Unknown error'}`);
}

// Text-to-speech function
export async function generateTextToSpeech(text: string, voice: string = 'alloy'): Promise<string | null> {
  try {
    console.log(`Generating TTS for text: "${text.substring(0, 50)}..." with voice: ${voice}`);
    
    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: voice as any, // alloy, echo, fable, onyx, nova, shimmer
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
    
    console.log(`TTS generated successfully, audio length: ${buffer.length} bytes`);
    return audioUrl;
    
  } catch (error: any) {
    console.error('TTS generation failed:', error.message);
    return null;
  }
}

// Function to update emotional keywords (for easy editing)
export function updateEmotionalKeywords(newKeywords: string[]): void {
  EMOTIONAL_KEYWORDS.length = 0;
  EMOTIONAL_KEYWORDS.push(...newKeywords);
  console.log(`Emotional keywords updated. New count: ${EMOTIONAL_KEYWORDS.length}`);
}

// Get current keyword list
export function getEmotionalKeywords(): string[] {
  return [...EMOTIONAL_KEYWORDS];
}