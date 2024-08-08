import {useAxiosPrivate} from "./useAxiosPrivate";
import axios from "../api/axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

export function useQueryPostingsByCategoryAndState(category, state) {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            return await axios.get(
                `/posting?category=${category}&state=${state}`
            )
        },
        queryKey: ['postings', category]
    });

    return { data, isLoading };
}

export function useGetUserLocation() {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
           return await axios.get("https://api.ipregistry.co/?key=tryout");
        },
        queryKey: ['user-location'],
        staleTime: Infinity
    });

    return { data, isLoading };
}  