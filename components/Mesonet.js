import { useEffect, useState, useReducer } from "react";
import { Polygon, Popup, useMap } from "react-leaflet";
import Gradient from "javascript-color-gradient";

const temperatureColors = new Gradient()
  .setColorGradient("#dd22dd", "2222dd", "22dddd", "22dd22", "dddd22", "dd2222")
  .setMidpoint(140)
  .getColors();

const humidityColors = new Gradient()
  .setColorGradient("#dd2222", "dd2222", "dddd22", "22dd22", "2222dd")
  .setMidpoint(101)
  .getColors();

const rainColors = new Gradient()
  .setColorGradient("#dd2222", "22dd22", "2222dd")
  .setMidpoint(1000)
  .getColors();

const getColor = (site, colorBy) => {
  if (colorBy === "humidity") {
    return humidityColors[parseInt(site.site.humidity)];
  }
  if (colorBy === "rain") {
    return rainColors[Math.min(parseInt(site.site.rain), 999)];
  }
  return temperatureColors[
    Math.min(Math.max(-30, parseInt(site.site.temperature)), 109) + 30
  ];
};

const Mesonet = ({ precision, initData, colorBy }) => {
  const [apiData, setApiData] = useState(initData);
  const [cells, setCells] = useState({});
  const map = useMap();

  const loadData = async () => {
    console.log("LEAFLETMAP", map);
    return fetch(
      "https://api.synopticdata.com/v2/stations/latest?token=96919cffd7774cf0b1047d33e05b349c&country=us,ca,mx&vars=air_temp,relative_humidity&status=active&within=60"
    )
      .then((resp) => resp.json())
      .then(
        (data) =>
          data.STATION &&
          setApiData(
            data.STATION.filter(
              (s) =>
                s.NAME !== "UNASSIGNED" &&
                s.OBSERVATIONS &&
                s.OBSERVATIONS.air_temp_value_1 &&
                s.OBSERVATIONS.air_temp_value_1.value &&
                s.OBSERVATIONS.relative_humidity_value_1 &&
                s.OBSERVATIONS.relative_humidity_value_1.value &&
                new Date() -
                  new Date(s.OBSERVATIONS.air_temp_value_1.date_time) <
                  1000 * 60 * 60
            )
          )
      );
  };
  useEffect(() => {
    if (!initData) loadData();

    const i = setInterval(async () => {
      await loadData();
    }, 600 * 1000);

    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (apiData) {
      console.log(apiData.length);

      const worker = new Worker(
        new URL("../resources/voronoiWorker.js", import.meta.url)
      );
      worker.onmessage = ({ data }) => {
        setCells(data.voronoi);
        console.log(data.voronoi.cells.length);
        worker.terminate();
      };
      worker.postMessage({ apiData, precision });
    }
  }, [apiData, precision]);

  return (
    <>
      {cells.cells &&
        cells.cells.map((site) => {
          const edgeObject = site.halfedges
            .map(
              (e) =>
                e.edge &&
                e.edge.va && [
                  e.edge.va.y,
                  e.edge.va.x,
                  e.edge.vb.y,
                  e.edge.vb.x,
                ]
            )
            .reduce((state, val) => {
              const p = precision;

              if (!val) return state;
              if (Math.abs(site.site.y - val[0]) > Math.max(p * 1.5, 1)) {
                val[0] =
                  site.site.y - val[0] > 0
                    ? site.site.y - Math.max(p * 1.5, 1)
                    : site.site.y + Math.max(p * 1.5, 1);
              }

              if (Math.abs(site.site.x - val[1]) > Math.max(p * 1.5, 1)) {
                val[1] =
                  site.site.x - val[1] > 0
                    ? site.site.x - Math.max(p * 1.5, 1)
                    : site.site.x + Math.max(p * 1.5, 1);
              }
              if (Math.abs(site.site.y - val[2]) > Math.max(p * 1.5, 1)) {
                val[2] =
                  site.site.y - val[2] > 0
                    ? site.site.y - Math.max(p * 1.5, 1)
                    : site.site.y + Math.max(p * 1.5, 1);
              }

              if (Math.abs(site.site.x - val[3]) > Math.max(p * 1.5, 1)) {
                val[3] =
                  site.site.x - val[3] > 0
                    ? site.site.x - Math.max(p * 1.5, 1)
                    : site.site.x + Math.max(p * 1.5, 1);
              }
              return [
                ...state,
                [
                  [site.site.y, site.site.x],
                  [val[0], val[1]],
                  [val[2], val[3]],
                ],
              ];
            }, []);

          return (
            <Polygon
              pathOptions={{
                color: "none",
                fillColor: getColor(site, colorBy),
                fillOpacity: 0.9,
              }}
              key={site.site.voronoiId}
              positions={edgeObject}
              pane="tempmap"
              className="temptriangle"
            >
              <Popup>
                <p>{site.site.name}</p>
                <p>{Math.round(site.site.temperature * 100) / 100}&deg; F</p>
                <p>{parseInt(site.site.humidity)}% humidity</p>
                <p>{new Date(site.site.date).toLocaleString()}</p>
              </Popup>
            </Polygon>
          );
        })}
    </>
  );
};

export default Mesonet;
