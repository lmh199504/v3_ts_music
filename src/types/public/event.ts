// 朋友圈动态数据类型
import { UserInterface } from '@/types/public/user'

export interface EventDataInterface{
    id: number
    json: string
    type: number
    eventTime: number
    user: UserInterface
}
