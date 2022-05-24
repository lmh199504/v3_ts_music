
import router from '@/router'
import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'
router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore()
	try{
		if (getToken() && !userStore.$state.userInfo.userId) {
			await userStore.getInfo()
		}
		next()
	}catch(e){
		next()
	}
})