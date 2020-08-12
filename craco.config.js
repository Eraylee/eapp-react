const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");
const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const { getLessVars } = require("antd-theme-generator");
const fs = require("fs");
const themeVariables = getLessVars(
  path.join(__dirname, "./src/styles/vars.less")
);
const defaultVars = getLessVars(
  "./node_modules/antd/lib/style/themes/default.less"
);
const darkVars = {
  ...getLessVars("./node_modules/antd/lib/style/themes/dark.less"),
  "@primary-color": defaultVars["@primary-color"],
};
const lightVars = {
  ...getLessVars("./node_modules/antd/lib/style/themes/compact.less"),
  "@primary-color": defaultVars["@primary-color"],
};
fs.writeFileSync("./src/dark.json", JSON.stringify(darkVars));
fs.writeFileSync("./src/light.json", JSON.stringify(lightVars));
fs.writeFileSync("./src/theme.json", JSON.stringify(themeVariables));
const options = {
  stylesDir: path.join(__dirname, "./src"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/styles/vars.less"),
  themeVariables: ["@primary-color"],
  generateOnce: false, // generate color.less on each compilation
};
const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
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
  webpack: {
    plugins: [themePlugin],
  },
};
