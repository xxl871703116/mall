import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

// 原型上挂载一个"事件总线"解决scroll高度bug
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
