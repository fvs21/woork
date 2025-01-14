import Modal from "@/components/Modal/Modal";
import styles from "./FacePhotoModal.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import React, { useEffect, useRef, useState } from "react";
import { flash } from "@/flash-message/flashMessageCreator";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [photo, setPhoto] = useState<File>();

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
                type: "image/jpeg"
            });

            setPhoto(file);
        }, "image/jpeg");

        const data = canvasRef.current.toDataURL("image/png");
        setTakenPhoto(data);
    }

    function clearPhoto(): void {
        const context = canvasRef.current.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const data = canvasRef.current.toDataURL("image/png");
        setTakenPhoto(data);
        setPhoto(undefined);
        startStream();
    }

    function startStream(): void {
        navigator.mediaDevices.getUserMedia(constraints).then(
            (stream) => {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
            }
        ).catch(error => {
            closeModal();
            flash("No se encontro niguna cámara para tomar la foto", 4000, "error");
        });
    }

    function stopStream(): void {
        const stream = videoRef.current?.srcObject as MediaStream;

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
        }
    }

    function save() {
        setFacePhoto(photo);
        closeModal();
    }

    useEffect(() => {
        if(!isStreaming && !facePhoto) {
            startStream();
        }

        return () => stopStream();
    }, []);
    
    return (
        <Modal className={styles.facePhotoModal} handleClose={closeModal}>
            <button className="closeModalBtn" onClick={closeModal}>
                <CloseSVG width="18px" color="var(--text-color)" />
            </button>
            <div className={styles.cameraVideoContainer}>
                {photo ? 
                    <img src={takenPhoto} className={styles.takenPhotoPreview} />

                :
                    <>
                        {!isStreaming && (
                            <div style={{position: "absolute"}}>
                                <LoadingSpinner width="50px" />
                            </div>
                        )}
                        <video ref={videoRef} className={styles.cameraVideo} muted autoPlay playsInline></video>
                    </>
                }
                <canvas id="face-photo" hidden ref={canvasRef} width={200} height={250}></canvas>
            </div>
            {
                photo ? (
                    <div className={styles.photoOptionsContainer}>
                      <button className={styles.retakePictureBtn} onClick={clearPhoto}>
                        Volver a tomar foto
                      </button>
                      <button className={styles.savePictureBtn} onClick={save}>
                        Guardar foto
                      </button>
                    </div>
                ) : (
                    <div className={styles.takePictureButtonContainer}>
                        <button className={styles.takePictureButton} onClick={photo ? clearPhoto : takePhoto}>
                            Tomar foto
                        </button>
                    </div>
                )
            }
           
        </Modal>
    )
}