import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import CloseSVG from "../../components/SVGs/Close";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useUpdateLocation } from "../../hooks/authentication";
import { validateAddress, validateNumber, validateStreet } from "../../services/Validators";
import CountriesSelector from "../../components/CountriesSelector/CountriesSelector";
import { loadCities, loadStates } from "../../utils/location/LocationUtils";
import { useUser } from "../../hooks/useUser";

export default function AddressModal({changeDisplayModal}) {
    const user = useUser();

    const location = user?.location;

    const [address, setAddress] = useState({
        country: location?.country || "",
        state: location?.state || "",
        city: location?.city || "",
        zip_code: location?.zipCode || "",
        street: location?.street || "",
        number: location?.number || ""
    });

    const [zipCodeValid, setZipCodeValid] = useState(true);
    const [streetValid, setStreetValid] = useState(true);
    const [numberValid, setNumberValid] = useState(true);

    const countries = require("../../services/countries/countries.json");
    const [states, setStates] = useState(address.country ? loadStates(address.country) : []);
    const [cities, setCities] = useState(address.state ? loadCities(address.country, address.state) : []);

    const { updateLocationFn } = useUpdateLocation(address);

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
            zip_code: value
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

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await updateLocationFn();
            changeDisplayModal(false);
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
                            <CountriesSelector name={"country"} clsName={styles['countries-selector']} list={countries} 
                                value={address.country} setValue={(e) => changeCountry(e.target.value)} disabled={"País"}/>
                            <CountriesSelector name={"state"} clsName={styles['countries-selector']} list={states} 
                                value={address.state} setValue={(e) => changeState(e.target.value)} disabled={"Estado"}/>
                            <CountriesSelector name={"city"} clsName={styles['countries-selector']} list={cities} 
                                value={address.city} setValue={(e) => changeCity(e.target.value)} disabled={"Ciudad"}/>
                        </div>
                        <br/>
                        <ValidatedInput valid={streetValid} label={"Calle"} placeholder={"Calle"} value={address.street} setValue={changeStreet}/>
                        <br/>
                        <div className={styles['address-fields']}>
                            <ValidatedInput valid={numberValid} placeholder={"#"} label={"Departamento/Número de casa"} value={address.number} setValue={changeHouseNumber}/>
                            <ValidatedInput valid={zipCodeValid} placeholder={"Código postal"} label={"Código postal"} value={address.zip_code} setValue={changeZipCode}/>
                        </div>
                    </div>
                    <br/><br/>
                    <SubmitButton active={validateAddress(address)}>Guardar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}
