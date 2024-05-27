import styles from './Form.module.scss'

export default function Form(props) {
    return (
        <div className={styles['form-overlay']}>
            <div className={styles['form-container']}>
                {props.children}
            </div>
        </div>
    )
}