// API configuration for MediMate Healthcare backend
import { API_CONFIG } from './config';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface MediMateQueryRequest {
  agent_name: string;
  message: string;
}

export interface MediMateQueryResponse {
  response: string;
  agent_name?: string;
  timestamp?: string;
}

export interface PatientRegistration {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
}

export interface EmergencyAlert {
  patient_name: string;
  condition: string;
}

export interface MedicineReminder {
  phone: string;
  medicine_name: string;
  reminder_time: string;
}

export interface ServiceInfo {
  id: number;
  name: string;
  description: string;
  agent_name: string;
}

export class MediMateAPI {
  private baseURL: string;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  async sendQuery(message: string, agentName: string = 'Health Check Agent'): Promise<MediMateQueryResponse> {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.QUERY}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({
          agent_name: agentName,
          message: message
        } as MediMateQueryRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending query:', error);
      throw error;
    }
  }

  async registerPatient(patientData: PatientRegistration): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  }

  async sendEmergencyAlert(patient_name: string, condition: string): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.EMERGENCY}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({
          patient_name: patient_name,
          condition: condition
        } as EmergencyAlert),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      throw error;
    }
  }

  async setMedicineReminder(reminderData: MedicineReminder): Promise<{ status: string; phone: string; medicine: string; time: string }> {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.MEDICINE_REMINDER}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(reminderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error setting medicine reminder:', error);
      throw error;
    }
  }

  async getServices(): Promise<ServiceInfo[]> {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.SERVICES}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting services:', error);
      throw error;
    }
  }

  // Health check endpoint - using services endpoint since /health doesn't exist
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.SERVICES}`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const mediMateAPI = new MediMateAPI();

// All available agents from your backend
export const AVAILABLE_AGENTS = [
  'Welcome Agent',
  'Health Check Agent', 
  'COVID-19 Agent',
  'Emergency Agent',
  'Medicine Reminder Agent',
  'Diet Agent',
  'Mental Health Agent',
  'Registration Agent'
];

// Agent name mapping for different categories
export const AGENT_MAPPING = {
  'general': 'Welcome Agent',
  'diagnosis': 'Health Check Agent',
  'treatment': 'Health Check Agent',
  'emergency': 'Emergency Agent',
  'records': 'Registration Agent',
  'analysis': 'Health Check Agent',
  'covid': 'COVID-19 Agent',
  'medicine': 'Medicine Reminder Agent',
  'diet': 'Diet Agent',
  'mental': 'Mental Health Agent'
};

// Utility function to get agent name based on category
export function getAgentName(category: string): string {
  return AGENT_MAPPING[category.toLowerCase() as keyof typeof AGENT_MAPPING] || 'Welcome Agent';
}

// Legacy compatibility - keeping the old function name
export const medicalAPI = {
  sendMessage: async (message: string, category: string = 'general') => {
    const agentName = getAgentName(category);
    const response = await mediMateAPI.sendQuery(message, agentName);
    return {
      response: response.response,
      agent_name: response.agent_name,
      timestamp: response.timestamp
    };
  }
};

// Utility function to format MediMate responses
export function formatMediMateResponse(response: MediMateQueryResponse): string {
  let formatted = response.response;
  
  if (response.agent_name) {
    formatted += `\n\n👨‍⚕️ Specialist: ${response.agent_name.replace('_', ' ').toUpperCase()}`;
  }
  
  if (response.timestamp) {
    formatted += `\n📅 Response Time: ${new Date(response.timestamp).toLocaleString()}`;
  }
  
  return formatted;
}

// Keep the old function for backward compatibility
export const formatMedicalResponse = formatMediMateResponse; 