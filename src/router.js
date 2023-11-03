import { createRouter, createWebHistory } from 'vue-router'
// import App from "./App.vue";

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: App
    // },
    {
        path: '/one',
        name: 'One',
        component: () => import(/* webpackChunkName: "about" */ './One.vue')
    },
    {
        path: '/two',
        name: 'Two',
        component: () => import(/* webpackChunkName: "about" */ './Two.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
