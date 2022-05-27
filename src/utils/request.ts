import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
	Toast
} from 'vant'
import { getToken } from '@/utils/auth'
const service = axios.create({
	baseURL: '/api',
	timeout: 60 * 1000,
	withCredentials: true
})

service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = getToken()
		if (token && config.headers) {
			config.headers['X-Auth-Token'] = token
		}
		if (!config.data) {
			config.data = {
				cookie: encodeURIComponent(token)
			}
		} else {
			config.data = Object.assign(config.data, { cookie: encodeURIComponent(token) })
		}
		if (!config.params) {
			config.params = {
				cookie: encodeURIComponent(token)
			}
		} else {
			config.params = Object.assign(config.params, { cookie: token })
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const res = response.data
		const code = res.code
		let msg = ''
		switch (code) {
			case 200:
				return Promise.resolve(response)
			case 401:
				return Promise.reject()
			case 403:
				return Promise.reject()
			case 400:
				msg = res && res.msg
				Toast.fail(msg ? msg : '网络异常稍后再试~')
				return Promise.reject(res)
			case 500:
				msg = res && res.msg
				Toast.fail(msg ? msg : '网络异常稍后再试~')
				return Promise.reject(res)
			case 301:
				Toast.fail('请先登录')
				return Promise.reject(res)
			default:
				return Promise.resolve(response)
		}
	},
	error => {
		const status = error?.response?.status
		switch (status) {
			case 401:
				Toast.fail('登录状态失效')
				return Promise.reject(error)
			case 403:
				Toast.fail('登录状态失效')
				return Promise.reject(error)
			case 503:
				Toast.fail(error.response.data?.message || '登录状态失效')
				return Promise.reject(error)
			default:
				Toast.fail('网络异常稍后再试~')
				return Promise.reject(error)
		}
	}
)

export default service
