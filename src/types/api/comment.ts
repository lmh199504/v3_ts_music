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
    type: number
    /**
     * 0: 歌曲
     * 1: mv
     * 2: 歌单
     * 3: 专辑
     * 4: 电台
     * 5: 视频
     * 6: 动态
     */
}