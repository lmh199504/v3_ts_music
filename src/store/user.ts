import { defineStore } from 'pinia'
export interface userInfo {
	name: string;
	id: string;
}
export interface userState {
	token: string;
	userInfo: userInfo;
}
export const useUserStore = defineStore('user', {  //导出 pinia仓库
	state: (): userState => ({
		token: '54564654646',
		userInfo: {
			name: '',
			id: ''
		}
	}),
	getters: {
		isLogin: (state) => {
			return state.token ? true : false
		}
	},
	actions: {
		setInfo(info: userInfo) {
			this.userInfo = info
		}
	}
})
