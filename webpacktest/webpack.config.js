var webpack = require("webpack");

var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //打包css的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: {
    "./js/index": "./src/js/index.js", //入口文件
    "./js/test": "./src/js/demo1.js",
    //我们的是多页面项目，多页面入口配置就是这样，
    //app/src/page下可能还会有很多页面，照着这样配置就行
  },
  //   module: {
  //     //规则，刚才安装的css-loader和style-loader这里进行配置
  //     rules: [
  //       {
  //         test: /\.css$/,
  //         use: ExtractTextPlugin.extract({
  //           fallback: "style-loader",
  //           use: "css-loader",
  //         }),
  //       },
  //     ],
  //   },
  module: {
    rules: [
      { test: /.js$/, use: ["babel-loader"] },
      //   {
      //     test: /.css$/,
      //     use: ["style-loader", "css-loader"],
      //   } /*解析css, 并把css添加到html的style标签里*/,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      //{test: /.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader'})},/*解析css, 并把css变成文件通过link标签引入*/
      {
        test: /.(jpg|png|gif|svg)$/,
        loader: "url-loader",
        options: {
          name: "img/[name].[ext]",
          limit: 8192,
          //outputPath: "img/", // 指定图片输入的文件夹
          publicPath: "../", // 指定获取图片的路径
          esModule: false,
        },
        // use: ["url-loader?limit=8192&name=../img/[name].[ext]"],
      } /*解析图片*/,
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      } /*解析less, 把less解析成浏览器可以识别的css语言*/,
    ],
  },

  output: {
    // publicPath: "../",
    //__dirname 当前webpack.config.js的路径
    filename: "[name].[chunkHash:5].js", //打包后index.js的名字，
    // publicPath: __dirname + "/out", //添加静态资源, 否则会出现路径错误
    // 这个[name]的意思是,配置入口entry键值对里的key值,app/dist/js/index,最后的index，
    //这里无论你src/js/index.js这个脚本如何命名，打包后都将是index.js
    //   path: path.resolve(__dirname)
  },

  //插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      chunks: ["./js/index"],
      template: "./src/page/index.html",
      inject: "body",
      //   template: "./dist/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "./test.html",
      chunks: ["./js/test"],
      template: "./src/page/test.html",
      inject: "body",
      //   template: "./dist/index.html",
    }),
    new ExtractTextPlugin({
      //这里关键至极,filename:[name].[contenthash:5].css;之前我们项目是这样写的，这样写，打包出来的css就跑到dist/js里面去了，
      // 虽然不影响使用，但是混到一起就是很不舒服，
      //这里你们非常有必要先试试，filename:[name].[contenthash:5].css
      //还有就是最外层建一个 css文件夹  ，然后这样配置filename:css/[name].[contenthash:5].css,然后看看具体打包出什么，
      //   filename: "[name].[chunkHash:5].css",
      filename: (getPath) => {
        return getPath("[name]_[md5:contenthash:hex:8].css").replace(
          "js",
          "css"
        );
      },
    }),
    //清除上次打包文件
    new CleanWebpackPlugin(), // 这样就可以了，里面不需要加什么路径了
  ],
};
