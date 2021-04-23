<template>
		<div class="tab-bar-item" @click="btnClick">
			<div v-if="!isActive"><slot name="item-img"></slot></div>
			<div v-else><slot name="item-img-active"></slot></div>
			<div :style="activeStyle"><slot name="item-text"></slot></div>
		</div>
</template>

<script>
	export default {
		name:'TarBarItem',
		props:{
			path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		data(){
			return{
				// isActive: true
			}
		},
		computed:{
			isActive(){
				//判断当前活跃的路径(被点击的)是否和这个item的本身的路径相等
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle(){
				return this.isActive ?  {color: this.activeColor} : {}
			}
		},
		methods:{
			btnClick(){
				this.$router.push(this.path)
			}
		}
	}
</script>

<style>
	
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	
	.tab-bar-item img{
		width: 24px;
	}
	
	.active{
		color: red;
	}
</style>
