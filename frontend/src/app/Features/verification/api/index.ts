import { api, apiMultipart } from "@/api/axios";
import { useMutation, useQuery } from "react-query";
import { VerificationStatus } from "../types";

export const useVerificationStatus = () => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<VerificationStatus> => {
            const request = await api.get<VerificationStatus>("/verification/status");
            return request.data;
        },
        queryKey: ['verification-status'],
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    return { data, isLoading };
}

export const useUploadId = () => {
    const { mutateAsync: upload, isLoading, isError } = useMutation({
        mutationFn: async (formData: FormData) => {
            const request = await apiMultipart.post("/verification/id", formData);
            return request.data;
        }
    });

    return { 
        upload, 
        isLoading,
        uploadDisabled: isLoading && !isError
    };
}