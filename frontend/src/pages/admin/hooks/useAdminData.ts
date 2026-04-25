// pages/admin/hooks/useAdminData.ts
import { useState, useCallback, useRef, useEffect } from "react"
import { 
  fetchDashboardStats, 
  fetchPendingApprovals,
  fetchSystemHealth,
  fetchTouristTrends,
  fetchHomestayOccupancy,
  fetchMarketplaceRevenue,
  fetchEnvironmentalData,
  fetchUsers,
  updateUserRole,
  approveUser,
  rejectUser,
  type DashboardStats,
  type PendingApproval,
  type SystemHealth,
  type TrendData,
  type OccupancyData,
  type RevenueData,
  type EnvironmentalData,
  type User
} from "../../../services/authApi"

type UserRole = 'admin' | 'user' | 'guide' | 'artisan' | 'homestay_owner' | 'vendor'

interface RoleStats {
  totalUsers: number
  totalAdmins: number
  totalGuides: number
  totalArtisans: number
  totalHomestayOwners: number
  totalVendors: number
  pendingApprovals: number
}

export const useAdminData = (dateRange: 'week' | 'month' | 'quarter' | 'year') => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [approvals, setApprovals] = useState<PendingApproval[]>([])
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null)
  const [touristTrends, setTouristTrends] = useState<TrendData[]>([])
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([])
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [roleStats, setRoleStats] = useState<RoleStats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalGuides: 0,
    totalArtisans: 0,
    totalHomestayOwners: 0,
    totalVendors: 0,
    pendingApprovals: 0
  })

  // Use refs to prevent infinite loops
  const isMounted = useRef(true)
  const loadingRef = useRef(false)

  // Load dashboard data - memoized with useCallback
  const loadDashboardData = useCallback(async () => {
    if (loadingRef.current) return
    loadingRef.current = true
    
    try {
      const [
        statsData,
        approvalsData,
        healthData,
        trendsData,
        occupancy,
        revenue,
        envData
      ] = await Promise.all([
        fetchDashboardStats(),
        fetchPendingApprovals(),
        fetchSystemHealth(),
        fetchTouristTrends({ range: dateRange }),
        fetchHomestayOccupancy({ range: dateRange }),
        fetchMarketplaceRevenue({ range: dateRange }),
        fetchEnvironmentalData()
      ])

      if (isMounted.current) {
        setStats(statsData)
        setApprovals(approvalsData.approvals || [])
        setSystemHealth(healthData)
        setTouristTrends(trendsData)
        setOccupancyData(occupancy)
        setRevenueData(revenue)
        setEnvironmentalData(envData)
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      if (isMounted.current) {
        setLoading(false)
      }
      loadingRef.current = false
    }
  }, [dateRange])

  // Load users - memoized with useCallback
  const loadUsers = useCallback(async () => {
    try {
      const response = await fetchUsers()
      
      if (isMounted.current) {
        setUsers(response.users)
        
        const roleCounts = response.users.reduce((acc: RoleStats, user: User) => {
          switch(user.role) {
            case 'admin': acc.totalAdmins++; break
            case 'guide': acc.totalGuides++; break
            case 'artisan': acc.totalArtisans++; break
            case 'homestay_owner': acc.totalHomestayOwners++; break
            case 'vendor': acc.totalVendors++; break
            default: acc.totalUsers++
          }
          if (user.approvalStatus === 'pending') acc.pendingApprovals++
          return acc
        }, {
          totalUsers: 0, totalAdmins: 0, totalGuides: 0, totalArtisans: 0,
          totalHomestayOwners: 0, totalVendors: 0, pendingApprovals: 0
        })
        
        setRoleStats(roleCounts)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }, [])

  // Handle role change
  const handleRoleChange = useCallback(async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole)
      await loadUsers()
    } catch (error) {
      console.error('Error updating role:', error)
    }
  }, [loadUsers])

  // Handle approve user
  const handleApproveUser = useCallback(async (userId: string, role: UserRole) => {
    try {
      await approveUser(userId, role)
      await Promise.all([loadUsers(), loadDashboardData()])
    } catch (error) {
      console.error('Error approving user:', error)
    }
  }, [loadUsers, loadDashboardData])

  // Handle reject user
  const handleRejectUser = useCallback(async (userId: string, reason: string) => {
    try {
      await rejectUser(userId, reason)
      await loadUsers()
    } catch (error) {
      console.error('Error rejecting user:', error)
    }
  }, [loadUsers])

  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    stats,
    users,
    approvals,
    systemHealth,
    touristTrends,
    occupancyData,
    revenueData,
    environmentalData,
    roleStats,
    loading,
    loadDashboardData,
    loadUsers,
    handleRoleChange,
    handleApproveUser,
    handleRejectUser
  }
}