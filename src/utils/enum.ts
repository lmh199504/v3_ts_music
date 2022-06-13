
/**
 * -1:全部 
 * 1:男歌手
 * 2:女歌手
 * 3:乐队
 *
 *  */
export const singerType = [
	{ text: '全部', value: -1 },
	{ text: '男歌手', value: 1 },
	{ text: '女歌手', value: 2 },
	{ text: '乐队', value: 3 }
]
/**
 * -1:全部
 * 7 华语
 * 96欧美
 * 8:日本
 * 16韩国
 * 0:其他 
 * */
export const araeList = [
	{ text: '全部', value: -1 },
	{ text: '华语', value: 7 },
	{ text: '欧美', value: 96 },
	{ text: '日本', value: 8 },
	{ text: '韩国', value: 16 },
	{ text: '其他', value: 0 },
]
import comprehensive from '@/views/search/components/comprehensive.vue'
import single from '@/views/search/components/single.vue'
export const searchType = [
	{ type: 1018, name: '综合', component: comprehensive },
	{ type: 1, name: '单曲', component:  single },
	{ type: 100, name: '歌手', component:  comprehensive },
	{ type: 10, name: '专辑', component:  comprehensive },
	{ type: 1000, name: '歌单', component:  comprehensive },
	{ type: 1002, name: '用户', component: comprehensive },
	{ type: 1004, name: 'MV', component: comprehensive },
	{ type: 1006, name: '歌词', component: comprehensive },
	{ type: 1009, name: '电台', component: comprehensive },
	{ type: 1014, name: '视频', component: comprehensive },
	{ type: 2000, name: '声音', component: comprehensive }
]
