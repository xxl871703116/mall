export default {
  // 建议使用actions做复杂的操作(异步等等)
  addCart(context,playload){
    return new Promise((resolve,reject) => {
      // 1.查找之前的数组是否存在该商品
      let oldProduct = context.state.cartList.find(item => item.iid === playload.iid)

      // 2.判断oldProdudt是否有值
      if(oldProduct){
        // 存在.count属性+1
        oldProduct.count += 1
        context.commit('addCounter',playload)
        resolve("商品数量＋1")
      }else{ // 不存在该商品，将其数目置为 1 并加入购物车
        playload.count = 1
        context.commit('addNewGoods',playload)
        resolve("添加一个新的商品")
      }
    })
  }
}
