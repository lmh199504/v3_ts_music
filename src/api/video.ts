import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { VideoUrlParams, VideoDetailParams, AllVideoParams, MlogUrlParams, MlogToVideParams } from '@/types/api/video'
// 获取视频的播放地址
export const reqVideoUrl = (params: VideoUrlParams): Promise<AxiosResponse> => request({
	url: '/video/url',
	method: 'GET',
	params
})
// 视频详情
export const reqVideoDetail = (params: VideoDetailParams): Promise<AxiosResponse> => request({
	url: '/video/detail',
	method: 'GET',
	params
})
// 获取全部视频
export const reqAllVideo = (params?: AllVideoParams): Promise<AxiosResponse> => request({
	url: '/video/timeline/all',
	method: 'GET',
	params
}) 
// 获取 mlog 播放地址
export const reqMlogUrl = (params: MlogUrlParams): Promise<AxiosResponse> => request({
	url: '/mlog/url',
	method: 'GET',
	params
})
// 将 mlog id 转为视频 id
export const reqMlogToVideo = (params: MlogToVideParams): Promise<AxiosResponse> => request({
	url: '/mlog/to/video',
	method: 'GET',
	params
})