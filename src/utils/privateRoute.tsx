import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = (): JSX.Element => {
  const isAuthenticated = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
