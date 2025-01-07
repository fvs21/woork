import { useMutation, useQueryClient } from "react-query"
import { api } from "../axios"
import { AcceptApplicantRequest, AcceptJobApplicationResponse } from "@/features/postingsdashboard/types"

export const useAcceptApplicant = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: accept, isLoading, isSuccess } = useMutation({
        mutationFn: async (body: AcceptApplicantRequest): Promise<AcceptJobApplicationResponse> => {
            const request = await api.post<AcceptJobApplicationResponse>("/posting/application/accept", body);
            return request.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['host-job-sessions'])
        }
    });

    return {
        accept,
        isLoading,
        acceptApplicantInvalid: isLoading || isSuccess
    };
}