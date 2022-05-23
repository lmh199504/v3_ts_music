import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'Home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '发现'
				}
			},
			{
				path: 'boke',
				name: 'Boke',
				component: () => import('@/views/boke/index.vue'),
				meta: {
					title: '播客'
				}
			},
			{
				path: 'mine',
				name: 'Mine',
				component: () => import('@/views/mine/index.vue'),
				meta: {
					title: '我的'
				}
			},
			{
				path: 'follow',
				name: 'Follow',
				component: () => import('@/views/follow/index.vue'),
				meta: {
					title: '关注'
				}
			},
			{
				path: 'village',
				name: 'Village',
				component: () => import('@/views/village/index.vue'),
				meta: {
					title: '云村'
				}
			}
		]
	},
	{
		path: '/daysRecommend',
		name: 'DaysRecommend',
		component: () => import('@/views/daysRecommend/index.vue'),
		meta: {
			title: '每日推荐'
		}
	},
	{
		path: '/phoneLogin',
		name: 'PhoneLogin',
		component: () => import('@/views/login/phoneLogin.vue'),
		meta: {
			title: '手机号登录'
		}
	},
	{
		path: '/inputCode',
		name: 'InputCode',
		component: () => import('@/views/login/inputCode.vue'),
		meta: {
			title: '输入验证码'
		}
	},
	{
		path: '/daysRecommendHistory',
		name: 'DaysRecommendHistory',
		component: () => import('@/views/daysRecommend/history.vue'),
		meta: {
			title: '历史日推'
		},
	},
	{
		path: '/scrollView',
		name: 'ScrollView',
		component: () => import('@/views/scrollView/index.vue'),
		meta: {
			title: '滚动测试'
		},
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
