const files = require.context("@/api", true, /.(ts|js)$/);
// 合并所有的API
const allApi = files.keys().reduce((con: any, src: string) => {
    // console.log("con", files(src));
    // console.log("src", src);
    if (src.indexOf("index.ts") == -1) {
       
        con=Object.assign(con, files(src).default);
    }
    return con;
}, {});

export default allApi;
