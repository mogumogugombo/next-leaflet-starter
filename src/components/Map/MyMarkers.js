import PopupContent from './PopupContent';
import { FeatureGroup, Popup, Marker } from "react-leaflet";
import { useEffect, useState, useRef } from 'react';

const MyMarkers = ({ data, onPopupClosed, onMoveEnd }) => {
  // useEffect(() => {
  //   console.log("MyMarkers. useEffect!!");
  // }, [data]);

    const [opens, setOpens] = useState([false, false, false, false]);
    return data.map(({ lat, lng, content }, index) => (
      <Marker
        key={index}
        position={{ lat, lng }}
        draggable={true}
        eventHandlers={{
          moveend(e) {
            const latlng = e.target.getLatLng();
            onMoveEnd(latlng.lat, latlng.lng, index);
            console.log('moveend=' + JSON.stringify(latlng));
            // 地図の中心の緯度経度情報を redux に渡す
            // dispatch(
            //   setMapCenterPosition({
            //     lat: e.target._lastCenter.lat,
            //     lng: e.target._lastCenter.lng,
            //   })
            // );
          },          
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
          <PopupContent data={{content:content, lat:lat, lng:lng}} index={index} open={opens[index]} onPopupClosed={onPopupClosed}/>
        </Popup>
      </Marker>
    ));
  }

export default MyMarkers;