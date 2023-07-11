import PopupContent from './PopupContent';
import { FeatureGroup, Popup, Marker } from "react-leaflet";
import { useEffect, useState, useRef } from 'react';
import { Polyline, Circle, Rectangle } from 'react-leaflet';

const MeasureMarkers = ({ data, onPopupClosed }) => {
  const [m1Pos, setM1Pos] = useState([52.232520586193795, 21.01283755493164]);
  const [m2Pos, setM2Pos] = useState([52.229520586193795, 21.01483755493164]);
  const polylineOptions = {
    color: 'blue',
    weight: 3,
  };

    return (
      <>
      <Marker
        key="m1"
        position={m1Pos}
        draggable={true}
        eventHandlers={{
          move: (e) => {
            const {lat, lng} = e.target.getLatLng();
            setM1Pos([lat, lng]);
            console.log(e.target.getLatLng())
          },
          moveend: (e) => {
            const {lat, lng} = e.target.getLatLng();
            setM1Pos([lat, lng]);
            console.log(e.target.getLatLng())
          },
        }}
      >
        <Popup>m1</Popup>
      </Marker>
      <Polyline positions={[m1Pos, m2Pos]} pathOptions={polylineOptions} />
      <Marker
        key="m2"
        position={m2Pos}
        draggable={true}
        eventHandlers={{
          move: (e) => {
            const {lat, lng} = e.target.getLatLng();
            setM2Pos([lat, lng]);
            console.log(e.target.getLatLng())
          },
          moveend: (e) => {
            const {lat, lng} = e.target.getLatLng();
            setM2Pos([lat, lng]);
            console.log(e.target.getLatLng())
          },
        }}
      >
        <Popup>m2</Popup>
      </Marker>
      </>
    );
  }

export default MeasureMarkers;