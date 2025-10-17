# API Usage Examples

## Basic Tokenization

```bash
curl -X POST "http://localhost:8000/process" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello World! This is a test.",
    "options": {
      "tokenization": true
    }
  }'
```

**Response**:
```json
{
  "original_text": "Hello World! This is a test.",
  "cleaned_text": "Hello World This is a test",
  "lowercased_text": "hello world this is a test",
  "tokens": ["hello", "world", "this", "is", "a", "test"]
}
```

## Stopword Removal with Lemmatization

```bash
curl -X POST "http://localhost:8000/process" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The quick brown foxes are jumping over the lazy dogs",
    "options": {
      "stopword_removal": true,
      "lemmatization": true
    }
  }'
```

**Response**:
```json
{
  "original_text": "The quick brown foxes are jumping over the lazy dogs",
  "cleaned_text": "The quick brown foxes are jumping over the lazy dogs",
  "lowercased_text": "the quick brown foxes are jumping over the lazy dogs",
  "tokens": ["the", "quick", "brown", "foxes", "are", "jumping", "over", "the", "lazy", "dogs"],
  "filtered_tokens": ["quick", "brown", "fox", "jumping", "lazy", "dog"],
  "lemmatized_tokens": ["quick", "brown", "fox", "jump", "lazy", "dog"]
}
```

## TF-IDF Calculation

```bash
curl -X POST "http://localhost:8000/process" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Natural language processing is amazing. Processing text is fun!",
    "options": {
      "tfidf": true
    }
  }'
```

**Response** (abbreviated):
```json
{
  "original_text": "Natural language processing is amazing. Processing text is fun!",
  "vocabulary": ["amazing", "fun", "language", "natural", "processing", "text"],
  "bag_of_words": {
    "amazing": 1,
    "fun": 1,
    "language": 1,
    "natural": 1,
    "processing": 2,
    "text": 1
  },
  "term_frequency": {
    "amazing": 0.1667,
    "fun": 0.1667,
    "language": 0.1667,
    "natural": 0.1667,
    "processing": 0.3333,
    "text": 0.1667
  },
  "tfidf": {
    "amazing": 0.1155,
    "fun": 0.1155,
    "language": 0.1155,
    "natural": 0.1155,
    "processing": 0.0,
    "text": 0.1155
  }
}
```

## POS Tagging

```bash
curl -X POST "http://localhost:8000/process" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The beautiful sunset painted the sky orange",
    "options": {
      "pos_tagging": true
    }
  }'
```

**Response**:
```json
{
  "original_text": "The beautiful sunset painted the sky orange",
  "pos_tags": [
    ["the", "DT"],
    ["beautiful", "JJ"],
    ["sunset", "NN"],
    ["painted", "VBD"],
    ["the", "DT"],
    ["sky", "NN"],
    ["orange", "NN"]
  ]
}
```

## Custom Stopwords

```bash
curl -X POST "http://localhost:8000/process" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Python is great and JavaScript is awesome",
    "options": {
      "stopword_removal": true,
      "vocabulary": true
    },
    "custom_stopwords": ["python", "javascript"]
  }'
```

**Response**:
```json
{
  "original_text": "Python is great and JavaScript is awesome",
  "filtered_tokens": ["great", "awesome"],
  "vocabulary": ["awesome", "great"]
}
```

## Full Preprocessing Pipeline

```bash
curl -X POST "http://localhost:8000/full" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Natural Language Processing makes AI systems understand human language!"
  }'
```

**Response**: Returns all preprocessing steps (cleaned text, tokens, vocabulary, BoW, TF, TF-IDF, POS tags, etc.)

## JavaScript Fetch Examples

### Basic Request

```javascript
async function processText(text, options) {
  const response = await fetch('http://localhost:8000/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, options })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Usage
const result = await processText(
  "Machine learning is fascinating!",
  {
    tokenization: true,
    lemmatization: true,
    vocabulary: true
  }
);

console.log(result.vocabulary);
```

### Full Pipeline

```javascript
async function runFullPipeline(text) {
  const response = await fetch('http://localhost:8000/full', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text })
  });

  return await response.json();
}

// Usage
const results = await runFullPipeline(
  "Deep learning revolutionizes artificial intelligence!"
);

console.log('Vocabulary:', results.vocabulary);
console.log('TF-IDF:', results.tfidf);
console.log('POS Tags:', results.pos_tags);
```

### With Error Handling

```javascript
async function safeProcessText(text, options) {
  try {
    const response = await fetch('http://localhost:8000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, options })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Processing failed');
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Usage
const result = await safeProcessText("Test text", { tokenization: true });
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Python Requests Example

```python
import requests

url = "http://localhost:8000/process"

payload = {
    "text": "Natural Language Processing is amazing!",
    "options": {
        "tokenization": True,
        "lemmatization": True,
        "vocabulary": True,
        "tfidf": True
    }
}

response = requests.post(url, json=payload)
results = response.json()

print("Vocabulary:", results["vocabulary"])
print("TF-IDF:", results["tfidf"])
```

## Common POS Tags Reference

- `CC`: Coordinating conjunction (and, or)
- `DT`: Determiner (the, a, an)
- `IN`: Preposition (in, of, on)
- `JJ`: Adjective (big, fast, beautiful)
- `NN`: Noun, singular (dog, car)
- `NNS`: Noun, plural (dogs, cars)
- `NNP`: Proper noun, singular (John, London)
- `RB`: Adverb (quickly, very)
- `VB`: Verb, base form (run, eat)
- `VBD`: Verb, past tense (ran, ate)
- `VBG`: Verb, gerund (running, eating)
- `VBN`: Verb, past participle (eaten, run)
- `VBP`: Verb, non-3rd person singular present (run, eat)
- `VBZ`: Verb, 3rd person singular present (runs, eats)
