<template>
    <div
        class="lastChart"
        :class="[
            screenType === 'hor'
                ? 'horizontalClass'
                : 'verticalClass verticalTemChart',
        ]"
    >
        <div class="head-title">
            <span>上月每日能耗</span>
        </div>
        <div id="lastChartBox" class="lastChartBox" ref="lastChartBox"></div>
        <!-- <div id="slider"></div> -->
    </div>
</template>
<script>
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
import moment from "moment";
import { mapGetters } from "vuex";

// 自定义 shape, 支持图片形式的气泡
G2.Shape.registerShape("interval", "borderRadius", {
    draw: function draw(cfg, container) {
        var points = cfg.points;
        var path = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y]);
        path.push(["L", points[2].x, points[2].y]);
        path.push(["L", points[3].x, points[3].y]);
        path.push("Z");
        path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
        return container.addShape("rect", {
            attrs: {
                x: path[1][1], // 矩形起始点为左上角
                y: path[1][2],
                width: path[2][1] - path[1][1],
                height: path[0][2] - path[1][2],
                fill: cfg.color,
                radius: (path[2][1] - path[1][1]) / 2,
            },
        });
    },
});

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
        // window.onresize = () => {
        // };
    },
    computed: {
        ...mapGetters(["getBodyWidthHeight"]),
    },
    data() {
        return {
            ds: null,
            lastChart: null,
            time: null,
        };
    },
    watch: {
        showPing(newv, oldv) {
            // debugger; 当前是第三屏时渲染
            if (newv == 3) {
                if (!this.lastChart) {
                    this.queryLastDayEnergy();
                } else {
                    this.setChartInterval();
                }
            }
        },
        getBodyWidthHeight(newv, oldv) {
            clearTimeout(this.time);
            this.time = setTimeout(() => {
               // console.log("resize-over");
                var width =
                    document.getElementsByTagName("body")[0].offsetWidth - 80;
                var height = this.screenType === "hor" ? 274 : 330;
                this.showPing == 3 &&
                    this.lastChart &&
                    this.lastChart.changeSize(width, height);
            }, 300);
        },
    },
    methods: {
        queryLastDayEnergy() {
            //上月每日能耗
            var start = moment()
                .subtract(1, "months")
                .startOf("month")
                .format("YYYYMMDD");
            var end = moment()
                .subtract(1, "months")
                .endOf("month")
                .format("YYYYMMDD");

            //console.log("start", start);
            this.$axios
                .post(this.$api.queryLastDayEnergy, {
                    criteria: {
                        projectId: "Pj1101080259",
                        date: {
                            $gte: start,
                            $lte: end,
                        },
                    },
                })
                .then((res) => {
                    var resdata = res.data.content || [];
                    //debugger;
                    resdata.forEach(function(item) {
                        var dateStr = item.date;
                        item.Date =
                            dateStr.substr(0, 4) +
                            "-" +
                            dateStr.substr(4, 2) +
                            "-" +
                            dateStr.substr(6, 2);
                        item.value = (
                            item.energyAcTerminal +
                            item.energyCooling +
                            item.energyHeating +
                            item.energyLight
                        ).toFixed(0);
                    });
                    this.lastChart = this.cInitChart(resdata);
                    this.setChartInterval();
                });
        },
        setChartInterval() {
            if (this.screenType == "ver") {//只有竖屏才轮播
                //上个月
                var start = moment()
                    .subtract(1, "months")
                    .date(1);
                var end = moment()
                    .subtract(1, "months")
                    .date(12);
                var end2 = moment().subtract(1, "months");
                var intervalInt = setInterval(() => {
                    start.add(1, "days");
                    end.add(1, "days");
                    //debugger;
                    //console.log("start--", chart);
                    //console.log("end--", _this.ds);

                    this.ds.setState("start", start.format("YYYY-MM-DD"));
                    this.ds.setState("end", end.format("YYYY-MM-DD"));

                    if (
                        end.format("YYYY-MM-DD") ==
                        end2.endOf("month").format("YYYY-MM-DD")
                    ) {
                        clearInterval(intervalInt);
                        this.$emit("donethreepage");
                    }
                }, 800);
            }
        },
        cInitChart(cdata) {
            // var data = [
            //     { Date: "2021-08-01", type: "订阅数", value: 1300 },
            // ];

            if (this.screenType == "hor") {
                var end = cdata[cdata.length - 1].Date;
            } else {
                var end = cdata[11].Date;
            }
            var ds = new DataSet({
                state: {
                    start: cdata[0].Date,
                    end: end,
                },
            });
            var dv = ds.createView();
            dv.source(cdata).transform({
                type: "filter",
                callback: function callback(obj) {
                    var date = obj.Date;
                    return date <= ds.state.end && date >= ds.state.start;
                },
            });
            var width =
                document.getElementsByTagName("body")[0].offsetWidth - 80;
            var chart = new G2.Chart({
                container: "lastChartBox",
                //forceFit: true,
                width: width,
                height: this.screenType === "hor" ? 274 : 330,
                padding: [20, 20, 36, 20],
            });
            chart.source(dv);
            chart.tooltip(false);
            chart.scale("Date", {
                //range: [0, 1],
                tickCount: 12,
                //tickInterval:0,
                type: "timeCat",
                mask: "MM-DD",
                // formatter: function formatter(val) {
                //     console.log('val',val);
                //     return val.substr(5);
                // }
            });
            chart.scale("value", {
                //range: [0, 1],
                tickCount: 5,
                type: "linear",
                max: 1500,
                //tickInterval
                // type: 'timeCat'
            });
            chart.axis("Date", {
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
            chart.axis("value", {
                line: null,
                tickline: null,
                label: null,
            });

            chart.legend(false);

            chart
                .interval()
                .position("Date*value")
                .color("l(90) 0:#3E91F8 1:#76DEFF")
                .opacity(1)
                .shape("borderRadius")
                .adjust({ type: "stack" })
                .size(12)
                .label("value", {
                    offset: 10,
                    textStyle: {
                        fill: "#3281F6",
                        fontSize: 12,
                    },
                });

            chart.render();
            this.ds = ds;
            // chart.interact('slider', {
            //     container: 'slider', // DOM id
            //     start: ds.state.start, // 和状态量对应
            //     end: ds.state.end,
            //     data: data, // 源数据
            //     xAxis: 'Date', // 背景图的横轴对应字段，同时为数据筛选的字段
            //     yAxis: 'value', // 背景图的纵轴对应字段，同时为数据筛选的字段
            //     scales: {
            //         Date: {
            //             type: 'timeCat',
            //             nice: false
            //         }
            //     },
            //     onChange: function onChange(_ref) {
            //         var startText = _ref.startText,
            //             endText = _ref.endText;

            //         ds.setState('start', startText);
            //         ds.setState('end', endText);
            //         setTimeout(function () {
            //             chart.render();
            //         }, 32);
            //     }
            // });
            return chart;
        },
    },
};
</script>
<style lang="less" scoped>
.lastChart {
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
    .lastChartBox {
        width: 100%;
        height: 330px;
    }
    &.horizontalClass {
        .lastChartBox {
            height: 276px;
        }
    }
}
</style>
