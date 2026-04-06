// src/pages/VerifyEmail.tsx
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { verifyEmail } from "../services/authApi"  // ✅ Add this import

export default function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(token!)  // ✅ Now works
        setStatus('success')
        setMessage(response.message)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } catch (error: any) {
        setStatus('error')
        setMessage(error.response?.data?.message || 'Verification failed')
      }
    }

    if (token) {
      verify()
    }
  }, [token, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-primary mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="text-6xl text-green-500 mb-4">✅</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="text-6xl text-red-500 mb-4">❌</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              to="/login"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}