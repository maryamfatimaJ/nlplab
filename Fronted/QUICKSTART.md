# Quick Start Guide

Get the NLP Text Processing Lab up and running in 5 minutes!

## Prerequisites Check

Before you start, make sure you have:
- ✓ Node.js 16+ (`node --version`)
- ✓ Python 3.8+ (`python3 --version` or `python --version`)
- ✓ pip (`pip --version`)

## Step 1: Start the Backend (2 minutes)

### On macOS/Linux:

```bash
cd backend
chmod +x start.sh
./start.sh
```

### On Windows:

```bash
cd backend
start.bat
```

### Manual Setup (if scripts don't work):

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate it
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet'); nltk.download('averaged_perceptron_tagger'); nltk.download('averaged_perceptron_tagger_eng')"

# Start server
uvicorn main:app --reload --port 8000
```

**Expected Output**:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

## Step 2: Start the Frontend (1 minute)

Open a **new terminal window**, navigate to the project root:

```bash
npm install
npm run dev
```

**Expected Output**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 3: Open the App

1. Open your browser
2. Go to `http://localhost:5173`
3. You should see the NLP Text Processing Lab interface!

## Quick Test

1. **Enter some text** in the left panel:
   ```
   Natural Language Processing is amazing! It helps computers understand human language.
   ```

2. **Select some options**:
   - ✓ Tokenization
   - ✓ Lowercasing
   - ✓ Stopword Removal
   - ✓ Vocabulary

3. **Click "Run Preprocessing"**

4. **See the results** appear on the right panel!

## Common Issues & Solutions

### Backend Issues

**Problem**: `command not found: uvicorn`
- **Solution**: Make sure you activated the virtual environment
  ```bash
  source venv/bin/activate  # macOS/Linux
  venv\Scripts\activate     # Windows
  ```

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
- **Solution**: Install dependencies
  ```bash
  pip install -r requirements.txt
  ```

**Problem**: Port 8000 already in use
- **Solution**: Either kill the process using port 8000, or change the port:
  ```bash
  uvicorn main:app --reload --port 8001
  ```
  Then update `src/services/api.ts` to use port 8001

### Frontend Issues

**Problem**: `Cannot connect to backend server`
- **Solution**: Make sure the backend is running on http://localhost:8000
- Check the terminal where you started the backend
- Try visiting http://localhost:8000/health in your browser

**Problem**: Page is blank
- **Solution**: Check the browser console for errors (F12)
- Make sure you ran `npm install` before `npm run dev`

**Problem**: Styles not loading
- **Solution**: Clear browser cache and refresh
- Try `npm run build` to check for build errors

## Next Steps

1. **Explore the API**: Visit http://localhost:8000/docs for interactive API documentation
2. **Read Examples**: Check `backend/EXAMPLES.md` for API usage examples
3. **Try Different Options**: Experiment with different NLP operations
4. **Test Full Pipeline**: Select "Full Preprocessing" to run all operations at once

## Stopping the Servers

### Backend:
- Press `Ctrl+C` in the backend terminal
- Deactivate virtual environment: `deactivate`

### Frontend:
- Press `Ctrl+C` in the frontend terminal

## Tips for Best Results

1. **Multi-sentence Text**: Works better with multiple sentences for TF-IDF
2. **Punctuation**: The cleaner handles it automatically
3. **Case Sensitivity**: Everything is lowercased by default in processing
4. **Dependencies**: Higher-level operations (like TF-IDF) automatically run required steps
5. **Copy Results**: Use the copy button on result cards for easy sharing

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (localhost:5173)              │
│  ┌─────────────────────────────────────────────────┐   │
│  │         React Frontend (TypeScript)              │   │
│  │  - Split Layout (Input | Output)                 │   │
│  │  - Theme Toggle (Dark/Light)                     │   │
│  │  - Framer Motion Animations                      │   │
│  └──────────────────┬──────────────────────────────┘   │
└─────────────────────┼───────────────────────────────────┘
                      │
                 HTTP POST /process
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│           FastAPI Backend (localhost:8000)               │
│  ┌─────────────────────────────────────────────────┐   │
│  │          Python NLP Pipeline                     │   │
│  │  - NLTK for tokenization, lemmatization         │   │
│  │  - PorterStemmer for stemming                   │   │
│  │  - Stopwords removal                             │   │
│  │  - TF-IDF calculation                            │   │
│  │  - POS tagging                                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Development Workflow

1. **Make changes** to frontend: Files auto-reload (Vite HMR)
2. **Make changes** to backend: Server auto-reloads (`--reload` flag)
3. **Test immediately**: Changes reflect in the browser

## Ready to Learn?

Start experimenting with different text samples:
- News articles
- Social media posts
- Product reviews
- Academic papers
- Code documentation

Try different combinations of preprocessing steps and observe how they affect the results!

Happy learning!
