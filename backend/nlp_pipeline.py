"""
NLP Preprocessing Pipeline
Implements all text preprocessing operations with dependency resolution.
"""
import re
import math
from typing import List, Dict, Set, Tuple, Optional
from collections import Counter
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk import pos_tag

# Download required NLTK data
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet', quiet=True)

try:
    nltk.data.find('taggers/averaged_perceptron_tagger')
except LookupError:
    nltk.download('averaged_perceptron_tagger', quiet=True)

try:
    nltk.data.find('taggers/averaged_perceptron_tagger_eng')
except LookupError:
    nltk.download('averaged_perceptron_tagger_eng', quiet=True)


class NLPPipeline:
    def __init__(self):
        self.stemmer = PorterStemmer()
        self.lemmatizer = WordNetLemmatizer()
        self.default_stopwords = set(stopwords.words('english'))

    def clean_text(self, text: str) -> str:
        """
        Remove HTML tags, punctuation, numbers, and normalize whitespace.
        """
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Remove URLs
        text = re.sub(r'http\S+|www\S+', '', text)
        # Remove numbers
        text = re.sub(r'\d+', '', text)
        # Remove punctuation (keep sentence delimiters temporarily)
        text = re.sub(r'[^\w\s.!?]', '', text)
        # Normalize whitespace
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def lowercase(self, text: str) -> str:
        """Convert text to lowercase."""
        return text.lower()

    def tokenize(self, text: str) -> List[str]:
        """
        Split text into tokens (words).
        Removes punctuation during tokenization.
        """
        # Remove all punctuation and split by whitespace
        text = re.sub(r'[^\w\s]', '', text)
        tokens = text.split()
        return [token for token in tokens if token]

    def remove_stopwords(self, tokens: List[str], custom_stopwords: Optional[List[str]] = None) -> List[str]:
        """Remove stopwords from token list."""
        stopwords_set = self.default_stopwords.copy()
        if custom_stopwords:
            stopwords_set.update(custom_stopwords)
        return [token for token in tokens if token.lower() not in stopwords_set]

    def lemmatize(self, tokens: List[str]) -> List[str]:
        """Apply lemmatization to tokens."""
        return [self.lemmatizer.lemmatize(token) for token in tokens]

    def stem(self, tokens: List[str]) -> List[str]:
        """Apply stemming to tokens."""
        return [self.stemmer.stem(token) for token in tokens]

    def extract_vocabulary(self, tokens: List[str]) -> List[str]:
        """Extract unique vocabulary sorted alphabetically."""
        return sorted(list(set(tokens)))

    def create_bow(self, tokens: List[str], vocabulary: List[str]) -> Dict[str, int]:
        """Create Bag of Words representation."""
        token_counts = Counter(tokens)
        bow = {word: token_counts.get(word, 0) for word in vocabulary}
        return bow

    def calculate_tf(self, bow: Dict[str, int]) -> Dict[str, float]:
        """Calculate Term Frequency."""
        total_words = sum(bow.values())
        if total_words == 0:
            return {word: 0.0 for word in bow}
        return {word: count / total_words for word, count in bow.items()}

    def calculate_tfidf(self, text: str, tokens: List[str], vocabulary: List[str]) -> Dict[str, float]:
        """
        Calculate TF-IDF using sentence-level document frequency.
        Each sentence is treated as a document.
        """
        # Split text into sentences
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]

        if not sentences:
            return {word: 0.0 for word in vocabulary}

        # Calculate document frequency (number of sentences containing each word)
        doc_freq = {}
        for word in vocabulary:
            doc_freq[word] = sum(1 for sentence in sentences if word in sentence.lower())

        # Calculate TF
        token_counts = Counter(tokens)
        total_words = len(tokens)
        tf = {word: token_counts.get(word, 0) / total_words if total_words > 0 else 0 for word in vocabulary}

        # Calculate IDF and TF-IDF
        num_docs = len(sentences)
        tfidf = {}
        for word in vocabulary:
            if doc_freq[word] == 0:
                tfidf[word] = 0.0
            else:
                idf = math.log(num_docs / doc_freq[word])
                tfidf[word] = tf[word] * idf

        return tfidf

    def pos_tag_text(self, tokens: List[str]) -> List[Tuple[str, str]]:
        """Perform Part-of-Speech tagging."""
        if not tokens:
            return []
        return pos_tag(tokens)

    def process(
        self,
        text: str,
        options: Dict[str, bool],
        custom_stopwords: Optional[List[str]] = None
    ) -> Dict:
        """
        Process text based on selected options with automatic dependency resolution.
        Returns all intermediate and final results.
        """
        results = {
            "original_text": text
        }

        if not text or not text.strip():
            return results

        # Determine required steps based on dependencies
        needs_cleaning = any([
            options.get("tokenization"),
            options.get("lowercasing"),
            options.get("stopword_removal"),
            options.get("lemmatization"),
            options.get("stemming"),
            options.get("vocabulary"),
            options.get("bag_of_words"),
            options.get("tf"),
            options.get("tfidf"),
            options.get("pos_tagging"),
            options.get("full_preprocessing")
        ])

        # Step 1: Clean text
        if needs_cleaning:
            cleaned_text = self.clean_text(text)
            results["cleaned_text"] = cleaned_text
        else:
            cleaned_text = text

        # Step 2: Lowercase
        needs_lowercase = any([
            options.get("lowercasing"),
            options.get("tokenization"),
            options.get("stopword_removal"),
            options.get("lemmatization"),
            options.get("stemming"),
            options.get("vocabulary"),
            options.get("bag_of_words"),
            options.get("tf"),
            options.get("tfidf"),
            options.get("full_preprocessing")
        ])

        if needs_lowercase:
            lowercased_text = self.lowercase(cleaned_text)
            results["lowercased_text"] = lowercased_text
        else:
            lowercased_text = cleaned_text

        # Step 3: Tokenize
        needs_tokens = any([
            options.get("tokenization"),
            options.get("stopword_removal"),
            options.get("lemmatization"),
            options.get("stemming"),
            options.get("vocabulary"),
            options.get("bag_of_words"),
            options.get("tf"),
            options.get("tfidf"),
            options.get("pos_tagging"),
            options.get("full_preprocessing")
        ])

        if needs_tokens:
            tokens = self.tokenize(lowercased_text)
            results["tokens"] = tokens

        # Step 4: Remove stopwords
        needs_stopword_removal = any([
            options.get("stopword_removal"),
            options.get("lemmatization"),
            options.get("stemming"),
            options.get("vocabulary"),
            options.get("bag_of_words"),
            options.get("tf"),
            options.get("tfidf"),
            options.get("full_preprocessing")
        ])

        if needs_stopword_removal and needs_tokens:
            filtered_tokens = self.remove_stopwords(tokens, custom_stopwords)
            results["filtered_tokens"] = filtered_tokens
        else:
            filtered_tokens = tokens if needs_tokens else []

        # Step 5: Lemmatization
        if options.get("lemmatization") or options.get("full_preprocessing"):
            lemmatized_tokens = self.lemmatize(filtered_tokens)
            results["lemmatized_tokens"] = lemmatized_tokens
            processing_tokens = lemmatized_tokens
        else:
            processing_tokens = filtered_tokens

        # Step 6: Stemming (alternative to lemmatization)
        if options.get("stemming") and not options.get("lemmatization"):
            stemmed_tokens = self.stem(filtered_tokens)
            results["stemmed_tokens"] = stemmed_tokens
            processing_tokens = stemmed_tokens

        # Step 7: Extract vocabulary
        needs_vocabulary = any([
            options.get("vocabulary"),
            options.get("bag_of_words"),
            options.get("tf"),
            options.get("tfidf"),
            options.get("full_preprocessing")
        ])

        if needs_vocabulary and processing_tokens:
            vocabulary = self.extract_vocabulary(processing_tokens)
            results["vocabulary"] = vocabulary

        # Step 8: Bag of Words
        needs_bow = any([
            options.get("bag_of_words"),
            options.get("tf"),
            options.get("tfidf"),
            options.get("full_preprocessing")
        ])

        if needs_bow and needs_vocabulary:
            bow = self.create_bow(processing_tokens, vocabulary)
            results["bag_of_words"] = bow

        # Step 9: Term Frequency
        needs_tf = any([
            options.get("tf"),
            options.get("tfidf"),
            options.get("full_preprocessing")
        ])

        if needs_tf and needs_bow:
            tf = self.calculate_tf(bow)
            results["term_frequency"] = tf

        # Step 10: TF-IDF
        if options.get("tfidf") or options.get("full_preprocessing"):
            if needs_vocabulary:
                tfidf = self.calculate_tfidf(lowercased_text, processing_tokens, vocabulary)
                results["tfidf"] = tfidf

        # Step 11: POS Tagging (uses original tokens, not processed)
        if options.get("pos_tagging") or options.get("full_preprocessing"):
            if needs_tokens:
                pos_tags = self.pos_tag_text(tokens)
                results["pos_tags"] = pos_tags

        return results
