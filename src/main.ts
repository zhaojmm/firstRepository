import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios';
import api from './api/index';

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

Vue.config.productionTip = false
import { Button ,Loading} from 'element-ui';

Vue.use(Button);
//Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;


//其他来源
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
