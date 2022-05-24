
interface modeOptions{
	dark: any
	light: any
}

export const mode: modeOptions = {
	light: {
		'--my-primary-color': '#e20001';
		'--my-back-color-white': '#fff';
		'--my-back-color-gray': '#f5f5f5';
	},
	dark: {
		'--my-primary-color': '#e20001';
		'--my-back-color-white': '#18191b';
		'--my-back-color-gray': '#111214';
	}
}
