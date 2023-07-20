import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import { useEffect, useState, useRef } from 'react';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const Map = (props) => {
  const [drawerWidth, setDrawerWidth] = useState(3)
  const func1 = () => {
    setDrawerWidth(1);
  }
  
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    // <div style={{ aspectRatio: width / height }}>
    //   <DynamicMap {...props} />
    // </div>
    <Grid container spacing={2}>
      <Grid item xs={drawerWidth} >
        <button onClick={() => func1()}>aaa</button>
      </Grid>
      <Grid item xs={12 - drawerWidth} >
        <DynamicMap {...props} drawerWidth={drawerWidth}/>
      </Grid>
    </Grid>
)
}

export default Map;