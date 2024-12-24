import { svgColor } from "@/utils/extra/utils";
import CloseSVG from "../SVGs/Close";

export default function CloseModalButton({close}) {
    const svgClr = svgColor();

    return (
        <button className="closeModalBtn" onClick={() => close()}>
            <CloseSVG color={svgClr} width={"18px"}/>
        </button>
    )
}