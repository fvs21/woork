import React, { MouseEventHandler } from "react"

interface MutationButtonProps {
    classname: string,
    click: MouseEventHandler<HTMLButtonElement>,
    disable: boolean,
    children: React.ReactNode,
    [x:string]: any
}

export default function MutationButton({classname, click, disable, children, ...props}: MutationButtonProps) {
    return (
        <button onClick={click} className={classname} disabled={disable} {...props}>
            {children}
        </button>
    )
}