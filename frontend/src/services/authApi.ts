// src/services/authApi.ts
import axios from 'axios';

const API_URL = 'https://jharkhand-tourism1-1.onrender.com/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
}

export interface User {
  isActive: any;
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface OAuthData {
  name: string;
  email: string;
  googleId?: string;
  facebookId?: string;
  avatar?: string;
}

export interface DashboardStats {
  totalTourists: {
    value: number;
    trend: number;
    isPositive: boolean;
  };
  activeHomestays: {
    value: number;
    trend: number;
    isPositive: boolean;
  };
  handicraftSales: {
    value: number;
    currency: string;
    trend: number;
    isPositive: boolean;
  };
  ecoAlerts: {
    value: number;
    critical: number;
    warning: number;
    status: 'critical' | 'warning' | 'normal';
  };
}

export interface PendingApproval {
  id: string;
  type: 'HOMESTAY' | 'GUIDE' | 'PRODUCT' | 'ARTISAN' | 'VENDOR';
  name: string;
  submittedBy: {
    id: string;
    name: string;
    email: string;
  };
  submittedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  details?: any;
}

export interface SystemHealth {
  server: {
    status: 'UP' | 'DOWN' | 'DEGRADED';
    uptime: number;
    cpu: number;
    memory: number;
  };
  database: {
    status: 'CONNECTED' | 'DISCONNECTED';
    latency: number;
    connections: number;
  };
  gis: {
    status: 'RUNNING' | 'STOPPED' | 'ERROR';
    lastSync: string;
  };
  responseTime: {
    avg: number;
    p95: number;
    p99: number;
  };
  lastBackup: string;
  activeUsers: number;
  apiCalls: number;
}

export interface TrendData {
  date: string;
  domestic: number;
  international: number;
  total: number;
}

export interface OccupancyData {
  district: string;
  occupancy: number;
  available: number;
  booked: number;
  revenue: number;
}

export interface RevenueData {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface EnvironmentalData {
  airQuality: {
    index: number;
    level: 'GOOD' | 'MODERATE' | 'UNHEALTHY' | 'HAZARDOUS';
    stations: {
      location: string;
      aqi: number;
    }[];
  };
  waterLevels: {
    location: string;
    level: number;
    status: 'NORMAL' | 'RISING' | 'DANGER';
    timestamp: string;
  }[];
  visitorDensity: {
    destination: string;
    density: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    currentVisitors: number;
    capacity: number;
  }[];
}

// ==================== AUTH FUNCTIONS ====================

/**
 * Login user
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Signup user
 */
export const signupUser = async (userData: SignupData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/signup', userData);
    
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

/**
 * Logout user
 */
export const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Update user profile
 */
export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put('/auth/profile', userData);
    
    if (response.data.success && response.data.data) {
      // Update stored user
      const currentUser = getStoredUser();
      const updatedUser = { ...currentUser, ...response.data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return response.data.data;
    }
    throw new Error('Failed to update profile');
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

/**
 * Change password
 */
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};

// Google OAuth Login
export const googleLogin = async (credential: string): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/google', { credential });
    
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Google login error:', error.response?.data || error.message);
    throw error;
  }
};

// Facebook OAuth Login
export const facebookLogin = async (accessToken: string, userID: string): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/facebook', { accessToken, userID });
    
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Facebook login error:', error.response?.data || error.message);
    throw error;
  }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if user is logged in
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

/**
 * Get stored user
 */
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Get user role
 */
export const getUserRole = (): string | null => {
  const user = getStoredUser();
  return user?.role || null;
};

/**
 * Get user ID
 */
export const getUserId = (): string | null => {
  const user = getStoredUser();
  return user?.id || null;
};

/**
 * Get user name
 */
export const getUserName = (): string | null => {
  const user = getStoredUser();
  return user?.name || null;
};

/**
 * Get user email
 */
export const getUserEmail = (): string | null => {
  const user = getStoredUser();
  return user?.email || null;
};

/**
 * Get token
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Initialize auth - check token on app start
 */
export const initAuth = (): void => {
  const token = getToken();
  if (token) {
    console.log('✅ Auth initialized with token');
  }
};

/**
 * Update stored user
 */
export const updateStoredUser = (userData: Partial<User>): User | null => {
  const currentUser = getStoredUser();
  if (!currentUser) return null;
  
  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};

/**
 * Remove token
 */
export const removeToken = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if token exists (alias for isAuthenticated)
 */
export const hasToken = (): boolean => {
  return isAuthenticated();
};

// ==================== ADMIN DASHBOARD FUNCTIONS ====================

/**
 * Get dashboard statistics
 */
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await api.get('/admin/stats');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Return mock data for development
    return {
      totalTourists: { value: 12450, trend: 12.5, isPositive: true },
      activeHomestays: { value: 128, trend: 8.3, isPositive: true },
      handicraftSales: { value: 860000, currency: 'INR', trend: 15.2, isPositive: true },
      ecoAlerts: { value: 5, critical: 1, warning: 4, status: 'warning' }
    };
  }
};

/**
 * Get pending approvals
 */
export const fetchPendingApprovals = async (params?: {
  type?: string;
  limit?: number;
  offset?: number;
}): Promise<{ approvals: PendingApproval[]; total: number }> => {
  try {
    const response = await api.get('/admin/approvals/pending', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    // Return mock data
    return {
      approvals: [
        {
          id: '1',
          type: 'HOMESTAY',
          name: 'Mountain View Homestay',
          submittedBy: { id: '101', name: 'Ram Singh', email: 'ram@example.com' },
          submittedDate: new Date().toISOString(),
          status: 'PENDING'
        },
        {
          id: '2',
          type: 'GUIDE',
          name: 'Maria Munda',
          submittedBy: { id: '102', name: 'Maria Munda', email: 'maria@example.com' },
          submittedDate: new Date().toISOString(),
          status: 'PENDING'
        }
      ],
      total: 2
    };
  }
};

/**
 * Get system health
 */
export const fetchSystemHealth = async (): Promise<SystemHealth> => {
  try {
    const response = await api.get('/admin/system/health');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching system health:', error);
    return {
      server: { status: 'UP', uptime: 345600, cpu: 45, memory: 62 },
      database: { status: 'CONNECTED', latency: 5, connections: 12 },
      gis: { status: 'RUNNING', lastSync: new Date().toISOString() },
      responseTime: { avg: 245, p95: 380, p99: 520 },
      lastBackup: new Date().toISOString(),
      activeUsers: 234,
      apiCalls: 15234
    };
  }
};

/**
 * Get tourist trends
 */
export const fetchTouristTrends = async (params: {
  range?: string;
  startDate?: string;
  endDate?: string;
  district?: string;
}): Promise<TrendData[]> => {
  try {
    const response = await api.get('/admin/analytics/tourists', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tourist trends:', error);
    return [
      { date: '2024-01-01', domestic: 1200, international: 300, total: 1500 },
      { date: '2024-01-02', domestic: 1350, international: 350, total: 1700 },
      { date: '2024-01-03', domestic: 1100, international: 280, total: 1380 },
      { date: '2024-01-04', domestic: 1400, international: 400, total: 1800 },
      { date: '2024-01-05', domestic: 1600, international: 450, total: 2050 }
    ];
  }
};

/**
 * Get homestay occupancy
 */
export const fetchHomestayOccupancy = async (params?: {
  range?: string;
  district?: string;
}): Promise<OccupancyData[]> => {
  try {
    const response = await api.get('/admin/analytics/homestays', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching homestay occupancy:', error);
    return [
      { district: 'Ranchi', occupancy: 85, available: 45, booked: 255, revenue: 382500 },
      { district: 'Latehar', occupancy: 72, available: 28, booked: 72, revenue: 86400 },
      { district: 'Hazaribagh', occupancy: 68, available: 96, booked: 204, revenue: 306000 }
    ];
  }
};

/**
 * Get marketplace revenue
 */
export const fetchMarketplaceRevenue = async (params?: {
  range?: string;
  category?: string;
}): Promise<RevenueData[]> => {
  try {
    const response = await api.get('/admin/analytics/revenue', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return [
      { category: 'Dokra', amount: 450000, count: 180, percentage: 42 },
      { category: 'Paitkar', amount: 280000, count: 140, percentage: 26 },
      { category: 'Bamboo', amount: 190000, count: 380, percentage: 18 },
      { category: 'Others', amount: 150000, count: 200, percentage: 14 }
    ];
  }
};

/**
 * Get environmental data
 */
export const fetchEnvironmentalData = async (): Promise<EnvironmentalData> => {
  try {
    const response = await api.get('/admin/environment');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching environmental data:', error);
    return {
      airQuality: {
        index: 142,
        level: 'MODERATE',
        stations: [
          { location: 'Ranchi', aqi: 145 },
          { location: 'Jamshedpur', aqi: 162 },
          { location: 'Dhanbad', aqi: 188 }
        ]
      },
      waterLevels: [
        { location: 'Hundru Falls', level: 2.3, status: 'RISING', timestamp: new Date().toISOString() },
        { location: 'Dassam Falls', level: 1.8, status: 'NORMAL', timestamp: new Date().toISOString() }
      ],
      visitorDensity: [
        { destination: 'Netarhat', density: 'HIGH', currentVisitors: 850, capacity: 1000 },
        { destination: 'Hundru Falls', density: 'MEDIUM', currentVisitors: 320, capacity: 500 }
      ]
    };
  }
};

// ==================== USER MANAGEMENT FUNCTIONS ====================



// ==================== APPROVAL FUNCTIONS ====================

/**
 * Approve user (admin only)
 */
export const approveUser = async (userId: string, role: string): Promise<User> => {
  try {
    const response = await api.post(`/admin/approvals/${userId}/approve`, { role });
    return response.data.data;
  } catch (error) {
    console.error('Approve user error:', error);
    throw error;
  }
};

/**
 * Reject user (admin only)
 */
export const rejectUser = async (userId: string, reason: string): Promise<User> => {
  try {
    const response = await api.post(`/admin/approvals/${userId}/reject`, { reason });
    return response.data.data;
  } catch (error) {
    console.error('Reject user error:', error);
    throw error;
  }
};

/**
 * Get approval statistics (admin only)
 */
export const getApprovalStats = async (): Promise<{
  byStatus: any[];
  byRole: any[];
}> => {
  try {
    const response = await api.get('/admin/approvals/stats');
    return response.data.data;
  } catch (error) {
    console.error('Get approval stats error:', error);
    return {
      byStatus: [
        { _id: 'pending', count: 5 },
        { _id: 'approved', count: 20 },
        { _id: 'rejected', count: 2 }
      ],
      byRole: [
        { _id: 'guide', count: 2 },
        { _id: 'artisan', count: 2 },
        { _id: 'homestay_owner', count: 1 }
      ]
    };
  }
};

// ==================== ROLE-BASED DASHBOARD FUNCTIONS ====================

/**
 * Get guide dashboard data
 */
export const fetchGuideDashboard = async () => {
  try {
    const response = await api.get('/guide/dashboard');
    return response.data.data;
  } catch (error) {
    console.error('Fetch guide dashboard error:', error);
    return {
      totalTours: 5,
      totalBookings: 12,
      totalEarnings: 25000,
      upcomingTours: []
    };
  }
};

/**
 * Get artisan dashboard data
 */
export const fetchArtisanDashboard = async () => {
  try {
    const response = await api.get('/artisan/dashboard');
    return response.data.data;
  } catch (error) {
    console.error('Fetch artisan dashboard error:', error);
    return {
      totalProducts: 8,
      totalOrders: 15,
      totalEarnings: 45000,
      recentOrders: []
    };
  }
};

/**
 * Get homestay owner dashboard data
 */
export const fetchOwnerDashboard = async () => {
  try {
    const response = await api.get('/owner/dashboard');
    return response.data.data;
  } catch (error) {
    console.error('Fetch owner dashboard error:', error);
    return {
      totalProperties: 2,
      totalBookings: 8,
      occupancyRate: 75,
      totalEarnings: 35000
    };
  }
};

/**
 * Get vendor dashboard data
 */
export const fetchVendorDashboard = async () => {
  try {
    const response = await api.get('/vendor/dashboard');
    return response.data.data;
  } catch (error) {
    console.error('Fetch vendor dashboard error:', error);
    return {
      totalProducts: 12,
      totalOrders: 25,
      totalEarnings: 65000,
      lowStock: []
    };
  }
};



export const forgotPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email })
  return response.data
}

export const resetPassword = async (data: { token: string; newPassword: string }) => {
  const response = await api.post('/auth/reset-password', data)
  return response.data
}

// Get current user's permissions
export const getUserPermissions = async () => {
  try {
    const response = await api.get('/auth/permissions');
    return response.data.data;
  } catch (error) {
    console.error('Get permissions error:', error);
    return null;
  }
};

// ==================== ADMIN FUNCTIONS ====================

export interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  pendingApprovals: number;
  roleDistribution: Array<{ _id: string; count: number }>;
  recentUsers: User[];
}

// Get all users with filters
// Fetch users with filters
export const fetchUsers = async (params?: {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  try {
    const response = await api.get('/admin/users', { params });
    
    // Ensure each user has an id field (map _id to id)
    const users = (response.data.data.users || []).map((user: any) => ({
      ...user,
      id: user._id || user.id  // Ensure id field exists
    }));
    
    return {
      users,
      pagination: response.data.data.pagination,
      statistics: response.data.data.statistics
    };
  } catch (error: any) {
    console.error('Fetch users error:', error.response?.data || error.message);
    return { users: [], pagination: {}, statistics: {} };
  }
};

/**
 * Update user role (admin only)
 */
// Update user role
export const updateUserRole = async (userId: string, role: string): Promise<User> => {
  try {
    console.log('Updating user role:', { userId, role });
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    
    if (response.data.success) {
      // Update stored user if it's the current user
      const currentUser = getStoredUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.role = role;
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update role');
  } catch (error: any) {
    console.error('Update user role error:', error.response?.data || error.message);
    throw error;
  }
};

// Update user status (activate/deactivate)
export const updateUserStatus = async (userId: string, status: string): Promise<User> => {
  try {
    console.log('Updating user status:', { userId, status });
    const isActive = status === 'approved';
    const response = await api.put(`/admin/users/${userId}/status`, { isActive });
    
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update status');
  } catch (error: any) {
    console.error('Update user status error:', error.response?.data || error.message);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Deleting user:', userId);
    const response = await api.delete(`/admin/users/${userId}`);
    
    if (response.data.success) {
      // Clear stored user if it's the current user
      const currentUser = getStoredUser();
      if (currentUser && currentUser.id === userId) {
        logoutUser();
      }
      return response.data;
    }
    throw new Error(response.data.message || 'Failed to delete user');
  } catch (error: any) {
    console.error('Delete user error:', error.response?.data || error.message);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};


// Get user statistics
// Get user statistics
export const getUserStatistics = async () => {
  try {
    const response = await api.get('/admin/users/statistics');
    return response.data.data;
  } catch (error: any) {
    console.error('Get user statistics error:', error.response?.data || error.message);
    return {
      totalUsers: 0,
      activeUsers: 0,
      pendingApprovals: 0,
      roleDistribution: [],
      recentUsers: []
    };
  }
};

// Approve a request
export const approveRequest = async (approvalId: string, role?: string, notes?: string) => {
  try {
    const response = await api.post(`/approvals/${approvalId}/approve`, { role, notes });
    return response.data;
  } catch (error) {
    console.error('Error approving request:', error);
    throw error;
  }
};

// Reject a request
export const rejectRequest = async (approvalId: string, reason: string) => {
  try {
    const response = await api.post(`/approvals/${approvalId}/reject`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  const response = await api.get(`/auth/verify-email/${token}`)
  return response.data
}
// ==================== EXPORT ALL ====================
export default {
  // Auth functions
  loginUser,
  signupUser,
  getCurrentUser,
  logoutUser,
  updateProfile,
  changePassword,
  
  // Helper functions
  isAuthenticated,
  getStoredUser,
  getUserRole,
  getUserId,
  getUserName,
  getUserEmail,
  getToken,
  initAuth,
  updateStoredUser,
  removeToken,
  hasToken,
  
  // Admin dashboard functions
  fetchDashboardStats,
  fetchPendingApprovals,
  fetchSystemHealth,
  fetchTouristTrends,
  fetchHomestayOccupancy,
  fetchMarketplaceRevenue,
  fetchEnvironmentalData,
  
  // User management functions
  fetchUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  
  // Approval functions
  approveUser,
  rejectUser,
  getApprovalStats,
  
  // Role-specific dashboard functions
  fetchGuideDashboard,
  fetchArtisanDashboard,
  fetchOwnerDashboard,
  fetchVendorDashboard
};
