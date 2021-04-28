<template>
	<div id='detail'>
		<!-- 详情页导航 -->
		<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"></detail-nav-bar>
		
		<scroll ref="scroll" class="content" :pullUpLoad="true" >
			<!-- 商品展示的轮播图 -->
			<detail-swiper :topImages="topImages"></detail-swiper>
			
			<!-- 商品信息 -->
			<detail-base-info :goods="goods"></detail-base-info>
			
			<!-- 店铺信息 -->
			<detail-shop-info :shop="shop"></detail-shop-info>
			
			<!-- 商品详情信息 -->
			<detail-goods-info :goodsInfo="detailInfo" @imgLoad="imgLoad" ></detail-goods-info>
			
			<!-- 参数信息 -->
			<detail-param-info ref="param" :paramInfo="goodsParam"></detail-param-info>
			
			<!-- 评论信息 -->
			<detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
			
			<!-- 推荐数据展示 -->
			<goods-list ref="recommend" :data="recommend" ></goods-list>
		</scroll>
		
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	
	import GoodsList from 'components/content/goods/GoodsList.vue'
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
	import {debounce} from 'common/utils.js'
	import {itemListenerMixin} from 'common/mixin.js'
	
	export default {
		name: "Detail",
		mixins:[itemListenerMixin], //使用混入
		data(){
			return{
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				goodsParam: {},
				commentInfo: {},
				recommend: [],
				titleTop: []  // 保存不同标题的位置
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			Scroll,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList
		},
		created() {
			// 1.保存传递过来的id
			this.iid = this.$route.params.id // 对应路由中取的名字去取
			
			// 2.请求数据
			getDetailData(this.iid).then(res => {
				// console.log(res)
				const data = res.result
				// 3.保存轮播图
				this.topImages = data.itemInfo.topImages
				
				// 4.保存商品的信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				// 5.保存店铺的信息
				this.shop =new Shop(data.shopInfo)
				
				// 6.保存商品的详情数据
				this.detailInfo = data.detailInfo
				
				// 7.保存商品参数的信息
				this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				
				// 8.保存评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				
				
				// 9.保存推荐商品数据
				getRecommend().then(res => {
					this.recommend = res.data.list
				})
				
				/*  
					1.第一次获取，定位值不对
					原因: this.$refs.param.$el压根没有渲染
					
					this.titleTop = []
					
					this.titleTop.push(0)
					this.titleTop.push(this.$refs.param.$el.offsetTop)
					this.titleTop.push(this.$refs.comment.$el.offsetTop)
					this.titleTop.push(this.$refs.recommend.$el.offsetTop)
				 */
				
				 /* 
					2.第二次获取，还是不对
					原因: 图片没有计算在内
					根据最新的数据，对应的DOM是已经被渲染出来的
					但是图片依然没有加载完(目前获取到的offsetTop不包含图片)
					就是等到数据拿到，DOM渲染完之后会继续一次回调,但是图片没有加载完(不包含图片的)
				this.$nextTick(() => {
					
					this.titleTop = []
					
					this.titleTop.push(0)
					this.titleTop.push(this.$refs.param.$el.offsetTop)
					this.titleTop.push(this.$refs.comment.$el.offsetTop)
					this.titleTop.push(this.$refs.recommend.$el.offsetTop)
				})
				*/
			})
			
		},
		methods:{
			imgLoad(){
				this.$refs.scroll.refresh()  // 重新去计算高度
				
				
				// 应该在这里去获取定位值，当所以的图片加载完之后
				this.titleTop = []
				this.titleTop.push(0)
				this.titleTop.push(this.$refs.param.$el.offsetTop)
				this.titleTop.push(this.$refs.comment.$el.offsetTop)
				this.titleTop.push(this.$refs.recommend.$el.offsetTop)
				
				console.log(this.titleTop)
			},
			
			titleClick(index){
				this.$refs.scroll.scrollTo(0,-this.titleTop[index],200)
			}
		},
		
		mounted() {
			/* this.imgListener = () => { refresh() }  --> 混入
			
			// 防抖函数封装后
			const refresh = debounce(this.$refs.scroll.refresh,200)  --> 混入
			
			this.$bus.$on("imgFinish", this.imgListener)  --> 混入
			*/
		}
	}
</script>

<style scoped>
	#detail{
		position: relative;
		z-index: 9;
		height: 100vh;
		background-color: #FFFFFF
	}
	
	.detail-nav-bar{
		position: relative;
		z-index: 9;
		background-color: #FFFFFF
	}
	
	.content{
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 0px;
		left: 0;
		right: 0;
	}
</style>
