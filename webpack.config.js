var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_PATH = "/storenet/";
const DEV_TOOL_CONFIG = 'eval';
const DEST_FOLDER = "dist";

const isNodeModuleFile = (filename) => {
  return filename.indexOf("node_modules") >= 0;
};

const isJSFile = (filename) => {
  return filename.endsWith(".js") || filename.endsWith(".jsx");
};

const isCssFile = (filename) => {
  return filename.endsWith(".css");
};

const isSassFile = (filename) => {
  return filename.endsWith(".scss");
};

const isWoffFile = (filename) => {
  return filename.endsWith(".woff");
};

const isWoff2File = (filename) => {
  return filename.endsWith(".woff2");
}

const isSvgFontFile = (filename) => {
  return filename.endsWith(".font.svg");
};

const isTrueTypeFontFile = (filename) => {
  return filename.endsWith(".ttf");
};

const isEOTFontFile = (filename) => {
  return filename.endsWith(".eot");
}

const isFontFile = (filename) => {
  return isWoffFile(filename) || isWoff2File(filename) || isSvgFontFile(filename) || isTrueTypeFontFile(filename) || isEOTFontFile(filename);
};


const isJSONFile = (filename) => {
  return filename.endsWith(".json");
};

module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: DEV_TOOL_CONFIG,

  entry: {
    main: "./src/index.js",
    vendor: ["react", "react-dom", "mobx", "mobx-react"]
  },

  output: {
    // The build folder.
    path: path.join(__dirname, DEST_FOLDER),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    filename: "[name].[hash:8].js",
    chunkFilename: "[id].[hash:8].js",
    // (such as / or /my-project) from homepage.
    publicPath: PUBLIC_PATH
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      debug: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, "src"), "node_modules"
    ],
    alias: {
      "package.json$": path.resolve(__dirname, "package.json")
    }
  },

  externals: [
    {'./node_modules/jszip': 'jszip'}
  ],
  
  module: {
    rules: [
      {
        enforce: "pre",
        test: isJSFile,
        loader: ["babel-loader","source-map-loader"],
        exclude: isNodeModuleFile
      },
      {
        test: isCssFile,
        use: [
          { loader: "css-loader" }
        ]
      },
      {
        test: isSassFile,
        use: [
          { loader: "css-loader" },
          { loader: "sass-loader"}
        ]
      },
      {
        test: isFontFile,
        use: [
          { loader: "file-loader" }
        ]
      }
      /*{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      //include: path.join(__dirname, 'src'),
    }*/
    ],
  }
};
