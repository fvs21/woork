import styles from './SubmitButton.module.scss';

export default function SubmitButton({children, width, active}) {
    return (
        <button type="sumbit" style={width ? {width: width, height: "auto"} : {width: "100%"}} 
            className={` ${styles['submit-btn']} ${active ? styles['active'] : styles['inactive']}`} disabled={!active}>
                {children}
        </button>
    )
}