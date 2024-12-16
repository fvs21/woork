import { useEffect, useState } from "react";
import Modal from "@/Components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import CloseSVG from "@/Components/SVGs/Close";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import { validateAddress, validateNumber, validateStreet } from "../../Services/validators";
import CountriesSelector from "@/Components/CountriesSelector/CountriesSelector";
import { loadCities, loadStates } from "@/Utils/location/LocationUtils";
import {default as countries_list} from "@/Services/countries/countries";
import InputLabel from "@/Components/ValidatedInput/InputLabel";
import axios from "@/api/axios";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import { useUser } from "@/jotai/user";
import { svgColor } from "@/Utils/extra/utils";

export default function AddressModal({closeModal}) {
    const [user, setUser] = useUser();

    const location = user?.address;

    const [address, setAddress] = useState({
        address_name: location?.address_name || "",
        country: location?.country || "",
        state: location?.state || "",
        city: location?.city || "",
        zipCode: location?.zipCode || "",
        street: location?.street || "",
        number: location?.number || ""
    });

    const [nameValid, setNameValid] = useState(true);
    const [zipCodeValid, setZipCodeValid] = useState(true);
    const [streetValid, setStreetValid] = useState(true);
    const [numberValid, setNumberValid] = useState(true);

    const [countries, setCountries] = useState(countries_list);
    const [states, setStates] = useState(location?.state ? [location.state] : []);
    const [cities, setCities] = useState(location?.city ? [location.city] : []);

    useEffect(() => {
        async function loadLocation() {
            if(!address.country)
                return;

            const states = await loadStates(location.country);
            setStates(states.default);

            const cities = await loadCities(location.country, location.state)
            setCities(cities.default);
        }
        loadLocation();
    }, []);

    function changeCountry(value) {
        setAddress({
            ...address,
            country: value
        });

        loadStates(value)
        .then((states) => {
            setStates(states.default);
            if(cities) {
                setCities([]);
            }
        })
    }

    function changeState(value) {
        setAddress({
            ...address,
            state: value
        });
        loadCities(address.country, value)
        .then((cities) => {
            setCities(cities.default);
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
            await axios.put("/address/update", address);
            setUser({
                ...user,
                address: address
            })
            changeDisplayModal(false);
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
                <div className={styles.disclaimer}>
                    Esta información no será visible para todos.
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
