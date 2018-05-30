const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {loader: 'css-loader'},
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        use: ['url-loader?limit=5000']
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use: ['url-loader?limit=5000']
      }
    ]
  },

  plugins: [
    // html 模版插件
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.tmpl.html`
    }),

    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev ') || 'false'))
    })
  ],

  devServer: {
    proxy: {
      '/ashx': {
        target: 'http://new.cjtglm.com',
        secure: false,
        changeOrigin: true
      },
      '/txsecurities_pics': {
        target: 'http://new.cjtglm.com',
        secure: false,
        changeOrigin: true
      }
    },
    contentBase: './build', // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true// 使用热加载插件 HotModuleReplacementPlugin
  }
};
