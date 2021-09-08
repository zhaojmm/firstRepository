<template>
    <div>
        <div class="hor-nowData">
            <NowData screenType="ver" />
            <AirSwitchVer  />
            <LastMonth screenType="ver" />
            <lastTotalEnergy></lastTotalEnergy>
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
import lastTotalEnergy from './valueDelivery/lastTotalEnergy.vue'

export default {
    components: { NowData, AirSwitch, FloorSpace, LastMonth, AirSwitchVer ,lastTotalEnergy},
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


