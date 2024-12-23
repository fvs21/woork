export default function MutationButton({classname, click, disable, children, ...props}) {
    return (
        <button onClick={click} className={classname} disabled={disable} {...props}>
            {children}
        </button>
    )
}