<template>
	<div class="goods-item">
		<img :src="obj.show.img" alt="">
		<div class="goods-info">
			<p>{{obj.title}}</p>
			<span class="price">{{obj.price}}</span>
			<span class="collect">{{obj.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'',
		props:{
			obj:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style>
	.goods-item{
		width: 150px;
		position: relative;
		padding-bottom: 40px;
	}
	
	.goods-item img{
		width: 100%;
		border-radius: 5px;
	}
	
	.goods-info{
		font-size: 12px;
		text-align: center;
		overflow: hidden;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
	}
	
	.goods-info p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.goods-info .price{
		color: var(--color-high-text);
		margin-right: 20px;
	}
	
	.goods-info .collect{
		position: relative;
	}
	
	.goods-info .collect::before{
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
