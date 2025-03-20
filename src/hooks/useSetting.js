import { useMutation, useQuery } from '@tanstack/react-query';
import { settings, invalidateQueries } from '../services/api';
import { API_ENDPOINT } from '../data/api-endpoint';
import { toast } from 'react-toastify';

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
