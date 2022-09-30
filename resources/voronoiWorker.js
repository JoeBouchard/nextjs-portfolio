import Voronoi from "voronoi";

self.onmessage = ({ data: { apiData, precision } }) => {
  const d = new Date();
  console.log(`step 1 for ${precision} at ${parseInt(new Date() - d)}`);
  const data = apiData.reduce((state, val) => {
    const found = state.findIndex(
      (v) =>
        Math.abs(v.LATITUDE - val.LATITUDE) < precision &&
        Math.abs(v.LONGITUDE - val.LONGITUDE) < precision &&
        Math.abs(v.LATITUDE - val.LATITUDE) > 0.00001 &&
        Math.abs(v.LONGITUDE - val.LONGITUDE) > 0.00001
    );

    if (found > 0) return state;
    return [...state, val];
  }, []);
  // .sort((a, b) => {
  //   if (Math.abs(a.LATITUDE - b.LATITUDE) > precision * 2) {
  //     return a.LATITUDE < b.LATITUDE ? -1 : 1;
  //   }

  //   return a.LONGITUDE < b.LONGITUDE ? -1 : 1;
  // })
  // .reduce((state, val) => {
  //   if (
  //     state.length >= 0 &&
  //     state[state.length - 1] &&
  //     Math.abs(state[state.length - 1].LATITUDE - val.LATITUDE) < precision &&
  //     Math.abs(state[state.length - 1].LONGITUDE - val.LONGITUDE) < precision
  //   ) {
  //     return state;
  //   }
  //   return [...state, val];
  // }, []);
  console.log(`step 2 for ${precision} at ${parseInt(new Date() - d)}`);
  const voronoi = new Voronoi();
  console.log(`step 3 for ${precision} at ${parseInt(new Date() - d)}`);
  const sites = data.map((site) => ({
    x: parseFloat(site.LONGITUDE),
    y: parseFloat(site.LATITUDE),
    name: site.NAME,
    date: site.OBSERVATIONS.air_temp_value_1.date_time,
    temperature: (site.OBSERVATIONS.air_temp_value_1.value * 9) / 5 + 32,
    humidity: site.OBSERVATIONS.relative_humidity_value_1.value,
  }));
  console.log(`step 4 for ${precision} at ${parseInt(new Date() - d)}`);
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
  console.log(`step 5 for ${precision} at ${parseInt(new Date() - d)}`);
  const diagram = voronoi.compute(sites, bbox);
  console.log(`complete for ${precision} at ${parseInt(new Date() - d)}`);
  self.postMessage({ voronoi: diagram, precision, data });
};
