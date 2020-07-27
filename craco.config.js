const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  babel: {
    presets: ["rsuite"],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        javascriptEnabled: true,
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
