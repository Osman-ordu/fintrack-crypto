import Constants from 'expo-constants';
import { allowedEndpoints } from '@/db';

/**
 * Get API URL from environment variables
 * Supports both .env file and Expo Constants
 * Priority: EXPO_PUBLIC_FOREIGN_API_URL > Constants.expoConfig.extra.apiUrl
 */
export const apiEnvUrl = 
  process.env.EXPO_PUBLIC_FOREIGN_API_URL ||    
  Constants.expoConfig?.extra?.apiUrl ||
  '';

/**
 * Get API Key from environment variables
 */
export const apiEnvKey = 
  process.env.EXPO_PUBLIC_FOREIGN_API_KEY || 
  Constants.expoConfig?.extra?.apiKey ||
  '';

/**
 * Check if we're in development mode
 */
export const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

/**
 * Check if we're in production mode
 */
export const isProduction = !__DEV__ && process.env.NODE_ENV === 'production';

/**
 * Get current environment name
 */
export const getEnvironment = (): 'development' | 'production' | 'test' => {
  if (isDevelopment) return 'development';
  if (process.env.NODE_ENV === 'test') return 'test';
  return 'production';
};

/**
 * Validate that API URL is configured
 */
export const validateApiConfig = (): boolean => {
  if (!apiEnvUrl) {
    console.warn(
      '⚠️ API URL is not configured. Please set EXPO_PUBLIC_FOREIGN_API_URL in your .env file or app.json'
    );
    return false;
  }
  return true;
};

/**
 * Check if request method and URL are allowed for success toast
 */
export const isAllowedRequest = (method: any, url: any): boolean => {
  if (method === 'GET') return true;
  return [...allowedEndpoints].some((endpoint) => url.includes(endpoint));
};

/**
 * Clean and validate numeric input (allows only numbers and single decimal point)
 * @param text - Input text to clean
 * @returns Cleaned text with only numbers and single decimal point
 */
export const cleanNumericInput = (text: string): string => {
  let cleanedText = text.replace(/[^0-9.,]/g, '');
  cleanedText = cleanedText.replace(',', '.');
  const parts = cleanedText.split('.');
  if (parts.length > 2) {
    cleanedText = parts[0] + '.' + parts.slice(1).join('');
  }
  return cleanedText;
};

/**
 * Format date to Turkish format: DD/MM/YYYY/HH:mm
 * @param date - Date object or date string
 * @returns Formatted date string in format: 27/12/2025/15:45
 */
export const formatTransactionDate = (date: Date | string | number): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}/${hours}:${minutes}`;
};