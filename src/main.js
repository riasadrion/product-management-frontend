import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.component('pagination', require('laravel-vue-pagination'));

// axios config
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8085';
Vue.prototype.$http = axios;
Vue.prototype.$token = axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');

//Vue router config
import routes from './routes';
const router = new VueRouter({
    mode: 'history',
    routes
});
//main render component
import App from './App.vue'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');