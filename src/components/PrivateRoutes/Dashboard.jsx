import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/Auth/AuthContext'

const DashboardPrivate = ({ Component }) => {
    const { isAuth } = useAuthContext()
    if (!isAuth)
        return <Navigate to="/auth/login" />

    return (
        <>
            <Component />

        </>
    )
}

export default DashboardPrivate