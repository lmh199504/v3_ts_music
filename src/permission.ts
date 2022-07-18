
import router from '@/router'
import { useUserStore, useMsgStore } from '@/store'
import { getToken } from '@/utils/auth'
router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore()
	const msgStore = useMsgStore()
	try{
		if (getToken() && !userStore.$state.userInfo.userId) {
			await userStore.getInfo()
			await userStore.getLikeList()
			await msgStore.setNewMsgCount()
		}
		next()
	}catch(e){
		next()
	}
})