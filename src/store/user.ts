import { defineStore } from 'pinia'
import { reqLoginByPhone, reqGetUserInfo, reqLogout, reqLoginByEmail } from '@/api/user' 
import { PhoneLoginParams, EmaiLoginParams } from '@/types/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export interface userInfo {
	accountStatus: number
	accountType: number
	anchor: boolean
	authStatus: number
	authenticated: boolean
	authenticationTypes: number
	authority: number
	// eslint-disable-next-line 
	avatarDetail: any
	avatarImgId: number
	avatarUrl: string
	backgroundImgId: number
	backgroundUrl: string
	birthday: number
	city: number
	createTime: number
	defaultAvatar: boolean
	// eslint-disable-next-line 
	description: any
	// eslint-disable-next-line 
	detailDescription: any
	djStatus: number
	// eslint-disable-next-line 
	expertTags: any
	// eslint-disable-next-line 
	experts: any
	followed: boolean
	gender: number
	lastLoginIP: string
	lastLoginTime: number
	locationStatus: number
	mutual: boolean
	nickname: string
	province: number
	// eslint-disable-next-line 
	remarkName: any
	shortUserName: string
	// eslint-disable-next-line 
	signature: any
	userId: number
	userName: string
	userType: number
	vipType: number
	viptypeVersion: number
}
export interface userState {
	token: string;
	userInfo: userInfo;
}
export const useUserStore = defineStore('user', {  //导出 pinia仓库
	state: (): userState => ({
		token: getToken(),
		userInfo: {
			accountStatus: 0,
			accountType: 0,
			anchor: false,
			authStatus: 0,
			authenticated: false,
			authenticationTypes: 0,
			authority: 0,
			avatarDetail: null,
			avatarImgId: 0,
			avatarUrl: '',
			backgroundImgId: 0,
			backgroundUrl: '',
			birthday: 0,
			city: 0,
			createTime: 0,
			defaultAvatar: false,
			description: null,
			detailDescription: null,
			djStatus: 0,
			expertTags: null,
			experts: null,
			followed: false,
			gender: 0,
			lastLoginIP: '',
			lastLoginTime: 0,
			locationStatus: 0,
			mutual: false,
			nickname: '',
			province: 0,
			remarkName: null,
			shortUserName: '',
			signature: null,
			userId: 0,
			userName: '',
			userType: 0,
			vipType: 0,
			viptypeVersion: 0
			
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
		},
		loginByPhone(params: PhoneLoginParams) {
			return new Promise((resolve, reject) => {
				reqLoginByPhone(params)
				.then(res => {
					console.log(res)
					this.token = res.data.cookie
					setToken(res.data.cookie)
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
		loginByEmail(params: EmaiLoginParams) {
			return new Promise((resolve, reject) => {
				reqLoginByEmail(params)
				.then(res => {
					console.log(res)
					this.token = res.data.cookie
					setToken(res.data.cookie)
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
		getInfo() {
			return new Promise((resolve, reject) => {
				reqGetUserInfo()
				.then(res => {
					this.userInfo = res.data.profile
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
			})
		},
		logout() {
			return new Promise((resolve, reject) => {
				reqLogout()
				.then(res => {
					this.token = ''
					removeToken()
					this.userInfo = {
						accountStatus: 0,
						accountType: 0,
						anchor: false,
						authStatus: 0,
						authenticated: false,
						authenticationTypes: 0,
						authority: 0,
						avatarDetail: null,
						avatarImgId: 0,
						avatarUrl: '',
						backgroundImgId: 0,
						backgroundUrl: '',
						birthday: 0,
						city: 0,
						createTime: 0,
						defaultAvatar: false,
						description: null,
						detailDescription: null,
						djStatus: 0,
						expertTags: null,
						experts: null,
						followed: false,
						gender: 0,
						lastLoginIP: '',
						lastLoginTime: 0,
						locationStatus: 0,
						mutual: false,
						nickname: '',
						province: 0,
						remarkName: null,
						shortUserName: '',
						signature: null,
						userId: 0,
						userName: '',
						userType: 0,
						vipType: 0,
						viptypeVersion: 0
					}
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
			})
		}
	}
})
