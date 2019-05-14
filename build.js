const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/components/ReactUEditorComponent',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-ueditor-component.min.js',
    library: 'ReactUEditorComponent',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    })
  ]
};

