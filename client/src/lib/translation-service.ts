import { getTranslation, hasTranslations } from './comprehensive-translations';
import { getExtendedTranslation, hasExtendedTranslations } from './extended-translations';
import OpenAI from 'openai';

// Initialize OpenAI only if API key is available
let openai: OpenAI | null = null;
if (import.meta.env.VITE_OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
}

// Language mapping for OpenAI translation
const languageMap: Record<string, string> = {
  'en': 'English',
  'th': 'Thai',
  'es': 'Spanish',
  'fr': 'French', 
  'de': 'German',
  'zh': 'Chinese (Simplified)',
  'ja': 'Japanese',
  'ar': 'Arabic',
  'ru': 'Russian',
  'pt': 'Portuguese',
  'it': 'Italian',
  'ko': 'Korean',
  'hi': 'Hindi',
  'tr': 'Turkish',
  'pl': 'Polish',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'no': 'Norwegian',
  'da': 'Danish',
  'fi': 'Finnish',
  'he': 'Hebrew',
  'cs': 'Czech',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'bg': 'Bulgarian',
  'hr': 'Croatian',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'et': 'Estonian',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'el': 'Greek',
  'uk': 'Ukrainian',
  'vi': 'Vietnamese',
  'id': 'Indonesian',
  'ms': 'Malay',
  'bn': 'Bengali',
  'ur': 'Urdu',
  'fa': 'Persian'
};

// Cache for translations
const translationCache = new Map<string, string>();

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  // Return English text as-is
  if (targetLanguage === 'en') {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}_${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // Try comprehensive translations first (core + extended)
  const extendedTranslated = getExtendedTranslation(targetLanguage, text);
  if (extendedTranslated !== text) {
    translationCache.set(cacheKey, extendedTranslated);
    return extendedTranslated;
  }
  
  // Fallback to core translations
  const preTranslated = getTranslation(targetLanguage, text);
  if (preTranslated !== text) {
    translationCache.set(cacheKey, preTranslated);
    return preTranslated;
  }

  // If OpenAI is available and language has translations, use AI for dynamic content
  if (openai && hasTranslations(targetLanguage)) {
    try {
      const targetLangName = languageMap[targetLanguage];
      if (!targetLangName) {
        return text;
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the given text to ${targetLangName}. Maintain the same tone and context. For mental health and wellness content, use compassionate and supportive language. Return only the translation without any additional text or explanations.`
          },
          {
            role: "user",
            content: text
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      });

      const translation = response.choices[0].message.content?.trim() || text;
      
      // Cache the translation
      translationCache.set(cacheKey, translation);
      
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  // For languages with extended translations, try comprehensive text matching
  if (hasExtendedTranslations(targetLanguage) || hasTranslations(targetLanguage)) {
    // Enhanced common phrases mapping using both translation systems
    const commonPhrases: Record<string, string> = {
      'Welcome Back': getExtendedTranslation(targetLanguage, 'welcomeBack', 'Welcome Back'),
      'Create Account': getExtendedTranslation(targetLanguage, 'createAccount', 'Create Account'),
      'Continue with Google': getExtendedTranslation(targetLanguage, 'continueWithGoogle', 'Continue with Google'),
      'OR': getExtendedTranslation(targetLanguage, 'or', 'OR'),
      'Need an account? Sign up': getExtendedTranslation(targetLanguage, 'needAccountSignUp', 'Need an account? Sign up'),
      'Email': getExtendedTranslation(targetLanguage, 'email', 'Email'),
      'Password': getExtendedTranslation(targetLanguage, 'password', 'Password'),
      'Sign In': getExtendedTranslation(targetLanguage, 'signIn', 'Sign In'),
      'Sign Up': getExtendedTranslation(targetLanguage, 'signUp', 'Sign Up'),
      'Close': getExtendedTranslation(targetLanguage, 'close', 'Close'),
      'Save': getExtendedTranslation(targetLanguage, 'save', 'Save'),
      'Cancel': getExtendedTranslation(targetLanguage, 'cancel', 'Cancel'),
      'Loading...': getExtendedTranslation(targetLanguage, 'loading', 'Loading...'),
      'Error': getExtendedTranslation(targetLanguage, 'error', 'Error'),
      'Success': getExtendedTranslation(targetLanguage, 'success', 'Success')
    };

    if (commonPhrases[text]) {
      const result = commonPhrases[text];
      translationCache.set(cacheKey, result);
      return result;
    }
  }

  return text; // Return original text if no translation available
}

// Batch translation for multiple texts
export async function translateTexts(texts: string[], targetLanguage: string): Promise<string[]> {
  if (targetLanguage === 'en') {
    return texts;
  }

  try {
    const targetLangName = languageMap[targetLanguage];
    if (!targetLangName) {
      return texts;
    }

    // Check cache for all texts
    const uncachedTexts: string[] = [];
    const results: string[] = new Array(texts.length);
    
    texts.forEach((text, index) => {
      const cacheKey = `${text}_${targetLanguage}`;
      if (translationCache.has(cacheKey)) {
        results[index] = translationCache.get(cacheKey)!;
      } else {
        uncachedTexts.push(text);
      }
    });

    // If all texts are cached, return results
    if (uncachedTexts.length === 0) {
      return results;
    }

    // Translate uncached texts in batch
    const batchText = uncachedTexts.join('\n---SEPARATOR---\n');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate each text separated by "---SEPARATOR---" to ${targetLangName}. Maintain the same tone and context. For mental health and wellness content, use compassionate and supportive language. Return the translations separated by "---SEPARATOR---" in the same order, without any additional text or explanations.`
        },
        {
          role: "user",
          content: batchText
        }
      ],
      max_tokens: 2000,
      temperature: 0.3
    });

    const translatedBatch = response.choices[0].message.content?.trim() || '';
    const translatedTexts = translatedBatch.split('---SEPARATOR---');

    // Fill in the uncached translations
    let uncachedIndex = 0;
    texts.forEach((text, index) => {
      const cacheKey = `${text}_${targetLanguage}`;
      if (!translationCache.has(cacheKey)) {
        const translation = translatedTexts[uncachedIndex]?.trim() || text;
        translationCache.set(cacheKey, translation);
        results[index] = translation;
        uncachedIndex++;
      }
    });

    return results;
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts;
  }
}