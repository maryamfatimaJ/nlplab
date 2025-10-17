import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResultCardProps {
  title: string;
  content: any;
  type: 'text' | 'array' | 'object' | 'pos';
  delay?: number;
  timestamp?: Date;
}

export const ResultCard = ({ title, content, type, delay = 0, timestamp }: ResultCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let textToCopy = '';
    if (type === 'text') {
      textToCopy = content;
    } else if (type === 'array') {
      textToCopy = content.join(', ');
    } else if (type === 'object') {
      textToCopy = JSON.stringify(content, null, 2);
    } else if (type === 'pos') {
      textToCopy = content.map((pair: [string, string]) => `${pair[0]}/${pair[1]}`).join(' ');
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (type === 'text') {
      return <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{content}</p>;
    } else if (type === 'array') {
      return (
        <div className="flex flex-wrap gap-2">
          {content.map((item: string, idx: number) => (
            <motion.span
              key={idx}
              className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      );
    } else if (type === 'object') {
      return (
        <div className="space-y-1 font-mono text-sm">
          {Object.entries(content).map(([key, value], idx) => (
            <motion.div
              key={key}
              className="flex justify-between items-center p-2 bg-gray-800/50 rounded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              <span className="text-cyan-400">{key}</span>
              <span className="text-gray-300">
                {typeof value === 'number' ? value.toFixed(4) : String(value)}
              </span>
            </motion.div>
          ))}
        </div>
      );
    } else if (type === 'pos') {
      return (
        <div className="flex flex-wrap gap-2">
          {content.map((pair: [string, string], idx: number) => (
            <motion.div
              key={idx}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              <span className="text-blue-300 font-medium">{pair[0]}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400 text-xs">{pair[1]}</span>
            </motion.div>
          ))}
        </div>
      );
    }
  };

  return (
    <motion.div
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
          {timestamp && (
            <span className="text-xs text-gray-500">
              {timestamp.toLocaleTimeString()}
            </span>
          )}
        </div>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="px-4 pb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
