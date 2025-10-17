import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-700/50 dark:border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-full px-6 py-3 flex items-center justify-center">
        <span className="text-sm text-gray-400 flex items-center gap-2">
          Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for AI Learners
        </span>
      </div>
    </motion.footer>
  );
};
