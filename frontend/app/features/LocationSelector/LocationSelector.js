import { useState } from "react";
import styles from "./LocationSelector.module.scss";
import CountriesSelector from "../../components/CountriesSelector/CountriesSelector";
import { loadCities, loadStates } from "../../utils/location/LocationUtils";

export default function LocationSelector({city, setCity, state, setState, country, setCountry}) {
  const countries = require("../../services/countries/countries.json");

  const [states, setStates] = useState([]);

  function changeCountry(e) {
    setCountry(e.target.value);
    setStates(loadStates(e.target.value));
  }

  return (
    <div className={styles["location-selector-container"]}>
      <div className={styles["location-selector"]}>
        <CountriesSelector name={"country"} clsName={styles['selector']} list={countries} value={country} setValue={changeCountry} disabled={"Selecciona tu país"}/>
        {country && (
          <CountriesSelector name={"state"} clsName={styles['selector']} list={states} value={state} setValue={(e) => setState(e.target.value)} disabled={"Estado"} />
        )}
        {state && 
          <CountriesSelector name={"city"} clsName={styles['selector']} list={loadCities(country, state)} value={city} setValue={(e) => setCity(e.target.value)} disabled={"Ciudad"} />
        }
      </div>
    </div>
  );
}
