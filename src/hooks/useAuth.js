import { useState, useEffect } from 'react'
import { getAuthData, clearAuthData } from '../utils/auth'

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const { userId, tokens } = getAuthData()
        setIsAuthenticated(!!tokens?.accessToken)
        setUserId(userId)
    }, [])

    const logout = () => {
        clearAuthData()
        setIsAuthenticated(false)
        setUserId(null)
    }

    return {
        isAuthenticated,
        userId,
        setUserId,
        logout,
        setIsAuthenticated
    }
}