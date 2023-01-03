import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import terminalData from "../../../../data/result_w_address.json";
import osm from "../../../../sources/osm-providers";

const markerIcon = new L.Icon({
    iconUrl: "./placeholder.png",
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

function ResetCenterView(props: any) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition?.address_info.lat, selectPosition?.address_info.lng),
                10,
                {
                    animate: true
                }
            )
        }
    }, [selectPosition]);

    return null;
}

export default function Maps(props: any) {
    const [center, setCenter] = useState({ lat: 41.8919300, lng: 12.5113300 });
    const { selectPosition } = props;
    const geoPosition = [];

    for (let i = 0; i < terminalData.length; i++) {
        geoPosition.push({
            'lat': terminalData[i].address_info.lat,
            'lng':terminalData[i].address_info.lng,
            'phone': terminalData[i].Phone,
            'terminal': terminalData[i].terminal
        })
    }

    return (
        <MapContainer
            center={center}
            zoom={6}
            style={{ width: "95%", height: "100%" }}
        >
            <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
            />
            {geoPosition.map((terminal, idx) => (
                <Marker position={[terminal.lat, terminal.lng]}
                        icon={markerIcon}
                        key={idx}>
                    <Popup>
                        <b> {terminal.terminal} <br/> {terminal.phone} </b>
                    </Popup>
                </Marker>
            ))}
            <ResetCenterView selectPosition={selectPosition} />
        </MapContainer>
    );
}
