import { useMutation, useQuery, useQueryClient } from "react-query"
import { api, apiGuest, apiMultipart } from "../axios"
import { notFound, useRouter } from "next/navigation";
import axios from "axios";

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
        },
        onSuccess: (body) => {
            console.log(body);
            
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


export const usePosting = (id) => {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => {
            const request = await api.get(`/posting/${id}`)
            return request.data;
        },
        queryKey: ['posting', id],
        staleTime: Infinity,
        retry: false,
        onError: () => {
            router.push("/explore");
        }
    });

    return { data, isLoading, isError };
}

export const useApplyToJob = (postingId) => {
    const queryClient = useQueryClient();

    const { mutateAsync: apply, isLoading } = useMutation({
        mutationFn: async () => {
            return await api.post("/posting/apply", {
                id: postingId
            });
        },
        onSuccess: (data) => {
            const status = data.data;

            queryClient.setQueryData(['posting', postingId], 
                (prevData) => ({
                    ...prevData,
                    postingApplicationStatus: status == 'requested' ? status : null
                })
            );
        }
    });

    return { apply, isLoading };
}

export const useFetchPostingApplicants = (id) => {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const request = await api.get(`/posting/${id}/applicants`);
            return request.data;
        },
        queryKey: ['applicants', id],
        staleTime: Infinity
    });

    return { data, isLoading };
}

export const useCreatedPostings = () => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const request = await api.get("/posting/created");
            return request.data;
        },
        queryKey: ['created-postings'],
        staleTime: Infinity,
        onSuccess: (data) => {
            for(let i = 0; i<data.length; i++) {
                const posting = data[i];
                
                queryClient.setQueryData(['posting', posting.url], {
                    data: posting,
                    postingApplicationStatus: null
                });
            }
        }
    });

    return { data, isLoading };
}

export const useDeletePosting = () => {
    const { mutateAsync: deletePosting } = useMutation({
        mutationFn: async (id) => {
            return await api.delete(`posting/${id}`);
        }
    });

    return { deletePosting };
}