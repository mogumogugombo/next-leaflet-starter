import { useEffect, useState, useRef } from 'react';
import Leaflet from 'leaflet';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline, Circle, Rectangle } from 'react-leaflet';
import styles from './Map.module.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FeatureGroup, Popup, Marker, LayersControl } from "react-leaflet";
import MeasureMarkers from './MeasureMarkers';
import MovingMarker from './MovingMarker';
import MyMarkers from './MyMarkers';
import Player from './Player';
import 'l.movemarker';
import { useMap } from 'react-leaflet'
import Draggable from "react-draggable";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';

require('leaflet.animatedmarker/src/AnimatedMarker');

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {

  let mapClassName = styles.map;
  const mapRef = useRef(null);
  const mapRef2 = useRef(null);
  const fgRef = useRef();
  const lcRef = useRef();

  const [sliderValue, setSliderValue] = useState(8)
  const [positions, setPositions] = useState([]);
  const [positions1, setPositions1] = useState([]);
  const [positions2, setPositions2] = useState([]);
  const [positionsAll, setPositionsAll] = useState([]);
  const [moveFlgs, setMoveFlgs] = useState([false, false]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerIndex, setTimerIndex] = useState(-1);
  const [checkedPointsA, setCheckedPointsA] = useState(true);
  const [checkedPointsB, setCheckedPointsB] = useState(true);
  const [changed, setChanged] = useState(false);
  const polylineOptions = {
    color: 'blue',
    weight: 3,
  };
  
  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    console.log("DynamicMap. useEffect!!");
  }, []);

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
    [52.2318324251888, 21.011003851890568],
    [52.2312804393307, 21.01121842861176],
    [52.2307645891999, 21.011282801628116],
    [52.23055759032849, 21.011492013931278],
    [52.23056416173605, 21.01194798946381],
    [52.23069558968336, 21.012285947799686],
    [52.2310208721797, 21.012935042381287],
    [52.231326438414374, 21.014378070831302],
  ];

  useEffect(() => {
    // 線の座標データを取得するAPIなどからデータを取得する想定
    // ここではダミーデータとして固定の座標を使用
    const fetchPolylineData = async () => {
      setPositions(points1);
      setPositions1(points1);
      setPositions2(points2);

      let arrayPoints = []
      arrayPoints.push(points1);
      arrayPoints.push(points2);
      setPositionsAll(arrayPoints);
    };

    fetchPolylineData();
  }, []);

  let markerIndex = 0;

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

  const startTargetIdx = (index) => {
    let newMoveFlgs = moveFlgs.map((x, index2) => (index === index2 ? true : x));
    setMoveFlgs(newMoveFlgs);
  }
  const stopTargetIdx = (index) => {
    let newMoveFlgs = moveFlgs.map((x, index2) => (index === index2 ? false : x));
    setMoveFlgs(newMoveFlgs);
  }

  //react-time-range-slider
//https://ashvin27.github.io/react-time-range-slider/

//https://codesandbox.io/s/react-timeline-range-slider-ve7w2
//https://snyk.io/advisor/npm-package/react-time-range-slider

//https://mui.com/material-ui/react-slider/
function valuetext(value) {
  return `${value}`;
}


const sliderChanged = (e, value) => {
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

const onPopupClosed = (newLabel2, newLat, newLng, index) => {
  const replacedPoints = markerPoints.map((x, index2) => {
    if (index === index2) {
      let newValue = structuredClone(x);
      newValue.content.label2 = newLabel2;
      newValue.lat = newLat;
      newValue.lng = newLng;
      console.log('newValue=' + JSON.stringify(newValue));
      return newValue;
    } else {
      return x;
    }
  });
  setMarkerPoints(replacedPoints);
  setChanged(true);
}
const onMoveEnd = (newLat, newLng, index) => {
  const replacedPoints = markerPoints.map((x, index2) => {
    if (index === index2) {
      let newValue = structuredClone(x);
      newValue.lat = newLat;
      newValue.lng = newLng;
      console.log('newValue=' + JSON.stringify(newValue));
      return newValue;
    } else {
      return x;
    }
  });
  setMarkerPoints(replacedPoints);
  setChanged(true);
}


function DraggableBox() {
  const box = {
      background: '#fff',
      // border: '1px solid #999',
      borderRadius: '3px',
      width: '180px',
      height: '180px',
      margin: '10px',
      padding: '10px',
      float: 'left',
      cursor: 'auto'
  };
  // style={box}
  return (
  <Draggable>
    <div>
      <div style={{cursor: 'move'}}>Drag here</div>
      <div>I can now be moved around!</div>
    </div>
    </Draggable>
  );
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
        onChange={sliderChanged}
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

const pointsA = [
  { lat: 52.230020586193795, lng: 21.01083755493164, title: "point A1" },
  { lat: 52.22924516170657, lng: 21.011320352554325, title: "point A2" },
  { lat: 52.229511304688444, lng: 21.01270973682404, title: "point A3" },
  { lat: 52.23040500771883, lng: 21.012146472930908, title: "point A4" },
];

const pointsB = [
  { lat: 52.229314161892106, lng: 21.012055277824405, title: "point B1" },
  { lat: 52.22950144756943, lng: 21.01193726062775, title: "point B2" },
  { lat: 52.22966573260081, lng: 21.011829972267154, title: "point B3" },
  { lat: 52.2298333027065, lng: 21.011744141578678, title: "point B4" },
  { lat: 52.2299680154701, lng: 21.01164758205414, title: "point B5" },
  { lat: 52.23012572745442, lng: 21.011583209037784, title: "point B6" },
  { lat: 52.230276867580336, lng: 21.01143836975098, title: "point B7" },
  { lat: 52.23046414919644, lng: 21.011341810226444, title: "point B8" },
];

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
        <MyMarkers data={markerPoints} onPopupClosed={onPopupClosed} onMoveEnd={onMoveEnd}/>        
        <Polyline positions={positions} pathOptions={polylineOptions} />
        {/* {positions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            opacity={index === currentIndex ? 1 : 0} // 現在位置のマーカーのみを表示
          />
        ))} */}

        {/* {
          positions.length > 0 ? 
          <Marker
            position={positions[currentIndex]}
            // opacity={index === currentIndex ? 1 : 0} // 現在位置のマーカーのみを表示
          />
          : null
        } */}

        <MeasureMarkers />
        {/* <MovingMarker propPositions={positions1}/>
        <MovingMarker propPositions={positions2}/> */}
        { positionsAll.map((positionsItem, index) => (
          <MovingMarker propPositions={positionsItem} move={moveFlgs[index]} whenStopped={() => stopTargetIdx(index)} />
        ))}

      <LayersControl position="topright" collapsed={false} ref={lcRef} >
        {/* <TileLayer {...tileLayer} /> */}

        <LayersControl.Overlay name="point A" checked={checkedPointsA} >
          <FeatureGroup>
            {pointsA.map(({ lat, lng, title }, index) => (
              <Marker key={index} position={[lat, lng]}>
                <Popup>{title}</Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="point B" checked={checkedPointsB}>
          <FeatureGroup>
            {pointsB.map(({ lat, lng, title }, index) => (
              <Marker key={index} position={[lat, lng]}>
                <Popup>{title}</Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* <ControllingGroup /> */}

      </MapContainer>
      <DraggableBox />
      <div >
          <strong style={{cursor: 'move'}}><div>Drag here</div></strong>
          <div>changedFlg:{changed ? '1' : '0'}</div>
      </div>

      { positionsAll.map((positionsItem, index) => (
            <>
              <Player
                key={index} 
                caption={"marker" + index}
                propPlayingStatus={"pause"}
                onClickPlay={() => startTargetIdx(index)}
                onClickPause={() => stopTargetIdx(index)}
              >
              </Player>      
            </>
      ))}
      <Draggable style={{zIndex: 100000}}>
        <div >
          <div style={{cursor: 'move'}}>Drag here</div>
          { positionsAll.map((positionsItem, index) => (
            <>
              <button onClick={() => startTargetIdx(index)}>start{index}</button>      
              <button onClick={() => stopTargetIdx(index)}>stop{index}</button>      
              {/* <Player
                key={index} 
                caption={"marker" + index}
                propPlayingStatus={"pause"}
                onClickPlay={() => startTargetIdx(index)}
                onClickPause={() => stopTargetIdx(index)}
              >
              </Player>       */}
            </>
          ))}
        </div>
      </Draggable>

      <DiscreteSlider /> 
      {/* <Player />  */}

      <button
            onClick={() => {
              lcRef.current._container.hidden = true;
            }}
          >
            hide controller
      </button>      
      <button
            onClick={() => {
              setCheckedPointsA((oldValue) => !oldValue);
              // lcRef.current.style.display = 'none';
              //lcRef.current._container.hidden = true;
              //console.log(lcRef.current._container.firstElementChild);
              // console.log(lcRef.current._container.firstElementChild);
            }}
          >
            toggle point A
      </button>      
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
      <IconButton aria-label="delete" onClick={() => console.log('play')}>
        <PlayArrowIcon />
      </IconButton>
      <Player caption={"marker" + 0}
                propPlayingStatus={"pause"}
                onClickPlay={() => startTargetIdx(0)}
                onClickPause={() => stopTargetIdx(0)}
              >
      </Player>      
      
    </>
  )
}

export default Map;
