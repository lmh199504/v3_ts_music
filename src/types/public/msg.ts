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
}