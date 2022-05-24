
/* eslint-disable */
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
		'--van-white': '#fff',
		'--van-gray-8': '#323233',
		'--van-cell-border-color': 'var(--van-gray-3)',
		'--van-blue': '#1989fa'
	},
	dark: {
		'--my-primary-color': '#e20001',
		'--my-back-color-white': '#18191b',
		'--my-back-color-gray': '#111214',
		'--my-text-color-black': '#7f8082',
		'--van-white': '#18191b',
		'--van-gray-8': '#7f8082',
		'--van-cell-border-color': '#18191b',
		'--van-nav-bar-text-color': '#7f8082',
		'--van-blue': 'var(--my-text-color-black)'
	}
}
