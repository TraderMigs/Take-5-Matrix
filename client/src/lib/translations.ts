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