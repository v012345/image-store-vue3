import { createWebHistory, createRouter } from "vue-router";
import Auth from "@/utils/auth"
// import About from "@/views/About.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/albums",
        name: "Albums",
        component: () => import("@/views/Albums.vue"),
    },
    {
        path: "/images",
        name: "Images",
        component: () => import("@/views/Images.vue"),
    },
    {
        path: '/login',
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/signup',
        name: "SignUp",
        component: () => import("@/views/SignUp.vue"),
    },
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from) => {
    console.log(from.path, to.path);
    // ...
    // explicitly return false to cancel the navigation
    if (to.path == "/login") {
        if (Auth.getToken())
            return false
    }
    return true
})

export default router;