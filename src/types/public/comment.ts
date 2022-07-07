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