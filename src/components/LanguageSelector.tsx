import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProgrammingLanguage } from '../types';
import { ChevronDown, Code2 } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setLanguage, getLanguageDisplay } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: ProgrammingLanguage[] = ['typescript', 'python', 'java', 'cpp', 'javascript'];

  const handleLanguageSelect = (language: ProgrammingLanguage) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors text-sm"
      >
        <Code2 size={16} className="text-slate-400" />
        <span className="text-slate-200">
          {getLanguageDisplay(selectedLanguage)}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-20 overflow-hidden">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-800 transition-colors text-left ${
                  selectedLanguage === language ? 'bg-slate-800 text-primary' : 'text-slate-200'
                }`}
              >
                <span>{getLanguageDisplay(language)}</span>
                {selectedLanguage === language && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};