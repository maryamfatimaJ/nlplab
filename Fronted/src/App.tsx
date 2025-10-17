import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { useTheme } from './hooks/useTheme';
import { ProcessOptions, ProcessResults } from './types';
import { api } from './services/api';

const defaultOptions: ProcessOptions = {
  tokenization: false,
  lowercasing: false,
  stopword_removal: false,
  lemmatization: false,
  stemming: false,
  vocabulary: false,
  bag_of_words: false,
  tf: false,
  tfidf: false,
  pos_tagging: false,
  full_preprocessing: false,
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const [text, setText] = useState('');
  const [options, setOptions] = useState<ProcessOptions>(defaultOptions);
  const [results, setResults] = useState<ProcessResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timestamp, setTimestamp] = useState<Date | null>(null);

  const handleProcess = async () => {
    if (!text.trim()) {
      setError('Please enter some text to process.');
      return;
    }

    const hasSelectedOption = Object.values(options).some(v => v);
    if (!hasSelectedOption) {
      setError('Please select at least one processing option.');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const processedResults = await api.processText(text, options);
      setResults(processedResults);
      setTimestamp(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing.');
      setResults(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setOptions(defaultOptions);
    setResults(null);
    setError(null);
    setTimestamp(null);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} transition-colors duration-300`}>
      <div className="min-h-screen bg-gray-950 dark:bg-gray-950 animated-bg">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="pt-20 pb-16 px-6 h-screen">
          <div className="max-w-[2000px] mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-2xl h-full overflow-hidden">
                <InputPanel
                  text={text}
                  setText={setText}
                  options={options}
                  setOptions={setOptions}
                  onProcess={handleProcess}
                  onClear={handleClear}
                  isProcessing={isProcessing}
                />
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-2xl h-full overflow-hidden">
                <OutputPanel results={results} error={error} timestamp={timestamp} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
