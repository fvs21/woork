'use client';

import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
import { useState } from 'react';
import { useResendPhoneCode, useVerifyPhone } from '../../hooks/authentication';
import { useRouter } from 'next/navigation';
import { useFetchUser } from '../../hooks/authentication';
import styles from "./PhoneVerification.module.scss";
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import dynamic from 'next/dynamic';
import { INCORRECT_VERIFICATION_CODE_ERROR, VERIFICATION_CODE_EXPIRED_ERROR } from '../../utils/authentication/RegistrationErrorResponses';
import "../../assets/globals.scss";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const EditPhoneModal = dynamic(() => import("./EditPhoneModal"));
const SmsSentModal = dynamic(() => import("./SmsSentModal"));

export default function PhoneVerification() {
    const { data, isLoading: isFetching } = useFetchUser();
    const user = data?.data;
    
    const [code, setCode] = useState("");
    const [displayEditPhoneModal, setDisplayEditPhoneModal] = useState(false);
    const [smsSentModal, setSmsSentModal] = useState(false);
    const [active, setActive] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();

    const body =  {
        "otp": code
    }

    const {verifyPhoneFn} = useVerifyPhone(body);
    const { resendPhoneCodeFn, isLoading: isRequesting, isSuccess } = useResendPhoneCode();

    function updateCode(value) {
        setCode(value);
        if(value.length >= 7) setActive(true);
        else setActive(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMsg("");
        try {
            const request = await verifyPhoneFn();
            if(request.status == 200) {
                router.push('/account');
            }
        } catch(error) {
            switch(error.response.data) {
                case INCORRECT_VERIFICATION_CODE_ERROR:
                    setErrorMsg("Código de verificación incorrecto");
                    break;
                case VERIFICATION_CODE_EXPIRED_ERROR:
                    setErrorMsg("El código de verificación expiró");
                    break;
            }
        }
    }

    async function resendCode() {
        setSmsSentModal(true);

        try {
            await resendPhoneCodeFn();
        } catch(error) {
            return;
        }
    }

    if(isFetching) {
        return <LoadingScreen />
    }

    return (
        <>
            <h2>Verifica tu número de teléfono</h2>
            <form onSubmit={handleSubmit}>
                <ValidatedInput valid={true} name={"verificationCode"} type={"text"} label={"Ingresa el código de verificación que enviamos al +" + user?.phone + "."} 
                    placeholder={"Código de verificación"} setValue={updateCode} autofocus={false}/>
                { errorMsg && <span className='error-msg'>{errorMsg}</span> }
                <br/>
                <br/>
                <div className={styles['btn-container']}>
                    <div>
                        <button type='button' className={styles['resend-code-btn']}
                                onClick={resendCode}>Reenviar código</button>
                        <button className={styles['display-modal-btn']}
                            onClick={() => setDisplayEditPhoneModal(true)} type="button">Editar número de teléfono</button>
                    </div>
                    <SubmitButton width={"40%"} active={active}>Continuar</SubmitButton>
                </div>
            </form>
            {displayEditPhoneModal && <EditPhoneModal changeDisplayModal={setDisplayEditPhoneModal}/>}
            {smsSentModal && <SmsSentModal isRequesting={isRequesting} isSuccess={isSuccess} changeDisplayModal={setSmsSentModal}/>}
        </>
    )
}