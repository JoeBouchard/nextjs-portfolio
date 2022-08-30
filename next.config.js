const webpack = require("webpack");

module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (!isServer)
      config.plugins.push(
        new webpack.ProvidePlugin({
          paint: "css-paint-polyfill",
          parallelowow: "parallelowow",
        })
      );
    // Important: return the modified config
    return config;
  },
};
