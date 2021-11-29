<template>
    <div class="horHead horSty">
        <div class="horHead-left">
            <img
                :src="logo"
                alt=""
            >
        </div>
        <div class="horHead-content">
            <img :src="title" />
        </div>
        <div class="horHead-right">
            <div class="right-item">
                <span class="item-time"> 2021.07.26 11:00</span>

            </div>
            <div class="right-item">
                晴
            </div>
            <div
                class="right-item"
                style="display:none"
            >
                <img
                    class="firstImg"
                    :src="changeVer"
                    alt=""
                >
                <img
                    :src="shrink"
                    alt=""
                >
            </div>
            <div
                class="right-item"
                style="display:none"
            >
                退出
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

declare function require(img: string): string;

const persagyLogo = require("@/assets/horImg/persagyLogo.png");
const title = require("@/assets/horImg/hor_title.png");
const changeVer = require("@/assets/horImg/changeVer.png");
const shrink = require("@/assets/horImg/shrink.png");
export default Vue.extend({
    data() {
        return {
            logo: persagyLogo,
            title: title,
            changeVer: changeVer,
            shrink: shrink,
        };
    },
});
</script>

<style lang="less" scoped>
.horHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.horSty {
        height: 74px;
        // width: 1840px;
    }
    .horHead-right {
        display: flex;
        // justify-content: space-between;
        height: 46px;
        // width: 396px;
        .right-item {
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 12px 16px;
            font-size: 16px;
            color: #575271;
            font-weight: 400;
            line-height: 22px;
            margin-left: 10px;
            background: #ffffff99;
            border: 2px solid #ffffffcc;
            box-sizing: border-box;
            border-radius: 8px;
            .firstImg {
                margin-right: 6px;
            }
            .item-time {
                font-family: Persagy;
                font-weight: 400;
            }
        }
    }
}
</style>

