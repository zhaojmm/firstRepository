<template>
    <div :class="[screenType==='hor' ? 'lastMonth' : 'lastMonth verticalClass2' ]">
        <div class="lastMonth-title"><span>上月数据</span></div>
        <div class="itemWrap">
            <div class="item" v-for="(item,index) in lastMonthData" :key="index">
                <div class="item-left">
                    <img :src="item.img" />
                </div>
                <div class="item-right">
                    <div class="item-value">
                        <span>{{item.value}}</span><span>{{item.unit}}</span>
                    </div>
                    <div class="item-content">
                        <div class="item-content-left">
                            <span class="max-value maxmin-level" :style="{background:item.maxColor}"></span>
                            <span class="max-min-line" :style="{ background: 'linear-gradient('+item.maxColor+',' +item.minColor+')' }"></span>
                            <span class="min-value maxmin-level" :style="{background:item.minColor}"></span>
                        </div>
                        <div class="item-content-right">
                            <div class="max">
                                <span>{{item.maxName}}</span>
                                <span>{{item.max}}</span>
                                <span>{{item.unit}}</span>
                            </div>
                            <div class="min">
                                <span>{{item.minName}}</span>
                                <span>{{item.min}}</span>
                                <span>{{item.unit}}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import icon_temp from '@/assets/icon_temp.png'
import icon_humidity from '@/assets/icon_humidity.png'
import icon_CO2 from '@/assets/icon_CO2.png'
import icon_formaldehyde from '@/assets/icon_formaldehyde.png'
import icon_PM2d5 from '@/assets/icon_PM2d5.png'
export default {
    name: 'lastMonthData',
    props: {
        screenType: {
            type: String,
            default: () => { return 'hor' } //hor 横屏  vert 竖屏
        }
    },
    data() {
        return {
            lastMonthData: [
                { id: 1, name: "温度", value: 24.5, unit: "℃", maxName: '最高温', maxColor: "#F5483D", minColor: "#7ed874", max: 26, minName: "最低温", min: 24, img: icon_temp },
                { id: 1, name: "湿度", value: 36, unit: "%", maxColor: "#EE9F2B", minColor: "#7ed874", maxName: '最大值', max: 50, minName: "最小值", min: 20, img: icon_humidity },
                { id: 1, name: "CO2", value: 420, unit: "ppm", maxColor: "#EFD62E", minColor: "#7ed874", maxName: '最大值', max: 630, minName: "最小值", min: 300, img: icon_CO2 },
                { id: 1, name: "甲醛", value: 0.03, unit: "mg/m³", maxColor: "#F5483D", minColor: "#7ed874", maxName: '最大值', max: 0.01, minName: "最小值", min: 0.07, img: icon_formaldehyde },
                { id: 1, name: "PM3d5", value: 120, unit: "ug/m³", maxColor: "#C4E34F", minColor: "#7ed874", maxName: '最大值', max: 140, minName: "最小值", min: 70, img: icon_PM2d5 },
            ]
        }
    },
    methods: {
        // linearGraient(start,end){
        //     return {
        //         "border-image":linear-gradient(start,end) 0 18
        //     }
        // }
    },
}
</script>
<style lang="less" scoped>
.lastMonth {
    height: 910px;
    width: 308px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid rgba(255, 255, 255, 1);
    padding-left: 32px;
    color: rgba(87, 82, 113, 1);
    .lastMonth-title {
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: rgba(59, 53, 88, 1);
        margin: 24px 0 0 0;
    }
    .itemWrap{

    }
    .item {
        padding-top: 60px;
        display: flex;
        align-items: center;
        height: 86px;
        width: 250px;
        .item-left {
            width: 86px;
            height: 86px;
            margin-right: 20px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .item-value {
            font-family: Persagy;
            font-size: 26px;
            font-weight: 700;
            line-height: 31px;
        }
        .item-content {
            display: flex;
            align-items: center;
            padding-top: 8px;
            font-weight: 500;
            .item-content-left {
                display: flex;
                flex-direction: column;
                .max-min-line {
                    height: 18px;
                    width: 1px;
                    //  background: linear-gradient(#f5483d, #7ed874);
                    position: relative;
                    left: 4px;
                }
            }
            .maxmin-level {
                display: inline-block;
                height: 9px;
                width: 9px;
                border-radius: 50%;
                margin-right: 8px;
            }
        }
        .min {
            padding-top: 8px;
        }
    }
}
.verticalClass2 {
    height: 440px;
    width: 1000px;
    margin:0 auto 20px;
    box-sizing: border-box;
       .itemWrap{
           display: flex;
           flex-direction: row;
         flex-wrap:  wrap ;
        //  justify-content:space-around;
         .item{
             padding-bottom: 20px;
             margin-right:70px;
         }
    }

}
</style>



