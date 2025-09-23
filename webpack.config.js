const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (_, argv) => {
  const isProd = argv.mode === "development";

  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "assets/[name].[contenthash].js" : "assets/[name].js",
      assetModuleFilename: "assets/[name][ext][query]",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        { test: /\.(png|jpe?g|gif|svg|woff2?)$/i, type: "asset/resource" },
        {
          test: /\.svg$/i,
          oneOf: [
            { resourceQuery: /markup/, use: "svg-inline-loader" },
            { type: "asset/resource" },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
    ],
    devtool: isProd ? "source-map" : "eval-source-map",
    devServer: {
      port: 5173,
      open: true,
      hot: true,
      compress: true,
      client: { overlay: true },
      static: { directory: path.join(__dirname) },
    },
    optimization: {
      splitChunks: { chunks: "all" },
      runtimeChunk: "single",
    },
  };
};
