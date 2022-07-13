// 获取动态消息
export interface EventParams{
    pagesize: number
    lasttime: number
}
// 用户动态
export interface UserEventParams{
    uid: number
    limit: number
    lasttime: number
}