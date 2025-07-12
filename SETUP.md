# NeuroNest Medical AI Interface

A beautiful, modern medical AI chat interface built with Next.js, React, and Framer Motion. This interface connects to your FastAPI backend to provide medical assistance, diagnosis support, and treatment recommendations.

## 🚀 Features

- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Medical Categories**: Specialized categories for different medical needs
- **Interactive Chat**: Real-time chat interface with your AI backend
- **Animated Elements**: Smooth Framer Motion animations
- **Medical Icons**: Contextual medical icons that rotate around the main orb
- **Feature Cards**: Quick access to common medical functions

## 🛠️ Technologies Used

- **Next.js 15**: React framework for production
- **React 19**: Latest React features
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **Lucide React**: Beautiful icons

## 📦 Installation

1. **Clone the repository** (already done)
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 FastAPI Backend Setup

To connect this interface to your FastAPI backend, ensure your backend has the following endpoints:

### Required Endpoints:

```python
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    category: str
    timestamp: str

class DiagnosisRequest(BaseModel):
    symptoms: list
    patient_info: dict = None
    timestamp: str

class TreatmentRequest(BaseModel):
    condition: str
    timestamp: str

class AnalyzeRequest(BaseModel):
    health_data: dict
    timestamp: str

@app.post("/chat")
async def chat(request: ChatRequest):
    # Your AI logic here
    return {
        "response": "AI generated medical response",
        "confidence": 0.85,
        "medical_context": "Context about the medical topic",
        "recommendations": ["Recommendation 1", "Recommendation 2"]
    }

@app.post("/diagnosis")
async def diagnosis(request: DiagnosisRequest):
    # Your diagnosis logic here
    return {
        "response": "Possible diagnosis based on symptoms",
        "confidence": 0.92,
        "medical_context": "Medical reasoning for diagnosis",
        "recommendations": ["Consult a physician", "Further tests needed"]
    }

@app.post("/treatment")
async def treatment(request: TreatmentRequest):
    # Your treatment logic here
    return {
        "response": "Treatment recommendations",
        "confidence": 0.88,
        "medical_context": "Treatment rationale",
        "recommendations": ["Prescribed medication", "Lifestyle changes"]
    }

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    # Your analysis logic here
    return {
        "response": "Health data analysis results",
        "confidence": 0.90,
        "medical_context": "Analysis context and insights",
        "recommendations": ["Monitor vitals", "Schedule follow-up"]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}
```

## ⚙️ Configuration

### API Configuration

Update the API URL in `app/utils/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Change to your FastAPI URL
  // ... other config
};
```

### Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-medical-api.com
```

## 🎨 UI Components

### Main Features:

1. **Animated Orb**: Central 3D animated orb with rotating medical icons
2. **Feature Cards**: Three main feature cards for quick access:
   - Medical Diagnosis Assistant
   - Treatment Recommendations
   - Health Data Analysis
3. **Category Tabs**: Navigation between different medical categories
4. **Chat Interface**: Real-time chat with your AI backend
5. **Input Field**: Smart input with loading states

### Animations:

- **Smooth transitions**: All elements animate smoothly using Framer Motion
- **Hover effects**: Interactive hover states on all clickable elements
- **Loading states**: Beautiful loading animations during API calls
- **Staggered animations**: Elements appear in sequence for better UX

## 📱 Usage

### Starting a Conversation:

1. **Select a category** from the tabs (General, Diagnosis, Treatment, etc.)
2. **Click a feature card** to get started with pre-filled text
3. **Type your question** in the input field
4. **Press Enter** or click the send button

### Chat Features:

- **Real-time responses** from your medical AI
- **Formatted responses** with confidence levels and recommendations
- **Persistent chat history** during the session
- **Error handling** for connection issues

## 🔍 Customization

### Styling:

- Colors and gradients can be modified in the Tailwind classes
- Animations can be adjusted in the Framer Motion props
- Layout can be customized by modifying the grid and flex properties

### Medical Categories:

Update the categories array in `app/page.tsx`:

```typescript
const categories = ['General', 'Diagnosis', 'Treatment', 'Records', 'Analysis'];
```

### Feature Cards:

Modify the features array to add/remove cards:

```typescript
const features = [
  {
    title: 'Your Feature',
    description: 'Feature description',
    icon: <YourIcon className="w-8 h-8" />,
    gradient: 'from-blue-500 to-purple-600',
    onClick: () => {
      // Your click handler
    }
  }
];
```

## 🚨 Error Handling

The interface includes comprehensive error handling:

- **Connection errors**: Graceful fallback when backend is unavailable
- **Loading states**: Clear feedback during API calls
- **Input validation**: Prevents empty messages
- **User feedback**: Clear error messages for users

## 🔧 Development

### Available Scripts:

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Project Structure:

```
app/
├── page.tsx           # Main page component
├── layout.tsx         # Root layout
├── globals.css        # Global styles
└── utils/
    ├── api.ts         # API utilities
    └── config.ts      # Configuration
```

## 📦 Deployment

### Deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production:

```env
NEXT_PUBLIC_API_URL=https://your-production-api.com
```

## 🎯 Next Steps

1. **Connect your FastAPI backend** using the provided endpoints
2. **Test the interface** with real medical data
3. **Customize the styling** to match your brand
4. **Add authentication** if needed
5. **Deploy to production**

## 🤝 Support

For issues or questions about the interface, please check:

1. **FastAPI backend** is running on the correct port
2. **CORS settings** are configured properly
3. **API endpoints** match the expected format
4. **Network connectivity** between frontend and backend

---

**Your beautiful medical AI interface is ready to use!** 🎉

The interface will automatically connect to your FastAPI backend once it's running on `http://localhost:8000` (or your configured URL). 