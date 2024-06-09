'use client';

import SubmitButton from '../../components/SubmitButton/SubmitButton';
import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
import { useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

export default function PhoneVerification() {
    const [code, setCode] = useState("");

    const router = useRouter();

    const body =  {
        "otp": code
    }

    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: verifyPhoneMutation } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/phone/verify',
                body
            )
        }
    })

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const request = await verifyPhoneMutation();
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
            <h1>Verifica tu teléfono</h1>
            <form onSubmit={handleSubmit}>
                <ValidatedInput name={"verificationCode"} type={"text"} label={"Ingresa el código de verificación que te enviamos."} 
                    placeholder={"Código de verificación"} changeValue={setCode} autofocus={false}/>
                <br/>
                <SubmitButton>Verificar</SubmitButton>
            </form>
        </>
    )
}