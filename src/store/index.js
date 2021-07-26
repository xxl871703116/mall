import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[] // 储存购物车里面的商品
  },
  mutations:{
    addCart(state,playload){
      // 1.查找之前的数组是否存在该商品
      let oldProduct = state.cartList.find(item => item.iid === playload.iid)

      // 2.判断oldProdudt是否有值
      if(oldProduct){
        // 存在.count属性+1
        oldProduct.count += 1
      }else{ // 不存在该商品，将其数目置为 1 并加入购物车
        playload.count = 1
        state.cartList.push(playload)
      }
    }
  }
})

// 3.挂载到Vue实例
export default store
