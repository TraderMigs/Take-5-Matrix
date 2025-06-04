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
  },

  // French translations
  fr: {
    appName: "Take 5",
    tagline: "Respirez. Reprenez le contrôle.",
    searchPlaceholder: "Tapez comment vous vous sentez: 'Je suis seul', 'sans-abri', 'je veux mourir'...",
    emergencySupport: "Soutien d'urgence",
    callEmergency: "Appelez le {number} (Urgence)",
    crisisHotline: "Ligne d'écoute de crise",
    crisisHotlineCall: "Appelez maintenant",
    emergencyWarning: "Si vous êtes en danger immédiat, appelez les services d'urgence",
    
    // Authentication & User Account
    login: "se connecter",
    createAccount: "créer un compte",
    loginToCreateContactsList: "connectez-vous pour créer une liste de contacts",
    signInWithGoogle: "Se connecter avec Google",
    
    additionalSupport: "Soutien supplémentaire",
    howCanWeSupport: "Comment vous sentez-vous, ami?",
    feelOverwhelmed: "Je me sens dépassé",
    breathingDescription: "Exercices de respiration et techniques d'ancrage",
    feelAnxious: "Je me sens anxieux",
    anxiousDescription: "Gestion de l'anxiété et stratégies d'adaptation",
    feelDepressed: "Je me sens déprimé",
    depressedDescription: "Soutien pour la dépression et ressources d'humeur",
    needToTalk: "J'ai besoin de parler",
    talkDescription: "Conseil professionnel et soutien par les pairs",
    
    // Support modules
    breathing: "Respiration",
    breathingGuide: "Guide 5 min",
    affirmations: "Affirmations",
    kindWords: "Mots gentils",
    calmMusic: "Musique Calme",
    soothingSounds: "Sons apaisants",
    grounding: "Ancrage",
    groundingTechnique: "5-4-3-2-1",
    
    // Contact Management
    trustedContacts: "Vos contacts de confiance",
    confidenceContacts: "Vos Contacts de Confiance",
    addTrustedContact: "Ajouter un contact de confiance",
    
    // Contact form
    name: "Nom",
    phoneNumber: "Numéro de téléphone",
    relationship: "Relation",
    enterName: "Entrez le nom",
    enterPhone: "Entrez le numéro de téléphone",
    enterRelationship: "ex: Thérapeute, Ami, Famille",
    addContact: "Ajouter un contact",
    
    footerMessage1: "Vous n'êtes pas seul.",
    footerMessage2: "Vous comptez. Votre vie a de la valeur.",
    footerMessage3: "L'aide est toujours disponible.",
    footerMessage4: "Ce moment est temporaire. Vous pouvez le faire!",
    visitWebsite: "Visiter le site web",
    callNow: "Appelez maintenant",
    cancel: "Annuler",
    close: "Fermer",
    
    breathingExercise: "Exercice de respiration",
    inhale: "Inspirez",
    hold: "Retenez",
    exhale: "Expirez",
    
    // Profile
    yourProfile: "Votre profil",
    profile: "Profil",
    privateDiary: "Journal privé",
    yourPrivateDiary: "Votre journal privé",
    newEntry: "Nouvelle entrée",
    addQuotePlaceholder: "Ajouter une citation (40 caractères max)",
    logout: "Déconnexion",
    
    // Diary
    entryTitle: "Titre de l'entrée...",
    writeThoughts: "Écrivez vos pensées...",
    saveEntry: "Sauvegarder l'entrée",
    startWriting: "Commencez à écrire pour suivre vos pensées et sentiments.",
    entriesSaved: "Vos entrées sont sauvegardées de façon permanente et ne sont visibles que par vous.",
    entryTitlePlaceholder: "Titre de l'entrée...",
    writeThoughtsPlaceholder: "Écrivez vos pensées...",
    entrySaved: "Votre entrée de journal a été sauvegardée de façon permanente.",
    entryUpdated: "Votre entrée de journal a été sauvegardée avec succès.",
    entryDeleted: "Votre entrée de journal a été supprimée de façon permanente.",
    
    // AI Chat
    aiWelcomeMessage: "Bonjour, je suis là pour vous écouter et vous soutenir. Vous n'êtes pas seul. Qu'avez-vous en tête aujourd'hui?",
    aiSupportChat: "Chat de soutien IA",
    aiImHere: "Je suis là. Parlez-moi.",
    talkToMe: "Parlez-moi",
    chatWithAi: "Chattez avec notre assistant IA compatissant",
    compassionateAssistant: "assistant IA compatissant",
    immediateSupport: "pour un soutien immédiat",
    copingStrategies: "stratégies d'adaptation",
    someoneToListen: "et quelqu'un pour écouter",
    startConversation: "Commencer la conversation",
    typeYourMessage: "Tapez votre message...",
    crisisWarning: "Si vous êtes en crise, appelez le 988 ou les services d'urgence immédiatement",
    unmuteAi: "Réactiver l'IA",
    changeNamePrompt: "Changer le nom",
    enterYourName: "Entrez votre nom",
    whatsYourName: "Quel est votre nom?",
    
    // Affirmations/Quotes
    youDeservePeace: "Vous méritez la paix et le bonheur",
    youAreStronger: "Vous êtes plus fort que vous ne le pensez",
    youMatter: "Vous comptez. Votre vie a de la valeur.",
    thisToWillPass: "Ceci aussi passera",
    youAreNotAlone: "Vous n'êtes pas seul dans ceci",
    youAreLoved: "Vous êtes aimé et valorisé",
    
    // Rotating Affirmations Array
    rotatingAffirmations: [
      "Vous êtes plus fort que vous ne le pensez",
      "Ce moment est temporaire. Vous pouvez le faire!",
      "Vous comptez. Votre vie a de la valeur",
      "L'aide est toujours disponible",
      "Vous n'êtes pas seul dans ce voyage",
      "Chaque respiration que vous prenez est une victoire",
      "Vous avez surmonté des défis auparavant",
      "Vos sentiments sont valides et temporaires",
      "Demain peut être différent",
      "Vous méritez l'amour et le soutien"
    ],
    
    // Profile UI
    backgroundImage: "Image d'arrière-plan",
    noBackgroundImageSet: "Aucune image d'arrière-plan définie",
    uploadImage: "Télécharger une image",
    setYourPersonalBackground: "Définir votre arrière-plan personnel",
    chooseYourImage: "Choisissez votre image",
    uploadAnyPhoto: "Téléchargez n'importe quelle photo depuis votre appareil",
    cropPosition: "Recadrer et positionner",
    useEditorToCrop: "Utilisez notre éditeur pour recadrer et centrer votre image parfaitement",
    screenImage: "Image d'écran",
    diary: "Journal",
    remove: "Supprimer",
    
    // Legal
    legalPoliciesDisclamers: "Politiques légales et avertissements",
    privacyPolicy: "Politique de confidentialité",
    termsConditions: "Termes et conditions",
    disclaimer: "Avertissement",
    effectiveDate: "Date d'entrée en vigueur",
    
    // Legal Content - simplified for space
    legalContent: {
      effectiveDate: "Date d'entrée en vigueur: 6 juin 2025",
      privacyIntro: "Take 5 valorise votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles.",
      informationWeCollect: "Informations que nous collectons:",
      personalDetails: "Détails personnels que vous fournissez",
      journalingEntries: "Entrées de journal",
      usageData: "Données d'utilisation",
      deviceData: "Données de l'appareil",
      howWeUseData: "Comment nous utilisons vos données:",
      operateApp: "Pour faire fonctionner l'Application",
      personalizedFeatures: "Pour des fonctionnalités personnalisées",
      improveExperience: "Pour améliorer l'expérience utilisateur",
      sendUpdates: "Pour envoyer des mises à jour",
      sharingData: "Partage des données:",
      noSellData: "Nous ne vendons pas vos données",
      noSharePrivate: "Nous ne partageons pas vos données privées",
      thirdPartyServices: "Nous pouvons utiliser des services tiers",
      dataSecurity: "Sécurité des données:",
      encryption: "Nous mettons en œuvre un chiffrement",
      deleteRequest: "Demander la suppression des données",
      yourRights: "Vos droits:",
      accessCorrectDelete: "Droit d'accéder, corriger ou supprimer",
      withdrawConsent: "Droit de retirer le consentement",
      lodgeComplaint: "Droit de déposer une plainte",
      termsIntro: "En utilisant l'application Take 5, vous acceptez ces termes.",
      eligibility: "Éligibilité:",
      ageRequirement: "Vous devez avoir 18 ans ou plus",
      ageRepresentation: "Vous déclarez avoir au moins 18 ans",
      mustBe18: "Vous devez avoir 18 ans ou plus",
      represent18: "Vous déclarez avoir au moins 18 ans",
      noMedicalAdvice: "Aucun conseil médical:",
      informationalOnly: "À des fins d'information uniquement",
      noMedicalDiagnosis: "Ne fournit pas de conseil médical",
      notReplacement: "Ne remplace pas les soins professionnels",
      noMedicalAdviceText: "Ne fournit pas de conseil médical",
      notReplaceProfessional: "Ne remplace pas les soins professionnels",
      consultProvider: "Consultez un professionnel de la santé",
      aiContentUsage: "Utilisation de l'IA:",
      aiNotTherapist: "L'IA n'est pas un thérapeute",
      thirdPartyContent: "Contenu de tiers",
      youtubeContent: "Contenu de tiers",
      emergencyDisclaimer: "Avertissement d'urgence:",
      emergencyUserTool: "Outils utilisateur d'urgence",
      emergencyText: "Outils utilisateur d'urgence",
      notEmergencyService: "Pas un service d'urgence",
      callEmergencyServices: "Appelez les services d'urgence",
      limitationLiability: "Limitation de responsabilité:",
      noLiability: "À vos propres risques",
      useAtRisk: "À vos propres risques",
      noWarranties: "Aucune garantie",
      disclaimerIntro: "Application de bien-être et de motivation",
      notMedicalDevice: "Pas un dispositif médical",
      supplementNot: "Complète mais ne remplace pas",
      ifCrisis: "En cas de crise, contactez les services d'urgence",
    }
  },

  // Thai translations
  th: {
    appName: "Take 5",
    tagline: "หายใจเข้าลึกๆ ควบคุมตัวเองได้อีกครั้ง",
    searchPlaceholder: "พิมพ์ความรู้สึกของคุณ: 'ฉันเหงา', 'ไร้บ้าน', 'อยากตาย'...",
    emergencySupport: "การสนับสนุนฉุกเฉิน",
    callEmergency: "โทร {number} (ฉุกเฉิน)",
    crisisHotline: "สายด่วนวิกฤต",
    crisisHotlineCall: "โทรเดี๋ยวนี้",
    emergencyWarning: "หากคุณตกอยู่ในอันตรายทันที โปรดโทรหาบริการฉุกเฉิน",
    
    // Authentication & User Account
    login: "เข้าสู่ระบบ",
    createAccount: "สร้างบัญชี",
    loginToCreateContactsList: "เข้าสู่ระบบเพื่อสร้างรายชื่อผู้ติดต่อ",
    signInWithGoogle: "เข้าสู่ระบบด้วย Google",
    
    additionalSupport: "การสนับสนุนเพิ่มเติม",
    howCanWeSupport: "คุณรู้สึกอย่างไร เพื่อน?",
    feelOverwhelmed: "ฉันรู้สึกท่วมท้น",
    breathingDescription: "การออกกำลังกายการหายใจและเทคนิคการหยั่งรากลึก",
    feelAnxious: "ฉันรู้สึกวิตกกังวล",
    anxiousDescription: "การจัดการความวิตกกังวลและกลยุทธ์การรับมือ",
    feelDepressed: "ฉันรู้สึกหดหู่",
    depressedDescription: "การสนับสนุนภาวะซึมเศร้าและทรัพยากรอารมณ์",
    needToTalk: "ฉันต้องการพูดคุย",
    talkDescription: "การให้คำปรึกษาอย่างมืออาชีพและการสนับสนุนจากเพื่อน",
    
    // Support modules
    breathing: "การหายใจ",
    breathingGuide: "คู่มือ 5 นาที",
    affirmations: "การยืนยัน",
    kindWords: "คำพูดดีๆ",
    calmMusic: "เพลงสงบ",
    soothingSounds: "เสียงผ่อนคลาย",
    grounding: "การหยั่งราก",
    groundingTechnique: "5-4-3-2-1",
    
    // Contact Management
    trustedContacts: "ผู้ติดต่อที่เชื่อถือได้ของคุณ",
    confidenceContacts: "ผู้ติดต่อที่เชื่อถือได้ของคุณ",
    addTrustedContact: "เพิ่มผู้ติดต่อที่เชื่อถือได้",
    
    // Contact form
    name: "ชื่อ",
    phoneNumber: "หมายเลขโทรศัพท์",
    relationship: "ความสัมพันธ์",
    enterName: "ใส่ชื่อ",
    enterPhone: "ใส่หมายเลขโทรศัพท์",
    enterRelationship: "เช่น นักบำบัด เพื่อน ครอบครัว",
    addContact: "เพิ่มผู้ติดต่อ",
    
    footerMessage1: "คุณไม่ได้อยู่คนเดียว",
    footerMessage2: "คุณสำคัญ ชีวิตของคุณมีค่า",
    footerMessage3: "ความช่วยเหลือมีอยู่เสมอ",
    footerMessage4: "ช่วงเวลานี้เป็นเพียงชั่วคราว คุณทำได้!",
    visitWebsite: "เยี่ยมชมเว็บไซต์",
    callNow: "โทรเดี๋ยวนี้",
    cancel: "ยกเลิก",
    close: "ปิด",
    
    breathingExercise: "การออกกำลังกายการหายใจ",
    inhale: "หายใจเข้า",
    hold: "กลั้น",
    exhale: "หายใจออก",
    
    // Profile
    yourProfile: "โปรไฟล์ของคุณ",
    profile: "โปรไฟล์",
    privateDiary: "ไดอารี่ส่วนตัว",
    yourPrivateDiary: "ไดอารี่ส่วนตัวของคุณ",
    newEntry: "รายการใหม่",
    addQuotePlaceholder: "เพิ่มคำพูด (สูงสุด 40 ตัวอักษร)",
    logout: "ออกจากระบบ",
    
    // Diary
    entryTitle: "หัวข้อรายการ...",
    writeThoughts: "เขียนความคิดของคุณ...",
    saveEntry: "บันทึกรายการ",
    startWriting: "เริ่มเขียนเพื่อติดตามความคิดและความรู้สึกของคุณ",
    entriesSaved: "รายการของคุณถูกบันทึกอย่างถาวรและมองเห็นได้เฉพาะคุณเท่านั้น",
    entryTitlePlaceholder: "หัวข้อรายการ...",
    writeThoughtsPlaceholder: "เขียนความคิดของคุณ...",
    entrySaved: "รายการไดอารี่ของคุณถูกบันทึกอย่างถาวรแล้ว",
    entryUpdated: "รายการไดอารี่ของคุณถูกบันทึกสำเร็จแล้ว",
    entryDeleted: "รายการไดอารี่ของคุณถูกลบอย่างถาวรแล้ว",
    
    // AI Chat
    aiWelcomeMessage: "สวัสดี ฉันอยู่ที่นี่เพื่อฟังและสนับสนุนคุณ คุณไม่ได้อยู่คนเดียว วันนี้คุณคิดเรื่องอะไรอยู่?",
    aiSupportChat: "แชทสนับสนุน AI",
    aiImHere: "ฉันอยู่ที่นี่ พูดกับฉันสิ",
    talkToMe: "พูดกับฉัน",
    chatWithAi: "แชทกับผู้ช่วย AI ที่มีความเมตตาของเรา",
    compassionateAssistant: "ผู้ช่วย AI ที่มีความเมตตา",
    immediateSupport: "เพื่อการสนับสนุนทันที",
    copingStrategies: "กลยุทธ์การรับมือ",
    someoneToListen: "และใครสักคนที่จะฟัง",
    startConversation: "เริ่มการสนทนา",
    typeYourMessage: "พิมพ์ข้อความของคุณ...",
    crisisWarning: "หากคุณอยู่ในสถานการณ์วิกฤต โปรดโทร 988 หรือบริการฉุกเฉินทันที",
    unmuteAi: "เปิดเสียง AI",
    changeNamePrompt: "เปลี่ยนชื่อ",
    enterYourName: "ใส่ชื่อของคุณ",
    whatsYourName: "ชื่อของคุณคืออะไร?",
    
    // Affirmations/Quotes
    youDeservePeace: "คุณสมควรได้รับความสงบและความสุข",
    youAreStronger: "คุณแข็งแกร่งกว่าที่คุณรู้",
    youMatter: "คุณสำคัญ ชีวิตของคุณมีค่า",
    thisToWillPass: "สิ่งนี้ก็จะผ่านไป",
    youAreNotAlone: "คุณไม่ได้อยู่คนเดียวในเรื่องนี้",
    youAreLoved: "คุณถูกรักและได้รับการยกย่อง",
    
    // Rotating Affirmations Array
    rotatingAffirmations: [
      "คุณแข็งแกร่งกว่าที่คุณคิด",
      "ช่วงเวลานี้เป็นเพียงชั่วคราว คุณทำได้!",
      "คุณสำคัญ ชีวิตของคุณมีค่า",
      "ความช่วยเหลือมีอยู่เสมอ",
      "คุณไม่ได้อยู่คนเดียวในการเดินทางนี้",
      "ทุกลมหายใจที่คุณสูดเข้าคือชัยชนะ",
      "คุณเคยผ่านความท้าทายมาก่อน",
      "ความรู้สึกของคุณถูกต้องและเป็นเพียงชั่วคราว",
      "พรุ่งนี้อาจจะแตกต่าง",
      "คุณสมควรได้รับความรักและการสนับสนุน"
    ],
    
    // Profile UI
    backgroundImage: "ภาพพื้นหลัง",
    noBackgroundImageSet: "ไม่ได้ตั้งภาพพื้นหลัง",
    uploadImage: "อัปโหลดรูปภาพ",
    setYourPersonalBackground: "ตั้งพื้นหลังส่วนตัวของคุณ",
    chooseYourImage: "เลือกรูปภาพของคุณ",
    uploadAnyPhoto: "อัปโหลดรูปถ่ายใดๆ จากอุปกรณ์ของคุณ",
    cropPosition: "ครอบตัดและจัดตำแหน่ง",
    useEditorToCrop: "ใช้โปรแกรมแก้ไขของเราเพื่อครอบตัดและจัดกึ่งกลางภาพของคุณให้สมบูรณ์แบบ",
    screenImage: "ภาพหน้าจอ",
    diary: "ไดอารี่",
    remove: "ลบ",
    
    // Legal
    legalPoliciesDisclamers: "นโยบายทางกฎหมายและข้อจำกัดความรับผิดชอบ",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsConditions: "ข้อกำหนดและเงื่อนไข",
    disclaimer: "ข้อจำกัดความรับผิดชอบ",
    effectiveDate: "วันที่มีผลบังคับใช้",
    
    // Legal Content - simplified for space
    legalContent: {
      effectiveDate: "วันที่มีผลบังคับใช้: 6 มิถุนายน 2025",
      privacyIntro: "Take 5 ให้ความสำคัญกับความเป็นส่วนตัวของคุณ",
      informationWeCollect: "ข้อมูลที่เราเก็บรวบรวม:",
      personalDetails: "รายละเอียดส่วนบุคคล",
      journalingEntries: "รายการไดอารี่",
      usageData: "ข้อมูลการใช้งาน",
      deviceData: "ข้อมูลอุปกรณ์",
      howWeUseData: "วิธีการใช้ข้อมูล:",
      operateApp: "เพื่อดำเนินการแอป",
      personalizedFeatures: "สำหรับคุณสมบัติส่วนบุคคล",
      improveExperience: "เพื่อปรับปรุงประสบการณ์",
      sendUpdates: "เพื่อส่งการอัปเดต",
      sharingData: "การแบ่งปันข้อมูล:",
      noSellData: "เราไม่ขายข้อมูล",
      noSharePrivate: "เราไม่แบ่งปันข้อมูลส่วนตัว",
      thirdPartyServices: "บริการบุคคลที่สาม",
      dataSecurity: "ความปลอดภัยข้อมูล:",
      encryption: "การเข้ารหัส",
      deleteRequest: "ขอลบข้อมูล",
      yourRights: "สิทธิ์ของคุณ:",
      accessCorrectDelete: "สิทธิ์ในการเข้าถึง แก้ไข ลบ",
      withdrawConsent: "สิทธิ์ถอนความยินยอม",
      lodgeComplaint: "สิทธิ์ยื่นข้อร้องเรียน",
      termsIntro: "การใช้แอป Take 5",
      eligibility: "คุณสมบัติ:",
      ageRequirement: "ต้องมีอายุ 18 ปีขึ้นไป",
      ageRepresentation: "รับรองอายุ 18 ปีขึ้นไป",
      mustBe18: "ต้องมีอายุ 18 ปีขึ้นไป",
      represent18: "รับรองอายุ 18 ปีขึ้นไป",
      noMedicalAdvice: "ไม่มีคำแนะนำทางการแพทย์:",
      informationalOnly: "เพื่อการให้ข้อมูลเท่านั้น",
      noMedicalDiagnosis: "ไม่ให้คำแนะนำทางการแพทย์",
      notReplacement: "ไม่ทดแทนการดูแลแบบมืออาชีพ",
      noMedicalAdviceText: "ไม่ให้คำแนะนำทางการแพทย์",
      notReplaceProfessional: "ไม่ทดแทนการดูแลแบบมืออาชีพ",
      consultProvider: "ปรึกษาผู้เชี่ยวชาญ",
      aiContentUsage: "การใช้ AI:",
      aiNotTherapist: "AI ไม่ใช่นักบำบัด",
      thirdPartyContent: "เนื้อหาบุคคลที่สาม",
      youtubeContent: "เนื้อหาบุคคลที่สาม",
      emergencyDisclaimer: "ข้อจำกัดความรับผิดชอบฉุกเฉิน:",
      emergencyUserTool: "เครื่องมือผู้ใช้ฉุกเฉิน",
      emergencyText: "เครื่องมือผู้ใช้ฉุกเฉิน",
      notEmergencyService: "ไม่ใช่บริการฉุกเฉิน",
      callEmergencyServices: "โทรบริการฉุกเฉิน",
      limitationLiability: "การจำกัดความรับผิดชอบ:",
      noLiability: "ความเสี่ยงของตัวเอง",
      useAtRisk: "ความเสี่ยงของตัวเอง",
      noWarranties: "ไม่มีการรับประกัน",
      disclaimerIntro: "แอปสุขภาพและแรงบันดาลใจ",
      notMedicalDevice: "ไม่ใช่อุปกรณ์ทางการแพทย์",
      supplementNot: "เสริมแต่ไม่ทดแทน",
      ifCrisis: "หากเกิดวิกฤต ติดต่อบริการฉุกเฉิน",
    }
  },

  // Spanish, German, Italian placeholder translations (simplified)
  es: {
    appName: "Take 5",
    tagline: "Respira profundo. Recupera el control.",
    searchPlaceholder: "Escribe cómo te sientes...",
    emergencySupport: "Apoyo de Emergencia",
    callEmergency: "Llama al {number}",
    crisisHotline: "Línea de Crisis",
    crisisHotlineCall: "Llama Ahora",
    emergencyWarning: "En peligro inmediato, llama a emergencias",
    login: "iniciar sesión",
    createAccount: "crear cuenta",
    loginToCreateContactsList: "inicia sesión para crear lista",
    signInWithGoogle: "Iniciar sesión con Google",
    additionalSupport: "Apoyo Adicional",
    howCanWeSupport: "¿Cómo te sientes?",
    feelOverwhelmed: "Me Siento Abrumado",
    breathingDescription: "Ejercicios de respiración",
    feelAnxious: "Me Siento Ansioso",
    anxiousDescription: "Manejo de ansiedad",
    feelDepressed: "Me Siento Deprimido",
    depressedDescription: "Apoyo para depresión",
    needToTalk: "Necesito Hablar",
    talkDescription: "Consejería profesional",
    breathing: "Respiración",
    breathingGuide: "Guía 5 min",
    affirmations: "Afirmaciones",
    kindWords: "Palabras amables",
    calmMusic: "Música Tranquila",
    soothingSounds: "Sonidos relajantes",
    grounding: "Conexión",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Contactos de Confianza",
    confidenceContacts: "Contactos de Confianza",
    addTrustedContact: "Agregar contacto",
    name: "Nombre",
    phoneNumber: "Teléfono",
    relationship: "Relación",
    enterName: "Ingresa nombre",
    enterPhone: "Ingresa teléfono",
    enterRelationship: "ej. Terapeuta",
    addContact: "Agregar Contacto",
    footerMessage1: "No estás solo.",
    footerMessage2: "Importas.",
    footerMessage3: "Ayuda disponible.",
    footerMessage4: "Momento temporal.",
    visitWebsite: "Visitar Sitio",
    callNow: "Llama Ahora",
    cancel: "Cancelar",
    close: "Cerrar",
    breathingExercise: "Ejercicio Respiración",
    inhale: "Inhala",
    hold: "Mantén",
    exhale: "Exhala",
    yourProfile: "Tu Perfil",
    profile: "Perfil",
    privateDiary: "Diario Privado",
    yourPrivateDiary: "Tu Diario",
    newEntry: "Nueva Entrada",
    addQuotePlaceholder: "Agregar cita",
    logout: "Cerrar Sesión",
    entryTitle: "Título...",
    writeThoughts: "Pensamientos...",
    saveEntry: "Guardar",
    startWriting: "Comenzar a escribir",
    entriesSaved: "Entradas guardadas",
    entryTitlePlaceholder: "Título...",
    writeThoughtsPlaceholder: "Pensamientos...",
    entrySaved: "Entrada guardada",
    entryUpdated: "Entrada actualizada",
    entryDeleted: "Entrada eliminada",
    aiWelcomeMessage: "Hola, estoy aquí para apoyarte",
    aiSupportChat: "Chat IA",
    aiImHere: "Estoy aquí",
    talkToMe: "Háblame",
    chatWithAi: "Chat con IA",
    compassionateAssistant: "asistente IA",
    immediateSupport: "apoyo inmediato",
    copingStrategies: "estrategias",
    someoneToListen: "alguien que escuche",
    startConversation: "Iniciar",
    typeYourMessage: "Escribe...",
    crisisWarning: "En crisis, llama emergencias",
    unmuteAi: "Activar IA",
    changeNamePrompt: "Cambiar Nombre",
    enterYourName: "Tu nombre",
    whatsYourName: "¿Tu nombre?",
    youDeservePeace: "Mereces paz",
    youAreStronger: "Eres fuerte",
    youMatter: "Importas",
    thisToWillPass: "Esto pasará",
    youAreNotAlone: "No estás solo",
    youAreLoved: "Eres amado",
    rotatingAffirmations: ["Eres fuerte", "Importas", "Ayuda disponible"],
    backgroundImage: "Imagen Fondo",
    noBackgroundImageSet: "Sin imagen",
    uploadImage: "Subir Imagen",
    setYourPersonalBackground: "Fondo Personal",
    chooseYourImage: "Elegir Imagen",
    uploadAnyPhoto: "Subir foto",
    cropPosition: "Recortar",
    useEditorToCrop: "Editor recortar",
    screenImage: "Imagen Pantalla",
    diary: "Diario",
    remove: "Eliminar",
    legalPoliciesDisclamers: "Políticas Legales",
    privacyPolicy: "Privacidad",
    termsConditions: "Términos",
    disclaimer: "Exención",
    effectiveDate: "Fecha Vigencia",
    legalContent: {
      effectiveDate: "Fecha: 6 junio 2025",
      privacyIntro: "Take 5 valora tu privacidad",
      informationWeCollect: "Información recopilada",
      personalDetails: "Detalles personales",
      journalingEntries: "Entradas diario",
      usageData: "Datos uso",
      deviceData: "Datos dispositivo",
      howWeUseData: "Uso datos",
      operateApp: "Operar app",
      personalizedFeatures: "Funciones personalizadas",
      improveExperience: "Mejorar experiencia",
      sendUpdates: "Enviar actualizaciones",
      sharingData: "Compartir datos",
      noSellData: "No vendemos datos",
      noSharePrivate: "No compartimos privados",
      thirdPartyServices: "Servicios terceros",
      dataSecurity: "Seguridad datos",
      encryption: "Cifrado",
      deleteRequest: "Solicitar eliminación",
      yourRights: "Tus derechos",
      accessCorrectDelete: "Acceder, corregir, eliminar",
      withdrawConsent: "Retirar consentimiento",
      lodgeComplaint: "Presentar queja",
      termsIntro: "Usar app acepta términos",
      eligibility: "Elegibilidad",
      ageRequirement: "18 años o más",
      ageRepresentation: "Declaras 18 años",
      mustBe18: "18 años o más",
      represent18: "Declaras 18 años",
      noMedicalAdvice: "Sin consejo médico",
      informationalOnly: "Solo informativo",
      noMedicalDiagnosis: "Sin diagnóstico",
      notReplacement: "No reemplaza profesional",
      noMedicalAdviceText: "Sin consejo médico",
      notReplaceProfessional: "No reemplaza profesional",
      consultProvider: "Consultar profesional",
      aiContentUsage: "Uso IA",
      aiNotTherapist: "IA no terapeuta",
      thirdPartyContent: "Contenido terceros",
      youtubeContent: "Contenido terceros",
      emergencyDisclaimer: "Exención emergencia",
      emergencyUserTool: "Herramienta usuario",
      emergencyText: "Herramienta usuario",
      notEmergencyService: "No servicio emergencia",
      callEmergencyServices: "Llamar emergencias",
      limitationLiability: "Limitación responsabilidad",
      noLiability: "Propio riesgo",
      useAtRisk: "Propio riesgo",
      noWarranties: "Sin garantías",
      disclaimerIntro: "App bienestar",
      notMedicalDevice: "No dispositivo médico",
      supplementNot: "Complementa no reemplaza",
      ifCrisis: "En crisis contactar emergencias",
    }
  },

  de: {
    appName: "Take 5",
    tagline: "Atme tief durch. Übernimm die Kontrolle.",
    searchPlaceholder: "Wie fühlst du dich...",
    emergencySupport: "Notfallunterstützung",
    callEmergency: "Rufe {number} an",
    crisisHotline: "Krisen-Hotline",
    crisisHotlineCall: "Jetzt anrufen",
    emergencyWarning: "Bei Gefahr Notdienst anrufen",
    login: "anmelden",
    createAccount: "Konto erstellen",
    loginToCreateContactsList: "anmelden für Kontakte",
    signInWithGoogle: "Mit Google anmelden",
    additionalSupport: "Zusätzliche Unterstützung",
    howCanWeSupport: "Wie fühlst du dich?",
    feelOverwhelmed: "Überfordert",
    breathingDescription: "Atemübungen",
    feelAnxious: "Ängstlich",
    anxiousDescription: "Angstbewältigung",
    feelDepressed: "Deprimiert",
    depressedDescription: "Depressionshilfe",
    needToTalk: "Reden",
    talkDescription: "Beratung",
    breathing: "Atmung",
    breathingGuide: "5-Min-Anleitung",
    affirmations: "Bestätigungen",
    kindWords: "Freundliche Worte",
    calmMusic: "Ruhige Musik",
    soothingSounds: "Beruhigende Klänge",
    grounding: "Erdung",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Vertrauenskontakte",
    confidenceContacts: "Vertrauenskontakte",
    addTrustedContact: "Kontakt hinzufügen",
    name: "Name",
    phoneNumber: "Telefon",
    relationship: "Beziehung",
    enterName: "Namen eingeben",
    enterPhone: "Telefon eingeben",
    enterRelationship: "z.B. Therapeut",
    addContact: "Kontakt hinzufügen",
    footerMessage1: "Du bist nicht allein.",
    footerMessage2: "Du zählst.",
    footerMessage3: "Hilfe verfügbar.",
    footerMessage4: "Moment vorübergehend.",
    visitWebsite: "Website besuchen",
    callNow: "Jetzt anrufen",
    cancel: "Abbrechen",
    close: "Schließen",
    breathingExercise: "Atemübung",
    inhale: "Einatmen",
    hold: "Halten",
    exhale: "Ausatmen",
    yourProfile: "Dein Profil",
    profile: "Profil",
    privateDiary: "Privates Tagebuch",
    yourPrivateDiary: "Dein Tagebuch",
    newEntry: "Neuer Eintrag",
    addQuotePlaceholder: "Zitat hinzufügen",
    logout: "Abmelden",
    entryTitle: "Titel...",
    writeThoughts: "Gedanken...",
    saveEntry: "Speichern",
    startWriting: "Schreiben beginnen",
    entriesSaved: "Einträge gespeichert",
    entryTitlePlaceholder: "Titel...",
    writeThoughtsPlaceholder: "Gedanken...",
    entrySaved: "Eintrag gespeichert",
    entryUpdated: "Eintrag aktualisiert",
    entryDeleted: "Eintrag gelöscht",
    aiWelcomeMessage: "Hallo, ich bin hier für dich",
    aiSupportChat: "KI-Chat",
    aiImHere: "Ich bin hier",
    talkToMe: "Sprich mit mir",
    chatWithAi: "Chat mit KI",
    compassionateAssistant: "KI-Assistent",
    immediateSupport: "sofortige Hilfe",
    copingStrategies: "Strategien",
    someoneToListen: "jemand zum Zuhören",
    startConversation: "Beginnen",
    typeYourMessage: "Nachricht...",
    crisisWarning: "In Krise Notdienst anrufen",
    unmuteAi: "KI aktivieren",
    changeNamePrompt: "Namen ändern",
    enterYourName: "Dein Name",
    whatsYourName: "Wie heißt du?",
    youDeservePeace: "Du verdienst Frieden",
    youAreStronger: "Du bist stark",
    youMatter: "Du zählst",
    thisToWillPass: "Das geht vorüber",
    youAreNotAlone: "Nicht allein",
    youAreLoved: "Du bist geliebt",
    rotatingAffirmations: ["Du bist stark", "Du zählst", "Hilfe verfügbar"],
    backgroundImage: "Hintergrundbild",
    noBackgroundImageSet: "Kein Bild",
    uploadImage: "Bild hochladen",
    setYourPersonalBackground: "Persönlicher Hintergrund",
    chooseYourImage: "Bild wählen",
    uploadAnyPhoto: "Foto hochladen",
    cropPosition: "Zuschneiden",
    useEditorToCrop: "Editor zuschneiden",
    screenImage: "Bildschirmbild",
    diary: "Tagebuch",
    remove: "Entfernen",
    legalPoliciesDisclamers: "Rechtliche Richtlinien",
    privacyPolicy: "Datenschutz",
    termsConditions: "Bedingungen",
    disclaimer: "Haftungsausschluss",
    effectiveDate: "Gültigkeitsdatum",
    legalContent: {
      effectiveDate: "Datum: 6. Juni 2025",
      privacyIntro: "Take 5 schätzt Privatsphäre",
      informationWeCollect: "Gesammelte Informationen",
      personalDetails: "Persönliche Details",
      journalingEntries: "Tagebucheinträge",
      usageData: "Nutzungsdaten",
      deviceData: "Gerätedaten",
      howWeUseData: "Datennutzung",
      operateApp: "App betreiben",
      personalizedFeatures: "Personalisierte Funktionen",
      improveExperience: "Erfahrung verbessern",
      sendUpdates: "Updates senden",
      sharingData: "Datenweitergabe",
      noSellData: "Verkaufen keine Daten",
      noSharePrivate: "Teilen keine privaten",
      thirdPartyServices: "Drittanbieter-Services",
      dataSecurity: "Datensicherheit",
      encryption: "Verschlüsselung",
      deleteRequest: "Löschung beantragen",
      yourRights: "Deine Rechte",
      accessCorrectDelete: "Zugreifen, korrigieren, löschen",
      withdrawConsent: "Einwilligung widerrufen",
      lodgeComplaint: "Beschwerde einreichen",
      termsIntro: "App-Nutzung akzeptiert Bedingungen",
      eligibility: "Berechtigung",
      ageRequirement: "18 Jahre oder älter",
      ageRepresentation: "Erklärst 18 Jahre",
      mustBe18: "18 Jahre oder älter",
      represent18: "Erklärst 18 Jahre",
      noMedicalAdvice: "Keine medizinische Beratung",
      informationalOnly: "Nur informativ",
      noMedicalDiagnosis: "Keine Diagnose",
      notReplacement: "Ersetzt nicht professionell",
      noMedicalAdviceText: "Keine medizinische Beratung",
      notReplaceProfessional: "Ersetzt nicht professionell",
      consultProvider: "Professionell konsultieren",
      aiContentUsage: "KI-Nutzung",
      aiNotTherapist: "KI nicht Therapeut",
      thirdPartyContent: "Drittanbieter-Inhalte",
      youtubeContent: "Drittanbieter-Inhalte",
      emergencyDisclaimer: "Notfall-Haftungsausschluss",
      emergencyUserTool: "Benutzer-Tool",
      emergencyText: "Benutzer-Tool",
      notEmergencyService: "Kein Notfalldienst",
      callEmergencyServices: "Notdienste anrufen",
      limitationLiability: "Haftungsbeschränkung",
      noLiability: "Eigenes Risiko",
      useAtRisk: "Eigenes Risiko",
      noWarranties: "Keine Garantien",
      disclaimerIntro: "Wellness-App",
      notMedicalDevice: "Kein medizinisches Gerät",
      supplementNot: "Ergänzt nicht ersetzt",
      ifCrisis: "In Krise Notdienste kontaktieren",
    }
  },

  it: {
    appName: "Take 5",
    tagline: "Respira profondamente. Riprendi controllo.",
    searchPlaceholder: "Come ti senti...",
    emergencySupport: "Supporto Emergenza",
    callEmergency: "Chiama {number}",
    crisisHotline: "Linea Crisi",
    crisisHotlineCall: "Chiama Ora",
    emergencyWarning: "In pericolo chiama emergenze",
    login: "accedi",
    createAccount: "crea account",
    loginToCreateContactsList: "accedi per contatti",
    signInWithGoogle: "Accedi con Google",
    additionalSupport: "Supporto Aggiuntivo",
    howCanWeSupport: "Come ti senti?",
    feelOverwhelmed: "Sopraffatto",
    breathingDescription: "Esercizi respirazione",
    feelAnxious: "Ansioso",
    anxiousDescription: "Gestione ansia",
    feelDepressed: "Depresso",
    depressedDescription: "Supporto depressione",
    needToTalk: "Parlare",
    talkDescription: "Consulenza",
    breathing: "Respirazione",
    breathingGuide: "Guida 5 min",
    affirmations: "Affermazioni",
    kindWords: "Parole gentili",
    calmMusic: "Musica Calma",
    soothingSounds: "Suoni rilassanti",
    grounding: "Radicamento",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Contatti fidati",
    confidenceContacts: "Contatti fidati",
    addTrustedContact: "Aggiungi contatto",
    name: "Nome",
    phoneNumber: "Telefono",
    relationship: "Relazione",
    enterName: "Inserisci nome",
    enterPhone: "Inserisci telefono",
    enterRelationship: "es. Terapista",
    addContact: "Aggiungi Contatto",
    footerMessage1: "Non sei solo.",
    footerMessage2: "Conti.",
    footerMessage3: "Aiuto disponibile.",
    footerMessage4: "Momento temporaneo.",
    visitWebsite: "Visita Sito",
    callNow: "Chiama Ora",
    cancel: "Annulla",
    close: "Chiudi",
    breathingExercise: "Esercizio Respirazione",
    inhale: "Inspira",
    hold: "Trattieni",
    exhale: "Espira",
    yourProfile: "Il tuo profilo",
    profile: "Profilo",
    privateDiary: "Diario privato",
    yourPrivateDiary: "Il tuo diario",
    newEntry: "Nuova voce",
    addQuotePlaceholder: "Aggiungi citazione",
    logout: "Esci",
    entryTitle: "Titolo...",
    writeThoughts: "Pensieri...",
    saveEntry: "Salva",
    startWriting: "Inizia scrivere",
    entriesSaved: "Voci salvate",
    entryTitlePlaceholder: "Titolo...",
    writeThoughtsPlaceholder: "Pensieri...",
    entrySaved: "Voce salvata",
    entryUpdated: "Voce aggiornata",
    entryDeleted: "Voce eliminata",
    aiWelcomeMessage: "Ciao, sono qui per te",
    aiSupportChat: "Chat IA",
    aiImHere: "Sono qui",
    talkToMe: "Parlami",
    chatWithAi: "Chat con IA",
    compassionateAssistant: "assistente IA",
    immediateSupport: "supporto immediato",
    copingStrategies: "strategie",
    someoneToListen: "qualcuno che ascolti",
    startConversation: "Inizia",
    typeYourMessage: "Messaggio...",
    crisisWarning: "In crisi chiama emergenze",
    unmuteAi: "Riattiva IA",
    changeNamePrompt: "Cambia Nome",
    enterYourName: "Tuo nome",
    whatsYourName: "Come ti chiami?",
    youDeservePeace: "Meriti pace",
    youAreStronger: "Sei forte",
    youMatter: "Conti",
    thisToWillPass: "Passerà",
    youAreNotAlone: "Non solo",
    youAreLoved: "Sei amato",
    rotatingAffirmations: ["Sei forte", "Conti", "Aiuto disponibile"],
    backgroundImage: "Immagine sfondo",
    noBackgroundImageSet: "Nessuna immagine",
    uploadImage: "Carica immagine",
    setYourPersonalBackground: "Sfondo personale",
    chooseYourImage: "Scegli immagine",
    uploadAnyPhoto: "Carica foto",
    cropPosition: "Ritaglia",
    useEditorToCrop: "Editor ritaglio",
    screenImage: "Immagine schermo",
    diary: "Diario",
    remove: "Rimuovi",
    legalPoliciesDisclamers: "Politiche legali",
    privacyPolicy: "Privacy",
    termsConditions: "Termini",
    disclaimer: "Disclaimer",
    effectiveDate: "Data vigore",
    legalContent: {
      effectiveDate: "Data: 6 giugno 2025",
      privacyIntro: "Take 5 valorizza privacy",
      informationWeCollect: "Informazioni raccolte",
      personalDetails: "Dettagli personali",
      journalingEntries: "Voci diario",
      usageData: "Dati utilizzo",
      deviceData: "Dati dispositivo",
      howWeUseData: "Uso dati",
      operateApp: "Operare app",
      personalizedFeatures: "Funzionalità personalizzate",
      improveExperience: "Migliorare esperienza",
      sendUpdates: "Inviare aggiornamenti",
      sharingData: "Condivisione dati",
      noSellData: "Non vendiamo dati",
      noSharePrivate: "Non condividiamo privati",
      thirdPartyServices: "Servizi terze parti",
      dataSecurity: "Sicurezza dati",
      encryption: "Crittografia",
      deleteRequest: "Richiedere cancellazione",
      yourRights: "Tuoi diritti",
      accessCorrectDelete: "Accedere, correggere, eliminare",
      withdrawConsent: "Ritirare consenso",
      lodgeComplaint: "Presentare reclamo",
      termsIntro: "Uso app accetta termini",
      eligibility: "Idoneità",
      ageRequirement: "18 anni o più",
      ageRepresentation: "Dichiari 18 anni",
      mustBe18: "18 anni o più",
      represent18: "Dichiari 18 anni",
      noMedicalAdvice: "Nessun consiglio medico",
      informationalOnly: "Solo informativo",
      noMedicalDiagnosis: "Nessuna diagnosi",
      notReplacement: "Non sostituisce professionale",
      noMedicalAdviceText: "Nessun consiglio medico",
      notReplaceProfessional: "Non sostituisce professionale",
      consultProvider: "Consultare professionale",
      aiContentUsage: "Uso IA",
      aiNotTherapist: "IA non terapista",
      thirdPartyContent: "Contenuti terze parti",
      youtubeContent: "Contenuti terze parti",
      emergencyDisclaimer: "Disclaimer emergenza",
      emergencyUserTool: "Strumento utente",
      emergencyText: "Strumento utente",
      notEmergencyService: "Non servizio emergenza",
      callEmergencyServices: "Chiamare emergenze",
      limitationLiability: "Limitazione responsabilità",
      noLiability: "Proprio rischio",
      useAtRisk: "Proprio rischio",
      noWarranties: "Nessuna garanzia",
      disclaimerIntro: "App benessere",
      notMedicalDevice: "Non dispositivo medico",
      supplementNot: "Integra non sostituisce",
      ifCrisis: "In crisi contattare emergenze",
    }
  },

  // Additional languages inherit from English as fallback
  pt: {} as any,
  ru: {} as any,
  ja: {} as any,
  ko: {} as any,
  zh: {} as any,
  ar: {} as any,
  hi: {} as any,
  nl: {} as any
};

// Translation function with placeholder support and fallback to English
export function t(
  key: string,
  placeholders?: Record<string, string>,
  language: Language = 'en'
): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  // First try the requested language
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found in requested language
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if not found in English either
        }
      }
      break;
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