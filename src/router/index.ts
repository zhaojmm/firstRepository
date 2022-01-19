import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

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
        path: "/horTwo",
        name: "horTwo",
        component: () => import("@/views/horTwo.vue"),
    },
    {
        path: "/horThree",
        name: "horThree",
        component: () => import("@/views/horThree.vue"),
    },
    {
        path: "/officialAccount",
        name: "officialAccount",
        component: () => import("@/views/officialAccount/environment.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
