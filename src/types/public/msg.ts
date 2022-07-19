// 私信
export interface ConversationData{
    fromUser: MsgUser
    lastMsg: string
    lastMsgId: number
    lastMsgTime: number
    newMsgCount: number
    toUser: MsgUser
}
interface MsgUser{
    nickname: string
    avatarUrl: string
    userId: number
    signature: string
    gender: number
}
// 私信内容
export interface MsgData{
    fromUser: MsgUser
    toUser: MsgUser
    msg: string
    time: number
    id: number
    batchId: number
    realFromUser: null | MsgUser
    lock?: boolean
}
// 私信类型
export enum MsgType{
    text = 6, // 文本消息
    together = 23, // 一起听
    img = 16, // 图片消息
    song = 1, // 分享歌曲
    sheet = 4, // 分享歌单
    time = 10000  // 时间
}