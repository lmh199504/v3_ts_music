import { UserInterface } from '@/types/public/user'
// 电台数据
export interface RadioInterface{
	id: number
	programCount: number
	name: string
	picUrl: string
	playCount: number
	dj: UserInterface
}