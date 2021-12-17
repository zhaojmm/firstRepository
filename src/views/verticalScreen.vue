<template>
    <div class="verticalWrap">
        <div class="pageHead">
            <pageHead />
        </div>
        <div v-show="nowPage == 1">
            <NowData screenType="ver" />
            <AirSwitchVer />
            <TemChart screenType="ver" :showPing="nowPage"/>
            <LastMonthData screenType="ver" />
        </div>
        <div v-show="nowPage == 2">
            <FloorSpace :showPing="nowPage" @donetowpage="doneTowPage" />
        </div>
        <div v-show="nowPage == 3">
            <div class="lastTotalEnergy verticalClass">
                <div class="head-title">
                    <span>上月总能耗</span>
                </div>
                <div class="subhead-title">低能耗亲自然</div>
                <div class="bottomCont">
                    <img src="@/assets/circleEnergy.png" />
                    <div class="showData">
                        <div class="title">比基准能耗</div>
                        <div class="energySave">
                            节能<span>{{ lastAllEnergy.energyCompare }}%</span>
                        </div>
                        <div class="totalEnergy">
                            总能耗<span>{{ lastAllEnergy.energyTotal }}</span
                            >KWh
                        </div>
                    </div>
                </div>
            </div>
            <lastSaveEnergy screenType="ver" />
            <lastEnergyChart
                screenType="ver"
                :showPing="nowPage"
                @donethreepage="doneThreePage"
            />
        </div>
    </div>
</template>
<script>
import NowData from "./valueDelivery/NowData.vue";
import LastMonthData from "./valueDelivery/LastMonthData.vue";
import AirSwitchVer from "./valueDelivery/AirSwitchVer.vue";
import FloorSpace from "./valueDelivery/FloorSpace.vue";
import TemChart from "./valueDelivery/TemChart.vue";
import lastEnergyChart from "./valueDelivery/lastEnergyChart.vue";
import lastSaveEnergy from "./valueDelivery/lastSaveEnergy.vue";
import pageHead from "./valueDelivery/pageHead.vue";
import { mapState } from "vuex";
export default {
    components: {
        NowData,
        FloorSpace,
        LastMonthData,
        AirSwitchVer,
        TemChart,
        lastEnergyChart,
        lastSaveEnergy,
        pageHead,
    },
    data() {
        return {
            nowPage: null,
            verticalInterval: null,
        };
    },
    mounted() {
        this.nowPage = 1;
        this.timePageShow();
    },
    destroyed() {
        clearInterval(this.verticalInterval);
    },
    computed: {
        ...mapState({
            lastAllEnergy: (state) => {
                // debugger;
                var lastAllEnergy = JSON.parse(
                    JSON.stringify(state.lastAllEnergy)
                );

                lastAllEnergy.energyCompare = Number(
                    (lastAllEnergy.energyCompare * 100).toFixed(0)
                );
                return lastAllEnergy;
            },
        }),
    },
    methods: {
        doneThreePage() {
            //第三屏刷新结束 通知
            this.nowPage = 1;
            this.timePageShow(); //1屏变2屏
        },
        doneTowPage() {
            //第二屏刷新结束 通知
            this.nowPage = 3;
        },
        timePageShow() {
            var timeoutsign = setTimeout(() => {
                this.nowPage = this.nowPage + 1;
                if (this.nowPage == 4) {
                    this.nowPage = 1;
                }
            }, 6000);
        },
    },
};
</script>
<style lang="less" scoped>
@import "/src/assets/css/common.less";
.verticalWrap {
    background: #f3fdff;
    padding: 50px 40px 100px;
}
.pageHead {
    padding-bottom: 50px;
}
.lastTotalEnergy {
    height: 535px;
    .bottomCont {
        width: 580px;
        margin: 4px auto;
        position: relative;
        img {
            width: 100%;
        }
        .showData {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .title {
                font-size: 28px;
                color: #575271;
            }
            .energySave {
                margin-top: 14px;
                font-size: 56px;
                span {
                    font-size: 60px;
                }
            }
            .totalEnergy {
                margin-top: 18px;
                color: #2ec5f5;
                font-size: 28px;
            }
        }
    }
}
</style>
