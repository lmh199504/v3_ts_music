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