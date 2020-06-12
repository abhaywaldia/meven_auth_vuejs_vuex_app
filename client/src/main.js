import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

Vue.config.productionTip = false

//etting up default vue's http modules for api calls
Vue.prototype.$http = axios;
//load the token from the local storage
const token = localStorage.getItem("token");

//If there is any token then we will append default axios authorization headers
if(token){
  Vue.prototype.$http.defaults.headers.common.Authorization = token
  Vue.prototype.$http.defaults.headers.get.Accepts = 'application/json'
  //axios.defaults.headers.get['Accepts'] = 'application/json'
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
