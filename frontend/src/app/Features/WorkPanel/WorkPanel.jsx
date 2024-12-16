import { useUser } from "@/jotai/user";
import styles from "./WorkPanel.module.scss";
import StarSVG from "@/Components/SVGs/Star";
import { useTheme } from "@/Hooks/theme";
import { svgColor } from "@/Utils/extra/utils";

export default function WorkPanel() {
    const [user] = useUser();

    return (
        <div>
            <div className={styles.header}>
                Perfil de trabajador
            </div>    
            <div>
                {user.is_worker ? 
                    ""
                :
                    ""
                }
            </div>
        </div>
    );
}