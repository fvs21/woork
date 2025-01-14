import Modal from "@/components/Modal/Modal";
import styles from "@/features/dashboard/components/accountpanel/InformationPanel.module.scss";
import { useEffect, useState } from "react";
import ArrowBackSVG from "@/components/SVGs/ArrowBack";
import InputLabel from "@/components/ValidatedInput/InputLabel";
import CountriesSelector from "@/components/CountriesSelector/CountriesSelector";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { validateAddress, validateNumber, validateStreet } from "@/services/validators";
import { loadCities, loadStates } from "@/utils/location/LocationUtils";
import { useTheme } from "@/hooks/theme";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";

export default function CreateLocationModal({location, setLocation, setNewLocationModal, setMapModal}) {
    const [theme] = useTheme();

    const [address, setAddress] = useState({
        address_name: location?.location?.address_name || "",
        country: location?.location?.country || "",
        state: location?.location?.state || "",
        city: location?.location?.city || "",
        zip_code: location?.location?.zip_code || "",
        street: location?.location?.street || "",
        number: location?.location?.number || "",
        latitude: location?.location?.latitude || "",
        longitude: location?.location?.longitude || ""
    });
    
    const countries = require("@/services/countries/countries.json");
    const [states, setStates] = useState(address?.state ? loadStates(address.country): []);
    const [cities, setCities] = useState(address?.city ? loadCities(address.country, address.state) : []);

    const [nameValid, setNameValid] = useState(true);
    const [zipCodeValid, setZipCodeValid] = useState(true);
    const [streetValid, setStreetValid] = useState(true);
    const [numberValid, setNumberValid] = useState(true);

    useEffect(() => {
        async function loadLocation() {
            if(!address?.country)
                return;

            const states = await loadStates(address.country);
            setStates(states.default);

            const cities = await loadCities(address.country, address.state)
            setCities(cities.default);
        }
        loadLocation();
    }, []);

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

    function changeName(value) {
        setAddress({
            ...address,
            address_name: value
        });
        setNameValid(value.length > 0);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!validateAddress(address))
            return;

        setLocation({
            ...location,
            create: true,
            location: address
        });

        setMapModal(true);
        setNewLocationModal(false);
    }

    return (
        <Modal className={styles.addressModal}>
            <div className={styles.addressModalContainer}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={() => setNewLocationModal(false)}>
                        <ArrowBackSVG width={"20px"} color={theme == 'dark' ? 'white' : 'black'}/>
                    </button>
                    <h2>Dirección</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles['address-container']}>
                        <div className={styles['input-field']}>
                            <ValidatedInput 
                                name={"address_name"}
                                className={styles.createLocationModalInputs}
                                valid={nameValid} 
                                label={"Elige un nombre para guardar esta dirección"} 
                                placeholder={"Ej. Casa"} 
                                value={address?.address_name}
                                setValue={changeName}/>
                        </div>
                        <div className={styles['input-field']}>
                            <InputLabel>País/Estado/Ciudad</InputLabel>
                            <div className={styles['address-fields']}>
                                <CountriesSelector 
                                    name={"country"} 
                                    clsName={styles['countries-selector-2']} 
                                    list={countries} 
                                    value={location?.location?.country || ""} 
                                    setValue={(e) => changeCountry(e.target.value)} 
                                    disabled={"País"}/>
                                <CountriesSelector 
                                    name={"state"} 
                                    clsName={styles['countries-selector-2']} 
                                    list={states} 
                                    value={location?.location?.country || ""} 
                                    setValue={(e) => changeState(e.target.value)} 
                                    disabled={"Estado"}/>
                                <CountriesSelector 
                                    name={"city"} 
                                    clsName={styles['countries-selector-2']} 
                                    list={cities} 
                                    value={location?.location?.country || ""} 
                                    setValue={(e) => changeCity(e.target.value)} 
                                    disabled={"Ciudad"}/>
                            </div>
                        </div>
                        <div className={styles['input-field']}>
                            <ValidatedInput 
                                name={"street"}
                                className={styles.createLocationModalInputs}
                                valid={streetValid} 
                                label={"Calle"} 
                                placeholder={"Calle"} 
                                value={address?.street} 
                                setValue={changeStreet}/>
                        </div>
                        <div className={`${styles['address-fields']} ${styles['input-field']}`}>
                            <ValidatedInput  
                                name={"number"}    
                                className={styles.createLocationModalInputs}                     
                                valid={numberValid} 
                                placeholder={"#"}
                                label={"Departamento/Número de casa"} 
                                value={address?.number}
                                setValue={changeHouseNumber}/>
                            <ValidatedInput 
                                name={"zip_code"}
                                className={styles.createLocationModalInputs}
                                valid={zipCodeValid} 
                                placeholder={"Código postal"} 
                                label={"Código postal"} 
                                value={address?.zip_code} 
                                setValue={changeZipCode}/>
                        </div>
                    </div>
                    <div className={styles['save-btn-container']}>
                        <SubmitButton active={validateAddress(address)}>
                            Guardar
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}   