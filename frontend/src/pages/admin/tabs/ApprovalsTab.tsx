// pages/admin/tabs/ApprovalsTab.tsx
import { useState, useEffect } from "react"
import { PendingApproval, approveRequest, rejectRequest, fetchPendingApprovals } from "../../../services/authApi"

type UserRole = 'admin' | 'user' | 'guide' | 'artisan' | 'homestay_owner' | 'vendor'

interface ApprovalsTabProps {
  approvals: PendingApproval[]
  onApprove: (userId: string, role: UserRole) => void
  onReject: (userId: string, reason: string) => void
}

const getTypeIcon = (type: string): string => {
  switch(type) {
    case 'HOMESTAY': return '🏡'
    case 'GUIDE': return '🧭'
    case 'PRODUCT': return '🛍️'
    case 'ARTISAN': return '🎨'
    case 'VENDOR': return '🛒'
    default: return '📝'
  }
}

const getTypeLabel = (type: string): string => {
  switch(type) {
    case 'HOMESTAY': return 'Homestay Registration'
    case 'GUIDE': return 'Tour Guide Application'
    case 'ARTISAN': return 'Artisan Application'
    case 'VENDOR': return 'Vendor Registration'
    case 'PRODUCT': return 'New Product Listing'
    default: return type
  }
}

export const ApprovalsTab = ({ approvals, onApprove, onReject }: ApprovalsTabProps) => {
  const [localApprovals, setLocalApprovals] = useState<PendingApproval[]>(approvals)
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 })

  useEffect(() => {
    setLocalApprovals(approvals)
    loadStats()
  }, [approvals])

  const loadStats = async () => {
    try {
      // You can fetch stats from API
      const response = await fetch('/api/approvals/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleApprove = async (approvalId: string, type: string) => {
    setLoading(true)
    try {
      const role = type.toLowerCase()
      const response = await approveRequest(approvalId, role)
      if (response.success) {
        // Update local state
        setLocalApprovals(prev => prev.filter(a => a.id !== approvalId))
        alert('Request approved successfully!')
      } else {
        alert('Failed to approve request')
      }
    } catch (error) {
      console.error('Approval error:', error)
      alert('Error approving request')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (approvalId: string) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason) return
    
    setLoading(true)
    try {
      const response = await rejectRequest(approvalId, reason)
      if (response.success) {
        setLocalApprovals(prev => prev.filter(a => a.id !== approvalId))
        alert('Request rejected successfully!')
      } else {
        alert('Failed to reject request')
      }
    } catch (error) {
      console.error('Rejection error:', error)
      alert('Error rejecting request')
    } finally {
      setLoading(false)
    }
  }

  const filteredApprovals = localApprovals.filter(approval => 
    filterType === 'all' || approval.type === filterType
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Pending Approvals</h2>
        
        {/* Stats Summary */}
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Total</p>
            <p className="font-semibold text-primary">{stats.total || localApprovals.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Pending</p>
            <p className="font-semibold text-yellow-600">{stats.pending || localApprovals.length}</p>
          </div>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="flex gap-2">
        {['all', 'HOMESTAY', 'GUIDE', 'ARTISAN', 'VENDOR', 'PRODUCT'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filterType === type 
                ? 'bg-accent text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type === 'all' ? 'All' : getTypeLabel(type)}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name / Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApprovals.length > 0 ? (
              filteredApprovals.map((approval, index) => (
                <tr key={approval.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      {getTypeIcon(approval.type)} 
                      <span className="text-sm font-medium">{getTypeLabel(approval.type)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{approval.name}</div>
                    {approval.details && (
                      <div className="text-xs text-gray-500 mt-1">
                        {approval.details.location && <span>📍 {approval.details.location}</span>}
                        {approval.details.price && <span> • ₹{approval.details.price}</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{approval.submittedBy?.name || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{approval.submittedBy?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(approval.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleApprove(approval.id, approval.type)}
                      disabled={loading}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(approval.id)}
                      disabled={loading}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">✅</span>
                    <p>No pending approvals</p>
                    <p className="text-sm">All requests have been processed</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}