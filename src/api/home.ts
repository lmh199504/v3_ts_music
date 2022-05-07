import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { RecommendListParams } from '@/types/api/home'
// 获取banner
export const reqBanner = (): Promise<AxiosResponse> => request({
	url: '/banner',
	method: 'GET',
	params: {
		type: 2
	}
})
// 获取推荐歌单
export const reqRecommendList = (params: RecommendListParams): Promise<AxiosResponse> => request({
	url: '/personalized',
	method: 'GET',
	params
})
// 获取推荐新歌
export const reqRecommendNewSongs = (params: RecommendListParams) :Promise<AxiosResponse> => request({
	url: '/personalized/newsong',
	method: 'GET',
	params
})