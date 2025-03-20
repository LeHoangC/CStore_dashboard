import { getAuthData } from '../utils/auth'

const API_URL = '/api' // Có thể thay đổi base URL tùy môi trường

// Danh sách các public endpoints không cần auth headers
const PUBLIC_ENDPOINTS = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
]

const createHeaders = (endpoint, customHeaders = {}) => {
    // Nếu là public endpoint, chỉ trả về basic headers và custom headers
    if (PUBLIC_ENDPOINTS.includes(endpoint)) {
        return {
            'Content-Type': 'application/json',
            ...customHeaders
        }
    }

    // Nếu không phải public endpoint, thêm auth headers
    const { userId, tokens } = getAuthData()
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'authorization': tokens?.accessToken,
        'x-client-id': userId || ''
    }

    return {
        ...defaultHeaders,
        ...customHeaders
    }
}

class ApiClient {
    async get(endpoint, customHeaders = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: createHeaders(endpoint, customHeaders)
        })
        return this.handleResponse(response)
    }

    async post(endpoint, data, customHeaders = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: createHeaders(endpoint, customHeaders),
            body: JSON.stringify(data)
        })
        return this.handleResponse(response)
    }

    async put(endpoint, data, customHeaders = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: createHeaders(endpoint, customHeaders),
            body: JSON.stringify(data)
        })
        return this.handleResponse(response)
    }

    async delete(endpoint, customHeaders = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: createHeaders(endpoint, customHeaders)
        })
        return this.handleResponse(response)
    }

    async handleResponse(response) {
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong')
        }

        return data
    }
}

export const apiClient = new ApiClient()

// Auth Service
export const authApi = {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    register: (userData) => apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    refreshToken: (token) => apiClient.post('/auth/refresh', { refreshToken: token }),
    forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email })
}

// Products Service
export const productsApi = {
    getAll: () => apiClient.get('/products'),
    getById: (id) => apiClient.get(`/products/${id}`),
    create: (product) => apiClient.post('/products', product),
    update: (id, product) => apiClient.put(`/products/${id}`, product),
    delete: (id) => apiClient.delete(`/products/${id}`)
}

export const categoriesApi = {
    getAll: () => apiClient.get('/categories')
}

// Users Service
export const usersApi = {
    getAll: () => apiClient.get('/users'),
    getById: (id) => apiClient.get(`/users/${id}`),
    update: (id, user) => apiClient.put(`/users/${id}`, user),
    delete: (id) => apiClient.delete(`/users/${id}`)
}