const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.ts',
  ],
  devtool: 'inline-source-map',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: ['./dist', './src'],
    port: 3040,
    host: '127.0.0.1', // host изменен под виндоус, если поменять обратно на *0.0.0.0*, будет работать на линукс
  },
  module: {
    rules: [

      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],

      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',

        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Example',
      template: './src/index.html',
    }),
  ],
};
