'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LANGUAGES, LocaleCode } from '@/lib/i18n';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <span className="font-mono-val">{currentLang.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100 max-h-80 overflow-y-auto">
          <div className="px-3 py-1 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Select Language / भाषा चुनें
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                locale === lang.code ? 'bg-blue-50/80 font-bold text-blue-700' : 'text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono-val text-sm">{lang.nativeName}</span>
                <span className="text-[10px] text-slate-400 font-normal">({lang.name})</span>
              </div>
              {locale === lang.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
