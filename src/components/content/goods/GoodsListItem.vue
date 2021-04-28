<template>
	<div class="goods-item" @click="itemClick">
		<img :src="showImage" @load="imgLoad">
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
		},
		computed:{
			showImage(){
				return this.obj.image || this.obj.show.img
			}
		},
		methods:{
			imgLoad(){
				// 加载完成向首页的事件总线发送一个imgFinish事件 	-->问题：  此时详情页也使用了该组件，当详情页的图片加载完还是会向首页发送一个事件  这是不允许的×
				
				/* 
					解决方式一：使用路由的方式  判断当前活跃的组件是谁，如果是首页，当图片加载完，就发送homeimgFinish事件，如果是详情页，当图片加载完，就发生detailimgFinish事件
						   然后做不同的监听就哦可
						   
						if(this.$route.path.indexOf('/home') != -1){ 
							this.$bus.$emit("homeimgFinish")
						}else if(this.$route.path.indexOf('/detail') != -1){
							this.$bus.$emit("detailimgFinish")
						}
				 */ 
				
				/* 
					解决方式二： 使用混入mixin  还是发送同一个事件，然后在监听这个事件的组件中的 离开时调用的函数 deactivated() 去关闭监听 this.$bus.$off("imgFinish",函数)
				 */
				this.$bus.$emit("imgFinish")
			},
			// 点击的时候传递参数id到详情页
			itemClick(){
				this.$router.push('/detail/'+ this.obj.iid)
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
