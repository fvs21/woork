import { useQuery } from "react-query"
import { api } from "../axios"
import { HostPendingJob } from "@/features/postingsdashboard/types";

export const useCurrentJobSessions = (): { data: Array<HostPendingJob>, isLoading: boolean } => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Array<HostPendingJob>> => {
            const request = await api.get("/pending_jobs");
            return request.data;
        },
        queryKey: ['host-job-sessions']
    });

    return { data, isLoading };
}