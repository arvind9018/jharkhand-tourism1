// pages/admin/AdminDashboard.tsx - Update the useEffect
import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { 
  isAuthenticated,
  getStoredUser,
  logoutUser,
  type User
} from "../../services/authApi"
import { useAdminData } from "./hooks/useAdminData"
import { OverviewTab } from "./tabs/OverviewTab"
import { UserManagementTab } from "./tabs/UserManagementTab"
import { ApprovalsTab } from "./tabs/ApprovalsTab"
import { AnalyticsTab } from "./tabs/AnalyticsTab"
import { EnvironmentTab } from "./tabs/EnvironmentTab"
import { StatsCard } from "./components/StatsCard"
import { TabButton } from "./components/TabButton"
import { RefreshCw, Bell, Settings } from 'lucide-react'

type TabType = 'overview' | 'users' | 'approvals' | 'analytics' | 'environment'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [refreshing, setRefreshing] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Use ref to track initial load
  const initialLoadDone = useRef(false)
  
  const {
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
  } = useAdminData(dateRange)

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    const user = getStoredUser()
    if (user?.role !== 'admin') {
      navigate('/')
      return
    }
    setCurrentUser(user)
  }, [navigate])

  // Load data only once when component mounts and user is set
  useEffect(() => {
    if (currentUser && !initialLoadDone.current) {
      initialLoadDone.current = true
      loadDashboardData()
      loadUsers()
    }
  }, [currentUser, loadDashboardData, loadUsers])

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([loadDashboardData(), loadUsers()])
    setRefreshing(false)
  }, [loadDashboardData, loadUsers])

  // Handle logout
  const handleLogout = useCallback(() => {
    logoutUser()
    navigate('/login')
  }, [navigate])

  // Get notification count
  const notificationCount = useMemo(() => {
    return (approvals?.length || 0) + (roleStats?.pendingApprovals || 0)
  }, [approvals, roleStats])

  // Memoized stats cards
  const statsCards = useMemo(() => (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard title="Total Users" value={roleStats.totalUsers.toString()} icon="👥" color="blue" />
      <StatsCard title="Admins" value={roleStats.totalAdmins.toString()} icon="👑" color="purple" />
      <StatsCard title="Guides" value={roleStats.totalGuides.toString()} icon="🧭" color="green" />
      <StatsCard title="Artisans" value={roleStats.totalArtisans.toString()} icon="🎨" color="orange" />
      <StatsCard title="Homestay Owners" value={roleStats.totalHomestayOwners.toString()} icon="🏡" color="yellow" />
      <StatsCard title="Vendors" value={roleStats.totalVendors.toString()} icon="🛍️" color="pink" />
      <StatsCard title="Pending Approvals" value={roleStats.pendingApprovals.toString()} icon="⏳" color="red" />
    </section>
  ), [roleStats])

  // Memoized tabs
  const tabs = useMemo(() => [
    { id: 'overview' as TabType, label: 'Overview', icon: '📊' },
    { id: 'users' as TabType, label: 'User Management', icon: '👥' },
    { id: 'approvals' as TabType, label: 'Pending Approvals', icon: '✅' },
    { id: 'analytics' as TabType, label: 'Analytics', icon: '📈' },
    { id: 'environment' as TabType, label: 'Environment', icon: '🌍' }
  ], [])

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-secondary min-h-screen">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-2 rounded-lg">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {currentUser.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-accent"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition relative"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {approvals.length > 0 && (
                        <div className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                          <p className="text-sm font-medium">📋 {approvals.length} pending approvals</p>
                          <p className="text-xs text-gray-500">Requires your attention</p>
                        </div>
                      )}
                      {roleStats.pendingApprovals > 0 && (
                        <div className="p-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium">👥 {roleStats.pendingApprovals} user registrations pending</p>
                          <p className="text-xs text-gray-500">New users waiting for approval</p>
                        </div>
                      )}
                      {notificationCount === 0 && (
                        <div className="p-6 text-center text-gray-500">
                          <p>No new notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {statsCards}

        <div className="mb-6 border-b">
          <nav className="flex space-x-6 overflow-x-auto pb-0">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
          <div className="transition-all duration-300">
            {activeTab === 'overview' && (
              <OverviewTab 
                stats={stats} 
                touristTrends={touristTrends} 
                occupancyData={occupancyData} 
                revenueData={revenueData} 
                systemHealth={systemHealth} 
              />
            )}
            {activeTab === 'users' && (
              <UserManagementTab 
                users={users} 
                onRoleChange={handleRoleChange} 
                currentUserRole={currentUser.role} 
              />
            )}
            {activeTab === 'approvals' && (
              <ApprovalsTab 
                approvals={approvals} 
                onApprove={handleApproveUser} 
                onReject={handleRejectUser} 
              />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsTab 
                touristTrends={touristTrends} 
                occupancyData={occupancyData} 
                revenueData={revenueData} 
                dateRange={dateRange} 
              />
            )}
            {activeTab === 'environment' && (
              <EnvironmentTab environmentalData={environmentalData} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}