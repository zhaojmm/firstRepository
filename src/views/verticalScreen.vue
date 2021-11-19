<template>
    <div class="verticalWrap">
        <NowData screenType="ver" />
        <AirSwitchVer />
        <TemChart screenType="ver" />
        <LastMonthData screenType="ver" />
        <div class="lastTotalEnergy verticalClass">
            <div class="head-title">
                <span>上月总能耗</span>
            </div>
            <div class="subhead-title">低能耗亲自然</div>
            <div class="bottomCont">
                <img src='@/assets/circleEnergy.png' />
                <div class="showData">
                    <div class="title">比基准能耗</div>
                    <div class="energySave">节能<span>50%</span></div>
                    <div class="totalEnergy">总能耗<span>25541</span>KWh</div>
                </div>
            </div>
        </div>
        <lastSaveEnergy screenType="ver" />
            <!-- <lastEnergyChart /> -->

            <FloorSpace />

    </div>
</template>
<script>
import NowData from './valueDelivery/NowData.vue'
import LastMonthData from './valueDelivery/LastMonthData.vue'
import AirSwitchVer from './valueDelivery/AirSwitchVer.vue'
import FloorSpace from './valueDelivery/FloorSpace.vue'
import TemChart from './valueDelivery/TemChart.vue'
import lastEnergyChart from './valueDelivery/lastEnergyChart.vue'
import lastSaveEnergy from './valueDelivery/lastSaveEnergy.vue'

export default {
    components: { NowData, FloorSpace, LastMonthData, AirSwitchVer, TemChart, lastEnergyChart, lastSaveEnergy },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
@import "/src/assets/css/common.less";
.verticalWrap {
    background: #f3fdff;
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


