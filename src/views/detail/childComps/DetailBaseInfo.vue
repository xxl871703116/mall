<template>
	<div>
		<div class="base-info" v-if="Object.keys(goods).length !== 0">
			<div class="title">{{goods.title}}</div>
			
			<div class="info-price">
				<span class="n-price">{{goods.newPrice}}</span>
				<span class="o-price">{{goods.oldPrice}}</span>
				<span v-if="goods.discount" class="discount">{{goods.discount}}</span>
			</div>
			
			<div class="info-other">
				<span>{{goods.columns[0]}}</span>
				<span>{{goods.columns[1]}}</span>
				<span>{{goods.services[goods.services.length-1].name}}</span>
			</div>
			
			<div class="info-service">
				<span class="info-service-item" v-for="index in goods.services.length-1" :key='index'>
					<img :src="goods.services[index-1].icon" alt="">
					<span>{{goods.services[index-1].name}}</span>
				</span>
			</div>
		</div>
		<div class="line"></div>
	</div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		
	}
</script>

<style scoped>
	.base-info{
		padding: 0 10px;
	}
	
	.title{
		color: #515151;
		font-size: 14px;
		font-weight: 600;
		margin: 15px 0;
	}
	
	.info-price{
		height: 40px;
	}
	
	.n-price{
		font-size: 20px;
		color: var(--color-tint);
	}
	
	.o-price{
		font-size: 12px;
		font-weight: 400;
		color: rgb(147, 153, 152);
		text-decoration: line-through;
		margin: 0 5px;
	}
	
	.discount{
		background-color: var(--color-tint);
		color: #FFFFFF;
		border-radius: 5px;
		font-size: 13px;
		margin-bottom: 10px;
	}
	
	.info-other{
		font-size: 12px;
		color: rgb(147, 153, 152);
		height: 22px;
		border-bottom: 2px rgb(231, 238, 237) solid;
		display: flex;
		text-align: center;
		justify-content: space-around;
	}
	
	.info-other span{
		flex: 1;
	}
	
	.info-service{
		height: 60px;
		line-height: 60px;
		font-size: 12px;
		display: flex;
		padding: 0;
	}
	
	.info-service-item{
		flex: 1;
		justify-content: space-between;
	}
	
	.info-service-item img{
		width: 13px;
		height: 13px;
		margin-right: 5px;
	}
	
	.line{
		height: 4px;
		background-color: rgb(240, 245, 244) 
	}
</style>
