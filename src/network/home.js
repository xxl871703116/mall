import {request} from './request.js'

// 再次封装  方便管理首页的网络请求
// 获取轮播图数据
export function getHomeData(){
	return request({
		url: '/home/multidata'
	})
}

// 获取下拉的数据
export function getHomeGoods(type,page){
	return request({
		baseURL: 'http://152.136.185.210:7878/api/m5',
		url: '/home/data',
		params: {
			type,
			page
		}
	})
}