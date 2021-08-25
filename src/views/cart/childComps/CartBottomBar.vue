<template>
  <div class="cart-bottom-bar">
    <div class="total-check">
      <!--      <img src="~assets/img/cart/tick.svg" alt="">-->
      <check-button style="margin-right: 5px" :is-check="isSelectAll" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：￥{{totalPrice}}</span>
    </div>
    <div class="calc" @click="calcClick">
      去结算({{calcCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
    export default {
      name: "CartBottomBar",
      components: {
        CheckButton
      },
      computed: {
        ...mapGetters(['cartList']),
        // 计算总价格
        totalPrice() {
          return this.$store.state.cartList.filter(item => {
            return item.checked === true
          }).reduce((prev,item) => {
            return prev + item.price * item.count
          },0).toFixed(2)
        },

        // 计算总数量
        calcCount() {
          return this.$store.state.cartList.filter(item => {
            return item.checked === true
          }).length
        },

        // 是否全部选中
        isSelectAll(){
          if(this.cartList.length > 0){
            return !this.$store.state.cartList.find(item => !item.checked)
          }
        }
      },

      methods: {
        selectAllClick(){
          if(this.isSelectAll){
            this.cartList.forEach(item => item.checked = false)
          }else {
            this.cartList.forEach(item => item.checked = true)
          }
        },

        calcClick(){
          if(!this.isSelectAll){ // 没有选中任何商品
            this.$toast.show('您还没选择任何商品~')
          }
        }
      }
    }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }
  .total-check {
    width: 25%;
    display: flex;
    justify-content: center;
  }
  .total-price {
    width: 50%;
  }
  .calc {
    width: 25%;
    background-color: #ff5028;
    color: #fff;
  }
</style>
