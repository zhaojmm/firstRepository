<template>
    <div class="airSwitch horizontalClass">
        <div class="head-title">
            <span>空调实时开关</span>
        </div>
        <div class="air-status" v-bind:class="{ close: !status }">
            <span>{{ status ? "空调已开启" : "空调已关闭" }}</span>
        </div>
        <div class="air-bg">
            <img :src="[status ? img.openImg : img.closeImg]" />
        </div>
        <div class="air-rate">
            <span>空调开启率</span>
            <span class="air-rate-value">{{ value }}%</span>
        </div>
    </div>
</template>
<script>
import air_open from "@/assets/horImg/air_open.png";
import air_close from "@/assets/horImg/air_close.png";
import {mapState} from 'vuex';
export default {
    name: "AirSwitch",
    props: {
        status: {
            type: Boolean,
            default: () => {
                return false;
            }, // 默认开
        },
        value: {
            type: Number,
            default: () => {
                return 75;
            }, // 默认开
        },
    },
    computed: {
        ...mapState({
            airCondition: (state) => state.airCondition,
        }),
    },
    data() {
        return {
            img: {
                openImg: air_open,
                closeImg: air_close,
            },
        };
    },
};
</script>
<style lang="less" scoped>
.airSwitch {
    height: 388px;
    // width: 446px;
    .air-status {
        margin-top: 8px;
        height: 20px;
        width: 86px;
        border-radius: 4px;
        background: rgba(126, 216, 116, 1);
        // padding: 2px 8px;
        box-sizing: border-box;
        color: #ffffff;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        &.close {
            background: rgba(155, 152, 173, 1);
        }
    }
    .air-bg {
        padding-top: 36px;
        height: 250px;
        box-sizing: border-box;
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
