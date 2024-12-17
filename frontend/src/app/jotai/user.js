import { useAtom } from "jotai";
import { appPropsAtom, notificationsAtom, searchLocationAtom, userAtom } from "./store";

/** 
export const useUser = () => {
    return useAtom(userAtom);
}

export const useAddedAddresses = () => {
    const [props, setProps] = useAtom(appPropsAtom);

    function changeAddedAddresses(addresses) {
        setProps({
            ...props,
            added_addresses: addresses
        })
    }

    return [props.added_addresses, changeAddedAddresses];
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useAtom(notificationsAtom);

    const mutations = {
        addNotification: (notification) => {
            setNotifications(prevState => ([
                notification,
                ...prevState
            ]));
        },
        removeNotification: (id, index) => {
            const copy = [...notifications];
            copy.splice(index, 1);
            setNotifications(copy);
        },
        readNotification: (index) => {
            const copy = [...notifications];
            copy[index].read = true;
            setNotifications(copy);
        }
    }

    return { notifications, ...mutations }
}

export const useSearchLocation = () => {
    return useAtom(searchLocationAtom);
}
    */