const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const fs = require("node:fs");

const isDevelopment = process.env.NODE_ENV !== "production";

fs.mkdirSync("dist/bundles/react-argos-nodecg");
fs.copyFileSync("src/pkg.json", "dist/bundles/react-argos-nodecg/package.json");

module.exports = ["dashboard", "graphics"].map((x) => ({
  mode: isDevelopment ? "development" : "production",
  entry: {
    dashboard: "./src/dashboard/index.tsx",
  },
  output: {
    filename: `index.js`,
    path: __dirname + "/dist/bundles/react-argos-nodecg/" + x,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
    // disableHostCheck: true,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      { test: /\.[jt]sx?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: `${x}.html` }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
}));
