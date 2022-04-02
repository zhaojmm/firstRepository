<template>
    <div class="floorSpace" ref="floorSpace">
        <div class="leftChange">
            <div class="buildName" v-show="allBuild.length>1">{{nowBuildName}}</div>
            <div class="allIndicator">
                <div
                    class="eachItem "
                    v-for="(item,index) in allIndicator"
                    @click="clickIndicator(index)"
                    v-bind:class="{'select':item.id==selIndicator.id}"
                >
                    <div class="title">{{item.name}}</div>
                    <div
                        class="textCont"
                        v-show="item.id==selIndicator.id"
                    ><span class="value">{{totalAvgValues}}{{selIndicator.unit}}</span><br /><span class="name">平均{{selIndicator.name}}</span></div>
                    <img
                        v-show="item.id==selIndicator.id"
                        class="img"
                        :src="selIndicator.img"
                    ></img>
                </div>
            </div>
        </div>

        <div class="floorWrap">
            <div
                class="floor-item"
                v-for="(item,index) in showFloors"
                :key="index"   v-bind:style="{ height: item.floorHeight + 'px' }"
            >
                <div class="floor-num"><span>{{item.localName}}</span></div>
                <div class="floor-space">
                    <div
                        class="space-box"
                        v-for="(childItem,id) in item.dataSpaces"
                        :key="id"
                        v-bind:style="{ width: item.spacewidth + '%' ,height: item.spaceheight + '%'  }"
                    >
                        <div class="space-name" v-bind:style="{backgroundColor:selectColor(childItem.avgValues,selIndicatorId,true)}">{{childItem.localName}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import moment from "moment";
import { selectColor } from "@/utils/publicMethod";
import { mapState } from "vuex";

export default {
    name: 'FloorSpace',
    data() {
        return {
            selIndicator: {},      
            selIndicatorId:'',//为了颜色用
             //              温度
            //  二氧化碳
            //  湿度
            // 
            //  pm2.5
            nowIndicatorIndex:null,//现在选中的指标 index
            allIndicator: [{
                id: 'temp',
                code:'Tdb',
                name: '温度',
                img: require('../../assets/horImg/wendu.svg'),
                unit: '℃',
                fixed:1
            }, {
                id: 'humidity',
                code:'RH',
                name: '湿度',
                img: require('../../assets/horImg/shidu.svg'),
                unit: '%',
                fixed:0
            }, {
                id: 'co2',
                code:'CO2',
                name: 'CO₂',
                img: require('../../assets/horImg/co2.svg'),
                unit: 'ppm',
                fixed:0
            }, {
                id: 'methanal',
                code:'HCHO',
                name: '甲醛',
                img: require('../../assets/horImg/jiaquan.svg'),
                unit: 'mg/m³',
                fixed:2

            }, {
                id: 'pm25',
                code:'PM2d5',
                name: 'PM2.5',
                img: require('../../assets/horImg/pm25.svg'),
                unit: 'ug/m³',
                fixed:0
            }],
            allBuild: [],
            nowBuildName: '',
            nowBuildPage: 1, //目前是第几个建筑

            allFloor: [],
            firstPageParams: [],
            secondPageParams: [],
            nowPage: 1, //当前哪一屏幕
            pageNum:0,
            showFloors: [],
            totalAvgValues:null
        }
    },
    props: {
        showPing: {
            type: Number,
            default: () => {
                return 0;
            }, 
        },
    },
    watch:{
        showPing(newv,oldv){
            //当前展示为第二屏时
            if(newv==2){
                   this.nowPage = 1;
                   this.queryBuild();
            }
        }
    },
    mounted() {
   
    },
    destroyed(){
        console.log("horfloorspace---destroyed");
    },
    computed: {
        ...mapState({ projectId: (state) => state.projectId }),
    },
    methods: {
        selectColor:selectColor,
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
                    _this.nowIndicatorIndex = _this.nowIndicatorIndex + 1;//湿度等指标的轮询变化
                    if (_this.nowIndicatorIndex == 5) {//指标切换完毕
                        //debugger;
                         if (_this.pageNum == _this.nowPage) {
                             //一个建筑的所有楼层 切换完毕
                            _this.nowIndicatorIndex = 0;
                            _this.nowPage = 1;
                             //所有建筑指标轮询结束 通知切换
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
            //var loading = this.$loading({ fullscreen: true });
            var _this=this;
            var buildId= (this.allBuild[this.nowBuildPage - 1]||{}).id;
            if(!buildId){return;} 

            this.$axios
                .post(this.$api.queryFs, {
                    criteria: {
                        projectId: this.projectId,
                           buildingId: buildId,
                    },
                    size: 14,//最多14层
                    page: 1,
                    orders: [
                        {
                            column: "floorSequenceId",
                            asc: true,
                        },
                    ],
                })
                .then((res) => {
                   // loading.close();
                    var allFloor = res.data.content || [];
                    allFloor = allFloor.filter(function(item) {
                        return item.spaceNum > 0;
                    });
                   
                    //如果该建筑的所有楼层 没有空间 则请求下一个建筑
                    if (allFloor.length == 0) {
                        //换下一栋楼
                        _this.nowBuildPage = _this.nowBuildPage + 1;
                        if (_this.nowBuildPage > _this.allBuild.length) {
                            _this.$emit("donetowpage");
                            return;
                        }
                        _this.queryFs();
                        return;
                    }
                     _this.nowBuildName = _this.allBuild[_this.nowBuildPage - 1].localName;
                    
                    this.allFloor = allFloor;
                    var allFloorNum = allFloor.length;
                    //如果超过7层 就显示两屏幕 第一屏 firstPageNum
                    //如果超过7层 就显示两屏幕 第二屏 secondPageNum
                    var firstPageNum, secondPageNum;
                    if (allFloorNum <= 7) {
                        firstPageNum = allFloorNum;
                        secondPageNum = 0;
                        this.pageNum=1;
                    } else {
                        firstPageNum = Math.ceil(allFloorNum / 2);
                        secondPageNum = Math.floor(allFloorNum / 2);
                        this.pageNum=2;
                    }

                    var firstMaxSpace = this.floorHandle(firstPageNum); //第一屏 一层最多空间
                    var sendMaxSpace = this.floorHandle(secondPageNum);
                    var firstPageFloors = allFloor.slice(0, firstPageNum); //第一屏 所有楼层
                    var secondPageFloors = allFloor.slice(firstPageNum);//第二屏 所有楼层
                    //第一屏的参数 第二屏的参数
                    this.firstPageParams = firstPageFloors.map((item) => {
                        var obj = {};
                        obj.id = item.id;
                        obj.projectId = this.projectId;
                        obj.spaceNum = firstMaxSpace;//最多空间数
                        return obj;
                    });

                    this.secondPageParams = secondPageFloors.map((item) => {
                        var obj = {};
                        obj.id = item.id;
                        obj.projectId = this.projectId;
                        obj.spaceNum = sendMaxSpace;
                        return obj;
                    });
                
                    this.nowIndicatorIndex=0;
                    this.getTimeFloorParam();
                }).catch(function(res){
                   // loading.close();
                });
        },
        queryParam(floorparam) {
            //var loading = this.$loading({ fullscreen: true });

            var endTime = moment();
            var startTime = moment().subtract(30, "minutes");//往前取15分钟
            var startStr = startTime.format("YYYYMMDDHHmmss");
            var endStr = endTime.format("YYYYMMDDHHmmss");
            var newv=this.nowIndicatorIndex;
            this.selIndicator = this.allIndicator[newv];
            var param = this.selIndicator.code;
          return  this.$axios
                .post(
                    `${this.$api.queryParam}?endTime=${endStr}&startTime=${startStr}&param=${param}`,
                    floorparam
                )
                .then((res) => {
                   // loading.close();
                    //console.log("queryParam", res);
                    var showFloors = res.data.data.floors || [];
                    this.totalAvgValues = res.data.data.avgValues || null;
                    var wrapHeight= document.getElementsByTagName("body")[0].offsetHeight-164;
                    wrapHeight=Math.max(wrapHeight,730);//730是楼层区域的最小高度

                    this.totalAvgValues&&(this.totalAvgValues=this.totalAvgValues.toFixed(this.selIndicator.fixed));
                    showFloors.forEach((ele) => {
                        var filterFloorarr = this.allFloor.filter((item) => {
                            return item.id == ele.id;
                        });
                        var filterFloor = filterFloorarr[0] || {};
                        ele.name = filterFloor.name;
                        ele.localId = filterFloor.localId;
                        ele.localName = filterFloor.localName;
                        var dataSpacesNum = ele.dataSpaces.length;//一层的空间数
                        var floorParam = this.spaceHandle(dataSpacesNum,showFloors.length) ; //一行的个数
                        ele.spacewidth = 100 / floorParam.lineNum;
                        ele.spaceheight = 100 / floorParam.floorline;//每一行的高度占比
                        ele.floorHeight= wrapHeight/showFloors.length;//每一层的高度
                    });

                    this.showFloors = showFloors;
                    this.selIndicatorId=this.selIndicator.id;
                }).catch((err)=>{});
        },
        spaceHandle(spaceNum,floorNum){//返回一层 的每一行 几个房间
            var lineNum = spaceNum; //一行的房间数
            var floorline=1;//一层几行
            if (floorNum == 1) {//最多一层时
                    if (spaceNum > 2 && spaceNum <= 24 ) {
                        floorline=2;
                        lineNum = spaceNum / 2;
                    }else if (spaceNum > 24 && spaceNum <= 36) {
                        floorline=3;
                        lineNum = Math.ceil(spaceNum / 3);
                    } else if (spaceNum > 36 && spaceNum <= 48) {
                        floorline=4;
                        lineNum = Math.ceil(spaceNum / 4);
                    } else if (spaceNum > 48 && spaceNum <= 60) {//48-60个 5行
                        floorline=5;
                        lineNum = Math.ceil(spaceNum / 5);
                    }
                }else{
                     floorline = Math.ceil(spaceNum / 16); //20-30 3排 30-40个 4排 一层排数
                    lineNum = Math.ceil(spaceNum / floorline);
                }
               
                return {lineNum,floorline};
        },
        floorHandle(floorNum) {
            var maxFloorSpace = 1;//一层 最多显示房间数
              switch (floorNum) {
                case 1:
                    maxFloorSpace = 60;
                    break;
                case 2:
                    maxFloorSpace = 48;
                    break;
                case 3:
                case 4:
                    maxFloorSpace = 32;
                    break;
                case 5:
                case 6:
                case 7:
                    maxFloorSpace = 16;
                    break;
            }
            return maxFloorSpace;
        //  if(floorNum == 2) {
        //     if (spaceNum > 16 && spaceNum < = 32 ) {
        //         lineNum = Math.ceil(spaceNum / 2);
        //     }else if (spaceNum > 32 && spaceNum < = 48 ) {
        //         lineNum = Math.ceil(spaceNum / 3);
        //     }
        //     maxFloorSpace=48;
        // }
        // if(floorNum ==3||floorNum ==4) {
        //             if (spaceNum > 16 && spaceNum < = 32 ) {
        //                 lineNum = Math.ceil(spaceNum / 2);
        //             }
        //              maxFloorSpace=32;
        //         }
    }
}
}
</script>
<style lang="less" scoped>
.floorSpace {
    width: 100%;
    // height: 910px;
    display: flex;
    //min-height: 730px;
    background: #ffffff;
     border-radius: 16px;
     overflow: hidden;
  
}
.leftChange {
    height: 100%;
    width: 154px;
    margin: 0 auto;
    //min-height: 730px;
    .buildName{
        height: 42px;
        background:#E2F8FF;
        line-height: 42px;
        border-bottom-right-radius: 16px;
        text-align:center;
        font-size:26px;
        width: 125px;
    }
    .allIndicator {
        padding-top: 32px;
        //padding-bottom: 20px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        .eachItem {
            cursor: pointer;
            margin-bottom: 56px;
            padding: 0;
            text-align: center;
            font-family: PingFang SC;
            .title {
                color: #9b98ad;
                font-size: 24px;
                font-weight: 600;
            }
            &.select {
                border-left: 4px solid #46ccf6;
                .title {
                    color: #3b3558;
                    font-size: 24px;
                }
                .textCont {
                    color: #3b3558;
                    font-size: 20px;
                    padding-top: 16px;
                    padding-bottom: 20px;
                    line-height: 20px;
                    .value{
                        font-weight: 600;
                    }
                    .name {
                        font-size: 14px;
                    }
                }
                .img {
                    height: 196px;
                    padding: 0;
                    margin: 0;
                }
            }
           
        }
         .eachItem:last-child{
             margin-bottom:0;
         }

    }
    // .allIndicator {
    //     padding-top: 32px;
    //     padding-bottom: 20px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     .eachItem {
    //         font-size: 24px;
    //         color: #9b98ad;
    //         margin-right: 60px;
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         .bar {
    //             width: 24px;
    //             height: 6px;
    //             display: inline-block;
    //         }
    //         &.select {
    //             color: #3b3558;
    //             .bar {
    //                 background: #46ccf6;
    //             }
    //         }
    //     }
    // }
    // .imageDiv {
    //     height: 32px;
    //     margin: 0 32px;
    // }
    // .textCont {
    //     color: #3b3558;
    //     font-size: 20px;
    //     font-weight: 600;
    //     text-align: center;
    //     padding-top: 16px;
    //     .value {
    //         margin-left: 4px;
    //     }
    // }
}

.floorWrap {
    //  width: 1000px;
    flex: 1;
    margin: 0 auto;
    background: #ffffff;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    // padding-right:20px;
    box-sizing: border-box;
    .floor-item {
        display: flex;
        padding: 18px 20px 18px 0;
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
                min-width: 20px;
                border-radius: 8px;
                background: #d9f5d6;
                text-align: center;
                padding:0 8px;
                box-sizing: border-box;
            }
        }
    }
}
</style>


