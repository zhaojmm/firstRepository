<template>
    <div
        class="lastMonth"
        :class="[
            screenType === 'hor'
                ? 'horizontalClass horiLastMonth'
                : 'verticalClass verticalLastMonth',
        ]"
    >
        <div class="head-title"><span>上月数据</span></div>
        <div class="itemWrap">
            <div class="item" v-for="(item, index) in lastDataArr" :key="index">
                <div class="item-left">
                    <img :src="item.img" />
                </div>
                <div class="item-right">
                    <div class="item-value">
                        <span>{{ item.value }}</span
                        ><span>{{ item.unit }}</span>
                    </div>
                    <div class="item-content">
                        <div class="item-content-left">
                            <span
                                class="max-value maxmin-level"
                                :style="{
                                    backgroundColor: selectColor(
                                        item.max,
                                        item.id
                                    ),
                                }"
                            ></span>
                            <span
                                class="max-min-line"
                                :style="{
                                    background:
                                        'linear-gradient(' +
                                        selectColor(item.max, item.id) +
                                        ',' +
                                        selectColor(item.min, item.id) +
                                        ')',
                                }"
                            ></span>
                            <span
                                class="min-value maxmin-level"
                                :style="{
                                    backgroundColor: selectColor(
                                        item.min,
                                        item.id
                                    ),
                                }"
                            ></span>
                        </div>
                        <div class="item-content-right">
                            <div class="max">
                                <span>{{ item.maxName }}</span>
                                <span>{{ item.max }}</span>
                                <span>{{ item.unit }}</span>
                            </div>
                            <div class="min">
                                <span>{{ item.minName }}</span>
                                <span>{{ item.min }}</span>
                                <span>{{ item.unit }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import icon_temp from "@/assets/icon_temp.png";
import icon_humidity from "@/assets/icon_humidity.png";
import icon_CO2 from "@/assets/icon_CO2.png";
import icon_formaldehyde from "@/assets/icon_formaldehyde.png";
import icon_PM2d5 from "@/assets/icon_PM2d5.png";
import { selectColor } from "@/utils/publicMethod";
import { mapState, mapActions } from "vuex";
export default {
    name: "lastMonthData",
    props: {
        screenType: {
            type: String,
            default: () => {
                return "hor";
            }, //hor 横屏  vert 竖屏
        },
    },
    data() {
        return {};
    },
    created() {
        this.getLastMonthData();
    },
    watch: {
        lastDataArr(newv, oldv) {
            //debugger;
        },
    },
    destroyed() {
        // console.log("lastMonthData---destroyed");
    },
    computed: {
        ...mapState({
            lastDataArr(state) {
                //state改变时调用  通过state.lastMonthData的值 生成新的值
                var statecopu = JSON.parse(JSON.stringify(state));
                //console.log('lastDataArr',statecopu);
                var lastMonthData = state.lastMonthData;
                var lastMonthInit = [
                    {
                        id: "temp",
                        name: "温度",
                        code: "Tdb",
                        unit: "℃",
                        maxName: "最高温",
                        minName: "最低温",
                        img: icon_temp,
                        fixed: 1,
                    },
                    {
                        id: "humidity",
                        name: "湿度",
                        code: "RH",
                        unit: "%",
                        maxName: "最大值",
                        max: 50,
                        minName: "最小值",
                        min: 20,
                        img: icon_humidity,
                        fixed: 0,
                    },
                    {
                        id: "co2",
                        name: "CO2",
                        code: "CO2",
                        value: 2600,
                        unit: "ppm",
                        maxName: "最大值",
                        max: 2600,
                        minName: "最小值",
                        min: 300,
                        img: icon_CO2,
                        fixed: 0,
                    },
                    {
                        id: "methanal",
                        name: "甲醛",
                        code: "HCHO",
                        value: 0.03,
                        unit: "mg/m³",
                        maxName: "最大值",
                        max: 0.01,
                        minName: "最小值",
                        min: 0.07,
                        img: icon_formaldehyde,
                        fixed: 2,
                    },
                    {
                        id: "pm25",
                        name: "PM2.5",
                        code: "PM2d5",
                        value: 120,
                        unit: "ug/m³",
                        maxColor: "#C4E34F",
                        minColor: "#7ed874",
                        maxName: "最大值",
                        max: 340,
                        minName: "最小值",
                        min: 20,
                        img: icon_PM2d5,
                        fixed: 0,
                    },
                ];
                lastMonthInit.forEach((item) => {
                    var filterRes = lastMonthData.filter((ele) => {
                        return ele.code == item.code;
                    });
                    var filterObj = filterRes[0] || {};
                    item.value = filterObj.avgData
                        ? Number(filterObj.avgData.toFixed(item.fixed))
                        : filterObj.avgData;
                    item.max = filterObj.maxData
                        ? Number(filterObj.maxData.toFixed(item.fixed))
                        : filterObj.maxData;
                    item.min = filterObj.minData
                        ? Number(filterObj.minData.toFixed(item.fixed))
                        : filterObj.minData;
                });
                return lastMonthInit;
            },
        }),
    },
    methods: {
        ...mapActions(["getLastMonthData"]),
        selectColor: selectColor,
    },
};
</script>
<style lang="less" scoped>
.lastMonth {
    &.horizontalClass {
        height: 100%;
        //height: 910px;
        // width: 308px;
    }
    .item {
        padding-top: 60px;
        display: flex;
        align-items: center;

        .item-left {
            width: 86px;
            height: 86px;
            margin-right: 20px;
            img {
                width: 86px;
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
            font-size: 14px;
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
        .item-content-right {
            font-size: 14px;
            white-space: nowrap;
            color: #575271;
            .min {
                padding-top: 8px;
            }
        }
    }
}
.horiLastMonth {
    .item {
        padding-top: 0;
    }
    .itemWrap {
        height: calc(100% - 30px);
        display: flex;
        flex-direction:column;
        justify-content: space-evenly;
    }
}
.verticalLastMonth {
    height: 440px;

    .itemWrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        //  justify-content:space-around;
        .item {
            width: 33.33%;
            // justify-content: center;
            .item-content-right {
                font-size: 14px;
                white-space: nowrap;
            }
        }
    }
}
</style>
