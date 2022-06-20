import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { RecommendParams, RecommendTypeParams, DjHotByTypeParams } from '@/types/api/dj'
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