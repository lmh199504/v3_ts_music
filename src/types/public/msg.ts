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