import React, { useState, useEffect, useRef } from 'react';
import { FaCheckCircle, FaCalendarAlt, FaPlusCircle, FaTrash, FaTimes } from 'react-icons/fa';

const ResponsiveAnnualGoals = ({ theme, language }) => {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('annualGoals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  const [newGoal, setNewGoal] = useState('');
  const [daysLeft, setDaysLeft] = useState(0);
  const [yearProgress, setYearProgress] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const miniBoxRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      const timeDiff = endOfYear.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysLeft(daysDiff);

      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const yearLength = endOfYear.getTime() - startOfYear.getTime();
      const progress = ((now.getTime() - startOfYear.getTime()) / yearLength) * 100;
      setYearProgress(progress.toFixed(2));
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 86400000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('annualGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, { text: newGoal.trim(), completed: false }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (index) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
  };

  const removeGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleGoalClick = (goalText) => {
    setSelectedGoal(goalText);
  };

  const handleClickOutside = (e) => {
    if (miniBoxRef.current && !miniBoxRef.current.contains(e.target)) {
      setSelectedGoal(null);
    }
  };

  const closeMiniBox = () => {
    setSelectedGoal(null);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] pb-8 px-4 sm:px-6 md:px-8 relative z-0">
      <div className={`max-w-3xl w-full mx-auto rounded-xl p-4 sm:p-6 border-2 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-300'}`}>
          {language === 'pt-BR' ? 'Jornada Anual' : 'Annual Journey'}
        </h1>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm sm:text-base font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{language === 'pt-BR' ? 'Progresso do Ano' : 'Year Progress'}</span>
            <span className={`text-sm sm:text-base font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>{yearProgress}%</span>
          </div>
          <div className={`w-full rounded-full h-2.5 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
            <div className={`bg-indigo-600 h-2.5 rounded-full`} style={{ width: `${yearProgress}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className={`text-center p-4 rounded-lg ${theme === 'light' ? 'bg-indigo-100' : 'bg-indigo-800'}`}>
            <FaCalendarAlt className="mx-auto mb-2" size={24} />
            <p className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{language === 'pt-BR' ? 'Dias Restantes' : 'Days Left'}</p>
            <p className={`text-lg sm:text-xl font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>{daysLeft}</p>
          </div>
          <div className={`text-center p-4 rounded-lg ${theme === 'light' ? 'bg-green-100' : 'bg-green-800'}`}>
            <FaCheckCircle className="mx-auto mb-2" size={24} />
            <p className={`text-xs sm:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{language === 'pt-BR' ? 'Metas Concluídas' : 'Completed Goals'}</p>
            <p className={`text-lg sm:text-xl font-bold text-green-500`}>{goals.filter(g => g.completed).length}/{goals.length}</p>
          </div>
        </div>

        <form onSubmit={addGoal} className="flex mb-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder={language === 'pt-BR' ? 'Adicionar nova meta...' : 'Add new goal...'}
            className={`flex-grow p-2 rounded-lg border-2 ${theme === 'light' ? 'border-gray-400' : 'text-gray-900 border-gray-600'} focus:outline-none`}
          />
          <button type="submit" className={`ml-2 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition`}>
            <FaPlusCircle size={25} />
          </button>
        </form>

        <ul className="list-disc pl-5">
          {goals.map((goal, index) => (
            <li key={index} className={`flex items-center mb-2 cursor-pointer`} onClick={() => handleGoalClick(goal.text)}>
              <span className={`flex-grow ${goal.completed ? 'text-gray-500' : 'text-gray-800'} ${goal.text.length > 25 ? 'text-ellipsis overflow-hidden whitespace-nowrap' : ''}`}>
                {goal.text}
              </span>
              <button onClick={(e) => { e.stopPropagation(); toggleGoal(index); }} className={`border-2 py-2 px-2 border-green-500 rounded-lg text-green-500 hover:text-green-700 flex items-center ml-2 px-2`}>
                <FaCheckCircle className="text-base sm:text-xl" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); removeGoal(index); }} className={`border-2 py-2 px-2 border-red-500 rounded-lg text-red-500 hover:text-red-700 flex items-center ml-2 px-2`}>
                <FaTrash className="text-base sm:text-xl" />
              </button>
            </li>
          ))}
        </ul>

        {/* Mini Box for Goal Details */}
        {selectedGoal && (
          <div 
            ref={miniBoxRef} 
            className={`fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50`}
            onClick={handleClickOutside}
          >
            <div className={`bg-white p-4 rounded-lg shadow-md relative ${theme === 'light' ? 'border border-gray-300' : 'bg-gray-800 border border-gray-600'}`}>
              <button 
                onClick={closeMiniBox} 
                className={`absolute top-2 right-2 text-gray-500 hover:text-gray-800 ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} rounded-full p-1`}
              >
                <FaTimes />
              </button>
              <h2 className={`text-lg mt-5 mb-5 font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                {selectedGoal}
              </h2>
              <p className={`text-sm text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {language === 'pt-BR' ? 'Clique no X para fechar.' : 'Click on the X to close.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveAnnualGoals;