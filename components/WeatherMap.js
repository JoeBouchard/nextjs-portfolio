import { MapContainer, TileLayer, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WeatherRadar from "./WeatherRadar";
import Mesonet from "./Mesonet";
import { useEffect, useReducer, useState } from "react";
import Slider from "./Slider";
import { CircleLoader } from "react-spinners";

const WeatherMap = () => {
  const [precision, setPrecision] = useState(20);
  const [rainOpacity, setRainOpacity] = useState(90);
  const [tempOpacity, setTempOpacity] = useState(90);
  const [mesonet, activateMesonet] = useReducer((m) => true, false);

  useEffect(() => {
    const i = setInterval(() => {
      if (document.getElementsByClassName("temptriangle").length > 0) {
        activateMesonet();
      }
    }, 200);
  }, []);

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
        style={{
          position: "fixed",
          top: "12vh",
          left: "0",
          width: "100vw",
          zIndex: 1000,
        }}
      >
        <div
          className="grid grid-cols-3 mx-auto text-slate-800 font-bold bg-slate-200 rounded"
          style={{
            width: "80vw",
          }}
        >
          {mesonet ? (
            <>
              <p className="px-2">
                <p>Precision level: {(30 - precision) / 10}&deg;</p>
                <Slider
                  min={5}
                  max={30}
                  val={precision}
                  setVal={setPrecision}
                />
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
            </>
          ) : (
            <>
              <div className="px-2">Loading temperature data...</div>
              <div className="pt-2">
                <CircleLoader size={50} />
              </div>
            </>
          )}
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
      </div>
      {precision > 20 ? (
        <div
          style={{
            position: "fixed",
            bottom: "10vh",
            left: "5vw",
            zIndex: 1001,
          }}
          className="font-bold text-slate-200 bg-red-600 p-1"
        >
          {"Warning: precision < 1"}&deg; will cause page to slow down
        </div>
      ) : (
        <></>
      )}
      <div
        className="mx-auto"
        style={{
          width: "100vw",
        }}
      >
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
