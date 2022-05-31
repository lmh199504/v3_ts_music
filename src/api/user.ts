import request from '@/utils/request'
import { AxiosResponse } from 'axios'
import { SendCodeParams, PhoneLoginParams, EmaiLoginParams } from '@/types/api/user'
// 发送手机验证码
export const reqSendCode = (params: SendCodeParams) :Promise<AxiosResponse> => request({
	url: '/captcha/sent',
	method: 'GET',
	params
})
// 手机号登录
export const reqLoginByPhone = (params: PhoneLoginParams) :Promise<AxiosResponse> => request({
	url: '/login/cellphone',
	method: 'GET',
	params
})
// 获取用户信息
export const reqGetUserInfo = () :Promise<AxiosResponse> => request({
	url: '/user/account',
	method: 'GET'
})
// 退出登录
export const reqLogout = () :Promise<AxiosResponse> => request({
	url: '/logout',
	method: 'GET'
})
// 邮箱登录
export const reqLoginByEmail = (params: EmaiLoginParams) :Promise<AxiosResponse> => request({
	url: '/login',
	method: 'GET',
	params
})
// 私人FM
export const reqPersonalFm = () :Promise<AxiosResponse> => request({
	url: '/personal_fm',
	method: 'GET'
})