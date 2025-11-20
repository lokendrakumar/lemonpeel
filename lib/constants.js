// Application constants
export const APP_NAME = 'LemonPeel';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A modern Next.js application';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.lemonpeel.ai/api';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/signin',
    SIGNUP: '/users/signup/admin',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
    REFRESH: '/users/refresh',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    DELETE: '/users/delete',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITIES: '/dashboard/activities',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects/create',
    UPDATE: '/projects/update',
    DELETE: '/projects/delete',
  },
};

// UI constants
export const THEME = {
  COLORS: {
    PRIMARY: '#000000',
    SECONDARY: '#666666',
    SUCCESS: '#10B981',
    ERROR: '#EF4444',
    WARNING: '#F59E0B',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
};

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME_MODE: 'theme_mode',
};

// Default pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};
