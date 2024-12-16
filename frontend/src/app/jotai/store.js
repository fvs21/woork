import { atom, createStore } from "jotai";

export const mainStore = createStore();

export const userAtom = atom({});
export const postingsAtom = atom([]);
export const notificationsAtom = atom([]);
export const appPropsAtom = atom({});
export const searchLocationAtom = atom({});

export function setStore(props) {
    if(props?.auth?.user?.data.length != 0)
        mainStore.set(userAtom, props.auth.user.data);

    if(props?.postings?.data)
        mainStore.set(postingsAtom, props.postings.data);

    if(props?.notifications?.data)
        mainStore.set(notificationsAtom, props.notifications.data);

    if(props?.search_location)
        mainStore.set(searchLocationAtom, props?.search_location);

    let {auth, postings, notifications, search_location, ...rest} = props;
    mainStore.set(appPropsAtom, rest);
}
