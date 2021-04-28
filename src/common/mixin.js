// 混入
import {debounce} from 'common/utils.js'

export const itemListenerMixin = {
	data(){
		return {
			imgListener: null // 图片加载完的监听者
		}
	},
	mounted() {
		this.imgListener = () => { refresh() }
		
		const refresh = debounce(this.$refs.scroll.refresh,200)
		
		this.$bus.$on("imgFinish", this.imgListener)
		
	}
}