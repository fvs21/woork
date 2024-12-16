import styles from "./Logotype.module.scss";

export default function LogotypeWhite({width}) {
    return (
        <div className={styles['logotype-container']}>
            <img src="/woork-logotype-white.png" height={"auto"} width={width} alt="Woork logotype" />
        </div>
    )
}