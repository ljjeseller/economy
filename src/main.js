import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/scss/index.scss'

import api from './api'

Vue.config.productionTip = false
Vue.prototype.$api = api;

// import { VueHammer } from 'vue2-hammer'
// Vue.use(VueHammer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
