import { useMutation, useQuery, useQueryClient } from "react-query"
import { api, apiGuest, apiMultipart } from "../axios"
import { useRouter } from "next/navigation";

export const useFetchCreatedAddresses = () => {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const request = await api.get("/posting/addresses");
            return request?.data;
        },
        queryKey: ['added-addresses']
    });

    return { data, isLoading };
}

export const useAddedAddresses = () => {
    const queryClient = useQueryClient();

    const setAddresses = (addresses) => {
        queryClient.setQueryData(['added-addresses'], addresses);
    }

    return [
        queryClient.getQueryData(['added-addresses']),
        setAddresses
    ];
}

export const useDeleteAddress = () => {
    const { mutateAsync: deleteAddrs } = useMutation({
        mutationFn: async (id) => {
            return await api.delete("/posting/address/" + id);
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

export const useFetchPostings = (category, location) => {
    const router = useRouter();

    const path = location != null 
        ? `/explore/${location}?category_tag=${category}` 
        : `/explore?category_tag=${category}`;

    const queryKey = location != null 
        ? ['postings', category, location] 
        : ['postings', category];

    const { data, isLoading } = useQuery({
        queryFn: async() => {
            const request = await api.get(path);
            return request.data;
        },
        queryKey: queryKey,
        staleTime: Infinity, // just for testing
        retry: 1,
        onError: () => {
            router.push(`/explore?category_tag=${category}`);
        }
    });

    return { data, isLoading };
}

export const useGetCurrentSearchedLocation = (category, location) => {
    const queryClient = useQueryClient();
    const queryKey = location != null 
        ? ['postings', category, location] 
        : ['postings', category];

    const queryData = queryClient.getQueryData(queryKey);

    return queryData?.search_location != null ? queryData.search_location : {};
}


export const useSearchLocationId = () => {
    const { mutateAsync: search } = useMutation({
        mutationFn: async (body) => {
            const request = await api.post("/address/getid", body);
            return request.data;
        }
    });

    return { search };
}