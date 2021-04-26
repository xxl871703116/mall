<template>
	<div>
		<swiper>
			<swiper-item v-for="item in banners" >
				<a :href="item.link">
					<img :src="item.image" @load="swiperLoad">
				</a>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
	export default {
		name:'',
		data(){
			return{
				isLoad:false
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			banners: {
				type: Array,
				default(){
					return []
				}
			}
		},
		methods:{
			swiperLoad(){
				if(!this.isLoad){
					this.$emit('swiperLoad')
					// 只发送一次图片加载完成即可
					this.isLoad = true
				}
			}
		}
	}
</script>

<style>
</style>
