import UploadSVG from "@/components/SVGs/Upload";
import styles from "./DocumentInput.module.scss";
import React, { useRef } from "react";
import { checkIfValidImage } from "@/utils/account/AccountUtils";
import { flash } from "@/flash-message/flashMessageCreator";

type DocumentInputProps = {
    document?: Blob;
    setDocument?: (doc: Blob) => void;
}

export default function DocumentInput({document, setDocument}: DocumentInputProps) {
    const ref = useRef<HTMLDivElement>(null);

    const dragOver = (e: React.DragEvent) => {
        e.preventDefault();

        ref.current.classList.add(styles.dragOver);
    }

    const dragOut = () => {
        ref.current.classList.remove(styles.dragOver);
    }

    const drop = (e: React.DragEvent) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if(!file || ! checkIfValidImage(file)) {
            flash("El formato de las imagenes debe ser jpg/jpeg o png", 4000, "error");
            dragOut();
            return;
        }

        setDocument(file);
        dragOut();
    }

    return (
        <div 
            ref={ref}
            className={styles.idSubmit}
            onDragOver={dragOver}
            onDragLeave={dragOut}
            onDrop={drop}
        >
            <UploadSVG width={"30px"} color={"var(--text-secondary-color)"} /> 
            <div className={styles.dragAndDropOrSubmitMsg}>Arrastra o elige el archivo</div>
        </div>
    );
}