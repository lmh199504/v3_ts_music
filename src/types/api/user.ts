// 发送验证码
export interface SendCodeParams{
	phone?: number;
}
// 验证码登录
export interface PhoneLoginParams{
	phone: number | string;
	captcha?: number;
	password?: string;
}
// 邮箱登录
export interface EmaiLoginParams{
	email: string;
	password: string;
}
// 用户歌单
export interface UserPlayList{
	uid: number;
	limit?: number;
	offset?: number;
}
// 用户关注/粉丝列表
export interface UserFollow{
	uid: number;
	limit?: number;
	offset?: number;
}
//  uid 
export interface UidParams{
	uid: number
}
// 喜欢音乐
export interface LikeParams{
	id: number; // 歌曲id
	like?: boolean; // 默认为 true 即喜欢 , 若传 false, 则取消喜欢
}
