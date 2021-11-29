<template>
    <div class="horTwo">
        <div class="bg">
            <img
                :src="bgImg"
                alt=""
            >
        </div>
        <div class="container">
            <div class="hor-head">
                <pageHead />
            </div>
            <div>
                <HorFloorSpace />
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import Vue from "vue";
import pageHead from "./valueDelivery/pageHead.vue";
import HorFloorSpace from "./valueDelivery/HorFloorSpace2.vue";
declare function require(img: string): string;
const hor_big_bg = require("@/assets/horImg/hor_big_bg.png");

export default Vue.extend({
    components: { pageHead, HorFloorSpace },
    data() {
        return {
            bgImg: hor_big_bg
        };
    },
});
</script>
<style lang="less" scoped>
.horTwo {
    .hor-head {
        display: flex;
        justify-content: center;
    }
    .bg {
        position: absolute;
        z-index: -1;
    }
}
</style>


