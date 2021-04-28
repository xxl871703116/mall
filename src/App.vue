<template>
  <div id="app">
		<!-- 不要使其销毁 -->
		<keep-alive exclude="Detail"> <!-- 除了详情页组件  每次都加载不同的详情页 这里的name属性一定要指定，不然会找不到这个组件-->
			 <router-view></router-view>
		</keep-alive>
	 
	  <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
	@import url("assets/css/base.css");
</style>
