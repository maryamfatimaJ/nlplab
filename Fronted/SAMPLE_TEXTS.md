# Sample Texts for Testing

Use these sample texts to explore different NLP operations and see how the preprocessing pipeline works.

## 1. Simple Sentence

```
The quick brown fox jumps over the lazy dog.
```

**Try with:**
- Tokenization
- Lowercasing
- POS Tagging

**Expected Results:**
- 9 tokens
- POS: DT, JJ, JJ, NN, VBZ, IN, DT, JJ, NN

---

## 2. Multi-Sentence Paragraph

```
Natural Language Processing is fascinating. It helps computers understand human language. Machine learning makes NLP possible.
```

**Try with:**
- Full Preprocessing
- TF-IDF (works best with multiple sentences)
- Vocabulary

**Expected Results:**
- Rich vocabulary
- TF-IDF values showing term importance across sentences
- Multiple lemmatized forms

---

## 3. Product Review

```
This product is absolutely amazing! I've been using it for 3 weeks now and the results are incredible. The quality is outstanding and the price is very reasonable. I highly recommend this to everyone. Best purchase I've made this year!
```

**Try with:**
- Stopword Removal
- Lemmatization
- Bag of Words
- TF

**Expected Results:**
- Positive sentiment words retained
- Word frequency showing emphasis (amazing, incredible, outstanding)
- Clean vocabulary after stopword removal

---

## 4. Technical Article

```
Machine learning algorithms analyze large datasets to identify patterns and make predictions. Deep learning is a subset of machine learning that uses artificial neural networks. These networks consist of interconnected layers that process information hierarchically.
```

**Try with:**
- Full Preprocessing
- Vocabulary Extraction
- TF-IDF

**Expected Results:**
- Technical vocabulary (algorithms, datasets, neural, hierarchically)
- High TF-IDF for domain-specific terms
- Clear word relationships

---

## 5. News Article

```
Scientists discover new species in Amazon rainforest. The recently discovered species includes colorful birds and unique insects. Researchers believe this discovery highlights the biodiversity of tropical ecosystems. Conservation efforts are critical to protect these habitats.
```

**Try with:**
- POS Tagging (notice proper nouns)
- Lemmatization (discover/discovered/discovery)
- Stemming (compare with lemmatization)

**Expected Results:**
- Proper nouns: Amazon, Scientists, Researchers
- Word forms normalized: discover/discovered → discover
- Scientific vocabulary preserved

---

## 6. Social Media Post

```
OMG! Just tried this NEW coffee shop downtown & it's AMAZING!!! The latte was perfect and the vibes were incredible. Definitely coming back here ASAP! #coffee #coffeelover
```

**Try with:**
- Text Cleaning (removes special chars, numbers)
- Lowercasing
- Tokenization

**Expected Results:**
- Cleaned text without # and special characters
- Normalized case
- Hashtags processed as regular words

---

## 7. Academic Abstract

```
This study investigates the relationship between cognitive performance and sleep patterns. Participants completed attention tasks after varying sleep durations. Results indicate significant correlations between sleep quality and task accuracy. Further research is needed to establish causation.
```

**Try with:**
- Full Preprocessing
- Vocabulary (academic terms)
- TF-IDF

**Expected Results:**
- Academic vocabulary retained
- Key concepts highlighted by TF-IDF
- Formal language structures

---

## 8. Recipe Instructions

```
Preheat the oven to 350 degrees. Mix flour, sugar, and eggs in a large bowl. Add milk slowly while stirring continuously. Pour the mixture into a greased pan and bake for 30 minutes.
```

**Try with:**
- Tokenization
- POS Tagging (notice imperative verbs)
- Stopword Removal

**Expected Results:**
- Action verbs: Preheat, Mix, Add, Pour, bake
- Numbers removed by cleaning
- Imperative verb forms in POS tags (VB, VBP)

---

## 9. Customer Support Conversation

```
Thank you for contacting support. We apologize for the inconvenience you're experiencing. Our team is investigating the issue immediately. We'll provide updates within 24 hours. Your satisfaction is our priority.
```

**Try with:**
- Lemmatization (experiencing → experience)
- Bag of Words
- Term Frequency

**Expected Results:**
- Formal customer service vocabulary
- Word frequency showing emphasis on resolution
- Professional tone preserved

---

## 10. Literary Text

```
The autumn leaves danced gracefully through the crisp air. Golden sunlight filtered through the ancient oak trees. A gentle breeze whispered secrets only nature could understand. Time seemed to pause in this tranquil moment.
```

**Try with:**
- Full Preprocessing
- Vocabulary (descriptive words)
- POS Tagging (notice adjectives and adverbs)

**Expected Results:**
- Rich descriptive vocabulary
- Multiple adjectives: autumn, crisp, golden, ancient, gentle, tranquil
- Poetic language patterns

---

## 11. Code Documentation

```
The function initializes the database connection and validates user credentials. It returns a boolean indicating success or failure. Error handling ensures graceful degradation when connection fails. Logging captures all authentication attempts for security monitoring.
```

**Try with:**
- Vocabulary (technical terms)
- Lemmatization
- Stopword Removal

**Expected Results:**
- Technical vocabulary: initializes, validates, credentials, authentication
- Programming concepts retained
- Clear technical communication

---

## 12. Long-form Content (Testing Performance)

```
Artificial intelligence represents one of the most transformative technologies of the 21st century. Machine learning algorithms enable computers to learn from data without explicit programming. Deep learning networks mimic human brain structures using interconnected layers of artificial neurons. Natural language processing allows machines to understand and generate human language. Computer vision systems can identify objects and patterns in images. Reinforcement learning teaches AI through trial and error. These technologies combine to create intelligent systems that augment human capabilities across countless domains including healthcare, finance, transportation, and education.
```

**Try with:**
- Full Preprocessing
- TF-IDF (shows term importance across multiple sentences)
- Vocabulary (comprehensive technical terms)

**Expected Results:**
- Large vocabulary of AI/ML terms
- TF-IDF highlighting key concepts
- Performance remains fast even with longer text

---

## Custom Testing Ideas

### Test Stopword Removal Effectiveness
Use text with many common words:
```
The cat is on the mat and the dog is by the door.
```

### Test Lemmatization vs Stemming
Use various word forms:
```
Running runner runs ran. Flying flyer flies flew. Swimming swimmer swims swam.
```

### Test TF-IDF Sentence Detection
Use repeated words across sentences:
```
Dogs are loyal. Dogs are friendly. Cats are independent. Cats are curious.
```

### Test POS Tagging Accuracy
Use diverse grammatical structures:
```
The quick brown fox quickly jumped. Jump quickly! Jumping is fun.
```

### Test Custom Stopwords
Add domain-specific stopwords:
```
The Python code uses Python libraries. Python is great for data science.
```
**Custom Stopwords:** `["python", "code"]`

---

## Expected Processing Times

| Text Length | Processing Time |
|------------|----------------|
| < 50 words | < 50ms |
| 50-200 words | 50-200ms |
| 200-500 words | 200-500ms |
| 500+ words | < 1 second |

---

## Tips for Testing

1. **Start Simple**: Try sample 1 first with basic operations
2. **Compare Operations**: Use sample 13 to see lemmatization vs stemming differences
3. **Test Dependencies**: Select only TF-IDF and watch all required steps run automatically
4. **Try Custom Stopwords**: Use sample 15 with custom stopwords
5. **Check Performance**: Use sample 12 to test with longer text
6. **Explore POS Tags**: Use sample 10 for rich grammatical diversity
7. **Test Cleaning**: Use sample 6 with lots of special characters

---

## Understanding Results

### Good Vocabulary Size
- Short text (< 100 words): 15-30 unique words
- Medium text (100-300 words): 40-80 unique words
- Long text (300+ words): 100+ unique words

### TF-IDF Interpretation
- **0.0**: Word appears in all sentences (very common)
- **0.1-0.3**: Moderately unique across sentences
- **0.3+**: Highly distinctive words

### Common POS Tags
- **NN/NNS**: Nouns (cat/cats)
- **VB/VBD/VBZ**: Verbs (run/ran/runs)
- **JJ**: Adjectives (beautiful)
- **RB**: Adverbs (quickly)
- **DT**: Determiners (the, a)
- **IN**: Prepositions (in, on)

Happy testing!
