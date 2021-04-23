import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装插件
Vue.use(VueRouter)

// 使用懒加载
const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')

// 2.创建router
const router = new VueRouter({
	routes:[
		{
			path:'',
			redirect:'/home'
		},
		{
			path:'/home',
			component: Home
		},
		{
			path:'/category',
			component: Category
		},
		{
			path:'/cart',
			component: Cart
		},
		{
			path:'/profile',
			component: Profile
		}
	],
	mode:'history'
})

export default router