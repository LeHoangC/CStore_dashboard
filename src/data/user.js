import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoint";


// Users Service
export const usersApi = {
    getAll: (page, search) => {
        const params = { page }
        if (search) {
            params['search'] = search
        }
        return axiosInstance.get(API_ENDPOINT.USERS, { params })
    },
    getById: (id) => axiosInstance.get(`/users/${id}`),
    update: (id, user) => axiosInstance.put(`/users/${id}`, user),
    delete: (id) => axiosInstance.delete(`/users/${id}`)
};


export const useUsers = (page, search) => {
    return useQuery({
        queryKey: [API_ENDPOINT.USERS, page, search],
        queryFn: () => usersApi.getAll(page, search)
    })
}