import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../helpers/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="rounded-full p-2 transition duration-500 ease-in-out">
      {theme === 'dark' ? (
        <FaMoon
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="cursor-pointer text-2xl text-gray-500 dark:text-gray-400"
        />
      ) : (
        <FaSun
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="cursor-pointer text-2xl text-gray-500 dark:text-gray-400"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
