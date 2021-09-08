<template>
    <div class="valueDelivery">
        <div class="bg">
            <img
                :src="bgImg"
                alt=""
            >
        </div>

        <div class="hor-nowData">
            <div class="hor-head">
                <HorHead />
            </div>
            <div>
                <NowData screenType="hor" />
            </div>
            <div>
                <LastMonth screenType="hor" />
            </div>
            <div>
                <AirSwitch screenType="hor" />
            </div>
            <div>
                <FloorSpace />
            </div>
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
    .bg {
        position: absolute;
        z-index: -1;
    }
    .hor-head {
        padding-top: 32px;
        display: flex;
        justify-content: center;
    }
}
</style>



