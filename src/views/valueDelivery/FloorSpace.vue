<template>
    <div>
        <div class="topChange">
            <div class="allIndicator">
                <div
                    class="eachItem"
                    v-for="item in allIndicator"
                    @click="clickIndicator(item)"
                    v-bind:class="{ select: item.id == selIndicator.id }"
                >
                    <span>{{ item.name }}</span
                    ><span class="bar"></span>
                </div>
            </div>
            <div class="imageDiv">
                <img :src="selIndicator.img" />
            </div>
            <div class="textCont">
                平均<span>{{ selIndicator.name }}</span
                ><span class="value">234</span
                ><span>
                    {{ selIndicator.unit }}
                </span>
            </div>
        </div>

        <div class="floorWrap">
            <div
                class="floor-item"
                v-for="(item, index) in floorData"
                :key="index"
            >
                <div class="floor-num">
                    <span>{{ item.floorName }}</span>
                </div>
                <div class="floor-space">
                    <div
                        class="space-box"
                        v-for="(childItem, id) in item.data"
                        :key="id"
                    >
                        <div class="space-name">{{ childItem.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
    name: "FloorSpace",
    data() {
        return {
            selIndicator: {},
            allIndicator: [
                {
                    id: "temp",
                    name: "温度",
                    img: require("../../assets/verwendu.png"),
                    unit: "℃",
                },
                {
                    id: "humidity",
                    name: "湿度",
                    img: require("../../assets/vershidu.png"),
                    unit: "%",
                },
                {
                    id: "co2",
                    name: "CO₂",
                    img: require("../../assets/verco2.png"),
                    unit: "ppm",
                },
                {
                    id: "methanal",
                    name: "甲醛",
                    img: require("../../assets/verjiaquan.png"),
                    unit: "mg/m³",
                },
                {
                    id: "pm25",
                    name: "PM2.5",
                    img: require("../../assets/verpm25.png"),
                    unit: "ug/m³",
                },
            ],
            floorData: [
                {
                    floorName: "8F",
                    data: [
                        { id: 1, name: "空间1" },
                        { id: 2, name: "空间2" },
                        { id: 3, name: "空间3" },
                        { id: 1, name: "空间4" },
                        { id: 2, name: "空间5" },
                        { id: 3, name: "空间6" },
                        { id: 1, name: "空间1" },
                        { id: 2, name: "空间2" },
                        { id: 3, name: "空间3" },
                        { id: 1, name: "空间4" },
                        { id: 2, name: "空间5" },
                        { id: 3, name: "空间6" },
                    ],
                },
                {
                    floorName: "7F",
                    data: [
                        { id: 1, name: "空间1" },
                        { id: 2, name: "空间2" },
                        { id: 3, name: "空间3" },
                    ],
                },
            ],
            firstPageParams: [],
            secondPageParams: [],
            nowPage: 1, //当前哪一屏幕
        };
    },
    mounted() {
        this.selIndicator = this.allIndicator[0];
        this.queryFs();
    },
    methods: {
        clickIndicator(item) {
            this.selIndicator = item;
        },
        queryFs() {
            //let loadingInstance = Loading.service({ fullscreen: true });
            var loading = this.$loading({ fullscreen: true });
            this.$axios
                .post(this.$api.queryFs, {
                    criteria: {
                        projectId: "Pj1101020002",
                    },
                    size: 14,
                    page: 1,
                    orders: [
                        {
                            column: "floorSequenceId",
                            asc: true,
                        },
                    ],
                })
                .then((res) => {
                    // loadingInstance.close();
                    loading.close();
                    console.log("queryFs", res);
                    var allFloor = res.data.content || [];
                    var allFloorNum = allFloor.length;
                    //如果超过7层 就显示两屏幕 第一屏 firstPageNum
                    //如果超过7层 就显示两屏幕 第二屏 secondPageNum
                    var firstPageNum, secondPageNum;
                    if (allFloorNum <= 7) {
                        firstPageNum = allFloorNum;
                        secondPageNum = 0;
                    } else {
                        firstPageNum = Math.ceil(allFloorNum / 2);
                        secondPageNum = Math.floor(allFloorNum / 2);
                    }

                    //this.nowPage = 1; //取第一屏

                    var firstMaxSpace = this.floorHandle(firstPageNum); //第一屏 一层最多空间
                    var sendMaxSpace = this.floorHandle(secondPageNum);
                    var firstPageFloors = allFloor.slice(0, firstPageNum); //第一屏 所有楼层
                    var secondPageFloors = allFloor.slice(firstPageNum);

                    this.firstPageParams = firstPageFloors.map((item) => {
                        var obj = {};
                        obj.id = item.id;
                        obj.projectId = "Pj1101020002";
                        obj.spaceNum = firstMaxSpace;
                        return obj;
                    });

                    this.secondPageParams = secondPageFloors.map((item) => {
                        var obj = {};
                        obj.id = item.id;
                        obj.projectId = "Pj1101020002";
                        obj.spaceNum = sendMaxSpace;
                        return obj;
                    });
                    this.queryParam(this.firstPageParams);
                });
        },

        queryParam(param) {
            var loading = this.$loading({ fullscreen: true });
            this.$axios.post(this.$api.queryParam, param).then((res) => {
                loading.close();
                debugger;
            });
        },
        floorHandle(floorNum) {//返回一层 最多多少房间
            var maxFloorSpace = 0; //一层 最多显示房间数
            switch (floorNum) {
                case 1:
                    maxFloorSpace = 160;
                    break;
                case 2:
                    maxFloorSpace = 80;
                    break;
                case 3:
                    maxFloorSpace = 50;
                    break;
                case 4:
                    maxFloorSpace = 30;
                    break;
                case 5:
                case 6:
                case 7:
                    maxFloorSpace = 20;
                    break;
            }
            return maxFloorSpace;
        },
        spaceHandle(spaceNum) {//返回一层 的每一行 几个房间
            var lineNum = spaceNum; //一行的房间数
            var floorline = Math.ceil(spaceNum / 10); //20-30 3排 30-40个 4排 所以一排10个
            lineNum = Math.ceil(spaceNum / floorline);
        },
    },
};
</script>
<style lang="less" scoped>
.topChange {
    height: 194px;
    // width: 1000px;
    margin: 0 auto;
    background: #ffffff;
    .allIndicator {
        padding-top: 32px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .eachItem {
            cursor: pointer;
            font-size: 24px;
            color: #9b98ad;
            margin-right: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .bar {
                width: 24px;
                height: 6px;
                display: inline-block;
            }
            &.select {
                color: #3b3558;
                .bar {
                    background: #46ccf6;
                }
            }
        }
    }
    .imageDiv {
        height: 32px;
        margin: 0 32px;
    }
    .textCont {
        color: #3b3558;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        padding-top: 16px;
        .value {
            margin-left: 4px;
        }
    }
}

.floorWrap {
    // width: 1000px;
    margin: 0 auto;
    background: #ffffff;
    .floor-item {
        display: flex;
        padding: 18px 0;
        box-sizing: border-box;
        background: linear-gradient(
            161.44deg,
            rgba(50, 129, 246, 0.1) 6.16%,
            rgba(50, 129, 246, 0) 81.03%
        );
    }

    .floor-num {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Persagy;
        font-size: 36px;
        font-weight: 700;
        line-height: 43px;
        color: #3b3558;
        width: 80px;
        flex-shrink: 0;
    }
    .floor-space {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        .space-box {
            padding: 4px;
            .space-name {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 86px;
                width: 90px;
                border-radius: 8px;
                background: #d9f5d6;
            }
        }
    }
}
</style>
