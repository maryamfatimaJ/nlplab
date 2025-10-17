import { motion } from 'framer-motion';
import { Play, Trash2, Loader2 } from 'lucide-react';
import { ProcessOptions } from '../types';
import { OptionsPanel } from './OptionsPanel';

interface InputPanelProps {
  text: string;
  setText: (text: string) => void;
  options: ProcessOptions;
  setOptions: (options: ProcessOptions) => void;
  onProcess: () => void;
  onClear: () => void;
  isProcessing: boolean;
}

export const InputPanel = ({
  text,
  setText,
  options,
  setOptions,
  onProcess,
  onClear,
  isProcessing
}: InputPanelProps) => {
  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Input Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="flex-1 w-full p-4 bg-gray-900/50 border-2 border-gray-700/50 rounded-lg
                     text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50
                     transition-colors duration-200 font-mono text-sm resize-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar">
          <OptionsPanel options={options} setOptions={setOptions} />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-700/50">
          <motion.button
            onClick={onProcess}
            disabled={isProcessing || !text.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r
                     from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                     disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed
                     text-white font-semibold rounded-lg transition-all duration-200
                     shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            whileHover={{ scale: isProcessing ? 1 : 1.02 }}
            whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Preprocessing
              </>
            )}
          </motion.button>

          <motion.button
            onClick={onClear}
            disabled={isProcessing}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800
                     disabled:cursor-not-allowed text-white font-semibold rounded-lg
                     transition-colors duration-200 flex items-center gap-2"
            whileHover={{ scale: isProcessing ? 1 : 1.02 }}
            whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          >
            <Trash2 className="w-5 h-5" />
            Clear
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
