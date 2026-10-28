import React, { createContext, useContext } from 'react';

// Compatibility context: English is active with bilingual subtitles retained from PDF
const LanguageContext = createContext({
  lang: 'en',
  isHindi: false,
  toggleLanguage: () => {}
});

export const LanguageProvider = ({ children }) => {
  return (
    <LanguageContext.Provider value={{ lang: 'en', isHindi: false, toggleLanguage: () => {} }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
