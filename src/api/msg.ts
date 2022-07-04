// 私信
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { MsgParams } from '@/types/api/msg'
// 获取私信
export const reqMsgList = (params: MsgParams): Promise<AxiosResponse> => request({
    url: '/msg/private',
    method: 'GET',
    params
})
