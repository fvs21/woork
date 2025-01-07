import { useQueryClient } from "react-query"
import { Notification } from "../types";

export const notificationMutations = () => {
    const queryClient = useQueryClient();

    const addNotification = (notification: Notification) => {
        queryClient.setQueryData(['notifications'], 
            (prevData: Array<Notification>) => [
                notification, ...prevData
            ]
        );
    }

    return { addNotification };
}