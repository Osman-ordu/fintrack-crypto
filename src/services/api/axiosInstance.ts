import axios from 'axios';
import { tokenService } from './tokenService';

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FOREIGN_API_URL || 'http://localhost:3000',
  timeout: 15000,
});

axiosInstance.interceptors.request.use(async (config: any) => {
  const token = await tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log request details
  console.log('🚀 [API REQUEST]', {
    method: config.method?.toUpperCase(),
    url: `${config.baseURL}${config.url}`,
    headers: config.headers,
    params: config.params,
    data: config.data,
  });
  
  return config;
});

// Response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('✅ [API RESPONSE SUCCESS]', {
      status: response.status,
      statusText: response.statusText,
      url: `${response.config.baseURL}${response.config.url}`,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Log error response
    console.error('❌ [API RESPONSE ERROR]', {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      url: error?.config ? `${error.config.baseURL}${error.config.url}` : 'Unknown',
      message: error?.message,
      responseData: error?.response?.data,
      error: error,
    });
    return Promise.reject(error);
  }
);
