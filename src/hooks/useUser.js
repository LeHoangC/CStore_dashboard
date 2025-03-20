import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "../data/api-endpoint"
import { usersApi } from "../services/api"

export const useUsers = (page, search) => {
    return useQuery({
        queryKey: [API_ENDPOINT.USERS, page, search],
        queryFn: () => usersApi.getAll(page, search)
    })
}