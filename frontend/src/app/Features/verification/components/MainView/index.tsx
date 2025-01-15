"use client"

import { useVerificationStatus } from "../../api";
import { determineVerificationStep } from "../../utils";
import { useEffect, useState } from "react";

export default function MainView() {
    const { data, isLoading } = useVerificationStatus();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if(!data) {
            return;
        }

        if(data.idPhotosStatus == "SUBMITTED" && data.facePhotoStatus == "SUBMITTED")
            setStep(3);
        else if(data.idPhotosStatus == "SUBMITTED")
            setStep(2);

    }, [isLoading])

    if(isLoading)
        return <></>

    return (
        <>
            {determineVerificationStep(step, setStep)}
        </>
    )
}