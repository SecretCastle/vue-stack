import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/pages/Home';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/swiper',
        name: 'Swiper',
        component: resolve => require(['@/components/pages/Swiper'], resolve)
    }
]

export default new VueRouter({ routes });
