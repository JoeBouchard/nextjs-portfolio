import { useState, useEffect } from "react";
import { TileLayer } from "react-leaflet";

const WeatherRadar = ({ initPath }) => {
  const [path, setPath] = useState(initPath);

  const updatePath = () => {
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((r) => r.json())
      .then((data) => setPath(data.radar.past.pop().path))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    updatePath();
    const i = setInterval(() => {
      updatePath();
    }, 30 * 1000);

    return () => clearInterval(i);
  });

  return (
    <TileLayer
      url={`https://tilecache.rainviewer.com${path}/256/{z}/{x}/{y}/2/0_0.png`}
      key={path}
    />
  );
};

export default WeatherRadar;
