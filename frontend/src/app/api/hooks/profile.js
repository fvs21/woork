import { useMutation } from "react-query"
import { api } from "../axios"

export const useEditProfile = () => {
    const { mutateAsync: edit } = useMutation({
        mutationFn: async (body) => {
            return await api.put("/profile/edit", body);
        }
    });

    return { edit };
}