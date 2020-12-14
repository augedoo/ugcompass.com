import './Map.css';
import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ facility }) => {
  const { location: loc, name, _id } = facility;

  const position = [loc.coordinates[1], loc.coordinates[0]];

  return (
    <div className='facility__map'>
      <MapContainer center={position} zoom={25} scrollWheelZoom={false}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker key={_id} position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
