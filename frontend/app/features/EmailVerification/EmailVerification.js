import { useState } from "react";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useVerifyEmail } from "../../hooks/authentication";

export default function EmailVerification({changeDisplayModal}) {
    const [code, setCode] = useState("");
    const [codeValid, setCodeValid] = useState(true);

    const { verifyEmailFn } = useVerifyEmail({
        "otp": code
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await verifyEmailFn();
            changeDisplayModal(false);
        } catch(error) {
            console.log(error);
        }
    }

    function changeCode(value) {
        setCode(value);

        setCodeValid(value.length >= 7);
    }

    return (
        <form onSubmit={handleSubmit}>
            <ValidatedInput valid={codeValid} name={"verificationCode"} type={"text"}
                placeholder={"Código de verificación"} setValue={changeCode} autofocus={false}/>
            <br/>
            <br/>
            <SubmitButton active={codeValid}>Verificar</SubmitButton>
        </form>
    )
}