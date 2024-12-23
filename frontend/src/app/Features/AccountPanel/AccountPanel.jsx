import { Suspense, useState } from 'react'
import styles from './InformationPanel.module.scss'
import LabeledButton from '@/components/LabeledButton/LabeledButton';
//import { defaultPfpUrl, formatGender } from '../../utils/account/AccountUtils';
import { lazy } from 'react';
import { formatAddress, formatGender } from '@/utils/account/AccountUtils';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useUser } from '@/api/hooks/user';
import Image from 'next/image';

const PhoneNumberModal = lazy(() => import("./PhoneNumberModal"));
const EmailModal = lazy(() => import("./EmailModal"));
const AddressModal = lazy(() => import("./AddressModal"));
const ProfilePictureModal = lazy(() => import("./ProfilePictureModal"));
const DateOfBirthModal = lazy(() => import("./DateOfBirthModal"));
const GenderModal = lazy(() => import("./GenderModal"));

export default function AccountPanel() {
    const [displayPfpModal, setDisplayPfpModal] = useState(false);
    const [displayPhoneModal, setDisplayPhoneModal] = useState(false);
    const [displayEmailModal, setDisplayEmailModal] = useState(false);
    const [displayAddressModal, setDisplayAddressModal] = useState(false);
    const [displayDobModal, setDisplayDobModal] = useState(false);
    const [displayGenderModal, setDisplayGenderModal] = useState(false);

    const [user] = useUser();
    
    const dob = new Date(user?.dateOfBirth?.replace(/-/g, "/"));

    const formattedDate = `${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()}`;

    const pfpUrl = user?.pfp_url;

    const formattedStreet = formatAddress(user?.address); 

    
    return (
        <div className={styles.accountPanelContainer}>
            <div className={styles['basic-info-container']}>
                <div className={styles['pfp-container']}>
                    <img 
                        src={pfpUrl}
                        className={styles['profile-picture']} 
                        onClick={() => setDisplayPfpModal(true)}
                        alt='Foto de perfil'
                    />
                </div>
                <div className={styles['name-container']}>
                    <h1>{user?.firstName + " " + user?.lastName}</h1>
                </div>
            </div>
            <div className={styles['user-info-container']}>
                <div className={styles['user-info-header']}>
                    <h2>Información personal</h2> 
                </div>
                <div className={`${styles['contact-info-container']} ${styles['user-labeled-btn-container']}`}>
                    <LabeledButton 
                        label={"Número"} 
                        text={"+" + user?.phone} 
                        clickedFn={() => setDisplayPhoneModal(true)} 
                        verified={user.phoneVerified}/>
                    <LabeledButton 
                        label={"Correo"} 
                        text={user?.email != null ? user.email : "No agregado"} 
                        clickedFn={() => setDisplayEmailModal(true)} 
                        verified={user.emailVerified}/> 
                </div>
                <div className={styles['user-labeled-btn-container']}>
                    <LabeledButton 
                        label={"Dirección"} 
                        text={user?.address ? formattedStreet : "No agregado"} 
                        clickedFn={() => setDisplayAddressModal(true)} />  
                </div>
                <div className={styles['user-labeled-btn-container']}>
                    <LabeledButton 
                        label={"Fecha de nacimiento"} 
                        text={formattedDate} 
                        clickedFn={() => {setDisplayDobModal(true)}} />
                </div>
                <div className={styles['user-labeled-btn-container']}>
                    <LabeledButton 
                        label={"Género"} 
                        text={user?.gender != null ? formatGender(user.gender) : "No especificado"} 
                        clickedFn={() => {setDisplayGenderModal(true)}} />
                </div>
            </div>
            <Suspense fallback={<LoadingModal />}>
                {displayPfpModal && <ProfilePictureModal closeModal={() => setDisplayPfpModal(false)} />}
                {displayPhoneModal && <PhoneNumberModal closeModal={() => setDisplayPhoneModal(false)} />}
                {displayEmailModal && <EmailModal closeModal={() => setDisplayEmailModal(false)} />}
                {displayAddressModal && <AddressModal closeModal={() => setDisplayAddressModal(false)} />}
                {displayDobModal && <DateOfBirthModal closeModal={() => setDisplayDobModal(false)} />}
                {displayGenderModal && <GenderModal closeModal={() => setDisplayGenderModal(false)} />}
            </Suspense>
        </div>
    )
}