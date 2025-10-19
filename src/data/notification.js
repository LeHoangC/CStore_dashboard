import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoint";
import { invalidateQueries } from "../configs/react-query.config";

const notificationApi = {
    getAllNotifications: () => axiosInstance.get(API_ENDPOINT.NOTIFICATIONS),
    markAsRead: (id) => axiosInstance.patch(`${API_ENDPOINT.NOTIFICATIONS}/${id}`),
}

export const useNotifications = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.NOTIFICATIONS],
        queryFn: notificationApi.getAllNotifications,
    })
}

export const useMarkAsReadNotification = () => {
    return useMutation({
        mutationFn: notificationApi.markAsRead,
        onSuccess: () => {
            invalidateQueries(API_ENDPOINT.NOTIFICATIONS)
        },
    })
}