import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { validateAddress, validateNumber, validateStreet } from "../../services/validators";
import CountriesSelector from "@/components/CountriesSelector/CountriesSelector";
import { loadCities, loadStates } from "@/utils/location/LocationUtils";
import InputLabel from "@/components/ValidatedInput/InputLabel";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import { svgColor } from "@/utils/extra/utils";
import { useUpdateAddress, useUser } from "@/api/hooks/user";
import { flash } from "@/flash-message/flashMessageCreator";

export default function AddressModal({closeModal}) {
    const [user] = useUser();

    const location = user?.address;

    const [address, setAddress] = useState({
        address_name: location?.address_name || "",
        country: location?.country || "",
        state: location?.state || "",
        city: location?.city || "",
        zipCode: location?.zip_code || "",
        street: location?.street || "",
        number: location?.number || ""
    });

    const [nameValid, setNameValid] = useState(true);
    const [zipCodeValid, setZipCodeValid] = useState(true);
    const [streetValid, setStreetValid] = useState(true);
    const [numberValid, setNumberValid] = useState(true);

    const countries = require("@/services/countries/countries.json");
    const [states, setStates] = useState(address?.state ? loadStates(address.country): []);
    const [cities, setCities] = useState(address?.city ? loadCities(address.country, address.state) : []);

    const { update } = useUpdateAddress();


    function changeCountry(value) {
        setAddress({
            ...address,
            country: value
        });
        setStates(loadStates(value));
    }

    function changeState(value) {
        setAddress({
            ...address,
            state: value
        });
        setCities(loadCities(address.country, value));
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
            zipCode: value
        });
        setZipCodeValid(validateNumber(value));
    }

    function changeStreet(value) {
        setAddress({
            ...address,
            street: value
        });
        setStreetValid(validateStreet(value))
    }

    function changeHouseNumber(value) {
        setAddress({
            ...address,
            number: value
        });
        setNumberValid(validateNumber(value));
    }

    function changeName(value) {
        setAddress({
            ...address,
            address_name: value
        });
        setNameValid(value.length > 0);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await update(address);
            flash("Dirección modificada.", 4000, "success");
            closeModal();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Modal className={styles.addressModal} handleClose={closeModal}>
            <div className={styles.addressModalContainer}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={closeModal}>
                        <CloseSVG width={"20px"} color={svgColor()}/>
                    </button>
                    <div style={{fontSize: "25px", fontWeight: "bold", margin: "15px 0"}}>Dirección</div>
                </div>
                <div style={{paddingBottom: "0.25rem"}} className={styles.disclaimer}>
                    Esta información no será visible al público.
                </div>
                {location && 
                    <div style={{marginTop: "4px"}} className={styles.disclaimer}>
                        Al editar tu dirección, se eliminaran todas las publicaciones con esta dirección.
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <div className={styles['address-container']}>
                        <div className={styles['input-field']}>
                            <ValidatedInput 
                                className={styles.formInput}
                                name={"address_name"}
                                valid={nameValid} 
                                label={"Elige un nombre para guardar esta dirección"} 
                                placeholder={"Ej. Casa"} 
                                value={address.address_name}
                                setValue={changeName}/>
                        </div>
                        <div className={styles['input-field']}>
                            <InputLabel>País/Estado/Ciudad</InputLabel>
                            <div className={styles['address-fields']}>
                                <CountriesSelector 
                                    name={"country"} 
                                    clsName={styles['countries-selector']} 
                                    list={countries} 
                                    value={address.country} 
                                    setValue={(e) => changeCountry(e.target.value)} 
                                    disabled={"País"}/>
                                <CountriesSelector 
                                    name={"state"} 
                                    clsName={styles['countries-selector']} 
                                    list={states} 
                                    value={address.state} 
                                    setValue={(e) => changeState(e.target.value)} 
                                    disabled={"Estado"}/>
                                <CountriesSelector 
                                    name={"city"} 
                                    clsName={styles['countries-selector']} 
                                    list={cities} 
                                    value={address.city} 
                                    setValue={(e) => changeCity(e.target.value)} 
                                    disabled={"Ciudad"}/>
                            </div>
                        </div>
                        <div className={styles['input-field']}>
                            <ValidatedInput 
                                className={styles.formInput}
                                name={"street"}
                                valid={streetValid} 
                                label={"Calle"} 
                                placeholder={"Calle"} 
                                value={address.street} 
                                setValue={changeStreet}/>
                        </div>
                        <div className={`${styles['address-fields']} ${styles['input-field']}`}>
                            <ValidatedInput 
                                className={styles.formInput}      
                                name={"number"}                         
                                valid={numberValid} 
                                placeholder={"#"}
                                label={"Número"} 
                                value={address.number}
                                setValue={changeHouseNumber}/>
                            <ValidatedInput 
                                className={styles.formInput}
                                name={"zip_code"}
                                valid={zipCodeValid} 
                                placeholder={"Código postal"} 
                                label={"Código postal"} 
                                value={address.zipCode} 
                                setValue={changeZipCode}/>
                        </div>
                    </div>
                    <div className={styles['save-btn-container']}>
                        <SubmitButton active={validateAddress(address)}>Guardar</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
