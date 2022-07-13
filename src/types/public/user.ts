// 用户列表
export interface UserInterface{
	nickname: string;
	signature?: string;
	userId: number;
	avatarUrl: string;
	followed: boolean
}
// 用户信息
export interface UserProfileData{
	avatarUrl: string
	backgroundUrl: string
	city: number
	createTime: number
	nickname: string
	province: number
	signature: string
	userId: number
	follows: number
	followeds: number
	followed: boolean
	level: number
	listenSongs: number
	createDays: number
	eventCount: number
}
// 粉丝信息
export interface FansData{
	followed: boolean
	gender: number
	nickname: string
	avatarUrl: string
	userId: number
	userType: number
}