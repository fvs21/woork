import InputLabel from "@/components/ValidatedInput/InputLabel";
import styles from "./CreatePosting.module.scss";
import UploadSVG from "@/components/SVGs/Upload";
import { lazy, useRef, useState } from "react";
import CloseSVG from "@/components/SVGs/Close";
import { checkIfValidImage } from "@/utils/account/AccountUtils";
import { flash } from "@/flash-message/flashMessageCreator";

export default function ImagesInput({images, setImages, setImageDisplayed, setImagesToPreview}) {
    const imgInput1 = useRef(null);
    const imgInput2 = useRef(null);
    const imgInput3 = useRef(null);

    const [imagesUrls, setImagesUrls] = useState(["", "", ""]);

    const [imageDragOver1, setImageDragOver1] = useState(false);
    const [imageDragOver2, setImageDragOver2] = useState(false);
    const [imageDragOver3, setImageDragOver3] = useState(false);


    const [alertMessage, setAlertMessage] = useState("");

    function changeImage(index, file) {
        let urls = [...imagesUrls];
        urls[index] = file != null ? URL.createObjectURL(file) : "";
        setImagesUrls(urls);  

        const filtered = urls.filter(Boolean);

        setImagesToPreview(filtered);

        if(file == null) { 
            setImageDisplayed(filtered.length-1);
        } else {
            if(filtered.length == 1)
                setImageDisplayed(0);
        }

        
        let files = [...images];
        files[index] = file;

        setImages(files);
    }

    function onImageChange(event, index) {
        if(event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if(!checkIfValidImage(file)) {
                setAlertMessage("El formato de las imagenes debe ser jpg/jpeg");
                return;
            }

            changeImage(index, file);
        } 
    }

    function dropImage(e, index) {
        e.preventDefault();

        if(e.dataTransfer.items) {
            const file = e.dataTransfer.items[0].getAsFile();
            if(!file || !checkIfValidImage(file)) {
                flash("El formato de las imagenes debe ser jpg/jpeg", 4000, "error");
                dragOutImage(e, index);
                return;
            }
            changeImage(index, file);
        } else {
            const file = e.dataTransfer.files[0];
            if(!checkIfValidImage(file)) {
                flash("El formato de las imagenes debe ser jpg/jpeg", 4000, "error");
                dragOutImage(e, index);
                return;
            }
            changeImage(index, file);
        }

        dragOutImage(e, index);
    }

    function dragOverImage(event, index) {
        event.preventDefault();

        switch(index) {
            case 0:
                setImageDragOver1(true);
                break;
            case 1:
                setImageDragOver2(true);
                break;
            case 2: 
                setImageDragOver3(true);
                break;
        }
    }

    function dragOutImage(e, index) {
        e.preventDefault();

        switch(index) {
            case 0:
                setImageDragOver1(false);
                break;
            case 1:
                setImageDragOver2(false);
                break;
            case 2: 
                setImageDragOver3(false);
                break;
        } 
    }

    function deleteImage(index) {
        let urls = [...imagesUrls];
        urls[index] = "";
        setImagesUrls(urls);

        switch(index) {
            case 0:
                imgInput1.current.value = "";
                break;
            case 1:
                imgInput2.current.value = "";
                break;
            case 2: 
                imgInput3.current.value = "";
                break;
        } 

        changeImage(index, null);
    }

    return (
        <div className={`${styles['images-input-container']} ${styles['input-field']}`}>
            <InputLabel>Imagenes (opcional)</InputLabel>
            <div style={{fontSize: "14px"}}>
                Puedes subir hasta 3 imagenes.
            </div>
            <br/>
            <div className={styles['images-submit-form-container']}>
                {/** First image input */}
                <div
                    style={{border: imagesUrls[0] && 'none'}} 
                    className={`${styles['image-input']} ${imageDragOver1 && styles['image-dragover']}`}
                    onDrop={(e) => dropImage(e, 0)}
                    onDragOver={(e) => dragOverImage(e, 0)}
                    onDragLeave={(e) => dragOutImage(e, 0)}>
                        {/**If image has been uploaded */}
                        {imagesUrls[0] && 
                            <>
                                <button 
                                    className={styles['delete-image-btn']}
                                    type="button"
                                    onClick={() => deleteImage(0)}>
                                        <CloseSVG width={"25px"}/>
                                </button>
                                <button 
                                    type="button"
                                    className={styles['image-viewer-container']}
                                    onClick={() => imgInput1.current.click()}>
                                    <img className={styles['image-viewer']} src={imagesUrls[0]} />
                                </button>
                            </>
                        }
                        {/**If image has not been uploaded */}
                        {!imagesUrls[0] && 
                            <button 
                                className={styles['upload-image-btn']}
                                type="button"
                                onClick={() => imgInput1.current.click()}>
                                    <UploadSVG width={"30px"} color={"gray"}/>
                                    <br/>
                                    <div className={styles['upload-image-text']}>Elige o arrastra una imagen</div>
                            </button>
                        }
                        <input id="image-input-1" hidden ref={imgInput1} onChange={(e) => onImageChange(e, 0)} type="file" accept="image/jpeg, image/jpg"/>
                </div>

                {/**Second image input */}
                <div 
                    style={{border: imagesUrls[1] && 'none'}} 
                    className={`${styles['image-input']} ${imageDragOver2 && styles['image-dragover']}`}
                    onDrop={(e) => dropImage(e, 1)}
                    onDragOver={(e) => dragOverImage(e, 1)}
                    onDragLeave={(e) => dragOutImage(e, 1)}>

                        {imagesUrls[1] && 
                            <>
                                <button 
                                    className={styles['delete-image-btn']}
                                    type="button"
                                    onClick={() => deleteImage(1)}>
                                    <CloseSVG width={"25px"}/>
                                </button>
                                <button 
                                type="button"
                                className={styles['image-viewer-container']}
                                onClick={() => imgInput2.current.click()}>
                                    <img className={styles['image-viewer']} src={imagesUrls[1]} />
                                </button>
                            </>
                        }
                        {!imagesUrls[1] && 
                            <button 
                                className={styles['upload-image-btn']}
                                type="button"
                                onClick={() => imgInput2.current.click()}>
                                    <UploadSVG width={"30px"} color={"gray"}/>
                                    <br/>
                                    <div className={styles['upload-image-text']}>Elige o arrastra una imagen</div>
                            </button>
                        }
                    <input id="image-input-2" hidden ref={imgInput2} onChange={(e) => onImageChange(e, 1)} type="file" accept="image/jpeg, image/jpg"/>
                </div>

                {/**Third image input */}
                <div 
                    style={{border: imagesUrls[2] && 'none'}} 
                    className={`${styles['image-input']} ${imageDragOver3 && styles['image-dragover']}`}
                    onDrop={(e) => dropImage(e, 2)}
                    onDragOver={(e) => dragOverImage(e, 2)}
                    onDragLeave={(e) => dragOutImage(e, 2)}>
                        {imagesUrls[2] && 
                            <>
                                <button 
                                    className={styles['delete-image-btn']}
                                    type="button"
                                    onClick={() => deleteImage(2)}>
                                    <CloseSVG width={"25px"}/>
                                </button>
                                <button 
                                    type="button"
                                    className={styles['image-viewer-container']}
                                    onClick={() => imgInput3.current.click()}>
                                    <img className={styles['image-viewer']} src={imagesUrls[2]} />
                                </button>
                            </>
                        }
                        {!imagesUrls[2] && 
                            <button 
                                className={styles['upload-image-btn']}
                                type="button"
                                onClick={() => imgInput3.current.click()}>
                                    <UploadSVG width={"30px"} color={"gray"}/>
                                    <br/>
                                    <div className={styles['upload-image-text']}>Elige o arrastra una imagen</div>
                            </button>
                        }
                    <input id="image-input-3" hidden ref={imgInput3} onChange={(e) => onImageChange(e, 2)} type="file" accept="image/jpeg, image/jpg"/>
                </div>
            </div>
            <div style={{fontSize: "14px", color: "gray"}}>Formato de imagenes: jpg/jpeg</div>
        </div>
    )
}