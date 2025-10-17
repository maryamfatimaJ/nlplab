import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 dark:border-gray-700/50">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NLP Text Processing Lab
        </motion.h1>

        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-400" />
          )}
        </motion.button>
      </div>
    </nav>
  );
};
