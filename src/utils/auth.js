import { useAuth } from "../hooks/useAuth"

export const AUTH_STORAGE_KEY = 'auth_tokens'
export const USER_STORAGE_KEY = 'user_id'

export const setAuthData = (tokens, userId) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens))
    localStorage.setItem(USER_STORAGE_KEY, userId)
}

export const getAuthData = () => {
    const tokens = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY))
    const userId = localStorage.getItem(USER_STORAGE_KEY)
    return { tokens, userId }
}

export const clearAuthData = () => {
    const { logout } = useAuth()
    logout()
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
}

export const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY))
    return tokens?.accessToken
}