import axios from "axios";

// axios默认配置
axios.defaults.headers.post["Content-Type"] = "application/json,charset=utf-8";
axios.defaults.timeout = 1000 * 60 * 60 * 24;
axios.defaults.baseURL = "/daping";// /daping/duoduo-service/object-service

//添加请求拦截器
axios.interceptors.request.use(
    (config: any) => {
        //config.data   config.params config.headers
      //  debugger;
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default axios;
