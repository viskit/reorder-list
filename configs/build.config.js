const common = require("./common.config.js");
const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  entry: path.resolve(__dirname, "..", "src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "..", "dist"),
    library:{
      type:"module"
    }
  },
  experiments:{
    outputModule:true
  },
  target:"es2020",
  mode: "production"
});
