<template>
    <div
        class="NowData"
        :class="[
            screenType === 'hor'
                ? 'horizontalClass'
                : 'verticalClass verticalNowData',
        ]"
    >
        <div class="head-title">
            <span>实时数据</span>
            <div class="normal-explain">
                <span class="title-right-icon"></span>
                <span>正常范围</span>
            </div>
        </div>
        <div class="subhead-title">主动式空调，会呼吸的写字楼</div>
        <div class="contain">
            <div class="item" v-for="(item, index) in realDataArr" :key="index">
                <div class="item_content">
                    <img
                        :class="[screenType === 'hor' ? '' : 'vert']"
                        :src="item.img"
                        alt=""
                    />
                    <div class="content_value">
                        <span>{{ item.value }}</span
                        ><span>{{ item.unit }}</span>
                    </div>
                    <div class="content_name">
                        <span>{{ item.name }}</span>
                    </div>
                    <div
                        class="content_level"
                        :style="{
                            backgroundColor: selectColor(item.value, item.id),
                        }"
                        :class="item.level"
                    ></div>
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
    props: {
        screenType: {
            type: String,
            default: () => {
                return "hor";
            }, //hor 横屏  vert 竖屏
        },
    },
    data() {
        return {
            intervalInt: null,
         
        };
    },
    watch: {
        // "$store.state.realTimeData"(newv, oldv) {
        //     //debugger;
        //     this.realData.forEach(function(item) {
        //         item.value = newv[item.id];
        //     });
        // },
        realDataArr(newv, oldv) {
            // debugger;
        },
    },
    mounted() {
        this.getRealTimeData(); //实时数据
        this.intervalInt = setInterval(() => {
            this.getRealTimeData(); //实时数据
        }, 60000);
    },
    computed: {
        ...mapState({
            realDataArr(state) {
                //获取数据realTimeData后的处理
                var realTimeData = state.realTimeData;
                var realInit = [
                    {
                        id: "temp",
                        code: "Tdb",
                        name: "温度",
                        img: icon_temp,
                        //value: 24.5,
                        unit: "℃",
                        level: "low",
                        fixed: 1,
                    },
                    {
                        id: "humidity",
                        name: "湿度",
                        code: "RH",
                        img: icon_humidity,
                        // value: 33,
                        unit: "%",
                        level: "middle",
                        fixed: 0,
                    },
                    {
                        id: "co2",
                        name: "CO2",
                        code: "CO2",
                        img: icon_CO2,
                        // value: 2399,
                        unit: "ppm",
                        level: "low",
                        fixed: 0,
                    },
                    {
                        id: "methanal",
                        code: "HCHO",
                        name: "甲醛",
                        img: icon_formaldehyde,
                        // value: 0.12,
                        unit: "mg/m³",
                        level: "low",
                        fixed: 2,
                    },
                    {
                        id: "pm25",
                        code: "PM2d5",
                        name: "PM2.5",
                        img: icon_PM2d5,
                        // value: 100,
                        unit: "ug/m³",
                        level: "low",
                        fixed: 0,
                    },
                ];
                realInit.forEach((item) => {
                    var filterRes = realTimeData.filter((ele) => {
                        return ele.code == item.code;
                    });
                    var value = (filterRes[0] || {}).data;
                    item.value = value
                        ? Number(value.toFixed(item.fixed))
                        : value;
                });

                return realInit;
            },
        }),
    },
    destroyed() {
        console.log('nowdata-destory');
        clearInterval(this.intervalInt);
    },
    methods: {
        ...mapActions(["getRealTimeData"]),
        selectColor: selectColor,
    },
};
</script>
<style lang="less" scoped>
.NowData {
    &.horizontalClass {
        //width: 1508px;
        height: 498px;
    }
    .head-title {
        justify-content: space-between;
    }
    .title-right-icon {
        display: inline-block;
        padding: 0;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        background: rgba(126, 216, 116, 1);
    }

    .contain {
        display: flex;
        padding-top: 47px;
    }
    .item {
        width: calc(100% / 5);
        .item_content {
            // height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            img {
                width: 150px;
                height: 150px;
                &.vert {
                    width: 130px;
                    height: 130px;
                }
            }
            .content_value {
                font-family: Persagy;
                font-size: 42px;
                font-weight: 700;
                margin-top: 10px;
                color: rgba(59, 53, 88, 1);
            }
            .content_name {
                margin-top: 8px;
                font-family: PingFang SC;
                font-size: 24px;
                font-weight: 400;
                line-height: 34px;
            }
        }
    }
    .content_level {
        margin-top: 8px;
        margin-right: 8px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(126, 216, 116, 1);
        &.middle {
            background: rgba(239, 214, 46, 1);
        }
    }
    .normal-explain {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    &.verticalNowData {
        height: 460px;
        .item {
            .item_content {
                .content_value {
                    font-size: 32px;
                }
                .content_name {
                    margin-top: 12px;
                    font-size: 20px;
                }
                .content_level {
                    margin-top: 12px;
                }
            }
        }
    }
}
</style>
