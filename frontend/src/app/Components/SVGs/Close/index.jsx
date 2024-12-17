export default function CloseSVG({width, color}) {
    return (
        <svg className="global-svgs" style={{width: width, height: width, color: color || "black"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
            width={width} height={width} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
    )
}
