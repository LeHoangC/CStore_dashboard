import { axiosInstance } from "../configs/axios.config";

export const authApi = {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    register: (userData) => axiosInstance.post('/auth/register', userData),
    logout: () => axiosInstance.post('/auth/logout'),
    refreshToken: (token) => axiosInstance.post('/auth/refreshToken', { refreshToken: token }),
    forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email })
};