const {
    name,
} = require('./package.json');

module.exports = {
    publicPath: `/sagadaping`, //相对路径
    outputDir: name, //打包名称
    assetsDir: 'static', //静态目录
    lintOnSave: false, //关闭lint代码
    productionSourceMap: false, // 生产环境是否开启sourceMap
    // 配置跨域
    devServer: {
        port: 8080, // 服务端口
        https: false,
        hotOnly: false,
    
    }
}