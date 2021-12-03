const { name } = require("./package.json");
let env = process.env.NODE_ENV.toString();
console.log('env2',env);

module.exports = {
    publicPath: `/sagadaping`, //相对路径
    outputDir: name, //打包名称
    assetsDir: "static", //静态目录
    lintOnSave: false, //关闭lint代码
    productionSourceMap: false, // 生产环境是否开启sourceMap
    // 配置跨域
    devServer: {
        port: 8080, // 服务端口
        //https: false,
        //hotOnly: false,
        proxy: {
            "/daping": {
               // http://api.sagacloud.cn/duoduo-service/object-service/object/floor/queryFs
                 target: 'http://api.sagacloud.cn', // 接 口环境
                // 'target': 'http://192.168.100.236:9910', // 开发环境
                // target: 'http://test.persagy.com', // 测试环境
                changeOrigin: true,
                //logLevel: "debug",
                pathRewrite: {
                     '^/daping': 'http://api.sagacloud.cn', // 接口环境
                    // '^/api': 'http://192.168.100.236:9910', // 开发环境
                    // '^/api': 'http://test.persagy.com/api' // 测试环境
                },
            },
        },
    },
};
