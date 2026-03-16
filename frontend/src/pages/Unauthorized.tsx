// pages/Unauthorized.tsx
import { Link } from "react-router-dom"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-primary mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="block w-full border border-accent text-accent py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}