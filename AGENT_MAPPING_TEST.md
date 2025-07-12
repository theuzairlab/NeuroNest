# Agent Mapping Test Examples

## Test Messages and Expected Agents:

### 1. Mental Health Issues
**Your Message:** "sometime i emotional every high that my mind is out of control what can i do"
**Expected Agent:** Mental Health Agent
**Keywords Detected:** "emotional", "mind"

### 2. Physical Symptoms
**Your Message:** "in my head headach tell me what i can do"
**Expected Agent:** Health Check Agent
**Keywords Detected:** "headach", "head"

### 3. Emergency Situations
**Your Message:** "help me immediately this is urgent"
**Expected Agent:** Emergency Agent
**Keywords Detected:** "help immediately", "urgent"

### 4. Medicine Questions
**Your Message:** "what medication should i take for pain"
**Expected Agent:** Medicine Reminder Agent
**Keywords Detected:** "medication"

### 5. Diet/Nutrition
**Your Message:** "what food should i eat to lose weight"
**Expected Agent:** Diet Agent
**Keywords Detected:** "food", "weight"

### 6. COVID-19 Related
**Your Message:** "i think i have covid symptoms"
**Expected Agent:** COVID-19 Agent
**Keywords Detected:** "covid"

### 7. General Health
**Your Message:** "hello can you help me"
**Expected Agent:** Welcome Agent
**Keywords Detected:** None (defaults to Welcome Agent)

## How It Works:

1. **Smart Auto-Detection**: The system analyzes your message for keywords
2. **Agent Selection**: Automatically selects the best specialist
3. **Manual Override**: You can manually choose a different agent
4. **Response**: The chosen agent responds with specialized knowledge

## Available Agents:

- **Welcome Agent**: General health information and service overview
- **Health Check Agent**: Symptoms, pain, medical conditions
- **Mental Health Agent**: Emotional support, stress, anxiety, depression
- **Emergency Agent**: Urgent medical situations
- **Medicine Reminder Agent**: Medications, prescriptions, dosages
- **Diet Agent**: Nutrition, food, weight management
- **COVID-19 Agent**: COVID-19 specific information
- **Registration Agent**: Patient registration and records 