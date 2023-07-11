import React, { useEffect, useState } from 'react';
import { Map, Polyline, Marker, TileLayer } from 'react-leaflet';

const polylineOptions = {
  color: 'blue',
  weight: 3,
};

export const DynamicMap = () => {
  const [positions, setPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 線の座標データを取得するAPIなどからデータを取得する想定
    // ここではダミーデータとして固定の座標を使用
    const fetchPolylineData = async () => {
      const polylineData = [
        [35.6895, 139.6917], // 東京
        [34.6937, 135.5023], // 大阪
        [35.1815, 136.9066], // 名古屋
        [35.6894, 139.6917], // 東京
      ];

      setPositions(polylineData);
    };

    fetchPolylineData();
  }, []);

  useEffect(() => {
    const markerIndex = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % positions.length);
    }, 1000); // マーカーの移動速度（ミリ秒）

    return () => {
      clearInterval(markerIndex);
    };
  }, [positions]);

  return (
    <Map center={[35.6895, 139.6917]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
      <Polyline positions={positions} pathOptions={polylineOptions} />
      {positions.map((position, index) => (
        <Marker
          key={index}
          position={position}
          opacity={index === currentIndex ? 1 : 0} // 現在位置のマーカーのみを表示
        />
      ))}
    </Map>
  );
};

// export default DynamicMap;
