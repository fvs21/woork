'use client'

import { useState } from 'react'
import styles from './InformationPanel.module.scss'
import ProfilePictureModal from './ProfilePictureModal';
import LabeledButton from '../../components/LabeledButton/LabeledButton';
import { defaultPfpUrl } from '../../utils/account/AccountUtils';
import { useUser } from '../../hooks/useUser';
import dynamic from 'next/dynamic';

const PhoneNumberModal = dynamic(() => import("./PhoneNumberModal"));
const EmailModal = dynamic(() => import("./EmailModal"));
const AddressModal = dynamic(() => import("./AddressModal"));

export default function InformationPanel() {
    const user = useUser();
    const [displayPfpModal, setDisplayPfpModal] = useState(false);
    const [displayPhoneModal, setDisplayPhoneModal] = useState(false);
    const [displayEmailModal, setDisplayEmailModal] = useState(false);
    const [displayAddressModal, setDisplayAddressModal] = useState(false);
    //const [displayDobModal, setDisplayDobModal] = useState(false);
    //const [displayGenderModal, setDisplayGenderModal] = useState(false);
    
    const dob = new Date(user?.dateOfBirth + " ");

    const formattedDate = `${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()}`;

    const pfpUrl = user?.profilePicture?.imageUrl || defaultPfpUrl;

    
    return (
        <div className={styles['main-container']}>
            <div className={styles['basic-info-container']}>
                <div className={styles['pfp-container']}>
                    <img src={pfpUrl}
                        className={styles['profile-picture']} onClick={() => setDisplayPfpModal(true)}/>
                </div>
                <div className={styles['name-container']}>
                    <h1>{user?.first_name}</h1>
                    <h1>{user?.last_name}</h1>
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
                    <LabeledButton label={"Dirección"} text={"47 W 13th St, New York, NY 10011, USA"} clickedFn={() => setDisplayAddressModal(true)} />  
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Fecha de nacimiento"} text={formattedDate} clickedFn={() => {}} />
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Género"} text={user?.gender != null ? user.gender : "No especificado"} clickedFn={() => {}} />
                </div>
            </div>
            {displayPfpModal && <ProfilePictureModal changeDisplayModal={setDisplayPfpModal} />}
            {displayPhoneModal && <PhoneNumberModal changeDisplayModal={setDisplayPhoneModal}/>}
            {displayEmailModal && <EmailModal changeDisplayModal={setDisplayEmailModal} />}
            {displayAddressModal && <AddressModal changeDisplayModal={setDisplayAddressModal} />}
        </div>
    )
}