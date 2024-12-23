import styles from "./LoadingSpinnerClear.module.scss";

export default function LoadingSpinnerClear({width}) {
    const style = {
        width: width,
        height: width,
        border: `calc(${width} / 7) dotted #FFF`,
    }
    return (
        <span style={style} className={styles.loader}></span>
    )
}