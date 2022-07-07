import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { SongUrlParams, SheetListParams, idsParams, ModeParams, LikeParams } from '@/types/api/song'
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
// 获取歌单标签 
export const reqSheetTags = () :Promise<AxiosResponse> => request({
	url: '/playlist/highquality/tags',
	method: 'GET'
})
// 获取歌单列表
export const reqSheetList = (params: SheetListParams) :Promise<AxiosResponse> => request({
	url: '/top/playlist/highquality',
	method: 'GET',
	params
})
// 获取歌曲详情
export const reqSongDetail = (params: idsParams ) :Promise<AxiosResponse> => request({
	url: '/song/detail',
	method: 'GET',
	params
})
// 心动模式
export const reqPlayModeList = (params: ModeParams) :Promise<AxiosResponse> => request({
	url: '/playmode/intelligence/list',
	method: 'GET',
	params
})
// 喜欢歌曲
export const reqLikeSong = (params: LikeParams): Promise<AxiosResponse> => request({
	url: '/like',
	method: 'GET',
	params
})