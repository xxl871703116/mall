<template>
	<div class="goods">
		<ul v-for="item in data">
			<li><goods-list-item :obj="item"></goods-list-item></li>
		</ul>	
	</div>
</template>

<script>
	import GoodsListItem from 'components/content/goods/GoodsListItem.vue'
	export default {
		name:'',
		props:{
			data:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
	}
</script>

<style>
	.goods{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
