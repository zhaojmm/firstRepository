const { name } = require("./package.json");
const { projectId } = require("./public/config2.js");

let env = process.env.NODE_ENV.toString();
console.log('env2', env);
console.log('env2--name', name);
console.log('env2---projectId', projectId);
module.exports = {
    publicPath: '/sgshow', //相对路径
    outputDir: 'sgshow', //打包名称
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
                //target: 'http://192.168.0.14:52021', // 接 口环境
                'target': 'http://api.sagacloud.cn/', // 开发环境
                // target: 'http://test.persagy.com', // 测试环境
                changeOrigin: true,
                //logLevel: "debug",
                pathRewrite: {
                    '^/daping': 'http://api.sagacloud.cn/', // 接口环境
                    // '^/daping': 'http://192.168.0.14:52015', // 开发环境

                },
            },
            "/weather": {
                // http://api.sagacloud.cn/duoduo-service/object-service/object/floor/queryFs
                // target: 'http://192.168.0.14:52010', // 接 口环境
                'target': 'https://duoduoenv.sagacloud.cn/', // 开发环境
                // target: 'http://test.persagy.com', // 测试环境
                changeOrigin: true,
                //logLevel: "debug",
                pathRewrite: {
                    // '^/daping': 'http://192.168.0.14:52010', // 接口环境
                    '^/weather': 'https://duoduoenv.sagacloud.cn/', // 开发环境

                },
            },

        },
    },
};
