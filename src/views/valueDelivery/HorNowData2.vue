<template>
    <div
        class="NowData"
        :class="[screenType==='hor' ? 'hor-nowData-contain' : '' ]"
    >
        <div class="nowData-title">
            <span class="hor-nowData-title-text">实时数据</span>
            <div class="normal-explain">
                <span class="content_level title-right-icon"></span>
                <span class="title-right">正常范围</span>
            </div>
        </div>
        <span :class="[screenType==='hor' ? 'hor-nowData-title-slogan' : '' ]">主动式空调，会呼吸的写字楼</span>

        <div
            class="contain"
            :class="[screenType==='hor' ? 'hor-contain' : 'vert-contain' ]"
        >
            <div
                class="item"
                v-for="(item, index) in horScreenImg"
                :key="index"
            >
                <div class="item_content">
                    <img
                        :class="[screenType==='hor' ? '' : 'vert' ]"
                        :src="item.img"
                        alt=""
                    >
                    <div class="content_value">
                        <span>{{item.value}}</span><span>{{item.unit}}</span>
                    </div>
                    <div class="content_name">
                        <span>{{item.name}}</span>
                    </div>
                    <div
                        class="content_level"
                        :class="item.level"
                    >
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
import icon_temp from '@/assets/icon_temp.png'
import icon_humidity from '@/assets/icon_humidity.png'
import icon_CO2 from '@/assets/icon_CO2.png'
import icon_formaldehyde from '@/assets/icon_formaldehyde.png'
import icon_PM2d5 from '@/assets/icon_PM2d5.png'
export default {
    props: {
        screenType: {
            type: String,
            default: () => { return 'hor' } //hor 横屏  vert 竖屏
        }
    },
    data() {
        return {
            horScreenImg: [
                { id: 1, name: '温度', img:icon_temp, value: 24.5, unit: '℃', level: 'low' },
                { id: 2, name: '湿度', img: icon_humidity, value: 33, unit: '%', level: 'middle' },
                { id: 3, name: 'CO2', img:icon_CO2, value: 399, unit: 'ppm', level: 'low' },
                { id: 4, name: '甲醛', img: icon_formaldehyde, value: 0.03, unit: 'mg/m³', level: 'low' },
                { id: 5, name: 'PM2.5', img: icon_PM2d5, value: 6, unit: 'ug/m³', level: 'low' }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.NowData {
    &.hor-nowData-contain {
        height: 498px;
        width: 1508px;
        border-radius: 20px;
        background: #ffffff;
    }
    color: rgba(87, 82, 113, 1);
    .nowData-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 32px 0 32px;
    }
    .hor-nowData-title-text {
        font-family: PingFang SC;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 28px;
        letter-spacing: 0px;
        text-align: left;
    }
    .hor-nowData-title-slogan {
        padding: 4px 0 0px 32px;
    }
    .contain {
        display: flex;
        &.hor-contain {
            width: 1306px;
            height: 280px;
            margin-left: 101px;
            padding-top: 46px;
        }
        &.vert-contain {
        }
    }
    .item {
        width: calc(100% / 5);
        .item_content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            img {
                width: 150px;
                height: 150px;
                &.vert {
                    width: 130px;
                    height: 130px;
                }
            }

            .content_value {
                font-family: Persagy;
                font-size: 42px;
                font-weight: 700;
                line-height: 51px;
                color: rgba(59, 53, 88, 1);
            }
            .content_name {
                padding-top: 8px;
                font-family: PingFang SC;
                font-size: 24px;
                font-weight: 400;
                line-height: 34px;
            }
        }
    }
    .content_level {
        padding-top: 8px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(126, 216, 116, 1);
        &.middle {
            background: rgba(239, 214, 46, 1);
        }
        &.title-right-icon {
            display: inline-block;
            padding: 0;
            width: 12px;
            height: 12px;
        }
        &.title-right {
            height: 20px;
            width: 56px;
        }
    }
    .normal-explain {
        display: flex;
        align-items: center;
    }
}
</style>


