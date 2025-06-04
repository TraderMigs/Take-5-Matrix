export interface Translation {
  // App core
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
  
  // Authentication & User Account
  login: string;
  createAccount: string;
  loginToCreateContactsList: string;
  signInWithGoogle: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  createProfile: string;
  updateProfile: string;
  signUp: string;
  welcomeBack: string;
  signOut: string;
  myAccount: string;
  accountSettings: string;
  deleteAccount: string;
  
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
  trustedContactsTitle: string;
  confidenceContacts: string;
  addTrustedContact: string;
  addNewContact: string;
  editContact: string;
  deleteContact: string;
  contactName: string;
  contactPhone: string;
  contactRelationship: string;
  saveContact: string;
  noContactsYet: string;
  contactAdded: string;
  contactUpdated: string;
  contactDeleted: string;
  
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
  youAreEnough: string;
  youAreStrong: string;
  helpIsAvailable: string;
  momentIsTemporary: string;
  youCanDoThis: string;
  
  // Rotating Affirmations Array
  rotatingAffirmations: string[];
  
  // Music & Audio
  calmingMusic: string;
  peacefulMusic: string;
  relaxingAudio: string;
  
  // Grounding & Techniques
  groundingExercise: string;
  breathingTechnique: string;
  mindfulnessExercise: string;
  relaxationTechnique: string;
  
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
    
    // Authentication & User Account
    login: "login",
    createAccount: "createAccount",
    loginToCreateContactsList: "loginToCreateContactsList",
    signInWithGoogle: "Sign in with Google",
    emailAddress: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    createProfile: "Create Profile",
    updateProfile: "Update Profile",
    signUp: "Sign Up",
    welcomeBack: "Welcome Back",
    signOut: "Sign Out",
    myAccount: "My Account",
    accountSettings: "Account Settings",
    deleteAccount: "Delete Account",
    
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
    trustedContactsTitle: "Your Trusted Contacts",
    confidenceContacts: "Your Trusted Contacts",
    addTrustedContact: "Add a trusted contact",
    addNewContact: "Add New Contact",
    editContact: "Edit Contact",
    deleteContact: "Delete Contact",
    contactName: "Contact Name",
    contactPhone: "Contact Phone",
    contactRelationship: "Contact Relationship",
    saveContact: "Save Contact",
    noContactsYet: "No contacts yet",
    contactAdded: "Contact added successfully",
    contactUpdated: "Contact updated successfully",
    contactDeleted: "Contact deleted successfully",
    
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
    youAreEnough: "You are enough, just as you are",
    youAreStrong: "You have the strength to get through this",
    helpIsAvailable: "Help is always available",
    momentIsTemporary: "This moment is temporary. You got this!",
    youCanDoThis: "You can do this",
    
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
    
    // Music & Audio
    calmingMusic: "Calming Music",
    peacefulMusic: "Peaceful Music",
    relaxingAudio: "Relaxing Audio",
    
    // Grounding & Techniques
    groundingExercise: "Grounding Exercise",
    breathingTechnique: "Breathing Technique",
    mindfulnessExercise: "Mindfulness Exercise",
    relaxationTechnique: "Relaxation Technique",
    
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
      ageRequirement: "legalContent.ageRequirement",
      ageRepresentation: "legalContent.ageRepresentation",
      mustBe18: "You must be 18 years or older to use the App.",
      represent18: "By using the App, you represent that you are at least 18 years old.",
      noMedicalAdvice: "No Medical Advice:",
      informationalOnly: "The App is for informational and motivational purposes only.",
      noMedicalDiagnosis: "legalContent.noMedicalDiagnosis",
      notReplacement: "legalContent.notReplacement",
      noMedicalAdviceText: "Take 5 does not provide medical advice, diagnosis, or treatment.",
      notReplaceProfessional: "Content within the App (quotes, affirmations, AI chat, linked videos) is not intended to replace professional mental health or medical care.",
      consultProvider: "Always consult a qualified healthcare provider for mental health issues.",
      aiContentUsage: "AI and Content Usage:",
      aiNotTherapist: "The AI chatbot is a basic conversational assistant. It is not a therapist, licensed counselor, or crisis worker.",
      thirdPartyContent: "legalContent.thirdPartyContent",
      youtubeContent: "We may link to third-party content (e.g., YouTube videos). We do not control such content and are not responsible for its accuracy or availability.",
      emergencyDisclaimer: "Emergency Feature Disclaimer:",
      emergencyUserTool: "legalContent.emergencyUserTool",
      emergencyText: "The emergency contact and hotline features are user tools to help connect with external resources.",
      notEmergencyService: "Take 5 is not an emergency service. In a crisis, call your local emergency number immediately.",
      callEmergencyServices: "If you're experiencing thoughts of self-harm, call emergency services or a crisis hotline.",
      limitationLiability: "Limitation of Liability:",
      noLiability: "legalContent.noLiability",
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
    emailAddress: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    firstName: "Prénom",
    lastName: "Nom de famille",
    createProfile: "Créer un profil",
    updateProfile: "Mettre à jour le profil",
    signUp: "S'inscrire",
    welcomeBack: "Bon retour",
    signOut: "Se déconnecter",
    myAccount: "Mon compte",
    accountSettings: "Paramètres du compte",
    deleteAccount: "Supprimer le compte",
    
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
    trustedContactsTitle: "Vos contacts de confiance",
    confidenceContacts: "Vos Contacts de Confiance",
    addTrustedContact: "Ajouter un contact de confiance",
    addNewContact: "Ajouter un nouveau contact",
    editContact: "Modifier le contact",
    deleteContact: "Supprimer le contact",
    contactName: "Nom du contact",
    contactPhone: "Téléphone du contact",
    contactRelationship: "Relation du contact",
    saveContact: "Enregistrer le contact",
    noContactsYet: "Aucun contact pour le moment",
    contactAdded: "Contact ajouté avec succès",
    contactUpdated: "Contact mis à jour avec succès",
    contactDeleted: "Contact supprimé avec succès",
    
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
    youAreEnough: "Vous êtes suffisant, tel que vous êtes",
    youAreStrong: "Vous avez la force de traverser ceci",
    helpIsAvailable: "L'aide est toujours disponible",
    momentIsTemporary: "Ce moment est temporaire. Vous pouvez le faire!",
    youCanDoThis: "Vous pouvez le faire",
    
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
      "Vous méritez l'amour et le soutien",
      "Les petits pas en avant sont encore du progrès",
      "Vous avez la force de traverser ceci",
      "Votre histoire n'est pas encore terminée",
      "Il y a des gens qui se soucient de vous",
      "Vous êtes suffisant, tel que vous êtes",
      "La guérison prend du temps, et c'est normal",
      "Vous méritez la paix et le bonheur",
      "Votre courage de tendre la main montre votre force",
      "Chaque jour que vous survivez est une victoire",
      "Vous avez traversé 100% de vos pires jours"
    ],
    
    // Music & Audio
    calmingMusic: "Musique apaisante",
    peacefulMusic: "Musique paisible",
    relaxingAudio: "Audio relaxant",
    
    // Grounding & Techniques
    groundingExercise: "Exercice d'ancrage",
    breathingTechnique: "Technique de respiration",
    mindfulnessExercise: "Exercice de pleine conscience",
    relaxationTechnique: "Technique de relaxation",
    
    // Legal
    legalPoliciesDisclamers: "Politiques légales et avertissements",
    privacyPolicy: "Politique de confidentialité",
    termsConditions: "Termes et conditions",
    disclaimer: "Avertissement",
    effectiveDate: "Date d'entrée en vigueur",
    
    // Legal Content
    legalContent: {
      effectiveDate: "Date d'entrée en vigueur: 6 juin 2025",
      privacyIntro: "Take 5 (\"nous\", \"notre\") valorise votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous utilisez l'application Take 5 (l'\"Application\").",
      informationWeCollect: "Informations que nous collectons:",
      personalDetails: "Détails personnels que vous fournissez (ex: nom, adresse e-mail, informations de contact d'urgence)",
      journalingEntries: "Entrées de journal (stockées localement ou chiffrées de manière sécurisée si sur nos serveurs)",
      usageData: "Données d'utilisation (pages visitées, boutons cliqués, interactions avec l'application)",
      deviceData: "Données de l'appareil (type d'appareil, système d'exploitation, type de navigateur)",
      howWeUseData: "Comment nous utilisons vos données:",
      operateApp: "Pour faire fonctionner et maintenir l'Application",
      personalizedFeatures: "Pour vous permettre d'utiliser des fonctionnalités personnalisées (ex: journal, contacts d'urgence)",
      improveExperience: "Pour améliorer l'expérience utilisateur et développer de nouvelles fonctionnalités",
      sendUpdates: "Pour envoyer des mises à jour ou alertes occasionnelles si vous y consentez",
      sharingData: "Partage des données:",
      noSellData: "Nous ne vendons pas vos données",
      noSharePrivate: "Nous ne partageons pas vos données privées avec des tiers sauf si requis légalement",
      thirdPartyServices: "Nous pouvons utiliser des services tiers (ex: API YouTube, Google Analytics), et leurs pratiques de collecte de données sont régies par leurs propres politiques",
      dataSecurity: "Sécurité des données:",
      encryption: "Nous mettons en œuvre un chiffrement de niveau industriel et des contrôles d'accès",
      deleteRequest: "Les utilisateurs peuvent demander la suppression des données en envoyant un e-mail à tradermigs@gmail.com",
      yourRights: "Vos droits (RGPD, CCPA, etc.):",
      accessCorrectDelete: "Droit d'accéder, corriger ou supprimer vos données",
      withdrawConsent: "Droit de retirer le consentement ou de se désinscrire des communications",
      lodgeComplaint: "Droit de déposer une plainte auprès d'une autorité de protection des données",
      termsIntro: "En utilisant l'application Take 5, vous acceptez les conditions suivantes. Si vous n'êtes pas d'accord, n'utilisez pas l'Application.",
      eligibility: "Éligibilité:",
      ageRequirement: "legalContent.ageRequirement",
      ageRepresentation: "legalContent.ageRepresentation",
      mustBe18: "Vous devez avoir 18 ans ou plus pour utiliser l'Application.",
      represent18: "En utilisant l'Application, vous déclarez avoir au moins 18 ans.",
      noMedicalAdvice: "Aucun conseil médical:",
      informationalOnly: "L'Application est à des fins d'information et de motivation uniquement.",
      noMedicalDiagnosis: "legalContent.noMedicalDiagnosis",
      notReplacement: "legalContent.notReplacement",
      noMedicalAdviceText: "Take 5 ne fournit pas de conseil médical, diagnostic ou traitement.",
      notReplaceProfessional: "Le contenu dans l'Application (citations, affirmations, chat IA, vidéos liées) n'est pas destiné à remplacer les soins de santé mentale ou médicaux professionnels.",
      consultProvider: "Consultez toujours un professionnel de la santé qualifié pour les problèmes de santé mentale.",
      aiContentUsage: "Utilisation de l'IA et du contenu:",
      aiNotTherapist: "Le chatbot IA est un assistant conversationnel de base. Ce n'est pas un thérapeute, conseiller agréé ou travailleur de crise.",
      thirdPartyContent: "legalContent.thirdPartyContent",
      youtubeContent: "Nous pouvons créer des liens vers du contenu tiers (ex: vidéos YouTube). Nous ne contrôlons pas ce contenu et ne sommes pas responsables de sa précision ou disponibilité.",
      emergencyDisclaimer: "Avertissement sur les fonctionnalités d'urgence:",
      emergencyUserTool: "legalContent.emergencyUserTool",
      emergencyText: "Les fonctionnalités de contact d'urgence et de ligne d'écoute sont des outils utilisateur pour aider à se connecter avec des ressources externes.",
      notEmergencyService: "Take 5 n'est pas un service d'urgence. En cas de crise, appelez immédiatement votre numéro d'urgence local.",
      callEmergencyServices: "Si vous avez des pensées d'auto-agression, appelez les services d'urgence ou une ligne d'écoute de crise.",
      limitationLiability: "Limitation de responsabilité:",
      noLiability: "legalContent.noLiability",
      useAtRisk: "Vous utilisez l'Application à vos propres risques.",
      noWarranties: "Nous ne fournissons aucune garantie sur l'efficacité de l'Application pour les résultats de santé mentale.",
      disclaimerIntro: "Take 5 est une application de bien-être et de motivation conçue pour fournir des ressources de soutien émotionnel et des outils d'adaptation. Avertissements importants:",
      notMedicalDevice: "Ce n'est pas un dispositif médical ou un traitement professionnel de santé mentale.",
      supplementNot: "Il complète mais ne remplace pas les soins professionnels.",
      ifCrisis: "Si vous êtes en crise, veuillez contacter les services d'urgence ou un professionnel de la santé mentale immédiatement.",
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
    emailAddress: "ที่อยู่อีเมล",
    password: "รหัสผ่าน",
    confirmPassword: "ยืนยันรหัสผ่าน",
    firstName: "ชื่อจริง",
    lastName: "นามสกุล",
    createProfile: "สร้างโปรไฟล์",
    updateProfile: "อัปเดตโปรไฟล์",
    signUp: "สมัครสมาชิก",
    welcomeBack: "ยินดีต้อนรับกลับ",
    signOut: "ออกจากระบบ",
    myAccount: "บัญชีของฉัน",
    accountSettings: "การตั้งค่าบัญชี",
    deleteAccount: "ลบบัญชี",
    
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
    trustedContactsTitle: "ผู้ติดต่อที่เชื่อถือได้ของคุณ",
    confidenceContacts: "ผู้ติดต่อที่เชื่อถือได้ของคุณ",
    addTrustedContact: "เพิ่มผู้ติดต่อที่เชื่อถือได้",
    addNewContact: "เพิ่มผู้ติดต่อใหม่",
    editContact: "แก้ไขผู้ติดต่อ",
    deleteContact: "ลบผู้ติดต่อ",
    contactName: "ชื่อผู้ติดต่อ",
    contactPhone: "โทรศัพท์ผู้ติดต่อ",
    contactRelationship: "ความสัมพันธ์ผู้ติดต่อ",
    saveContact: "บันทึกผู้ติดต่อ",
    noContactsYet: "ยังไม่มีผู้ติดต่อ",
    contactAdded: "เพิ่มผู้ติดต่อสำเร็จ",
    contactUpdated: "อัปเดตผู้ติดต่อสำเร็จ",
    contactDeleted: "ลบผู้ติดต่อสำเร็จ",
    
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
    youAreEnough: "คุณเพียงพอแล้ว ในแบบที่คุณเป็น",
    youAreStrong: "คุณมีพลังที่จะผ่านเรื่องนี้ไปได้",
    helpIsAvailable: "ความช่วยเหลือมีอยู่เสมอ",
    momentIsTemporary: "ช่วงเวลานี้เป็นเพียงชั่วคราว คุณทำได้!",
    youCanDoThis: "คุณทำได้",
    
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
      "คุณสมควรได้รับความรักและการสนับสนุน",
      "ก้าวเล็กๆ ไปข้างหน้ายังคงเป็นความก้าวหน้า",
      "คุณมีพลังที่จะผ่านเรื่องนี้ไปได้",
      "เรื่องราวของคุณยังไม่จบ",
      "มีคนที่ใส่ใจคุณ",
      "คุณเพียงพอแล้ว ในแบบที่คุณเป็น",
      "การรักษาใช้เวลา และนั่นก็โอเค",
      "คุณสมควรได้รับความสงบและความสุข",
      "ความกล้าหาญที่จะขอความช่วยเหลือแสดงให้เห็นความแข็งแกร่ง",
      "ทุกวันที่คุณรอดผ่านมาคือชัยชนะ",
      "คุณผ่านวันที่แย่ที่สุดมา 100% แล้ว"
    ],
    
    // Music & Audio
    calmingMusic: "เพลงผ่อนคลาย",
    peacefulMusic: "เพลงสงบ",
    relaxingAudio: "เสียงผ่อนคลาย",
    
    // Grounding & Techniques
    groundingExercise: "การออกกำลังกายการหยั่งราก",
    breathingTechnique: "เทคนิคการหายใจ",
    mindfulnessExercise: "การออกกำลังกายการมีสติ",
    relaxationTechnique: "เทคนิคการผ่อนคลาย",
    
    // Legal
    legalPoliciesDisclamers: "นโยบายทางกฎหมายและข้อจำกัดความรับผิดชอบ",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsConditions: "ข้อกำหนดและเงื่อนไข",
    disclaimer: "ข้อจำกัดความรับผิดชอบ",
    effectiveDate: "วันที่มีผลบังคับใช้",
    
    // Legal Content
    legalContent: {
      effectiveDate: "วันที่มีผลบังคับใช้: 6 มิถุนายน 2025",
      privacyIntro: "Take 5 (\"เรา\" \"ของเรา\") ให้ความสำคัญกับความเป็นส่วนตัวของคุณ นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่เราเก็บรวบรวม ใช้ เปิดเผย และปกป้องข้อมูลส่วนบุคคลของคุณเมื่อคุณใช้แอป Take 5 (\"แอป\")",
      informationWeCollect: "ข้อมูลที่เราเก็บรวบรวม:",
      personalDetails: "รายละเอียดส่วนบุคคลที่คุณให้ (เช่น ชื่อ ที่อยู่อีเมล ข้อมูลการติดต่อฉุกเฉิน)",
      journalingEntries: "รายการไดอารี่ (เก็บไว้ในเครื่องหรือเข้ารหัสอย่างปลอดภัยหากอยู่บนเซิร์ฟเวอร์ของเรา)",
      usageData: "ข้อมูลการใช้งาน (หน้าที่เยี่ยมชม ปุ่มที่คลิก การโต้ตอบกับแอป)",
      deviceData: "ข้อมูลอุปกรณ์ (ประเภทอุปกรณ์ ระบบปฏิบัติการ ประเภทเบราว์เซอร์)",
      howWeUseData: "วิธีที่เราใช้ข้อมูลของคุณ:",
      operateApp: "เพื่อดำเนินการและบำรุงรักษาแอป",
      personalizedFeatures: "เพื่อให้คุณใช้คุณสมบัติส่วนบุคคล (เช่น ไดอารี่ ผู้ติดต่อฉุกเฉิน)",
      improveExperience: "เพื่อปรับปรุงประสบการณ์ผู้ใช้และพัฒนาคุณสมบัติใหม่",
      sendUpdates: "เพื่อส่งการอัปเดตหรือการแจ้งเตือนเป็นครั้งคราวหากคุณเลือกรับ",
      sharingData: "การแบ่งปันข้อมูล:",
      noSellData: "เราไม่ขายข้อมูลของคุณ",
      noSharePrivate: "เราไม่แบ่งปันข้อมูลส่วนตัวของคุณกับบุคคลที่สามเว้นแต่จะต้องตามกฎหมาย",
      thirdPartyServices: "เราอาจใช้บริการบุคคลที่สาม (เช่น YouTube API, Google Analytics) และแนวทางการเก็บรวบรวมข้อมูลของพวกเขาถูกควบคุมโดยนโยบายของตัวเอง",
      dataSecurity: "ความปลอดภัยของข้อมูล:",
      encryption: "เราใช้การเข้ารหัสและการควบคุมการเข้าถึงระดับอุตสาหกรรม",
      deleteRequest: "ผู้ใช้อาจขอให้ลบข้อมูลโดยส่งอีเมลไปที่ tradermigs@gmail.com",
      yourRights: "สิทธิ์ของคุณ (GDPR, CCPA, ฯลฯ):",
      accessCorrectDelete: "สิทธิ์ในการเข้าถึง แก้ไข หรือลบข้อมูลของคุณ",
      withdrawConsent: "สิทธิ์ในการถอนความยินยอมหรือเลือกไม่รับการสื่อสาร",
      lodgeComplaint: "สิทธิ์ในการยื่นข้อร้องเรียนต่อหน่วยงานคุ้มครองข้อมูล",
      termsIntro: "การใช้แอป Take 5 หมายความว่าคุณยอมรับเงื่อนไขต่อไปนี้ หากคุณไม่เห็นด้วย อย่าใช้แอป",
      eligibility: "คุณสมบัติ:",
      ageRequirement: "legalContent.ageRequirement",
      ageRepresentation: "legalContent.ageRepresentation",
      mustBe18: "คุณต้องมีอายุ 18 ปีขึ้นไปจึงจะใช้แอปได้",
      represent18: "การใช้แอปหมายความว่าคุณรับรองว่าอายุอย่างน้อย 18 ปี",
      noMedicalAdvice: "ไม่มีคำแนะนำทางการแพทย์:",
      informationalOnly: "แอปมีไว้เพื่อการให้ข้อมูลและสร้างแรงบันดาลใจเท่านั้น",
      noMedicalDiagnosis: "legalContent.noMedicalDiagnosis",
      notReplacement: "legalContent.notReplacement",
      noMedicalAdviceText: "Take 5 ไม่ให้คำแนะนำทางการแพทย์ การวินิจฉัย หรือการรักษา",
      notReplaceProfessional: "เนื้อหาในแอป (คำพูด การยืนยัน แชท AI วิดีโอที่เชื่อมโยง) ไม่ได้มีจุดประสงค์เพื่อทดแทนการดูแลสุขภาพจิตหรือการแพทย์แบบมืออาชีพ",
      consultProvider: "ปรึกษาผู้ให้บริการด้านสุขภาพที่มีคุณสมบัติเหมาะสมเสมอสำหรับปัญหาสุขภาพจิต",
      aiContentUsage: "การใช้ AI และเนื้อหา:",
      aiNotTherapist: "แชทบอท AI เป็นผู้ช่วยสนทนาพื้นฐาน ไม่ใช่นักบำบัด ที่ปรึกษาที่ได้รับใบอนุญาต หรือนักงานวิกฤต",
      thirdPartyContent: "legalContent.thirdPartyContent",
      youtubeContent: "เราอาจเชื่อมโยงไปยังเนื้อหาบุคคลที่สาม (เช่น วิดีโอ YouTube) เราไม่ควบคุมเนื้อหาดังกล่าวและไม่รับผิดชอบต่อความถูกต้องหรือความพร้อมใช้งาน",
      emergencyDisclaimer: "ข้อจำกัดความรับผิดชอบคุณสมบัติฉุกเฉิน:",
      emergencyUserTool: "legalContent.emergencyUserTool",
      emergencyText: "คุณสมบัติการติดต่อฉุกเฉินและสายด่วนเป็นเครื่องมือผู้ใช้เพื่อช่วยเชื่อมต่อกับทรัพยากรภายนอก",
      notEmergencyService: "Take 5 ไม่ใช่บริการฉุกเฉิน ในสถานการณ์วิกฤต โทรหาหมายเลขฉุกเฉินในพื้นที่ของคุณทันที",
      callEmergencyServices: "หากคุณมีความคิดทำร้ายตัวเอง โทรหาบริการฉุกเฉินหรือสายด่วนวิกฤต",
      limitationLiability: "การจำกัดความรับผิดชอบ:",
      noLiability: "legalContent.noLiability",
      useAtRisk: "คุณใช้แอปโดยความเสี่ยงของตัวเอง",
      noWarranties: "เราไม่ให้การรับประกันหรือการค้ำประกันใดๆ เกี่ยวกับประสิทธิผลของแอปสำหรับผลลัพธ์ด้านสุขภาพจิต",
      disclaimerIntro: "Take 5 เป็นแอปสุขภาพและสร้างแรงบันดาลใจที่ออกแบบมาเพื่อให้ทรัพยากรสนับสนุนทางอารมณ์และเครื่องมือการรับมือ ข้อจำกัดความรับผิดชอบที่สำคัญ:",
      notMedicalDevice: "นี่ไม่ใช่อุปกรณ์ทางการแพทย์หรือการรักษาสุขภาพจิตแบบมืออาชีพ",
      supplementNot: "เป็นส่วนเสริมแต่ไม่ทดแทนการดูแลแบบมืออาชีพ",
      ifCrisis: "หากคุณอยู่ในสถานการณ์วิกฤต โปรดติดต่อบริการฉุกเฉินหรือผู้เชี่ยวชาญด้านสุขภาพจิตทันที",
    }
  },

  // Add more languages as needed...
  es: {
    appName: "Take 5",
    tagline: "Respira profundo. Recupera el control.",
    searchPlaceholder: "Escribe cómo te sientes: 'Estoy solo', 'sin hogar', 'quiero morir'...",
    emergencySupport: "Apoyo de Emergencia",
    callEmergency: "Llama al {number} (Emergencia)",
    crisisHotline: "Línea de Crisis",
    crisisHotlineCall: "Llama Ahora",
    emergencyWarning: "Si estás en peligro inmediato, llama a los servicios de emergencia",
    
    // Authentication & User Account
    login: "iniciar sesión",
    createAccount: "crear cuenta",
    loginToCreateContactsList: "inicia sesión para crear lista de contactos",
    signInWithGoogle: "Iniciar sesión con Google",
    emailAddress: "Dirección de Correo",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    createProfile: "Crear Perfil",
    updateProfile: "Actualizar Perfil",
    signUp: "Registrarse",
    welcomeBack: "Bienvenido de Vuelta",
    signOut: "Cerrar Sesión",
    myAccount: "Mi Cuenta",
    accountSettings: "Configuración de Cuenta",
    deleteAccount: "Eliminar Cuenta",
    
    additionalSupport: "Apoyo Adicional",
    howCanWeSupport: "¿Cómo te sientes, amigo?",
    feelOverwhelmed: "Me Siento Abrumado",
    breathingDescription: "Ejercicios de respiración y técnicas de conexión a tierra",
    feelAnxious: "Me Siento Ansioso",
    anxiousDescription: "Manejo de ansiedad y estrategias de afrontamiento",
    feelDepressed: "Me Siento Deprimido",
    depressedDescription: "Apoyo para depresión y recursos de humor",
    needToTalk: "Necesito Hablar",
    talkDescription: "Consejería profesional y apoyo de pares",
    
    // Support modules
    breathing: "Respiración",
    breathingGuide: "Guía de 5 min",
    affirmations: "Afirmaciones",
    kindWords: "Palabras amables",
    calmMusic: "Música Tranquila",
    soothingSounds: "Sonidos relajantes",
    grounding: "Conexión a tierra",
    groundingTechnique: "5-4-3-2-1",
    
    // Contact Management
    trustedContacts: "Tus Contactos de Confianza",
    trustedContactsTitle: "Tus Contactos de Confianza",
    confidenceContacts: "Tus Contactos de Confianza",
    addTrustedContact: "Agregar un contacto de confianza",
    addNewContact: "Agregar Nuevo Contacto",
    editContact: "Editar Contacto",
    deleteContact: "Eliminar Contacto",
    contactName: "Nombre del Contacto",
    contactPhone: "Teléfono del Contacto",
    contactRelationship: "Relación del Contacto",
    saveContact: "Guardar Contacto",
    noContactsYet: "Aún no hay contactos",
    contactAdded: "Contacto agregado exitosamente",
    contactUpdated: "Contacto actualizado exitosamente",
    contactDeleted: "Contacto eliminado exitosamente",
    
    // Contact form
    name: "Nombre",
    phoneNumber: "Número de Teléfono",
    relationship: "Relación",
    enterName: "Ingresa nombre",
    enterPhone: "Ingresa número de teléfono",
    enterRelationship: "ej. Terapeuta, Amigo, Familia",
    addContact: "Agregar Contacto",
    
    footerMessage1: "No estás solo.",
    footerMessage2: "Importas. Tu vida tiene valor.",
    footerMessage3: "La ayuda siempre está disponible.",
    footerMessage4: "Este momento es temporal. ¡Puedes hacerlo!",
    visitWebsite: "Visitar Sitio Web",
    callNow: "Llama Ahora",
    cancel: "Cancelar",
    close: "Cerrar",
    
    breathingExercise: "Ejercicio de Respiración",
    inhale: "Inhala",
    hold: "Mantén",
    exhale: "Exhala",
    
    // Profile
    yourProfile: "Tu Perfil",
    profile: "Perfil",
    privateDiary: "Diario Privado",
    yourPrivateDiary: "Tu Diario Privado",
    newEntry: "Nueva Entrada",
    addQuotePlaceholder: "Agregar una cita (máx 40 caracteres)",
    logout: "Cerrar Sesión",
    backgroundImage: "Imagen de Fondo",
    noBackgroundImageSet: "No se ha establecido imagen de fondo",
    uploadImage: "Subir Imagen",
    setYourPersonalBackground: "Establece Tu Fondo Personal",
    chooseYourImage: "Elige Tu Imagen",
    uploadAnyPhoto: "Sube cualquier foto desde tu dispositivo",
    cropPosition: "Recortar y Posicionar",
    useEditorToCrop: "Usa nuestro editor para recortar y centrar tu imagen perfectamente",
    screenImage: "Imagen de Pantalla",
    diary: "Diario",
    remove: "Eliminar",
    
    // Diary
    entryTitle: "Título de entrada...",
    writeThoughts: "Escribe tus pensamientos...",
    saveEntry: "Guardar Entrada",
    startWriting: "Comienza a escribir para registrar tus pensamientos y sentimientos.",
    entriesSaved: "Tus entradas se guardan permanentemente y solo son visibles para ti.",
    entryTitlePlaceholder: "Título de entrada...",
    writeThoughtsPlaceholder: "Escribe tus pensamientos...",
    entrySaved: "Tu entrada de diario ha sido guardada permanentemente.",
    entryUpdated: "Tu entrada de diario ha sido guardada exitosamente.",
    entryDeleted: "Tu entrada de diario ha sido eliminada permanentemente.",
    
    // AI Chat
    aiWelcomeMessage: "Hola, estoy aquí para escucharte y apoyarte. No estás solo. ¿Qué tienes en mente hoy?",
    aiSupportChat: "Chat de Apoyo IA",
    aiImHere: "Estoy aquí. Háblame.",
    talkToMe: "Háblame",
    chatWithAi: "Chatea con nuestro asistente IA compasivo",
    compassionateAssistant: "asistente IA compasivo",
    immediateSupport: "para apoyo inmediato",
    copingStrategies: "estrategias de afrontamiento",
    someoneToListen: "y alguien que escuche",
    startConversation: "Iniciar Conversación",
    typeYourMessage: "Escribe tu mensaje...",
    crisisWarning: "Si estás en crisis, por favor llama al 988 o servicios de emergencia inmediatamente",
    unmuteAi: "Activar IA",
    changeNamePrompt: "Cambiar Nombre",
    enterYourName: "Ingresa tu nombre",
    whatsYourName: "¿Cuál es tu nombre?",
    
    // Affirmations/Quotes
    youDeservePeace: "Mereces paz y felicidad",
    youAreStronger: "Eres más fuerte de lo que sabes",
    youMatter: "Importas. Tu vida tiene valor.",
    thisToWillPass: "Esto también pasará",
    youAreNotAlone: "No estás solo en esto",
    youAreLoved: "Eres amado y valorado",
    youAreEnough: "Eres suficiente, tal como eres",
    youAreStrong: "Tienes la fuerza para superar esto",
    helpIsAvailable: "La ayuda siempre está disponible",
    momentIsTemporary: "Este momento es temporal. ¡Puedes hacerlo!",
    youCanDoThis: "Puedes hacerlo",
    
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
      "Tu valentía para pedir ayuda muestra fortaleza",
      "Cada día que sobrevives es una victoria",
      "Has superado el 100% de tus peores días"
    ],
    
    // Music & Audio
    calmingMusic: "Música Relajante",
    peacefulMusic: "Música Pacífica",
    relaxingAudio: "Audio Relajante",
    
    // Grounding & Techniques
    groundingExercise: "Ejercicio de Conexión a Tierra",
    breathingTechnique: "Técnica de Respiración",
    mindfulnessExercise: "Ejercicio de Mindfulness",
    relaxationTechnique: "Técnica de Relajación",
    
    // Legal
    legalPoliciesDisclamers: "Políticas Legales y Exenciones de Responsabilidad",
    privacyPolicy: "Política de Privacidad",
    termsConditions: "Términos y Condiciones",
    disclaimer: "Exención de Responsabilidad",
    effectiveDate: "Fecha de Vigencia",
    
    // Legal Content - simplified for space
    legalContent: {
      effectiveDate: "Fecha de Vigencia: 6 de junio, 2025",
      privacyIntro: "Take 5 (\"nosotros\", \"nuestro\") valora tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información personal cuando usas la aplicación Take 5 (la \"Aplicación\").",
      informationWeCollect: "Información que Recopilamos:",
      personalDetails: "Detalles personales que proporcionas (ej. nombre, dirección de correo, información de contacto de emergencia)",
      journalingEntries: "Entradas de diario (almacenadas localmente o cifradas de forma segura si están en nuestros servidores)",
      usageData: "Datos de uso (páginas visitadas, botones presionados, interacciones con la aplicación)",
      deviceData: "Datos del dispositivo (tipo de dispositivo, sistema operativo, tipo de navegador)",
      howWeUseData: "Cómo Usamos Tus Datos:",
      operateApp: "Para operar y mantener la Aplicación",
      personalizedFeatures: "Para permitirte usar características personalizadas (ej. diario, contactos de emergencia)",
      improveExperience: "Para mejorar la experiencia del usuario y desarrollar nuevas características",
      sendUpdates: "Para enviar actualizaciones ocasionales o alertas si optas por recibirlas",
      sharingData: "Compartir Datos:",
      noSellData: "No vendemos tus datos",
      noSharePrivate: "No compartimos tus datos privados con terceros a menos que sea legalmente requerido",
      thirdPartyServices: "Podemos usar servicios de terceros (ej. API de YouTube, Google Analytics), y sus prácticas de recopilación de datos se rigen por sus propias políticas",
      dataSecurity: "Seguridad de Datos:",
      encryption: "Implementamos cifrado de nivel industrial y controles de acceso",
      deleteRequest: "Los usuarios pueden solicitar eliminación de datos enviando un correo a tradermigs@gmail.com",
      yourRights: "Tus Derechos (GDPR, CCPA, etc.):",
      accessCorrectDelete: "Derecho a acceder, corregir o eliminar tus datos",
      withdrawConsent: "Derecho a retirar el consentimiento u optar por no recibir comunicaciones",
      lodgeComplaint: "Derecho a presentar una queja ante una autoridad de protección de datos",
      termsIntro: "Al usar la aplicación Take 5, aceptas los siguientes términos. Si no estás de acuerdo, no uses la Aplicación.",
      eligibility: "Elegibilidad:",
      ageRequirement: "legalContent.ageRequirement",
      ageRepresentation: "legalContent.ageRepresentation", 
      mustBe18: "Debes tener 18 años o más para usar la Aplicación.",
      represent18: "Al usar la Aplicación, declaras que tienes al menos 18 años.",
      noMedicalAdvice: "Sin Consejo Médico:",
      informationalOnly: "La Aplicación es solo para fines informativos y motivacionales.",
      noMedicalDiagnosis: "legalContent.noMedicalDiagnosis",
      notReplacement: "legalContent.notReplacement",
      noMedicalAdviceText: "Take 5 no proporciona consejo médico, diagnóstico o tratamiento.",
      notReplaceProfessional: "El contenido dentro de la Aplicación (citas, afirmaciones, chat IA, videos enlazados) no está destinado a reemplazar la atención profesional de salud mental o médica.",
      consultProvider: "Siempre consulta a un proveedor de salud calificado para problemas de salud mental.",
      aiContentUsage: "Uso de IA y Contenido:",
      aiNotTherapist: "El chatbot de IA es un asistente conversacional básico. No es un terapeuta, consejero licenciado o trabajador de crisis.",
      thirdPartyContent: "legalContent.thirdPartyContent",
      youtubeContent: "Podemos enlazar a contenido de terceros (ej. videos de YouTube). No controlamos dicho contenido y no somos responsables de su precisión o disponibilidad.",
      emergencyDisclaimer: "Exención de Responsabilidad de Características de Emergencia:",
      emergencyUserTool: "legalContent.emergencyUserTool",
      emergencyText: "Las características de contacto de emergencia y línea de crisis son herramientas del usuario para ayudar a conectar con recursos externos.",
      notEmergencyService: "Take 5 no es un servicio de emergencia. En una crisis, llama a tu número de emergencia local inmediatamente.",
      callEmergencyServices: "Si estás experimentando pensamientos de autolesión, llama a servicios de emergencia o una línea de crisis.",
      limitationLiability: "Limitación de Responsabilidad:",
      noLiability: "legalContent.noLiability",
      useAtRisk: "Usas la Aplicación bajo tu propio riesgo.",
      noWarranties: "No proporcionamos garantías sobre la efectividad de la Aplicación para resultados de salud mental.",
      disclaimerIntro: "Take 5 es una aplicación de bienestar y motivación diseñada para proporcionar recursos de apoyo emocional y herramientas de afrontamiento. Exenciones importantes:",
      notMedicalDevice: "Esto no es un dispositivo médico o tratamiento profesional de salud mental.",
      supplementNot: "Complementa pero no reemplaza la atención profesional.",
      ifCrisis: "Si estás en crisis, por favor contacta servicios de emergencia o un profesional de salud mental inmediatamente.",
    }
  },

  // German shortened placeholder
  de: {
    appName: "Take 5",
    tagline: "Atme tief durch. Übernimm wieder die Kontrolle.",
    searchPlaceholder: "Gib ein, wie du dich fühlst: 'Ich bin allein', 'obdachlos', 'will sterben'...",
    emergencySupport: "Notfallunterstützung",
    callEmergency: "Rufe {number} an (Notfall)",
    crisisHotline: "Krisen-Hotline",
    crisisHotlineCall: "Jetzt anrufen",
    emergencyWarning: "Wenn du in unmittelbarer Gefahr bist, rufe den Notdienst an",
    
    login: "anmelden",
    createAccount: "Konto erstellen",
    loginToCreateContactsList: "anmelden um Kontaktliste zu erstellen",
    signInWithGoogle: "Mit Google anmelden",
    emailAddress: "E-Mail-Adresse",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    firstName: "Vorname",
    lastName: "Nachname",
    createProfile: "Profil erstellen",
    updateProfile: "Profil aktualisieren",
    signUp: "Registrieren",
    welcomeBack: "Willkommen zurück",
    signOut: "Abmelden",
    myAccount: "Mein Konto",
    accountSettings: "Kontoeinstellungen",
    deleteAccount: "Konto löschen",
    
    additionalSupport: "Zusätzliche Unterstützung",
    howCanWeSupport: "Wie fühlst du dich, Freund?",
    feelOverwhelmed: "Ich fühle mich überfordert",
    breathingDescription: "Atemübungen und Erdungstechniken",
    feelAnxious: "Ich fühle mich ängstlich",
    anxiousDescription: "Angstbewältigung und Bewältigungsstrategien",
    feelDepressed: "Ich fühle mich deprimiert",
    depressedDescription: "Depressionshilfe und Stimmungsressourcen",
    needToTalk: "Ich muss reden",
    talkDescription: "Professionelle Beratung und Peer-Support",
    
    breathing: "Atmung",
    breathingGuide: "5-Min-Anleitung",
    affirmations: "Bestätigungen",
    kindWords: "Freundliche Worte",
    calmMusic: "Ruhige Musik",
    soothingSounds: "Beruhigende Klänge",
    grounding: "Erdung",
    groundingTechnique: "5-4-3-2-1",
    
    trustedContacts: "Deine vertrauenswürdigen Kontakte",
    trustedContactsTitle: "Deine vertrauenswürdigen Kontakte",
    confidenceContacts: "Deine vertrauenswürdigen Kontakte",
    addTrustedContact: "Vertrauenswürdigen Kontakt hinzufügen",
    addNewContact: "Neuen Kontakt hinzufügen",
    editContact: "Kontakt bearbeiten",
    deleteContact: "Kontakt löschen",
    contactName: "Kontaktname",
    contactPhone: "Kontakttelefon",
    contactRelationship: "Kontaktbeziehung",
    saveContact: "Kontakt speichern",
    noContactsYet: "Noch keine Kontakte",
    contactAdded: "Kontakt erfolgreich hinzugefügt",
    contactUpdated: "Kontakt erfolgreich aktualisiert",
    contactDeleted: "Kontakt erfolgreich gelöscht",
    
    name: "Name",
    phoneNumber: "Telefonnummer",
    relationship: "Beziehung",
    enterName: "Namen eingeben",
    enterPhone: "Telefonnummer eingeben",
    enterRelationship: "z.B. Therapeut, Freund, Familie",
    addContact: "Kontakt hinzufügen",
    
    footerMessage1: "Du bist nicht allein.",
    footerMessage2: "Du zählst. Dein Leben hat Wert.",
    footerMessage3: "Hilfe ist immer verfügbar.",
    footerMessage4: "Dieser Moment ist vorübergehend. Du schaffst das!",
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
    yourPrivateDiary: "Dein privates Tagebuch",
    newEntry: "Neuer Eintrag",
    addQuotePlaceholder: "Zitat hinzufügen (max. 40 Zeichen)",
    logout: "Abmelden",
    backgroundImage: "Hintergrundbild",
    noBackgroundImageSet: "Kein Hintergrundbild festgelegt",
    uploadImage: "Bild hochladen",
    setYourPersonalBackground: "Persönlichen Hintergrund festlegen",
    chooseYourImage: "Bild auswählen",
    uploadAnyPhoto: "Beliebiges Foto von deinem Gerät hochladen",
    cropPosition: "Zuschneiden und Positionieren",
    useEditorToCrop: "Verwende unseren Editor, um dein Bild perfekt zuzuschneiden und zu zentrieren",
    screenImage: "Bildschirmbild",
    diary: "Tagebuch",
    remove: "Entfernen",
    
    entryTitle: "Eintragstitel...",
    writeThoughts: "Schreibe deine Gedanken...",
    saveEntry: "Eintrag speichern",
    startWriting: "Beginne zu schreiben, um deine Gedanken und Gefühle zu verfolgen.",
    entriesSaved: "Deine Einträge werden dauerhaft gespeichert und sind nur für dich sichtbar.",
    entryTitlePlaceholder: "Eintragstitel...",
    writeThoughtsPlaceholder: "Schreibe deine Gedanken...",
    entrySaved: "Dein Tagebucheintrag wurde dauerhaft gespeichert.",
    entryUpdated: "Dein Tagebucheintrag wurde erfolgreich gespeichert.",
    entryDeleted: "Dein Tagebucheintrag wurde dauerhaft entfernt.",
    
    aiWelcomeMessage: "Hallo, ich bin hier, um dir zuzuhören und dich zu unterstützen. Du bist nicht allein. Was beschäftigt dich heute?",
    aiSupportChat: "KI-Support-Chat",
    aiImHere: "Ich bin hier. Sprich mit mir.",
    talkToMe: "Sprich mit mir",
    chatWithAi: "Chatte mit unserem mitfühlenden KI-Assistenten",
    compassionateAssistant: "mitfühlender KI-Assistent",
    immediateSupport: "für sofortige Unterstützung",
    copingStrategies: "Bewältigungsstrategien",
    someoneToListen: "und jemand zum Zuhören",
    startConversation: "Gespräch beginnen",
    typeYourMessage: "Deine Nachricht eingeben...",
    crisisWarning: "Wenn du in einer Krise bist, rufe bitte 988 oder den Notdienst sofort an",
    unmuteAi: "KI aktivieren",
    changeNamePrompt: "Namen ändern",
    enterYourName: "Namen eingeben",
    whatsYourName: "Wie heißt du?",
    
    youDeservePeace: "Du verdienst Frieden und Glück",
    youAreStronger: "Du bist stärker als du denkst",
    youMatter: "Du zählst. Dein Leben hat Wert.",
    thisToWillPass: "Auch das wird vorübergehen",
    youAreNotAlone: "Du bist nicht allein damit",
    youAreLoved: "Du bist geliebt und geschätzt",
    youAreEnough: "Du bist genug, so wie du bist",
    youAreStrong: "Du hast die Kraft, das zu überstehen",
    helpIsAvailable: "Hilfe ist immer verfügbar",
    momentIsTemporary: "Dieser Moment ist vorübergehend. Du schaffst das!",
    youCanDoThis: "Du schaffst das",
    
    rotatingAffirmations: [
      "Du bist stärker als du denkst",
      "Dieser Moment ist vorübergehend. Du schaffst das!",
      "Du zählst. Dein Leben hat Wert",
      "Hilfe ist immer verfügbar",
      "Du bist nicht allein auf dieser Reise",
      "Jeder Atemzug ist ein Sieg",
      "Du hast schon früher Herausforderungen gemeistert",
      "Deine Gefühle sind berechtigt und vorübergehend",
      "Morgen kann anders sein",
      "Du verdienst Liebe und Unterstützung",
      "Kleine Schritte vorwärts sind immer noch Fortschritt",
      "Du hast die Kraft, das zu überstehen",
      "Deine Geschichte ist noch nicht zu Ende",
      "Es gibt Menschen, die sich um dich sorgen",
      "Du bist genug, so wie du bist",
      "Heilung braucht Zeit, und das ist okay",
      "Du verdienst Frieden und Glück",
      "Dein Mut, um Hilfe zu bitten, zeigt Stärke",
      "Jeder Tag, den du überlebst, ist ein Gewinn",
      "Du hast 100% deiner schlimmsten Tage überstanden"
    ],
    
    calmingMusic: "Beruhigende Musik",
    peacefulMusic: "Friedliche Musik",
    relaxingAudio: "Entspannendes Audio",
    
    groundingExercise: "Erdungsübung",
    breathingTechnique: "Atemtechnik",
    mindfulnessExercise: "Achtsamkeitsübung",
    relaxationTechnique: "Entspannungstechnik",
    
    legalPoliciesDisclamers: "Rechtliche Richtlinien und Haftungsausschlüsse",
    privacyPolicy: "Datenschutzrichtlinie",
    termsConditions: "Geschäftsbedingungen",
    disclaimer: "Haftungsausschluss",
    effectiveDate: "Gültigkeitsdatum",
    
    legalContent: {
      effectiveDate: "Gültigkeitsdatum: 6. Juni 2025",
      privacyIntro: "Take 5 (\"wir\", \"unser\") schätzt deine Privatsphäre. Diese Datenschutzrichtlinie erklärt, wie wir deine persönlichen Informationen sammeln, verwenden, offenlegen und schützen, wenn du die Take 5 App (die \"App\") verwendest.",
      informationWeCollect: "Informationen, die wir sammeln:",
      personalDetails: "Persönliche Details, die du angibst (z.B. Name, E-Mail-Adresse, Notfallkontaktinformationen)",
      journalingEntries: "Tagebucheinträge (lokal gespeichert oder sicher verschlüsselt auf unseren Servern)",
      usageData: "Nutzungsdaten (besuchte Seiten, angeklickte Buttons, Interaktionen mit der App)",
      deviceData: "Gerätedaten (Gerätetyp, Betriebssystem, Browser-Typ)",
      howWeUseData: "Wie wir deine Daten verwenden:",
      operateApp: "Um die App zu betreiben und zu warten",
      personalizedFeatures: "Um dir die Nutzung personalisierter Funktionen zu ermöglichen (z.B. Tagebuch, Notfallkontakte)",
      improveExperience: "Um die Benutzererfahrung zu verbessern und neue Funktionen zu entwickeln",
      sendUpdates: "Um gelegentliche Updates oder Benachrichtigungen zu senden, wenn du dich dafür entscheidest",
      sharingData: "Datenweitergabe:",
      noSellData: "Wir verkaufen deine Daten nicht",
      noSharePrivate: "Wir teilen deine privaten Daten nicht mit Dritten, es sei denn, es ist gesetzlich vorgeschrieben",
      thirdPartyServices: "Wir können Drittanbieter-Services nutzen (z.B. YouTube API, Google Analytics), und deren Datensammelpraktiken unterliegen ihren eigenen Richtlinien",
      dataSecurity: "Datensicherheit:",
      encryption: "Wir implementieren branchenübliche Verschlüsselung und Zugriffskontrollen",
      deleteRequest: "Nutzer können eine Datenlöschung beantragen, indem sie eine E-Mail an tradermigs@gmail.com senden",
      yourRights: "Deine Rechte (DSGVO, CCPA, etc.):",
      accessCorrectDelete: "Recht auf Zugang, Korrektur oder Löschung deiner Daten",
      withdrawConsent: "Recht auf Widerruf der Einwilligung oder Abmeldung von Kommunikationen",
      lodgeComplaint: "Recht auf Beschwerde bei einer Datenschutzbehörde",
      termsIntro: "Durch die Nutzung der Take 5 App stimmst du den folgenden Bedingungen zu. Wenn du nicht einverstanden bist, verwende die App nicht.",
      eligibility: "Berechtigung:",
      ageRequirement: "legalContent.ageRequirement",
      ageRepresentation: "legalContent.ageRepresentation",
      mustBe18: "Du musst 18 Jahre oder älter sein, um die App zu verwenden.",
      represent18: "Durch die Nutzung der App erklärst du, dass du mindestens 18 Jahre alt bist.",
      noMedicalAdvice: "Keine medizinische Beratung:",
      informationalOnly: "Die App dient nur zu Informations- und Motivationszwecken.",
      noMedicalDiagnosis: "legalContent.noMedicalDiagnosis",
      notReplacement: "legalContent.notReplacement",
      noMedicalAdviceText: "Take 5 bietet keine medizinische Beratung, Diagnose oder Behandlung.",
      notReplaceProfessional: "Inhalte in der App (Zitate, Bestätigungen, KI-Chat, verlinkte Videos) sind nicht dazu gedacht, professionelle psychische Gesundheits- oder medizinische Versorgung zu ersetzen.",
      consultProvider: "Konsultiere immer einen qualifizierten Gesundheitsdienstleister bei psychischen Gesundheitsproblemen.",
      aiContentUsage: "KI- und Inhaltsnutzung:",
      aiNotTherapist: "Der KI-Chatbot ist ein grundlegender Gesprächsassistent. Er ist kein Therapeut, lizenzierter Berater oder Krisenhelfer.",
      thirdPartyContent: "legalContent.thirdPartyContent",
      youtubeContent: "Wir können auf Drittanbieter-Inhalte verlinken (z.B. YouTube-Videos). Wir kontrollieren solche Inhalte nicht und sind nicht für ihre Genauigkeit oder Verfügbarkeit verantwortlich.",
      emergencyDisclaimer: "Notfall-Feature-Haftungsausschluss:",
      emergencyUserTool: "legalContent.emergencyUserTool",
      emergencyText: "Die Notfallkontakt- und Hotline-Features sind Benutzertools, um bei der Verbindung mit externen Ressourcen zu helfen.",
      notEmergencyService: "Take 5 ist kein Notfalldienst. In einer Krise rufe sofort deine örtliche Notrufnummer an.",
      callEmergencyServices: "Wenn du Gedanken an Selbstverletzung hast, rufe Notdienste oder eine Krisen-Hotline an.",
      limitationLiability: "Haftungsbeschränkung:",
      noLiability: "legalContent.noLiability",
      useAtRisk: "Du verwendest die App auf eigenes Risiko.",
      noWarranties: "Wir geben keine Garantien über die Wirksamkeit der App für psychische Gesundheitsergebnisse.",
      disclaimerIntro: "Take 5 ist eine Wellness- und Motivations-App, die emotionale Unterstützungsressourcen und Bewältigungstools bereitstellen soll. Wichtige Haftungsausschlüsse:",
      notMedicalDevice: "Dies ist kein medizinisches Gerät oder professionelle psychische Gesundheitsbehandlung.",
      supplementNot: "Es ergänzt, ersetzt aber nicht die professionelle Versorgung.",
      ifCrisis: "Wenn du in einer Krise bist, kontaktiere bitte sofort Notdienste oder einen Fachmann für psychische Gesundheit.",
    }
  },

  // Italian shortened placeholder
  it: {
    appName: "Take 5",
    tagline: "Respira profondamente. Riprendi il controllo.",
    searchPlaceholder: "Scrivi come ti senti: 'Sono solo', 'senza casa', 'voglio morire'...",
    emergencySupport: "Supporto di Emergenza",
    callEmergency: "Chiama {number} (Emergenza)",
    crisisHotline: "Linea di Crisi",
    crisisHotlineCall: "Chiama Ora",
    emergencyWarning: "Se sei in pericolo immediato, chiama i servizi di emergenza",
    
    login: "accedi",
    createAccount: "crea account",
    loginToCreateContactsList: "accedi per creare lista contatti",
    signInWithGoogle: "Accedi con Google",
    emailAddress: "Indirizzo Email",
    password: "Password",
    confirmPassword: "Conferma Password",
    firstName: "Nome",
    lastName: "Cognome",
    createProfile: "Crea Profilo",
    updateProfile: "Aggiorna Profilo",
    signUp: "Registrati",
    welcomeBack: "Bentornato",
    signOut: "Esci",
    myAccount: "Il Mio Account",
    accountSettings: "Impostazioni Account",
    deleteAccount: "Elimina Account",
    
    additionalSupport: "Supporto Aggiuntivo",
    howCanWeSupport: "Come ti senti, amico?",
    feelOverwhelmed: "Mi sento sopraffatto",
    breathingDescription: "Esercizi di respirazione e tecniche di radicamento",
    feelAnxious: "Mi sento ansioso",
    anxiousDescription: "Gestione dell'ansia e strategie di coping",
    feelDepressed: "Mi sento depresso",
    depressedDescription: "Supporto per la depressione e risorse per l'umore",
    needToTalk: "Ho bisogno di parlare",
    talkDescription: "Consulenza professionale e supporto tra pari",
    
    breathing: "Respirazione",
    breathingGuide: "Guida 5 min",
    affirmations: "Affermazioni",
    kindWords: "Parole gentili",
    calmMusic: "Musica Calma",
    soothingSounds: "Suoni rilassanti",
    grounding: "Radicamento",
    groundingTechnique: "5-4-3-2-1",
    
    trustedContacts: "I tuoi contatti fidati",
    trustedContactsTitle: "I tuoi contatti fidati", 
    confidenceContacts: "I tuoi contatti fidati",
    addTrustedContact: "Aggiungi un contatto fidato",
    addNewContact: "Aggiungi nuovo contatto",
    editContact: "Modifica contatto",
    deleteContact: "Elimina contatto",
    contactName: "Nome contatto",
    contactPhone: "Telefono contatto",
    contactRelationship: "Relazione contatto",
    saveContact: "Salva contatto",
    noContactsYet: "Nessun contatto ancora",
    contactAdded: "Contatto aggiunto con successo",
    contactUpdated: "Contatto aggiornato con successo",
    contactDeleted: "Contatto eliminato con successo",
    
    name: "Nome",
    phoneNumber: "Numero di Telefono",
    relationship: "Relazione",
    enterName: "Inserisci nome",
    enterPhone: "Inserisci numero di telefono",
    enterRelationship: "es. Terapista, Amico, Famiglia",
    addContact: "Aggiungi Contatto",
    
    footerMessage1: "Non sei solo.",
    footerMessage2: "Conti. La tua vita ha valore.",
    footerMessage3: "L'aiuto è sempre disponibile.",
    footerMessage4: "Questo momento è temporaneo. Ce la puoi fare!",
    visitWebsite: "Visita Sito Web",
    callNow: "Chiama Ora",
    cancel: "Annulla",
    close: "Chiudi",
    
    breathingExercise: "Esercizio di Respirazione",
    inhale: "Inspira",
    hold: "Trattieni",
    exhale: "Espira",
    
    yourProfile: "Il tuo profilo",
    profile: "Profilo",
    privateDiary: "Diario privato",
    yourPrivateDiary: "Il tuo diario privato",
    newEntry: "Nuova voce",
    addQuotePlaceholder: "Aggiungi una citazione (max 40 caratteri)",
    logout: "Esci",
    backgroundImage: "Immagine di sfondo",
    noBackgroundImageSet: "Nessuna immagine di sfondo impostata",
    uploadImage: "Carica immagine",
    setYourPersonalBackground: "Imposta il tuo sfondo personale",
    chooseYourImage: "Scegli la tua immagine",
    uploadAnyPhoto: "Carica qualsiasi foto dal tuo dispositivo",
    cropPosition: "Ritaglia e posiziona",
    useEditorToCrop: "Usa il nostro editor per ritagliare e centrare perfettamente la tua immagine",
    screenImage: "Immagine schermo",
    diary: "Diario",
    remove: "Rimuovi",
    
    entryTitle: "Titolo voce...",
    writeThoughts: "Scrivi i tuoi pensieri...",
    saveEntry: "Salva voce",
    startWriting: "Inizia a scrivere per tracciare i tuoi pensieri e sentimenti.",
    entriesSaved: "Le tue voci sono salvate permanentemente e visibili solo a te.",
    entryTitlePlaceholder: "Titolo voce...",
    writeThoughtsPlaceholder: "Scrivi i tuoi pensieri...",
    entrySaved: "La tua voce di diario è stata salvata permanentemente.",
    entryUpdated: "La tua voce di diario è stata salvata con successo.",
    entryDeleted: "La tua voce di diario è stata rimossa permanentemente.",
    
    aiWelcomeMessage: "Ciao, sono qui per ascoltarti e supportarti. Non sei solo. Cosa hai in mente oggi?",
    aiSupportChat: "Chat di supporto IA",
    aiImHere: "Sono qui. Parlami.",
    talkToMe: "Parlami",
    chatWithAi: "Chatta con il nostro assistente IA compassionevole",
    compassionateAssistant: "assistente IA compassionevole",
    immediateSupport: "per supporto immediato",
    copingStrategies: "strategie di coping",
    someoneToListen: "e qualcuno che ascolti",
    startConversation: "Inizia conversazione",
    typeYourMessage: "Scrivi il tuo messaggio...",
    crisisWarning: "Se sei in crisi, chiama il 988 o i servizi di emergenza immediatamente",
    unmuteAi: "Riattiva IA",
    changeNamePrompt: "Cambia nome",
    enterYourName: "Inserisci il tuo nome",
    whatsYourName: "Come ti chiami?",
    
    youDeservePeace: "Meriti pace e felicità",
    youAreStronger: "Sei più forte di quanto pensi",
    youMatter: "Conti. La tua vita ha valore.",
    thisToWillPass: "Anche questo passerà",
    youAreNotAlone: "Non sei solo in questo",
    youAreLoved: "Sei amato e apprezzato",
    youAreEnough: "Sei abbastanza, così come sei",
    youAreStrong: "Hai la forza per superare questo",
    helpIsAvailable: "L'aiuto è sempre disponibile",
    momentIsTemporary: "Questo momento è temporaneo. Ce la puoi fare!",
    youCanDoThis: "Ce la puoi fare",
    
    rotatingAffirmations: [
      "Sei più forte di quanto pensi",
      "Questo momento è temporaneo. Ce la puoi fare!",
      "Conti. La tua vita ha valore",
      "L'aiuto è sempre disponibile",
      "Non sei solo in questo viaggio",
      "Ogni respiro che fai è una vittoria",
      "Hai superato sfide prima",
      "I tuoi sentimenti sono validi e temporanei",
      "Domani può essere diverso",
      "Meriti amore e supporto",
      "Piccoli passi avanti sono comunque progresso",
      "Hai la forza per superare questo",
      "La tua storia non è ancora finita",
      "Ci sono persone che si preoccupano per te",
      "Sei abbastanza, così come sei",
      "La guarigione richiede tempo, ed è ok",
      "Meriti pace e felicità",
      "Il tuo coraggio nel chiedere aiuto mostra forza",
      "Ogni giorno che sopravvivi è una vittoria",
      "Hai superato il 100% dei tuoi giorni peggiori"
    ],
    
    calmingMusic: "Musica rilassante",
    peacefulMusic: "Musica pacifica",
    relaxingAudio: "Audio rilassante",
    
    groundingExercise: "Esercizio di radicamento",
    breathingTechnique: "Tecnica di respirazione",
    mindfulnessExercise: "Esercizio di mindfulness",
    relaxationTechnique: "Tecnica di rilassamento",
    
    legalPoliciesDisclamers: "Politiche legali e disclaimer",
    privacyPolicy: "Informativa sulla privacy",
    termsConditions: "Termini e condizioni",
    disclaimer: "Disclaimer",
    effectiveDate: "Data di entrata in vigore",
    
    legalContent: {
      effectiveDate: "Data di entrata in vigore: 6 giugno 2025",
      privacyIntro: "Take 5 (\"noi\", \"nostro\") valorizza la tua privacy. Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni personali quando usi l'app Take 5 (l'\"App\").",
      informationWeCollect: "Informazioni che raccogliamo:",
      personalDetails: "Dettagli personali che fornisci (es. nome, indirizzo email, informazioni di contatto di emergenza)",
      journalingEntries: "Voci del diario (memorizzate localmente o crittografate in modo sicuro se sui nostri server)",
      usageData: "Dati di utilizzo (pagine visitate, pulsanti cliccati, interazioni con l'app)",
      deviceData: "Dati del dispositivo (tipo di dispositivo, sistema operativo, tipo di browser)",
      howWeUseData: "Come utilizziamo i tuoi dati:",
      operateApp: "Per operare e mantenere l'App",
      personalizedFeatures: "Per permetterti di utilizzare funzionalità personalizzate (es. diario, contatti di emergenza)",
      improveExperience: "Per migliorare l'esperienza utente e sviluppare nuove funzionalità",
      sendUpdates: "Per inviare aggiornamenti occasionali o avvisi se decidi di riceverli",
      sharingData: "Condivisione dei dati:",
      noSellData: "Non vendiamo i tuoi dati",
      noSharePrivate: "Non condividiamo i tuoi dati privati con terze parti a meno che non sia legalmente richiesto",
      thirdPartyServices: "Potremmo utilizzare servizi di terze parti (es. API YouTube, Google Analytics), e le loro pratiche di raccolta dati sono regolate dalle loro politiche",
      dataSecurity: "Sicurezza dei dati:",
      encryption: "Implementiamo crittografia di livello industriale e controlli di accesso",
      deleteRequest: "Gli utenti possono richiedere la cancellazione dei dati inviando un'email a tradermigs@gmail.com",
      yourRights: "I tuoi diritti (GDPR, CCPA, ecc.):",
      accessCorrectDelete: "Diritto di accedere, correggere o eliminare i tuoi dati",
      withdrawConsent: "Diritto di ritirare il consenso o disiscriversi dalle comunicazioni",
      lodgeComplaint: "Diritto di presentare un reclamo presso un'autorità per la protezione dei dati",
      termsIntro: "Utilizzando l'app Take 5, accetti i seguenti termini. Se non sei d'accordo, non utilizzare l'App.",
      eligibility: "Idoneità:",
      ageRequirement: "legalContent.ageRequirement",
      ageRepresentation: "legalContent.ageRepresentation",
      mustBe18: "Devi avere 18 anni o più per utilizzare l'App.",
      represent18: "Utilizzando l'App, dichiari di avere almeno 18 anni.",
      noMedicalAdvice: "Nessun consiglio medico:",
      informationalOnly: "L'App è solo per scopi informativi e motivazionali.",
      noMedicalDiagnosis: "legalContent.noMedicalDiagnosis",
      notReplacement: "legalContent.notReplacement",
      noMedicalAdviceText: "Take 5 non fornisce consigli medici, diagnosi o trattamenti.",
      notReplaceProfessional: "I contenuti nell'App (citazioni, affermazioni, chat IA, video collegati) non sono destinati a sostituire l'assistenza professionale per la salute mentale o medica.",
      consultProvider: "Consulta sempre un operatore sanitario qualificato per problemi di salute mentale.",
      aiContentUsage: "Utilizzo di IA e contenuti:",
      aiNotTherapist: "Il chatbot IA è un assistente conversazionale di base. Non è un terapista, consulente autorizzato o operatore di crisi.",
      thirdPartyContent: "legalContent.thirdPartyContent",
      youtubeContent: "Potremmo collegare a contenuti di terze parti (es. video YouTube). Non controlliamo tali contenuti e non siamo responsabili per la loro accuratezza o disponibilità.",
      emergencyDisclaimer: "Disclaimer funzionalità di emergenza:",
      emergencyUserTool: "legalContent.emergencyUserTool",
      emergencyText: "Le funzionalità di contatto di emergenza e hotline sono strumenti utente per aiutare a connettersi con risorse esterne.",
      notEmergencyService: "Take 5 non è un servizio di emergenza. In una crisi, chiama immediatamente il tuo numero di emergenza locale.",
      callEmergencyServices: "Se stai sperimentando pensieri di autolesionismo, chiama i servizi di emergenza o una hotline di crisi.",
      limitationLiability: "Limitazione di responsabilità:",
      noLiability: "legalContent.noLiability",
      useAtRisk: "Utilizzi l'App a tuo rischio.",
      noWarranties: "Non forniamo garanzie sull'efficacia dell'App per i risultati di salute mentale.",
      disclaimerIntro: "Take 5 è un'app di benessere e motivazione progettata per fornire risorse di supporto emotivo e strumenti di coping. Disclaimer importanti:",
      notMedicalDevice: "Questo non è un dispositivo medico o un trattamento professionale per la salute mentale.",
      supplementNot: "Integra ma non sostituisce l'assistenza professionale.",
      ifCrisis: "Se sei in crisi, contatta immediatamente i servizi di emergenza o un professionista della salute mentale.",
    }
  }
};

// Translation function with placeholder support
export function t(
  key: string,
  placeholders?: Record<string, string>,
  language: Language = 'en'
): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key} for language: ${language}`);
      return key;
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
  
  console.warn(`Translation value is not a string: ${key} for language: ${language}`);
  return key;
}