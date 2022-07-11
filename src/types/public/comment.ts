// 评论
import type { UserInterface } from '@/types/public/user'
export interface CommentData{
    user: UserInterface
    timeStr: string
    commentId: number
    content: string
    likedCount: number
    liked: boolean
}
// 新版评论数据
export interface CommentDataNew{
    user: UserInterface
    content: string
    timeStr: string
    likedCount: number
    liked: boolean
    beReplied: null | Array<CommentDataNew>
    replyCount: number
    commentId: number
    time: 0
}
/**
 * type
 * 0: 歌曲
 * 1: mv
 * 2: 歌单
 * 3: 专辑
 * 4: 电台
 * 5: 视频
 * 6: 动态
 */
export enum CommentType {
    song = 0,
    mv = 1,
    sheet = 2,
    album = 3,
    dj = 4,
    video = 5,
    event = 6
}