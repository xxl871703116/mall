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

export function getRecommend() {
	return request({
		baseURL: 'http://152.136.185.210:7878/api/m5',
		url:'/recommend',
	})
}



// 封装一个商品信息类传递后台的数据
export class Goods{
	
	constructor(itemInfo,columns,services){
		
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services =services
		this.realPrice = itemInfo.lowNowPrice
	}
}

export class Shop{
	constructor(shopInfo) {
	    this.logo = shopInfo.shopLogo
		this.name = shopInfo.name
		this.fans = shopInfo.cFans
		this.sells = shopInfo.cSells
		this.score = shopInfo.score
		this.goodsCount = shopInfo.cGoods
	}
}


export class GoodsParam{
	constructor(info,rule) {
	    this.image = info.images ? info.images[0] : ''
		this.infos = info.set
		this.sizes = rule.tables
	}
}


// class Person{
	
// 	constructor(name,age){
// 		this.name = name
// 		this.age = age
// 	}
// }

// const p = new Person('xxl',18)
// console.log(p)