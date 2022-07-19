// 私信
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { 
    MsgParams,
    PrivateHistoryParams,
    SendTextParams,
    SendSongParams,
    SendSheetParams
} from '@/types/api/msg'
// 获取私信
export const reqMsgList = (params: MsgParams): Promise<AxiosResponse> => request({
    url: '/msg/private',
    method: 'GET',
    params
})
// 私信内容
export const reqPrivateHistory = (params: PrivateHistoryParams): Promise<AxiosResponse> => request({
    url: '/msg/private/history',
    method: 'GET',
    params
})
// 最近联系人
export const reqRecentcontact = (): Promise<AxiosResponse> => request({
    url: '/msg/recentcontact',
    method: 'GET'
})
// 发送私信
export const reqSendText = (params: SendTextParams): Promise<AxiosResponse> => request({
    url: '/send/text',
    method: 'GET',
    params
})
// 发送私信-歌曲
export const reqSendSong = (params: SendSongParams): Promise<AxiosResponse> => request({
    url: '/send/song',
    method: 'GET',
    params
})
// 发送私信-歌单
export const reqSendSheet = (params: SendSheetParams): Promise<AxiosResponse> => request({
    url: '/send/playlist',
    method: 'GET',
    params
})