import { useTheme } from "@/hooks/theme";
import MailSVG from "../SVGs/Mail";
import styles from "./NotificationsButton.module.scss";
import { useNotifications } from "@/features/notifications/api";
import { getUnreadNotificationsCount } from "@/features/notifications/utils";

type NotificationsButtonProps = {
    click: () => void;
}

export default function NotificationsButton({click}: NotificationsButtonProps) {
    const [theme] = useTheme();
    const { data, isLoading } = useNotifications();

    if(isLoading)
        return <></>

    const count = getUnreadNotificationsCount(data);

    return (
        <button 
            className={styles.notificationsBtn}
            onClick={click}>
                <MailSVG width={"28px"} color={theme == 'dark' ? 'white' : 'black'}/>
                {count > 0 &&
                    <div className={styles.notificationCount}>
                        {count < 10 ? count : "+9"}
                    </div>
                }
        </button>                     
    )
}