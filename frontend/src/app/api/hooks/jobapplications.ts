import { useMutation } from "react-query"
import { api } from "../axios"
import { AcceptApplicantRequest, AcceptJobApplicationResponse } from "@/features/postingsdashboard/types"

export const useAcceptApplicant = () => {
    const { mutateAsync: accept, isLoading, isSuccess } = useMutation({
        mutationFn: async (body: AcceptApplicantRequest): Promise<AcceptJobApplicationResponse> => {
            const request = await api.post<AcceptJobApplicationResponse>("/posting/application/accept", body);
            return request.data;
        }
    });

    return {
        accept,
        isLoading,
        acceptApplicantInvalid: isLoading || isSuccess
    };
}