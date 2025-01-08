import { useQueryClient } from "react-query"
import { Notification } from "../types";

export const notificationMutations = () => {
    const queryClient = useQueryClient();

    const addNotification = (notification: Notification) => {
        queryClient.setQueryData(['notifications'], 
            (prevData: Array<Notification>) => {
                if(prevData == undefined)
                    return [notification]
                
                return [notification, ...prevData]
            }
        );
    }

    return { addNotification };
}