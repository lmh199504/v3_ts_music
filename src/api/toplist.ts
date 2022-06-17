import type { AxiosResponse } from 'axios'
import request from '@/utils/request'

// 所有榜单
export const reqTopList = () :Promise<AxiosResponse> => request({
	url: '/toplist',
	method: 'GET'
})