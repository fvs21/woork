import Modal from "@/components/Modal/Modal";
import styles from "./CreatePosting.module.scss";
import "leaflet/dist/leaflet.css";
import "leaflet"
import { useEffect, useState } from "react";
import ArrowBackSVG from "@/components/SVGs/ArrowBack";
import { defaultIcon } from "@/components/MapMarker";
import { useTheme } from "@/hooks/theme";

export default function MapModal({location, setLocation, setMapModal, setNewLocationModal, setSelectLocationModal}) {
    const [theme] = useTheme();
    const [coordinates, setCoordinates] = useState({
        longitude: location?.location?.longitude || "",
        latitude: location?.location?.latitude || ""
    });
    let map;
    let marker;


    function mapClick(e) {
        setCoordinates({
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
        });
        
        if(marker) {
           marker.remove();
        }

        marker = L.marker(e.latlng, 
            {icon: defaultIcon}
        ).addTo(map);
    }

    function saveCoords(e) {
        e.preventDefault();

        if(!coordinates) {
            return;
        }
        setLocation({
            ...location,
            location: {
                ...location.location,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            }
        });
        setSelectLocationModal(false);
        setMapModal(false);
    }

    function returnButton(e) {
        e.preventDefault();

        if(location.create) {
            setNewLocationModal(true);
            setMapModal(false);
        } else {
            setMapModal(false);
        }
    }

    useEffect(() => {
        const view = coordinates.latitude && coordinates.longitude ? [coordinates.latitude, coordinates.longitude] : [21.039623, -89.563982];
        map = L.map('map').setView(view, 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        map.on('click', mapClick);

        if(coordinates.latitude != "" && coordinates.longitude != "") {
            marker = L.marker(
                [coordinates.latitude, coordinates.longitude],
                {icon: defaultIcon}
            ).addTo(map); 
        }

        return () => map.remove();
    }, []);


    return (
        <Modal className={styles.mapModal}>
            <div style={{paddingTop: "20px"}} className={styles.selectLocationModalContainer}>
                <div className={styles['locations-list-header']}>
                    <button className={styles['cancel-btn']}
                        onClick={returnButton}>
                            <ArrowBackSVG width={"20px"} color={theme == 'dark' ? 'white' : 'black'}/>
                    </button>
                    <h2 style={{margin: 0}}>Busca tu ubicación</h2>
                </div>
                <div className={styles['coordinates-disclaimer']}>
                    Tu ubicación no será compartida publicamente. Los demás usuarios unicamente verán una ubicación aproximada. &nbsp;
                    <a className={styles.moreInfoLink} target="_blank" href="#">Haz click aqui para más información.</a>
                </div>
                <div className={styles['map-container']}>
                    <div style={{height: "100%", borderRadius: "6px", border: "1px solid #d4d4d4", cursor: "auto"}} id="map"></div>
                    <br/>
                    <button 
                        className={`${styles['save-coords-btn']} 
                            ${(coordinates.latitude != "" && coordinates.longitude != "") && styles['active-btn']}`
                        }
                        onClick={saveCoords}
                        disabled={coordinates.latitude == "" && coordinates.longitude == ""}>
                            Continuar
                    </button>
                </div>
            </div>
        </Modal>
    )
}