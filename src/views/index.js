import Vue from 'vue';
import App from '@/components/pages/App'
import router from '../config/router';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})