import { defineStore } from 'pinia'
import { reqLoginByPhone } from '@/api/user' 
import { PhoneLoginParams } from '@/types/api/user'
import { setToken } from '@/utils/auth'
export interface userInfo {
	name: string;
	id: string;
}
export interface userState {
	token: string;
	userInfo: userInfo;
	count: number;
}
export const useUserStore = defineStore('user', {  //导出 pinia仓库
	state: (): userState => ({
		token: '',
		userInfo: {
			name: '',
			id: ''
		},
		count: 0
	}),
	getters: {
		isLogin: (state) => {
			return state.token ? true : false
		}
	},
	actions: {
		setInfo(info: userInfo) {
			this.userInfo = info
		},
		setCount() {
			console.log(this)
			this.count ++
		},
		loginByPhone(params: PhoneLoginParams) {
			return new Promise((resolve, reject) => {
				reqLoginByPhone(params)
				.then(res => {
					console.log(res)
					if (res && typeof res == 'object' && res.token) {
						this.token = res.token
						setToken(res.token)
					}
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		}
	}
})
