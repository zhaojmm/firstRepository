import Vue from "vue";
import Vuex from "vuex";
import axios from "@/utils/axios";
import api from "@/api/index";
import moment from "moment";
Vue.use(Vuex);

//let projectId: any = (<any>window).projectId;

export default new Vuex.Store({
    state: {
        realTimeData: [], //实时数据
        airCondition: {}, //空调情况
        lastMonthData: [], //上月数据
        lastAllEnergy: {}, //上月所有能耗数据
        weatherCont: {}, //天气
        bodyWidth: null,
        bodyHeight: null,
        projectId: "Pj3301100002",
        projectObj: {},
    },
    getters: {
        getBodyWidthHeight(state) {
            return [state.bodyWidth, state.bodyHeight];
        },
    },
    mutations: {
        setProjectId(state, val) {
            state.projectId = val;
        },
        setBodyWidth(state, width) {
            // debugger;
            state.bodyWidth = width;
        },
        setBodyHeight(state, height) {
            state.bodyHeight = height;
        },
        getRealTimeData(state, data) {
            //debugger;
            state.realTimeData = data;
        },
        getAirCondition(state, data) {
            state.airCondition = data;
        },
        getLastMonthData(state, data) {
            state.lastMonthData = data;
        },
        getLastAllEnergy(state, data) {
            state.lastAllEnergy = data;
        },
        getProjectObj(state, data) {
            state.projectObj = data;
        },
        getWeahter(state, data) {
            state.weatherCont = data;
        },
    },
    actions: {
        getRealTimeData({ state, commit }, data) {
            //实时数据
            axios
                .get(api.queryEnvCurrent + `?projectId=${state.projectId}`)
                .then((res: any) => {
                    //debugger
                    var resdata = res.data.data || [];
                    commit("getRealTimeData", resdata);
                });
        },
        getAirCondition({ state, commit }, data) {
            //空调状态
            axios
                .get(
                    api.queryConditionerStatus + `?projectId=${state.projectId}`
                )
                .then((res: any) => {
                    var resdata = res.data.data || {};
                    // debugger;
                    commit("getAirCondition", resdata);
                });
        },
        getRealTimeTemp({ state, commit }, data) {
            //实时温度
            return axios.get(
                api.queryIndoorTempList + `?projectId=${state.projectId}`
            );
        },
        getLastMonthData({ state, commit }, data) {
            //上月数据
            axios
                .get(api.queryEnvHistory + `?projectId=${state.projectId}`)
                .then((res: any) => {
                    //debugger;
                    var resdata = res.data.data || [];
                    commit("getLastMonthData", resdata);
                });
        },
        getProjectData({ state, commit }, data) {
            //上月数据
            axios
                .post(api.queryProject, {
                    criteria: {
                        id: state.projectId,
                    },
                })
                .then((res: any) => {
                    var project = res.data.content[0] || {};
                    commit("getProjectObj", project);
                });
        },
        getLastAllEnergy({ state, commit }, data) {
            //上月所有能耗数据  上月总能耗 上月节约能耗
            var monthTime = moment().subtract(1, "month"); //往前取15分钟
            var monthTimeStr = monthTime.format("YYYYMM");

            axios
                .post(api.queryLastAllEnergy, {
                    criteria: {
                        projectId: state.projectId,
                        yyyymm: monthTimeStr,
                    },
                })
                .then((res: any) => {
                    // debugger;

                    var resdata = (res.data.content || [])[0] || {};
                    commit("getLastAllEnergy", resdata);
                });
        },

        getWeahter({ state, commit }, data) {
            axios
                .get(api.getWeatherCurrent + `?projectId=${state.projectId}`)
                .then((res: any) => {
                    //temperature = res.data.content.temperature;
                    //debugger;
                    var weatherCont = res.data.content || {};
                    commit("getWeahter", weatherCont);
                });
        },
    },
});
