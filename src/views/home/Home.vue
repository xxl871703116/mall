<template>
	<div id="home">
		<!-- 顶部导航 -->
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		
		<!-- 滑动组件 -->
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3" :pullUpLoad="true" @pullingUp="loadMore">
			<!-- 轮播图 -->
			<home-swiper :banners="banners"></home-swiper>
			
			<!-- 推荐商品 -->
			<recommend-view :recommends="recommend"></recommend-view>
			
			<!-- 本周流行 -->
			<feature-view></feature-view>
			
			<!-- tab控制 -->
			<tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
			
			<!-- 商品列表展示 -->	<!--使用的计算属性 -->
			<goods-list :data="showGoods"></goods-list>
		</scroll>
		<!-- 组件本来不可以使用原生事件，加上该属性.native既可以实现监听 -->
		<back-top @click.native="backClick" v-show="isShow"></back-top>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	import {getHomeData,getHomeGoods} from 'network/home'
	export default {
		name:'',
		data(){
			return{
				banners: [],
				recommend: [],
				goods: {
					'pop':{page: 0,list: []},
					'new':{page: 0,list: []},
					'sell':{page: 0,list: []},
				},
				goodType: 'pop',
				isShow: false
			}
		},
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		created() {
			// 获取轮播图数据
			this.getHomeData()
			
			// 获取下拉数据，(默认是加载第一页)
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		computed:{
			showGoods(){
				return this.goods[this.goodType].list
			}
		},
		methods:{
			/**
			 *  网络请求
			 */
			getHomeData(){
				//返回的是一个Promise对象所以可以直接.then()
				getHomeData().then(res => {
					// console.log(res)
					this.banners = res.data.banner.list
					this.recommend = res.data.recommend.list
				})
			},
			
			getHomeGoods(type){
				// 到时候只需要调用此方法就会获取下一页数据
				// 页数+1
				const page = this.goods[type].page+1
				getHomeGoods(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list)
					//页码+1
					this.goods[type].page += 1
				})
			},
			/**
			 *  事件监听相关方法
			 */
			// (tab切换)接受子组件传递过来的index
			tabClick(index){
				// console.log(index)
				switch(index){
					case 0:
						this.goodType = 'pop'
						break
					case 1:
						this.goodType = 'new'
						break
					case 2:
						this.goodType = 'sell'
						break
				}
			},
			
			// 调用子组件的方法，回到顶部
			backClick(){
				this.$refs.scroll.scrollTo(0,0,500)
			},
			
			// 控制回到顶部组件是否显示
			contentScroll(position){
				this.isShow = (-position.y) > 1000
			},
			
			// 上拉加载更多
			loadMore(){
				// 给哪种类型加载更多
				this.getHomeGoods(this.goodType)
				this.$refs.scroll.finishPullUp()
				this.$refs.scroll.scroll.refresh()
			}
		}
	}
</script>

<style scoped>
	#home{
		/* 在这添加padding解决下面的问题 */
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		
		/* 此时脱离文档流，下面的元素都顶上去了 */
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	
	.tab-control{
		position: sticky;
		top: 44px;
		background-color: #fff;
		z-index: 9;
	}
	
	.content{
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
