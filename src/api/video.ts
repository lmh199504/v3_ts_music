import request from '@/utils/request'
import { AxiosResponse } from 'axios'
import { VideoUrlParams } from '@/types/api/video'
// 获取视频的播放地址
export const reqVideoUrl = (params: VideoUrlParams): Promise<AxiosResponse> => request({
	url: '/video/url',
	method: 'GET',
	params
})