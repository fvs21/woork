"use client";

import SubmitButton from "@/components/SubmitButton/SubmitButton";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import styles from "./PhoneVerification.module.scss";
import { useState, lazy, Suspense } from "react";
import Form from "@/components/Form/Form";
import { useUser } from "@/api/hooks/user";
import { flash } from "@/flash-message/flashMessageCreator";
import { useResendPhoneVerificationCode, useVerifyPhone } from "@/api/hooks/authentication";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/LoadingModal/LoadingModal";

const EditPhoneModal = lazy(() => import("./EditPhoneModal"));

export default function PhoneVerification() {
    const [user] = useUser();
    
    const [otp, setOtp] = useState("");

    const [otpInputActive, setOtpInputActive] = useState(false);

    const [displayEditPhoneModal, setDisplayEditPhoneModal] = useState(false);

    const { verify, isLoading } = useVerifyPhone();
    const { resend, isLoading: loadingResend } = useResendPhoneVerificationCode(); 

    const router = useRouter();

    function updateCode(value) {
        setOtp(value);
        if (value.length >= 7) setOtpInputActive(true);
        else setOtpInputActive(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await verify({
                otp: otp
            });
            router.push("/dashboard");
        } catch(error) {
            flash(error.response.data.message, 6000, "error");
        }
    }

    async function reSendCode(e) {
        e.preventDefault();

        try {
            const request = await resend();
            flash(request.data, 6000, "success");
        } catch (error) {
            flash(error.response.data.message, 6000, "error");
        }
    }

    return (
        <Form className={styles.phoneVerificationContainer}>
            <div style={{ textAlign: "center" }}>
                <h2>Verifica tu número de teléfono</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <span style={{ fontSize: "15px", paddingBottom: "10px" }}>
                    {`Ingresa el código de verificación que enviamos al +${user.phone}.`}
                </span>
                <div className={styles["input-field"]}>
                    <ValidatedInput
                        className={styles.formInput}
                        valid={true}
                        name={"verificationCode"}
                        type={"text"}
                        placeholder={"Código de verificación"}
                        value={otp}
                        setValue={updateCode}
                        autofocus={false}
                    />
                    {false && (
                        <span className="error-msg">
                        </span>
                    )}
                </div>
                <button
                    className={styles["resend-code-btn"]}
                    type="button"
                    onClick={reSendCode}
                >
                    Volver a enviar código de verificación
                </button>
                <div className={styles["btn-container"]}>
                    <button
                        className={styles["display-modal-btn"]}
                        type="button"
                        onClick={() => setDisplayEditPhoneModal(true)}
                    >
                        Actualizar número de teléfono
                    </button>
                    <SubmitButton width={"50%"} active={otpInputActive}>
                        Continuar
                    </SubmitButton>
                </div>
            </form>
            {displayEditPhoneModal && (
                <Suspense fallback={<LoadingModal />}>
                    <EditPhoneModal
                        closeModal={() => setDisplayEditPhoneModal(false)}
                    />
                </Suspense>
            )}
        </Form>
    );
}
