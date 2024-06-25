'use client';

import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
import { useState } from 'react';
import { useVerifyPhone } from '../../hooks/authentication';
import { useRouter } from 'next/navigation';
import { useFetchUser } from '../../hooks/authentication';
import styles from "./PhoneVerification.module.scss";
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import dynamic from 'next/dynamic';

const EditPhoneModal = dynamic(() => import("./EditPhoneModal"));

export default function PhoneVerification() {
    useFetchUser();
    
    const [code, setCode] = useState("");
    const [displayEditPhoneModal, setDisplayEditPhoneModal] = useState(false);
    const [active, setActive] = useState(false);

    const router = useRouter();

    const body =  {
        "otp": code
    }

    const {verifyPhoneFn} = useVerifyPhone(body);

    function updateCode(value) {
        setCode(value);
        if(value.length >= 7) setActive(true);
        else setActive(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const request = await verifyPhoneFn();
            console.log(request);

            if(request.status == 200) {
                router.push('/account');
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2>Verifica tu número de teléfono</h2>
            <form onSubmit={handleSubmit}>
                <ValidatedInput valid={true} name={"verificationCode"} type={"text"} label={"Ingresa el código de verificación que te enviamos."} 
                    placeholder={"Código de verificación"} setValue={updateCode} autofocus={false}/>
                <br/>
                <div className={styles['btn-container']}>
                    <button className={styles['display-modal-btn']}
                        onClick={() => setDisplayEditPhoneModal(true)} type="button">Editar número de teléfono</button>
                    <SubmitButton width={"40%"} active={active}>Continuar</SubmitButton>
                </div>
            </form>
            {displayEditPhoneModal && <EditPhoneModal changeDisplayModal={setDisplayEditPhoneModal}/>}
        </>
    )
}