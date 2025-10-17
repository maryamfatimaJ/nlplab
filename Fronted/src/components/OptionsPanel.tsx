import { motion } from 'framer-motion';
import {
  Type,
  ArrowDownAZ,
  Filter,
  Wand2,
  Scissors,
  BookOpen,
  Grid3x3,
  BarChart3,
  TrendingUp,
  Tag,
  Sparkles
} from 'lucide-react';
import { ProcessOptions } from '../types';

interface OptionsPanelProps {
  options: ProcessOptions;
  setOptions: (options: ProcessOptions) => void;
}

const optionConfigs = [
  { key: 'tokenization', label: 'Tokenization', icon: Type, description: 'Split text into words' },
  { key: 'lowercasing', label: 'Lowercasing', icon: ArrowDownAZ, description: 'Convert to lowercase' },
  { key: 'stopword_removal', label: 'Stopword Removal', icon: Filter, description: 'Remove common words' },
  { key: 'lemmatization', label: 'Lemmatization', icon: Wand2, description: 'Reduce to base form' },
  { key: 'stemming', label: 'Stemming', icon: Scissors, description: 'Reduce to stem' },
  { key: 'vocabulary', label: 'Vocabulary', icon: BookOpen, description: 'Extract unique words' },
  { key: 'bag_of_words', label: 'Bag of Words', icon: Grid3x3, description: 'Word frequency count' },
  { key: 'tf', label: 'Term Frequency', icon: BarChart3, description: 'Calculate TF' },
  { key: 'tfidf', label: 'TF-IDF', icon: TrendingUp, description: 'Calculate TF-IDF' },
  { key: 'pos_tagging', label: 'POS Tagging', icon: Tag, description: 'Tag parts of speech' },
  { key: 'full_preprocessing', label: 'Full Preprocessing', icon: Sparkles, description: 'Run all steps' }
];

export const OptionsPanel = ({ options, setOptions }: OptionsPanelProps) => {
  const handleToggle = (key: string) => {
    setOptions({
      ...options,
      [key]: !options[key as keyof ProcessOptions]
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
        Processing Options
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {optionConfigs.map((config, index) => {
          const Icon = config.icon;
          const isSelected = options[config.key as keyof ProcessOptions];

          return (
            <motion.button
              key={config.key}
              onClick={() => handleToggle(config.key)}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50'
                  : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-gray-600/50'
                }
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-md ${isSelected ? 'bg-cyan-500/20' : 'bg-gray-700/50'}`}>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1 text-left">
                <div className={`text-sm font-medium ${isSelected ? 'text-cyan-300' : 'text-gray-300'}`}>
                  {config.label}
                </div>
                <div className="text-xs text-gray-500">{config.description}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                isSelected
                  ? 'bg-cyan-500 border-cyan-500'
                  : 'border-gray-600'
              }`}>
                {isSelected && (
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
