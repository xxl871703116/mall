import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from 'components/common/toast' // 1.导入插件
import FastClick from 'fastclick' // 解决移动端300毫秒延时问题

Vue.config.productionTip = false

FastClick.attach(document.body)

// 2.使用插件  就会去执行index文件下该对象的install方法
Vue.use(toast);

// 原型上挂载一个"事件总线"解决scroll高度bug
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
