// 评论
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { SongCommentParams, LikeCommentParams } from '@/types/api/comment'

// 获取歌曲评论
export const reqSongComment = (params: SongCommentParams): Promise<AxiosResponse> => request({
    url: '/comment/music',
    method: 'GET',
    params
})
// 评论点赞
export const reqLikeComment = (params: LikeCommentParams): Promise<AxiosResponse> => request({
    url: '/comment/like',
    method: 'GET',
    params
})