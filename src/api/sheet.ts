// 歌单
import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { subscribeParams, createParams, delParams, SheetTracksParams, UpdateCoverParams, UpdateNameParams, UpdateTagsParams, UpdateDescParams } from '@/types/api/sheet'

export const reqSubscribeSheet = (params: subscribeParams) :Promise<AxiosResponse> => request({
	url: '/playlist/subscribe',
	method: 'GET',
	params
})

// 歌单分类
export const reqCatList = () :Promise<AxiosResponse> => request({
	url: '/playlist/catlist',
	method: 'GET'
})

// 创建歌单
export const reqCreateSheet = (params: createParams) :Promise<AxiosResponse> => request({
	url: '/playlist/create',
	method: 'GET',
	params
})
// 删除歌单
export const reqDelSheet = (params: delParams) :Promise<AxiosResponse> => request({
	url: '/playlist/delete',
	method: 'GET',
	params
})
// 对歌单添加或删除歌曲
export const reqSheetTracks = (params: SheetTracksParams) :Promise<AxiosResponse> => request({
	url: '/playlist/tracks',
	method: 'GET',
	params
})
// 歌单封面更新
export const reqUpdateCover = (params: UpdateCoverParams, data: FormData) :Promise<AxiosResponse> => request({
	url: '/playlist/cover/update',
	method: 'POST',
	params,
	data
}) 
// 更新歌单名
export const reqUpdateSheetName = (params: UpdateNameParams) :Promise<AxiosResponse> => request({
	url: '/playlist/name/update',
	method: 'GET',
	params
})
// 更新歌单标签
export const reqUpdateSheetTags = (params: UpdateTagsParams) :Promise<AxiosResponse> => request({
	url: '/playlist/tags/update',
	method: 'GET',
	params
})
// 更新歌单描述
export const reqUpdateSheetDesc = (params: UpdateDescParams) :Promise<AxiosResponse> => request({
	url: '/playlist/desc/update',
	method: 'GET',
	params
})