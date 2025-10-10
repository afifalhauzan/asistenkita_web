/**
 * Core API Client
 * Centralized API handling with Axios, interceptors, and error management
 */

import axios from 'axios';
// Using generic types for compatibility with different axios versions
type AxiosInstance = any;
type AxiosRequestConfig = any;
type AxiosResponse = any;
type AxiosError = any;
type InternalAxiosRequestConfig = any;
import { databases } from '@/lib/appwrite';
import { 
  APPWRITE_CONFIG, 
  REQUEST_CONFIG, 
  ERROR_MESSAGES, 
  HTTP_STATUS,
  isDevelopment 
} from './config';
import type { ApiResponse, ApiError, RequestOptions } from '@/types/api';

class ApiClient {
  private axiosInstance: AxiosInstance;
  private requestCount = 0;

  constructor() {
    // Create Axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: APPWRITE_CONFIG.endpoint,
      timeout: REQUEST_CONFIG.timeout,
      headers: {
        ...REQUEST_CONFIG.headers,
        'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        this.requestCount++;
        
        // Add API key if available
        if (APPWRITE_CONFIG.apiKey) {
          config.headers['X-Appwrite-Key'] = APPWRITE_CONFIG.apiKey;
        }

        // Add timestamp for cache busting in development
        if (isDevelopment) {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        // Log request in development
        if (isDevelopment) {
          console.log(`🚀 API Request #${this.requestCount}:`, {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error: AxiosError) => {
        console.error('❌ Request Interceptor Error:', error);
        return Promise.reject(this.handleError(error));
      }
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (isDevelopment) {
          console.log(`✅ API Response:`, {
            status: response.status,
            data: response.data,
            url: response.config.url,
          });
        }

        return response;
      },
      async (error: AxiosError) => {
        console.error('❌ Response Interceptor Error:', error);
        
        // Handle token refresh for 401 errors
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          // Try to refresh token or redirect to login
          await this.handleUnauthorized();
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle unauthorized errors
   */
  private async handleUnauthorized(): Promise<void> {
    if (typeof window !== 'undefined') {
      // Clear local storage and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }

  /**
   * Handle and format errors
   */
  private handleError(error: AxiosError): ApiError {
    let message: string = ERROR_MESSAGES.unknown;
    let code: string | number = 'UNKNOWN_ERROR';

    if (error.code === 'ECONNABORTED') {
      message = ERROR_MESSAGES.timeout;
      code = 'TIMEOUT';
    } else if (error.code === 'ERR_NETWORK') {
      message = ERROR_MESSAGES.network;
      code = 'NETWORK_ERROR';
    } else if (error.response) {
      const status = error.response.status;
      code = status;

      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          message = error.response.data?.message || ERROR_MESSAGES.validation;
          break;
        case HTTP_STATUS.UNAUTHORIZED:
          message = ERROR_MESSAGES.unauthorized;
          break;
        case HTTP_STATUS.FORBIDDEN:
          message = ERROR_MESSAGES.forbidden;
          break;
        case HTTP_STATUS.NOT_FOUND:
          message = ERROR_MESSAGES.notFound;
          break;
        case HTTP_STATUS.VALIDATION_ERROR:
          message = error.response.data?.message || ERROR_MESSAGES.validation;
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          message = ERROR_MESSAGES.serverError;
          break;
        default:
          message = error.response.data?.message || ERROR_MESSAGES.unknown;
      }
    }

    return {
      success: false,
      message,
      code,
      details: error.response?.data,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Retry mechanism for failed requests
   */
  private async retryRequest<T>(
    requestFn: () => Promise<any>,
    retries: number = REQUEST_CONFIG.retries
  ): Promise<any> {
    let lastError: AxiosError;

    for (let i = 0; i <= retries; i++) {
      try {
        return await requestFn();
      } catch (error: unknown) {
        lastError = error as AxiosError;
        
        // Don't retry on client errors (4xx)
        if ((error as any)?.response?.status && (error as any).response.status < 500) {
          throw error;
        }

        if (i < retries) {
          const delay = REQUEST_CONFIG.retryDelay * Math.pow(2, i); // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
          
          if (isDevelopment) {
            console.log(`🔄 Retrying request (${i + 1}/${retries}) in ${delay}ms...`);
          }
        }
      }
    }

    throw lastError!;
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig & RequestOptions): Promise<ApiResponse<T>> {
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.get(url, config), 
        config?.retries
      );
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig & RequestOptions): Promise<ApiResponse<T>> {
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post(url, data, config), 
        config?.retries
      );
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig & RequestOptions): Promise<ApiResponse<T>> {
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.put(url, data, config), 
        config?.retries
      );
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig & RequestOptions): Promise<ApiResponse<T>> {
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.patch(url, data, config), 
        config?.retries
      );
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig & RequestOptions): Promise<ApiResponse<T>> {
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.delete(url, config), 
        config?.retries
      );
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Direct Appwrite Database access (for when we need to use Appwrite SDK directly)
   */
  get appwriteDatabase() {
    return databases;
  }

  /**
   * Get request count (for debugging)
   */
  getRequestCount(): number {
    return this.requestCount;
  }

  /**
   * Reset request count
   */
  resetRequestCount(): void {
    this.requestCount = 0;
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export the class for testing
export { ApiClient };