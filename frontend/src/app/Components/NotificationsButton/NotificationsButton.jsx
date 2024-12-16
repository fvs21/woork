import { useTheme } from "@/Hooks/theme";
import MailSVG from "../SVGs/Mail";
import styles from "./NotificationsButton.module.scss";

export default function NotificationsButton({count, click}) {
    const [theme] = useTheme();

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