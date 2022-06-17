import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { VideoUrlParams } from '@/types/api/video'
// 获取视频的播放地址
export const reqVideoUrl = (params: VideoUrlParams): Promise<AxiosResponse> => request({
	url: '/video/url',
	method: 'GET',
	params
})