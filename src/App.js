import React, { useState, useEffect } from 'react';
import ResponsiveAnnualGoals from './components/ResponsiveAnnualGoals';
import Header from './components/Header';
import { FiGithub } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import './styles/GlobalStyles.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'pt-BR';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('language', language);
  }, [theme, language]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'pt-BR' ? 'en-US' : 'pt-BR'));
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} toggleLanguage={toggleLanguage} language={language} />
      <main className="flex-grow overflow-auto">
        <ResponsiveAnnualGoals theme={theme} language={language} />
      </main>
      <footer className="footer hidden md:block fixed bottom-0 left-0 right-0 p-4 w-full">
        <div className="relative w-full">
          <a
            href="https://x.com/leozinnjs"
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute left-0 bottom-0 transition-all duration-300 flex py-2 rounded ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            <FaXTwitter size={20} className="mr-2" />
            <span>{language === 'pt-BR' ? 'Feito por Léo' : 'Made by Léo'}</span>
          </a>
          <a
            href="https://github.com/leoz11/Commitz"
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute right-0 bottom-0 transition-all duration-300 flex py-2 rounded ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            <FiGithub size={20} className="mr-2" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
