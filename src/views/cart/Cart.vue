<template>
	<div class="cart">
    <!--头部-->
    <nav-bar class="head">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--列表-->
    <cart-list></cart-list>

    <!--计算栏-->
    <cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from "vuex"

	export default {
		name:'',
    components: {
		  NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
		  ...mapGetters(['cartLength'])
    }
	}
</script>

<style>
  .cart {
    height: 100vh;
  }
  .head {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
