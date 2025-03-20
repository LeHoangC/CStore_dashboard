import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "../data/api-endpoint"
import { ordersApi } from "../services/api"

export const useOrders = (page, searchTerm) => {
    return useQuery({
        queryKey: [API_ENDPOINT.ORDERS, page, searchTerm],
        queryFn: () => ordersApi.getAllOrder(page, searchTerm),
    })
}

export const useAnalytic = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.ANALYTIC_ORDER],
        queryFn: ordersApi.analytic,
        staleTime: 2 * 1000 * 60
    })
}
