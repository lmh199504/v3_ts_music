import request from '@/utils/request'
import { AxiosResponse } from 'axios'
import { SendCodeParams } from '@/types/api/user'
// 发送手机验证码
export const reqSendCode = (params: SendCodeParams) :Promise<AxiosResponse> => request({
	url: '/captcha/sent',
	method: 'GET',
	params
})