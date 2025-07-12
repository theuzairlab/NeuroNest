// Configuration for the MediMate Healthcare API
export const API_CONFIG = {
  // MediMate API Backend URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // API endpoints based on MediMate backend
  ENDPOINTS: {
    QUERY: '/api/query',
    REGISTER: '/api/register',
    EMERGENCY: '/api/emergency',
    MEDICINE_REMINDER: '/api/medicine-reminder',
    SERVICES: '/api/services'
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// FastAPI Backend Sample Endpoints
// Make sure your FastAPI backend has these endpoints:
/*
@app.post("/chat")
async def chat(request: ChatRequest):
    return {
        "response": "AI generated response",
        "confidence": 0.85,
        "medical_context": "Context about the medical topic",
        "recommendations": ["Recommendation 1", "Recommendation 2"]
    }

@app.post("/diagnosis")
async def diagnosis(request: DiagnosisRequest):
    return {
        "response": "Possible diagnosis based on symptoms",
        "confidence": 0.92,
        "medical_context": "Medical reasoning",
        "recommendations": ["See a doctor", "Further tests needed"]
    }

@app.post("/treatment")
async def treatment(request: TreatmentRequest):
    return {
        "response": "Treatment recommendations",
        "confidence": 0.88,
        "medical_context": "Treatment rationale",
        "recommendations": ["Medication", "Lifestyle changes"]
    }

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    return {
        "response": "Health data analysis results",
        "confidence": 0.90,
        "medical_context": "Analysis context",
        "recommendations": ["Monitor vitals", "Schedule follow-up"]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}
*/ 