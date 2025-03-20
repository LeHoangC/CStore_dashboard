import { useMutation, useQuery } from "@tanstack/react-query"
import { invalidateQueries, productsApi } from "../services/api"
import { API_ENDPOINT } from "../data/api-endpoint"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useProducts = (page, searchTerm) => {
    return useQuery({
        queryKey: [API_ENDPOINT.PRODUCTS, page, searchTerm],
        queryFn: () => productsApi.getAll(page, searchTerm)
    })
}

export const useProduct = (slug) => {
    return useQuery({
        queryKey: [API_ENDPOINT.PRODUCTS, slug],
        queryFn: () => productsApi.getBySlug(slug)
    })
}

export const useCreateProductMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: productsApi.create,
        onSuccess: () => {
            toast.success('Thêm sản phẩm mới thành công')
            invalidateQueries(API_ENDPOINT.PRODUCTS)
            navigate(-1)
        },
        onError: err => {
            toast.error(err.message)
        }
    })
}

export const useUpdateProductMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: productsApi.update,
        onSuccess: () => {
            toast.success('Cập nhật sản phẩm thành công')
            invalidateQueries(API_ENDPOINT.PRODUCTS)
            navigate(-1)
        },
        onError: err => {
            toast.error(err.message)
        }
    })
}

export const usePublishProductMutation = () => {
    return useMutation({
        mutationFn: productsApi.publish,
        onSuccess: () => {
            toast.success('Mở khóa sản phẩm thành công')
            invalidateQueries(API_ENDPOINT.PRODUCTS)
        }
    })
}

export const useUnPublishProductMutation = () => {
    return useMutation({
        mutationFn: productsApi.unpublish,
        onSuccess: () => {
            toast.success('Khóa sản phẩm thành công')
            invalidateQueries(API_ENDPOINT.PRODUCTS)
        }
    })
}

export const useAnalytic = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.ANALYTIC_PRODUCTS],
        queryFn: productsApi.analytic,
        staleTime: 2 * 1000 * 60
    })
}