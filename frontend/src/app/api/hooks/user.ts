import { useMutation, useQueryClient } from "react-query";
import { api, apiMultipart } from "../axios";
import { User } from "@/types/global";

export const useUser = (): [User, Function] => {
    const queryClient = useQueryClient();

    const setUser = (data: User) => {
        queryClient.setQueryData(['user-info'], data);
    }

    return [
        queryClient.getQueryData(['user-info']),
        setUser
    ];
}

export const useUpdatePfp = () => {
    const [, setUser] = useUser();

    const { mutateAsync: update } = useMutation({
        mutationFn: async (image: Blob) => {
            const formdata = new FormData();
            formdata.append("image", image);
            return await apiMultipart.patch("/user/pfp/update", formdata);
        }, 
        onSuccess: (data) => {
            setUser(data.data);
        }
    });

    return { update };
}

export const useUpdateAddress = () => {
    const [, setUser] = useUser();

    const { mutateAsync: update } = useMutation({
        mutationFn: async (body) => {
            return await api.patch("/user/address/update", body);
        },
        onSuccess: (data) => {
            setUser(data.data);
        }
    });

    return { update };
} 

export const useUpdateDob = () => {
    const [, setUser] = useUser();

    const { mutateAsync: update } = useMutation({
        mutationFn: async (body) => {
            return await api.patch("/user/dob/update", body);
        },
        onSuccess: (data) => {
            setUser(data.data);
        }
    });

    return { update };
}

export const useUpdateGender = () => {
    const [, setUser] = useUser();

    const { mutateAsync: update } = useMutation({
        mutationFn: async (body) => {
            return await api.patch("/user/gender/update", body);
        },
        onSuccess: (data) => {
            setUser(data.data);
        }
    });

    return { update };
}