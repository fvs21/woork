import styles from "./Logotype.module.scss";

type LogotypeProps = {
    width: string;
}

export default function Logotype({width}: LogotypeProps) {
    return (
        <div className={styles['logotype-container']}>
            <img src="/woork-logotype.png" height={"auto"} width={width} alt="Woork logotype" />
        </div>
    )
}