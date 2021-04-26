<template>
	<div id="home">
		<!-- 顶部导航 -->
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		
		<!-- 狸猫换太子的tabControl : 多复制一份该组件对象，利用它来做停留效果，当用户滚动到一定位置，让其显示出来，没有滚动到一定位置让其隐藏-->
		<tab-control ref="tabControl_1" :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="isShowTabControl" class="tabControl"></tab-control>
		
		<!-- Better-Scroll滑动组件 -->
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3" :pullUpLoad="true" @pullingUp="loadMore">
			<!-- 轮播图 -->
			<home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
			
			<!-- 推荐商品 -->
			<recommend-view :recommends="recommend"></recommend-view>
			
			<!-- 本周流行 -->
			<feature-view></feature-view>
			
			<!-- tab控制 -->
			<tab-control ref="tabControl_2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
			
			<!-- 商品列表展示 -->	<!--使用的计算属性 -->
			<goods-list :data="showGoods"></goods-list>
		</scroll>
		
		<!-- 组件本来不可以使用原生事件，加上该属性.native就可以实现监听 -->
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
	import {debounce} from 'common/utils.js'
	
	
	export default {
		name:'',
		data(){
			return{
				banners: [], // 轮播图数据
				recommend: [], // 本周推荐数据
				goods: { //封装的tabControl组件的数据
					'pop':{page: 0,list: []},
					'new':{page: 0,list: []},
					'sell':{page: 0,list: []},
				},
				goodType: 'pop', //商品类型
				isShow: false, //是否显示回到顶部按钮
				tabOffsetTop: 0, // tabControl组件的距离顶部的位置
				isShowTabControl: false, //是否显示tabControl组件
				saveY: 0,
			}
		},
		// 注册组件
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
		// 检测Home组件是否在每次路由跳转的时候被销毁
		destroyed() {
			console.log("home destroyed...")
		},
		// 和keep-alive配套使用的，当这个组件被激活时使用
		// 活跃时定位到离开的位置
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			// 最好刷新一哈
			this.$refs.scroll.refresh()
		},
		// 和keep-alive配套使用的，当这个组件被离开时使用
		// 离开时记录离开的位置
		deactivated() {
			this.saveY = this.$refs.scroll.getY()
		},
		// 此时通过this.$refs去取组件对象或者元素对象时放在created函数中有可能取不到，所以放在mounted中
		mounted() {
			// 接收事件总线传递过来的事件 imgFinish 拿到scroll对象去刷新重写计算高度
			// this.$bus.$on("imgFinish",() => {
			// 	this.$refs.scroll.refresh()
			// })
			
			// 防抖函数封装后
			const refresh = debounce(this.$refs.scroll.refresh,200)
			this.$bus.$on("imgFinish",() => {
				refresh()
			})
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
					
					this.banners = res.data.banner.list
					this.recommend = res.data.recommend.list
				})
			},
			
			getHomeGoods(type){
				// 到时候只需要调用此方法就会获取下一页数据
				// 页数+1
				const page = this.goods[type].page+1
				getHomeGoods(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list) //语法糖  会将数组中的一个个数据取出来
					//页码+1
					this.goods[type].page += 1
					
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
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
				// 解决狸猫换太子标题不同的问题
				// 这样两个相同的tabControl组件显示的标题就是一致的
				this.$refs.tabControl_1.currentIndex = index
				this.$refs.tabControl_2.currentIndex = index
			},
			
			// 调用子组件的方法，回到顶部
			backClick(){
				this.$refs.scroll.scrollTo(0,0,500)
			},
			
			// 判断回到顶部组件是否显示
			contentScroll(position){
				this.isShow = (-position.y) > 1000
				
				this.isShowTabControl = (-position.y) > this.tabOffsetTop
			},
			
			// 上拉加载更多
			loadMore(){
				// 给哪种类型加载更多
				this.getHomeGoods(this.goodType)
				
				// this.$refs.scroll.scroll.refresh()
			},
		
			// 监听轮播图加载完成时就可以获取其高度了
			swiperLoad(){
				// 当轮播图加载完成，获取tabControl组件的offsetTop的值
				this.tabOffsetTop = this.$refs.tabControl_2.$el.offsetTop
			}
		}
	}
</script>

<style scoped>
	#home{
		/* 在这添加padding解决下面的问题 */
		/* padding-top: 44px; */
		height: 100vh;
		/* position: relative; */
	}
	
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		/* 此时脱离文档流，下面的元素都顶上去了  在原生浏览器中为了不让其跟随一起滚动
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;*/
	}
	
	.tabControl{
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	
	/* 引入better-scroll后失效了 */
	/* .tab-control{
		position: sticky;
		top: 44px;
		background-color: #fff;
		z-index: 9;
	} */
	
	.content{
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
