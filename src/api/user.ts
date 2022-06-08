import request from '@/utils/request'
import { AxiosResponse } from 'axios'
import { SendCodeParams, PhoneLoginParams, EmaiLoginParams, UserPlayList, UserFollow } from '@/types/api/user'
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
// 获取用户歌单
export const reqUserPlayList = (params: UserPlayList) :Promise<AxiosResponse> => request({
	url: '/user/playlist',
	method: 'GET',
	params
})
// 获取用户关注用户列表
export const reqUserFollwos = (params: UserFollow) :Promise<AxiosResponse> => request({
	url: 'user/follows',
	method: 'GET',
	params
})
// 获取用户粉丝列表
export const reqUserFolloweds = (params: UserFollow) :Promise<AxiosResponse> => request({
	url: '/user/followeds',
	method: 'GET',
	params
})