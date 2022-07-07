// 评论
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { SongCommentParams } from '@/types/api/comment'

// 获取歌曲评论
export const reqSongComment = (params: SongCommentParams): Promise<AxiosResponse> => request({
    url: '/comment/music',
    method: 'GET',
    params
})