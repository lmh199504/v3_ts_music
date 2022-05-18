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