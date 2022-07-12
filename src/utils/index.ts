/* eslint-disable */
// JS判断手机是安卓还是IOS
import cityJson from '@/libs/city'
interface deviceType {
	ios: boolean
	android: boolean
	iPhone: boolean
	iPad: boolean
}
export function CheckIsAndroid(): boolean {
	const browser = {
		versions: function (): deviceType {
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
		return (num / 10000).toFixed(0) + 'w'
	} else {
		return (num / 100000000).toFixed(0) + '亿'
	}
}
// 手机好加***
export function phone(num: number, len = 3): string {
	return String(num).slice(0, len * -1) + "*".repeat(len);
}
export function validEmail(email: string): boolean {
	// eslint-disable-next-line  
	const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return reg.test(email)
}

export function formatMusicTime(time: number): string {
	const secondsTime = Math.floor(time / 1000)
	const minute = Math.floor(secondsTime / 60)
	const second = Math.floor(secondsTime % 60)
	return String(addZero(minute)) + ':' + String(addZero(second))
}

function addZero(num: number): string {
	if (num >= 10) {
		return num + ''
	} else {
		return '0' + num
	}
}
export function dateFormat(time: number, type?: string) {
	let formatTime
	let date
	if (time === 0) {
		date = new Date()
	} else {
		date = new Date(time)
	}
	let Year = date.getFullYear()
	let month = date.getMonth() + 1
	let Month = month >= 10 ? month : '0' + month
	let day = date.getDate()
	let Day = day >= 10 ? day : '0' + day
	let Hour = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()
	let Minute = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()
	let Second = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()
	if (type === 'yyyy-MM-dd') {
		formatTime = Year + '-' + month + '-' + day
		return formatTime
	} else if (type === 'yyyy-MM-dd hh:mm:ss') {
		formatTime = Year + '-' + month + '-' + day + ' ' + Hour + ':' + Minute + ':' + Second
		return formatTime
	} else if (type === 'hh:mm:ss') {
		formatTime = Hour + ':' + Minute + ':' + Second
		return formatTime
	} else if (type === 'MM-dd') {
		formatTime = Month + '-' + Day
		return formatTime
	} else {
		return "error type!"
	}
}

export function getCityName(province: number, city: number): string {
	const provinceData = cityJson.find(item => item.PCODE === province+'')
	const cityData = cityJson.find(item => item.REGIONCODE === city+'')
	if (provinceData && cityData) {
		return provinceData.REGIONNAME + ' ' + cityData.REGIONNAME
	}
	return '外星人'
}