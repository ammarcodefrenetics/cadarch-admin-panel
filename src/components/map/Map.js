import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function MapComponent({ position, markerposition, zoom, scroscrollWheelZoom, ...props }) {
    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={scroscrollWheelZoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerposition}>
            </Marker>
        </MapContainer>
    );
}

export default MapComponent;