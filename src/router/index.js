import { createWebHistory, createRouter } from "vue-router";

// import About from "@/views/About.vue";

const routes = [
    {
        path: "/",
        name: "Albums",
        component: () => import("@/views/Albums.vue"),
    },
    {
        path: "/images",
        name: "Images",
        component: () => import("@/views/Images.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;