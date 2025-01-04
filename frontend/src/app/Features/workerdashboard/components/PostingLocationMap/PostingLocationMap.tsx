import styles from "./PostingLocationMap.module.scss";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useEffect } from "react";
import { defaultIcon } from "@/components/MapMarker";

type PostingLocationMapProps = {
    latitude: number;
    longitude: number;
    aproximate: boolean;
    mapId: number;  
};

export default function PostingLocationMap({latitude, longitude, aproximate, mapId}: PostingLocationMapProps) {
    let map;
    const mapIdFormatted: string = 'map' + mapId;

    useEffect(() => {
        const view = [latitude, longitude];
        map = L.map(mapIdFormatted).setView(view as L.LatLngExpression, 11);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map);

        if(aproximate) {
            L.circle([latitude, longitude], {
                color: "rgb(157, 157, 157)",
                fillColor: "rgb(190, 190, 190)",
                fillOpacity: 0.5,
                radius: 3000,
            }).addTo(map);
        } else {
            L.marker([latitude, longitude], {icon: defaultIcon}).addTo(map);
        }

        return () => map.remove();
    }, []);
    
    return (
        <div 
            id={mapIdFormatted}
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "6px"
            }}>
        </div>
    )
}