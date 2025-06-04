export interface Translation {
  // Header
  appName: string;
  tagline: string;
  
  // Search
  searchPlaceholder: string;
  
  // Emergency
  emergencySupport: string;
  callEmergency: string;
  crisisHotline: string;
  crisisHotlineCall: string;
  emergencyWarning: string;
  
  // Support modules
  additionalSupport: string;
  howCanWeSupport: string;
  
  // Quick tools
  feelOverwhelmed: string;
  breathingDescription: string;
  feelAnxious: string;
  anxiousDescription: string;
  feelDepressed: string;
  depressedDescription: string;
  needToTalk: string;
  talkDescription: string;
  
  // Contacts
  trustedContacts: string;
  addTrustedContact: string;
  
  // Footer
  footerMessage1: string;
  footerMessage2: string;
  footerMessage3: string;
  footerMessage4: string;
  
  // Support resources
  visitWebsite: string;
  callNow: string;
  cancel: string;
  
  // Breathing modal
  breathingExercise: string;
  inhale: string;
  hold: string;
  exhale: string;
  close: string;
  
  // Support modules
  breathing: string;
  breathingGuide: string;
  affirmations: string;
  kindWords: string;
  calmMusic: string;
  soothingSounds: string;
  grounding: string;
  groundingTechnique: string;
  
  // Contact form
  name: string;
  phoneNumber: string;
  relationship: string;
  enterName: string;
  enterPhone: string;
  enterRelationship: string;
  addContact: string;
  
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
  
  // Remove translation (for background image)
  remove: string;
  
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
    mustBe18: string;
    represent18: string;
    noMedicalAdvice: string;
    informationalOnly: string;
    noMedicalAdviceText: string;
    notReplaceProfessional: string;
    consultProvider: string;
    aiContentUsage: string;
    aiNotTherapist: string;
    youtubeContent: string;
    emergencyDisclaimer: string;
    emergencyText: string;
    notEmergencyService: string;
    callEmergencyServices: string;
    limitationLiability: string;
    useAtRisk: string;
    noWarranties: string;
    disclaimerIntro: string;
    notMedicalDevice: string;
    supplementNot: string;
    ifCrisis: string;
  };
}

// Language type definition for comprehensive international support
export type Language = 
  | 'en' | 'es' | 'th' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' 
  | 'zh' | 'ar' | 'hi' | 'nl' | 'sv' | 'no' | 'da' | 'fi' | 'pl' | 'tr'
  | 'he' | 'vi' | 'id' | 'ms' | 'tl' | 'uk' | 'cs' | 'sk' | 'hu' | 'ro'
  | 'bg' | 'hr' | 'sl' | 'et' | 'lv' | 'lt' | 'mt' | 'ga' | 'cy' | 'is'
  | 'mk' | 'sq' | 'sr' | 'bs' | 'me' | 'ka' | 'hy' | 'az' | 'kk' | 'ky'
  | 'uz' | 'tm' | 'mn' | 'ne' | 'bn' | 'ta' | 'te' | 'ml' | 'kn' | 'gu'
  | 'pa' | 'or' | 'as' | 'ur' | 'fa' | 'ps' | 'sw' | 'am' | 'so' | 'ha'
  | 'yo' | 'ig' | 'zu' | 'af' | 'xh' | 'st' | 'tn' | 'ts' | 've' | 'nr'
  | 'ss' | 'lg' | 'rw' | 'ny' | 'sn' | 'mg' | 'my' | 'km' | 'lo' | 'si'
  | 'dv' | 'bo' | 'dz' | 'ii' | 'iu' | 'kl' | 'se' | 'fo' | 'gd' | 'br'
  | 'eu' | 'ca' | 'gl' | 'oc' | 'co' | 'sc' | 'rm' | 'fur' | 'lij' | 'vec'
  | 'nap' | 'scn' | 'lmo' | 'pms' | 'rgn' | 'eml' | 'lld' | 'frp' | 'wa'
  | 'li' | 'nds' | 'lb' | 'als' | 'bar' | 'ksh' | 'pdc' | 'hsb' | 'dsb';

export const translations: Record<Language, Translation> = {
  en: {
    appName: "Take 5",
    tagline: "Take a breath. Take back control.",
    searchPlaceholder: "Type how you feel: 'I'm alone', 'homeless', 'want to die'...",
    emergencySupport: "Emergency Support",
    callEmergency: "Call {number} (Emergency)",
    crisisHotline: "Crisis Hotline",
    crisisHotlineCall: "Call Now",
    emergencyWarning: "If you're in immediate danger, call emergency services",
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
    trustedContacts: "Your Trusted Contacts",
    addTrustedContact: "Add a trusted contact",
    footerMessage1: "You're not alone.",
    footerMessage2: "You matter. Your life has value.",
    footerMessage3: "Help is always available.",
    footerMessage4: "This moment is temporary. You got this!",
    visitWebsite: "Visit Website",
    callNow: "Call Now",
    cancel: "Cancel",
    breathingExercise: "Breathing Exercise",
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    close: "Close",
    
    // Support modules
    breathing: "Breathing",
    breathingGuide: "5-min guide",
    affirmations: "Affirmations",
    kindWords: "Kind words",
    calmMusic: "Calm Music",
    soothingSounds: "Soothing sounds",
    grounding: "Grounding",
    groundingTechnique: "5-4-3-2-1",
    
    // Contact form
    name: "Name",
    phoneNumber: "Phone Number",
    relationship: "Relationship",
    enterName: "Enter name",
    enterPhone: "Enter phone number",
    enterRelationship: "e.g., Therapist, Friend, Family",
    addContact: "Add Contact",
    
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
      "You are worthy of love and support",
      "Small steps forward are still progress",
      "You have the strength to get through this",
      "Your story isn't over yet",
      "There are people who care about you",
      "You are enough, just as you are",
      "Healing takes time, and that's okay",
      "You deserve peace and happiness",
      "Your courage to reach out shows strength",
      "Every day you survive is a win",
      "You have made it through 100% of your worst days"
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
    
    // Legal
    legalPoliciesDisclamers: "Legal Policies & Disclaimers",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    disclaimer: "Disclaimer",
    effectiveDate: "Effective Date",
    
    // Legal Content
    legalContent: {
      effectiveDate: "Effective Date: June 6, 2025",
      privacyIntro: "Take 5 (\"we,\" \"us,\" or \"our\") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use the Take 5 app (the \"App\").",
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
      mustBe18: "You must be 18 years or older to use the App.",
      represent18: "By using the App, you represent that you are at least 18 years old.",
      noMedicalAdvice: "No Medical Advice:",
      informationalOnly: "The App is for informational and motivational purposes only.",
      noMedicalAdviceText: "Take 5 does not provide medical advice, diagnosis, or treatment.",
      notReplaceProfessional: "Content within the App (quotes, affirmations, AI chat, linked videos) is not intended to replace professional mental health or medical care.",
      consultProvider: "Always consult a qualified healthcare provider for mental health issues.",
      aiContentUsage: "AI and Content Usage:",
      aiNotTherapist: "The AI chatbot is a basic conversational assistant. It is not a therapist, licensed counselor, or crisis worker.",
      youtubeContent: "Linked YouTube content is curated for convenience and positivity but is provided by third parties.",
      emergencyDisclaimer: "Emergency Feature Disclaimer:",
      emergencyText: "The emergency contacts feature is for convenience only.",
      notEmergencyService: "Take 5 is not an emergency service.",
      callEmergencyServices: "In a crisis, call 988, 911, or your local emergency services immediately.",
      limitationLiability: "Limitation of Liability:",
      useAtRisk: "You use the App at your own risk.",
      noWarranties: "We make no warranties about the App's availability, accuracy, or fitness for any particular purpose.",
      disclaimerIntro: "Take 5 is a wellness and motivational app designed to provide support and resources for mental well-being.",
      notMedicalDevice: "This app is not a medical device, therapy service, or crisis intervention tool.",
      supplementNot: "It is intended to supplement, not replace, professional mental health care.",
      ifCrisis: "If you are experiencing a mental health crisis, suicidal thoughts, or are in immediate danger, please contact emergency services (911) or a crisis hotline (988) immediately."
    }
  },
  th: {
    appName: "Take 5",
    tagline: "หายใจเข้าลึกๆ ควบคุมตัวเองใหม่",
    searchPlaceholder: "พิมพ์ความรู้สึกของคุณ: 'เหงา', 'ไร้ที่พึ่ง', 'อยากตาย'...",
    emergencySupport: "การช่วยเหลือฉุกเฉิน",
    callEmergency: "โทร {number} (ฉุกเฉิน)",
    crisisHotline: "สายด่วนวิกฤตจิตใจ",
    crisisHotlineCall: "โทรเลย",
    emergencyWarning: "หากคุณตกอยู่ในอันตรายใกล้จะเกิดขึ้น โทรหาหน่วยกู้ภัย",
    additionalSupport: "การสนับสนุนเพิ่มเติม",
    howCanWeSupport: "เราจะช่วยเหลือคุณได้อย่างไรในตอนนี้?",
    feelOverwhelmed: "รู้สึกท่วมท้น",
    breathingDescription: "การฝึกหายใจและเทคนิคการตั้งสติ",
    feelAnxious: "รู้สึกวิตกกังวล",
    anxiousDescription: "การจัดการความวิตกกังวลและกลยุทธ์การรับมือ",
    feelDepressed: "รู้สึกซึมเศร้า",
    depressedDescription: "การสนับสนุนภาวะซึมเศร้าและทรัพยากรอารมณ์",
    needToTalk: "ต้องการคุยกับใครสักคน",
    talkDescription: "การให้คำปรึกษาจากผู้เชี่ยวชาญและการสนับสนุนจากเพื่อน",
    trustedContacts: "ผู้ติดต่อที่เชื่อถือได้",
    addTrustedContact: "เพิ่มผู้ติดต่อที่เชื่อถือได้",
    footerMessage1: "คุณไม่ได้อยู่คนเดียว",
    footerMessage2: "คุณมีความสำคัญ ชีวิตคุณมีคุณค่า",
    footerMessage3: "ความช่วยเหลือมีอยู่เสมอ",
    footerMessage4: "ช่วงเวลานี้เป็นเพียงชั่วคราว คุณทำได้!",
    visitWebsite: "เยี่ยมชมเว็บไซต์",
    callNow: "โทรเลย",
    cancel: "ยกเลิก",
    breathingExercise: "การฝึกหายใจ",
    inhale: "หายใจเข้า",
    hold: "กลั้น",
    exhale: "หายใจออก",
    close: "ปิด",
    
    // Support modules
    breathing: "การหายใจ",
    breathingGuide: "คู่มือ 5 นาที",
    affirmations: "คำยืนยัน",
    kindWords: "คำพูดดีๆ",
    calmMusic: "เพลงผ่อนคลาย",
    soothingSounds: "เสียงที่ผ่อนคลาย",
    grounding: "การจดจ่อ",
    groundingTechnique: "5-4-3-2-1",
    
    // Contact form
    name: "ชื่อ",
    phoneNumber: "หมายเลขโทรศัพท์",
    relationship: "ความสัมพันธ์",
    enterName: "ใส่ชื่อ",
    enterPhone: "ใส่หมายเลขโทรศัพท์",
    enterRelationship: "เช่น นักบำบัด เพื่อน ครอบครัว",
    addContact: "เพิ่มผู้ติดต่อ",
    
    // Profile
    yourProfile: "โปรไฟล์ของคุณ",
    profile: "โปรไฟล์",
    privateDiary: "ไดอารี่ส่วนตัว",
    yourPrivateDiary: "ไดอารี่ส่วนตัวของคุณ",
    newEntry: "เรื่องใหม่",
    addQuotePlaceholder: "เพิ่มคำพูด (สูงสุด 40 ตัวอักษร)",
    logout: "ออกจากระบบ",
    
    // Diary
    entryTitle: "หัวข้อบันทึก...",
    writeThoughts: "เขียนความคิดของคุณ...",
    saveEntry: "บันทึกเรื่องราว",
    startWriting: "เริ่มเขียนเพื่อติดตามความคิดและความรู้สึกของคุณ",
    entriesSaved: "บันทึกของคุณถูกเก็บไว้อย่างถาวรและมองเห็นได้เฉพาะคุณเท่านั้น",
    entryTitlePlaceholder: "หัวข้อบันทึก...",
    writeThoughtsPlaceholder: "เขียนความคิดของคุณ...",
    entrySaved: "บันทึกไดอารี่ของคุณถูกบันทึกอย่างถาวรแล้ว",
    entryUpdated: "บันทึกไดอารี่ของคุณถูกบันทึกเรียบร้อยแล้ว",
    entryDeleted: "บันทึกไดอารี่ของคุณถูกลบอย่างถาวรแล้ว",
    
    // AI Chat
    aiWelcomeMessage: "สวัสดี ฉันอยู่ที่นี่เพื่อฟังและสนับสนุนคุณ คุณไม่ได้อยู่คนเดียว วันนี้คุณคิดอะไรอยู่?",
    aiSupportChat: "แชทสนับสนุน AI",
    aiImHere: "ฉันอยู่ที่นี่ มาคุยกันเถอะ",
    talkToMe: "คุยกับฉัน",
    chatWithAi: "แชทกับผู้ช่วย AI ที่เห็นอกเห็นใจ",
    compassionateAssistant: "ผู้ช่วย AI ที่เห็นอกเห็นใจ",
    immediateSupport: "สำหรับการสนับสนุนทันที",
    copingStrategies: "กลยุทธ์การรับมือ",
    someoneToListen: "และใครสักคนที่จะฟัง",
    startConversation: "เริ่มบทสนทนา",
    typeYourMessage: "พิมพ์ข้อความของคุณ...",
    crisisWarning: "หากคุณตกอยู่ในวิกฤต โปรดโทร 1323 หรือบริการฉุกเฉินทันที",
    unmuteAi: "เปิดเสียง AI",
    changeNamePrompt: "เปลี่ยนชื่อ",
    enterYourName: "ใส่ชื่อของคุณ",
    whatsYourName: "คุณชื่ออะไร?",
    
    // Affirmations/Quotes
    youDeservePeace: "คุณสมควรได้รับความสงบและความสุข",
    youAreStronger: "คุณแข็งแกร่งกว่าที่คุณคิด",
    youMatter: "คุณมีความสำคัญ ชีวิตคุณมีคุณค่า",
    thisToWillPass: "สิ่งนี้จะผ่านไป",
    youAreNotAlone: "คุณไม่ได้อยู่คนเดียวในเรื่องนี้",
    youAreLoved: "คุณได้รับความรักและมีคุณค่า",
    
    // Rotating Affirmations Array
    rotatingAffirmations: [
      "คุณแข็งแกร่งกว่าที่คุณคิด",
      "ช่วงเวลานี้เป็นเพียงชั่วคราว คุณทำได้!",
      "คุณมีความสำคัญ ชีวิตของคุณมีคุณค่า",
      "ความช่วยเหลือมีอยู่เสมอ",
      "คุณไม่ได้อยู่คนเดียวในการเดินทางนี้",
      "ทุกลมหายใจของคุณคือชัยชนะ",
      "คุณเคยผ่านความท้าทายมาแล้ว",
      "ความรู้สึกของคุณสมเหตุสมผลและเป็นเพียงชั่วคราว",
      "พรุ่งนี้อาจแตกต่างไป",
      "คุณสมควรได้รับความรักและการสนับสนุน",
      "ก้าวเล็กๆ ไปข้างหน้ายังคงเป็นความก้าวหน้า",
      "คุณมีความแข็งแกร่งที่จะผ่านพ้นสิ่งนี้ไป",
      "เรื่องราวของคุณยังไม่จบ",
      "มีคนที่ใส่ใจคุณ",
      "คุณเพียงพอ ในแบบที่คุณเป็น",
      "การรักษาต้องใช้เวลา และนั่นก็ไม่เป็นไร",
      "คุณสมควรได้รับความสงบและความสุข",
      "ความกล้าหาญของคุณในการขอความช่วยเหลือแสดงให้เห็นถึงความแข็งแกร่ง",
      "ทุกวันที่คุณอยู่รอดคือชัยชนะ",
      "คุณไม่ได้กำหนดด้วยช่วงเวลาที่ท้าทายที่สุดของคุณ"
    ],
    
    // Remove translation
    remove: "ลบ",
    
    // Profile UI
    backgroundImage: "ภาพพื้นหลัง",
    noBackgroundImageSet: "ยังไม่ได้ตั้งภาพพื้นหลัง",
    uploadImage: "อัพโหลดภาพ",
    setYourPersonalBackground: "ตั้งค่าพื้นหลังส่วนตัวของคุณ",
    chooseYourImage: "เลือกภาพของคุณ",
    uploadAnyPhoto: "อัพโหลดภาพใดๆ จากอุปกรณ์ของคุณ",
    cropPosition: "ครอบตัดและจัดตำแหน่ง",
    useEditorToCrop: "ใช้เครื่องมือแก้ไขเพื่อครอบตัดและจัดกึ่งกลางภาพอย่างสมบูรณ์",
    screenImage: "ภาพหน้าจอ",
    diary: "ไดอารี่",
    
    // Legal
    legalPoliciesDisclamers: "นโยบายกฎหมายและข้อจำกัดความรับผิดชอบ",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsConditions: "ข้อกำหนดและเงื่อนไข",
    disclaimer: "ข้อจำกัดความรับผิดชอบ",
    effectiveDate: "วันที่มีผลบังคับใช้"
  },
  es: {
    appName: "Take 5",
    tagline: "Respira. Recupera el control.",
    searchPlaceholder: "Escribe cómo te sientes: 'Estoy solo', 'sin hogar', 'quiero morir'...",
    emergencySupport: "Apoyo de Emergencia",
    callEmergency: "Llamar {number} (Emergencia)",
    crisisHotline: "Línea de Crisis",
    crisisHotlineCall: "Llamar Ahora",
    emergencyWarning: "Si estás en peligro inmediato, llama a servicios de emergencia",
    additionalSupport: "Apoyo Adicional",
    howCanWeSupport: "¿Cómo podemos apoyarte ahora mismo?",
    feelOverwhelmed: "Me Siento Abrumado",
    breathingDescription: "Ejercicios de respiración y técnicas de calma",
    feelAnxious: "Me Siento Ansioso",
    anxiousDescription: "Manejo de ansiedad y estrategias de afrontamiento",
    feelDepressed: "Me Siento Deprimido",
    depressedDescription: "Apoyo para depresión y recursos de ánimo",
    needToTalk: "Necesito Hablar",
    talkDescription: "Consejería profesional y apoyo de pares",
    trustedContacts: "Tus Contactos de Confianza",
    addTrustedContact: "Agregar un contacto de confianza",
    footerMessage1: "No estás solo.",
    footerMessage2: "Importas. Tu vida tiene valor.",
    footerMessage3: "La ayuda siempre está disponible.",
    footerMessage4: "Este momento es temporal. ¡Puedes hacerlo!",
    visitWebsite: "Visitar Sitio Web",
    callNow: "Llamar Ahora",
    cancel: "Cancelar",
    breathingExercise: "Ejercicio de Respiración",
    inhale: "Inhala",
    hold: "Mantén",
    exhale: "Exhala",
    close: "Cerrar",
    breathing: "Respiración",
    breathingGuide: "Guía de 5 min",
    affirmations: "Afirmaciones",
    kindWords: "Palabras amables",
    calmMusic: "Música Relajante",
    soothingSounds: "Sonidos relajantes",
    grounding: "Conexión a tierra",
    groundingTechnique: "5-4-3-2-1",
    name: "Nombre",
    phoneNumber: "Número de Teléfono",
    relationship: "Relación",
    enterName: "Ingresar nombre",
    enterPhone: "Ingresar número de teléfono",
    enterRelationship: "ej., Terapeuta, Amigo, Familia",
    addContact: "Agregar Contacto",
    
    // Profile
    yourProfile: "Tu Perfil",
    profile: "Perfil",
    privateDiary: "Diario Privado",
    yourPrivateDiary: "Tu Diario Privado",
    newEntry: "Nueva Entrada",
    addQuotePlaceholder: "Agregar una cita (máx. 40 caracteres)",
    logout: "Cerrar Sesión",
    
    // Diary
    entryTitle: "Título de entrada...",
    writeThoughts: "Escribe tus pensamientos...",
    saveEntry: "Guardar Entrada",
    startWriting: "Comienza a escribir para rastrear tus pensamientos y sentimientos.",
    entriesSaved: "Tus entradas se guardan permanentemente y solo son visibles para ti.",
    entryTitlePlaceholder: "Título de entrada...",
    writeThoughtsPlaceholder: "Escribe tus pensamientos...",
    entrySaved: "Tu entrada de diario ha sido guardada permanentemente.",
    entryUpdated: "Tu entrada de diario ha sido guardada exitosamente.",
    entryDeleted: "Tu entrada de diario ha sido eliminada permanentemente.",
    
    // AI Chat
    aiWelcomeMessage: "Hola, estoy aquí para escucharte y apoyarte. No estás solo. ¿Qué tienes en mente hoy?",
    aiSupportChat: "Chat de Apoyo IA",
    aiImHere: "Estoy aquí. Habla conmigo.",
    talkToMe: "Habla conmigo",
    chatWithAi: "Chatea con nuestro asistente IA compasivo",
    compassionateAssistant: "asistente IA compasivo",
    immediateSupport: "para apoyo inmediato",
    copingStrategies: "estrategias de afrontamiento",
    someoneToListen: "y alguien que escuche",
    startConversation: "Iniciar Conversación",
    typeYourMessage: "Escribe tu mensaje...",
    crisisWarning: "Si estás en crisis, por favor llama al 988 o servicios de emergencia inmediatamente",
    unmuteAi: "Activar audio IA",
    changeNamePrompt: "Cambiar Nombre",
    enterYourName: "Ingresa tu nombre",
    whatsYourName: "¿Cuál es tu nombre?",
    
    // Affirmations/Quotes
    youDeservePeace: "Mereces paz y felicidad",
    youAreStronger: "Eres más fuerte de lo que crees",
    youMatter: "Importas. Tu vida tiene valor.",
    thisToWillPass: "Esto también pasará",
    youAreNotAlone: "No estás solo en esto",
    youAreLoved: "Eres amado y valorado",
    
    // Rotating Affirmations Array
    rotatingAffirmations: [
      "Eres más fuerte de lo que piensas",
      "Este momento es temporal. ¡Puedes hacerlo!",
      "Importas. Tu vida tiene valor",
      "La ayuda siempre está disponible",
      "No estás solo en este viaje",
      "Cada respiración que tomas es una victoria",
      "Has superado desafíos antes",
      "Tus sentimientos son válidos y temporales",
      "Mañana puede ser diferente",
      "Mereces amor y apoyo",
      "Los pequeños pasos hacia adelante siguen siendo progreso",
      "Tienes la fuerza para superar esto",
      "Tu historia aún no ha terminado",
      "Hay personas que se preocupan por ti",
      "Eres suficiente, tal como eres",
      "La sanación toma tiempo, y eso está bien",
      "Mereces paz y felicidad",
      "Tu valentía para buscar ayuda muestra fortaleza",
      "Cada día que sobrevives es una victoria",
      "Has superado el 100% de tus peores días"
    ],
    
    // Profile UI
    backgroundImage: "Imagen de Fondo",
    noBackgroundImageSet: "No se ha establecido imagen de fondo",
    uploadImage: "Cambiar Imagen",
    setYourPersonalBackground: "Establece tu fondo personal",
    chooseYourImage: "Elige tu imagen",
    uploadAnyPhoto: "Sube cualquier foto",
    cropPosition: "Editar y Recortar",
    useEditorToCrop: "Usa nuestro editor para recortar y centrar tu imagen perfectamente",
    screenImage: "Fondo",
    diary: "Diario",
    remove: "Eliminar",
    
    // Contacts
    logInToCreateContactsList: "Inicia Sesión para Crear tu Lista de Contactos de Emergencia",
    logIn: "Iniciar Sesión",
    createAccount: "Crear Cuenta",
    
    // Legal
    legalPoliciesDisclamers: "Políticas Legales y Exenciones de Responsabilidad",
    privacyPolicy: "Política de Privacidad",
    termsConditions: "Términos y Condiciones",
    disclaimer: "Exención de Responsabilidad",
    effectiveDate: "Fecha de Vigencia",
    
    // Legal Content
    legalContent: {
      effectiveDate: "Fecha Efectiva: 6 de junio de 2025",
      privacyIntro: "Take 5 (\"nosotros\", \"nos\" o \"nuestro\") valora tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información personal cuando usas la aplicación Take 5 (la \"Aplicación\").",
      informationWeCollect: "Información que Recopilamos:",
      personalDetails: "Datos personales que proporcionas (ej., nombre, dirección de email, información de contacto de emergencia)",
      journalingEntries: "Entradas de diario (almacenadas localmente o cifradas de forma segura si están en nuestros servidores)",
      usageData: "Datos de uso (páginas visitadas, botones clickeados, interacciones con la aplicación)",
      deviceData: "Datos del dispositivo (tipo de dispositivo, sistema operativo, tipo de navegador)",
      howWeUseData: "Cómo Usamos Tus Datos:",
      operateApp: "Para operar y mantener la Aplicación",
      personalizedFeatures: "Para permitirte usar características personalizadas (ej., diario, contactos de emergencia)",
      improveExperience: "Para mejorar la experiencia del usuario y desarrollar nuevas características",
      sendUpdates: "Para enviar actualizaciones ocasionales o alertas si te registras",
      sharingData: "Compartir Datos:",
      noSellData: "No vendemos tus datos",
      noSharePrivate: "No compartimos tus datos privados con terceros a menos que sea legalmente requerido",
      thirdPartyServices: "Podemos usar servicios de terceros (ej., YouTube API, Google Analytics), y sus prácticas de recopilación de datos se rigen por sus propias políticas",
      dataSecurity: "Seguridad de Datos:",
      encryption: "Implementamos cifrado estándar de la industria y controles de acceso",
      deleteRequest: "Los usuarios pueden solicitar eliminación de datos enviando un email a tradermigs@gmail.com",
      yourRights: "Tus Derechos (GDPR, CCPA, etc.):",
      accessCorrectDelete: "Derecho a acceder, corregir o eliminar tus datos",
      withdrawConsent: "Derecho a retirar consentimiento o optar por no recibir comunicaciones",
      lodgeComplaint: "Derecho a presentar una queja ante una autoridad de protección de datos",
      termsIntro: "Al usar la aplicación Take 5, aceptas los siguientes términos. Si no estás de acuerdo, no uses la Aplicación.",
      eligibility: "Elegibilidad:",
      mustBe18: "Debes tener 18 años o más para usar la Aplicación.",
      represent18: "Al usar la Aplicación, declaras que tienes al menos 18 años.",
      noMedicalAdvice: "Sin Consejo Médico:",
      informationalOnly: "La Aplicación es solo para fines informativos y motivacionales.",
      noMedicalAdviceText: "Take 5 no proporciona consejo médico, diagnóstico o tratamiento.",
      notReplaceProfessional: "El contenido dentro de la Aplicación (citas, afirmaciones, chat de IA, videos enlazados) no está destinado a reemplazar la atención profesional de salud mental o médica.",
      consultProvider: "Siempre consulta a un proveedor de atención médica calificado para problemas de salud mental.",
      aiContentUsage: "Uso de IA y Contenido:",
      aiNotTherapist: "El chatbot de IA es un asistente conversacional básico. No es un terapeuta, consejero licenciado o trabajador de crisis.",
      youtubeContent: "El contenido de YouTube enlazado está seleccionado por conveniencia y positividad pero es proporcionado por terceros.",
      emergencyDisclaimer: "Exención de Responsabilidad de Características de Emergencia:",
      emergencyText: "La característica de contactos de emergencia es solo por conveniencia.",
      notEmergencyService: "Take 5 no es un servicio de emergencia.",
      callEmergencyServices: "En una crisis, llama al 988, 911, o tus servicios de emergencia locales inmediatamente.",
      limitationLiability: "Limitación de Responsabilidad:",
      useAtRisk: "Usas la Aplicación bajo tu propio riesgo.",
      noWarranties: "No hacemos garantías sobre la disponibilidad, precisión o idoneidad de la Aplicación para ningún propósito particular.",
      disclaimerIntro: "Take 5 es una aplicación de bienestar y motivación diseñada para proporcionar apoyo y recursos para el bienestar mental.",
      notMedicalDevice: "Esta aplicación no es un dispositivo médico, servicio de terapia o herramienta de intervención en crisis.",
      supplementNot: "Está destinada a complementar, no reemplazar, la atención profesional de salud mental.",
      ifCrisis: "Si estás experimentando una crisis de salud mental, pensamientos suicidas, o estás en peligro inmediato, por favor contacta servicios de emergencia (911) o una línea de crisis (988) inmediatamente."
    }
  },
  fr: {
    appName: "Take 5",
    tagline: "Respire. Reprenez le contrôle.",
    searchPlaceholder: "Tapez ce que vous ressentez: 'Je suis seul', 'sans-abri', 'veux mourir'...",
    emergencySupport: "Soutien d'Urgence",
    callEmergency: "Appeler {number} (Urgence)",
    crisisHotline: "Ligne de Crise",
    crisisHotlineCall: "Appelez Maintenant",
    emergencyWarning: "Si vous êtes en danger immédiat, appelez les services d'urgence",
    additionalSupport: "Soutien Supplémentaire",
    howCanWeSupport: "Comment pouvons-nous vous soutenir maintenant?",
    feelOverwhelmed: "Je Me Sens Dépassé",
    breathingDescription: "Exercices de respiration et techniques d'ancrage",
    feelAnxious: "Je Me Sens Anxieux",
    anxiousDescription: "Gestion de l'anxiété et stratégies d'adaptation",
    feelDepressed: "Je Me Sens Déprimé",
    depressedDescription: "Soutien pour la dépression et ressources d'humeur",
    needToTalk: "J'ai Besoin de Parler",
    talkDescription: "Conseil professionnel et soutien par les pairs",
    trustedContacts: "Vos Contacts de Confiance",
    addTrustedContact: "Ajouter un contact de confiance",
    footerMessage1: "Vous n'êtes pas seul.",
    footerMessage2: "Vous comptez. Votre vie a de la valeur.",
    footerMessage3: "L'aide est toujours disponible.",
    footerMessage4: "Ce moment est temporaire. Vous pouvez le faire!",
    visitWebsite: "Visiter le Site Web",
    callNow: "Appeler Maintenant",
    cancel: "Annuler",
    breathingExercise: "Exercice de Respiration",
    inhale: "Inspirez",
    hold: "Retenez",
    exhale: "Expirez",
    close: "Fermer",
    breathing: "Respiration",
    breathingGuide: "Guide 5 min",
    affirmations: "Affirmations",
    kindWords: "Mots gentils",
    calmMusic: "Musique Calme",
    soothingSounds: "Sons apaisants",
    grounding: "Ancrage",
    groundingTechnique: "5-4-3-2-1",
    name: "Nom",
    phoneNumber: "Numéro de Téléphone",
    relationship: "Relation",
    enterName: "Entrez le nom",
    enterPhone: "Entrez le numéro",
    enterRelationship: "ex., Thérapeute, Ami, Famille",
    addContact: "Ajouter Contact"
  },
  de: {
    appName: "Take 5",
    tagline: "Atme. Übernimm die Kontrolle zurück.",
    searchPlaceholder: "Schreibe, wie du dich fühlst: 'Ich bin allein', 'obdachlos', 'will sterben'...",
    emergencySupport: "Notfallunterstützung",
    callEmergency: "{number} anrufen (Notfall)",
    crisisHotline: "Krisenhotline",
    crisisHotlineCall: "Jetzt anrufen",
    emergencyWarning: "Wenn Sie in unmittelbarer Gefahr sind, rufen Sie den Notdienst an",
    additionalSupport: "Zusätzliche Unterstützung",
    howCanWeSupport: "Wie können wir Sie jetzt unterstützen?",
    feelOverwhelmed: "Ich Fühle Mich Überfordert",
    breathingDescription: "Atemübungen und Erdungstechniken",
    feelAnxious: "Ich Fühle Mich Ängstlich",
    anxiousDescription: "Angstbewältigung und Bewältigungsstrategien",
    feelDepressed: "Ich Fühle Mich Deprimiert",
    depressedDescription: "Unterstützung bei Depressionen und Stimmungsressourcen",
    needToTalk: "Ich Muss Reden",
    talkDescription: "Professionelle Beratung und Peer-Unterstützung",
    trustedContacts: "Ihre Vertrauenskontakte",
    addTrustedContact: "Einen Vertrauenskontakt hinzufügen",
    footerMessage1: "Du bist nicht allein.",
    footerMessage2: "Du bist wichtig. Dein Leben hat Wert.",
    footerMessage3: "Hilfe ist immer verfügbar.",
    footerMessage4: "Dieser Moment ist vorübergehend. Du schaffst das!",
    visitWebsite: "Website besuchen",
    callNow: "Jetzt anrufen",
    cancel: "Abbrechen",
    breathingExercise: "Atemübung",
    inhale: "Einatmen",
    hold: "Halten",
    exhale: "Ausatmen",
    close: "Schließen"
  },
  zh: {
    appName: "Take 5",
    tagline: "深呼吸。重新掌控。",
    searchPlaceholder: "输入您的感受：'我很孤独'、'无家可归'、'想死'...",
    emergencySupport: "紧急支持",
    callEmergency: "拨打{number}（紧急情况）",
    crisisHotline: "危机热线",
    crisisHotlineCall: "立即拨打",
    emergencyWarning: "如果您处于紧急危险中，请拨打紧急服务电话",
    additionalSupport: "额外支持",
    howCanWeSupport: "我们现在如何支持您？",
    feelOverwhelmed: "我感到不知所措",
    breathingDescription: "呼吸练习和接地技巧",
    feelAnxious: "我感到焦虑",
    anxiousDescription: "焦虑管理和应对策略",
    feelDepressed: "我感到抑郁",
    depressedDescription: "抑郁症支持和情绪资源",
    needToTalk: "我需要倾诉",
    talkDescription: "专业咨询和同伴支持",
    trustedContacts: "您的信任联系人",
    addTrustedContact: "添加信任联系人",
    footerMessage1: "您并不孤单。",
    footerMessage2: "您很重要。您的生命有价值。",
    footerMessage3: "帮助总是可得的。",
    footerMessage4: "这个时刻是暂时的。您能做到！",
    visitWebsite: "访问网站",
    callNow: "立即拨打",
    cancel: "取消",
    breathingExercise: "呼吸练习",
    inhale: "吸气",
    hold: "屏住",
    exhale: "呼气",
    close: "关闭"
  },
  ja: {
    appName: "Take 5",
    tagline: "呼吸して。コントロールを取り戻して。",
    searchPlaceholder: "気持ちを入力：「孤独」「ホームレス」「死にたい」...",
    emergencySupport: "緊急サポート",
    callEmergency: "{number}番通報（緊急時）",
    crisisHotline: "危機ホットライン",
    crisisHotlineCall: "今すぐ電話",
    emergencyWarning: "緊急の危険がある場合は、緊急サービスに電話してください",
    additionalSupport: "追加サポート",
    howCanWeSupport: "今、どのようにサポートできますか？",
    feelOverwhelmed: "圧倒されている",
    breathingDescription: "呼吸エクササイズとグラウンディング技術",
    feelAnxious: "不安を感じる",
    anxiousDescription: "不安管理と対処戦略",
    feelDepressed: "うつ状態",
    depressedDescription: "うつ病サポートと気分リソース",
    needToTalk: "話したい",
    talkDescription: "専門カウンセリングとピアサポート",
    trustedContacts: "あなたの信頼できる連絡先",
    addTrustedContact: "信頼できる連絡先を追加",
    footerMessage1: "あなたは一人ではありません。",
    footerMessage2: "あなたは大切です。あなたの命には価値があります。",
    footerMessage3: "助けはいつでも利用できます。",
    footerMessage4: "この瞬間は一時的なものです。あなたならできます！",
    visitWebsite: "ウェブサイトを訪問",
    callNow: "今すぐ電話",
    cancel: "キャンセル",
    breathingExercise: "呼吸エクササイズ",
    inhale: "吸って",
    hold: "止めて",
    exhale: "吐いて",
    close: "閉じる"
  },
  ar: {
    appName: "Take 5",
    tagline: "تنفس. استعد السيطرة.",
    searchPlaceholder: "اكتب ما تشعر به: 'أنا وحيد'، 'بلا مأوى'، 'أريد أن أموت'...",
    emergencySupport: "الدعم الطارئ",
    callEmergency: "اتصل بـ {number} (طوارئ)",
    crisisHotline: "خط الأزمات",
    crisisHotlineCall: "اتصل الآن",
    emergencyWarning: "إذا كنت في خطر فوري، اتصل بخدمات الطوارئ",
    additionalSupport: "الدعم الإضافي",
    howCanWeSupport: "كيف يمكننا دعمك الآن؟",
    feelOverwhelmed: "أشعر بالإرهاق",
    breathingDescription: "تمارين التنفس وتقنيات التأريض",
    feelAnxious: "أشعر بالقلق",
    anxiousDescription: "إدارة القلق واستراتيجيات التأقلم",
    feelDepressed: "أشعر بالاكتئاب",
    depressedDescription: "دعم الاكتئاب وموارد المزاج",
    needToTalk: "أحتاج للحديث",
    talkDescription: "الاستشارة المهنية ودعم الأقران",
    trustedContacts: "جهات الاتصال الموثوقة",
    addTrustedContact: "إضافة جهة اتصال موثوقة",
    footerMessage1: "أنت لست وحيداً.",
    footerMessage2: "أنت مهم. حياتك لها قيمة.",
    footerMessage3: "المساعدة متاحة دائماً.",
    footerMessage4: "هذه اللحظة مؤقتة. يمكنك فعل ذلك!",
    visitWebsite: "زيارة الموقع",
    callNow: "اتصل الآن",
    cancel: "إلغاء",
    breathingExercise: "تمرين التنفس",
    inhale: "استنشق",
    hold: "احبس",
    exhale: "اخرج الهواء",
    close: "إغلاق"
  },
  ru: {
    appName: "Take 5",
    tagline: "Дышите. Верните контроль.",
    searchPlaceholder: "Напишите, что вы чувствуете: 'Я одинок', 'бездомный', 'хочу умереть'...",
    emergencySupport: "Экстренная поддержка",
    callEmergency: "Звоните {number} (Экстренная помощь)",
    crisisHotline: "Кризисная линия",
    crisisHotlineCall: "Звоните сейчас",
    emergencyWarning: "Если вы в непосредственной опасности, звоните в службы экстренного реагирования",
    additionalSupport: "Дополнительная поддержка",
    howCanWeSupport: "Как мы можем поддержать вас прямо сейчас?",
    feelOverwhelmed: "Я чувствую себя подавленным",
    breathingDescription: "Дыхательные упражнения и техники заземления",
    feelAnxious: "Я чувствую тревогу",
    anxiousDescription: "Управление тревогой и стратегии преодоления",
    feelDepressed: "Я чувствую депрессию",
    depressedDescription: "Поддержка при депрессии и ресурсы настроения",
    needToTalk: "Мне нужно поговорить",
    talkDescription: "Профессиональное консультирование и поддержка сверстников",
    trustedContacts: "Ваши доверенные контакты",
    addTrustedContact: "Добавить доверенный контакт",
    footerMessage1: "Вы не одиноки.",
    footerMessage2: "Вы важны. Ваша жизнь имеет ценность.",
    footerMessage3: "Помощь всегда доступна.",
    footerMessage4: "Этот момент временный. Вы справитесь!",
    visitWebsite: "Посетить сайт",
    callNow: "Звонить сейчас",
    cancel: "Отмена",
    breathingExercise: "Дыхательное упражнение",
    inhale: "Вдох",
    hold: "Задержка",
    exhale: "Выдох",
    close: "Закрыть"
  }
};

// Comprehensive language database with full translations
const languageNames: Record<Language, string> = {
  en: 'English', es: 'Español', th: 'ไทย', fr: 'Français', de: 'Deutsch',
  it: 'Italiano', pt: 'Português', ru: 'Русский', ja: '日本語', ko: '한국어',
  zh: '中文', ar: 'العربية', hi: 'हिन्दी', nl: 'Nederlands', sv: 'Svenska',
  no: 'Norsk', da: 'Dansk', fi: 'Suomi', pl: 'Polski', tr: 'Türkçe',
  he: 'עברית', vi: 'Tiếng Việt', id: 'Bahasa Indonesia', ms: 'Bahasa Melayu',
  tl: 'Filipino', uk: 'Українська', cs: 'Čeština', sk: 'Slovenčina',
  hu: 'Magyar', ro: 'Română', bg: 'Български', hr: 'Hrvatski', sl: 'Slovenščina',
  et: 'Eesti', lv: 'Latviešu', lt: 'Lietuvių', mt: 'Malti', ga: 'Gaeilge',
  cy: 'Cymraeg', is: 'Íslenska', mk: 'Македонски', sq: 'Shqip', sr: 'Српски',
  bs: 'Bosanski', me: 'Crnogorski', ka: 'ქართული', hy: 'Հայերեն', az: 'Azərbaycan',
  kk: 'Қазақша', ky: 'Кыргызча', uz: 'O\'zbekcha', tm: 'Türkmençe', mn: 'Монгол',
  ne: 'नेपाली', bn: 'বাংলা', ta: 'தமிழ்', te: 'తెలుగు', ml: 'മലയാളം',
  kn: 'ಕನ್ನಡ', gu: 'ગુજરાતી', pa: 'ਪੰਜਾਬੀ', or: 'ଓଡ଼ିଆ', as: 'অসমীয়া',
  ur: 'اردو', fa: 'فارسی', ps: 'پښتو', sw: 'Kiswahili', am: 'አማርኛ',
  so: 'Soomaali', ha: 'Hausa', yo: 'Yorùbá', ig: 'Igbo', zu: 'isiZulu',
  af: 'Afrikaans', xh: 'isiXhosa', st: 'Sesotho', tn: 'Setswana', ts: 'Xitsonga',
  ve: 'Tshivenḓa', nr: 'isiNdebele', ss: 'siSwati', lg: 'Luganda', rw: 'Kinyarwanda',
  ny: 'Chichewa', sn: 'chiShona', mg: 'Malagasy', my: 'မြန်မာ', km: 'ខ្មែរ',
  lo: 'ລາວ', si: 'සිංහල', dv: 'ދިވެހި', bo: 'བོད་སྐད', dz: 'རྫོང་ཁ',
  ii: 'ꆈꌠꁱꂷ', iu: 'ᐃᓄᒃᑎᑐᑦ', kl: 'Kalaallisut', se: 'Davvisámegiella', fo: 'Føroyskt',
  gd: 'Gàidhlig', br: 'Brezhoneg', eu: 'Euskera', ca: 'Català', gl: 'Galego',
  oc: 'Occitan', co: 'Corsu', sc: 'Sardu', rm: 'Rumantsch', fur: 'Furlan',
  lij: 'Ligure', vec: 'Vèneto', nap: 'Napulitano', scn: 'Sicilianu', lmo: 'Lombard',
  pms: 'Piemontèis', rgn: 'Rumagnôl', eml: 'Emiliàn', lld: 'Ladin', frp: 'Arpitan',
  wa: 'Walon', li: 'Limburgs', nds: 'Plattdüütsch', lb: 'Lëtzebuergesch',
  als: 'Alemannisch', bar: 'Boarisch', ksh: 'Ripoarisch', pdc: 'Deitsch',
  hsb: 'Hornjoserbsce', dsb: 'Dolnoserbski'
};

// AI-powered translation fallback system
export async function getAITranslation(text: string, targetLanguage: Language): Promise<string> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return text; // Return original if no API key
  }
  
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        targetLanguage: languageNames[targetLanguage],
        context: 'mental health support app'
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      return result.translation;
    }
  } catch (error) {
    console.warn('AI translation failed:', error);
  }
  
  return text; // Fallback to original
}

export function getTranslation(language: Language, key: string, params?: Record<string, string>): string {
  // Handle nested properties like 'legalContent.effectiveDate'
  const getValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, prop) => current?.[prop], obj) || '';
  };
  
  let text = getValue(translations[language], key) || getValue(translations.en, key);
  
  if (params && typeof text === 'string') {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
  }
  
  return text || key; // Fallback to key if translation not found
}

// Enhanced translation with AI fallback for missing languages
export async function getTranslationWithAI(language: Language, key: keyof Translation, params?: Record<string, string>): Promise<string> {
  let text = translations[language]?.[key];
  
  // If translation doesn't exist for this language, use AI translation
  if (!text && language !== 'en') {
    const englishText = translations.en[key];
    text = await getAITranslation(englishText, language);
    
    // Cache the AI translation for future use
    if (!translations[language]) {
      translations[language] = {} as Translation;
    }
    (translations[language] as any)[key] = text;
  }
  
  // Fallback to English if all else fails
  text = text || translations.en[key];
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
  }
  
  return text;
}