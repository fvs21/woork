import { formatAddress } from "@/utils/account/AccountUtils";
import InputLabel from "../../components/ValidatedInput/InputLabel";
import styles from "./CreatePosting.module.scss";
import { usePage } from "@inertiajs/react";

export default function LocationSelector({location, setDisplayModal}) {

    const { errors } = usePage().props;

    return (
        <div style={{padding: "10px 0", position: "relative"}}>
            <InputLabel>Ubicación</InputLabel>
            <div className={styles['selected-location-input']}>
                {location ? formatAddress(location.location) : <span>No elegido</span>}
            </div>
            <div>
                {errors.location && <span style={{marginTop: "-20px"}} className="error-msg">{errors.location}</span>}
            </div>
            <button 
                className={styles['select-location-btn']} 
                type="button"
                onClick={() => setDisplayModal(true)}>Elegir ubicación</button>
        </div>
    )
}