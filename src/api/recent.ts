// 最近播放
import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { RecentParams } from '@/types/api/recent'
// 最近播放-歌曲
export const reqRecentSong = (params: RecentParams): Promise<AxiosResponse> => request({
    url: '/record/recent/song',
    method: 'GET',
    params
})
// 最近播放-视频
export const reqRecentVideo = (params: RecentParams): Promise<AxiosResponse> => request({
    url: '/record/recent/video',
    method: 'GET',
    params
}) 
// 最近播放-声音
export const reqRecentVoice = (params: RecentParams): Promise<AxiosResponse> => request({
    url: '/record/recent/voice',
    method: 'GET',
    params
})
// 最近播放-歌单
export const reqRecentSheet = (params: RecentParams): Promise<AxiosResponse> => request({
    url: '/record/recent/playlist',
    method: 'GET',
    params
})
// 最近播放-播客
export const reqRecentDj = (params: RecentParams): Promise<AxiosResponse> => request({
    url: '/record/recent/dj',
    method: 'GET',
    params
}) 
// 最近播放-专辑
export const reqRecentAlbum = (): Promise<AxiosResponse> => request({
    url: '/record/recent/album',
    method: 'GET'
})