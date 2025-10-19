import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_ENDPOINT } from "./api-endpoint";
import { axiosInstance } from "../configs/axios.config";
import { invalidateQueries } from "../configs/react-query.config";

const settings = {
    getBanners: () => axiosInstance.get(`${API_ENDPOINT.SETTING}/banners`),
    updateBanner: (banners) => axiosInstance.post(`${API_ENDPOINT.SETTING}/update-banners`, banners)
}

export const useBanners = (id) => {
    return useQuery({
        queryKey: [API_ENDPOINT.SETTING, 'banner'],
        queryFn: settings.getBanners
    })
}

export const useUpdateBannerMutation = () => {
    return useMutation({
        mutationFn: settings.updateBanner,
        onSuccess: () => {
            toast.success('Cập nhật banners thành công')
            invalidateQueries(API_ENDPOINT.SETTING)
        },
        onError: err => {
            toast.error(err.message)
        }
    })
}
