// frontend/src/services/adminApi.ts
import { api } from './api'

// ==================== TYPES ====================

export interface DashboardStats {
  totalTourists: {
    value: number
    trend: number
    isPositive: boolean
  }
  activeHomestays: {
    value: number
    trend: number
    isPositive: boolean
  }
  handicraftSales: {
    value: number
    currency: string
    trend: number
    isPositive: boolean
  }
  ecoAlerts: {
    value: number
    critical: number
    warning: number
    status: 'critical' | 'warning' | 'normal'
  }
}

export interface PendingApproval {
  id: string
  type: 'HOMESTAY' | 'GUIDE' | 'PRODUCT' | 'ARTISAN' | 'EVENT'
  name: string
  submittedBy: {
    id: string
    name: string
    email: string
  }
  submittedDate: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  details?: any
}

export interface SystemHealth {
  server: {
    status: 'UP' | 'DOWN' | 'DEGRADED'
    uptime: number
    cpu: number
    memory: number
  }
  database: {
    status: 'CONNECTED' | 'DISCONNECTED'
    latency: number
    connections: number
  }
  gis: {
    status: 'RUNNING' | 'STOPPED' | 'ERROR'
    lastSync: string
  }
  responseTime: {
    avg: number
    p95: number
    p99: number
  }
  lastBackup: string
  activeUsers: number
  apiCalls: number
}

export interface TrendData {
  date: string
  domestic: number
  international: number
  total: number
}

export interface OccupancyData {
  district: string
  occupancy: number
  available: number
  booked: number
  revenue: number
}

export interface RevenueData {
  category: string
  amount: number
  count: number
  percentage: number
}

export interface UserManagement {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'TOURISM_OFFICER' | 'CONTENT_MANAGER' | 'ENVIRONMENT_OFFICER' | 'COMMUNITY_MANAGER'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  lastLogin: string
  createdAt: string
}

export interface EnvironmentalData {
  airQuality: {
    index: number
    level: 'GOOD' | 'MODERATE' | 'UNHEALTHY' | 'HAZARDOUS'
    stations: {
      location: string
      aqi: number
    }[]
  }
  waterLevels: {
    location: string
    level: number
    status: 'NORMAL' | 'RISING' | 'DANGER'
    timestamp: string
  }[]
  visitorDensity: {
    destination: string
    density: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    currentVisitors: number
    capacity: number
  }[]
}

// ==================== API FUNCTIONS ====================

/**
 * Get dashboard statistics
 * GET /api/admin/stats
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await api.get('/admin/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Mock data for development
    return {
      totalTourists: { value: 12450, trend: 12.5, isPositive: true },
      activeHomestays: { value: 128, trend: 8.3, isPositive: true },
      handicraftSales: { value: 860000, currency: 'INR', trend: 15.2, isPositive: true },
      ecoAlerts: { value: 5, critical: 1, warning: 4, status: 'warning' }
    }
  }
}

/**
 * Get pending approvals
 * GET /api/admin/approvals/pending?type=HOMESTAY&limit=10
 */
export async function fetchPendingApprovals(params?: {
  type?: string
  limit?: number
  offset?: number
}): Promise<{ approvals: PendingApproval[]; total: number }> {
  try {
    const response = await api.get('/admin/approvals/pending', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching pending approvals:', error)
    // Mock data
    return {
      approvals: [
        {
          id: '1',
          type: 'HOMESTAY',
          name: 'Mountain View Homestay',
          submittedBy: { id: '101', name: 'Ram Singh', email: 'ram@example.com' },
          submittedDate: new Date().toISOString(),
          status: 'PENDING',
          details: { location: 'Netarhat', price: 1200 }
        },
        {
          id: '2',
          type: 'GUIDE',
          name: 'Maria Munda',
          submittedBy: { id: '102', name: 'Maria Munda', email: 'maria@example.com' },
          submittedDate: new Date().toISOString(),
          status: 'PENDING',
          details: { languages: ['Hindi', 'English', 'Santhali'] }
        },
        {
          id: '3',
          type: 'PRODUCT',
          name: 'Dokra Horse Statue',
          submittedBy: { id: '103', name: 'Birsa Hansda', email: 'birsa@example.com' },
          submittedDate: new Date().toISOString(),
          status: 'PENDING',
          details: { price: 2500, category: 'Dokra' }
        }
      ],
      total: 15
    }
  }
}

/**
 * Approve or reject a request
 * PUT /api/admin/approvals/:id
 */
export async function updateApprovalStatus(
  id: string, 
  status: 'APPROVED' | 'REJECTED', 
  notes?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.put(`/admin/approvals/${id}`, { status, notes })
    return response.data
  } catch (error) {
    console.error('Error updating approval:', error)
    throw error
  }
}

/**
 * Get system health
 * GET /api/admin/system/health
 */
export async function fetchSystemHealth(): Promise<SystemHealth> {
  try {
    const response = await api.get('/admin/system/health')
    return response.data
  } catch (error) {
    console.error('Error fetching system health:', error)
    return {
      server: { status: 'UP', uptime: 345600, cpu: 45, memory: 62 },
      database: { status: 'CONNECTED', latency: 5, connections: 12 },
      gis: { status: 'RUNNING', lastSync: new Date().toISOString() },
      responseTime: { avg: 245, p95: 380, p99: 520 },
      lastBackup: new Date().toISOString(),
      activeUsers: 234,
      apiCalls: 15234
    }
  }
}

/**
 * Get tourist trends
 * GET /api/admin/analytics/tourists?range=month&startDate=2024-01-01&endDate=2024-01-31
 */
export async function fetchTouristTrends(params: {
  range: 'week' | 'month' | 'quarter' | 'year'
  startDate?: string
  endDate?: string
  district?: string
}): Promise<TrendData[]> {
  try {
    const response = await api.get('/admin/analytics/tourists', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching tourist trends:', error)
    // Mock data
    return [
      { date: '2024-01-01', domestic: 1200, international: 300, total: 1500 },
      { date: '2024-01-02', domestic: 1350, international: 350, total: 1700 },
      { date: '2024-01-03', domestic: 1100, international: 280, total: 1380 },
      { date: '2024-01-04', domestic: 1400, international: 400, total: 1800 },
      { date: '2024-01-05', domestic: 1600, international: 450, total: 2050 },
      { date: '2024-01-06', domestic: 1800, international: 500, total: 2300 }
    ]
  }
}

/**
 * Get homestay occupancy data
 * GET /api/admin/analytics/homestays
 */
export async function fetchHomestayOccupancy(params: {
  range?: string
  district?: string
}): Promise<OccupancyData[]> {
  try {
    const response = await api.get('/admin/analytics/homestays', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching homestay occupancy:', error)
    return [
      { district: 'Ranchi', occupancy: 85, available: 45, booked: 255, revenue: 382500 },
      { district: 'Latehar', occupancy: 72, available: 28, booked: 72, revenue: 86400 },
      { district: 'Hazaribagh', occupancy: 68, available: 96, booked: 204, revenue: 306000 },
      { district: 'Dumka', occupancy: 91, available: 15, booked: 152, revenue: 182400 }
    ]
  }
}

/**
 * Get marketplace revenue
 * GET /api/admin/analytics/revenue
 */
export async function fetchMarketplaceRevenue(params: {
  range?: string
  category?: string
}): Promise<RevenueData[]> {
  try {
    const response = await api.get('/admin/analytics/revenue', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching revenue:', error)
    return [
      { category: 'Dokra', amount: 450000, count: 180, percentage: 42 },
      { category: 'Paitkar', amount: 280000, count: 140, percentage: 26 },
      { category: 'Bamboo', amount: 190000, count: 380, percentage: 18 },
      { category: 'Others', amount: 150000, count: 200, percentage: 14 }
    ]
  }
}

/**
 * Get users for management
 * GET /api/admin/users?role=TOURISM_OFFICER&status=ACTIVE
 */
export async function fetchUsers(params?: {
  role?: string
  status?: string
  search?: string
  limit?: number
  offset?: number
}): Promise<{ users: UserManagement[]; total: number }> {
  try {
    const response = await api.get('/admin/users', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      users: [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@jharkhandtourism.gov.in',
          role: 'SUPER_ADMIN',
          status: 'ACTIVE',
          lastLogin: new Date().toISOString(),
          createdAt: '2023-01-01'
        }
      ],
      total: 1
    }
  }
}

/**
 * Update user role
 * PUT /api/admin/users/:id/role
 */
export async function updateUserRole(
  userId: string, 
  role: string, 
  permissions?: string[]
): Promise<UserManagement> {
  try {
    const response = await api.put(`/admin/users/${userId}/role`, { role, permissions })
    return response.data
  } catch (error) {
    console.error('Error updating user role:', error)
    throw error
  }
}

/**
 * Get environmental monitoring data
 * GET /api/admin/environment
 */
export async function fetchEnvironmentalData(): Promise<EnvironmentalData> {
  try {
    const response = await api.get('/admin/environment')
    return response.data
  } catch (error) {
    console.error('Error fetching environmental data:', error)
    return {
      airQuality: {
        index: 142,
        level: 'MODERATE',
        stations: [
          { location: 'Ranchi', aqi: 145 },
          { location: 'Jamshedpur', aqi: 162 },
          { location: 'Dhanbad', aqi: 188 },
          { location: 'Netarhat', aqi: 95 }
        ]
      },
      waterLevels: [
        { location: 'Hundru Falls', level: 2.3, status: 'RISING', timestamp: new Date().toISOString() },
        { location: 'Dassam Falls', level: 1.8, status: 'NORMAL', timestamp: new Date().toISOString() },
        { location: 'Jonha Falls', level: 1.5, status: 'NORMAL', timestamp: new Date().toISOString() }
      ],
      visitorDensity: [
        { destination: 'Netarhat', density: 'HIGH', currentVisitors: 850, capacity: 1000 },
        { destination: 'Hundru Falls', density: 'MEDIUM', currentVisitors: 320, capacity: 500 },
        { destination: 'Dassam Falls', density: 'LOW', currentVisitors: 180, capacity: 400 }
      ]
    }
  }
}

/**
 * Export reports
 * GET /api/admin/reports/export?type=monthly&format=pdf
 */
export async function exportReport(params: {
  type: 'monthly' | 'quarterly' | 'annual'
  format: 'pdf' | 'excel' | 'csv'
  month?: string
  year?: string
}): Promise<Blob> {
  try {
    const response = await api.get('/admin/reports/export', {
      params,
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    console.error('Error exporting report:', error)
    throw error
  }
}