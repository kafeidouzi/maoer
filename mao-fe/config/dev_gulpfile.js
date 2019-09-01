/**
 * 1.启动一个服务器
 * 2.js模块化
 * 3.css模块化
 * 4.mock数据（假数据）
 */

const connect = require('gulp-connect')
const webpack = require('webpack-stream')
const sass = require('gulp-sass')
const del = require('del')
const proxy = require('http-proxy-middleware')
const{ 
    series,
    src,
    dest,
    watch,
    parallel 
}= require('gulp');
//拷贝 html
function copyHtml(){

    return src(['../src/*.html'])
    .pipe(dest('../dev'))
    .pipe(connect.reload())
}

//拷贝 assets
// function copyAssets(){
//     return src(['../src/assets/**/*'])
//     .pipe(dest('../dev/assets'))
//     .pipe(connect.reload())
// }
//拷贝 libs
function copyLibs(){
    return src(['../src/libs/**/*'])
    .pipe(dest('../dev/libs'))
    .pipe(connect.reload())
}
//拷贝 登录注册内容
function copyLog(){
    return src(['../src/nodeLog/**/*'])
    .pipe(dest('../dev/nodeLog'))
    .pipe(connect.reload())
}

//启动一个本地服务器
function webServer(){
    return connect.server({
        host:'10.60.15.55',//默认地址
        root:'../dev',//数组或字符串，根目录
        port:8888,
        livereload:true,
        middleware(){
            return [
                proxy('/ppp',{
                    target:'https://www.missevan.com',
                    changeOrigin:true,
                    pathRewrite:{
                        '^/ppp':''
                    }
                }),
                proxy('/api',{
                    target:'http://localhost:3000',
                    changeOrigin:true,
                    // pathRewrite:{
                    //     '^/api':''
                    // }
                }),
            ]
        }
    })
}

//js模块化
function packJS (){
   return src('../src/scripts/app.js')
    .pipe(webpack(
        {
            mode:'development',
            entry:'../src/scripts/app.js',
            output:{
                filename:'app.js'
            },
            module: {
                rules: [
                  {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                      }
                    }
                  },
                  {
                    test:/\.html$/,
                    loader:'string-loader'
                  }
                ]
              }
        }
    ))
    .pipe(dest('../dev/scripts'))
    .pipe(connect.reload())
}
//删除dev
function delDevFolder(){
    return del('../dev',{force:true})
}
//CSS模块化
function packCSS(){
    return src(['../src/styles/app.scss'])
    .pipe(sass().on('error',sass.logError))
    .pipe(dest('../dev/styles'))
    .pipe(connect.reload())
}




function watcher (){
    watch('../src/*.html',series(copyHtml))
    watch('../src/scripts/**/*',packJS)
    watch('../src/styles/**/*.scss',packCSS)
   // watch('../src/assets/**/*',copyAssets)  ,copyAssets
    watch('../src/libs/**/*',copyLibs)
    watch('../src/copyLog/**/*',copyLog)
}

exports.default =  series (delDevFolder,packJS,packCSS,parallel(copyHtml,copyLibs,copyLog),parallel(webServer,watcher)    )
//exports=module.export          