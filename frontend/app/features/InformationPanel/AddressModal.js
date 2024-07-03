import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import CloseSVG from "../../components/SVGs/Close";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useUpdateLocation } from "../../hooks/authentication";
import { validateAddress } from "../../services/Validators";

export default function AddressModal({changeDisplayModal}) {
    const [address, setAddress] = useState({
        country: "México",
        state: "",
        city: "",
        zip_code: "",
        street: "",
        number: ""
    });

    const { updateLocationFn } = useUpdateLocation(address);

    function changeCountry(value) {
        setAddress({
            ...address,
            country: value
        });
    }

    function changeState(value) {
        setAddress({
            ...address,
            state: value
        });
    }

    function changeCity(value) {
        setAddress({
            ...address,
            city: value
        })
    }

    function changeZipCode(value) {
        setAddress({
            ...address,
            zip_code: value
        });
    }

    function changeStreet(value) {
        setAddress({
            ...address,
            street: value
        });
    }

    function changeHouseNumber(value) {
        setAddress({
            ...address,
            number: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await updateLocationFn();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Modal>
            <div className={styles['address-modal']}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>
                        <CloseSVG width={"20px"} />
                    </button>
                    <h2>Dirección</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles['address-container']}>
                        <div className={styles['address-fields']}>
                            <ValidatedInput valid={true} placeholder={"País"} label={"País"} value={address.country} setValue={changeCountry}/>
                            <ValidatedInput valid={true} placeholder={"Estado"} label={"Estado"} value={address.state} setValue={changeState}/>
                            <ValidatedInput valid={true} placeholder={"Ciudad"} label={"Ciudad"} value={address.city} setValue={changeCity}/>
                        </div>
                        <br/>
                        <ValidatedInput valid={true} label={"Calle"} placeholder={"Calle"} value={address.street} setValue={changeStreet}/>
                        <br/>
                        <div className={styles['address-fields']}>
                            <ValidatedInput valid={true} placeholder={"#"} label={"Departamento/Número de casa"} value={address.number} setValue={changeHouseNumber}/>
                            <ValidatedInput valid={true} placeholder={"Código postal"} label={"Código postal"} value={address.zip_code} setValue={changeZipCode}/>
                        </div>
                    </div>
                    <br/><br/>
                    <SubmitButton active={validateAddress(address)}>Guardar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}