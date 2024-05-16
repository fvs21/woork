import './Form.scss'

export default function Form(props) {
    return (
        <div className='form-overlay'>
            <div className='form-container'>
                {props.children}
            </div>
        </div>
    )
}