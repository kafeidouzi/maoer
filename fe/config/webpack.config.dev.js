const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // 模式
  mode: 'development',

  // 入口
  entry: './src/app.js',

  // 出口
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: 'app.js'
  },

  // 做webpack-dev-server的配置
  devServer: {
    contentBase: path.resolve(__dirname, '../dev'),
    host:'10.60.15.55',
    port: 8000,
    proxy:{
      "/api":{
        target:"http://localhost:3000"
      }
    }
  },

  // loader们
  module: {
    rules: [
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      {
       test:/\.(scss|css)$/,
       loader:['style-loader','css-loader','sass-loader'] 
      }
    ]
  },

  // 插件们
  plugins: [
    // 打包html+css+js
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),

    // 拷贝 public source
    new copyWebpackPlugin([{
      from: './public',
      to: './public'
    }])
  ]
}