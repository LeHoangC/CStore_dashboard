import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { invalidateQueries } from "../configs/react-query.config";
import { API_ENDPOINT } from "./api-endpoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Categories Service
const categoriesApi = {
    getAll: () => axiosInstance.get(API_ENDPOINT.CATEGORIES),
    getById: (id) => axiosInstance.get(`${API_ENDPOINT.CATEGORIES}/${id}`),
    delete: (id) => axiosInstance.delete(`${API_ENDPOINT.CATEGORIES}/${id}`),
    create: (cate) => axiosInstance.post(`/${API_ENDPOINT.CATEGORIES}`, cate),
    update: ({ id, ...input }) => axiosInstance.patch(`/${API_ENDPOINT.CATEGORIES}/${id}`, input)
};


export const useCategories = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.CATEGORIES],
        queryFn: categoriesApi.getAll
    })
}

export const useCategory = (id) => {
    return useQuery({
        queryKey: [API_ENDPOINT.CATEGORIES, id],
        queryFn: () => categoriesApi.getById(id)
    })
}

export const useCreateCategoryMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: categoriesApi.create,
        onSuccess: () => {
            toast.success('Thêm danh mục thành công')
            invalidateQueries(API_ENDPOINT.CATEGORIES)
            navigate(-1)
        },
        onError: err => {
            toast.error(err.message)
        }
    })
}

export const useUpdateCategoryMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: categoriesApi.update,
        onSuccess: () => {
            toast.success('Chỉnh sửa danh mục thành công')
            invalidateQueries(API_ENDPOINT.CATEGORIES)
            navigate(-1)
        },
        onError: err => {
            toast.error(err.message)
        }
    })
}

export const useDeleteCategoryMutation = () => {
    return useMutation({
        mutationFn: categoriesApi.delete,
        onSuccess: () => {
            toast.success('Xóa danh mục thành công')
            invalidateQueries(API_ENDPOINT.CATEGORIES)
        }
    })
}