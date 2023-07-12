import PopupContent from './PopupContent';
import { FeatureGroup, Popup, Marker } from "react-leaflet";
import { useEffect, useState, useRef } from 'react';
import { Polyline, Circle, Rectangle } from 'react-leaflet';

const MovingMarker = ({ propPositions, move, whenStopped }) => {

  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerIndex, setTimerIndex] = useState(-1);

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

  useEffect(() => {
    console.log('propPositions=' + JSON.stringify(propPositions));
    // 線の座標データを取得するAPIなどからデータを取得する想定
    // ここではダミーデータとして固定の座標を使用
    const fetchPolylineData = async () => {
      // setPositions(points1);
      setPositions(propPositions);
    };

    fetchPolylineData();
  }, [propPositions]);

  useEffect(() => {
    if (move) {
      start();
    } else {
      stop();
    }
  }, [move]);

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
          setTimeout(() => whenStopped(), 0);
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

    return (
      <>
        {
          positions.length > 0 ? 
          <Marker
            draggable={false}
            position={positions[currentIndex]}
          >
            <Popup>
              <button onClick={() => start()}>start</button>      
              <button onClick={() => stop()}>stop</button>      
            </Popup>
          </Marker>
          : null
        }
      </>
    );
  }

export default MovingMarker;