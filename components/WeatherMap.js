import { MapContainer, TileLayer, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WeatherRadar from "./WeatherRadar";
import Mesonet from "./Mesonet";
import { useEffect, useReducer, useState } from "react";
import Slider from "./Slider";
import { CircleLoader } from "react-spinners";
import {
  RiMenuFoldFill as MenuOpen,
  RiMenuUnfoldFill as MenuClose,
} from "react-icons/ri";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useRouter } from "next/router";
import Toggler from "./Toggler";

const WeatherMap = () => {
  const [precision, setPrecision] = useState(10);
  const [rainOpacity, setRainOpacity] = useState(100);
  const [tempOpacity, setTempOpacity] = useState(100);
  const [warning, toggleWarning] = useReducer((w) => !w, true);
  const [mesonet, activateMesonet] = useReducer(() => true, false);
  const [slider, toggleSlider] = useReducer((s) => !s, true);
  const small = useMediaQuery(768);
  const { route } = useRouter();

  useEffect(() => {
    const i = setInterval(() => {
      if (document.getElementsByClassName("temptriangle").length > 0) {
        activateMesonet();
        clearInterval(i);
      }
    }, 200);
  }, []);

  return (
    <>
      <style>{`
    .tempmap {
      opacity: ${tempOpacity / 100};
      filter: blur(10px);
    }
    .rainmap {
      opacity: ${rainOpacity / 100}
    }
    `}</style>
      <div
        style={{
          position: "fixed",
          top: route.includes("webapps") ? "5vh" : "12vh",
          left: slider ? "0" : "45vw",
          width: "100vw",
          display: "flex",
          zIndex: 1002,
        }}
      >
        <div
          className={`mx-auto text-slate-800 font-bold bg-slate-200 rounded`}
          style={{
            width: slider ? "90vw" : "fit-content",
            display: "flex",
          }}
        >
          {slider && (
            <span
              className="grid grid-cols-3"
              style={{
                flexGrow: 1,
              }}
            >
              {(mesonet && (
                <>
                  <p className="px-2">
                    <p>Polygon size: {precision}</p>
                    <Slider
                      min={5}
                      max={30}
                      val={precision}
                      setVal={setPrecision}
                    />
                  </p>
                  <p className="">
                    <p>
                      {small
                        ? "Temp layer"
                        : `Temperature layer opacity: ${tempOpacity}%`}
                    </p>
                    {small ? (
                      <Toggler val={tempOpacity} setVal={setTempOpacity} />
                    ) : (
                      <Slider
                        min={0}
                        max={100}
                        val={tempOpacity}
                        setVal={setTempOpacity}
                      />
                    )}
                  </p>
                </>
              )) || (
                <>
                  <div className="px-2">Loading temperature data...</div>
                  <div className="pt-2">
                    <CircleLoader size={50} />
                  </div>
                </>
              )}
              <p>
                <p>Radar layer {!small && `opacity: ${rainOpacity}%`}</p>
                {small ? (
                  <Toggler val={rainOpacity} setVal={setRainOpacity} />
                ) : (
                  <Slider
                    min={0}
                    max={100}
                    val={rainOpacity}
                    setVal={setRainOpacity}
                  />
                )}
              </p>
            </span>
          )}
          <button
            className="p-3"
            style={{
              flexGrow: 0,
            }}
            onClick={toggleSlider}
          >
            {slider ? <MenuClose /> : <MenuOpen />}
          </button>
        </div>
      </div>
      {precision < 10 && warning ? (
        <div
          style={{
            position: "fixed",
            bottom: "10vh",
            left: "5vw",
            zIndex: 1001,
            display: "flex",
            flexWrap: "nowrap",
            maxWidth: "90vw",
          }}
          className="font-bold text-slate-200 bg-red-600 p-1"
        >
          <span
            className="px-3"
            style={{
              flexGrow: 1,
            }}
          >
            {"Warning: polygon size < 10"}&deg; may cause page to slow down
          </span>{" "}
          <button className="px-2" onClick={toggleWarning}>
            X
          </button>
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
          style={
            route.includes("webapps")
              ? { height: "100vh", width: "100vw" }
              : { height: "80vh", width: "90vw", zIndex: 2 }
          }
          className="mx-auto"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Pane className="tempmap" name="tempmap" />
          <Mesonet precision={precision / 10} />
          <Pane name="radar" className="rainmap">
            <WeatherRadar />
          </Pane>
        </MapContainer>
      </div>
    </>
  );
};

export default WeatherMap;
