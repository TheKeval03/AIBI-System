// Environment configuration
export const config = {
  // Update this URL to match your backend server
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  
  // Other configuration options
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['application/pdf'],
  
  // Admin configuration
  ADMIN_EMAILS: ['admin@aibi.com', 'admin@example.com'],
};
