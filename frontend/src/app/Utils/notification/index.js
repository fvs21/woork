import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import relativeTime from "dayjs/plugin/relativeTime";

export const formatNotificationDate = (date) => {
    dayjs.extend(relativeTime);
    dayjs.locale('es-mx');

    return dayjs(date).fromNow();
}

//filter notifications by unread
export const getUnreadNotificationsCount = (notifications) => {
    if(notifications?.length == 0)
        return 0;
    
    return notifications?.filter(
        (not) => {
            return !not.read;
        }
    ).length;
}