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
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录方式'
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
		path: '/emailLogin',
		name: 'EmailLogin',
		component: () => import('@/views/login/emailLogin.vue'),
		meta: {
			title: '邮箱登录'
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
		path: '/songSheetDetail',
		name: 'SongSheetDetail',
		component: () => import('@/views/songSheetDetail/index.vue'),
		meta: {
			title: '歌单详情'
		}
	},
	{
		path: '/sheetSquare',
		name: 'SheetSquare',
		component: () => import('@/views/sheetSquare/index.vue'),
		meta: {
			title: '歌单广场'
		}
	},
	{
		path: '/topList',
		name: 'TopList',
		component: () => import('@/views/topList/index.vue'),
		meta: {
			title: '排行榜'
		}
	},
	{
		path: '/album',
		name: 'Album',
		component: () => import('@/views/album/index.vue'),
		meta: {
			title: '数字专辑'
		}
	},
	{
		path: '/singer',
		name: 'Singer',
		component: () => import('@/views/singer/index.vue'),
		meta: {
			title: '歌手'
		}
	},
	{
		path: '/singerDetail',
		name: 'SingerDetail',
		component: () => import('@/views/singer/detail.vue'),
		meta: {
			title: '歌手详情'
		}
	},
	{
		path: '/singerSongs',
		name: '/SingerSongs',
		component: () => import('@/views/singer/songs.vue'),
		meta: {
			title: '歌手全部歌曲'
		}
	},
	{
		path: '/albumDetail',
		name: 'AlbumDetail',
		component: () => import('@/views/album/detail.vue'),
		meta: {
			title: '专辑详情'
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
