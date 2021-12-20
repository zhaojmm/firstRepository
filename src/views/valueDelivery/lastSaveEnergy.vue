<template>
    <div
        class="lastSaveEnergy"
        :class="[screenType == 'ver' ? 'verticalClass' : 'horizontalClass']"
    >
        <div class="head-title">
            <span>上月节约能耗</span>
        </div>
        <div class="bottomCont">
            <img src="@/assets/save_energy.png" />
            <div class="showData">
                <div class="leftsave">
                    <div class="firstline">节约电</div>
                    <div class="secondline">
                        <span class="value">{{ lastAllEnergy.energySaving }}</span
                        ><span class="unit">度</span>
                    </div>
                </div>
                <div class="equalTo">相当于</div>
                <div class="rightCont">
                    <div class="saveCo2">
                        减排<span>{{ lastAllEnergy.cdmCo2 }}</span
                        >kg二氧化碳
                    </div>
                    <div class="saveCarbon">
                        减排<span>{{ lastAllEnergy.cdmC }}</span
                        >kg碳
                    </div>
                    <div class="plantTree">
                        为国家种<span>{{ lastAllEnergy.cdmTree }}</span
                        >棵树
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import air_close from "@/assets/horImg/air_close.png";
import air_open from "@/assets/horImg/air_open.png";
import { mapState } from "vuex";
export default {
    name: "lastSaveEnergy",
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
    computed: {
        ...mapState({
            lastAllEnergy: (state) => state.lastAllEnergy,
        }),
    },
};
</script>
<style lang="less" scoped>
.lastSaveEnergy {
    &.verticalClass {
        height: 535px;
    }
    &.horizontalClass {
        height: 100%;
    }
    .bottomCont {
        max-width: 900px;
        margin: 40px auto;
        position: relative;
        img {
            width: 100%;
        }
        .showData {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-sizing: border-box;
            // display: flex;
            // // align-items: center;
            // // justify-content: center;
            // flex-direction: row;
            .leftsave {
                // position: absolute;
                // left: 12px;
                // top: 160px;
                color: #fff;
                width: 26%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                float: left;
                flex-direction: column;
                font-size:24px;
                // width: 210px;
                // line-height: 34px;
                // text-align: center;
                .value {
                    font-size: 32px;
                }
            }
            .equalTo {
                // position: absolute;
                // left: 249px;
                // top: 186px;
                float: left;
                font-size: 20px;
                width: 12%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
            }
            .rightCont {
                position: relative;
                width: 38%;
                height: 100%;
                float: right;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .saveCo2 {
                    // position: absolute;
                    // left: 562px;
                    // top: 32px;
                    height: 22%;
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    // justify-content: center;
                }
                .saveCarbon {
                    // position: absolute;
                    // left: 562px;
                    // top: 186px;
                    height: 30%;
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    //justify-content: center;
                }
                .plantTree {
                    // position: absolute;
                    // left: 562px;
                    // top: 340px;
                    height: 25%;
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    //  justify-content: center;
                }
            }
        }
    }
}
</style>
