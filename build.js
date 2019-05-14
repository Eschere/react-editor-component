const path = require('path');
const ora = require('ora');
const rm = require('rimraf');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'production',
  entry: './src/components/ReactUEditorComponent',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-ueditor-component.min.js',
    library: 'ReactUEditorComponent',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    react: 'React'
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        },
        parallel: true
      })
    ]
  }
};

const spinner = ora('building for production...');
spinner.start();

rm(path.resolve(__dirname, 'lib'), (err) => {
  if (err) throw err;
  webpack(config, (error, stats) => {
    spinner.stop();
    if (error) throw error;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log('打包错误');
      process.exit(1);
    }

    console.log('打包完成');
  });
});
