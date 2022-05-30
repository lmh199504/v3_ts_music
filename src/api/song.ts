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
// 获取歌单详情 /playlist/detail
export const reqSheetDetail = (params: SongUrlParams) :Promise<AxiosResponse> => request({
	url: '/playlist/detail',
	method: 'GET',
	params
})
// 获取歌单歌曲
export const reqSheetSongs = (params: SongUrlParams) :Promise<AxiosResponse> => request({
	url: '/playlist/track/all',
	method: 'GET',
	params
})