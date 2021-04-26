import {request} from './request.js'

export function getDetailData(iid){
	return request({
		baseURL: 'http://152.136.185.210:7878/api/m5',
		url:'/detail',
		params:{
			iid
		}
	})
}