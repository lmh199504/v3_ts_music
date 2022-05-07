// JS判断手机是安卓还是IOS

interface deviceType{
	ios: boolean
	android: boolean
	iPhone: boolean
	iPad: boolean
}
export function CheckIsAndroid(): boolean {
	const browser = {
		versions: function(): deviceType {
			const u = navigator.userAgent
			return { //移动终端浏览器版本信息 
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 //u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
				iPad: u.indexOf('iPad') > -1, //是否iPad 
			};
		}(),
	}
	if (browser.versions.android) return true;
	return false;
}
// 手机还是pc浏览器
export function IsPC(): boolean {
	const userAgentInfo = navigator.userAgent;
	const Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

export function formatCountNumber(num: number): string {
	if (num < 1000) {
		return num + ''
	} else if (num < 10000) {
		return (num / 1000).toFixed(0) + 'k'
	} else if (num < 100000000) {
		return (num / 10000) + 'w'
	} else {
		return (num / 100000000).toFixed(0) + '亿'
	}
}