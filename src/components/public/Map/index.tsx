import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent, Marker, Popup, useMap } from 'react-leaflet';

const MapClick = ({ onChangePosition }: any) => {
    const map = useMapEvent('click', (e) => {
        onChangePosition([e.latlng.lat, e.latlng.lng]);

        map.flyTo(e.latlng, 15);
    });
    return null;
};

const Location = ({ location }: any) => {
    const map = useMap();
    if (location) map.flyTo(location, 15);

    return location ? (
        <Marker position={location}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    ) : null;
};

const Map = ({ position, areSearching, onChangePosition, scrollWheelZoom = true }: any): JSX.Element => {
    const [mapZoom, setMapZoom] = useState<number>(7);

    return (
        <MapContainer center={position} zoom={mapZoom} scrollWheelZoom={scrollWheelZoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClick onChangePosition={onChangePosition} />
            {areSearching && <Location location={position} />}
            {!areSearching && (
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
