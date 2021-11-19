<template>
    <div
        class="lastChart"
        :class="[screenType==='hor' ? 'horizontalClass' : 'verticalClass verticalTemChart' ]"
    >
        <div class="head-title">
            <span>上月每日能耗</span>
        </div>
        <div
            id="lastChartBox"
            class="lastChartBox"
        ></div>
    </div>
</template>
<script>
import G2 from '@antv/g2';

// 自定义 shape, 支持图片形式的气泡
G2.Shape.registerShape('interval', 'borderRadius', {
    draw: function draw(cfg, container) {
        var points = cfg.points;
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y]);
        path.push(['L', points[2].x, points[2].y]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
        return container.addShape('rect', {
            attrs: {
                x: path[1][1], // 矩形起始点为左上角
                y: path[1][2],
                width: path[2][1] - path[1][1],
                height: path[0][2] - path[1][2],
                fill: cfg.color,
                radius: (path[2][1] - path[1][1]) / 2
            }
        });
    }
});

export default {
    name: "TemChart",
    props: {
        screenType: {
            type: String,
            default: () => { return 'ver' } //hor 横屏  vert 竖屏
        }
    },
    created() {
        console.log("created");
    },
    mounted() {
        console.log("mounted");
        this.cInitChart();
    },
    data() {
        return {

        }
    },
    methods: {
        cInitChart() {
            var data = [
                { Date: '08-01', type: '订阅数', value: 1300 },
                { Date: '08-02', type: '订阅数', value: 1200 },
                { Date: '08-03', type: '订阅数', value: 1350 },
                { Date: '08-04', type: '订阅数', value: 1100 },
                { Date: '08-05', type: '订阅数', value: 1005 },
                { Date: '08-06', type: '订阅数', value: 1200 },
                { Date: '08-07', type: '订阅数', value: 1100 },
                { Date: '08-08', type: '订阅数', value: 1100 },
                { Date: '08-09', type: '订阅数', value: 1200 },
                { Date: '08-10', type: '订阅数', value: 900 },
                { Date: '08-11', type: '订阅数', value: 800 },
                { Date: '08-12', type: '订阅数', value: 970 },
            ];
            var chart = new G2.Chart({
                container: 'lastChartBox',
                forceFit: true,
                height: this.screenType === 'hor' ? 274 : 330,
                padding: [50, 40, 46, 60],
            });
            chart.source(data);
            chart.tooltip(false);
            chart.scale('Date', {
                //range: [0, 1],
                //tickCount: 2,
                //tickInterval
                // type: 'timeCat'
            });
            chart.scale('value', {
                //range: [0, 1],
                tickCount: 5,
                //tickInterval
                // type: 'timeCat'
            });
            chart.axis('Date', {
                line: {
                    lineWidth: 1, // 设置线的宽度
                    stroke: 'rgba(155, 152, 173,0.4)', // 设置线的颜色
                    lineDash: [3, 3] // 设置虚线样式
                },
                label: {
                    textStyle: {
                        fill: '#9B98AD',
                        fontSize: 12,
                    }
                },
                tickLine: null
            });
            chart.axis('value', {
                tickLine: null,
                label: {
                    textStyle: {
                        fill: '#9B98AD',
                        fontSize: 12,
                    },
                    // formatter: function formatter(text) {
                    //     return text；
                    // }
                }
            });
            // chart.tooltip({
            //     crosshairs: 'y'
            // });
            chart.legend(false);

            //#3E91F8 #76DEFF

            chart.interval().position('Date*value').color('l(90) 0:#3E91F8 1:#76DEFF').opacity(1).shape('borderRadius').adjust({ type: 'stack' }).size(12).label('value', {
                offset: 10,
                textStyle: {
                    fill: '#3281F6',
                    fontSize: 12
                }
            });

            chart.render();
            return chart;
        }
    }
}
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
            height: 274px;
        }
    }
}
</style>


