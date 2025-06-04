export interface Translation {
  // App core
  appName: string;
  tagline: string;
  searchPlaceholder: string;
  
  // Emergency
  emergencySupport: string;
  callEmergency: string;
  crisisHotline: string;
  crisisHotlineCall: string;
  emergencyWarning: string;
  
  // Authentication & User Account
  login: string;
  createAccount: string;
  loginToCreateContactsList: string;
  signInWithGoogle: string;
  
  // Support modules
  additionalSupport: string;
  howCanWeSupport: string;
  feelOverwhelmed: string;
  breathingDescription: string;
  feelAnxious: string;
  anxiousDescription: string;
  feelDepressed: string;
  depressedDescription: string;
  needToTalk: string;
  talkDescription: string;
  
  // Quick tools
  breathing: string;
  breathingGuide: string;
  affirmations: string;
  kindWords: string;
  calmMusic: string;
  soothingSounds: string;
  grounding: string;
  groundingTechnique: string;
  
  // Contact Management
  trustedContacts: string;
  confidenceContacts: string;
  addTrustedContact: string;
  
  // Contact form
  name: string;
  phoneNumber: string;
  relationship: string;
  enterName: string;
  enterPhone: string;
  enterRelationship: string;
  addContact: string;
  
  // Footer messages
  footerMessage1: string;
  footerMessage2: string;
  footerMessage3: string;
  footerMessage4: string;
  
  // Support resources
  visitWebsite: string;
  callNow: string;
  cancel: string;
  close: string;
  
  // Breathing modal
  breathingExercise: string;
  inhale: string;
  hold: string;
  exhale: string;
  
  // Profile
  yourProfile: string;
  profile: string;
  privateDiary: string;
  yourPrivateDiary: string;
  newEntry: string;
  addQuotePlaceholder: string;
  logout: string;
  
  // Diary
  entryTitle: string;
  writeThoughts: string;
  saveEntry: string;
  startWriting: string;
  entriesSaved: string;
  entryTitlePlaceholder: string;
  writeThoughtsPlaceholder: string;
  entrySaved: string;
  entryUpdated: string;
  entryDeleted: string;
  
  // AI Chat
  aiWelcomeMessage: string;
  aiSupportChat: string;
  aiImHere: string;
  talkToMe: string;
  chatWithAi: string;
  compassionateAssistant: string;
  immediateSupport: string;
  copingStrategies: string;
  someoneToListen: string;
  startConversation: string;
  typeYourMessage: string;
  crisisWarning: string;
  unmuteAi: string;
  changeNamePrompt: string;
  enterYourName: string;
  whatsYourName: string;
  
  // Affirmations/Quotes
  youDeservePeace: string;
  youAreStronger: string;
  youMatter: string;
  thisToWillPass: string;
  youAreNotAlone: string;
  youAreLoved: string;
  
  // Rotating Affirmations Array
  rotatingAffirmations: string[];
  
  // Profile UI
  backgroundImage: string;
  noBackgroundImageSet: string;
  uploadImage: string;
  setYourPersonalBackground: string;
  chooseYourImage: string;
  uploadAnyPhoto: string;
  cropPosition: string;
  useEditorToCrop: string;
  screenImage: string;
  diary: string;
  remove: string;
  
  // Legal
  legalPoliciesDisclamers: string;
  privacyPolicy: string;
  termsConditions: string;
  disclaimer: string;
  effectiveDate: string;
  
  // Legal Content
  legalContent: {
    effectiveDate: string;
    privacyIntro: string;
    informationWeCollect: string;
    personalDetails: string;
    journalingEntries: string;
    usageData: string;
    deviceData: string;
    howWeUseData: string;
    operateApp: string;
    personalizedFeatures: string;
    improveExperience: string;
    sendUpdates: string;
    sharingData: string;
    noSellData: string;
    noSharePrivate: string;
    thirdPartyServices: string;
    dataSecurity: string;
    encryption: string;
    deleteRequest: string;
    yourRights: string;
    accessCorrectDelete: string;
    withdrawConsent: string;
    lodgeComplaint: string;
    termsIntro: string;
    eligibility: string;
    ageRequirement: string;
    ageRepresentation: string;
    mustBe18: string;
    represent18: string;
    noMedicalAdvice: string;
    informationalOnly: string;
    noMedicalDiagnosis: string;
    notReplacement: string;
    noMedicalAdviceText: string;
    notReplaceProfessional: string;
    consultProvider: string;
    aiContentUsage: string;
    aiNotTherapist: string;
    thirdPartyContent: string;
    youtubeContent: string;
    emergencyDisclaimer: string;
    emergencyUserTool: string;
    emergencyText: string;
    notEmergencyService: string;
    callEmergencyServices: string;
    limitationLiability: string;
    noLiability: string;
    useAtRisk: string;
    noWarranties: string;
    disclaimerIntro: string;
    notMedicalDevice: string;
    supplementNot: string;
    ifCrisis: string;
  };
}

export type Language = 'en' | 'es' | 'th' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar' | 'hi' | 'nl';

// Complete English translations
const englishTranslations: Translation = {
  appName: "Take 5",
  tagline: "Take a breath. Take back control.",
  searchPlaceholder: "Type how you feel: 'I'm alone', 'homeless', 'want to die'...",
  emergencySupport: "Emergency Support",
  callEmergency: "Call {number} (Emergency)",
  crisisHotline: "Crisis Hotline",
  crisisHotlineCall: "Call Now",
  emergencyWarning: "If you're in immediate danger, call emergency services",
  
  // Authentication & User Account
  login: "login",
  createAccount: "createAccount",
  loginToCreateContactsList: "loginToCreateContactsList",
  signInWithGoogle: "Sign in with Google",
  
  additionalSupport: "Additional Support",
  howCanWeSupport: "How are you feeling, friend?",
  feelOverwhelmed: "I Feel Overwhelmed",
  breathingDescription: "Breathing exercises and grounding techniques",
  feelAnxious: "I Feel Anxious",
  anxiousDescription: "Anxiety management and coping strategies",
  feelDepressed: "I Feel Depressed",
  depressedDescription: "Depression support and mood resources",
  needToTalk: "I Need to Talk",
  talkDescription: "Professional counseling and peer support",
  
  // Support modules
  breathing: "Breathing",
  breathingGuide: "5-min guide",
  affirmations: "Affirmations",
  kindWords: "Kind words",
  calmMusic: "Calm Music",
  soothingSounds: "Soothing sounds",
  grounding: "Grounding",
  groundingTechnique: "5-4-3-2-1",
  
  // Contact Management
  trustedContacts: "Your Trusted Contacts",
  confidenceContacts: "Your Trusted Contacts",
  addTrustedContact: "Add a trusted contact",
  
  // Contact form
  name: "Name",
  phoneNumber: "Phone Number",
  relationship: "Relationship",
  enterName: "Enter name",
  enterPhone: "Enter phone number",
  enterRelationship: "e.g., Therapist, Friend, Family",
  addContact: "Add Contact",
  
  footerMessage1: "You're not alone.",
  footerMessage2: "You matter. Your life has value.",
  footerMessage3: "Help is always available.",
  footerMessage4: "This moment is temporary. You got this!",
  visitWebsite: "Visit Website",
  callNow: "Call Now",
  cancel: "Cancel",
  close: "Close",
  
  breathingExercise: "Breathing Exercise",
  inhale: "Inhale",
  hold: "Hold",
  exhale: "Exhale",
  
  // Profile
  yourProfile: "Your Profile",
  profile: "Profile",
  privateDiary: "Private Diary",
  yourPrivateDiary: "Your Private Diary",
  newEntry: "New Entry",
  addQuotePlaceholder: "Add a quote (40 chars max)",
  logout: "Logout",
  
  // Diary
  entryTitle: "Entry title...",
  writeThoughts: "Write your thoughts...",
  saveEntry: "Save Entry",
  startWriting: "Start writing to track your thoughts and feelings.",
  entriesSaved: "Your entries are saved permanently and only visible to you.",
  entryTitlePlaceholder: "Entry title...",
  writeThoughtsPlaceholder: "Write your thoughts...",
  entrySaved: "Your diary entry has been saved permanently.",
  entryUpdated: "Your diary entry has been saved successfully.",
  entryDeleted: "Your diary entry has been permanently removed.",
  
  // AI Chat
  aiWelcomeMessage: "Hello, I'm here to listen and support you. You're not alone. What's on your mind today?",
  aiSupportChat: "AI Support Chat",
  aiImHere: "I'm here. Talk to me.",
  talkToMe: "Talk to me",
  chatWithAi: "Chat with our compassionate AI assistant",
  compassionateAssistant: "compassionate AI assistant",
  immediateSupport: "for immediate support",
  copingStrategies: "coping strategies",
  someoneToListen: "and someone to listen",
  startConversation: "Start Conversation",
  typeYourMessage: "Type your message...",
  crisisWarning: "If you're in crisis, please call 988 or emergency services immediately",
  unmuteAi: "Unmute AI",
  changeNamePrompt: "Change Name",
  enterYourName: "Enter your name",
  whatsYourName: "What's your name?",
  
  // Affirmations/Quotes
  youDeservePeace: "You deserve peace and happiness",
  youAreStronger: "You are stronger than you know",
  youMatter: "You matter. Your life has value.",
  thisToWillPass: "This too shall pass",
  youAreNotAlone: "You are not alone in this",
  youAreLoved: "You are loved and valued",
  
  // Rotating Affirmations Array
  rotatingAffirmations: [
    "You are stronger than you think",
    "This moment is temporary. You got this!",
    "You matter. Your life has value",
    "Help is always available",
    "You are not alone in this journey",
    "Every breath you take is a victory",
    "You have overcome challenges before",
    "Your feelings are valid and temporary",
    "Tomorrow can be different",
    "You are worthy of love and support"
  ],
  
  // Profile UI
  backgroundImage: "Background Image",
  noBackgroundImageSet: "No background image set",
  uploadImage: "Upload Image",
  setYourPersonalBackground: "Set Your Personal Background",
  chooseYourImage: "Choose Your Image",
  uploadAnyPhoto: "Upload any photo from your device",
  cropPosition: "Crop & Position",
  useEditorToCrop: "Use our editor to crop and center your image perfectly",
  screenImage: "Screen Image",
  diary: "Diary",
  remove: "Remove",
  
  // Legal
  legalPoliciesDisclamers: "Legal Policies & Disclaimers",
  privacyPolicy: "Privacy Policy",
  termsConditions: "Terms & Conditions",
  disclaimer: "Disclaimer",
  effectiveDate: "Effective Date",
  
  // Legal Content
  legalContent: {
    effectiveDate: "Effective Date: June 6, 2025",
    privacyIntro: "Take 5 values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use the Take 5 app.",
    informationWeCollect: "Information We Collect:",
    personalDetails: "Personal details you provide (e.g., name, email address, emergency contact info)",
    journalingEntries: "Journaling entries (stored locally or securely encrypted if on our servers)",
    usageData: "Usage data (pages visited, buttons clicked, interactions with the app)",
    deviceData: "Device data (device type, operating system, browser type)",
    howWeUseData: "How We Use Your Data:",
    operateApp: "To operate and maintain the App",
    personalizedFeatures: "To allow you to use personalized features (e.g., diary, emergency contacts)",
    improveExperience: "To improve user experience and develop new features",
    sendUpdates: "To send occasional updates or alerts if you opt-in",
    sharingData: "Sharing of Data:",
    noSellData: "We do not sell your data",
    noSharePrivate: "We do not share your private data with third parties unless legally required",
    thirdPartyServices: "We may use third-party services (e.g., YouTube API, Google Analytics), and their data collection practices are governed by their own policies",
    dataSecurity: "Data Security:",
    encryption: "We implement industry-standard encryption and access controls",
    deleteRequest: "Users may request data deletion by emailing tradermigs@gmail.com",
    yourRights: "Your Rights (GDPR, CCPA, etc.):",
    accessCorrectDelete: "Right to access, correct, or delete your data",
    withdrawConsent: "Right to withdraw consent or opt-out of communications",
    lodgeComplaint: "Right to lodge a complaint with a data protection authority",
    termsIntro: "By using the Take 5 app, you agree to the following terms. If you do not agree, do not use the App.",
    eligibility: "Eligibility:",
    ageRequirement: "You must be 18 years or older to use the App.",
    ageRepresentation: "By using the App, you represent that you are at least 18 years old.",
    mustBe18: "You must be 18 years or older to use the App.",
    represent18: "By using the App, you represent that you are at least 18 years old.",
    noMedicalAdvice: "No Medical Advice:",
    informationalOnly: "The App is for informational and motivational purposes only.",
    noMedicalDiagnosis: "Take 5 does not provide medical advice, diagnosis, or treatment.",
    notReplacement: "Content within the App is not intended to replace professional mental health or medical care.",
    noMedicalAdviceText: "Take 5 does not provide medical advice, diagnosis, or treatment.",
    notReplaceProfessional: "Content within the App (quotes, affirmations, AI chat, linked videos) is not intended to replace professional mental health or medical care.",
    consultProvider: "Always consult a qualified healthcare provider for mental health issues.",
    aiContentUsage: "AI and Content Usage:",
    aiNotTherapist: "The AI chatbot is a basic conversational assistant. It is not a therapist, licensed counselor, or crisis worker.",
    thirdPartyContent: "We may link to third-party content (e.g., YouTube videos). We do not control such content.",
    youtubeContent: "We may link to third-party content (e.g., YouTube videos). We do not control such content and are not responsible for its accuracy or availability.",
    emergencyDisclaimer: "Emergency Feature Disclaimer:",
    emergencyUserTool: "The emergency contact and hotline features are user tools to help connect with external resources.",
    emergencyText: "The emergency contact and hotline features are user tools to help connect with external resources.",
    notEmergencyService: "Take 5 is not an emergency service. In a crisis, call your local emergency number immediately.",
    callEmergencyServices: "If you're experiencing thoughts of self-harm, call emergency services or a crisis hotline.",
    limitationLiability: "Limitation of Liability:",
    noLiability: "You use the App at your own risk.",
    useAtRisk: "You use the App at your own risk.",
    noWarranties: "We provide no warranties or guarantees about the App's effectiveness for mental health outcomes.",
    disclaimerIntro: "Take 5 is a wellness and motivational app designed to provide emotional support resources and coping tools. Important disclaimers:",
    notMedicalDevice: "This is not a medical device or professional mental health treatment.",
    supplementNot: "It supplements but does not replace professional care.",
    ifCrisis: "If you're in crisis, please contact emergency services or a mental health professional immediately.",
  }
};

export const translations: Record<Language, Translation> = {
  en: englishTranslations,
  es: englishTranslations, // Will use English as fallback
  th: englishTranslations, // Will use English as fallback
  fr: englishTranslations, // Will use English as fallback
  de: englishTranslations, // Will use English as fallback
  it: englishTranslations, // Will use English as fallback
  pt: englishTranslations, // Will use English as fallback
  ru: englishTranslations, // Will use English as fallback
  ja: englishTranslations, // Will use English as fallback
  ko: englishTranslations, // Will use English as fallback
  zh: englishTranslations, // Will use English as fallback
  ar: englishTranslations, // Will use English as fallback
  hi: englishTranslations, // Will use English as fallback
  nl: englishTranslations, // Will use English as fallback
};

// Translation function with placeholder support
export function t(
  key: string,
  placeholders?: Record<string, string>,
  language: Language = 'en'
): string {
  const keys = key.split('.');
  let value: any = translations[language] || translations.en;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if not found
    }
  }
  
  if (typeof value === 'string') {
    if (placeholders) {
      return value.replace(/\{(\w+)\}/g, (match, placeholder) => {
        return placeholders[placeholder] || match;
      });
    }
    return value;
  }
  
  return key;
}

// Legacy function for compatibility
export function getTranslation(language: Language): Translation {
  return translations[language] || translations.en;
}