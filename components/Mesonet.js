import { useEffect, useState } from "react";
import { Polygon, Popup, useMap, Pane } from "react-leaflet";
import Gradient from "javascript-color-gradient";
import Voronoi from "voronoi";

const temperatureColors = new Gradient()
  .setColorGradient("#dd22dd", "2222dd", "22dddd", "22dd22", "dddd22", "dd2222")
  .setMidpoint(140)
  .getColors();

console.log(temperatureColors);

const Mesonet = ({ precision }) => {
  const [apiData, setApiData] = useState();
  const [cells, setCells] = useState();
  const map = useMap();

  const loadData = () => {
    console.log("LEAFLETMAP", map);
    fetch(
      "https://api.synopticdata.com/v2/stations/latest?token=96919cffd7774cf0b1047d33e05b349c&country=us&vars=air_temp&status=active"
    )
      .then((resp) => resp.json())
      .then((data) =>
        setApiData(
          data.STATION.filter(
            (s) =>
              s.NAME !== "UNASSIGNED" &&
              s.OBSERVATIONS &&
              s.OBSERVATIONS.air_temp_value_1 &&
              s.OBSERVATIONS.air_temp_value_1.value &&
              new Date() - new Date(s.OBSERVATIONS.air_temp_value_1.date_time) <
                1000 * 60 * 60
          )
        )
      );
  };
  useEffect(() => {
    loadData();

    const i = setInterval(() => {
      loadData();
    }, 60 * 1000);

    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (apiData) {
      const data = apiData.reduce((state, val) => {
        if (
          state.filter(
            (s) =>
              Math.abs(s.LATITUDE - val.LATITUDE) < precision &&
              Math.abs(s.LONGITUDE - val.LONGITUDE) < precision
          ).length > 0
        ) {
          return state;
        }
        return [...state, val];
      }, []);
      const voronoi = new Voronoi();
      if (cells) {
        voronoi.recycle(cells);
      }
      const sites = data.map((site) => ({
        x: parseFloat(site.LONGITUDE),
        y: parseFloat(site.LATITUDE),
        name: site.NAME,
        date: site.OBSERVATIONS.air_temp_value_1.date_time,
        temperature: (site.OBSERVATIONS.air_temp_value_1.value * 9) / 5 + 32,
      }));

      const bbox = sites.reduce(
        (state, val) => {
          return {
            xl: Math.min(state.xl, parseFloat(val.x) - 1),
            xr: Math.max(state.xr, parseFloat(val.x) + 1),
            yt: Math.min(state.yt, parseFloat(val.y) - 1),
            yb: Math.max(state.yb, parseFloat(val.y) + 1),
          };
        },
        { xl: 0, xr: 0, yt: 0, yb: 0 }
      );

      console.log(sites, bbox);
      const diagram = voronoi.compute(sites, bbox);
      console.log(diagram);
      setCells(diagram);
    }
  }, [apiData, precision]);

  return (
    <>
      {cells &&
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
              if (!val) return state;
              if (
                Math.abs(site.site.y - val[0]) > Math.max(precision * 1.5, 1)
              ) {
                val[0] =
                  site.site.y - val[0] > 0
                    ? site.site.y - Math.max(precision * 1.5, 1)
                    : site.site.y + Math.max(precision * 1.5, 1);
              }

              if (
                Math.abs(site.site.x - val[1]) > Math.max(precision * 1.5, 1)
              ) {
                val[1] =
                  site.site.x - val[1] > 0
                    ? site.site.x - Math.max(precision * 1.5, 1)
                    : site.site.x + Math.max(precision * 1.5, 1);
              }
              if (
                Math.abs(site.site.y - val[2]) > Math.max(precision * 1.5, 1)
              ) {
                val[2] =
                  site.site.y - val[2] > 0
                    ? site.site.y - Math.max(precision * 1.5, 1)
                    : site.site.y + Math.max(precision * 1.5, 1);
              }

              if (
                Math.abs(site.site.x - val[3]) > Math.max(precision * 1.5, 1)
              ) {
                val[3] =
                  site.site.x - val[3] > 0
                    ? site.site.x - Math.max(precision * 1.5, 1)
                    : site.site.x + Math.max(precision * 1.5, 1);
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
                fillColor:
                  temperatureColors[
                    Math.min(
                      Math.max(-30, parseInt(site.site.temperature)),
                      110
                    ) + 30
                  ],
                fillOpacity: 0.9,
              }}
              key={site.site.voronoiId}
              positions={edgeObject}
              pane="tempmap"
            >
              <Popup>
                <p>{site.site.name}</p>
                <p>{Math.round(site.site.temperature * 100) / 100}&deg; F</p>
                <p>{new Date(site.site.date).toLocaleString()}</p>
              </Popup>
            </Polygon>
          );
        })}
    </>
  );
};

export default Mesonet;
