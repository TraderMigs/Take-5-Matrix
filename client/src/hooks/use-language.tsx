import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Language, translations, t as translateFunction } from '@/lib/translations';
import { getExtendedTranslation } from '@/lib/extended-translations';
import { getTranslation } from '@/lib/comprehensive-translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('take5-language');
    return (saved as Language) || 'en';
  });

  const t = (key: string, params?: Record<string, string>) => {
    // First try the comprehensive translation system for immediate multilingual support
    let translation = getExtendedTranslation(language, key);
    
    // Fallback to core translations if not found
    if (translation === key) {
      translation = getTranslation(language, key);
    }
    
    // If still not found, try the original translation system
    if (translation === key) {
      translation = translateFunction(key, params, language);
    }
    
    // Apply parameter substitution if params provided and translation found
    if (params && translation !== key) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{${param}}`, 'g'), params[param]);
      });
    }
    
    return translation;
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('take5-language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}