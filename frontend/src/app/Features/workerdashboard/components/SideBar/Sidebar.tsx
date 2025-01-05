import styles from "./Sidebar.module.scss";
import { svgColor } from "@/utils/extra/utils";
import House from "@/components/SVGs/House";
import Pencil from "@/components/SVGs/Pencil";
import Cash from "@/components/SVGs/Cash";

type SideBarProps = {
    option: number;
    setOption: (option: number) => void;
}

export default function Sidebar({option, setOption}: SideBarProps) {
    const svgClr = svgColor();

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.shrinkButtonContainer}>
            </div>
            <div className={styles.menuContainer}>
                <button className={`${styles.menuItem} ${option == 0 && styles.selected}`}
                    onClick={() => setOption(0)}>
                    <House width="22px" color={svgClr} />
                    <span className={styles.optionName}>Principal</span>
                </button>
                <button className={`${styles.menuItem} ${option == 1 && styles.selected}`}
                    onClick={() => setOption(1)}>
                    <Pencil width="22px" color={svgClr} />
                    <span className={styles.optionName}>Editar perfil</span>
                </button>
                <button className={`${styles.menuItem} ${option == 2 && styles.selected}`}
                    onClick={() => setOption(2)}>
                    <Cash width="22px" color={svgClr} />
                    <span className={styles.optionName}>Ingresos</span>
                </button>
            </div>
        </div>
    )
}