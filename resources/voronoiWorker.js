import Voronoi from "voronoi";

self.onmessage = ({ data: { apiData, precision } }) => {
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
  const sites = data.map((site) => ({
    x: parseFloat(site.LONGITUDE),
    y: parseFloat(site.LATITUDE),
    name: site.NAME,
    date: site.OBSERVATIONS.air_temp_value_1.date_time,
    temperature: (site.OBSERVATIONS.air_temp_value_1.value * 9) / 5 + 32,
    humidity: site.OBSERVATIONS.relative_humidity_value_1.value,
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
  const diagram = voronoi.compute(sites, bbox);
  self.postMessage(diagram);
};
