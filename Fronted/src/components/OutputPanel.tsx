import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { ProcessResults } from '../types';
import { ResultCard } from './ResultCard';

interface OutputPanelProps {
  results: ProcessResults | null;
  error: string | null;
  timestamp: Date | null;
}

export const OutputPanel = ({ results, error, timestamp }: OutputPanelProps) => {
  return (
    <motion.div
      className="h-full flex flex-col overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
        Processing Results
      </h2>

      {error && (
        <motion.div
          className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-red-400 font-semibold mb-1">Error</h4>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {!results && !error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                         flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-50"></div>
            </motion.div>
            <p className="text-gray-400 text-lg">Enter text and select options to begin processing</p>
          </div>
        </div>
      )}

      {results && (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {results.cleaned_text && (
            <ResultCard
              title="Cleaned Text"
              content={results.cleaned_text}
              type="text"
              delay={0.1}
              timestamp={timestamp || undefined}
            />
          )}

          {results.lowercased_text && (
            <ResultCard
              title="Lowercased Text"
              content={results.lowercased_text}
              type="text"
              delay={0.15}
              timestamp={timestamp || undefined}
            />
          )}

          {results.tokens && (
            <ResultCard
              title="Tokens"
              content={results.tokens}
              type="array"
              delay={0.2}
              timestamp={timestamp || undefined}
            />
          )}

          {results.filtered_tokens && (
            <ResultCard
              title="Filtered Tokens (Stopwords Removed)"
              content={results.filtered_tokens}
              type="array"
              delay={0.25}
              timestamp={timestamp || undefined}
            />
          )}

          {results.lemmatized_tokens && (
            <ResultCard
              title="Lemmatized Tokens"
              content={results.lemmatized_tokens}
              type="array"
              delay={0.3}
              timestamp={timestamp || undefined}
            />
          )}

          {results.stemmed_tokens && (
            <ResultCard
              title="Stemmed Tokens"
              content={results.stemmed_tokens}
              type="array"
              delay={0.35}
              timestamp={timestamp || undefined}
            />
          )}

          {results.vocabulary && (
            <ResultCard
              title="Vocabulary"
              content={results.vocabulary}
              type="array"
              delay={0.4}
              timestamp={timestamp || undefined}
            />
          )}

          {results.bag_of_words && (
            <ResultCard
              title="Bag of Words"
              content={results.bag_of_words}
              type="object"
              delay={0.45}
              timestamp={timestamp || undefined}
            />
          )}

          {results.term_frequency && (
            <ResultCard
              title="Term Frequency (TF)"
              content={results.term_frequency}
              type="object"
              delay={0.5}
              timestamp={timestamp || undefined}
            />
          )}

          {results.tfidf && (
            <ResultCard
              title="TF-IDF"
              content={results.tfidf}
              type="object"
              delay={0.55}
              timestamp={timestamp || undefined}
            />
          )}

          {results.pos_tags && (
            <ResultCard
              title="POS Tags"
              content={results.pos_tags}
              type="pos"
              delay={0.6}
              timestamp={timestamp || undefined}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};
