import { useMutation, useQuery, useQueryClient } from "react-query"
import { api, apiGuest, apiMultipart } from "../axios"

export const useGetCreatedAddresses = () => {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const request = await api.get("/posting/addresses");
            return request?.data;
        },
        queryKey: ['added-addresses']
    });

    return { data, isLoading };
}

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteAddrs } = useMutation({
        mutationFn: async (body) => {
            return await api.delete("/posting/address/" + body.id);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['added-addresses'], data.data);
        }
    });

    return { deleteAddrs };
}

export const useCreatePosting = () => {
    const { mutateAsync: create, isLoading } = useMutation({
        mutationFn: async (formData) => {
            return await apiMultipart.post("/posting/create", formData);
        }
    });

    return { create, isLoading };
}

export const useFetchPostings = (category) => {
    const path = category == null ? "/explore" : `/explore?category_tag=${category}`;

    const { data, isLoading } = useQuery({
        queryFn: async() => {
            const request = await apiGuest.get(path);
            return request.data;
        },
        queryKey: ['postings', category],
        staleTime: Infinity // just for testing
    });

    return { data, isLoading };
}