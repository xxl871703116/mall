<template>
	<div id='detail-nav-bar'>
		<nav-bar>
			<div slot="left">
				<img src="~assets/img/common/back.svg" alt="" @click="backClick">
			</div>
			<div slot= "center"  class="titles">
				<div v-for="(item,index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	export default {
		name: "",
		data(){
			return{
				titles: ['商品','参数','评论','推荐'],
				currentIndex: 0, // 保存当前高亮导航选项下标
			}
		},
		components:{
			NavBar
		},
		methods:{
			// 获取点击的选项的标题下标
			titleClick(index){
				this.currentIndex = index // 改变当前高亮的标题
				
				// 发送一个点击事件给父组件
				this.$emit("titleClick",index)
			},
			backClick(){
				// 返回
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	
	.titles{
		display: flex;
		font-size: 13px;
	}
	
	.title-item{
		flex: 1;
	}
	
	.active{
		color: var(--color-high-text);
	}
	
	img{
		margin-top: 12px;
	}
</style>
