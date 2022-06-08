import router from '@/router'
export function onClickLeft() :void {
	// 微信里没有域名 会有一个提示跳转页面 length 变成2
	if (window.history.length <= 2) {
		router.replace('/')
	} else {
		router.back()
	}
}