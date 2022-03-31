<template>
    <div
        class="temChart"
        :class="[
            screenType === 'hor'
                ? 'horizontalClass'
                : 'verticalClass verticalTemChart',
        ]"
    >
        <div class="head-title">
            <span>实时温度</span>
            <div class="rightVal">
                室外温度<span>{{ temperature }}</span
                >℃
            </div>
        </div>
        <div id="tempChartBox" class="tempChartBox" ref="tempChartBox"></div>
    </div>
</template>
<script>
import G2 from "@antv/g2";
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
    name: "TemChart",
    props: {
        screenType: {
            type: String,
            default: () => {
                return "ver";
            }, //hor 横屏  vert 竖屏
        },
        showPing: {
            type: Number,
            default: () => {
                return 0;
            },
        },
    },
    created() {},
    mounted() {
        //console.log("temchart--mounted");
    },
    data() {
        return {
            tempChart: null,
            timesign: null,
        };
    },
    watch: {
        showPing(newv, oldv) {
            //debugger;
            if (newv == 1) {
                //如果当前切成第一屏幕 渲染chart图
                this.getRealTimeTemp().then((res) => {
                    var cdata = res.data.data || [];
                    cdata.forEach((element) => {
                        var timestr = element.time;
                        var hour = timestr.substr(8, 2);
                        var minute = timestr.substr(10, 2);
                        element.time = hour + ":" + minute;
                    });
                    this.tempChart = this.cInitChart(cdata);
                });
            }
        },
        getBodyWidthHeight(newv, oldv) {
            clearTimeout(this.timesign);
            this.timesign = setTimeout(() => {
                var width =
                    this.screenType === "hor"
                        ? document.getElementsByTagName("body")[0].offsetWidth -
                          874
                        : document.getElementsByTagName("body")[0].offsetWidth -
                          80;
                this.showPing == 1 &&
                    this.tempChart &&
                    this.tempChart.changeSize(width, 330);
            }, 300);
        },
    },
    computed: {
        ...mapState({
            temperature: (state) => {
                var weatherCont = state.weatherCont;
                return weatherCont.temperature;
            },
        }),
        ...mapGetters(["getBodyWidthHeight"]),
    },
    methods: {
        ...mapActions(["getRealTimeTemp"]),
        cInitChart(cdata) {
            // var data = [
            //     { time: "8", type: "温度", temp: 23.5 },
            //     { time: "9", type: "温度", temp: 26.5 },
            //     { time: "10", type: "温度", temp: 29.5 },
            //     { time: "11", type: "温度", temp: 30.5 },
            //     { time: "12", type: "温度", temp: 26.5 },
            //     { time: "13", type: "温度", temp: 29.5 },
            //     { time: "14", type: "温度", temp: 30.5 },
            //     { time: "15", type: "温度", temp: 33.5 },
            //     { time: "16", type: "温度", temp: 34.5 },
            //     { time: "17", type: "温度", temp: 30.5 },
            // ];
            //var width = this.$refs.tempChartBox.clientWidth;
            //debugger;
            var width =
                this.screenType === "hor"
                    ? document.getElementsByTagName("body")[0].offsetWidth - 874
                    : document.getElementsByTagName("body")[0].offsetWidth - 80;
            if (this.tempChart) {
                this.tempChart.clear();
                var chart = this.tempChart;
            } else {
                var chart = new G2.Chart({
                    container: "tempChartBox",
                    // forceFit: true,
                    width: width,
                    height: 330,
                    padding: [50, 50, 46, 60],
                });
            }

            chart.source(cdata);

            chart.scale("time", {
                //range: [0, 1],
                //tickCount: 2,
                //tickInterval
                // type: 'timeCat'
            });
            chart.scale("temp", {
                //range: [0, 1],
                tickCount: 5,
                minTickInterval: 2,
                //ticks:[20,24,28,32]
                //tickInterval
                // type: 'timeCat'
            });
            chart.axis("time", {
                line: {
                    lineWidth: 1, // 设置线的宽度
                    stroke: "rgba(155, 152, 173,0.4)", // 设置线的颜色
                    lineDash: [3, 3], // 设置虚线样式
                },
                label: {
                    textStyle: {
                        fill: "#9B98AD",
                        fontSize: 12,
                    },
                },
                tickLine: null,
            });
            chart.axis("temp", {
                tickLine: null,
                label: {
                    textStyle: {
                        fill: "#9B98AD",
                        fontSize: 12,
                    },
                    // formatter: function formatter(text) {
                    //     return text；
                    // }
                },
            });
            // chart.tooltip({
            //     crosshairs: "y",
            // });
            chart.legend(false);
            //view1
            // var view1 = chart.view();
            // view1.source(dv2);
            // view1.axis(false);
            // view1.area().position('time*temp').color('#8d8d8d').opacity(0.1).tooltip(false);
            //view1
            //var view1 = chart.view();

            chart
                .line()
                .position("time*temp")
                .color("#23CCF9")
                .opacity(1)
                .shape("smooth")
                .tooltip(false)
                .style({
                    lineWidth: 3,
                });
            chart
                .point()
                .position("time*temp")
                .color("#23CCF9")
                .opacity(1)
                .tooltip(false)
                .shape("circle")
                .style("time", {
                    lineWidth: 2,
                    stroke: "#ffffff",
                    shadowColor: "#23CCF9",
                    shadowBlur: (val) => {
                        //debugger;
                        if (val && val == cdata[cdata.length - 1].time) {
                            return 3;
                        } else {
                            return 0;
                        }
                    },
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                });
            chart
                .area()
                .position("time*temp")
                .color("l(90) 0:#23CCF9 1:#ffffff")
                .opacity(0.2)
                .tooltip(false)
                .shape("smooth");
            var lastpoint = cdata[cdata.length - 1];
            var nowtime = moment();
            var timestr = nowtime.format("YYYY.MM.DD");
            const tooltipHtml = `<div style='line-height:22px;color:#fff;background: rgba(35,204,249,0.7);padding:10px 12px;border-radius:5px;'>
                <div style='font-size:13px;font-weight:600;'><span style='margin-right:5px'>${timestr}</span>${
                lastpoint&&lastpoint.time
            }</div>
                <div style='font-size:16px;font-weight:600;'>室内温度：${lastpoint&&lastpoint.temp.toFixed(
                    1
                )}℃</div></div>`;
            chart.guide().html({
                position: lastpoint,
                html: tooltipHtml,
                alignX: "right",
                alignY: "bottom",
                offsetX: 60,
                offsetY: -5,
            });
            chart.guide().text({
                top: false,
                limitInPlot: true,
                position: ["max", "min"], // 文本的起始位置，值为原始数据值，支持 callback
                content: "时间/时分", // 显示的文本内容
                style: {
                    fill: "#9590AD", // 文本颜色
                    fontSize: "12", // 文本大小
                    // fontWeight: 'bold' // 文本粗细
                    // rotate: Math.PI / 4 // 文本旋转，以弧度为单位
                }, // 文本的图形样式属性
                offsetX: 20, // x 方向的偏移量
                offsetY: 16, // y 方向偏移量
            });
            chart.guide().text({
                // position: ['min', 'max'], // 文本的起始位置，值为原始数据值，支持 callback
                position: function(xScale, yScale) {
                    //console.log("position", xScale, yScale);
                    return ["0%", "0%"];
                },
                content: "温度/℃", // 显示的文本内容
                style: {
                    fill: "#9590AD", // 文本颜色
                    fontSize: "12", // 文本大小
                    // fontWeight: 'bold' // 文本粗细
                    // rotate: Math.PI / 4 // 文本旋转，以弧度为单位
                }, // 文本的图形样式属性
                offsetX: -40, // x 方向的偏移量
                offsetY: -24, // y 方向偏移量
            });
            chart.render();
            return chart;
        },
    },
};
</script>
<style lang="less" scoped>
.horizontalClass {
    // width:1036px;
    height: 388px;
}
.temChart {
    padding: 24px 0 0 !important;
    .head-title {
        justify-content: space-between;
        padding: 0 32px;
        .rightVal {
            color: #39354e;
            font-size: 14px;
            font-weight: normal;
        }
    }
    .tempChartBox {
        width: 100%;
        height: 330px;
    }
}
</style>
