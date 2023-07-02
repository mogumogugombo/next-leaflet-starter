import { useEffect, useState, useRef } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline, Circle, Rectangle } from 'react-leaflet';
import styles from './Map.module.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FeatureGroup, Popup, Marker } from "react-leaflet";

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;
  const mapRef = useRef(null);
  const mapRef2 = useRef(null);
  const fgRef = useRef();

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  const points = [
    [52.2308124251888, 21.011003851890568],
    [52.2302604393307, 21.01121842861176],
    [52.2297445891999, 21.011282801628116],
    [52.22953759032849, 21.011492013931278],
    [52.22954416173605, 21.01194798946381],
    [52.22967558968336, 21.012285947799686],
    [52.2300008721797, 21.012935042381287],
    [52.230306438414374, 21.014378070831302],
  ];

//react-time-range-slider
//https://ashvin27.github.io/react-time-range-slider/

//https://codesandbox.io/s/react-timeline-range-slider-ve7w2
//https://snyk.io/advisor/npm-package/react-time-range-slider

//https://mui.com/material-ui/react-slider/
function valuetext(value) {
  return `${value}`;
}

const [sliderValue, setSliderValue] = useState(8)

const changed = (e, value) => {
  console.log(JSON.stringify(points[value - 1]));
};
const Markers = () => {
  console.log("Markers")
  return (
    points.map((point) => {
      <Marker position={point}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>        
    })
  )
}

const points2 = [
  {
    lat: 52.230020586193795,
    lng: 21.01083755493164,
    content: {label1: 'point 1', label2: 'aaa'}
  },
  {
    lat: 52.22924516170657,
    lng: 21.011320352554325,
    content: {label1: 'point 2', label2: 'bbb'}
  },
  {
    lat: 52.229511304688444,
    lng: 21.01270973682404,
    content: {label1: 'point 3', label2: 'ccc'}
  },
  {
    lat: 52.23040500771883,
    lng: 21.012146472930908,
    content: {label1: 'point 4', label2: 'ddd'}
  },
];
const PopupContent = ({data, open, func1}) => {
  useEffect(() => {
    if (open) {
      func1(data.label1 + ' opened!!');
    } else {
      func1(data.label1 + ' closed!!');
    }
  },[open]) 

  return (
    <>
    <div>data={JSON.stringify(data)}</div>
    <div>open={open === true ? '1' : '0'}</div>
    </>
  )
}
const MyMarkers = ({ data }) => {

  const [opens, setOpens] = useState([false, false, false, false]);
  const func1 = (arg) => {
    console.log(arg);
  }
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
        <PopupContent data={content} open={opens[index]} func1={func1}/>
      </Popup>
    </Marker>
  ));
}


const DiscreteSlider = () => {
  return (
    <Box sx={{ width: 300}} style={{paddingTop: 50 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={8}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={8}
        onChange={changed}
      />
    </Box>
  );
}
const fillBlueOptions = { fillColor: 'blue' }
const rectangle = [
  [52.2308124251888, 21.011003851890568],
  [53.2308124251888, 22.011003851890568],
]
return (
    <>
      <MapContainer className={mapClassName} {...rest} 
        whenCreated={mapInstance => (mapRef.current = mapInstance)}
        ref={mapRef2}
      >
        {children(ReactLeaflet, Leaflet)}
        <Polyline
          color={'red'}
          opacity={0.7}
          weight={20}
          positions={points}
        >
        </Polyline>
        <Circle
          center={[52.2308124251888, 21.011003851890568]}
          pathOptions={fillBlueOptions}
          radius={100}
          stroke={false}
        />
        <FeatureGroup pathOptions={{ color: 'purple' }} ref={fgRef}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[52.230306438414374, 21.014378070831302]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>      
        <Marker position={[52.2408124251888, 21.031003851890568]}
          eventHandlers={{
            click: (e) => {
              // console.log(mapRef2)
              const map = mapRef2.current.leafletElement;
              console.log(map);

              // const layerId = 'your-layer-id'; // レイヤーのIDを指定
              // const layer = mapInstance.getLayer(layerId); // mapInstanceはLeafletのMapインスタンス
              // if (layer) {
              //   const layers = layer.getLayers();

              const layers = fgRef.current.getLayers();
              layers.forEach(shape => {
                if (shape instanceof L.Circle) {
                  const center = shape.getLatLng();
                  const radius = shape.getRadius();
                  console.log(center);
                } else if (shape instanceof L.Rectangle) {
                  const bounds = shape.getBounds();
                  console.log(bounds);
                } else {
                  // その他の図形の場合の処理
                  // 必要な処理を実行する
                }
                console.log(shape);
              });
            }
          }}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>        
        <MyMarkers data={points2} />        
      </MapContainer>
      <DiscreteSlider />
    </>
  )
}

export default Map;
