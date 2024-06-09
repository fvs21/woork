'use client'

import { useState } from 'react'
import styles from './InformationPanel.module.scss'
import ProfilePictureModal from './ProfilePictureModal';
import LabeledButton from '../../components/LabeledButton/LabeledButton';
import PhoneNumberModal from './PhoneNumberModal';
import EmailModal from './EmailModal';

export default function InformationPanel() {
    const [displayPfpModal, setDisplayPfpModal] = useState(false);
    const [displayPhoneModal, setDisplayPhoneModal] = useState(false);
    const [displayEmailModal, setDisplayEmailModal] = useState(false);
    
    return (
        <div className={styles['main-container']}>
            <div className={styles['basic-info-container']}>
                <div className={styles['pfp-container']}>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg" width="200px" 
                        className={styles['profile-picture']} onClick={() => setDisplayPfpModal(true)}/>
                </div>
                <div className={styles['name-container']}>
                    <h1>Fabrizio</h1>
                    <h1>Vanzani</h1>
                </div>
            </div>
            <br/>
            <div className={styles['user-info-container']}>
                <div className={styles['user-info-header']}>
                    <h2>Información personal</h2> 
                </div>
                <div className={styles['contact-info-container']}>
                    <LabeledButton label={"Número"} text={"+520123456789"} clickedFn={() => setDisplayPhoneModal(true)}/>
                    <LabeledButton label={"Correo"} text={"company@mail.com"} clickedFn={() => setDisplayEmailModal(true)} /> 
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Dirección"} text={"47 W 13th St, New York, NY 10011, USA"} clickedFn={() => {}} />  
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Fecha de nacimiento"} text={"17/04/1995"} clickedFn={() => {}} />
                </div>
                <br/>
                <div>
                    <LabeledButton label={"Género"} text={"Masculino"} clickedFn={() => {}} />
                </div>
            </div>
            {displayPfpModal && <ProfilePictureModal changeDisplayModal={setDisplayPfpModal} />}
            {displayPhoneModal && <PhoneNumberModal changeDisplayModal={setDisplayPhoneModal}/>}
            {displayEmailModal && <EmailModal changeDisplayModal={setDisplayEmailModal} />}
        </div>
    )
}