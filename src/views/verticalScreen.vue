<template>
    <div>
        <div class="hor-nowData">
            <NowData screenType="ver" />
            <AirSwitchVer status="false" />
                <LastMonth screenType="ver" />
            <div>
                <AirSwitch />
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
import AirSwitchVer from './valueDelivery/AirSwitchVer.vue'
import FloorSpace from './valueDelivery/FloorSpace.vue'
export default {
    components: { NowData, AirSwitch, FloorSpace, LastMonth, AirSwitchVer },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.hor-nowData {
    width: 100%;
    background: #e5e5e5;
}
</style>


