import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { 
	RecommendParams, 
	RecommendTypeParams, 
	DjHotByTypeParams, 
	TopListParams, 
	TopPopularParams,
	DjDetailParams,
	DjprogramParams,
	DjSubParams
 } from '@/types/api/dj'
// 推荐电台 /personalized/djprogram
export const reqSuggestDjprogram = (): Promise<AxiosResponse> => request({
	url: '/personalized/djprogram',
	method: 'GET'
})
// 获取电台banner
export const reqDjBanner = (): Promise<AxiosResponse> => request({
	url: '/dj/banner',
	method: 'GET'
})
// 电台个性推荐
export const reqDjPersonalizeRecommend = (params: RecommendParams): Promise<AxiosResponse> => request({
	url: '/dj/personalize/recommend',
	method: 'GET',
	params
})
// 电台分类
export const reqDjCatList = (): Promise<AxiosResponse> => request({
	url: '/dj/catelist',
	method: 'GET'
})
// 分类推荐 
export const reqRecommendType = (params: RecommendTypeParams): Promise<AxiosResponse> => request({
	url: '/dj/recommend/type',
	method: 'GET',
	params: params
})
// 类别热门电台 /dj/radio/hot
export const reqDjHotByType = (params: DjHotByTypeParams): Promise<AxiosResponse> => request({
	url: '/dj/radio/hot',
	method: 'GET',
	params
})
// 获取电台推荐类型 /dj/category/recommend
export const reqCategoryRecommend = (): Promise<AxiosResponse> => request({
	url: '/dj/category/recommend',
	method: 'GET'
})
// 电台今日优选
export const reqTodayPerfered = (): Promise<AxiosResponse> => request({
	url: '/dj/today/perfered',
	method: 'GET'
})
// 电台热门榜
export const reqTopList = (params?: TopListParams): Promise<AxiosResponse> => request({
	url: '/dj/toplist',
	method: 'GET',
	params
})
// 主播排行
export const reqTopPopular = (params: TopPopularParams): Promise<AxiosResponse> => request({
	url: '/dj/toplist/popular',
	method: 'GET',
	params
})
// 获取电台详情
export const reqDjDetail = (params: DjDetailParams): Promise<AxiosResponse> => request({
	url: '/dj/detail',
	method: 'GET',
	params
})
// 获取电台节目/dj/program
export const reqDjProgram = (params: DjprogramParams): Promise<AxiosResponse> => request({
	url: '/dj/program',
	method: 'GET',
	params
})
// 订阅电台
export const reqSubDj = (params: DjSubParams): Promise<AxiosResponse> => request({
	url: '/dj/sub',
	method: 'GET',
	params
})