<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	/* 
		解决Better-Scroll可滚动区域的问题
			Better-Scroll在决定有多少区域可以滚动时，是根据scrollHeight决定的
			但是我们首页中的，刚开始计算这个高度时，是没有将图片进行计算在内的
			所以计算出来的结果是错误的(1300+)
			后来图片进行加载的时候有了新的高度，但是scrollHeight的高度并没有更新。
			所以出现了问题
			
		解决：
			监听每一次图片的加载完成，只要有一次图片加载完成，就去执行一次refresh()方法重新计算scrollHeight高度
			原生js img.onload = function() {}
			vue 中  有一个@load = '方法名'
			
			非父子组件之间的通信：事件总线
			在GoodsListItem中给每个Item标签添加一个@load方法，每加载完成一次就去刷新一下scroll的refresh
			然后在Vue的的原型中添加一个$bus属性(事件总线)--->main.js添加  这样我们在 GoodsListItem 组件中图片一加载完成就可以向Home.vue(爷爷组件)发射一个事件
			然后在Home.vue中使用$on接收这个事件，就可以调用刷新方法
	 */
	
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
					return 0   // 0、1不监听实时滚动的位置  2 在手指滚动中监听，惯性不监听(鼠标松开的那个位置)  3 有惯性也监听
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
				pullUpLoad: this.pullUpLoad,
				mouseWheel: false
			})
			
			// 2.监听滚动的位置
			if(this.probeType === 2 || this.probeType ===3){
					this.scroll.on('scroll',(position) => {
					this.$emit('scroll',position)
				})
			}
			
			
			// 3.监听上拉事件
			if(this.pullUpLoad){
					this.scroll.on('pullingUp',() => {
					this.$emit('pullingUp')
				})
			}
			
		},
		// 插件方法的对外封装
		methods:{
			// 回到顶部
			scrollTo(x,y,time){
				this.scroll && this.scroll.scrollTo(x,y,time)
			},
			
			// 上拉加载更多的必调方法，否则只能加载一次
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp()
			},
			
			// 刷新方法的封装
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			
			// 获取位置Y
			getY(){
				return this.scroll ? this.scroll.y : 0 
			}
		}
	}
</script>

<style scoped>
	
</style>
