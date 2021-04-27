<template>
		<swiper class="lunbo">
			<swiper-item v-for="item in topImages" >
				<img :src="item">
			</swiper-item>
		</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
	
	export default {
		name: "",
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			topImages:{
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.lunbo{
		height: 300px;
		overflow: hidden;
	}
</style>
