import "../../../../css/globals.scss";

export default function ArrowBackSVG({width, color}) {
    return (
        <svg className="global-svgs" style={{width: width, height: width, color: color || "black"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    )
}