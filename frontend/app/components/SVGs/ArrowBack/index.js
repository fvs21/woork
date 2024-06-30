import "../../../assets/globals.scss";

export default function ArrowBackSVG({width}) {
    return (
        <svg className="global-svgs" style={{width: width, height: width, color: "black"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={width} 
            height={width} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
        </svg>
    )
}