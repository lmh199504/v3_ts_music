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
// 用户跟单
export interface UserPlayList{
	uid: number;
}
// 用户关注/粉丝列表
export interface UserFollow{
	uid: number;
	limit?: number;
	offset?: number;
}