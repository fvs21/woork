import { svgColor } from "@/utils/extra/utils"
import ArrowBackSVG from "../SVGs/ArrowBack"
import { memo, MouseEventHandler } from "react";

interface ReturnModalButton {
    func: MouseEventHandler<HTMLButtonElement>
}

const ReturnModalButton = ({func}) => {
    const svgClr = svgColor();

    return (
        <button className="closeModalBtn" onClick={() => func()}>
            <ArrowBackSVG width={"18px"} color={svgClr}/>
        </button>
    )
}

export default memo(ReturnModalButton);