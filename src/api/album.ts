import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { AlbumListParams, DigitAlbumParams, AlbumDetailParams } from '@/types/api/album'

// 新碟上架
export const reqAlbumList = (params: AlbumListParams) :Promise<AxiosResponse> => request({
	url: '/album/list',
	method: 'GET',
	params
})
// 获取数字专辑 
export const reqDigitAlbum = (params: DigitAlbumParams) :Promise<AxiosResponse> => request({
	url: '/album/songsaleboard',
	method: 'GET',
	params
})
// 数字专辑详情
export const reqAlbumDetail = (params: AlbumDetailParams) :Promise<AxiosResponse> => request({
	url: '/album/detail',
	method: 'GET',
	params
})