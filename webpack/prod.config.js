const path = require("path");
const webpack = require("webpack");

const config = {
  mode: "production",

  entry: {
    editor: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name].min.js",
    library: "[name]",
    publicPath: "/",
  },
  performance: { hints: false },
  devtool: "source-map",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".scss", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "template-string-optimize-loader",
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Scss to CSS
          },
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 89192,
              name: "img/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
    ],
  },
};

module.exports = config;
