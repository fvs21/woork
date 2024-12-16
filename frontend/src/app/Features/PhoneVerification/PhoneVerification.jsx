import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import styles from "./PhoneVerification.module.scss";
import { useState, lazy, Suspense } from "react";
import { useForm, usePage } from "@inertiajs/react";
import axios from "@/api/axios";
import Form from "@/Components/Form/Form";
import LoadingScreen from "@/Components/LoadingScreen/LoadingScreen";
import { useUser } from "@/jotai/user";
import { flash } from "@/flash-message/flashMessageCreator";

const EditPhoneModal = lazy(() => import("./EditPhoneModal"));

export default function PhoneVerification() {
    const [user, setUser] = useUser();

    const { setData, post } = useForm({
        otp: "",
    });

    const [otpInputActive, setOtpInputActive] = useState(false);

    const [displayEditPhoneModal, setDisplayEditPhoneModal] = useState(false);

    const { errors } = usePage().props;

    function updateCode(value) {
        setData("otp", value);
        if (value.length >= 7) setOtpInputActive(true);
        else setActive(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post("/verify-phone");
    }

    async function reSendCode(e) {
        e.preventDefault();

        try {
            const request = await axios.post("verify-phone/resend");
            flash(request.data.success, 6000, "success");
        } catch (error) {
            flash(error.response.data.error, 6000, "error");
        }
    }

    return (
        <Form className={styles.phoneVerificationContainer}>
            <div style={{ textAlign: "center" }}>
                <h2>Verifica tu número de teléfono</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <span style={{ fontSize: "15px", paddingBottom: "10px" }}>
                    {"Ingresa el código de verificación que enviamos al +" +
                        user.phone +
                        "."}
                </span>
                <div className={styles["input-field"]}>
                    <ValidatedInput
                        className={styles.formInput}
                        valid={true}
                        name={"verificationCode"}
                        type={"text"}
                        placeholder={"Código de verificación"}
                        setValue={updateCode}
                        autofocus={false}
                    />
                    {errors?.verification_code && (
                        <span className="error-msg">
                            {errors.verification_code}
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
                <Suspense fallback={<LoadingScreen />}>
                    <EditPhoneModal
                        setUser={setUser}
                        closeModal={() => setDisplayEditPhoneModal(false)}
                    />
                </Suspense>
            )}
        </Form>
    );
}
