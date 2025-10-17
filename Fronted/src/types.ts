export interface ProcessOptions {
  tokenization: boolean;
  lowercasing: boolean;
  stopword_removal: boolean;
  lemmatization: boolean;
  stemming: boolean;
  vocabulary: boolean;
  bag_of_words: boolean;
  tf: boolean;
  tfidf: boolean;
  pos_tagging: boolean;
  full_preprocessing: boolean;
}

export interface ProcessResults {
  original_text: string;
  cleaned_text?: string;
  lowercased_text?: string;
  tokens?: string[];
  filtered_tokens?: string[];
  lemmatized_tokens?: string[];
  stemmed_tokens?: string[];
  vocabulary?: string[];
  bag_of_words?: Record<string, number>;
  term_frequency?: Record<string, number>;
  tfidf?: Record<string, number>;
  pos_tags?: [string, string][];
}
