import ArrowBackSVG from "../SVGs/ArrowBack";
import ArrowRightSVG from "../SVGs/ArrowRight";
import styles from "./ArrowButton.module.scss";

export default function ArrowButton({width, direction, click}) {
    return (
        <button 
            style={{width: width, height: width, fontSize: width}} 
            className={`${styles['arrow-button']} ${direction == 'right' ? styles.right : styles.left}`} 
            onClick={click}>
            {direction == 'right' ?
                <ArrowRightSVG width={"30px"}/>
            :
                <ArrowBackSVG width={"30px"} />
            }
        </button>
    )
}