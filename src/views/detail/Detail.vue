<template>
	<div id='detail'>
		<!-- 详情页导航 -->
		<detail-nav-bar></detail-nav-bar>
		
		<!-- 轮播图 -->
		<detail-swiper :topImages="topImages"></detail-swiper>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	
	import {getDetailData} from 'network/detail.js'
	
	export default {
		name: "Detail",
		data(){
			return{
				iid: null,
				topImages: []
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper
		},
		created() {
			// 1.保存传递过来的id
			this.iid = this.$route.params.id // 对应路由中取的名字去取
			
			// 2.请求数据
			getDetailData(this.iid).then(res => {
				console.log(res)
				this.topImages = res.result.itemInfo.topImages
			})
		}
	}
</script>

<style scoped>
</style>
