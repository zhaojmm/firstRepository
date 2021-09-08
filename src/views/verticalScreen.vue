<template>
    <div>
        <div class="hor-nowData">
            <NowData screenType="ver" />
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
import NowData from './valueDelivery/NowData.vue'
import LastMonth from './valueDelivery/LastMonthData.vue'
import AirSwitch from './valueDelivery/AirSwitch.vue'
import FloorSpace from './valueDelivery/FloorSpace.vue'
export default {
    components: { NowData, AirSwitch, FloorSpace, LastMonth },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.hor-nowData {
    width:100%;
    background: #e5e5e5;
}
</style>


