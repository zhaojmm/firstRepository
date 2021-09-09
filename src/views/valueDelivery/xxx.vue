<template>

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

</style>


