import Modal from "@/components/Modal/Modal";
import styles from "./JobFilters.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import "leaflet/dist/leaflet.css";
import "leaflet"
import { useEffect, useState } from "react";
import { defaultIcon } from "@/components/MapMarker";
import CrosshairSVG from "@/components/SVGs/Crosshair";
import { apiGuest } from "@/api/axios";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { svgColor } from "@/utils/extra/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { Categories } from "@/services/Categories";
import { useGetCurrentSearchedLocation, useSearchLocationId } from "@/api/hooks/postings";

export default function LocationFilter({close, locationId}) {
    const searchParams = useSearchParams();
    const category_tag = searchParams.get('category_tag') || Categories.Jardinería;

    const searchLoc = useGetCurrentSearchedLocation(category_tag, locationId);        

    const [coordinates, setCoordinates] = useState(searchLoc?.latitude && searchLoc?.longitude 
        ? [searchLoc.latitude, searchLoc.longitude] 
        : [20.971434, -89.629161]);

    const [locationDropup, setLocationDropup] = useState(false);
    const [locationName, setLocationName] = useState(searchLoc?.name || "Mérida");
    const [locations, setLocations] = useState([]);

    const [radiusDropup, setRadiusDropup] = useState(false);
    const [radius, setRadius] = useState(searchLoc?.radius ? searchLoc.radius*1000 : 20000);

    const [map, setMap] = useState();
    const [marker, setMarker] = useState();
    const [circle, setCircle] = useState();

    const [errorMsg, setErrorMsg] = useState("");

    const { search } = useSearchLocationId();

    const router = useRouter();

    useEffect(() => {
        let map = L.map('map', {
            dragging: false,
            scrollWheelZoom: false,
            zoomControl: false,
            doubleClickZoom: false
        }).setView(
            coordinates,
            getZoomForRadius(radius/1000)
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 256
        }).addTo(map);

        let circle = L.circle(coordinates, {
            color: 'rgb(170, 170, 170)',
            fillColor: 'rgb(190, 190, 190)',
            fillOpacity: 0.2,
            radius: radius,
            weight: 2
        }).addTo(map);

        let marker = L.marker(coordinates, {icon: defaultIcon}).addTo(map); 

        setMap(map);
        setMarker(marker);
        setCircle(circle);

        return () => map.remove();
    }, []);

    function changeRadius(radius) {
        setRadius(radius);
        setRadiusDropup(false);

        drawNewCircle(coordinates, radius);
    }

    function getZoomForRadius(radius) {
        switch(radius) {
            case 2:
                return 13;
            case 5:
                return 12;
            case 10:
                return 11;
            case 15:
            case 20:
                return 10;
            case 30:
                return 9;
            case 50:
                return 8;
        }
    }

    function drawNewCircle(coords, rad) {
        map.removeLayer(circle);

        let circleNew = L.circle(coords, {
            color: 'rgb(170, 170, 170)',
            fillColor: 'rgb(190, 190, 190)',
            fillOpacity: 0.2,
            radius: rad,
            weight: 2
        }).addTo(map);
        
        setCircle(circleNew);
        map.setView(coords, getZoomForRadius(rad/1000));
    }

    function drawNewMarker(coords) {
        map.removeLayer(marker);

        let markerNew = L.marker(coords, {icon: defaultIcon}).addTo(map); 
        setMarker(markerNew);
    }

    const searchLocation = async (location) => {
        if(location.name == "Ubicación actual") 
            return;
        
        const request = await apiGuest.post("/address/search", {
            'query': location
        });
        
        const json = request?.data;
        setLocations(json);
    }

    useEffect(() => {
        let timer = setTimeout(() => searchLocation(locationName), 1000);

        return () => clearTimeout(timer);
    }, [locationName]);

    //function to change the currently selected location for filtering

    const changeLocation = (loc) => {
        const coords = [loc.lat, loc.lon]
        if(coordinates[0] == coords[0] && coordinates[1] == coords[1])
            return

        setLocationName(loc.name);
        setCoordinates(coords);

        drawNewCircle(coords, radius);
        drawNewMarker(coords);
        map.setView(coords);
        
        if(errorMsg)
            setErrorMsg("");
    }

    //get user's current location using the geolocator API

    const [userLocLoading, setUserLocLoading] = useState(false);

    const getUserLocation = () => {
        if(userLocLoading)
            return;

        setUserLocLoading(true);
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    changeLocation({
                        'lat': position.coords.latitude,
                        'lon': position.coords.longitude,
                        'name': "Ubicación actual"
                    });
                    setUserLocLoading(false);
                },
                () => {
                    setErrorMsg("No pudimos detectar tu ubicación. Debes activar permisos de ubicación en tu navegador.");
                    setUserLocLoading(false);
                }
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const id = await search({
                'latitude': coordinates[0],
                'longitude': coordinates[1],
                'radius': radius / 1000
            });

            /**
            setSearchLocation({
                latitude: coordinates[0],
                longitude: coordinates[1],
                radius: radius/1000,
                id: data.id,
                name: locationName
            });
            */

            router.push(`/explore/${id}?category_tag=${category_tag}&u=true`);

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Modal className={styles.locationFilterModal} handleClose={close}>
            <div className={styles.locationFilterContainer}>
                <div className={styles.locationFilterHeader}>
                    <button 
                        className={styles.closeModalBtn}
                        onClick={close}>
                        <CloseSVG width={"22px"} color={svgColor()}/>
                    </button>
                    <div className={styles.locationFilterTitle}>Filtar por ubicación</div>
                </div>
                <div className={styles.mapContainer}>
                    <div className={styles.map} id="map"></div>
                    <button 
                        className={styles.selectOwnLocationBtn}
                        onClick={() => getUserLocation()}>
                            {userLocLoading ? 
                                <LoadingSpinner width={"25px"}/>
                            :
                                <CrosshairSVG width={"25px"} />    
                            }
                    </button>
                </div>
                <div className={styles.locationInputContainer}>
                    <label htmlFor="location_name" className={styles.locLabel}>Ubicación</label>
                    <input 
                        name="location_name"
                        className={styles.locationInput} 
                        value={locationName} 
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder="Estado, ciudad o código postal" 
                        onFocus={() => {
                            if(radiusDropup) setRadiusDropup(false);
                            setLocationDropup(true);
                        }}
                        onBlur={() => setLocationDropup(false)}
                    />
                    {locationDropup && locations.length > 0 && 
                        <div className={styles.locationDropup}>
                            {locations?.map(function(loc, i) {
                                return <div key={loc.lat}>
                                    <button 
                                        className={styles.locationBtn}
                                        onMouseDown={() => changeLocation(loc)}>
                                            {loc.display_name}
                                    </button>
                                </div>
                            })}
                        </div>
                    }
                </div>
                <div className={styles.radiusContainer}>
                    <div 
                        className={styles.radiusInput}
                        onClick={() => setRadiusDropup(!radiusDropup)}>
                            <label className={styles.radiusLabel}>Radio</label>
                            <div className={styles.radius}>
                                {radius / 1000 + " kilómetros"}
                            </div>
                    </div>
                    {radiusDropup && 
                        <div role="select" className={styles.radiusDropup}>
                            <ul className={styles.radiusList}>
                            {[50, 30, 20, 15, 10, 5, 2].map(function(rad, i) {
                                    return <li key={rad}>
                                        <RadiusBtn 
                                            value={rad} 
                                            setValue={changeRadius} 
                                            selected={radius == rad*1000}/>
                                    </li>
                                })}
                            </ul>
                        </div>
                    }
                </div>
                {errorMsg && 
                    <div style={{width: "100%"}}>
                        <span style={{fontSize: "11.5px"}} className="color-error">{errorMsg}</span>    
                    </div>
                }
                <div className={styles.applyBtnContainer}>
                    <button 
                        className={styles.applyBtn}
                        onClick={handleSubmit}>
                        Aplicar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

const RadiusBtn = ({value, setValue, selected}) => {
    return (
        <button 
            className={`${styles.selectRadiusBtn} ${selected && styles.radiusSelected}`}
            onClick={() => setValue(value * 1000)}>
                {value + " kilómetros"} 
        </button>
    )
}