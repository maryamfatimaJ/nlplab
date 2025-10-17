from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from backend.nlp_pipeline import NLPPipeline  # ✅ Correct relative import

# ------------------------------------------------------
# FastAPI App Configuration
# ------------------------------------------------------
app = FastAPI(
    title="NLP Text Processing Lab API",
    description="Backend API for NLP text preprocessing operations",
    version="1.0.0"
)

# ------------------------------------------------------
# CORS Middleware (Allow requests from frontend)
# ------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------
# Initialize NLP Pipeline
# ------------------------------------------------------
nlp_pipeline = NLPPipeline()

# ------------------------------------------------------
# Pydantic Models
# ------------------------------------------------------
class ProcessOptions(BaseModel):
    tokenization: bool = False
    lowercasing: bool = False
    stopword_removal: bool = False
    lemmatization: bool = False
    stemming: bool = False
    vocabulary: bool = False
    bag_of_words: bool = False
    tf: bool = False
    tfidf: bool = False
    pos_tagging: bool = False
    full_preprocessing: bool = False


class ProcessRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to process")
    options: ProcessOptions
    custom_stopwords: Optional[List[str]] = Field(default=None, description="Custom stopwords to add")


# ------------------------------------------------------
# Routes
# ------------------------------------------------------

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "NLP Text Processing Lab API",
        "version": "1.0.0"
    }


@app.post("/process", response_model=Dict[str, Any])
async def process_text(request: ProcessRequest):
    """
    Process text with selected NLP operations.
    Automatically resolves dependencies between operations.
    """
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="Text input cannot be empty")

        options_dict = request.options.model_dump()
        if not any(options_dict.values()):
            raise HTTPException(
                status_code=400,
                detail="At least one processing option must be selected"
            )

        results = nlp_pipeline.process(
            text=request.text,
            options=options_dict,
            custom_stopwords=request.custom_stopwords
        )

        return results

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")


# ✅ FIXED VERSION OF /full ROUTE
@app.post("/full", response_model=Dict[str, Any])
async def full_preprocessing(request: ProcessRequest):
    """
    Run full preprocessing pipeline on text.
    Returns all intermediate and final results.
    """
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="Text input cannot be empty")

        options = {"full_preprocessing": True}

        results = nlp_pipeline.process(
            text=request.text,
            options=options,
            custom_stopwords=request.custom_stopwords
        )

        return results

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "NLP Text Processing Lab API",
        "version": "1.0.0",
        "endpoints": {
            "health": "GET /health",
            "process": "POST /process",
            "full": "POST /full",
            "docs": "GET /docs"
        },
        "example_request": {
            "text": "The quick brown fox jumps over the lazy dog. NLP is amazing!",
            "options": {
                "tokenization": True,
                "lowercasing": True,
                "stopword_removal": True,
                "lemmatization": True,
                "vocabulary": True,
                "bag_of_words": True,
                "tf": True,
                "tfidf": True,
                "pos_tagging": True
            },
            "custom_stopwords": ["quick", "lazy"]
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
