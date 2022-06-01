// 歌单
import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { subscribeParams } from '@/types/api/sheet'

export const reqSubscribeSheet = (params: subscribeParams) :Promise<AxiosResponse> => request({
	url: '/playlist/subscribe',
	method: 'GET',
	params
})