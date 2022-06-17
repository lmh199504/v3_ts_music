//歌手
import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { singerListParams, subSingerParams, singerDetailParams, singerSongParams, singerAlbum } from '@/types/api/singer'
// 获取歌手列表
export const reqSingerList = (params: singerListParams) :Promise<AxiosResponse> => request({
	url: '/artist/list',
	method: 'GET',
	params
})
// 关注/取消歌手
export const reqSubSinger = (params: subSingerParams) :Promise<AxiosResponse> => request({
	url: '/artist/sub',
	method: 'GET',
	params
})
// 获取歌手详情
export const reqSingerDetail = (params: singerDetailParams) :Promise<AxiosResponse> => request({
	url: '/artist/detail',
	method: 'GET',
	params
})
// 获取跟手描述
export const reqSingerDesc = (params: singerDetailParams) :Promise<AxiosResponse> => request({
	url: '/artist/desc',
	method: 'GET',
	params
})
// 获取歌手粉丝数量
export const reqSingerFans = (params: singerDetailParams) :Promise<AxiosResponse> => request({
	url: '/artist/follow/count',
	method: 'GET',
	params
})
// 歌手热门歌曲
export const reqSingHotSongs = (params: singerDetailParams) :Promise<AxiosResponse> => request({
	url: '/artist/top/song',
	method: 'GET',
	params
})
// 分页获取歌手歌曲
export const reqSingerSongs = (params: singerSongParams) :Promise<AxiosResponse> => request({
	url: '/artist/songs',
	method: 'GET',
	params
})
// 获取歌手专辑
export const reqSingerAlbum = (params: singerAlbum) :Promise<AxiosResponse> => request({
	url: '/artist/album',
	method: 'GET',
	params
})