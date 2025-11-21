import { API_BASE_URL, API_ENDPOINTS } from './constants';

// API utility functions
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL;

class ApiClient {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL;
  }

  // Get auth headers
  getAuthHeaders() {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request(endpoint, options = {}) {
    // Handle full URLs
    const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create and export a default instance
const api = new ApiClient();

// Export API endpoints for easy access
export const ENDPOINTS = API_ENDPOINTS;

// Convenience methods for common API calls
export const authApi = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  signup: (userData) => api.post(API_ENDPOINTS.AUTH.SIGNUP, userData),
  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT, {}),
};

export const projectsApi = {
  list: () => api.get(API_ENDPOINTS.PROJECTS.LIST),
  create: (projectData) => api.post(API_ENDPOINTS.PROJECTS.CREATE, projectData),
  update: (id, projectData) => api.put(`${API_ENDPOINTS.PROJECTS.UPDATE}/${id}`, projectData),
  delete: (id) => api.delete(`${API_ENDPOINTS.PROJECTS.DELETE}/${id}`),
};

export const usersApi = {
  getProfile: () => api.get(API_ENDPOINTS.USERS.PROFILE),
  updateProfile: (data) => api.put(API_ENDPOINTS.USERS.UPDATE, data),
  getMe: () => api.get(API_ENDPOINTS.USERS.ME),
};

export default api;
