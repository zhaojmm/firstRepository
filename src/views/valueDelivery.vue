<template>
    <div class="valueDelivery">
        <div class="bg">
            <img
                :src="bgImg"
                alt=""
            >
        </div>

        <div class="container">
            <div class="hor-head">
                <HorHead />
            </div>

            <div class="hor-nowData-content flexBetween">
                <div class="content-left">
                    <div>
                        <NowData screenType="hor" />
                    </div>
                    <div class="content-left-next flexBetween">
                        <div>
                            <AirSwitch screenType="hor" />
                        </div>
                        <div>
                            <span>chart图</span>
                        </div>
                    </div>

                </div>
                <div class="content-right">
                    <div>
                        <LastMonth screenType="hor" />
                    </div>
                </div>
            </div>

            <!-- <div>
                <FloorSpace />
            </div> -->
        </div>

    </div>
</template>
<script>
import hor_big_bg from '@/assets/horImg/hor_big_bg.png';
import HorHead from './valueDelivery/HorHead.vue'
import NowData from './valueDelivery/NowData.vue'
import LastMonth from './valueDelivery/LastMonthData.vue'
import AirSwitch from './valueDelivery/AirSwitch.vue'
import FloorSpace from './valueDelivery/FloorSpace.vue'
export default {
    components: { HorHead, NowData, AirSwitch, FloorSpace, LastMonth },
    data() {
        return {
            bgImg: hor_big_bg
        }
    }
}
</script>
<style lang="less" scoped>
.valueDelivery {
    scrollbar-width: none;
    .bg {
        position: absolute;
        z-index: -1;
    }
    .hor-head {
        // padding-top: 32px;
        display: flex;
        justify-content: center;
    }
    .hor-nowData-content {
        padding: 32px 20px;
        box-sizing: border-box;
        .content-left-next {
            padding-top: 27px;
        }
    }

    .flexBetween {
        display: flex;
        justify-content: space-between;
    }
}
</style>



