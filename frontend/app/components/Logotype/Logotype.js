import styles from "./Logotype.module.scss";

export default function Logotype({width}) {
    return (
        <div className={styles['logotype-container']}>
            <img src="/woork-logotype.png" height={"auto"} width={width} alt="Woork logotype" />
        </div>
    )
}