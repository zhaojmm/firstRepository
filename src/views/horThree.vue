<template>
    <div class="horThree">
        <div class="bg">
            <img
                :src="bgImg"
                alt=""
            >
        </div>
        <div class="container">
            <div class="hor-head">
                <HorHead />
            </div>
            <div class="hor-nowData-content">
                <div class="flexBetween">
                    <div class="left box">
                        <div class="left-bg bg1">
                            <img :src="lastMonthTotal" />
                        </div>
                        <div class="left-title car-title">
                            <div>上月总能耗</div>
                            <div class="left-title-text">低能耗亲自然</div>
                        </div>
                        <div class="left-content">
                            <div class="left-content-first">比基准能耗</div>
                            <div class="left-content-next">
                                节能<span class="next-num">50%</span>
                            </div>
                            <div class="left-content-first blue">总能耗28050KWh</div>
                        </div>
                    </div>
                    <div class="right box">
                        <div class="right-bg bg1">
                            <img :src="lastMonthEner" />
                        </div>
                        <div class="right-title car-title">
                            <span>上月节约能耗</span>
                        </div>
                        <div class="elect">
                            <div>节约电</div>
                            <div> <span>23456</span>度</div>
                        </div>
                        <div class="and">
                            <span>相当于</span>
                        </div>
                        <div class="CO2 common">
                            <span>减排<i class="num">5kg</i>二氧化碳</span>
                        </div>
                        <div class="carbon common">
                            <span>减排<i class="num">5kg</i>碳</span>
                        </div>
                        <div class="tree common">

                            <span>为国家种<i class="num">5</i>棵树</span>
                        </div>
                    </div>
                </div>
                <div class="chart-box box">
                    上月总能耗
                </div>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
declare function require(img: string): string;
const hor_big_bg = require("@/assets/horImg/hor_big_bg.png");
const hor_lastMonthEner = require("@/assets/horImg/hor_lastMonthEner.png");
const hor_lastMonthTotal = require("@/assets/horImg/hor_lastMonthTotal.png");
import HorHead from "./valueDelivery/HorHead.vue";

export default Vue.extend({
    components: { HorHead },
    data() {
        return {
            bgImg: hor_big_bg,
            lastMonthEner: hor_lastMonthEner,
            lastMonthTotal: hor_lastMonthTotal,
        };
    },
});
</script>
<style lang="less" scoped>
.horThree {
    color: #3b3558;
    .hor-head {
        // padding-top: 32px;
        display: flex;
        justify-content: center;
    }
    .bg {
        position: absolute;
        z-index: -2;
    }
    .bg1 {
        position: absolute;
        z-index: -1;
    }

    .flexBetween {
        display: flex;
        justify-content: space-between;
    }
    .box {
        z-index: -1;
        border-radius: 20px;
        border: 2px solid #ffffff;
        background: #ffffffcc;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .car-title {
        position: absolute;
        top: 20px;
        left: 24px;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
    }
    .hor-nowData-content {
        padding: 32px 20px;
        box-sizing: border-box;
        .content-left-next {
            padding-top: 27px;
        }
    }
    .left {
        position: relative;
        height: 556px;
        width: 678px;
        .left-title-text {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
        .left-content {
            text-align: center;
            .left-content-first {
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                &.blue {
                    color: #2ec5f5;
                    padding-top: 12px;
                }
            }
            .left-content-next {
                padding-top: 12px;
                font-size: 46px;
                font-weight: 600;
                line-height: 64px;
                .next-num {
                    font-size: 48px;
                    font-weight: 700;
                    line-height: 58px;
                }
            }
        }
    }
    .right {
        position: relative;
        height: 556px;
        width: 1138px;
        .elect {
            position: absolute;
            left: 180px;
            top: 240px;
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            line-height: 34px;
            color: #ffffff;
        }
        .and {
            position: absolute;
            left: 353px;
            top: 263px;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
        }
        .common {
            position: absolute;
            left: 680px;
            font-size: 24px;
            font-weight: 500;
            line-height: 34px;
        }
        .num {
            font-family: Persagy;
            font-style: normal;
            font-weight: 700;
            line-height: 29px;
        }

        .carbon {
            top: 120px;
        }
        .CO2 {
            top: 260px;
        }
        .tree {
            top: 400px;
        }
    }
    .chart-box {
        margin-top: 24px;
    }
}
</style>


