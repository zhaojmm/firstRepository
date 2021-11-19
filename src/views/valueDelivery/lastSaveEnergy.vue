<template>
    <div
        class="lastSaveEnergy"
        :class="[screenType=='ver'?'verticalClass':'horizontalClass']"
    >
        <div class="head-title">
            <span>上月节约能耗</span>
        </div>
        <div class="bottomCont">
            <img src='@/assets/save_energy.png' />
            <div class="showData">
                <div class="leftsave">节约电<br /><span>2566</span>度</div>
                <div class="equalTo">相当于</div>
                <div class="saveCo2">减排<span>0.955</span>kg二氧化碳</div>
                <div class="saveCarbon">减排<span>0.225</span>kg碳</div>
                <div class="plantTree">为国家种<span>26</span>棵树</div>
            </div>
        </div>
    </div>
</template>
<script>
import air_close from '@/assets/horImg/air_close.png';
import air_open from '@/assets/horImg/air_open.png';
export default {
    name: "lastSaveEnergy",
    props: {
        screenType: {
            type: String,
            default: () => { return 'hor' } //hor 横屏  vert 竖屏
        }
    },
    data() {
        return {

        }
    },
}
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
                left: 12px;
                top: 160px;
                color: #fff;
                width: 210px;
                line-height: 34px;
                text-align: center;
                span {
                    font-size: 32px;
                }
            }
            .equalTo {
                position: absolute;
                left: 249px;
                top: 186px;
                font-size: 20px;
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


