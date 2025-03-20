import { useMutation, useQuery } from '@tanstack/react-query';
import { categoriesApi, invalidateQueries, queryClient } from '../services/api';
import { API_ENDPOINT } from '../data/api-endpoint';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Thêm import này


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