<template>
    <div class="floorCont">
        <div class="topChange">
            <div class="buildName" v-show="allBuild.length>1">{{ nowBuildName }}</div>
            <div class="allIndicator">
                <div
                    class="eachItem"
                    v-for="(item, index) in allIndicator"
                    @click="clickIndicator(index)"
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
                ><span class="value">{{ totalAvgValues }}</span
                ><span>
                    {{ selIndicator.unit }}
                </span>
            </div>
        </div>

        <div class="floorWrap">
            <div
                class="floor-item"
                v-for="(item, index) in showFloors"
                :key="index"
                v-bind:style="{ height: item.floorHeight + 'px' }"
            >
                <div class="floor-num">
                    <span>{{ item.localName }}</span>
                </div>
                <div class="floor-space">
                    <div
                        class="space-box"
                        v-for="(childItem, id) in item.dataSpaces"
                        :key="id"
                        v-bind:style="{
                            width: item.spacewidth + '%',
                            height: item.spaceheight + '%',
                        }"
                    >
                        <div
                            class="space-name"
                            v-bind:style="{
                                backgroundColor: selectColor(
                                    childItem.avgValues,
                                    selIndicatorId,
                                    true
                                ),
                            }"
                        >
                            {{ childItem.localName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Loading } from "element-ui";
import moment from "moment";
import { selectColor } from "@/utils/publicMethod";
import { mapState } from "vuex";

export default {
    name: "FloorSpace",
    data() {
        return {
            selIndicator: {},
            selIndicatorId: "", //为了颜色
            nowIndicatorIndex: null, //现在选中的指标 index
            allIndicator: [
                {
                    id: "temp",
                    name: "温度",
                    img: require("../../assets/wendu.svg"),
                    unit: "℃",
                    code: "Tdb",
                    fixed: 1,
                },
                {
                    id: "humidity",
                    code: "RH",
                    name: "湿度",
                    img: require("../../assets/shidu.svg"),
                    unit: "%",
                    fixed: 0,
                },
                {
                    id: "co2",
                    code: "CO2",
                    name: "CO₂",
                    img: require("../../assets/co2.svg"),
                    unit: "ppm",
                    fixed: 0,
                },
                {
                    id: "methanal",
                    code: "HCHO",
                    name: "甲醛",
                    img: require("../../assets/jiaquan.svg"),
                    unit: "mg/m³",
                    fixed: 2,
                },
                {
                    id: "pm25",
                    code: "PM2d5",
                    name: "PM2.5",
                    img: require("../../assets/pm25.svg"),
                    unit: "ug/m³",
                    fixed: 0,
                },
            ],
            allBuild: [],
            nowBuildName: "",
            nowBuildPage: 1, //目前是第几个建筑
            allFloor: [],
            firstPageParams: [],
            secondPageParams: [],
            nowPage: 1, //当前哪一屏幕
            pageNum: 0, //总页数 楼层一共几页
            showFloors: [],
            totalAvgValues: null,
        };
    },
    props: {
        showPing: {
            type: Number,
            default: () => {
                return 0;
            },
        },
    },
    computed: {
        ...mapState({ projectId: (state) => state.projectId }),
    },
    watch: {
        showPing(newv, oldv) {
            //debugger;
            //当前屏幕第几屏
            if (newv == 2) {
                this.nowPage = 1;
                this.queryBuild();
            }
        },
    },
    mounted() {},
    methods: {
        selectColor: selectColor,
        clickIndicator(index) {
            this.nowIndicatorIndex = index;
        },
        getTimeFloorParam() {
            //第一屏的参数 第二屏的参数
            var floorparam =
                this.nowPage == 1
                    ? this.firstPageParams
                    : this.secondPageParams;
            var _this = this;
            this.queryParam(floorparam).then(() => {
                var timeoutsign = setTimeout(() => {
                    _this.nowIndicatorIndex = _this.nowIndicatorIndex + 1; //湿度等指标的轮询变化
                    if (_this.nowIndicatorIndex == 5) {
                        if (_this.pageNum == _this.nowPage) {
                            //如果指标轮询结束 通知切换
                            _this.nowIndicatorIndex = 0;
                            _this.nowPage = 1;
                            if (_this.nowBuildPage == _this.allBuild.length) {
                                _this.$emit("donetowpage");
                                clearTimeout(timeoutsign);
                            } else {
                                //换下一个建筑
                                _this.nowBuildPage = _this.nowBuildPage + 1;
                                _this.queryFs();
                            }
                            return;
                        }
                        //如果是两页 并且nowPage是第一页
                        if (_this.pageNum == 2 && _this.nowPage == 1) {
                            _this.nowPage = 2;
                            _this.nowIndicatorIndex = 0;
                        }
                    }
                    this.getTimeFloorParam();
                }, 1200);
            });
        },
        queryBuild() {
            var _this = this;
            this.$axios
                .post(this.$api.queryBuilding, {
                    criteria: {
                        projectId: this.projectId,
                    },
                })
                .then((res) => {
                    debugger;
                    var data = (res.data || {}).content || [];
                    _this.allBuild = data;
                    _this.nowBuildPage = 1;
                    _this.queryFs();
                })
                .catch((res) => {
                    // loading.close();
                });
        },
        queryFs() {
            // var loading = this.$loading({ fullscreen: true });
            var _this = this;
            var buildId = (this.allBuild[this.nowBuildPage - 1] || {}).id;
            if (!buildId) {
                return;
            }

            this.$axios
                .post(this.$api.queryFs, {
                    criteria: {
                        projectId: this.projectId,
                        //'Bd3301100002bba81f4830e04cde87d4b6e5652c0d5e',
                        buildingId: buildId,
                    },
                    size: 14, //最多14层
                    page: 1,
                    orders: [
                        {
                            column: "floorSequenceId",
                            asc: true,
                        },
                    ],
                })
                .then((res) => {
                    //loading.close();
                    var allFloor = res.data.content || [];
                    allFloor = allFloor.filter(function(item) {
                        return item.spaceNum > 0;
                    });
                    //如果该建筑的所有楼层 没有空间 则请求下一个建筑
                    if (allFloor.length == 0) {
                        _this.nowBuildPage = _this.nowBuildPage + 1;
                        if (_this.nowBuildPage > _this.allBuild.length) {
                            _this.$emit("donetowpage");
                            return;
                        }
                        _this.queryFs();
                        return;
                    }

                    _this.nowBuildName =
                        _this.allBuild[_this.nowBuildPage - 1].localName;
                    this.allFloor = allFloor;
                    var allFloorNum = allFloor.length;
                    //如果超过7层 就显示两屏幕 第一屏 firstPageNum
                    //如果超过7层 就显示两屏幕 第二屏 secondPageNum
                    var firstPageNum, secondPageNum;
                    if (allFloorNum <= 7) {
                        firstPageNum = allFloorNum;
                        secondPageNum = 0;
                        this.pageNum = 1;
                    } else {
                        firstPageNum = Math.ceil(allFloorNum / 2);
                        secondPageNum = Math.floor(allFloorNum / 2);
                        this.pageNum = 2;
                    }

                    var firstMaxSpace = this.floorHandle(firstPageNum); //第一屏 一层最多空间
                    var sendMaxSpace = this.floorHandle(secondPageNum);
                    var firstPageFloors = allFloor.slice(0, firstPageNum); //第一屏 所有楼层
                    var secondPageFloors = allFloor.slice(firstPageNum);
                    debugger;
                    this.firstPageParams = firstPageFloors.map((item) => {
                        var obj = {};
                        obj.id = item.id;
                        obj.projectId = this.projectId;
                        obj.spaceNum = firstMaxSpace;
                        return obj;
                    });

                    this.secondPageParams = secondPageFloors.map((item) => {
                        var obj = {};
                        obj.id = item.id;
                        obj.projectId = this.projectId;
                        obj.spaceNum = sendMaxSpace;
                        return obj;
                    });
                    this.nowIndicatorIndex = 0;
                    this.getTimeFloorParam();
                })
                .catch((res) => {
                    // loading.close();
                });
        },

        queryParam(floorparam) {
            //var loading = this.$loading({ fullscreen: true });
            //             Tdb 温度
            // CO2 二氧化碳
            // RH 湿度
            // HCHO甲醛
            // PM2d5 pm2.5

            var endTime = moment();
            var startTime = moment().subtract(30, "minutes");
            var startStr = startTime.format("YYYYMMDDHHmmss");
            var endStr = endTime.format("YYYYMMDDHHmmss");
            var newv = this.nowIndicatorIndex;
            //debugger;
            this.selIndicator = this.allIndicator[newv];
            var param = this.selIndicator.code;
            return this.$axios
                .post(
                    `${this.$api.queryParam}?endTime=${endStr}&startTime=${startStr}&param=${param}`,
                    floorparam
                )
                .then((res) => {
                    //loading.close();

                    var showFloors = res.data.data.floors || [];
                    this.totalAvgValues = res.data.data.avgValues || null;
                    this.totalAvgValues &&
                        (this.totalAvgValues = this.totalAvgValues.toFixed(
                            this.selIndicator.fixed
                        ));
                    var wrapHeight =
                        document.getElementsByTagName("body")[0].offsetHeight -
                        428;
                    wrapHeight = Math.max(wrapHeight, 1000); //1000是楼层区域的最小高度

                    showFloors.forEach((ele) => {
                        var filterFloorarr = this.allFloor.filter((item) => {
                            return item.id == ele.id;
                        });
                        var filterFloor = filterFloorarr[0] || {};
                        ele.name = filterFloor.name;
                        ele.localId = filterFloor.localId;
                        ele.localName = filterFloor.localName;
                        var dataSpacesNum = (ele.dataSpaces || []).length;
                        var floorParam = this.spaceHandle(dataSpacesNum); //一行的个数
                        //debugger;
                        ele.spacewidth = 100 / floorParam.lineNum;
                        ele.spaceheight = 100 / floorParam.floorline; //每一行的高度
                        ele.floorHeight = wrapHeight / showFloors.length; //每一层的高度
                    });
                    this.showFloors = showFloors;
                    this.selIndicatorId = this.selIndicator.id;
                });
        },
        floorHandle(floorNum) {
            //返回一层 最多多少房间
            var maxFloorSpace = 1; //一层 最多显示房间数
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
        spaceHandle(spaceNum) {
            //返回一层 的每一行 几个房间
            var lineNum = spaceNum; //一行的房间数
            var floorline = Math.ceil(spaceNum / 10); //20-30 3排 30-40个 4排 所以一排10个
            lineNum = Math.ceil(spaceNum / floorline);
            return { lineNum, floorline };
            //debugger;
        },
    },
};
</script>
<style lang="less" scoped>
.floorCont {
    border-radius: 16px;
    overflow: hidden;
}
.topChange {
    height: 194px;
    // width: 1000px;
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    .buildName {
        position: absolute;
        top: 0;
        left: 0;
        height: 42px;
        background: #e2f8ff;
        line-height: 42px;
        border-bottom-right-radius: 16px;
        text-align: center;
        font-size: 26px;
        width: 125px;
    }
    .allIndicator {
        padding-top: 32px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .eachItem {
            cursor: pointer;
            font-size: 24px;
            font-weight: 600;
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
        text-align: center;
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
    box-sizing: border-box;
    .floor-item {
        display: flex;
        padding: 18px 16px 18px 0;
        box-sizing: border-box;
        background: linear-gradient(
            186deg,
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
        width: 90px;
        flex-shrink: 0;
    }
    .floor-space {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        .space-box {
            padding: 4px;
            box-sizing: border-box;
            .space-name {
                display: flex;
                justify-content: center;
                align-items: center;
                //height: 86px;
                height: 100%;
                min-width: 80px;
                border-radius: 8px;
                background: #d9f5d6;
                text-align: center;
                padding: 0 8px;
                box-sizing: border-box;
            }
        }
    }
}
</style>
