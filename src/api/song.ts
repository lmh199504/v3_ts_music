import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { SongUrlParams } from '@/types/api/song'
// 获取歌曲播放地址
export const reqGetSongUrl = (params: SongUrlParams) :Promise<AxiosResponse> => request({
	url: '/song/url',
	method: 'GET',
	params
})
// 检查音乐是否可用
export const reqCanPlayMusic = (params: SongUrlParams) :Promise<AxiosResponse> => request({
	url: '/check/music',
	method: 'GET',
	params
})
// 获取歌词
export const reqGetLyric = (params: SongUrlParams) :Promise<AxiosResponse> => request({
	url: '/lyric',
	method: 'GET',
	params
})