import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { type ProgrammingLanguage } from '../types';

interface LanguageContextType {
  selectedLanguage: ProgrammingLanguage;
  setLanguage: (language: ProgrammingLanguage) => void;
  getLanguageDisplay: (language: ProgrammingLanguage) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_DISPLAY: Record<ProgrammingLanguage, string> = {
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  javascript: 'JavaScript'
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getInitialState = (): ProgrammingLanguage => {
    try {
      const saved = localStorage.getItem('algoPatternsLanguage');
      if (saved && saved in LANGUAGE_DISPLAY) {
        return saved as ProgrammingLanguage;
      }
    } catch (e) {
      console.error("Failed to parse saved language", e);
    }
    return 'typescript';
  };

  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(getInitialState());

  useEffect(() => {
    localStorage.setItem('algoPatternsLanguage', selectedLanguage);
  }, [selectedLanguage]);

  const setLanguage = (language: ProgrammingLanguage) => {
    setSelectedLanguage(language);
  };

  const getLanguageDisplay = (language: ProgrammingLanguage): string => {
    return LANGUAGE_DISPLAY[language];
  };

  return (
    <LanguageContext.Provider value={{
      selectedLanguage,
      setLanguage,
      getLanguageDisplay,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};