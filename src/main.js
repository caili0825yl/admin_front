import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'
import 'normalize.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3050/api'

})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
