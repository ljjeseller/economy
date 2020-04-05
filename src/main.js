import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/scss/index.scss'

import api from './api'

Vue.config.productionTip = false
Vue.prototype.$api = api;


import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
