<template>
    <div class="horizontalScreen">
        <div class="bg">
            <img :src="bgImg">
        </div>
        <div class="container">
            <div class="hor-head">
                <pageHead />
            </div>
            <div class="hor-nowData-content firstScreen flexBetween">
                <div class="content-left">
                    <NowData screenType="hor" />
                    <div class="content-left-cont flexBetween">
                        <div class="bottom-left">
                            <HorAirSwitch />
                        </div>
                        <div class="bottom-right">
                            <TemChart screenType="hor" />
                        </div>

                    </div>
                </div>
                <div class="content-right">
                    <LastMonth screenType="hor" />
                </div>
            </div>
            <div class="hor-nowData-content secondScreen">
                <div class="flexBetween">
                    <div class="left horizontalClass">
                        <div class="head-title">
                            <span>上月总能耗</span>
                        </div>
                        <div class="subhead-title">低能耗亲自然</div>
                        <div class="left-content">
                            <div class="left-bg lastbg">
                                <img :src="lastMonthTotal" />
                            </div>
                            <div class="left-text">
                                <div class="left-content-first">比基准能耗</div>
                                <div class="left-content-next">
                                    节能<span class="next-num">50%</span>
                                </div>
                                <div class="left-content-first blue">总能耗28050KWh</div>
                            </div>

                        </div>
                    </div>
                    <div class="right ">
                        <lastSaveEnergy screenType="hor" />
                    </div>
                </div>
                <div class="chart-box ">
                    <lastEnergyChart screenType="hor" />
                </div>
            </div>
            <div class="hor-nowData-content">
                <horFloorSpace />
            </div>
        </div>

    </div>
</template>
<script>
import hor_big_bg from '@/assets/horImg/hor_big_bg.png';
import pageHead from './valueDelivery/pageHead.vue'
import NowData from './valueDelivery/NowData.vue'
import LastMonth from './valueDelivery/LastMonthData.vue'
import HorAirSwitch from './valueDelivery/HorAirSwitch.vue'
import lastSaveEnergy from './valueDelivery/lastSaveEnergy.vue'
import TemChart from './valueDelivery/TemChart.vue'
import lastEnergyChart from './valueDelivery/lastEnergyChart.vue'
import horFloorSpace from './valueDelivery/horFloorSpace.vue'

export default {
    components: { pageHead, NowData, HorAirSwitch, LastMonth, lastSaveEnergy, TemChart, lastEnergyChart, horFloorSpace },
    data() {
        return {
            bgImg: hor_big_bg,
            lastMonthTotal: require("@/assets/horImg/hor_lastMonthTotal.png")

        }
    }
}
</script>
<style lang="less" scoped>
.horizontalScreen {
    padding: 30px 40px;
    scrollbar-width: none;
    .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .hor-head {
        // padding-top: 32px;
        // display: flex;
        // justify-content: center;
    }
    .hor-nowData-content {
        // padding: 30px 36px;
        box-sizing: border-box;
    }
    .firstScreen {
        height: 910px;
        .content-left {
            width: calc(100% - 328px);
        }
        .content-right {
            width: 308px;
        }
        .content-left-cont {
            padding-top: 27px;
            .bottom-left {
                width: 446px;
            }
            .bottom-right {
                width: calc(100% - 466px);
            }
        }
    }
    .flexBetween {
        display: flex;
        justify-content: space-between;
    }
}
.secondScreen {
    .left {
        position: relative;
        height: 556px;
        width: 678px;
        .left-content {
            text-align: center;
            height: 390px;
            width: 100%;
            margin-top: 20px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .lastbg {
                position: absolute;
            }
            .left-text {
                // width: 100%;
                // height: 100%;
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
    }
    .right {
        position: relative;
        height: 556px;
        width: calc(100% - 698px);
    }
    .chart-box {
        margin-top: 24px;
        // width: 1840px;
        height: 330px;
    }
}
</style>



