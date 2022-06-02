<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {};
    },
    created() {
        //对于两个组件的 接口写在了这里
        setInterval(() => {
            this.getAirCondition(); //空调数据
        }, 60000);
        this.getAirCondition(); //空调数据
        this.getLastAllEnergy(); //上月所有能耗数据  上月总能耗 上月节约能耗
        this.getWeahter(); //获取天气
        this.getProjectData()
        window.onresize = () => {
            console.log("resize");
            this.setBodyWidth(
                document.getElementsByTagName("body")[0].offsetWidth
            );
            this.setBodyHeight(
                document.getElementsByTagName("body")[0].offsetHeight
            );

      
        };
    },
    destroyed() {
        console.log("app---destroyed");
    },
    components: {},
    methods: {
        ...mapMutations(["setBodyWidth", "setBodyHeight"]),
        ...mapActions(["getAirCondition", "getLastAllEnergy", "getWeahter",'getProjectData']),
    },
};
</script>

<style lang="less">
html {
    height: 100%;
}
body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    // background: #f3fdff;
    //   text-align: center;
    //   color: #2c3e50;
    //   margin-top: 60px;
}
@import "/src/assets/css/common.less";
</style>
