<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {};
    },
    created() {
        this.getAirCondition();//空调数据
        this.getLastAllEnergy();
    },
    components: {},
    methods: {
        ...mapActions(["getAirCondition","getLastAllEnergy"]),
    },
};
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f3fdff;
    //   text-align: center;
    //   color: #2c3e50;
    //   margin-top: 60px;
}
@import "/src/assets/css/common.less";
</style>
