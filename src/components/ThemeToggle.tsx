import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'
      }`}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;