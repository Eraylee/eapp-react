const path = require("path");
const fs = require("fs");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackAlias,
} = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const { getLessVars } = require("antd-theme-generator");

const themeVariables = getLessVars(
  path.join(__dirname, "./src/styles/vars.less")
);
// const defaultVars = getLessVars(
//   "./node_modules/antd/lib/style/themes/default.less"
// );
const darkVars = {
  ...getLessVars("./node_modules/antd/lib/style/themes/dark.less"),
  "@primary-color": themeVariables["@primary-color"],
};
const lightVars = {
  ...getLessVars("./node_modules/antd/lib/style/themes/compact.less"),
  "@primary-color": themeVariables["@primary-color"],
};
fs.writeFileSync("./src/dark.json", JSON.stringify(darkVars));
fs.writeFileSync("./src/light.json", JSON.stringify(lightVars));

const resolve = (dir) => path.join(__dirname, ".", dir);

const options = {
  stylesDir: path.join(__dirname, "./src"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/styles/vars.less"),
  themeVariables: Array.from(
    new Set([
      ...Object.keys(darkVars),
      ...Object.keys(lightVars),
      ...Object.keys(themeVariables),
    ])
  ),
  generateOnce: false, // generate color.less on each compilation
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addWebpackAlias({
    "@": resolve("src"),
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  })
);
