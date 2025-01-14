import UploadSVG from "@/components/SVGs/Upload";
import styles from "./DocumentInput.module.scss";
import React, { useRef } from "react";
import { checkIfValidImage } from "@/utils/account/AccountUtils";
import { flash } from "@/flash-message/flashMessageCreator";

type DocumentInputProps = {
    document: File;
    setDocument: (doc: File) => void;
}

export default function DocumentInput({document, setDocument}: DocumentInputProps) {
    const inputRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const dragOver = (e: React.DragEvent) => {
        e.preventDefault();

        inputRef.current.classList.add(styles.dragOver);
    }

    const dragOut = () => {
        inputRef.current.classList.remove(styles.dragOver);
    }

    const drop = (e: React.DragEvent) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        submitImage(file);
        setDocument(file);
        dragOut();
    }

    const submitImage = (file: File) => {
        if(!file || ! checkIfValidImage(file)) {
            flash("El formato de las imagenes debe ser jpg/jpeg o png", 4000, "error");
            dragOut();
            return;
        }

        setDocument(file); 
    }

    const uploadComputerSearchedFile = (e: React.ChangeEvent) => {
        const file = (e.target as HTMLInputElement).files[0];
        submitImage(file);
    }

    return (
        <div 
            ref={inputRef}
            className={styles.idSubmit}
            onDragOver={dragOver}
            onDragLeave={dragOut}
            onDrop={drop}
        >
            {
                !document ? 
                <>
                    <button className={styles.searchForFileButton} onClick={() => hiddenInputRef.current.click()}>
                        <UploadSVG width={"30px"} color={"var(--text-secondary-color)"} /> 
                    </button>    
                    <div className={styles.dragAndDropOrSubmitMsg}>Arrastra o elige el archivo</div>
                </>

                :

                <div className={styles.submittedFile}>
                    <div className={styles.documentName}>
                        {document.name}
                    </div>
                    <button className={styles.changeSubmittedFileButton} onClick={() => hiddenInputRef.current.click()}>Cambiar</button>
                </div>
            }
            
            <input ref={hiddenInputRef} onChange={uploadComputerSearchedFile} hidden type="file" accept="image/jpg, image/jpeg, image/png"/>
        </div>
    );
}