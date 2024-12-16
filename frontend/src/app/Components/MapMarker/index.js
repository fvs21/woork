import "leaflet/dist/leaflet.css";
import "leaflet"
import pinPoint from "../../../css/pinpoint.png";

export const defaultIcon = L.icon({
    iconUrl: pinPoint,
    iconSize: [35, 35],
    iconAnchor: [17.5, 35]
});