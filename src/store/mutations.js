export  default {
  // 商品数目+1
  addCounter(state,playload){
    playload.count += 1;
  },

  // 添加一个新商品
  addNewGoods(state,playload){
    playload.checked = true // 添加一个属性是否选中
    state.cartList.push(playload)
  }
}
