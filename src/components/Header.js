import React, { useState } from 'react';
import { FaSun, FaMoon, FaQuestionCircle, FaBars, FaTimes, FaGithub, FaLanguage } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Header = ({ theme, toggleTheme, toggleLanguage, language }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="flex justify-between items-center p-4 relative z-50">
      <h1 className={`text-2xl font-bold transition-colors ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-300'}`}>
        {language === 'pt-BR' ? 'Commitz' : 'Commitz'}
      </h1>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`transition border-2 p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-yellow-400 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-gray-800 border-gray-500 dark:text-purple-900'
          }`}
        >
          {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>
        <button
          onClick={toggleHelp}
          className={`transition border-2 p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-yellow-400 ${
            theme === 'light' ? 'text-purple-900 border-gray-500' : 'text-yellow-400 border-gray-100'
          }`}
        >
          <FaQuestionCircle size={24} />
        </button>
        <button
          onClick={toggleLanguage}
          className={`transition border-2 p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-yellow-400 ${
            theme === 'light' ? 'text-purple-900 border-gray-500' : 'text-yellow-400 border-gray-100'
          }`}
        >
          {language === 'pt-BR' ? 'EN' : 'PT'}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden transition border-2 p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-yellow-400"
      >
        {showMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed top-16 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-lg w-64 z-50">
          <button
            onClick={toggleTheme}
            className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
          >
            {theme === 'light' ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button
            onClick={toggleHelp}
            className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
          >
            <FaQuestionCircle className="mr-2" />
            {language === 'pt-BR' ? 'Ajuda' : 'Help'}
          </button>
          <button
            onClick={toggleLanguage}
            className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
          >
            <FaLanguage className="mr-2" />
            {language === 'pt-BR' ? 'English' : 'Português'}
          </button>
          <a
            href="https://x.com/leozvlr"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
          >
            <FaXTwitter className="mr-2" /> Twitter
          </a>
          <a
            href="https://github.com/leoz11/Commitz"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed top-16 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-lg w-80 z-50">
          <button onClick={toggleHelp} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
            <FaTimes size={16} />
          </button>
          <h2 className="text-lg font-bold mb-2">{language === 'pt-BR' ? 'Como usar o site' : 'How to use the site'}</h2>
          <p className="mb-2">{language === 'pt-BR' 
                ? 'Adicione suas metas e busque sempre cumpri-las até o fim do ano, você pode ver quanto tempo falta para o próximo ano através da barra de progresso e outras informações presentes em nosso site!' 
                : 'Add your goals and strive to complete them by the end of the year, you can see how much time is left until the next year through the progress bar and other information on our site!'}</p>
          <p className="mb-2">{language === 'pt-BR' 
                ? 'Se tiver qualquer dúvida, entre em contato conosco pelo Twitter (X), através do botão abaixo.' 
                : 'If you have any questions, contact us via Twitter (X) using the button below.'}</p>
          
          <a href="https://x.com/leozvlr" target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center text-gray-400 hover:text-blue-500">
            <FaXTwitter size={20} className="mr-2" />
            {language === 'pt-BR' ? 'Twitter' : 'Twitter'}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;