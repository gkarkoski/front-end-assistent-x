import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/ui/Spinner'

export default function ProtectedRoute() {
  const { isAuthenticated, bootstrapping } = useAuth()

  if (bootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
