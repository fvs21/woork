import { SVGProps } from "@/types/global";
import { memo } from "react";

const Filter = ({width, color}: SVGProps) => {
    return (
        <svg style={{color: color || "black"}} xmlns="http://www.w3.org/2000/svg" width={width} height={width} fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
        </svg>
    )
}

export default memo(Filter);