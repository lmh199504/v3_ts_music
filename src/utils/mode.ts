/* eslint-disable */
import Cookies from 'js-cookie'
import { Mode } from '@/store/system'

interface modeOptions{
	dark: any
	light: any
}

export const mode: modeOptions = {
	light: {
		'--my-primary-color': '#e20001',
		'--my-back-color-white': '#fff',
		'--my-back-color-gray': '#f5f5f5',
		'--my-text-color-black': '#333',
		'--my-text-color-white': '#fff',
		'--my-text-color-gray': '#949494',
		'--van-white': '#fff',
		'--van-gray-8': '#323233',
		'--van-blue': '#1989fa',
		'--van-gray-3': '#ebedf0',
		'--my-gray-1': '#e8e8e8',
		'--my-search-back': '#fff',
		'--my-linear-back': 'linear-gradient(#e8e9eb, #fff)',
		'--my-home-menu-back': '#fef1f1',
		'--van-button-default-border-color': '#ebedf0',
		'--van-toast-loading-icon-color': '#fff',
		'--van-toast-text-color': '#fff',
		'--van-active-color': 'var(--van-gray-2)',
		'--my-lyric-color': 'rgba(255,255,255,0.5)',
		'--my-icon-color': '#c4c4c4',
		'--van-slider-button-background-color': 'var(--van-white)',
		'--my-player-text-white': 'white',
		'--my-mask-color': 'rgba(0, 0, 0, 0.6)',
		'--van-nav-bar-icon-color': 'var(--my-text-color-black)',
		'--my-color-oranger': '#ff7a38',
		'--my-text-color-blue': '#007aff',
		'--my-bubble-right-color': '#69bff1'
	},
	dark: {
		'--my-primary-color': '#c8c9cc',
		'--my-back-color-white': '#18191b',
		'--my-back-color-gray': '#111214',
		'--my-text-color-black': '#7f8082',
		'--my-text-color-white': '#7f8082',
		'--my-text-color-gray': '#424345',
		'--van-white': '#18191b',
		'--van-gray-8': '#7f8082',
		'--van-nav-bar-text-color': '#7f8082',
		'--van-blue': 'var(--my-text-color-black)',
		'--van-gray-3': '#18191c',
		'--my-gray-1': '#111214',
		'--my-search-back': '#2d3134',
		'--my-linear-back': 'linear-gradient(var(--my-gray-1), var(--van-white))',
		'--my-home-menu-back': '#2c1b1b',
		'--van-button-default-border-color': '#424345',
		'--van-toast-loading-icon-color': '#fff',
		'--van-toast-text-color': '#fff',
		'--van-active-color': '#2d3134',
		'--my-lyric-color': 'rgba(255,255,255,0.5)',
		'--my-icon-color': '#c4c4c4',
		'--van-slider-button-background-color': '#c4c4c4',
		'--my-player-text-white': '#c4c4c4',
		'--my-mask-color': 'rgba(24, 25, 27, 0.5)',
		'--van-nav-bar-icon-color': 'var(--my-text-color-black)',
		'--my-color-oranger': '#ff7a38',
		'--my-text-color-blue': '#007aff',
		'--my-bubble-right-color': '#393e40'
	}
}
const modeKey = 'mode'
export const setModeCash = (val: Mode): void => {
	Cookies.set(modeKey, val)
}
export const removeModeCash = (): void => {
	Cookies.remove(modeKey)
}
export const getModeCash = (): Mode => {
	return Cookies.get(modeKey)
}
