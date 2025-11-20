// API related types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, any>;
  search?: string;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: QueryParams;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  growthRate: number;
}

export interface Activity {
  id: string;
  type: 'login' | 'purchase' | 'signup' | 'update';
  description: string;
  timestamp: string;
  userId: string;
  metadata?: Record<string, any>;
}
