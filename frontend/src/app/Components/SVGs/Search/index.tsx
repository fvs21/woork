import { SVGProps } from "@/types/global";
import { memo } from "react"

function SearchSVG({width, color}: SVGProps) {
    return (
        <svg className="global-svgs" style={{width: width, height: width, color: color ? color : "black"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
    )
}

export default memo(SearchSVG);