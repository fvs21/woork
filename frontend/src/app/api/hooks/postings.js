import { useMutation } from "react-query"
import { apiMultipart } from "../axios"

export const useCreatePosting = () => {
    const { mutateAsync: create, isLoading } = useMutation({
        mutationFn: async (formData) => {
            return await apiMultipart.post("/posting/create", formData);
        }
    });

    return { create, isLoading };
}