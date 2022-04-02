import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        redirect: { name: "verticalScreen" },
    },
    {
        path: "/verticalScreen",
        name: "verticalScreen",
        component: () => import("@/views/verticalScreen.vue"),
    },
    {
        path: "/horizontalScreen",
        name: "horizontalScreen",
        component: () => import("@/views/horizontalScreen.vue"),
    },
    {
        path: "/horThree",
        name: "horThree",
        component: () => import("@/views/horThree.vue"),
    },
    {
        path: "/mapdata",
        name: "mapdata",
        component: () => import("@/views/mapdata.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    // canUserAccess() 返回 `true` 或 `false`
    console.log("to", to);
    var projectId = to.query.projectId || "";
    debugger;
    projectId && store.commit("setProjectId", projectId);
    next();
});
export default router;
