import Vue from "vue";
import Vuex from "vuex";
import axios from "@/utils/axios";
import api from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        realTimeData: [], //实时数据
        airCondition: {}, //空调情况
        lastMonthData: [], //上月数据
        lastAllEnergy: {}, //上月所有能耗数据
        weatherCont: {}, //天气
    },
    mutations: {
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
        getWeahter(state, data) {
            state.weatherCont = data;
        },
    },
    actions: {
        getRealTimeData({ state, commit }, data) {
            //实时数据
            axios
                .get(api.queryEnvCurrent + "?projectId=Pj1101020002")
                .then((res: any) => {
                    //debugger
                    var resdata = res.data.data || [];
                    commit("getRealTimeData", resdata);
                });
        },
        getAirCondition({ state, commit }, data) {
            //空调状态
            axios
                .get(api.queryConditionerStatus + "?projectId=Pj1101020002")
                .then((res: any) => {
                    var resdata = res.data.data || {};
                    // debugger;
                    commit("getAirCondition", resdata);
                });
        },
        getRealTimeTemp({ state, commit }, data) {
            //实时温度
            return axios.get(
                api.queryIndoorTempList + "?projectId=Pj1101020002"
            );
        },
        getLastMonthData({ state, commit }, data) {
            //上月数据
            axios
                .get(api.queryEnvHistory + "?projectId=Pj1101020002")
                .then((res: any) => {
                    //debugger;
                    var resdata = res.data.data || [];
                    commit("getLastMonthData", resdata);
                });
        },

        getLastAllEnergy({ state, commit }, data) {
            //上月所有能耗数据  上月总能耗 上月节约能耗
            axios
                .post(api.queryLastAllEnergy, {
                    criteria: {
                        projectId: "Pj1101080259",
                    },
                })
                .then((res: any) => {
                    // debugger;
                    
                    var resdata = res.data.content[0] || {};
                    commit("getLastAllEnergy", resdata);
                });
        },
        getWeahter({ state, commit }, data) {
            axios
                .get(api.getWeatherCurrent + "?projectId=Pj1101020002")
                .then((res: any) => {
                    //temperature = res.data.content.temperature;
                    //debugger;
                    var weatherCont = res.data.content||{};
                    commit("getWeahter", weatherCont);
                });
        },
    },
});
