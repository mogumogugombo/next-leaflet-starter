import { useEffect, useState, useRef } from 'react';
import Leaflet from 'leaflet';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline, Circle, Rectangle } from 'react-leaflet';
import styles from './Map.module.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FeatureGroup, Popup, Marker } from "react-leaflet";
import MeasureMarkers from './MeasureMarkers';
import 'l.movemarker';
import { useMap } from 'react-leaflet'
require('leaflet.animatedmarker/src/AnimatedMarker');

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {

  let mapClassName = styles.map;
  const mapRef = useRef(null);
  const mapRef2 = useRef(null);
  const fgRef = useRef();

  const [sliderValue, setSliderValue] = useState(8)
  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerIndex, setTimerIndex] = useState(-1);
  const polylineOptions = {
    color: 'blue',
    weight: 3,
  };
  
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

  const points1 = [
    [52.2308124251888, 21.011003851890568],
    [52.2302604393307, 21.01121842861176],
    [52.2297445891999, 21.011282801628116],
    [52.22953759032849, 21.011492013931278],
    [52.22954416173605, 21.01194798946381],
    [52.22967558968336, 21.012285947799686],
    [52.2300008721797, 21.012935042381287],
    [52.230306438414374, 21.014378070831302],
  ];

  const points2 = [
    [52.2308324251888, 21.011003851890568],
    [52.2302804393307, 21.01121842861176],
    [52.2297645891999, 21.011282801628116],
    [52.22955759032849, 21.011492013931278],
    [52.22956416173605, 21.01194798946381],
    [52.22969558968336, 21.012285947799686],
    [52.2300208721797, 21.012935042381287],
    [52.230326438414374, 21.014378070831302],
  ];

  let arrayPoints = []
  arrayPoints.push(points1);
  arrayPoints.push(points2);

  useEffect(() => {
    // 線の座標データを取得するAPIなどからデータを取得する想定
    // ここではダミーデータとして固定の座標を使用
    const fetchPolylineData = async () => {
      setPositions(points1);
    };

    fetchPolylineData();
  }, []);

  let markerIndex = 0;
  // useEffect(() => {
  //   markerIndex = setInterval(() => {
  //     console.log('markerIndex=' + String(markerIndex));
  //     console.log('positions.length=' + String(positions.length));
  //     if (currentIndex < positions.length) {
  //       setCurrentIndex((prevIndex) => {
  //         console.log(prevIndex + 1);
  //         return (prevIndex + 1);
  //       });
  //     }
  //     // setCurrentIndex((prevIndex) => {
  //     //   console.log((prevIndex + 1) % positions.length)
  //     //   return (prevIndex + 1) % positions.length
  //     // });
  //   }, 1000); // マーカーの移動速度（ミリ秒）

  //   return () => {
  //     clearInterval(markerIndex);
  //   };
  // }, [positions]);

  // const start = () => {
  //   markerIndex = setInterval(() => {
  //     console.log('markerIndex=' + String(markerIndex));
  //     console.log('positions.length=' + String(positions.length));
  //     if (currentIndex < positions.length) {
  //       setCurrentIndex((prevIndex) => {
  //         console.log('prevIndex + 1 =' + String(prevIndex + 1));
  //         return (prevIndex + 1);
  //       });
  //     } else {
  //       clearInterval(markerIndex);
  //     }
  //   }, 1000); // マーカーの移動速度（ミリ秒）
  //   // clearInterval(markerIndex);

  // }

  // const start = () => {
  //   const timerId = setInterval(() => {
  //     if (currentIndex < 5) {
  //       // console.log(currentIndex);
  //       setCurrentIndex((prevIndex) => {
  //         console.log('timerId=' + String(timerId));
  //         console.log('prevIndex + 1=' + String(prevIndex + 1));
  //         if (prevIndex + 1 > 5) {
  //           clearInterval(timerId);
  //         }
  //         return (prevIndex + 1);
  //       });
  //     } else {
  //       clearInterval(timerId);
  //     }
  //   }, 1000); 
  // } 
    
  const start = () => {
    if (currentIndex === positions.length - 1) {
      setCurrentIndex(0);
    }
    const timerId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 < positions.length) {
          return (prevIndex + 1);
        } else {
          clearInterval(timerId);
          return prevIndex;
        }
      });
    }, 1000); 
    setTimerIndex(timerId);
  } 

  const stop = () => {
    if (timerIndex > - 1) {
      clearInterval(timerIndex);
    }
  } 

  //react-time-range-slider
//https://ashvin27.github.io/react-time-range-slider/

//https://codesandbox.io/s/react-timeline-range-slider-ve7w2
//https://snyk.io/advisor/npm-package/react-time-range-slider

//https://mui.com/material-ui/react-slider/
function valuetext(value) {
  return `${value}`;
}


const changed = (e, value) => {
  console.log(JSON.stringify(points[value - 1]));
};

const defaultPoints = [
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
const [markerPoints, setMarkerPoints] = useState(defaultPoints);

const anchors = [
  {
    id: 'master1',
    pos: {lat: 52.234520586193795, lng: 21.01083755493164},
    master: {id: 'master1', pos: {lat: 52.235520586193795, lng: 21.01623755493164}}
  },
  {
    id: 'slave1',
    pos: {lat: 52.235020586193795, lng: 21.01583755493164},
    master: {id: 'master1', pos: {lat: 52.230020586193795, lng: 21.01083755493164}}
  },
  {
    id: 'slave2',
    pos: {lat: 52.235520586193795, lng: 21.01623755493164},
    master: {id: 'master1', pos: {lat: 52.230020586193795, lng: 21.01083755493164}}
  }
];

const onPopupClosed = (newLabel2, index) => {
  const replacedPoints = markerPoints.map((x, index2) => {
    if (index === index2) {
      x.content.label2 = newLabel2;
    }
    return x;
  });
  setMarkerPoints(replacedPoints);
  console.log('markerPoints=' + JSON.stringify(markerPoints));
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
  [52.234520586193795, 21.01083755493164],
  [52.235520586193795, 21.01623755493164],
  [52.230020586193795, 21.01083755493164]
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
          positions={points1}
        >
        </Polyline>
        <Circle
          center={[52.2308124251888, 21.011003851890568]}
          pathOptions={fillBlueOptions}
          radius={100}
          stroke={false}
        />
        {/* <FeatureGroup pathOptions={{ color: 'purple' }} ref={fgRef}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[52.230306438414374, 21.014378070831302]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>       */}
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
        {/* <MyMarkers data={markerPoints} onPopupClosed={onPopupClosed}/>         */}
        <Polyline positions={positions} pathOptions={polylineOptions} />
        {/* {positions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            opacity={index === currentIndex ? 1 : 0} // 現在位置のマーカーのみを表示
          />
        ))} */}
        {
          positions.length > 0 ? 
          <Marker
            position={positions[currentIndex]}
            // opacity={index === currentIndex ? 1 : 0} // 現在位置のマーカーのみを表示
          />
          : null
        }
        <MeasureMarkers />
      </MapContainer>
      <DiscreteSlider />
      <button
            onClick={() =>
              start()
            }
          >
            start
      </button>      
      <button
            onClick={() =>
              stop()
            }
          >
            stop
      </button>      
    </>
  )
}

export default Map;
