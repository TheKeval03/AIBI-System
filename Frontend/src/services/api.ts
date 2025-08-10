
import axios from 'axios';
import { config } from '@/config/environment';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log("🔗 API Base URL:", config.API_BASE_URL);


export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_number: number;
  username: string;
}

export interface RegisterResponse {
  firstname: string;
  lastname: string;
  email: string;
  mobile_number: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  // Define the structure based on your backend response
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile_number: string;
    username: string;
  };
  message?: string;
}

export interface ResumeParsingResponse {
  extracted_text: string;
}

export const authAPI = {
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/login', loginData);
    return response.data;
  },
};

export const resumeAPI = {
  parseResume: async (file: File): Promise<ResumeParsingResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/resume_parsing', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
