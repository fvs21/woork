'use client'

import { useState } from 'react'
import styles from './InformationPanel.module.scss'
import LabeledButton from '../../components/LabeledButton/LabeledButton';
import { defaultPfpUrl, formatGender } from '../../utils/account/AccountUtils';
import { useUser } from '../../hooks/useUser';
import dynamic from 'next/dynamic';

const PhoneNumberModal = dynamic(() => import("./PhoneNumberModal"));
const EmailModal = dynamic(() => import("./EmailModal"));
const AddressModal = dynamic(() => import("./AddressModal"));
const ProfilePictureModal = dynamic(() => import("./ProfilePictureModal"));
const DateOfBirthModal = dynamic(() => import("./DateOfBirthModal"));
const GenderModal = dynamic(() => import("./GenderModal"));

export default function InformationPanel() {
    const user = useUser();
    const [displayPfpModal, setDisplayPfpModal] = useState(false);
    const [displayPhoneModal, setDisplayPhoneModal] = useState(false);
    const [displayEmailModal, setDisplayEmailModal] = useState(false);
    const [displayAddressModal, setDisplayAddressModal] = useState(!user?.location);
    const [displayDobModal, setDisplayDobModal] = useState(false);
    const [displayGenderModal, setDisplayGenderModal] = useState(false);
    
    const dob = new Date(user?.dateOfBirth + " ");

    const formattedDate = `${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()}`;

    const pfpUrl = user?.pfpUrl || defaultPfpUrl;

    const formattedStreet = `${user?.location?.street}, ${user?.location?.number}. C.P. ${user?.location?.zipCode} - ${user?.location?.city}, ${user?.location?.state}, ${user?.location?.country}`; 

    
    return (
        <div className={styles['main-container']}>
            <div className={styles['basic-info-container']}>
                <div className={styles['pfp-container']}>
                    <img src={pfpUrl}
                        className={styles['profile-picture']} onClick={() => setDisplayPfpModal(true)}/>
                </div>
                <div className={styles['name-container']}>
                    <h1>{user?.firstName}</h1>
                    <h1>{user?.lastName}</h1>
                </div>
            </div>
            <br/>
            <div className={styles['user-info-container']}>
                <div className={styles['user-info-header']}>
                    <h2>Información personal</h2> 
                </div>
                <div className={styles['contact-info-container']}>
                    <LabeledButton label={"Número"} text={"+" + user?.phone} clickedFn={() => setDisplayPhoneModal(true)} />
                    <LabeledButton label={"Correo"} text={user?.email != null ? user.email : "No agregado"} clickedFn={() => setDisplayEmailModal(true)} /> 
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Dirección"} text={user?.location ? formattedStreet : "No agregado"} clickedFn={() => setDisplayAddressModal(true)} />  
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Fecha de nacimiento"} text={formattedDate} clickedFn={() => {setDisplayDobModal(true)}} />
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Género"} text={user?.gender != null ? formatGender(user.gender) : "No especificado"} clickedFn={() => {setDisplayGenderModal(true)}} />
                </div>
            </div>
            {displayPfpModal && <ProfilePictureModal changeDisplayModal={setDisplayPfpModal} />}
            {displayPhoneModal && <PhoneNumberModal changeDisplayModal={setDisplayPhoneModal}/>}
            {displayEmailModal && <EmailModal changeDisplayModal={setDisplayEmailModal} />}
            {displayAddressModal && <AddressModal changeDisplayModal={setDisplayAddressModal} />}
            {displayDobModal && <DateOfBirthModal changeDisplayModal={setDisplayDobModal} />}
            {displayGenderModal && <GenderModal changeDisplayModal={setDisplayGenderModal} />}
        </div>
    )
}