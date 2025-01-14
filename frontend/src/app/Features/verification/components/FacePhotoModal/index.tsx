import Modal from "@/components/Modal/Modal";
import styles from "./FacePhotoModal.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import React, { useEffect, useRef, useState } from "react";

type FacePhotoModalProps = {
    setDisplayModal: (val: boolean) => void;
    facePhoto: File;
    setFacePhoto: (file: File) => void;
}

export default function FacePhotoModal({setDisplayModal, facePhoto, setFacePhoto}: FacePhotoModalProps) {
    const closeModal = () => setDisplayModal(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [takenPhoto, setTakenPhoto] = useState<string | null>();
    const [inputStreamHeight, setInputStreamHeight] = useState<number>();

    const constraints = {
        audio: false,
        video: {
            facingMode: 'user'
        }
    };

    function takePhoto(): void {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);

        canvasRef.current.toBlob(blob => {
            const file = new File([blob], "headshot", {
                type: "image/png"
            });

            setFacePhoto(file);
        })

        const data = canvasRef.current.toDataURL("image/png");
        setTakenPhoto(data);
    }

    function clearPhoto(): void {
        const context = canvasRef.current.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const data = canvasRef.current.toDataURL("image/png");
        setTakenPhoto(data);
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia(constraints).then(
            (stream) => {
                videoRef.current.srcObject = stream;
            }
        )
    }, []);
    
    return (
        <Modal className={styles.facePhotoModal} handleClose={closeModal}>
            <button className="closeModalBtn" onClick={closeModal}>
                <CloseSVG width="18px" color="var(--text-color)" />
            </button>
            <div className={styles.cameraVideoContainer}>
                {facePhoto ? 
                    <img src={takenPhoto} className={styles.takenPhotoPreview} />

                :

                    <video ref={videoRef} className={styles.cameraVideo} muted autoPlay playsInline></video>
                }
                <canvas id="face-photo" hidden ref={canvasRef} width={200} height={250}></canvas>
            </div>
            <div className={styles.takePictureButtonContainer}>
                <button className={styles.takePictureButton} onClick={takePhoto}>Tomar foto</button>
            </div>
        </Modal>
    )
}