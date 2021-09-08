<template>
    <div class="lastTotalEnergy verticalClass">
        <div class="head-title">
            <span>上月总能耗</span>
        </div>
        <div class="subhead-title">低能耗亲自然</div>
        <div class="bottomCont"></div>
    </div>
</template>
<script>
import air_close from '@/assets/horImg/air_close.png';
import air_open from '@/assets/horImg/air_open.png';
export default {
    name: "lastTotalEnergy",
    props: {
        value: {
            type: Number,
            default: () => { return 75 } // 默认开
        },

    },
    data() {
        return {

        }
    },
}
</script>
<style lang="less" scoped>
@import "/src/assets/css/common.less";
.lastTotalEnergy {
    height: 535px;
    .bottomCont {
        height: 383px;
        width: 660px;
    }
}
</style>


