import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('electo_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('electo_lang', language);
    // Update document title or other meta based on language if needed
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return { language, setLanguage, toggleLanguage };
};
