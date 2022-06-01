import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { AlbumListParams, DigitAlbumParams } from '@/types/api/album'

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