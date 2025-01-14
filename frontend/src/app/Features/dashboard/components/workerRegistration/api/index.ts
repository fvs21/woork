import { api } from "@/api/axios";
import { WorkerVerificationStatus } from "@/features/verification/types";
import { useQuery } from "react-query"

export const useWorkerRegistrationStatus = () => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<WorkerVerificationStatus> => {
            const request = await api.get("/verification/worker/status");
            return request.data;
        },
        queryKey: ['worker-verification-status'],
    });

    return { data, isLoading };
}