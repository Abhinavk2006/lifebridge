'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocaleCode, LANGUAGES, t } from '@/lib/i18n';

interface LanguageContextType {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
  dir: 'ltr',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<LocaleCode>('en');

  useEffect(() => {
    // Read saved locale preference from localStorage or cookie
    const savedLocale = localStorage.getItem('lifebridge_locale') as LocaleCode;
    if (savedLocale && LANGUAGES.some(l => l.code === savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (code: LocaleCode) => {
    setLocaleState(code);
    localStorage.setItem('lifebridge_locale', code);
    document.cookie = `lifebridge_locale=${code}; path=/; max-age=31536000`;
  };

  useEffect(() => {
    const langInfo = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];
    document.documentElement.lang = locale;
    document.documentElement.dir = langInfo.dir;

    // Load Google Font dynamically for the active locale script if needed
    const fontId = `font-locale-${locale}`;
    if (!document.getElementById(fontId) && locale !== 'en') {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';

      let fontQuery = '';
      switch (locale) {
        case 'hi':
        case 'mr':
          fontQuery = 'family=Noto+Sans+Devanagari:wght@400;600;700';
          break;
        case 'bn':
        case 'as':
          fontQuery = 'family=Noto+Sans+Bengali:wght@400;600;700';
          break;
        case 'ta':
          fontQuery = 'family=Noto+Sans+Tamil:wght@400;600;700';
          break;
        case 'te':
          fontQuery = 'family=Noto+Sans+Telugu:wght@400;600;700';
          break;
        case 'gu':
          fontQuery = 'family=Noto+Sans+Gujarati:wght@400;600;700';
          break;
        case 'kn':
          fontQuery = 'family=Noto+Sans+Kannada:wght@400;600;700';
          break;
        case 'ml':
          fontQuery = 'family=Noto+Sans+Malayalam:wght@400;600;700';
          break;
        case 'pa':
          fontQuery = 'family=Noto+Sans+Gurmukhi:wght@400;600;700';
          break;
        case 'or':
          fontQuery = 'family=Noto+Sans+Oriya:wght@400;600;700';
          break;
        case 'ur':
          fontQuery = 'family=Noto+Nastaliq+Urdu:wght@400;700';
          break;
      }

      if (fontQuery) {
        link.href = `https://fonts.googleapis.com/css2?${fontQuery}&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, [locale]);

  const dir = locale === 'ur' ? 'rtl' : 'ltr';

  const translate = (key: string) => t(key, locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translate, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
