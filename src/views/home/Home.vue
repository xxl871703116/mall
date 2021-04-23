<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<recommend-view :recommends="recommend"></recommend-view>
		<feature-view></feature-view>
		<tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
		<ul>
			<li>列表1</li>
			<li>列表2</li>
			<li>列表3</li>
			<li>列表4</li>
			<li>列表5</li>
			<li>列表6</li>
			<li>列表7</li>
			<li>列表8</li>
			<li>列表9</li>
			<li>列表10</li>
			<li>列表11</li>
			<li>列表12</li>
			<li>列表13</li>
			<li>列表14</li>
			<li>列表15</li>
			<li>列表16</li>
			<li>列表17</li>
			<li>列表18</li>
			<li>列表19</li>
			<li>列表20</li>
			<li>列表21</li>
			<li>列表22</li>
			<li>列表23</li>
			<li>列表24</li>
			<li>列表25</li>
			<li>列表26</li>
			<li>列表27</li>
			<li>列表28</li>
			<li>列表29</li>
			<li>列表30</li>
			<li>列表31</li>
			<li>列表32</li>
			<li>列表33</li>
			<li>列表34</li>
			<li>列表35</li>
			<li>列表36</li>
			<li>列表37</li>
			<li>列表38</li>
			<li>列表39</li>
			<li>列表40</li>
			<li>列表41</li>
			<li>列表42</li>
			<li>列表43</li>
			<li>列表44</li>
			<li>列表45</li>
			<li>列表46</li>
			<li>列表47</li>
			<li>列表48</li>
			<li>列表49</li>
			<li>列表50</li>
		</ul>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	
	import TabControl from 'components/content/tabControl/TabControl.vue'
	
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
				}
			}
		},
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl
		},
		created() {
			this.getHomeData()
			
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		methods:{
			getHomeData(){
				//返回的是一个Promise对象所以可以直接.then()
				getHomeData().then(res => {
					// console.log(res)
					this.banners = res.data.banner.list
					this.recommend = res.data.recommend.list
				})
			},
			
			getHomeGoods(type){
				const page = this.goods[type].page+1
				getHomeGoods(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list)
					//页码+1
					this.goods[type].page += 1
				})
			}
		}
	}
</script>

<style>
	#home{
		/* 在这添加padding解决下面的问题 */
		padding-top: 44px;
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
</style>
