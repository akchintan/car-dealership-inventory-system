import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PublicOnlyRoute() {
  const { token } = useAuth()

  return token ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicOnlyRoute
