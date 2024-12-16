import { memo } from "react";

function CouchSVG({ width, color }) {
    return (
        <svg
            style={{ width: width, height: width }}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier" 
            >
                {" "}
                <path
                    fill={color}
                    d="M448,242.025V152a48.055,48.055,0,0,0-48-48H112a48.055,48.055,0,0,0-48,48v90.025A64.115,64.115,0,0,0,16,304V416a32.036,32.036,0,0,0,32,32H64v48H96V448H416v48h32V448h16a32.036,32.036,0,0,0,32-32V304A64.115,64.115,0,0,0,448,242.025ZM112,416H48V304a32,32,0,0,1,64,0Zm256,0H144V320H368Zm2.025-128H141.975A64.243,64.243,0,0,0,96,242.025V152a16.019,16.019,0,0,1,16-16H400a16.019,16.019,0,0,1,16,16v90.025A64.243,64.243,0,0,0,370.025,288ZM464,416H400V304a32,32,0,0,1,64,0l.02,112Z"
                ></path>{" "}
            </g>
        </svg>
    );
}

export default memo(CouchSVG);