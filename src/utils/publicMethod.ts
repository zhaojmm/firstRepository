// interface obj {
//     string: string;
// }
// const allTypes: Record<string, boolean> = { jpg: true, gif: true };
//var publicMethod = {
var selectColor = function(value: any, typestr: string, floor: any) {
    if (value === null || value === undefined) return null;
    var colorArr: { [key: string]: Array<any> } = {
        temp: [
            {
                min: Number.NEGATIVE_INFINITY,
                max: 20,
                color: "#52A0FF",
                fcolor: "#CEE3FC",
            },
            { min: 20, max: 22, color: "#40DDCE", fcolor: "#C4F2EE" },
            { min: 22, max: 27, color: "#7ED874", fcolor: "#D9F5D6" },
            { min: 27, max: 28, color: "#C4E34F", fcolor: "#E5F3C9" },
            { min: 28, max: 30, color: "#EE9F2B", fcolor: "#F9DFB8" },
            {
                min: 30,
                max: Number.POSITIVE_INFINITY,
                color: "#F5483D",
                fcolor: "#FCC8C5",
            },
        ],
        humidity: [
            { min: 0, max: 30, color: "#F5483D", fcolor: "#F9DFB8" },
            { min: 30, max: 35, color: "#EE9F2B", fcolor: "#E5F3C9" },
            { min: 35, max: 65, color: "#7ED874", fcolor: "#D9F5D6" },
            { min: 65, max: 95, color: "#40DDCE", fcolor: "#C4F2EE" },
            {
                min: 95,
                max: Number.POSITIVE_INFINITY,
                color: "#52A0FF",
                fcolor: "#CEE3FC",
            },
        ],
        co2: [
            { min: 0, max: 800, color: "#7ED874", fcolor: "#D9F5D6" },
            { min: 800, max: 1000, color: "#C4E34F", fcolor: "#E5F3C9" },
            { min: 1000, max: 2500, color: "#EE9F2B", fcolor: "#F9DFB8" },
            {
                min: 2500,
                max: Number.POSITIVE_INFINITY,
                color: "#F5483D",
                fcolor: "#FCC8C5",
            },
        ],
        methanal: [
            { min: 0, max: 0.08, color: "#7ED874", fcolor: "#D9F5D6" },
            { min: 0.08, max: 0.1, color: "#C4E34F", fcolor: "#E5F3C9" },
            { min: 0.1, max: 0.2, color: "#EE9F2B", fcolor: "#F9DFB8" },
            {
                min: 0.2,
                max: Number.POSITIVE_INFINITY,
                color: "#F5483D",
                fcolor: "#FCC8C5",
            },
        ],
        pm25: [
            { min: 0, max: 35, color: "#7ED874", fcolor: "#D9F5D6" },
            { min: 35, max: 75, color: "#C4E34F", fcolor: "#E5F3C9" },
            { min: 75, max: 150, color: "#EFD62E", fcolor: "#F7F0C0" },
            { min: 150, max: 250, color: "#EE9F2B", fcolor: "#F9DFB8" },
            {
                min: 250,
                max: Number.POSITIVE_INFINITY,
                color: "#F5483D",
                fcolor: "#FCC8C5",
            },
        ],
    };
    // console.log("typestr", typestr);
    //  console.log("value", value);
    var nowColorArr = colorArr[typestr];
    var color = null;
    nowColorArr.forEach((ele: any) => {
        if (value > ele.min && value < ele.max) {
            color = floor ? ele.fcolor : ele.color;
        }
    });
    return color;
};
var operateNum=function(num:any){
return num.toFixed(1);
}
//};

export { selectColor };
