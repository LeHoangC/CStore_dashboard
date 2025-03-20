import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { API_ENDPOINT } from '../data/api-endpoint';
import { useAuthStore } from '../store/authStore';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 60000, // 1 phút
            cacheTime: 600000, // 10 phút
            retry: 1,
        },
    },
});

const API_URL = '/api'; // Có thể thay đổi base URL tùy môi trường

// Danh sách các public endpoints không cần auth headers
const PUBLIC_ENDPOINTS = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
];

// Tạo instance axios
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Biến để theo dõi nếu đang refresh token
let isRefreshing = false;
// Mảng chứa các requests đang đợi refresh token hoàn tất
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Request interceptor - thêm token vào header
axiosInstance.interceptors.request.use(
    config => {
        const endpoint = config.url.replace(API_URL, '');

        if (!PUBLIC_ENDPOINTS.includes(endpoint)) {
            const { user, tokens } = useAuthStore.getState();
            if (tokens?.accessToken) {
                config.headers.authorization = tokens.accessToken;
            }
            if (user) {
                config.headers['x-client-id'] = user._id;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor - xử lý refresh token
axiosInstance.interceptors.response.use(
    response => response.data,
    async error => {
        const originalRequest = error.config;

        const isAuthError = error.response?.status === 401;
        const isServerError = error.response?.status === 500;

        const isExpiredTokenError = isServerError &&
            error.response?.data?.message?.includes('jwt expired');

        if ((isAuthError || isExpiredTokenError) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.authorization = token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;


            try {
                const { user: userStore, tokens: tokensStore, login } = useAuthStore.getState();
                if (!tokens?.refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Gọi API refresh token bằng axios thông thường để tránh vòng lặp
                const response = await axios.post(`${API_URL}/auth/refreshToken`, {}, {
                    headers: {
                        "x-client-id": userStore._id,
                        "x-rtoken-id": tokensStore.refreshToken,
                    }
                });
                const { user, tokens } = response.data;
                login(user, tokens)

                // Cập nhật token cho request ban đầu
                originalRequest.headers.authorization = tokens.accessToken;

                // Xử lý queue
                processQueue(null, tokens.accessToken);
                isRefreshing = false;

                // Thực hiện lại request ban đầu
                return axiosInstance(originalRequest);

            } catch (err) {
                processQueue(err, null);
                isRefreshing = false;
                window.location.href = '/'

                return Promise.reject(err);
            }
        }

        return Promise.reject(error.response?.data || error);
    }
);

// Auth Service
export const authApi = {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    register: (userData) => axiosInstance.post('/auth/register', userData),
    logout: () => axiosInstance.post('/auth/logout'),
    refreshToken: (token) => axiosInstance.post('/auth/refreshToken', { refreshToken: token }),
    forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email })
};

// Products Service
export const productsApi = {
    getAll: (page, searchTerm) => {
        const params = { page, limit: 5, isAdmin: true }
        if (searchTerm) {
            params['search'] = searchTerm
        }
        return axiosInstance.get('/products', { params })
    },
    getBySlug: (slug) => axiosInstance.get(`/products/${slug}`),
    create: (product) => axiosInstance.post('/products', product),
    update: ({ id, ...product }) => axiosInstance.patch(`/products/${id}`, product),

    publish: (id) => axiosInstance.post(`/products/publish/${id}`),
    unpublish: (id) => axiosInstance.post(`/products/unpublish/${id}`),

    analytic: () => axiosInstance.get(API_ENDPOINT.ANALYTIC_PRODUCTS)
};

// Categories Service
export const categoriesApi = {
    getAll: () => axiosInstance.get(API_ENDPOINT.CATEGORIES),
    getById: (id) => axiosInstance.get(`categories/${id}`),
    delete: (id) => axiosInstance.delete(`categories/${id}`),
    create: (cate) => axiosInstance.post('/categories', cate),
    update: ({ id, ...input }) => axiosInstance.patch(`/categories/${id}`, input)
};

// Users Service
export const usersApi = {
    getAll: (page, search) => {
        const params = { page }
        if (search) {
            params['search'] = search
        }
        return axiosInstance.get('/users', { params })
    },
    getById: (id) => axiosInstance.get(`/users/${id}`),
    update: (id, user) => axiosInstance.put(`/users/${id}`, user),
    delete: (id) => axiosInstance.delete(`/users/${id}`)
};

//Order Service
export const ordersApi = {
    getAllOrder: (page, searchTerm) => {
        const params = { page }
        if (searchTerm) {
            params['search'] = searchTerm
        }
        return axiosInstance.get('/orders', { params })
    },
    analytic: () => axiosInstance.get(API_ENDPOINT.ANALYTIC_ORDER)
}

export const settings = {
    getBanners: () => axiosInstance.get(`${API_ENDPOINT.SETTING}/banners`),
    updateBanner: (banners) => axiosInstance.post(`${API_ENDPOINT.SETTING}/update-banners`, banners)
}

export const invalidateQueries = (queryKey) => {
    return queryClient.invalidateQueries(queryKey);
};