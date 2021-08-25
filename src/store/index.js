import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters"

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[] // 储存购物车里面的商品
  },
  // mutations唯一的目的就是修改state的状态
  // mutations中的每个方法尽可能完成的事件事件比较单一
  mutations,
  actions,
  getters
})

// 3.挂载到Vue实例
export default store
