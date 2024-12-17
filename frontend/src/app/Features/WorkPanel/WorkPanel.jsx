import { useUser } from "@/api/hooks/user";
import styles from "./WorkPanel.module.scss";
import StarSVG from "@/components/SVGs/Star";
import { useTheme } from "@/hooks/theme";
import { svgColor } from "@/utils/extra/utils";

export default function WorkPanel() {
    const user = useUser();

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