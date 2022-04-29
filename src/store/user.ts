import { defineStore } from 'pinia'
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
		token: '54564654646',
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
		}
	}
})
