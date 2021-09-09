<template>
    <div class="airSwitch">
        <div class="air-title head-title">
            <span>空调实时开关</span>
            <span class="status">{{status ? "空调已开启" : "空调已关闭"}}</span>
        </div>
        <div class="air-cont">
            <div class="air-left">
                <div class="bar-box">
                    <div class="bar"></div>
                </div>
                <div class="air-rate">
                    <span>空调开启率</span>
                    <span class="air-rate-value">{{value}}%</span>
                </div>
            </div>
            <div class="air-bg">
                <img :src="[status ? img.openImg : img.closeImg]" />
            </div>
        </div>
    </div>
</template>
<script>
import air_close from '@/assets/horImg/air_close.png';
import air_open from '@/assets/horImg/air_open.png';
export default {
    name: "AirSwitch",
    props: {
        status: {
            type: Boolean,
            default: () => { return false } // 默认开
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
@import "/src/assets/css/common.less";
.airSwitch {
    padding: 24px 32px;
    height: 250px;
    width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 20px;
    border: 2px solid #ffffff;
    background: #ffffff;
    .air-title {
        .status {
            margin-top: 8px;
            margin-left: 12px;
            display: inline-block;
            height: 24px;
            line-height: 24px;
            width: 86px;
            border-radius: 4px;
            background: rgba(126, 216, 116, 1);
            box-sizing: border-box;
            color: #ffffff;
            font-weight: 600;
            text-align: center;
            font-size: 14px;
            &.close {
                background: rgba(155, 152, 173, 1);
            }
        }
    }
    .air-cont {
        display: flex;
        flex-direction: row;
        .air-left {
            flex: 3;
            display: flex;
            justify-content: center;
            flex-direction: column;
            .bar-box {
                width: 88%;
                height: 10px;
                background: rgba(62, 140, 255, 0.2);
                border-radius: 6px;
                .bar {
                    width: 80%;
                    height: 10px;
                    background: linear-gradient(
                        90deg,
                        #76deff 0%,
                        #3e91f8 100%
                    );
                    border-radius: 6px;
                }
            }
            .air-rate {
                font-size: 20px;
                display: flex;
                height: 40px;
                align-items: center;
                margin-top:14px;
                .air-rate-value {
                    font-size: 32px;
                    padding-left:8px;
                }
            }
        }
        .air-bg {
            flex: 1;
            img {
                width: 240px;
            }
        }
    }
}
</style>


