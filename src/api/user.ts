import request from '@/utils/request'
import { AxiosResponse } from 'axios'
import { SendCodeParams, PhoneLoginParams } from '@/types/api/user'
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