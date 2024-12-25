import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './RouteConstants'
import useUserManager from '../hooks/useUserManager'

const ProtectedRoutes = () => {
    const { isLoggedInUser } = useUserManager();
    console.log(isLoggedInUser)
    if (!isLoggedInUser) {
        return <Navigate to={ROUTES.login} />
    }
    return <Outlet />
}

export default ProtectedRoutes