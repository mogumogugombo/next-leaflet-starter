import { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';

const PopupContent = ({data, index, open, onPopupClosed}) => {
    useEffect(() => {

      console.log("PopupContent. useEffect!! data=" + JSON.stringify(data));
      setLat(data.lat);
      setLng(data.lng);
    }, [data]);

    useEffect(() => {
      if (!open && changed) {
        console.log('changed');
        onPopupClosed(label2, lat, lng, index);
      }
    },[open]) 
    const [label2, setLabel2] = useState(data.content.label2);
    const [lat, setLat] = useState(data.lat);
    const [lng, setLng] = useState(data.lng);
    const [changed, setChanged] = useState(false);
    const handleChange = (e) => {
      if (e.target.value !== label2) setChanged(true);
      setLabel2(e.target.value);
    };
    const handleChangeLat = (e) => {
      if (e.target.value !== lat) setChanged(true);
      setLat(e.target.value);
    };
    const handleChangeLng = (e) => {
      if (e.target.value !== lng) setChanged(true);
      setLng(e.target.value);
    };
  
    return (
      <>
      {/* <div>data={JSON.stringify(data)}</div> */}
      <div> 
        <TextField id="outlined-basic" label="label2" variant="outlined" 
            value={label2} 
            onChange={handleChange}
        />
        <TextField id="outlined-basic" label="lat" variant="outlined" 
            value={lat} 
            onChange={handleChangeLat}
        />
        <TextField id="outlined-basic" label="lng" variant="outlined" 
            value={lng} 
            onChange={handleChangeLng}
        />
      </div>
      {/* <div>open={open === true ? '1' : '0'}</div> */}
      </>
    )
  }

  export default PopupContent;