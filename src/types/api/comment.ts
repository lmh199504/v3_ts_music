// 歌曲评论
export interface SongCommentParams{
    id: number
    limit?: number
    offset?: number
    before?: number // 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
}