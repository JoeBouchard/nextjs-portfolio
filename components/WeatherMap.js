import { MapContainer, TileLayer, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WeatherRadar from "./WeatherRadar";
import Mesonet from "./Mesonet";
import { useState } from "react";
import {
  AiFillMinusCircle as Minus,
  AiFillPlusCircle as Plus,
} from "react-icons/ai";
import Slider from "./Slider";

const WeatherMap = () => {
  const [precision, setPrecision] = useState(20);
  const [rainOpacity, setRainOpacity] = useState(90);
  const [tempOpacity, setTempOpacity] = useState(90);
  return (
    <>
      <style>{`
    .tempmap {
      opacity: ${tempOpacity / 100};
      filter: blur(4px);
    }
    .rainmap {
      opacity: ${rainOpacity / 100}
    }
    `}</style>
      <div
        className="mx-auto"
        style={{
          width: "100vw",
        }}
      >
        <div
          className="grid grid-cols-3 mx-auto"
          style={{
            width: "80vw",
          }}
        >
          <p className="px-2">
            <p>Precision level: {(30 - precision) / 10}&deg;</p>
            <Slider min={5} max={30} val={precision} setVal={setPrecision} />
            <p>{"Warning: precision < 1"}&deg; will cause page to slow down</p>
          </p>
          <p>
            <p>Temperature layer opacity: {tempOpacity}%</p>
            <Slider
              min={0}
              max={100}
              val={tempOpacity}
              setVal={setTempOpacity}
            />
          </p>
          <p>
            <p>Radar layer opacity: {rainOpacity}%</p>
            <Slider
              min={0}
              max={100}
              val={rainOpacity}
              setVal={setRainOpacity}
            />
          </p>
        </div>
        <MapContainer
          center={[40, -100]}
          zoom={4}
          style={{ height: "80vh", width: "90vw", zIndex: 2 }}
          className="mx-auto"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Pane className="tempmap" name="tempmap" />
          <Mesonet precision={(30 - precision) / 10} />
          <Pane name="radar" className="rainmap">
            <WeatherRadar />
          </Pane>
        </MapContainer>
      </div>
    </>
  );
};

export default WeatherMap;
