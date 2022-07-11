import { CommentType } from '@/types/public/comment'
// 歌曲评论
export interface SongCommentParams {
    id: number
    limit?: number
    offset?: number
    before?: number // 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
}
// 评论点赞
export interface LikeCommentParams {
    id: number // 资源id
    cid: number // 评论id
    t: number // 是否点赞 , 1 为点赞 ,0 为取消点赞
    type: CommentType
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
// 新版评论
export interface CommentParams{
    id: number //  资源 id, 如歌曲 id,mv id
    type: CommentType
    pageNo: number  // 分页参数,第 N 页,默认为 1
    pageSize: number //
    sortType: number //  1:按推荐排序, 2:按热度排序, 3:按时间排序
    cursor?: number // 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
}
// 楼层评论接口
export interface CommentFloorParams{
    id: number
    parentCommentId: number
    type: CommentType
    limit: number
    time?: number // 分页参数,取上一页最后一项的 time 获取下一页数据
}