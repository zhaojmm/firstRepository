import Vue from "vue";
import Vuex from "vuex";
import axios from "@/utils/axios";
import api from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        realTimeData: {}, //实时数据
        airCondition: {}, //空调情况
        realTimeTemp: [], //实时温度
        lastMonthData: {}, //上月数据
    },
    mutations: {
        getRealTimeData(state, data) {
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
                .post(api.queryEnvironmentData, {
                    projectId: "Pj1101080259",
                })
                .then((res: any) => {
                    commit({
                        type: "getRealTimeData",
                        data: res,
                    });
                });
        },
        getAirCondition({ state, commit }, payload) {
            //空调状态
            axios
                .post(api.queryConditionerStatus, {
                    projectId: "Pj1101080259",
                })
                .then((res: any) => {
                    commit({
                        type: "getAirCondition",
                        data: res,
                    });
                });
        },
        getRealTimeTemp({ state, commit }, payload) {
            //实时温度
            axios
                .post(api.queryIndoorTempList, {
                    projectId: "Pj1101080259",
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
                .post(api.queryLastMonthData, {
                    projectId: "Pj1101080259",
                })
                .then((res: any) => {
                    commit({
                        type: "getLastMonthData",
                        data: res,
                    });
                });
        },
    },
});
