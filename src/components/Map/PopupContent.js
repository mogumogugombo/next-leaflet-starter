import { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';

const PopupContent = ({data, index, open, onPopupClosed}) => {
    useEffect(() => {
      if (!open) {
        onPopupClosed(textValue, index);
      }
    },[open]) 
    const [textValue, setTextValue] = useState(data.label2);
    const handleChange = (e) => {
      setTextValue(e.target.value);
    };
  
    return (
      <>
      {/* <div>data={JSON.stringify(data)}</div> */}
      <div> 
        <TextField id="outlined-basic" label="label2" variant="outlined" 
            value={textValue} 
            onChange={handleChange}
        />
      </div>
      {/* <div>open={open === true ? '1' : '0'}</div> */}
      </>
    )
  }

  export default PopupContent;