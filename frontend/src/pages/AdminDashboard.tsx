// pages/AdminDashboard.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
  type User,
  isAuthenticated,
  getStoredUser,
  logoutUser
} from "../services/authApi"

// Role types from your auth system
type UserRole = 'admin' | 'user' | 'guide' | 'artisan' | 'homestay_owner' | 'vendor'

interface Stats {
  totalUsers: number
  totalAdmins: number
  totalGuides: number
  totalArtisans: number
  totalHomestayOwners: number
  totalVendors: number
  pendingApprovals: number
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [approvals, setApprovals] = useState<PendingApproval[]>([])
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null)
  const [touristTrends, setTouristTrends] = useState<TrendData[]>([])
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([])
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'approvals' | 'analytics' | 'environment'>('overview')
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [roleStats, setRoleStats] = useState<Stats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalGuides: 0,
    totalArtisans: 0,
    totalHomestayOwners: 0,
    totalVendors: 0,
    pendingApprovals: 0
  })

  useEffect(() => {
    // Check if user is logged in and is admin
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

  useEffect(() => {
    if (currentUser) {
      loadDashboardData()
      loadUsers()
    }
  }, [currentUser, dateRange])

  const loadDashboardData = async () => {
    setLoading(true)
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

      setStats(statsData)
      setApprovals(approvalsData.approvals || [])
      setSystemHealth(healthData)
      setTouristTrends(trendsData)
      setOccupancyData(occupancy)
      setRevenueData(revenue)
      setEnvironmentalData(envData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await fetchUsers()
      setUsers(response.users)
      
      // Calculate role statistics
      const roleCounts = response.users.reduce((acc: Stats, user: User) => {
        switch(user.role) {
          case 'admin':
            acc.totalAdmins++
            break
          case 'guide':
            acc.totalGuides++
            break
          case 'artisan':
            acc.totalArtisans++
            break
          case 'homestay_owner':
            acc.totalHomestayOwners++
            break
          case 'vendor':
            acc.totalVendors++
            break
          default:
            acc.totalUsers++
        }
        if (user.approvalStatus === 'pending') {
          acc.pendingApprovals++
        }
        return acc
      }, {
        totalUsers: 0,
        totalAdmins: 0,
        totalGuides: 0,
        totalArtisans: 0,
        totalHomestayOwners: 0,
        totalVendors: 0,
        pendingApprovals: 0
      })
      
      setRoleStats(roleCounts)
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole)
      await loadUsers() // Refresh users list
    } catch (error) {
      console.error('Error updating role:', error)
    }
  }

  const handleApproveUser = async (userId: string, role: UserRole) => {
    try {
      await approveUser(userId, role)
      await loadUsers()
      await loadDashboardData()
    } catch (error) {
      console.error('Error approving user:', error)
    }
  }

  const handleRejectUser = async (userId: string, reason: string) => {
    try {
      await rejectUser(userId, reason)
      await loadUsers()
    } catch (error) {
      console.error('Error rejecting user:', error)
    }
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  if (!currentUser) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="bg-secondary min-h-screen px-6 sm:px-10 py-10">

      {/* HEADER WITH USER INFO */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">
            Admin Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Welcome back, {currentUser.name}! Manage users, approvals, and platform analytics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-primary">{currentUser.name}</p>
            <p className="text-xs text-accent capitalize">{currentUser.role}</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 rounded-lg border bg-white"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ROLE-BASED STATS CARDS */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Users" 
          value={roleStats.totalUsers.toString()} 
          icon="👥"
          color="blue"
        />
        <StatsCard 
          title="Admins" 
          value={roleStats.totalAdmins.toString()} 
          icon="👑"
          color="purple"
        />
        <StatsCard 
          title="Guides" 
          value={roleStats.totalGuides.toString()} 
          icon="🧭"
          color="green"
        />
        <StatsCard 
          title="Artisans" 
          value={roleStats.totalArtisans.toString()} 
          icon="🎨"
          color="orange"
        />
        <StatsCard 
          title="Homestay Owners" 
          value={roleStats.totalHomestayOwners.toString()} 
          icon="🏡"
          color="yellow"
        />
        <StatsCard 
          title="Vendors" 
          value={roleStats.totalVendors.toString()} 
          icon="🛍️"
          color="pink"
        />
        <StatsCard 
          title="Pending Approvals" 
          value={roleStats.pendingApprovals.toString()} 
          icon="⏳"
          color="red"
        />
      </section>

      {/* TABS */}
      <div className="mb-8 border-b">
        <nav className="flex space-x-8 overflow-x-auto">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon="📊"
            label="Overview"
          />
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
            icon="👥"
            label="User Management"
          />
          <TabButton 
            active={activeTab === 'approvals'} 
            onClick={() => setActiveTab('approvals')}
            icon="✅"
            label="Pending Approvals"
          />
          <TabButton 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')}
            icon="📈"
            label="Analytics"
          />
          <TabButton 
            active={activeTab === 'environment'} 
            onClick={() => setActiveTab('environment')}
            icon="🌍"
            label="Environment"
          />
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : (
        <>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              {/* KPI CARDS */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <KpiCard 
                  title="Total Tourists" 
                  value={stats?.totalTourists?.value?.toLocaleString() || "12,450"} 
                  icon="👥"
                  trend={stats?.totalTourists?.trend}
                  isPositive={stats?.totalTourists?.isPositive}
                />
                <KpiCard 
                  title="Active Homestays" 
                  value={stats?.activeHomestays?.value?.toLocaleString() || "128"} 
                  icon="🏡"
                  trend={stats?.activeHomestays?.trend}
                  isPositive={stats?.activeHomestays?.isPositive}
                />
                <KpiCard 
                  title="Handicraft Sales" 
                  value={stats?.handicraftSales?.currency === 'INR' ? 
                    `₹${(stats?.handicraftSales?.value / 100000)?.toFixed(1)}L` : 
                    "₹8.6L"} 
                  icon="🛍️"
                  trend={stats?.handicraftSales?.trend}
                  isPositive={stats?.handicraftSales?.isPositive}
                />
                <KpiCard 
                  title="Eco Alerts" 
                  value={stats?.ecoAlerts?.value?.toString() || "5"} 
                  icon="⚠️"
                  status={stats?.ecoAlerts?.status || 'normal'}
                />
              </section>

              {/* SIMPLE ANALYTICS */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <SimpleChartCard 
                  title="Tourist Footfall Trends"
                  subtitle="Last 7 days"
                >
                  <div className="space-y-2">
                    {touristTrends.slice(0, 7).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-xs w-16">{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                          <div 
                            className="h-full bg-accent"
                            style={{ width: `${(item.total / Math.max(...touristTrends.map(t => t.total))) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs w-12 text-right">{item.total}</span>
                      </div>
                    ))}
                  </div>
                </SimpleChartCard>

                <SimpleChartCard 
                  title="Homestay Occupancy"
                  subtitle="By district"
                >
                  <div className="space-y-3">
                    {occupancyData.map((item, index) => (
                      <div key={index} className="border-b pb-2 last:border-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{item.district}</span>
                          <span className="text-accent">{item.occupancy}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                          <div 
                            className="h-full bg-accent"
                            style={{ width: `${item.occupancy}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Booked: {item.booked}</span>
                          <span>Available: {item.available}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </SimpleChartCard>

                <SimpleChartCard 
                  title="Marketplace Revenue"
                  subtitle="By category"
                >
                  <div className="space-y-2">
                    {revenueData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: getColor(index) }} />
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">₹{(item.amount / 100000).toFixed(1)}L</span>
                          <span className="text-xs text-gray-500 w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </SimpleChartCard>
              </section>

              {/* SYSTEM STATUS */}
              <SystemStatus health={systemHealth} />
            </>
          )}

          {/* USER MANAGEMENT TAB */}
          {activeTab === 'users' && (
            <UserManagement 
              users={users} 
              onRoleChange={handleRoleChange}
              currentUserRole={currentUser.role}
            />
          )}

          {/* APPROVALS TAB */}
          {activeTab === 'approvals' && (
            <ApprovalsManagement 
              approvals={approvals} 
              onApprove={handleApproveUser}
              onReject={handleRejectUser}
            />
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <AnalyticsDashboard 
              touristTrends={touristTrends}
              occupancyData={occupancyData}
              revenueData={revenueData}
              dateRange={dateRange}
            />
          )}

          {/* ENVIRONMENT TAB */}
          {activeTab === 'environment' && (
            <EnvironmentMonitoring environmentalData={environmentalData} />
          )}
        </>
      )}
    </div>
  )
}

/* ---------------- HELPER COMPONENTS ---------------- */

function StatsCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    pink: 'bg-pink-50 text-pink-600',
    red: 'bg-red-50 text-red-600'
  }

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-75">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}

function KpiCard({ 
  title, 
  value, 
  icon, 
  trend, 
  isPositive,
  status
}: { 
  title: string
  value: string
  icon: string
  trend?: number
  isPositive?: boolean
  status?: 'critical' | 'warning' | 'normal'
}) {
  const statusColors = {
    critical: 'bg-red-100 border-red-300',
    warning: 'bg-yellow-100 border-yellow-300',
    normal: 'bg-green-100 border-green-300'
  }

  return (
    <div className={`bg-white rounded-xl shadow p-6 flex items-center gap-4 ${status ? statusColors[status] : ''}`}>
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold text-primary">{value}</h3>
        {trend !== undefined && (
          <p className={`text-xs mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}% from last period
          </p>
        )}
        {status && (
          <p className={`text-xs mt-1 ${
            status === 'critical' ? 'text-red-600' :
            status === 'warning' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {status === 'critical' ? '🔴 Critical' :
             status === 'warning' ? '⚠️ Warning' :
             '🟢 Normal'}
          </p>
        )}
      </div>
    </div>
  )
}

function SimpleChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-primary mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
      {children}
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
        active
          ? 'border-accent text-accent'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  )
}

function UserManagement({ users, onRoleChange, currentUserRole }: { 
  users: User[]; 
  onRoleChange: (userId: string, role: UserRole) => void;
  currentUserRole: string;
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const roleOptions: UserRole[] = ['user', 'admin', 'guide', 'artisan', 'homestay_owner', 'vendor']

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">User Management</h2>
      
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg flex-1"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg w-48"
          >
            <option value="all">All Roles</option>
            {roleOptions.map(role => (
              <option key={role} value={role} className="capitalize">{role}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                {currentUserRole === 'admin' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-accent font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'guide' ? 'bg-green-100 text-green-800' :
                      user.role === 'artisan' ? 'bg-orange-100 text-orange-800' :
                      user.role === 'homestay_owner' ? 'bg-yellow-100 text-yellow-800' :
                      user.role === 'vendor' ? 'bg-pink-100 text-pink-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      user.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  {currentUserRole === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        onChange={(e) => onRoleChange(user.id, e.target.value as UserRole)}
                        value={user.role}
                        className="px-2 py-1 border rounded text-sm"
                        disabled={user.id === currentUserRole} // Can't change own role
                      >
                        {roleOptions.map(role => (
                          <option key={role} value={role} className="capitalize">{role}</option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-8">No users found</p>
        )}
      </div>
    </div>
  )
}

function ApprovalsManagement({ approvals, onApprove, onReject }: { 
  approvals: PendingApproval[]; 
  onApprove: (userId: string, role: UserRole) => void;
  onReject: (userId: string, reason: string) => void;
}) {
  const [rejectReason, setRejectReason] = useState('')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'HOMESTAY': return '🏡'
      case 'GUIDE': return '🧭'
      case 'PRODUCT': return '🛍️'
      case 'ARTISAN': return '🎨'
      default: return '📝'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Pending Approvals</h2>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {approvals.map((approval, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    {getTypeIcon(approval.type)} {approval.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{approval.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{approval.submittedBy?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(approval.submittedDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onApprove(approval.id, approval.type.toLowerCase() as UserRole)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(approval.id)
                      const reason = prompt('Enter rejection reason:')
                      if (reason) onReject(approval.id, reason)
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {approvals.length === 0 && (
          <p className="text-center text-gray-500 py-8">No pending approvals</p>
        )}
      </div>
    </div>
  )
}

function AnalyticsDashboard({ touristTrends, occupancyData, revenueData, dateRange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Detailed Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChartCard title="Tourist Trends" subtitle="Domestic vs International">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-right py-2">Domestic</th>
                <th className="text-right py-2">International</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {touristTrends.slice(0, 10).map((item: any, index: number) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="text-right">{item.domestic}</td>
                  <td className="text-right">{item.international}</td>
                  <td className="text-right font-medium">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleChartCard>

        <SimpleChartCard title="Revenue Breakdown" subtitle="By category">
          <div className="space-y-3">
            {revenueData.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.category}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                    <div 
                      className="h-full bg-accent"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-20 text-right">₹{(item.amount/1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </SimpleChartCard>
      </div>
    </div>
  )
}

function EnvironmentMonitoring({ environmentalData }: { environmentalData: EnvironmentalData | null }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Environmental Monitoring</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Air Quality Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-primary mb-4">Air Quality Index</h3>
          <div className="text-center">
            <div className={`text-5xl font-bold mb-2 ${
              environmentalData?.airQuality?.level === 'GOOD' ? 'text-green-600' :
              environmentalData?.airQuality?.level === 'MODERATE' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {environmentalData?.airQuality?.index || 142}
            </div>
            <p className="text-sm text-gray-600">{environmentalData?.airQuality?.level || 'Moderate'}</p>
          </div>
          <div className="mt-4 space-y-2">
            {environmentalData?.airQuality?.stations.slice(0, 3).map((station, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{station.location}</span>
                <span className="font-medium">{station.aqi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Water Levels Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-primary mb-4">Water Levels</h3>
          <div className="space-y-3">
            {environmentalData?.waterLevels.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.location}</p>
                  <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    item.status === 'DANGER' ? 'text-red-600' :
                    item.status === 'RISING' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {item.level}m
                  </p>
                  <p className="text-xs">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Density Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-primary mb-4">Visitor Density</h3>
          <div className="space-y-3">
            {environmentalData?.visitorDensity.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{item.destination}</span>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    item.density === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                    item.density === 'HIGH' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.density}
                  </span>
                  <p className="text-xs mt-1">{item.currentVisitors}/{item.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SystemStatus({ health }: { health: SystemHealth | null }) {
  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-primary mb-4">
        System Status
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusItem 
          label="Server" 
          value={health?.server?.status || "UP"} 
          status={health?.server?.status === 'UP' ? 'success' : 'error'}
        />
        <StatusItem 
          label="Database" 
          value={health?.database?.status || "CONNECTED"} 
          status={health?.database?.status === 'CONNECTED' ? 'success' : 'error'}
        />
        <StatusItem 
          label="GIS Services" 
          value={health?.gis?.status || "RUNNING"} 
          status={health?.gis?.status === 'RUNNING' ? 'success' : 'warning'}
        />
        <StatusItem 
          label="Response Time" 
          value={`${health?.responseTime?.avg || 245}ms`} 
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-600">Active Users</p>
          <p className="font-semibold">{health?.activeUsers || 234}</p>
        </div>
        <div>
          <p className="text-gray-600">API Calls</p>
          <p className="font-semibold">{health?.apiCalls?.toLocaleString() || '15.2k'}</p>
        </div>
        <div>
          <p className="text-gray-600">Last Backup</p>
          <p className="font-semibold">{new Date(health?.lastBackup || '').toLocaleTimeString() || '03:00 AM'}</p>
        </div>
        <div>
          <p className="text-gray-600">Uptime</p>
          <p className="font-semibold">{Math.floor((health?.server?.uptime || 345600) / 3600)}h</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-right">
        Last updated: {new Date().toLocaleString()}
      </p>
    </section>
  )
}

function StatusItem({ label, value, status }: { label: string; value: string; status?: 'success' | 'warning' | 'error' }) {
  const statusColors = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  }

  const statusDots = {
    success: '🟢',
    warning: '🟡',
    error: '🔴'
  }

  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`font-semibold flex items-center gap-1 ${status ? statusColors[status] : 'text-primary'}`}>
        {status && <span>{statusDots[status]}</span>}
        {value}
      </p>
    </div>
  )
}

function getColor(index: number): string {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
  return colors[index % colors.length]
}