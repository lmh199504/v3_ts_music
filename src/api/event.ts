import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import { EventParams } from '@/types/api/event'
// 动态
export const reqEvent = (params: EventParams): Promise<AxiosResponse> => request({
    url: '/event',
    method: 'GET',
    params
})