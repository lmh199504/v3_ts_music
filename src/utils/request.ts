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
import router from '@/router'
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = getToken()
		if (token) {
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
		const code = res.code || res.status
		let msg = ''
		switch (code) {
			case 200:
				return Promise.resolve(response)
			case 201:
				return Promise.resolve(response)	
			case 401:
				return Promise.reject()
			case 403:
				return Promise.reject()
			case 400:
				msg = res && res.message
				Toast.fail(msg ? msg : '网络异常稍后再试~')
				return Promise.reject(res)
			case 500:
				msg = res && res.message
				Toast.fail(msg ? msg : '网络异常稍后再试~')
				return Promise.reject(res)
			case 301:
				Toast.fail('请先登录')
				router.push('/login')
				return Promise.reject(res)
			case -462:
				msg = res && res.message
				Toast.fail(msg ? msg : '网络异常稍后再试~')	
				router.push('/login')
				return Promise.reject(res)
			default:
				msg = res && res.message
				Toast.fail(msg ? msg : '网络异常稍后再试~')
				return Promise.reject(response)
		}
	},
	error => {
		const status = error?.response?.status
		switch (status) {
			case 301:
				Toast.fail(error.response.data?.msg || '登录状态失效')
				return Promise.reject(error)
			case 401:
				Toast.fail('登录状态失效')
				return Promise.reject(error)
			case 403:
				Toast.fail('登录状态失效')
				return Promise.reject(error)
			case 404:
				Toast.fail(error.response.data?.message || '网络异常稍后再试~')
				return Promise.reject(error)
			case 503:
				Toast.fail(error.response.data?.message || '登录状态失效')
				return Promise.reject(error)
			case 400:
				Toast.fail(error.response.data?.message || '请先登录')	
				router.push('/login')
				return Promise.reject(error)
			default:
				Toast.fail('网络异常稍后再试~')
				return Promise.reject(error)
		}
	}
)

export default service
