import { useState } from "react";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

export default function EmailVerification() {
    const [code, setCode] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <>
            <h1>Verifica tu correo electrónico</h1>
            <form onSubmit={handleSubmit}>
                <ValidatedInput name={"verificationCode"} type={"text"} label={"Ingresa el código de verificación que te enviamos."} 
                    placeholder={"Código de verificación"} changeValue={setCode} autofocus={false}/>
                <br/>
                <SubmitButton>Verificar</SubmitButton>
            </form>
        </>
    )
}