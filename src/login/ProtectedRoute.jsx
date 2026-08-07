import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user')

    useEffect(() => {
        if (!user) {
            alert("Please login first")
        }
    }, [user])

    if (!user) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute