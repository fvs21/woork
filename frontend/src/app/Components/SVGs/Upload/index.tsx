import { SVGProps } from "@/types/global";

export default function UploadSVG({width, color}: SVGProps) {
    return (
        <svg className="global-svgs" style={{width: width, height: width, color: color ? color : "black"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
        </svg>
    )
}