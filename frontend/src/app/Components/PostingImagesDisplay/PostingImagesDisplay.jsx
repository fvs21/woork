import ArrowButton from "../ArrowButton/ArrowButton";
import styles from "./PostingImagesDisplay.module.scss";
import { useState, useRef } from "react";

export default function PostingImagesDisplay({urls, className}) {
    const [imageDisplayed, setImageDisplayed] = useState(0);
    const ref = useRef(null);

    function changeImageDisplayed(e, image) {
        e.stopPropagation();
        e.preventDefault();

        setImageDisplayed(image);
    }

    return (
        <div className={styles['images-display-container']}>
            <img 
                ref={ref}
                className={`${styles['job-image']} ${className}`} 
                src={urls[imageDisplayed] || "/no-image.jpg"} 
                alt=""/>
            {(urls.length > 1 && imageDisplayed != urls.length-1) &&
                <ArrowButton width={"30px"} direction={"right"} click={(e) => changeImageDisplayed(e, imageDisplayed+1)} />
            }
            {(urls.length > 1 && imageDisplayed > 0) &&
                <ArrowButton width={"30px"} direction={"left"} click={(e) => changeImageDisplayed(e, imageDisplayed-1)} />
            }
        </div>
    )
}