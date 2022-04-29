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
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
