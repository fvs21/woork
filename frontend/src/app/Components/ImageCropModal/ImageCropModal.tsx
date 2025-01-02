import { svgColor } from "@/utils/extra/utils";
import Modal from "../Modal/Modal";
import CloseSVG from "../SVGs/Close";
import ZoomSVG from "../SVGs/Zoom";
import styles from "./ImageCropModal.module.scss";
import React, { useEffect, useRef, useState } from "react";

export default function ImageCropModal({image, setImage, closeModal}) {
    const [mouseDown, setMouseDown] = useState(false);
    const [startY, setStartY] = useState<number>();
    const [startX, setStartX] = useState<number>();
    const [scrollTop, setScrollTop] = useState<number>();
    const [scrollLeft, setScrollLeft] = useState<number>();
    const [showGrid, setShowGrid] = useState(false);

    const cropRef = useRef(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [zoom, setZoom] = useState(1);
    const [transformedZoom, setTransformedZoom] = useState(1);

    const startDragging = (e: React.MouseEvent) => {
        e.preventDefault();

        setShowGrid(true);

        setMouseDown(true);
        setStartY(e.pageY - cropRef.current.offsetTop);
        setStartX(e.pageX - cropRef.current.offsetLeft);
        setScrollTop(cropRef.current.scrollTop);
        setScrollLeft(cropRef.current.scrollLeft);
    }

    const stopDragging = (e: React.MouseEvent) => {
        setMouseDown(false);

        if(showGrid)
            setShowGrid(false);
    }

    const move = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if(!mouseDown)
            return;

        const y = e.pageY - cropRef.current.offsetTop;
        const x = e.pageX - cropRef.current.offsetLeft;
        const scrollY = y - startY;
        const scrollX = x - startX;
        cropRef.current.scrollTop = scrollTop - scrollY;
        cropRef.current.scrollLeft = scrollLeft - scrollX;
    }

    function crop(e) {
        e.preventDefault();

        const x = cropRef.current.scrollLeft;
        const y = cropRef.current.scrollTop;

        const realWidth = imageRef.current.naturalWidth;
        const realHeight = imageRef.current.naturalHeight;

        const width = imageRef.current.width * transformedZoom;
        const height = imageRef.current.height * transformedZoom;

        const ratioY = realHeight / height;
        const ratioX = realWidth / width;

        const diffY = (height - cropRef.current.clientHeight);
        const diffX = (width - cropRef.current.clientWidth);

        const dimension = realHeight > realWidth ? realWidth : realHeight;

        const canvas = document.createElement('canvas');
        canvas.width = dimension;
        canvas.height = dimension;

        const context = canvas.getContext('2d');
        
        context.drawImage(imageRef.current, x*ratioX, y*ratioY, realWidth - (diffX*ratioX), realHeight - (diffY*ratioY), 0, 0, dimension, dimension);
        canvas.toBlob((blob) => {
            const file = new File([blob], image.name, {
                type: "image/jpeg"
            });

            if(("index" in image))
                setImage(image.index, file);
            else
                setImage(file);    
        }, "image/jpeg");
        
        canvas.remove();
        closeModal()
    }

    function changeZoom(zoom: string) {
        const zoomNumber: number = Number(zoom);
        const oldRange = 100 - 1;
        const newRange = 2 - 1;
        
        setTransformedZoom((((zoomNumber - 1) * newRange) / oldRange) + 1); 
        setZoom(zoomNumber);
    }

    useEffect(() => {
        const img = new Image();
        img.src = URL.createObjectURL(image?.file || image);

        img.onload = () => {
            if(img.width < img.height)
                cropRef.current.style.flexDirection = "row";
            else
                cropRef.current.style.flexDirection = "column";
        }

    });

    return (
        <Modal className={styles.imageCropModalContainer}>
            <div className={styles['image-crop-modal']}>
                <div className={styles.modalHeader}>
                    <button className="closeModalBtn" type="button" onClick={closeModal}>
                        <CloseSVG width={"20px"} color={svgColor()}/>
                    </button>
                    <div className={styles.modalTitle}>Recortar</div>
                </div>
                <div className={styles.imageCropContainer}>
                    <div 
                        ref={cropRef} 
                        className={styles.imageCrop}
                        onMouseMove={move}
                        onMouseDown={startDragging}
                        onMouseUp={stopDragging}
                        onMouseLeave={stopDragging}>
                            <img 
                                ref={imageRef} 
                                style={{transform: `scale(${transformedZoom})`, transformOrigin: "top left"}} 
                                className={styles.imageToCrop} 
                                src={URL.createObjectURL(image?.file || image)} />
                        {showGrid && <div className={styles.gridLine}></div>}
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    <div style={{display: "flex"}}>
                        <div style={{lineHeight: 0}}>
                            <ZoomSVG width={"18px"} color={svgColor()}/>
                        </div>
                        <input 
                            className={styles.zoomBar}
                            type="range" 
                            value={zoom} 
                            onChange={(e) => changeZoom(e.target.value)} 
                            min={1} 
                            max={100}/>
                    </div>
                    <button className={styles.cropBtn} type="button" onClick={crop}>Recortar</button>
                </div>
            </div>
        </Modal>
    )
}