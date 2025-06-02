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
}

export const translations: Record<string, Translation> = {
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
    howCanWeSupport: "How can we support you right now?",
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
    close: "Close"
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
    close: "ปิด"
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
    close: "Cerrar"
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
    close: "Fermer"
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

export type Language = keyof typeof translations;

export function getTranslation(language: Language, key: keyof Translation, params?: Record<string, string>): string {
  let text = translations[language]?.[key] || translations.en[key];
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
  }
  
  return text;
}