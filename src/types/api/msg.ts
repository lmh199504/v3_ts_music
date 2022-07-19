// 获取私信
export interface MsgParams{
    limit: number
    offset: number
}
// 获取私信内容
export interface PrivateHistoryParams{
    uid: number
    limit: number
    before?: number | undefined
    timestamp?: number
}
// 发送私信
export interface SendTextParams{
    user_ids: number | string
    msg: string
}
// 发送私信-歌曲
export interface SendSongParams{
    user_ids: number | string // 用户 id,多个需用逗号隔开
    id: number // 歌曲id
    msg?: string // 要发送的消息
}
// 发送私信-歌曲
export interface SendSheetParams{
    user_ids: number | string // 用户 id,多个需用逗号隔开
    playlist: number // 歌曲id
    msg?: string // 要发送的消息
}