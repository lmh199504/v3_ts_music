// 搜索
import { AxiosResponse } from 'axios'
import request from '@/utils/request'

// 获取默认搜索关键词
export const reqSearchDefault = () :Promise<AxiosResponse> => request({
	url: '/search/default',
	method: 'GET'
})