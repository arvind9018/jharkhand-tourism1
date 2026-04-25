// pages/admin/tabs/UserManagementTab.tsx
import { useState, useEffect, useCallback } from "react"
import { User, fetchUsers, updateUserRole, updateUserStatus, deleteUser, getUserStatistics } from "../../../services/authApi"
import { Search, ChevronLeft, ChevronRight, Trash2, CheckCircle, XCircle } from 'lucide-react'

type UserRole = 'admin' | 'user' | 'guide' | 'artisan' | 'homestay_owner' | 'vendor'

interface UserManagementTabProps {
  users: User[]
  onRoleChange: (userId: string, role: UserRole) => void
  currentUserRole: string
}

const roleOptions: UserRole[] = ['user', 'admin', 'guide', 'artisan', 'homestay_owner', 'vendor']
const statusOptions = ['all', 'approved', 'pending', 'rejected']

export const UserManagementTab = ({ users: initialUsers, onRoleChange, currentUserRole }: UserManagementTabProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingApprovals: 0,
    roleDistribution: [] as Array<{ _id: string; count: number }>
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [processingUserId, setProcessingUserId] = useState<string | null>(null)

  const itemsPerPage = 10

  // Load users with filters
  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetchUsers({
        search: searchTerm,
        role: roleFilter,
        status: statusFilter,
        page: currentPage,
        limit: itemsPerPage,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
      
      setUsers(result.users || [])
      setTotalPages(result.pagination?.pages || 1)
      setTotalUsers(result.pagination?.total || 0)
      setStatistics({
        totalUsers: result.statistics?.totalUsers || 0,
        activeUsers: result.users?.filter((u: User) => u.isActive).length || 0,
        pendingApprovals: result.users?.filter((u: User) => u.approvalStatus === 'pending').length || 0,
        roleDistribution: result.statistics?.byRole || []
      })
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, roleFilter, statusFilter, currentPage])

  // Load statistics separately
  const loadStatistics = useCallback(async () => {
    try {
      const stats = await getUserStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }, [])

  useEffect(() => {
    loadUsers()
    loadStatistics()
  }, [loadUsers, loadStatistics])

  // Handle role change - FIXED: Ensure userId is passed correctly
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    if (!userId) {
      console.error('Invalid userId:', userId)
      alert('Cannot update role: Invalid user ID')
      return
    }
    
    setProcessingUserId(userId)
    try {
      console.log('Updating role for user:', userId, 'to:', newRole)
      await updateUserRole(userId, newRole)
      await loadUsers()
      onRoleChange(userId, newRole)
    } catch (error: any) {
      console.error('Error updating role:', error)
      alert(error.response?.data?.message || 'Failed to update user role')
    } finally {
      setProcessingUserId(null)
    }
  }

  // Handle status change - FIXED: Ensure userId is passed correctly
  const handleStatusChange = async (userId: string, currentStatus: boolean) => {
    if (!userId) {
      console.error('Invalid userId:', userId)
      alert('Cannot update status: Invalid user ID')
      return
    }
    
    setProcessingUserId(userId)
    try {
      const newStatus = !currentStatus
      console.log('Updating status for user:', userId, 'to:', newStatus)
      await updateUserStatus(userId, newStatus ? 'approved' : 'pending')
      await loadUsers()
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(error.response?.data?.message || 'Failed to update user status')
    } finally {
      setProcessingUserId(null)
    }
  }

  // Handle delete user - FIXED: Ensure userId is passed correctly
  const handleDeleteUser = async (userId: string) => {
    if (!userId) {
      console.error('Invalid userId:', userId)
      alert('Cannot delete user: Invalid user ID')
      return
    }
    
    setProcessingUserId(userId)
    try {
      console.log('Deleting user:', userId)
      await deleteUser(userId)
      await loadUsers()
      setShowDeleteConfirm(null)
    } catch (error: any) {
      console.error('Error deleting user:', error)
      alert(error.response?.data?.message || 'Failed to delete user')
    } finally {
      setProcessingUserId(null)
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setStatusFilter('all')
    setCurrentPage(1)
  }

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      guide: 'bg-green-100 text-green-800',
      artisan: 'bg-orange-100 text-orange-800',
      homestay_owner: 'bg-yellow-100 text-yellow-800',
      vendor: 'bg-pink-100 text-pink-800',
      user: 'bg-blue-100 text-blue-800'
    }
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm opacity-90">Total Users</p>
          <p className="text-3xl font-bold">{statistics.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm opacity-90">Active Users</p>
          <p className="text-3xl font-bold">{statistics.activeUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm opacity-90">Pending Approvals</p>
          <p className="text-3xl font-bold">{statistics.pendingApprovals}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-sm opacity-90">Total Roles</p>
          <p className="text-3xl font-bold">{statistics.roleDistribution?.length || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
            />
          </div>
          
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-lg w-48 focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Roles</option>
            {roleOptions.map(role => (
              <option key={role} value={role} className="capitalize">{role}</option>
            ))}
          </select>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-lg w-48 focus:ring-2 focus:ring-accent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status} className="capitalize">{status === 'all' ? 'All Status' : status}</option>
            ))}
          </select>
          
          {/* Reset Filters Button */}
          {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-accent hover:underline text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  {currentUserRole === 'admin' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <span className="text-accent font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {currentUserRole === 'admin' ? (
                        <select
                          onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                          value={user.role}
                          className={`px-2 py-1 border rounded text-sm capitalize font-medium ${getRoleBadgeColor(user.role)}`}
                          disabled={processingUserId === user.id || user.id === currentUserRole}
                        >
                          {roleOptions.map(role => (
                            <option key={role} value={role} className="capitalize">{role}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadgeColor(user.approvalStatus || 'approved')}`}>
                        {user.approvalStatus || 'approved'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    {currentUserRole === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          {/* Activate/Deactivate Button */}
                          <button
                            onClick={() => handleStatusChange(user.id, user.isActive)}
                            disabled={processingUserId === user.id}
                            className={`p-1 rounded transition disabled:opacity-50 ${
                              user.isActive 
                                ? 'text-green-600 hover:text-green-800' 
                                : 'text-gray-400 hover:text-green-600'
                            }`}
                            title={user.isActive ? 'Deactivate User' : 'Activate User'}
                          >
                            {user.isActive ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                          </button>
                          
                          {/* Delete Button */}
                          <button
                            onClick={() => setShowDeleteConfirm(user.id)}
                            disabled={processingUserId === user.id || user.id === currentUserRole}
                            className="p-1 text-red-500 hover:text-red-700 transition disabled:opacity-50"
                            title="Delete User"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                       </td>
                    )}
                   </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} users
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-primary mb-4">Delete User</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                disabled={processingUserId === showDeleteConfirm}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
              >
                {processingUserId === showDeleteConfirm ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}