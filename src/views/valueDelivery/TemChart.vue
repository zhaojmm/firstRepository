<template>
    <div
        class="temChart"
        :class="[screenType==='hor' ? 'horizontalClass' : 'verticalClass verticalTemChart' ]"
    >
        <div class="head-title">
            <span>实时温度</span>
            <div class="rightVal">
                室外温度<span>28</span>℃
            </div>
        </div>
        <div
            id="tempChartBox"
            class="tempChartBox"
        ></div>
    </div>
</template>
<script>
import G2 from '@antv/g2';

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
                { Date: '8', type: '订阅数', value: 23.5 },
                { Date: '9', type: '订阅数', value: 26.5 },
                { Date: '10', type: '订阅数', value: 29.5 },
                { Date: '11', type: '订阅数', value: 30.5 },
                { Date: '12', type: '订阅数', value: 26.5 },
                { Date: '13', type: '订阅数', value: 29.5 },
                { Date: '14', type: '订阅数', value: 30.5 },
                { Date: '15', type: '订阅数', value: 33.5 },
                { Date: '16', type: '订阅数', value: 34.5 },
                { Date: '17', type: '订阅数', value: 30.5 },
            ];
            var chart = new G2.Chart({
                container: 'tempChartBox',
                forceFit: true,
                height: 330,
                padding: [50, 40, 46, 60],
            });
            chart.source(data);

            chart.scale('Date', {
                //range: [0, 1],
                //tickCount: 2,
                //tickInterval
                // type: 'timeCat'
            });
            chart.scale('value', {
                //range: [0, 1],
                tickCount: 5,
                minTickInterval:2,
                //ticks:[20,24,28,32]
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
            chart.tooltip({
                crosshairs: 'y'
            });
            chart.legend(false);
            //view1
            // var view1 = chart.view();
            // view1.source(dv2);
            // view1.axis(false);
            // view1.area().position('Date*value').color('#8d8d8d').opacity(0.1).tooltip(false);
            //view1
            //var view1 = chart.view();

            chart.line().position('Date*value').color('#23CCF9').opacity(1).shape('smooth').style({
                lineWidth: 3,

            });
            chart.point().position('Date*value').color('#23CCF9').opacity(1).shape('circle').style({
                lineWidth: 1,
                stroke: '#ffffff',
            });
            chart.area().position('Date*value').color('l(90) 0:#23CCF9 1:#ffffff').opacity(0.2).tooltip(false).shape('smooth');

            chart.guide().text({
                top: false,
                limitInPlot: true,
                position: ['max', 'min'], // 文本的起始位置，值为原始数据值，支持 callback
                content: '时间/时分', // 显示的文本内容
                style: {
                    fill: '#9590AD', // 文本颜色
                    fontSize: '12' // 文本大小
                    // fontWeight: 'bold' // 文本粗细
                    // rotate: Math.PI / 4 // 文本旋转，以弧度为单位
                }, // 文本的图形样式属性
                offsetX: 16, // x 方向的偏移量
                offsetY: 16 // y 方向偏移量
            });
            chart.guide().text({
                // position: ['min', 'max'], // 文本的起始位置，值为原始数据值，支持 callback
                position: function (xScale, yScale) {
                    console.log('position', xScale, yScale);
                    return ['0%', '0%'];
                },
                content: '温度/℃', // 显示的文本内容
                style: {
                    fill: '#9590AD', // 文本颜色
                    fontSize: '12' // 文本大小
                    // fontWeight: 'bold' // 文本粗细
                    // rotate: Math.PI / 4 // 文本旋转，以弧度为单位
                }, // 文本的图形样式属性
                offsetX: -40, // x 方向的偏移量
                offsetY: -24// y 方向偏移量
            });
            chart.render();
            return chart;
        }
    }
}
</script>
<style lang="less" scoped>

.horizontalClass{
    width:1036px;
    height: 388px;
}
.temChart {
    padding: 24px 0 0!important;
    .head-title {
        justify-content: space-between;
        padding:0 32px;
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


