
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';
import { config } from '@/config/environment';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, username: string, email: string, mobile: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('aibi_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('aibi_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt for email:', email);
    
    try {
      // Call the actual backend API
      const response = await authAPI.login({ email, password });
      
      console.log('Login response received:', response);
      
      if (!response.user) {
        throw new Error('Invalid response from server');
      }
      
      const loggedInUser: User = {
        id: response.user.id,
        firstName: response.user.firstname,
        lastName: response.user.lastname,
        username: response.user.username,
        email: response.user.email,
        mobile: response.user.mobile_number,
        isAdmin: config.ADMIN_EMAILS.includes(email)
      };
      
      setUser(loggedInUser);
      localStorage.setItem('aibi_user', JSON.stringify(loggedInUser));
      
      console.log('User logged in successfully:', loggedInUser);
      
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        detail: error.response?.data?.detail
      });
      
      // Handle specific backend errors with proper error messages
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.response?.status === 404) {
        throw new Error('No account found with this email address');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid request. Please check your input.');
      } else if (error.response?.status === 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else if (error.message === 'Network Error') {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  };

  const register = async (firstName: string, lastName: string, username: string, email: string, mobile: string, password: string) => {
    console.log('Register attempt for email:', email);
    
    try {
      // Call the actual backend API
      const response = await authAPI.register({
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        mobile_number: parseInt(mobile.replace(/\D/g, '')), // Convert to number, remove non-digits
        password: password
      });

      console.log('Registration response:', response);
      
      const newUser: User = {
        id: Date.now().toString(), // Backend should return user ID
        firstName: response.firstname,
        lastName: response.lastname,
        username: response.username,
        email: response.email,
        mobile: response.mobile_number,
        isAdmin: config.ADMIN_EMAILS.includes(email)
      };
      
      setUser(newUser);
      localStorage.setItem('aibi_user', JSON.stringify(newUser));
      
      console.log('User registered successfully:', newUser);
      
    } catch (error: any) {
      console.error('Registration error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        detail: error.response?.data?.detail
      });
      
      // Handle specific backend errors
      if (error.response?.status === 500 && error.response?.data?.detail?.includes('already exists')) {
        throw new Error('User already exists with this email or username');
      } else if (error.response?.status === 400) {
        throw new Error(error.response?.data?.detail || 'Invalid registration data');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else if (error.message === 'Network Error') {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aibi_user');
    console.log('User logged out');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
