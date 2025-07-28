
import React from 'react';
import { Theme } from '../types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const HeartBeatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="flex justify-between items-center py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-4">
            <HeartBeatIcon />
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 dark:text-white">
                Monitor de Tensión
            </h1>
        </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;
