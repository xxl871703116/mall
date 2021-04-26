<template>
	<div id='detail'>
		<!-- 详情页导航 -->
		<detail-nav-bar></detail-nav-bar>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	
	import {getDetailData} from 'network/detail.js'
	
	export default {
		name: "",
		data(){
			return{
				iid: null
			}
		},
		components:{
			DetailNavBar
		},
		created() {
			// 1.保存传递过来的id
			this.iid = this.$route.params.id // 对应路由中取的名字去取
			
			// 2.请求数据
			getDetailData(this.iid).then(res => {
				console.log(res)
			})
		}
	}
</script>

<style scoped>
</style>
