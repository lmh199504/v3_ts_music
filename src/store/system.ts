import { defineStore } from 'pinia'
import { mode as ModeOptions } from '@/utils/mode'
enum Mode{
	light = 'light',
	dark = 'dark',
}
export interface modeState {
	mode: Mode;
}
export const useSystemStore = defineStore('system', {  //导出 pinia仓库
	state: (): modeState => ({
		mode: Mode.light
	}),
	actions: {
		setMode(mode: Mode) {
			this.mode = mode
			for(const key in ModeOptions[mode]) {
				setStyle(key, ModeOptions[mode][key])
			}
		}
	}
})

function setStyle(key: string, value: string) :void {
	document.documentElement.style.setProperty(key, value) 
}