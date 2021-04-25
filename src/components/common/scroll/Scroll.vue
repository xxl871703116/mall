<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		name:'',
		data(){
			return{
				scroll: null,
			}
		},
		// 这样就可以用属性的方式控制是否需要实时监听
		props:{
			probeType: {
				type: Number,
				default(){
					return 0   // 0、1不监听  2没有惯性(鼠标松开的那个位置)  3有惯性
				}
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			// 1. 创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true, // 允许scroll中有点击事件
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			
			// 2.监听滚动的位置
			this.scroll.on('scroll',(position) => {
				this.$emit('scroll',position)
			})
			
			// 3.监听上拉事件
			this.scroll.on('pullingUp',() => {
				this.$emit('pullingUp')
			})
		},
		// 插件方法的对外封装
		methods:{
			// 回到顶部
			scrollTo(x,y,time){
				this.scroll.scrollTo(x,y,time)
			},
			
			// 上拉加载更多的必调方法，否则只能加载一次
			finishPullUp(){
				this.scroll.finishPullUp()
			}
		}
	}
</script>

<style scoped>
	
</style>
