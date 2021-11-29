// interface obj {
//     string: string;
// }
// const allTypes: Record<string, boolean> = { jpg: true, gif: true };
//var publicMethod = {
var selectColor = function(value: any, typestr: string) {
    var colorArr: { [key: string]: Array<any> } = {
        temp: [
            { min: Number.NEGATIVE_INFINITY, max: 20, color: "#52A0FF" },
            { min: 20, max: 22, color: "#40DDCE" },
            { min: 22, max: 27, color: "#7ED874" },
            { min: 27, max: 28, color: "#C4E34F" },
            { min: 28, max: 30, color: "#EE9F2B" },
            { min: 30, max: Number.POSITIVE_INFINITY, color: "#F5483D" },
        ],
        shidu: [
            { min: 0, max: 30, color: "#F5483D" },
            { min: 30, max: 35, color: "#EE9F2B" },
            { min: 35, max: 65, color: "#7ED874" },
            { min: 65, max: 95, color: "#40DDCE" },
            { min: 95, max: Number.POSITIVE_INFINITY, color: "#52A0FF" },
        ],
        co2: [
            { min: 0, max: 800, color: "#7ED874" },
            { min: 800, max: 1000, color: "#C4E34F" },
            { min: 1000, max: 2500, color: "#EE9F2B" },
            { min: 2500, max: Number.POSITIVE_INFINITY, color: "#F5483D" },
        ],
        jiaquan: [
            { min: 0, max: 0.08, color: "#7ED874" },
            { min: 0.08, max: 0.1, color: "#C4E34F" },
            { min: 0.1, max: 0.2, color: "#EE9F2B" },
            { min: 0.2, max: Number.POSITIVE_INFINITY, color: "#F5483D" },
        ],
        pm25: [
            { min: 0, max: 35, color: "#7ED874" },
            { min: 35, max: 75, color: "#C4E34F" },
            { min: 75, max: 150, color: "#EFD62E" },
            { min: 150, max: 250, color: "#EE9F2B" },
            { min: 250, max: Number.POSITIVE_INFINITY, color: "#F5483D" },
        ],
    };
    console.log("typestr", typestr);
    console.log("value", value);
    var nowColorArr = colorArr[typestr];
    var color = null;
    nowColorArr.forEach((ele: any) => {
        if (value > ele.min && value < ele.max) {
            color = ele.color;
        }
    });
    return color;
};
//};

export { selectColor };
