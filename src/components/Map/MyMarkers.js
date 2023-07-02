import PopupContent from './PopupContent';
import { FeatureGroup, Popup, Marker } from "react-leaflet";
import { useEffect, useState, useRef } from 'react';

const MyMarkers = ({ data, onPopupClosed }) => {
    const [opens, setOpens] = useState([false, false, false, false]);
    return data.map(({ lat, lng, content }, index) => (
      <Marker
        key={index}
        position={{ lat, lng }}
        eventHandlers={{
          popupopen: (e) => {
            const newOpens = opens.map((x, index2) => {
              return index === index2 ? true : x;
            });
            setOpens(newOpens);
            console.log('popupopen')
          },
          popupclose: (e) => {
            const newOpens = opens.map((x, index2) => {
              return index === index2 ? false : x;
            });
            setOpens(newOpens);
            console.log('popupclose')
          },
        }}
      >
        <Popup 
        >
          <PopupContent data={content} index={index} open={opens[index]} onPopupClosed={onPopupClosed}/>
        </Popup>
      </Marker>
    ));
  }

export default MyMarkers;