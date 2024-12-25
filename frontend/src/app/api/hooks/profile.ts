import { useMutation } from "react-query"
import { api } from "../axios"
import { EditProfileBody } from "@/types/profile";

export const useEditProfile = () => {
    const { mutateAsync: edit } = useMutation({
        mutationFn: async (body: EditProfileBody) => {
            return await api.put("/profile/edit", body);
        }
    });

    return { edit };
}