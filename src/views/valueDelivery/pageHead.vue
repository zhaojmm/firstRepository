<template>
    <div class="horHead horSty">
        <div class="horHead-content">
            <!-- <img :src="title" /> 北京中海OFFICEZIP -->
            <!-- <div class="firtitle">之江实验室一期西区</div> -->
            <div class="firtitle">北京中海OFFICEZIP</div>
            <div class="sectitle">懂空间,更懂办公</div>
        </div>
        <div></div>
        <div class="horHead-left">
            <img :src="logo" alt="" style="height:60px;" />
        </div>
        <div class="horHead-right">
            <div class="right-item">
                <span class="item-time">{{ nowstr }}</span>
            </div>
            <div class="right-item">
                {{ weatherText }}
            </div>
            <div class="right-item" @click="changeScreen">
                <img
                    class="firstImg"
                    :src="nowScreen == 'vertical' ? changeHor : changeVer"
                    alt=""
                />
            </div>
            <div class="right-item" style="display:none">
                退出
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

declare function require(img: string): string;

const persagyLogo = require("@/assets/horImg/persagyLogo.svg");
const zhijiangLogo = require("@/assets/horImg/zhijianglogo.png");

const title = require("@/assets/horImg/hor_title.png");
const changeVer = require("@/assets/horImg/changeVer.svg");
const changeHor = require("@/assets/horImg/changeHor.svg");
import { mapState } from "vuex";
import moment from "moment";
export default Vue.extend({
    data() {
        return {
            //logo: zhijiangLogo,
            logo:persagyLogo,
            title: title,
            changeVer: changeVer,
            changeHor: changeHor,
            nowScreen: "vertical",
            nowstr: "",
            // weatherText:''
        };
    },
    mounted() {
        // console.log("route", this.$route);
        // console.log("router", this.$router);
        var path = this.$route.path;
        if (path.indexOf("horizontalScreen") > -1) {
            this.nowScreen = "horizontal";
        } else if (path.indexOf("verticalScreen") > -1) {
            this.nowScreen = "vertical";
        }
        this.nowstr = moment().format("YYYY.MM.DD HH:mm");
        setInterval(() => {
            this.nowstr = moment().format("YYYY.MM.DD HH:mm");
        }, 5000);
    },
    computed: {
        ...mapState({
            weatherText(state: any) {
                //debugger;
                var text = state.weatherCont.text || "晴";
                return text;
            },
        }),
    },
    methods: {
        changeScreen() {
            if (this.nowScreen == "vertical") {
                this.nowScreen = "horizontal";
                this.$router.push({ name: "horizontalScreen" });
            } else {
                this.nowScreen = "vertical";
                this.$router.push({ name: "verticalScreen" });
            }
        },
    },
});
</script>

<style lang="less" scoped>
.horHead {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    position: relative;
    &.horSty {
        height: 74px;
        // width: 1840px;
    }
    .horHead-content {
        width: 100%;
        height: 100%;
        color: #3b3558;
        text-align: center;
        .firtitle {
            font-weight: 700;
            font-size: 38px;
            font-family: Alibaba PuHuiTi;
        }
        .sectitle {
            font-weight: 500;
            font-size: 16px;
            letter-spacing: 8px;
        }
    }
    .horHead-left {
        position: absolute;
        top: 0;
        left: 0;
    }
    .horHead-right {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        // justify-content: space-between;
        height: 46px;
        // width: 396px;
        .right-item {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            padding: 12px 16px;
            font-size: 16px;
            color: #575271;
            font-weight: 400;
            line-height: 22px;
            margin-left: 10px;
            background: #ffffff99;
            border: 2px solid #ffffffcc;
            box-sizing: border-box;
            border-radius: 8px;
            .firstImg {
                margin-right: 6px;
            }
            .item-time {
                font-family: Persagy;
                font-weight: 400;
            }
        }
    }
}
</style>
