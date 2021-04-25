<template>
	<div class="tab-control">
		<div class="tab-control-item" v-for="(item,index) in titles" :class="{active: index == currentIndex}" @click="tabClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'',
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				currentIndex: 0
			}
		},
		methods:{
			tabClick(index){
				this.currentIndex = index;
				// 子组件向父组件传递事件(自定义传递事件)
				this.$emit("tabClick",index)
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
	}
	
	.tab-control-item{
		flex: 1;
	}
	
	.tab-control-item span{
		padding-bottom: 5px;
		
	}
	
	.active{
		color: var(--color-high-text);
	}
	
	.active span{
		border-bottom: 3px solid var(--color-tint);
	}
</style>
