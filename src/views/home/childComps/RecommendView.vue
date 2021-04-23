<template>
	<div class="recommend">
		<div class="recommend-item" v-for="item in recommends">
			<a :href="item.link">
			<img :src="item.image" alt="">
			<div>{{item.title}}</div>
		</a>
		</div>
	</div>
</template>

<script>
	export default {
		name:'',
		props:{
			recommends: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.recommend{
		display: flex;
		font-size: 13px;
		text-align: center;
		border-bottom: 8px solid #eee;
	}
	
	.recommend-item{
		flex: 1;
		padding: 20px 5px;
	}
	
	.recommend-item img{
		width: 65px;
		height: 65px;
	}
</style>
