# NLP Text Processing Lab

A minimalist, futuristic web application for interactive NLP text preprocessing operations. Built with React, Tailwind CSS, Framer Motion (frontend) and FastAPI with NLTK (backend).

## Features

- **Split Layout Design**: LeetCode-style interface with input on left, results on right
- **Dark/Light Theme**: Smooth theme toggle with persistent preferences
- **11 NLP Operations**:
  - Tokenization
  - Lowercasing
  - Stopword Removal
  - Lemmatization
  - Stemming
  - Vocabulary Extraction
  - Bag of Words
  - Term Frequency (TF)
  - TF-IDF (sentence-level document frequency)
  - POS Tagging
  - Full Preprocessing Pipeline
- **Smart Dependency Resolution**: Automatically runs required preprocessing steps
- **Real-time Processing**: Interactive results with collapsible cards
- **Beautiful Animations**: Smooth transitions and micro-interactions
- **Copy to Clipboard**: Easy result copying with visual feedback

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Vite as build tool

### Backend
- FastAPI (Python)
- NLTK for NLP operations
- Uvicorn ASGI server
- Pydantic for validation

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- pip and venv

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Create and activate virtual environment**:
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

4. **Download NLTK data** (automatic on first run, but you can pre-download):
```bash
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet'); nltk.download('averaged_perceptron_tagger'); nltk.download('averaged_perceptron_tagger_eng')"
```

5. **Run the FastAPI server**:
```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **From the project root directory**, install dependencies:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## API Documentation

Once the backend is running, visit:
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

### API Endpoints

#### `POST /process`

Process text with selected NLP operations.

**Request Body**:
```json
{
  "text": "The quick brown fox jumps over the lazy dog. Natural Language Processing is amazing!",
  "options": {
    "tokenization": true,
    "lowercasing": true,
    "stopword_removal": true,
    "lemmatization": true,
    "vocabulary": true,
    "bag_of_words": true,
    "tf": true,
    "tfidf": true,
    "pos_tagging": true
  },
  "custom_stopwords": ["quick", "lazy"]
}
```

**Response**:
```json
{
  "original_text": "The quick brown fox...",
  "cleaned_text": "The quick brown fox...",
  "lowercased_text": "the quick brown fox...",
  "tokens": ["the", "quick", "brown", ...],
  "filtered_tokens": ["brown", "fox", ...],
  "lemmatized_tokens": ["brown", "fox", ...],
  "vocabulary": ["amazing", "brown", ...],
  "bag_of_words": {"amazing": 1, "brown": 1, ...},
  "term_frequency": {"amazing": 0.0909, ...},
  "tfidf": {"amazing": 0.0631, ...},
  "pos_tags": [["The", "DT"], ["quick", "JJ"], ...]
}
```

#### `POST /full`

Run the complete preprocessing pipeline.

**Request Body**:
```json
{
  "text": "Your text here",
  "custom_stopwords": ["optional", "words"]
}
```

#### `GET /health`

Health check endpoint.

**Response**:
```json
{
  "status": "healthy",
  "service": "NLP Text Processing Lab API",
  "version": "1.0.0"
}
```

### Example cURL Request

```bash
curl -X POST "http://localhost:8000/process" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Natural Language Processing is fascinating!",
    "options": {
      "tokenization": true,
      "lowercasing": true,
      "vocabulary": true
    }
  }'
```

### Example JavaScript Fetch

```javascript
const response = await fetch('http://localhost:8000/process', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Natural Language Processing is fascinating!',
    options: {
      tokenization: true,
      lowercasing: true,
      stopword_removal: true,
      lemmatization: true,
      vocabulary: true,
      bag_of_words: true,
      tf: true,
      tfidf: true,
      pos_tagging: true
    }
  })
});

const results = await response.json();
console.log(results);
```

## NLP Pipeline Details

### Dependency Resolution

The backend automatically resolves dependencies between operations. For example:
- Selecting **TF-IDF** automatically runs: clean → lowercase → tokenize → remove stopwords → lemmatize → vocabulary → bag of words → TF → TF-IDF
- Selecting **Lemmatization** automatically runs: clean → lowercase → tokenize → remove stopwords → lemmatize

### TF-IDF Implementation

TF-IDF uses **sentence-level document frequency**:
1. Text is split into sentences using `.`, `!`, `?` as delimiters
2. Document frequency = number of sentences containing the token
3. IDF = log(total_sentences / document_frequency)
4. TF-IDF = TF × IDF

### POS Tagging

Uses NLTK's averaged perceptron tagger. Common tags:
- `NN`: Noun
- `VB`: Verb
- `JJ`: Adjective
- `RB`: Adverb
- `DT`: Determiner
- And more...

## Project Structure

```
nlp-text-processing-lab/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── nlp_pipeline.py      # NLP processing logic
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── InputPanel.tsx
│   │   ├── Navbar.tsx
│   │   ├── OptionsPanel.tsx
│   │   ├── OutputPanel.tsx
│   │   └── ResultCard.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Usage Tips

1. **Start Simple**: Begin with basic operations like Tokenization and Lowercasing
2. **Use Full Preprocessing**: For a complete analysis, select "Full Preprocessing"
3. **Custom Stopwords**: Add domain-specific stopwords for better results
4. **Copy Results**: Click the copy icon on any result card to copy to clipboard
5. **Expand/Collapse**: Click card headers to expand or collapse result sections

## Troubleshooting

### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'nltk'`
- **Solution**: Make sure you're in the virtual environment and run `pip install -r requirements.txt`

**Issue**: NLTK data not found
- **Solution**: Run the NLTK download commands from the setup section

**Issue**: Port 8000 already in use
- **Solution**: Change the port: `uvicorn main:app --reload --port 8001`

### Frontend Issues

**Issue**: `Cannot connect to backend server`
- **Solution**: Ensure the FastAPI backend is running on port 8000
- Check that the backend URL in `src/services/api.ts` matches your setup

**Issue**: CORS errors
- **Solution**: The backend is configured with permissive CORS for development. For production, update the `allow_origins` in `backend/main.py`

## Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
npm test
```

### Building for Production
```bash
# Frontend
npm run build

# Backend (using Docker)
docker build -t nlp-backend ./backend
docker run -p 8000:8000 nlp-backend
```

## License

MIT License - feel free to use this project for learning and teaching purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Built with love for AI learners worldwide. Special thanks to the NLTK, FastAPI, React, and Tailwind CSS communities.
