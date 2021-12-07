import Vue from "vue";
import Vuex from "vuex";
import axios from "@/utils/axios";
import api from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        realTimeData: [], //实时数据
        airCondition: {}, //空调情况
        realTimeTemp: [], //实时温度
        lastMonthData: [], //上月数据
    },
    mutations: {
        getRealTimeData(state, data) {
            //debugger;
            state.realTimeData = data;
        },
        getAirCondition(state, data) {
            state.airCondition = data;
        },
        getRealTimeTemp(state, data) {
            state.realTimeTemp = data;
        },
        getLastMonthData(state, data) {
            state.lastMonthData = data;
        },
    },
    actions: {
        getRealTimeData({ state, commit }, payload) {
            //实时数据
            axios
                .get(api.queryEnvCurrent + "?projectId=Pj1101020002")
                .then((res: any) => {
                    //debugger
                    var resdata = res.data.data || [];
                    commit("getRealTimeData", resdata);
                });
        },
        getAirCondition({ state, commit }, payload) {
            //空调状态
            axios
                .get(api.queryConditionerStatus + "?projectId=Pj1101020002")
                .then((res: any) => {
                    var resdata = res.data.data || {};
                    // debugger;
                    commit("getAirCondition", resdata);
                });
        },
        getRealTimeTemp({ state, commit }, payload) {
            //实时温度
            axios
                .post(api.queryIndoorTempList, {
                    projectId: "Pj1101020002",
                })
                .then((res: any) => {
                    // commit({
                    //     type: "getRealTimeTemp",
                    //     data: res,
                    // });
                });
        },
        getLastMonthData({ state, commit }, payload) {
            //上月温度
            axios
                .get(api.queryEnvHistory + "?projectId=Pj1101020002")
                .then((res: any) => {
                    debugger;
                    var resdata = res.data.data || [];
                    commit("getLastMonthData", resdata);
                });
        },
    },
});
