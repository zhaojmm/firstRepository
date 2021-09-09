<template>
    <div class="airSwitch">
        <div class="air-title">
            <span>空调实时开关</span>
        </div>
        <div class="air-status">
            <span>{{status ? "空调已开启" : "空调已关闭"}}</span>
        </div>
        <div class="air-bg">
            <img :src="[status ? img.openImg : img.closeImg]" />
        </div>
        <div class="air-rate">
            <span>空调开启率</span>
            <span class="air-rate-value">{{value}}%</span>
        </div>
    </div>
</template>
<script>
import  air_open from '@/assets/horImg/air_open.png';
import air_close from '@/assets/horImg/air_close.png';
export default {
    name: "AirSwitch",
    props: {
        status: {
            type: Boolean,
            default: () => { return true } // 默认开
        },
        value: {
            type: Number,
            default: () => { return 75 } // 默认开
        },

    },
    data() {
        return {
            img: {
                openImg: air_open,
                closeImg: air_close,
            }
        }
    },
}
</script>
<style lang="less" scoped>
.airSwitch {
    padding: 24px 32px;
    height: 388px;
    width: 448px;
    border-radius: 20px;
    border: 2px solid #ffffff;
    background: #ffffffcc;
    .air-title {
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: #3b3558;
    }
    .air-status {
        margin-top: 8px;
        height: 24px;
        width: 86px;
        border-radius: 4px;
        padding: 2px, 8px, 2px, 8px;
        background: rgba(126, 216, 116, 1);
        padding: 2px 8px;
        box-sizing: border-box;
        color: #ffffff;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
        &.close {
            background: rgba(155, 152, 173, 1);
        }
    }
    .air-bg {
        padding-top: 36px;
        padding-bottom: 54px;
        text-align: center;
    }
    .air-rate {
        font-weight: 400;
        line-height: 20px;
        color: #575271;
        .air-rate-value {
            color: #3b3558;
            font-family: Persagy;
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
        }
    }
}
</style>


