import axios from 'axios'
import {
	Toast
} from 'vant'
const service = axios.create({
	baseURL: '/api',
	timeout: 60 * 1000
})

service.interceptors.request.use(
	config => {
		const token = getToken()
		if (token) {
			config.headers['X-Auth-Token'] = token
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		const res = response.data
		const code = res.code
		switch (code) {
			case 200:
				if (res.data && (typeof res.data == 'object')) {
					return Promise.resolve(res.data)
				} else {
					return Promise.resolve(res)
				}
				case 401:
					return Promise.reject()
				case 403:
					return Promise.reject()
				case 400:
				case 500:
					var msg = res && res.msg
					Toast.fail(msg ? msg : '网络异常稍后再试~')
					return Promise.reject(res)
				default:
					return Promise.resolve(res)
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
			default:
				Toast.fail('网络异常稍后再试~')
				return Promise.reject(error)
		}
	}
)

export default service
