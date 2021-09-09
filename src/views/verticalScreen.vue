<template>
    <div class="verticalWrap">
        <NowData screenType="ver" />
        <AirSwitchVer />
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
        <div class="lastSaveEnergy verticalClass">
            <div class="head-title">
                <span>上月节约能耗</span>
            </div>
            <div class="bottomCont">
                <img src='@/assets/save_energy.png' />
                <div class="showData">
                    <div class="leftsave">节约电<br/><span>2566</span>度</div>
                    <div class="saveCo2">减排<span>0.955</span>kg二氧化碳</div>
                    <div class="saveCarbon">减排<span>0.225</span>kg碳</div>
                    <div class="plantTree">为国家种<span>26</span>棵树</div>
                </div>
            </div>
        </div>
        <div>
            <FloorSpace />
        </div>
    </div>
</template>
<script>
import NowData from './valueDelivery/NowData.vue'
import LastMonthData from './valueDelivery/LastMonthData.vue'
import AirSwitch from './valueDelivery/AirSwitch.vue'
import AirSwitchVer from './valueDelivery/AirSwitchVer.vue'
import FloorSpace from './valueDelivery/FloorSpace.vue'


export default {
    components: { NowData, AirSwitch, FloorSpace, LastMonthData, AirSwitchVer },
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
.lastSaveEnergy {
    height: 535px;
    .bottomCont {
        width: 900px;
        margin: 40px auto;
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
            // display: flex;
            // align-items: center;
            // justify-content: center;
            // flex-direction: column;
            .leftsave {
                position: absolute;
                left: 60px;
                top: 160px;
                color:#fff;
                line-height: 34px;
                span{
                    font-size:32px;
                }
            }
            .saveCo2 {
                position: absolute;
                left: 562px;
                top: 32px;
                
            }
            .saveCarbon {
                position: absolute;
                left: 562px;
                top: 186px;
            }
            .plantTree {
                position: absolute;
                left: 562px;
                top: 340px;
            }
        }
    }
}
</style>


