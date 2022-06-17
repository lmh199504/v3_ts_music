// 搜索
import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { SuggestParams, MultimatchParams, TypeSearchparams } from '@/types/api/search'

// 获取默认搜索关键词
export const reqSearchDefault = () :Promise<AxiosResponse> => request({
	url: '/search/default',
	method: 'GET'
})
// 热搜列表
export const reqHotSearch = () :Promise<AxiosResponse> => request({
	url: '/search/hot',
	method: 'GET'
})
// 详细的热搜列表
export const reqDetailHotSearch = () :Promise<AxiosResponse> => request({
	url: '/search/hot/detail',
	method: 'GET'
})
// 搜索建议
export const reqSearchSuggest = (params: SuggestParams) :Promise<AxiosResponse> => request({
	url: '/search/suggest',
	method: 'GET',
	params
})
// 搜索多重匹配
export const reqMultiMatch = (params: MultimatchParams) :Promise<AxiosResponse> => request({
	url: '/search/multimatch',
	method: 'GET',
	params
})
// 搜索
export const reqSearchByType = (params : TypeSearchparams) :Promise<AxiosResponse> => request({
	url: '/search',
	method: 'GET',
	params
})