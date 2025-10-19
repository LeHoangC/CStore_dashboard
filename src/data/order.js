import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { invalidateQueries } from "../configs/react-query.config";
import { API_ENDPOINT } from "./api-endpoint"
import { toast } from "react-toastify";

const ordersApi = {
    getAllOrder: ({ queryKey }) => {
        const [, page, searchTerm] = queryKey
        const params = { page }
        if (searchTerm) {
            params['search'] = searchTerm
        }
        return axiosInstance.get(API_ENDPOINT.ORDERS, { params })
    },
    getOrder: (orderId) => axiosInstance.get(`${API_ENDPOINT.ORDERS}/orderByUser/${orderId}`),
    updateStatusOrder: (data) => axiosInstance.patch(API_ENDPOINT.ORDERS, data),
    analytic: () => axiosInstance.get(API_ENDPOINT.ANALYTIC_ORDER)
}

export const useOrders = (page, searchTerm) => {
    return useQuery({
        queryKey: [API_ENDPOINT.ORDERS, page, searchTerm],
        queryFn: ordersApi.getAllOrder,
    })
}

export const useOrder = (orderId) => {
    return useQuery({
        queryKey: [API_ENDPOINT.ORDERS, orderId],
        queryFn: () => ordersApi.getOrder(orderId),
    })
}

export const useAnalyticOrder = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.ANALYTIC_ORDER],
        queryFn: ordersApi.analytic,
        staleTime: 2 * 1000 * 60
    })
}

export const useUpdateStatusOrderMutation = () => {
    return useMutation({
        mutationFn: ordersApi.updateStatusOrder,
        onSuccess: (data) => {
            toast.success('Cập nhật trạng thái thành công')
            invalidateQueries(API_ENDPOINT.ORDERS)
        },
        onError: err => {
            console.log("Error:::", err);

        }
    })
}