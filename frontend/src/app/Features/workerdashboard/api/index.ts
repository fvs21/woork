import { useQuery } from "react-query"
import { WorkerPendingJob } from "../types"
import { api } from "@/api/axios"

export const useGetWorkerPendingJobs = () => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Array<WorkerPendingJob>> => {
            const request = await api.get("/pending_jobs/worker");
            return request.data;
        },
        queryKey: ['worker-jobs']
    });

    return { data, isLoading };
}