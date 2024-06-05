import styles from './ValidatedInput.module.scss'

export default function InputBox({children}) {
    return (
        <div className={styles['input-container']}>
            {children}
        </div>
    )
}