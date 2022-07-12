import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { RecommendListParams, HistoryRecommendParams } from '@/types/api/home'
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
// 每日推荐歌曲
export const reqDaysRecommend = () :Promise<AxiosResponse> => request({
	url: '/recommend/songs',
	method: 'GET'
})
// 获取历史日推可用日期列表  
export const reqHistoryRecommend = (params: HistoryRecommendParams) :Promise<AxiosResponse> => request({
	url: '/history/recommend/songs/detail',
	method: 'GET',
	params
})
// 获取可用推荐日期
export const reqGetRecommendDate = () :Promise<AxiosResponse> => request({
	url: '/history/recommend/songs',
	method: 'GET'
})
// 国家编码列表
export const reqCountryCode = (): Promise<AxiosResponse> => request({
	url: '/countries/code/list',
	method: 'GET'
})