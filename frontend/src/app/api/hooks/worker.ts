import { useMutation, useQueryClient } from "react-query"
import { api } from "../axios"
import { User, Worker } from "@/types/global";

interface WorkerRegistrationResponse {
    user: User,
    worker: Worker
}

export const useRegisterWorker = () => {
    const queryClient = useQueryClient();
    
    const { mutateAsync: register, isLoading, isSuccess } = useMutation({
        mutationFn: async (): Promise<WorkerRegistrationResponse> => {
            const request = await api.post("/worker/register");
            return request.data;
        },
        onSuccess: (data: WorkerRegistrationResponse) => {
            queryClient.setQueryData(['user-info'], data.user);
        }
    });

    return {
        register,
        isLoading,
        registerWorkerInvalid: isLoading || isSuccess
    };
}