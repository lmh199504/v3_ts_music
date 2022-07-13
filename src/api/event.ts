import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import { EventParams, UserEventParams } from '@/types/api/event'
// 动态
export const reqEvent = (params: EventParams): Promise<AxiosResponse> => request({
    url: '/event',
    method: 'GET',
    params
})
// 获取用户动态
export const reqUserEvent = (params: UserEventParams): Promise<AxiosResponse> => request({
    url: '/user/event',
    method: 'GET',
    params
})