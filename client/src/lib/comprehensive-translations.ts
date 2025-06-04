// Comprehensive translation system with pre-translated content for all supported languages
export interface ComprehensiveTranslations {
  [languageCode: string]: {
    [key: string]: string;
  };
}

// Core translations for the most essential UI elements
export const coreTranslations: ComprehensiveTranslations = {
  // English (base)
  en: {
    appName: "Take 5",
    tagline: "Take a breath. Take back control.",
    searchPlaceholder: "Type how you feel: 'I'm alone', 'homeless', 'want to die'...",
    login: "Log In",
    createAccount: "Create Account",
    loginToCreateContactsList: "Log in to create contacts list",
    breathing: "Breathing",
    breathingGuide: "5-min guide",
    affirmations: "Affirmations",
    kindWords: "Kind words",
    calmMusic: "Calm Music",
    soothingSounds: "Soothing sounds",
    grounding: "Grounding",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Your Trusted Contacts",
    emergencySupport: "Emergency Support",
    callEmergency: "Call {number} (Emergency)",
    youAreNotAlone: "You're not alone.",
    youMatter: "You matter. Your life has value.",
    helpIsAlwaysAvailable: "Help is always available.",
    thisToWillPass: "This moment is temporary. You got this.",
    howCanWeSupport: "How are you feeling, friend?",
    feelOverwhelmed: "I Feel Overwhelmed",
    feelAnxious: "I Feel Anxious",
    feelDepressed: "I Feel Depressed",
    needToTalk: "I Need to Talk",
    // Additional common UI elements
    welcomeBack: "Welcome Back",
    continueWithGoogle: "Continue with Google",
    or: "OR",
    needAccountSignUp: "Need an account? Sign up",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signUp: "Sign Up",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    remove: "Remove",
    yes: "Yes",
    no: "No",
    ok: "OK",
    error: "Error",
    success: "Success",
    loading: "Loading..."
  },

  // Spanish
  es: {
    appName: "Take 5",
    tagline: "Respira. Recupera el control.",
    searchPlaceholder: "Escribe cómo te sientes: 'Estoy solo', 'sin hogar', 'quiero morir'...",
    login: "Iniciar Sesión",
    createAccount: "Crear Cuenta",
    loginToCreateContactsList: "Inicia sesión para crear lista de contactos",
    breathing: "Respiración",
    breathingGuide: "Guía de 5 min",
    affirmations: "Afirmaciones",
    kindWords: "Palabras amables",
    calmMusic: "Música Relajante",
    soothingSounds: "Sonidos relajantes",
    grounding: "Conexión a tierra",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Tus Contactos de Confianza",
    emergencySupport: "Apoyo de Emergencia",
    callEmergency: "Llamar {number} (Emergencia)",
    youAreNotAlone: "No estás solo.",
    youMatter: "Importas. Tu vida tiene valor.",
    helpIsAlwaysAvailable: "Siempre hay ayuda disponible.",
    thisToWillPass: "Este momento es temporal. Puedes con esto.",
    howCanWeSupport: "¿Cómo te sientes, amigo?",
    feelOverwhelmed: "Me Siento Abrumado",
    feelAnxious: "Me Siento Ansioso",
    feelDepressed: "Me Siento Deprimido",
    needToTalk: "Necesito Hablar",
    // Additional UI elements
    welcomeBack: "Bienvenido de Vuelta",
    continueWithGoogle: "Continuar con Google",
    or: "O",
    needAccountSignUp: "¿Necesitas una cuenta? Regístrate",
    email: "Correo",
    password: "Contraseña",
    signIn: "Iniciar Sesión",
    signUp: "Registrarse",
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Agregar",
    remove: "Quitar",
    yes: "Sí",
    no: "No",
    ok: "Vale",
    error: "Error",
    success: "Éxito",
    loading: "Cargando..."
  },

  // French
  fr: {
    appName: "Take 5",
    tagline: "Respirez. Reprenez le contrôle.",
    searchPlaceholder: "Écrivez ce que vous ressentez: 'Je suis seul', 'sans-abri', 'je veux mourir'...",
    login: "Se Connecter",
    createAccount: "Créer un Compte",
    loginToCreateContactsList: "Connectez-vous pour créer une liste de contacts",
    breathing: "Respiration",
    breathingGuide: "Guide 5 min",
    affirmations: "Affirmations",
    kindWords: "Mots bienveillants",
    calmMusic: "Musique Apaisante",
    soothingSounds: "Sons apaisants",
    grounding: "Ancrage",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Vos Contacts de Confiance",
    emergencySupport: "Soutien d'Urgence",
    callEmergency: "Appeler {number} (Urgence)",
    youAreNotAlone: "Vous n'êtes pas seul.",
    youMatter: "Vous comptez. Votre vie a de la valeur.",
    helpIsAlwaysAvailable: "L'aide est toujours disponible.",
    thisToWillPass: "Ce moment est temporaire. Vous pouvez y arriver.",
    howCanWeSupport: "Comment vous sentez-vous, ami?",
    feelOverwhelmed: "Je Me Sens Dépassé",
    feelAnxious: "Je Me Sens Anxieux",
    feelDepressed: "Je Me Sens Déprimé",
    needToTalk: "J'ai Besoin de Parler"
  },

  // German
  de: {
    appName: "Take 5",
    tagline: "Atmen Sie. Übernehmen Sie wieder die Kontrolle.",
    searchPlaceholder: "Schreiben Sie, wie Sie sich fühlen: 'Ich bin allein', 'obdachlos', 'will sterben'...",
    login: "Anmelden",
    createAccount: "Konto Erstellen",
    loginToCreateContactsList: "Melden Sie sich an, um eine Kontaktliste zu erstellen",
    breathing: "Atmung",
    breathingGuide: "5-Min-Anleitung",
    affirmations: "Affirmationen",
    kindWords: "Freundliche Worte",
    calmMusic: "Beruhigende Musik",
    soothingSounds: "Beruhigende Klänge",
    grounding: "Erdung",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Ihre Vertrauenspersonen",
    emergencySupport: "Notfallunterstützung",
    callEmergency: "{number} anrufen (Notfall)",
    youAreNotAlone: "Sie sind nicht allein.",
    youMatter: "Sie sind wichtig. Ihr Leben hat Wert.",
    helpIsAlwaysAvailable: "Hilfe ist immer verfügbar.",
    thisToWillPass: "Dieser Moment ist vorübergehend. Sie schaffen das.",
    howCanWeSupport: "Wie fühlen Sie sich, Freund?",
    feelOverwhelmed: "Ich Fühle Mich Überfordert",
    feelAnxious: "Ich Fühle Mich Ängstlich",
    feelDepressed: "Ich Fühle Mich Deprimiert",
    needToTalk: "Ich Muss Reden"
  },

  // Chinese (Simplified)
  zh: {
    appName: "Take 5",
    tagline: "深呼吸。重新掌控。",
    searchPlaceholder: "输入您的感受：'我很孤独'、'无家可归'、'想死'...",
    login: "登录",
    createAccount: "创建账户",
    loginToCreateContactsList: "登录以创建联系人列表",
    breathing: "呼吸",
    breathingGuide: "5分钟指导",
    affirmations: "肯定语句",
    kindWords: "温暖话语",
    calmMusic: "舒缓音乐",
    soothingSounds: "舒缓声音",
    grounding: "接地技巧",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "您的可信联系人",
    emergencySupport: "紧急支持",
    callEmergency: "拨打 {number}（紧急情况）",
    youAreNotAlone: "您并不孤单。",
    youMatter: "您很重要。您的生命有价值。",
    helpIsAlwaysAvailable: "随时都有帮助可用。",
    thisToWillPass: "这一刻是暂时的。您能行。",
    howCanWeSupport: "朋友，您感觉怎么样？",
    feelOverwhelmed: "我感到不知所措",
    feelAnxious: "我感到焦虑",
    feelDepressed: "我感到抑郁",
    needToTalk: "我需要倾诉"
  },

  // Japanese
  ja: {
    appName: "Take 5",
    tagline: "息を整えて。コントロールを取り戻そう。",
    searchPlaceholder: "気持ちを入力してください：「孤独です」「ホームレス」「死にたい」...",
    login: "ログイン",
    createAccount: "アカウント作成",
    loginToCreateContactsList: "ログインして連絡先リストを作成",
    breathing: "呼吸法",
    breathingGuide: "5分ガイド",
    affirmations: "アファメーション",
    kindWords: "優しい言葉",
    calmMusic: "癒しの音楽",
    soothingSounds: "心地よい音",
    grounding: "グラウンディング",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "信頼できる連絡先",
    emergencySupport: "緊急サポート",
    callEmergency: "{number}に電話（緊急時）",
    youAreNotAlone: "あなたは一人ではありません。",
    youMatter: "あなたは大切です。あなたの命には価値があります。",
    helpIsAlwaysAvailable: "いつでもヘルプが利用できます。",
    thisToWillPass: "この瞬間は一時的なものです。あなたならできます。",
    howCanWeSupport: "友よ、調子はいかがですか？",
    feelOverwhelmed: "圧倒されています",
    feelAnxious: "不安を感じています",
    feelDepressed: "憂鬱を感じています",
    needToTalk: "話す必要があります"
  },

  // Thai
  th: {
    appName: "Take 5",
    tagline: "หายใจเข้าลึกๆ ควบคุมตัวเองใหม่",
    searchPlaceholder: "พิมพ์ความรู้สึกของคุณ: 'ฉันเหงา', 'ไร้บ้าน', 'อยากตาย'...",
    login: "เข้าสู่ระบบ",
    createAccount: "สร้างบัญชี",
    loginToCreateContactsList: "เข้าสู่ระบบเพื่อสร้างรายชื่อผู้ติดต่อ",
    breathing: "การหายใจ",
    breathingGuide: "คู่มือ 5 นาที",
    affirmations: "คำยืนยัน",
    kindWords: "คำพูดดีๆ",
    calmMusic: "เพลงผ่อนคลาย",
    soothingSounds: "เสียงผ่อนคลาย",
    grounding: "การสร้างสมดุล",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "ผู้ติดต่อที่ไว้ใจได้",
    emergencySupport: "การสนับสนุนฉุกเฉิน",
    callEmergency: "โทร {number} (ฉุกเฉิน)",
    youAreNotAlone: "คุณไม่ได้อยู่คนเดียว",
    youMatter: "คุณสำคัญ ชีวิตคุณมีค่า",
    helpIsAlwaysAvailable: "ความช่วยเหลือพร้อมเสมอ",
    thisToWillPass: "ช่วงเวลานี้เป็นเพียงชั่วคราว คุณทำได้",
    howCanWeSupport: "เพื่อน คุณรู้สึกอย่างไร?",
    feelOverwhelmed: "ฉันรู้สึกท่วมท้น",
    feelAnxious: "ฉันรู้สึกวิตกกังวล",
    feelDepressed: "ฉันรู้สึกซึมเศร้า",
    needToTalk: "ฉันต้องการคุย"
  },

  // Arabic
  ar: {
    appName: "Take 5",
    tagline: "خذ نفساً عميقاً. استعد السيطرة.",
    searchPlaceholder: "اكتب ما تشعر به: 'أنا وحيد'، 'بلا مأوى'، 'أريد أن أموت'...",
    login: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    loginToCreateContactsList: "سجل الدخول لإنشاء قائمة جهات الاتصال",
    breathing: "التنفس",
    breathingGuide: "دليل 5 دقائق",
    affirmations: "التأكيدات",
    kindWords: "كلمات لطيفة",
    calmMusic: "موسيقى هادئة",
    soothingSounds: "أصوات مهدئة",
    grounding: "التأريض",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "جهات الاتصال الموثوقة",
    emergencySupport: "الدعم الطارئ",
    callEmergency: "اتصل بـ {number} (طوارئ)",
    youAreNotAlone: "أنت لست وحيداً.",
    youMatter: "أنت مهم. حياتك لها قيمة.",
    helpIsAlwaysAvailable: "المساعدة متاحة دائماً.",
    thisToWillPass: "هذه اللحظة مؤقتة. يمكنك التغلب عليها.",
    howCanWeSupport: "كيف تشعر يا صديق؟",
    feelOverwhelmed: "أشعر بالإرهاق",
    feelAnxious: "أشعر بالقلق",
    feelDepressed: "أشعر بالاكتئاب",
    needToTalk: "أحتاج للحديث"
  },

  // Russian
  ru: {
    appName: "Take 5",
    tagline: "Дышите. Восстановите контроль.",
    searchPlaceholder: "Напишите, что вы чувствуете: 'Я одинок', 'бездомный', 'хочу умереть'...",
    login: "Войти",
    createAccount: "Создать Аккаунт",
    loginToCreateContactsList: "Войдите, чтобы создать список контактов",
    breathing: "Дыхание",
    breathingGuide: "5-мин гид",
    affirmations: "Аффирмации",
    kindWords: "Добрые слова",
    calmMusic: "Спокойная Музыка",
    soothingSounds: "Успокаивающие звуки",
    grounding: "Заземление",
    groundingTechnique: "5-4-3-2-1",
    trustedContacts: "Ваши Надежные Контакты",
    emergencySupport: "Экстренная Поддержка",
    callEmergency: "Звонить {number} (Экстренно)",
    youAreNotAlone: "Вы не одиноки.",
    youMatter: "Вы важны. Ваша жизнь имеет ценность.",
    helpIsAlwaysAvailable: "Помощь всегда доступна.",
    thisToWillPass: "Этот момент временный. Вы справитесь.",
    howCanWeSupport: "Как дела, друг?",
    feelOverwhelmed: "Я Чувствую Себя Подавленным",
    feelAnxious: "Я Чувствую Тревогу",
    feelDepressed: "Я Чувствую Депрессию",
    needToTalk: "Мне Нужно Поговорить"
  }
};

// Helper function to get translation with fallback
export function getTranslation(languageCode: string, key: string, fallback?: string): string {
  const translations = coreTranslations[languageCode];
  if (translations && translations[key]) {
    return translations[key];
  }
  
  // Fallback to English if translation not found
  const englishTranslation = coreTranslations.en[key];
  if (englishTranslation) {
    return englishTranslation;
  }
  
  // Ultimate fallback
  return fallback || key;
}

// Check if a language has core translations available
export function hasTranslations(languageCode: string): boolean {
  return languageCode in coreTranslations;
}

// Get all available languages with translations
export function getAvailableLanguages(): string[] {
  return Object.keys(coreTranslations);
}