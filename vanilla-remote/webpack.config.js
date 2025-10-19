const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3003,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "vanillaRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {},
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
